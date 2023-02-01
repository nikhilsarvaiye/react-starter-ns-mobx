import { makeObservable, observable, action } from 'mobx';
import {
    Key,
    SorterResult,
    TableCurrentDataSource,
    TablePaginationConfig,
    SortOrder,
} from '@library/table/table.models';
import { QueryOptions } from 'odata-query';
import { IService } from '../services/iservice';
import { BaseModel, IPageResponse, ISearchCriteria } from '../models';
import { AppFile, downloadUploadFile, UploadFile } from '@library/util/file';
import { message } from 'antd';
import { UploadStore } from '@library/upload';

export abstract class BaseStore<IModel extends BaseModel> {
    loading = false;
    items: IPageResponse<IModel> = {
        count: 0,
        items: [],
    };
    selectedItem: IModel = {
        id: '',
        uploadStore: new UploadStore()
    } as any;
    searchCriteria: ISearchCriteria = {
        page: 1,
        pageSize: 10,
        sortField: 'id',
        sortOrder: SortOrder.Descend,
    };
    visible: boolean = false;
    selectedItems: IModel[] = [];
    abstract defaultValues: IModel;
    abstract titles: {
        name: string;
        listName: string;
    };

    constructor(public service: IService<IModel>) {
        makeObservable(this, {
            loading: observable,
            items: observable,
            selectedItem: observable,
            selectedItems: observable,
            visible: observable,
            paginate: action,
            list: action,
            get: action,
            create: action,
            update: action,
            delete: action,
            confirmDelete: action,
            onSelectedRows: action,
            change: action,
            toggle: action,
            setSelectedItem: action,
            clearSelectedItem: action,
        });
    }

    paginate = async (queryOptions?: Partial<QueryOptions<IModel>>) => {
        try {
            this.loading = true;
            queryOptions = queryOptions || {};
            queryOptions.count = true;
            this.items = (await this.service.paginate(queryOptions));
        } finally {
            this.loading = false;
        }
    };

    list = async (queryOptions?: Partial<QueryOptions<IModel>>) => {
        try {
            this.loading = true;
            const items = (await this.service.list(queryOptions));
            this.items = {
                count: items.length,
                items: items,
            };
        } finally {
            this.loading = false;
        }
    };

    get = async (id: string) => {
        try {
            this.loading = true;
            const item = (await this.service.get(id)) as IModel;
            if (!item) {
                message.error(`Resource not found with id: ${id}`);
            }
            this.loading = false;
            this.selectedItem = item;
            if (item.files && item.files.length) {
                item.uploadFiles = await this.getFiles(item.files);
                item.uploadStore = new UploadStore(item.uploadFiles);
            } else {
                item.uploadStore = new UploadStore();
            }
            this.selectedItem = item;
        } finally {
            this.loading = false;
        }
    };

    create = async (model: IModel, onCreate?: (model: IModel) => void) => {
        try {
            this.loading = true;
            model = await this.addDeleteFiles(model);
            const createModel = { ...model };
            delete createModel.uploadFiles;
            model = await this.service.create(createModel);
            message.success(`${this.service.name} has been created successfully.`);
            this.clearSelectedItem();
            if (onCreate) {
                onCreate(model);
            }
        } finally {
            this.loading = false;
        }
    };

    createOrUpdate = async (
        model: IModel,
        queryOptions?: Partial<QueryOptions<IModel>>,
        onCreateOrUpdate?: () => void,
    ) => {
        try {
            this.loading = true;
            await this.service.createorupdate(model, queryOptions);
            message.success(`${this.service.name} has been saved successfully.`);
            this.clearSelectedItem();
            if (onCreateOrUpdate) {
                onCreateOrUpdate();
            }
        } finally {
            this.loading = false;
        }
    };

    update = async (id: string, model: IModel, onUpdate?: () => void) => {
        try {
            this.loading = true;
            model = await this.addDeleteFiles(model);
            const updateModel = { ...model };
            delete updateModel.uploadFiles;
            await this.service.update(id, updateModel);
            message.success(`${this.service.name} has been updated successfully.`);
            this.clearSelectedItem();
            if (onUpdate) {
                onUpdate();
            }
            this.get(id);
        } finally {
            this.loading = false;
        }
    };

    confirmDelete = async (id: string, onDelete?: () => void) => {
        // message.confirm({
        //     content: `Are you sure you want to delete?`,
        //     onOk: () => {
        //         this.delete(id, onDelete);
        //     },
        // });
    };

    delete = async (id: string, onDelete?: () => void) => {
        try {
            this.loading = true;
            await this.service.delete(id);
            message.success(`${this.service.name} has been deleted successfully.`);
            if (onDelete) {
                onDelete();
            }
            this.paginate();
        } finally {
            this.loading = false;
        }
    };

    confirmDeleteMultiple = async (ids: string[], onDelete?: () => void) => {
        // confirm({
        //     content: `Are you sure you want to delete ${ids.length} records?`,
        //     onOk: () => {
        //         this.deleteMultiple(ids, onDelete);
        //     },
        // });
    };

    deleteMultiple = async (ids: string[], onDelete?: () => void) => {
        try {
            this.loading = true;
            await this.service.deleteMultiple(ids);
            message.success(`${this.service.name} selections has been deleted successfully.`);
            if (onDelete) {
                onDelete();
            }
            this.paginate();
        } finally {
            this.loading = false;
        }
    };

    upload = async (
        uploadFile: UploadFile,
        onUpload?: (items: IModel[]) => void,
        onError?: (error: unknown) => void,
    ): Promise<void> => {
        try {
            this.loading = true;
            const items = await this.service.upload(uploadFile);
            message.success(`${this.service.name} file upload successfully.`);
            if (onUpload) {
                onUpload(items);
            }
        } catch (e) {
            if (onError) {
                onError(e);
            }
        } finally {
            this.loading = false;
        }
    };

    uploadFile = async (uploadFile: UploadFile): Promise<AppFile> => {
        try {
            this.loading = true;
            const file = await this.service.uploadFile(uploadFile);
            message.success(`${this.service.name} file upload successfully.`);
            return file;
        } finally {
            this.loading = false;
        }
    };

    uploadMultipleFiles = async (uploadFiles: UploadFile[]): Promise<AppFile[]> => {
        try {
            this.loading = true;
            const files = await this.service.uploadMultipleFiles(uploadFiles);
            message.success(`${this.service.name} files uploaded successfully.`);
            return files;
        } finally {
            this.loading = false;
        }
    };

    getFiles = async (files: AppFile[] | string[]): Promise<UploadFile[]> => {
        const ids = files.map((x: AppFile | string) => (x as any).id || x);
        return await this.service.getFiles(ids);
    };

    downloadUploadedFiles = async (uploadFiles: UploadFile[]): Promise<void> => {
        uploadFiles.forEach((x) => {
            downloadUploadFile(x);
        });
    };

    downloadFiles = async (files: AppFile[]): Promise<void> => {
        const uploadFiles = await this.getFiles(files);
        this.downloadUploadedFiles(uploadFiles);
    };

    downloadUploadTemplate = async (entity: string): Promise<void> => {
        const uploadFile = await this.service.downloadUploadTemplate();
        downloadUploadFile(uploadFile);
    };

    export = async (queryOptions?: Partial<QueryOptions<IModel>>) => {
        try {
            this.loading = true;
            queryOptions = queryOptions || {};
            queryOptions.count = false;
            await this.service.export(queryOptions);
        } finally {
            this.loading = false;
        }
    };

    setSelectedItem = (model: any) => {
        this.selectedItem = model;
    };

    clearSelectedItem = () => {
        this.selectedItem = {
            id: '',
            uploadStore: new UploadStore()
        } as any;
    };

    onSelectedRows = (selectedRowKeys: React.Key[], selectedRows: IModel[]): void => {
        this.selectedItems = selectedRows;
    };

    toggle = () => {
        this.visible = !this.visible;
    };

    search = async (searchCriteria: any) => {
        this.searchCriteria = {
            ...this.searchCriteria,
            ...(searchCriteria || {}),
        };
        const defaultQueryOptions = this.buildDefaultQueryOptions();
        const queryOptions = this.buildQueryOptions(defaultQueryOptions);
        this.paginate(queryOptions);
    };

    change = async (
        pagination: TablePaginationConfig,
        filters: Record<string, (Key | boolean)[] | null>,
        sorter: SorterResult<any> | SorterResult<any>[],
        extra: TableCurrentDataSource<any>,
    ) => {
        this.searchCriteria = {
            ...this.searchCriteria,
            page: pagination.current as number,
            pageSize: pagination.pageSize as number,
        };
        if ((sorter as any).field) {
            this.searchCriteria.sortField = (sorter as any).field;
            this.searchCriteria.sortOrder = (sorter as any).order;
        }
        const defaultQueryOptions = this.buildDefaultQueryOptions();
        const queryOptions = this.buildQueryOptions(defaultQueryOptions);
        this.paginate(queryOptions);
    };

    public buildDefaultQueryOptions = (
        queryOptions?: Partial<QueryOptions<IModel>>,
    ): Partial<QueryOptions<IModel>> => {
        queryOptions = queryOptions || {};
        queryOptions.top = this.searchCriteria.pageSize;
        queryOptions.skip = this.searchCriteria.page - 1;
        if (this.searchCriteria.sortField) {
            const order = this.searchCriteria.sortOrder === SortOrder.Ascend ? 'asc' : 'desc';
            queryOptions.orderBy = [`${this.searchCriteria.sortField} ${order}`] as any;
        }
        return queryOptions;
    };

    abstract buildQueryOptions(
        queryOptions?: Partial<QueryOptions<IModel>>,
    ): Partial<QueryOptions<IModel>>;

    private addDeleteFiles = async (model: IModel): Promise<IModel> => {
        if (model.uploadFiles) {
            const deleteFileIds = model.uploadFiles.filter((x) => x.delete).map((x) => x.file.uid);
            if (deleteFileIds.length) {
                await this.service.deleteMultipleFiles(deleteFileIds);
            }
            const uploadFiles = model.uploadFiles.filter((x) => !x.delete);
            if (uploadFiles.length) {
                model.files = await this.uploadMultipleFiles(uploadFiles);
            }
        }
        return model;
    };
}

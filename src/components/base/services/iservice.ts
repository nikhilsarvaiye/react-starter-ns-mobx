import { AppFile, UploadFile } from '@library/util/file';
import { QueryOptions } from 'odata-query';
import { BaseModel, IPageResponse } from '../models';

export interface IService<T extends BaseModel> {
    name: string;
    routePath: string;
    list(queryOptions?: Partial<QueryOptions<T>>): Promise<T[]>;
    paginate(queryOptions?: Partial<QueryOptions<T>>): Promise<IPageResponse<T>>;
    get(id: string): Promise<T | null>;
    create(t: T): Promise<T>;
    createorupdate(t: T, queryOptions?: Partial<QueryOptions<T>>): Promise<T>;
    update(id: string, t: T): Promise<void>;
    upload(uploadFile: UploadFile): Promise<T[]>;
    uploadFile(uploadFile: UploadFile): Promise<AppFile>;
    uploadMultipleFiles(uploadFiles: UploadFile[]): Promise<AppFile[]>;
    deleteMultipleFiles(ids: string[]): Promise<void>;
    getFiles(ids: string[]): Promise<UploadFile[]>;
    downloadUploadTemplate(): Promise<UploadFile>;
    delete(id: string): Promise<void>;
    deleteMultiple(ids: string[]): Promise<void>;
    export(queryOptions?: Partial<QueryOptions<T>>): Promise<void>;
}

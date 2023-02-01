import { AxiosRequestConfig } from 'axios';
import buildQuery, { QueryOptions } from 'odata-query';
import { AppFile, UploadFile, toUploadFile } from '@library/util/file';
import { Api } from '@components/base/api/base.api';
import { BaseModel, IPageResponse } from '../models';
import { IService } from './iservice';

export class BaseService<T extends BaseModel> implements IService<T> {
    constructor(public name: string, public routePath: string) {}

    list = async (queryOptions?: Partial<QueryOptions<T>>): Promise<T[]> => {
        const query = buildQuery(queryOptions);
        const response = await Api.get<T[]>(`${this.routePath}${query}`);
        return response.data;
    };

    paginate = async (queryOptions?: Partial<QueryOptions<T>>): Promise<IPageResponse<T>> => {
        const query = buildQuery(queryOptions);
        const response = await Api.get<IPageResponse<T>>(`${this.routePath}${query}`);
        return response.data;
    };

    get = async (id: string, config?: AxiosRequestConfig): Promise<T | null> => {
        const response = await Api.get<T>(`${this.routePath}?id=${id}`, config);
        return response.data;
    };

    create = async (t: T): Promise<T> => {
        const response = await Api.post<T>(`${this.routePath}`, t);
        return response.data;
    };

    createorupdate = async (t: T, queryOptions?: Partial<QueryOptions<T>>): Promise<T> => {
        const query = buildQuery(queryOptions);
        const response = await Api.post<T>(`${this.routePath}/createorupdate${query}`, t);
        return response.data;
    };

    update = async (id: string, t: T): Promise<void> => {
        await Api.put<T>(`${this.routePath}?id=${id}`, t);
    };

    delete = async (id: string): Promise<void> => {
        await Api.delete<T>(`${this.routePath}?id=${id}`);
    };

    deleteMultiple = async (ids: string[]): Promise<void> => {
        debugger;
        const query = buildQuery({
            filter: {
                id: {
                    in: ids,
                },
            },
        });
        await Api.delete(`${this.routePath}/bulkdelete${query}`);
    };

    upload = async (uploadFile: UploadFile): Promise<T[]> => {
        const data = new FormData();
        data.append('file', uploadFile.file.originFileObj as any);
        return (await Api.post(`${this.routePath}/upload`, data)).data;
    };

    uploadFile = async (uploadFile: UploadFile): Promise<AppFile> => {
        return (await this.uploadMultipleFiles([uploadFile]))[0];
    };

    uploadMultipleFiles = async (uploadFiles: UploadFile[]): Promise<AppFile[]> => {
        const data = new FormData();
        uploadFiles.forEach((uploadFile) => {
            data.append('files', uploadFile.file.originFileObj as any);
            data.append('metadataValues', JSON.stringify(uploadFile.metadata || {}) as any);
        });
        return (await Api.post(`${this.routePath}/file`, data)).data;
    };

    getFiles = async (ids: string[], config?: AxiosRequestConfig): Promise<UploadFile[]> => {
        const query = buildQuery({
            filter: {
                id: {
                    in: ids,
                },
            },
        });
        const response = (await Api.get(`${this.routePath}/file${query}`, config)).data;
        return response.map((x: any) => toUploadFile(x as any));
    };

    downloadUploadTemplate = async (): Promise<UploadFile> => {
        const response = (await Api.get(`${this.routePath}/downloaduploadtemplate`)).data;
        return toUploadFile(response);
    };

    deleteMultipleFiles = async (ids: string[]): Promise<void> => {
        const query = buildQuery({
            filter: {
                id: {
                    in: ids,
                },
            },
        });
        await Api.delete(`${this.routePath}/file${query}`);
    };

    export = async (queryOptions?: Partial<QueryOptions<T>>): Promise<void> => {
        // const query = buildQuery(queryOptions);
        // const response = await Api.get<UploadFile>(`${this.routePath}/export`);
    };
}

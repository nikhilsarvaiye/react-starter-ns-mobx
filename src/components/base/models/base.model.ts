import { UploadStore } from '@library/upload';
import { AppFile, UploadFile } from '@library/util/file';
import { IModel } from './imodel';

export abstract class BaseModel implements IModel {
    id: string = '';
    metadata?: any;
    files: AppFile[] = [];
    uploadFiles?: UploadFile[];
    createdDateTime: Date = new Date();
    updateDateTime: Date = new Date();
    uploadStore: UploadStore | null = null;
}

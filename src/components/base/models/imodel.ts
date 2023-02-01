import { UploadStore } from '@library/upload';
import { AppFile, UploadFile } from '@library/util/file';

export interface IModel {
    id: string;
    files: AppFile[];
    uploadFiles?: UploadFile[];
    createdDateTime: Date;
    updateDateTime: Date;
    uploadStore: UploadStore | null;
}

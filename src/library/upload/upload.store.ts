import { UploadFile } from 'antd/lib/upload/interface';
import { UploadFile as AppUploadFile } from '@util/file';
import { action, computed, makeObservable, observable } from 'mobx';

export class UploadStore {
    files: UploadFile<File>[] = [];
    deleteFiles: UploadFile<File>[] = [];
    metadata: any = {};
    imageViewerVisible = false;
    gotoIndex = -1;

    constructor(files?: AppUploadFile[]) {
        this.setInitialValues(files);
        makeObservable(this, {
            files: observable,
            metadata: observable,
            deleteFiles: observable,
            imageViewerVisible: observable,
            gotoIndex: observable,
            filesWithMetadata: computed,
            setInitialValues: action,
        });
    }

    get filesWithMetadata(): AppUploadFile[] {
        return [
            ...this.files.map((x) => {
                return {
                    file: x,
                    metadata: this.metadata[x.uid] || {},
                };
            }),
            ...this.deleteFiles.map((x) => {
                return {
                    file: x,
                    metadata: this.metadata[x.uid] || {},
                    delete: true,
                };
            }),
        ];
    }

    setInitialValues(files?: AppUploadFile[]) {
        if (Array.isArray(files)) {
            files.forEach((x) => {
                this.files.push(x.file as any);
                this.metadata[x.file.uid] = x.metadata;
            });
        }
    }
}

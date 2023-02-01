import { RcFile } from 'antd/lib/upload';
import { UploadFile as AntUploadFile } from 'antd/lib/upload/interface';

export type UploadFile = {
    file: AntUploadFile<string | RcFile | Blob>;
    metadata?: any;
    delete?: boolean;
};

export interface AppFile {
    id: string;
    name: string;
}

export enum FileType {
    ImageJpeg = 'image/jpeg',
    ImagePng = 'image/png',
    Excel = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

export const ToFileTypeError = (fileType: FileType) => {
    return '';
};

export const toUploadFile = (fileResponse: any): UploadFile => {
    const bytes = base64ToArrayBuffer(fileResponse.bytes);
    const blob = new Blob([bytes], {
        type: fileResponse.type,
    });
    const file = new File([blob], fileResponse.fileName, {
        type: fileResponse.type,
    } as any);

    const rcFile = {
        uid: fileResponse.id,
        name: file.name,
        status: 'done',
        preview: generateImagePreviewUrl(file),
        originFileObj: file,
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModified,
        type: file.type,
        metadata: fileResponse.metadata,
    } as any;

    return {
        file: rcFile,
        metadata: fileResponse.metadata,
    };
};

export const base64ToArrayBuffer = (base64: string) => {
    const binaryString = window.atob(base64); // Comment this if not using base64
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
};

export const downloadUploadFile = (uploadFile: UploadFile) => {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(uploadFile.file.originFileObj as any);
    link.download = (uploadFile.file.originFileObj as any).name;
    link.click();
};

export const openImageInNewTab = (url: string) => {
    const image = new Image();
    image.src = url;
    const imgWindow = window.open(image.src);
    imgWindow?.document.write(image.outerHTML);
};

export const generateImagePreviewUrl = (file: File | Blob) => {
    return URL.createObjectURL(file);
};

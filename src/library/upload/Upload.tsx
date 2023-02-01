import { ReactElement, useEffect, useState } from 'react';
import { Observer } from 'mobx-react-lite';
import {
    message,
    Upload as AntdUpload,
    UploadProps as AntdUploadProps,
    Button,
    Checkbox,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { UploadFile } from 'antd/lib/upload/interface';
import { ImageViewer } from '@library/image-viewer';
import { generateImagePreviewUrl } from '@library/util/file';
// import { FileMetada } from './FileMetada';
import { UploadStore } from './upload.store';
// import './upload.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';

export enum FileStatus {
    Uploading = 'uploading',
    Done = 'done',
    Removed = 'removed',
    Error = 'error',
}

export interface UploadProps extends AntdUploadProps {
    store?: UploadStore;
    // files: UploadFile<File>[];
    allowMetadata?: boolean;
    showDefault?: boolean;
}

export const Upload = observer((props: UploadProps) => {
    if (!props.store) {
        throw new Error('Kindly pass UploadStore instance');
    }
    const store = props.store;
    const modifiedProps = {
        ...props,
    };

    const itemRender = (
        originNode: ReactElement,
        file: UploadFile,
        fileList?: Array<UploadFile<File>>,
    ) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [fileMetadataVisible, setFileMetadataVisible] = useState<boolean>(false);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (!store.metadata[file.uid]) {
                store.metadata = {
                    ...store.metadata,
                    ...{
                        [file.uid]: {},
                    },
                };
            }
        }, []);
        return (
            <Observer>
                {() => (
                    <div className="item">
                        {originNode}
                        <div className="default">
                            {/* <FileMetada
                                file={file}
                                visible={fileMetadataVisible}
                                metadata={store.metadata[file.uid]}
                                disabled={props.disabled}
                                onOk={(values) => {
                                    const newMetadata = { ...store.metadata };
                                    newMetadata[file.uid] = {
                                        ...store.metadata[file.uid],
                                        ...values,
                                    };
                                    store.metadata = newMetadata;
                                    setFileMetadataVisible(false);
                                }}
                                onCancel={() => {
                                    setFileMetadataVisible(false);
                                }}
                            /> */}
                            {props.allowMetadata && (
                                <Button
                                    onClick={() => {
                                        setFileMetadataVisible(true);
                                    }}
                                >
                                    Add Metadata
                                </Button>
                            )}
                            {props.allowMetadata && props.showDefault && (
                                <Checkbox
                                    value={
                                        store.metadata[file.uid]
                                            ? store.metadata[file.uid].default
                                            : false
                                    }
                                    onChange={(event: any) => {
                                        const newMetadata: any = { ...store.metadata };
                                        if (fileList) {
                                            fileList.map((x, index) => {
                                                newMetadata[x.uid] = store.metadata[x.uid] || {};
                                                newMetadata[x.uid].default = false;
                                            });
                                            newMetadata[file.uid].default = event.target.checked;
                                        }
                                        store.metadata = newMetadata;
                                    }}
                                >
                                    Default
                                </Checkbox>
                            )}
                        </div>
                    </div>
                )}
            </Observer>
        );
    };

    modifiedProps.itemRender = modifiedProps.itemRender || itemRender;
    modifiedProps.allowMetadata =
        modifiedProps.allowMetadata != undefined ? modifiedProps.allowMetadata : true;
    modifiedProps.onPreview = (file) => {
        store.gotoIndex = store.files.findIndex((x) => x.uid === file.uid);
        store.imageViewerVisible = true;
        if (props.onPreview) {
            props.onPreview(file);
        }
    };
    modifiedProps.onRemove = (file) => {
        const newFiles = store.files.slice();
        newFiles.splice(store.files.indexOf(file), 1);
        store.files = newFiles;
        store.deleteFiles.push(file);
        if (props.onRemove) {
            props.onRemove(file);
        }
    };
    modifiedProps.customRequest = (options) => {
        if (options.onSuccess) {
            options.onSuccess({}, {} as any);
        }
    };
    modifiedProps.onChange = (info) => {
        if (info.file.status !== FileStatus.Uploading) {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === FileStatus.Done) {
            // message.success(`${info.file.name} file uploaded successfully.`);
            if (!info.file.preview) {
                info.file.preview = generateImagePreviewUrl(info.file.originFileObj as any);
                store.files = [...store.files, info.file];
            }
        } else if (info.file.status === FileStatus.Error) {
            message.error(`${info.file.name} file upload failed.`);
        }
        if (props.onChange) {
            props.onChange(info);
        }
    };
    modifiedProps.listType = modifiedProps.listType || 'picture-card';
    modifiedProps.defaultFileList = store.files;

    if (!modifiedProps.multiple) {
        modifiedProps.maxCount = 1;
    }

    return (
        <Observer>
            {() => (
                <div>
                    <ImageViewer
                        visible={store.imageViewerVisible}
                        files={store.files}
                        onCancel={() => {
                            store.imageViewerVisible = false;
                            store.gotoIndex = -1;
                        }}
                        gotoIndex={store.gotoIndex}
                    />
                    <AntdUpload
                        {...modifiedProps}
                        className={classNames(
                            { 'has-metadata': props.allowMetadata },
                            { 'has-files': store.files.length },
                            props.className,
                        )}
                    >
                        {(modifiedProps.maxCount
                            ? store.files.length < modifiedProps.maxCount
                            : true) && (
                            <Button icon={<FontAwesomeIcon icon={faFileUpload}></FontAwesomeIcon>}>
                                Upload
                            </Button>
                        )}
                    </AntdUpload>
                </div>
            )}
        </Observer>
    );
});

export const LIST_IGNORE = AntdUpload.LIST_IGNORE;

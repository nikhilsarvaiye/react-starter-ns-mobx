import { useEffect, useRef, useState } from 'react';
import { Carousel, Modal, Image } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { CarouselRef } from 'antd/lib/carousel';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import './image-viewer.css';

export const ImageViewer = ({
    visible,
    files,
    onCancel,
    gotoIndex,
}: {
    visible: boolean;
    files: Array<UploadFile<File>>;
    onCancel: (e: any) => void;
    gotoIndex?: number;
}) => {
    const slider = useRef<CarouselRef>();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(visible);
    }, [visible]);

    useEffect(() => {
        setTimeout(() => {
            if (gotoIndex !== undefined && gotoIndex != null) {
                slider.current?.goTo(gotoIndex);
            }
        });
    }, [gotoIndex]);

    return (
        <Modal
            open={open}
            onCancel={(e) => {
                setOpen(false);
                if (onCancel) {
                    onCancel(e);
                }
            }}
            footer={null}
            bodyStyle={{
                height: '100%',
                padding: 40,
                background: 'white',
                color: 'white',
            }}
            closeIcon={null}
            className="image-viewer-modal"
        >
            <Carousel
                ref={slider as any}
                prevArrow={<ArrowLeftOutlined />}
                nextArrow={<ArrowRightOutlined />}
                arrows={true}
                dots={true}
                autoplay
                className='image-carousel'
            >
                {files.map((file) => (
                    <Image
                        alt="Not Found"
                        src={file?.preview}
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                        preview={false}
                    />
                ))}
            </Carousel>
        </Modal>
    );
};

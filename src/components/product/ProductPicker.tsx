import { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import { useDebounce } from '@util/debounce';
import { ProductModel } from './product.models';
import { productService } from './InitProducts';

export interface UserPickerProps {
    onChange?: (productId: string, user?: ProductModel) => void;
    value?: string;
    variant?: boolean;
    placeholder?: string;
}

export const ProductPicker = (props: UserPickerProps) => {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getProducts = async (key?: string) => {
        try {
            setLoading(true);
            const queryOptions = {
                filter: {
                    or: [
                        key
                            ? {
                                  name: {
                                      startswith: key,
                                  },
                              }
                            : {},
                        key
                            ? {
                                  name: {
                                      contains: key,
                                  },
                              }
                            : {},
                        props.value
                            ? {
                                  id: {
                                      eq: props.value,
                                  },
                              }
                            : {},
                    ],
                },
                select: ['id', 'name', 'variants', 'price'],
                top: 20,
            } as any;
            const products = await productService.list(queryOptions);
            setProducts(products);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (props.value && !products.find((x) => x.id === props.value)) {
            getProducts(props.value);
        } else if (!props.value) {
            getProducts();
        }
    }, [props.value]);

    const { Option } = Select;

    return (
        <Select
            {...props}
            onChange={(id: string) => {
                const item = products.find((x) => x.id === id);
                if (props.onChange) {
                    props.onChange(id, item);
                }
            }}
            showSearch
            allowClear
            autoClearSearchValue
            loading={loading}
            onSearch={useDebounce((value: string) => {
                getProducts(value);
            })}
            filterOption={(input, option) => {
                return option?.title.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }}
            notFoundContent={loading ? <Spin spinning={loading}></Spin> : null}
            style={{ width: '100%' }}
        >
            {products.map((x) => {
                return (
                    <Option
                        value={x.id}
                        title={x.name}
                        key={
                            props.variant && (x as any).variant
                                ? x.id
                                : `${x.id}-${(x as any).variant}`
                        }
                    >
                        {props.variant ? `${x.name}-${(x as any).variant}` : x.name}
                    </Option>
                );
            })}
        </Select>
    );
};

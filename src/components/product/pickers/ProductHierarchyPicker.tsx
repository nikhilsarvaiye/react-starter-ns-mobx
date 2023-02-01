import { useEffect, useState } from 'react';
import { AutoComplete } from 'antd';
import { distinct } from '@util/js-helper';
import { useDebounce } from '@util/debounce';
import { productService } from '@components/product/InitProducts';

export const ProductHierarchyPicker = ({
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    propertyName,
    defaultValues,
    style,
}: any) => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const get = async (key?: string) => {
        try {
            setLoading(true);
            const queryOptions = {
                filter: key
                    ? {
                          or: [
                              {
                                  [propertyName]: {
                                      startswith: key,
                                  },
                              },
                              {
                                  [propertyName]: {
                                      contains: key,
                                  },
                              },
                          ],
                      }
                    : {},
                select: [propertyName],
                top: 20,
            } as any;
            const products = await productService.list(queryOptions);
            let items = products
                .map((x) =>
                    propertyName.indexOf('.') > 0
                        ? (x as any)[propertyName.split('.')[0]] != null
                            ? (x as any)[propertyName.split('.')[0]][propertyName.split('.')[1]]
                            : null
                        : (x as any)[propertyName],
                )
                .filter((x) => x)
                .filter(distinct)
                .filter((x) => x);
            setItems([...(defaultValues || []), ...items]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        get();
    }, []);

    const { Option } = AutoComplete;

    return (
        <AutoComplete
            showSearch
            allowClear
            autoClearSearchValue
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onSearch={useDebounce((value: string) => {
                get(value);
            })}
            placeholder={placeholder}
            filterOption={(input, option) => {
                return option?.title?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }}
            style={style}
            
        >
            {items.map((x) => {
                return (
                    <Option value={x} title={x} key={x}>
                        {x}
                    </Option>
                );
            })}
        </AutoComplete>
    );
};

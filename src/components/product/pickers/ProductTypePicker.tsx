import { ProductHierarchyPicker } from './ProductHierarchyPicker';

export const ProductTypePicker = ({
    name,
    value,
    onChange,
    onBlur,
    placeholder,
}: any) => {
    return (
        <ProductHierarchyPicker
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            propertyName={'type'}
            placeholder={placeholder}
        />
    );
};

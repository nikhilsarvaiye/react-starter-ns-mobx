import { Product } from '@components/product/Product';
import { RouteObject } from 'react-router-dom';
import { Products } from './Products';

export const ProductRoutes = {
    path: 'products',
    children: [
        {
            path: '',
            element: <Products />,
        },
        {
            path: 'new',
            element: <Product />,
        },
        {
            path: ':id',
            element: <Product />,
        },
    ],
} as RouteObject;

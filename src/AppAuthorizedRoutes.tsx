import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProductRoutes } from '@components/product/ProductRoutes';
import { Products } from '@components/product/Products';
import { AppErrorPage } from './AppErrorPage';
import { UserRoutes } from '@components/user/UserRoutes';

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <AppErrorPage />,
        children: [
            {
                path: '',
                element: <Products />,
            },
            ProductRoutes,
            UserRoutes,
        ],
    },
]);

export const AppAuthorizedRoutes = () => {
    return <RouterProvider router={router} />;
};

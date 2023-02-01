import { UserLogin } from './auth/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Signup } from './auth/Signup';
import { ProductRoutes } from '@components/product/ProductRoutes';
import { UserRoutes } from '@components/user/UserRoutes';

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <UserLogin />,
        children: [
            {
                path: '',
                element: <UserLogin />,
            },
            {
                path: '/login',
                element: <UserLogin />,
            },
            {
                path: '/signup',
                element: <Signup />,
            },
            // NS: TODO
            // remove once below auth setup is done
            ProductRoutes,
            UserRoutes,
        ]
    },
]);

export const AppUnauthorizedRoutes = () => {
    return <RouterProvider router={router} />;
};

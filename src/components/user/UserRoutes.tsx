import { RouteObject } from 'react-router-dom';
import { User } from './User';
import { Users } from './Users';

export const UserRoutes = {
    path: 'users',
    children: [
        {
            path: '',
            element: <Users />,
        },
        {
            path: 'new',
            element: <User />,
        },
        {
            path: ':id',
            element: <User />,
        },
    ],
} as RouteObject;

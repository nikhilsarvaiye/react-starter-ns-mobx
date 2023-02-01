import buildQuery from 'odata-query';
import { Api } from '@components/base/api/base.api';
import { BaseService } from '@components/base/services/base.service';
import { IService } from '@components/base/services/iservice';
import { LoggedInUser, UserModel } from './user.models';

export class UserService extends BaseService<UserModel> implements IService<UserModel> {
    constructor() {
        super('User', 'user');
    }

    getByUserId = async (userId: string): Promise<UserModel | null> => {
        const queryOptions = {
            filter: {
                userId: userId,
            },
            top: 1,
        };
        const query = buildQuery(queryOptions);
        const response = await Api.get<UserModel[]>(`${this.routePath}${query}`);
        return response.data.length ? response.data[0] : null;
    };

    logIn = async (userId: string, password: string): Promise<LoggedInUser> => {
        return (
            await Api.post<LoggedInUser>(`${this.routePath}/login`, {
                userId: userId,
                password: password,
            })
        ).data;
    };

    updateTheme = async (id: string, theme: string): Promise<void> => {
        await Api.put(`${this.routePath}/update-theme/${id}/${theme}`);
    };
}

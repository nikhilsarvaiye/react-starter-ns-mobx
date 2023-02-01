import { Api } from '@components/base/api/base.api';
import { UserContext } from '@components/user/user.init';
import { UserService } from '@components/user/user.service';
import { LoggedInUser, UserModel } from '@components/user/user.models';
import { message } from 'antd';
import { AuthType, IAuthConfiguration } from './auth-types';
import { AzureAuthService } from './azure';
import { UsernamePasswordAuthService } from './username-password/username-password.auth.service';

export interface IAuthService {
    handleUnauthorized: () => void;
    logIn: (model?: any) => Promise<LoggedInUser>;
    logout: () => Promise<void>;
}

export class AuthService {
    userKey = 'userKey';
    routePath = 'authenticate';
    authService: IAuthService;

    constructor(public config: IAuthConfiguration, public userService: UserService) {
        switch (this.config.type) {
            case AuthType.Azure:
                this.authService = new AzureAuthService(config, this, userService);
                break;
            case AuthType.UsernamePassword:
                this.authService = new UsernamePasswordAuthService(config, this, userService);
                break;
            default:
                throw new Error('No IAuthService defined for ' + this.config.type);
        }
    }

    handleUnauthorized = (): void => {
        this.authService.handleUnauthorized();
    };

    reLogIn = async (storedUser: LoggedInUser): Promise<LoggedInUser | null> => {
        const options = {
            headers: {
                authorization: `Bearer ${storedUser.accessToken}`,
            },
        };
        let user = await this.userService.get(storedUser.user?.id, options);
        user = await this.updateUserFiles(user, options);
        return user === null
            ? null
            : new LoggedInUser(user, storedUser.accessToken, storedUser.configuration);
    };

    logIn = async (model?: any): Promise<void> => {
        let loggedInUser = await this.authService.logIn(model);
        if (loggedInUser.user) {
            loggedInUser.user = (await this.updateUserFiles(loggedInUser.user, {
                headers: {
                    authorization: `Bearer ${loggedInUser.accessToken}`,
                },
            })) as any;
            this.setUser(loggedInUser);
        }
    };

    logout = async (): Promise<void> => {
        this.clear();
        await this.authService.logout();
    };

    getUser = (): LoggedInUser | null => {
        const value = localStorage.getItem(this.userKey);
        return value ? JSON.parse(value) : null;
    };

    clear = (): void => {
        localStorage.removeItem(this.userKey);
    };

    authenticate = async (userId: string, password: string): Promise<LoggedInUser> => {
        return (
            await Api.post<LoggedInUser>(`${this.routePath}/login`, {
                userId: userId,
                password: password,
            })
        ).data;
    };

    register = async (t: UserModel): Promise<void> => {
        const user = (await Api.post<LoggedInUser>(`${this.routePath}/register`, t)).data;
        message.success('User registered successfully, Logging in...');
        if (user) {
            this.setUser(user);
        }
    };

    private setUser = (user: LoggedInUser) => {
        localStorage.setItem(this.userKey, JSON.stringify(user));
        UserContext.setLoggedInUser(user);
    };

    private updateUserFiles = async (user: UserModel | null, options: any) => {
        if (user && user.files && user.files.length) {
            const ids = user.files.map((x: any) => x.id);
            user.uploadFiles = await this.userService.getFiles(ids, options);
        }
        return user;
    };
}

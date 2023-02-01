import { userService } from '@components/user/user.init';
import { AppContext } from './../App.context';
import { appService } from './../app.service';
import { msalConfig } from './auth-config';
import { AuthType } from './auth-types';
import { AuthService } from './auth.service';
import { AuthStore } from './authStore';

const type = process.env.AUTHENTICATION_TYPE;
if (type) {
    AppContext.setAuthType(type as AuthType);
}

export const authService = new AuthService(
    {
        ...msalConfig,
        type: AppContext.authType,
    },
    userService,
);

export const authStore = new AuthStore(authService, userService, appService);

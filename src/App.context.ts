import { createContext, useContext } from 'react';
import { action, makeObservable, observable } from 'mobx';
// import _cloneDeep from 'lodash/cloneDeep';
import { AppSettings } from '@components/setting/setting.models';
import { AppError } from '@library/util/error';
import { AuthType } from './auth/auth-types';
// import { buildAppSetting } from '@library/dynamic-schema';

export enum ThemeType {
    Blue = 'blue',
    Green = 'green',
    Red = 'red',
    Purple = 'purple',
    Yellow = 'yellow',
    Pink = 'pink',
    LightBlue = 'light-blue',
    LightGreen = 'light-green',
    LightRed = 'light-red',
}

export class AppStore {
    loading = false;
    theme: ThemeType = ThemeType.Blue;
    authType: AuthType = AuthType.UsernamePassword;
    errors: AppError[] = [];
    settings: AppSettings;

    constructor() {
        this.settings = {};
        // this.settings = (buildAppSetting(_cloneDeep(DefaultSettings) as any) as any) as AppSettings;
        makeObservable(this, {
            loading: observable,
            theme: observable,
            errors: observable,
            settings: observable,
            setAuthType: action,
            setAppSettings: action,
        });
    }

    setAppSettings(appSettings: AppSettings) {
    }

    setAuthType(authType: AuthType): void {
        this.authType = authType;
    }

    setErrors(errors: AppError[]): void {
        this.errors = errors;
    }

    clearErrors(): void {
        this.errors = [];
    }
}

const appStore = new AppStore();
export { appStore as AppContext };


export const ReactAppContext = createContext<AppStore>(null as any);
export const useAppContext = () => {
    return useContext(ReactAppContext);
};

import { createContext, useContext } from 'react';
import { action, computed, makeObservable, observable } from 'mobx';
import { AppContext, ThemeType } from '../../App.context';
import { LoggedInUser } from './user.models';
import { UserService } from './user.service';

export class UserContextClass {
    LoggedInUser: LoggedInUser = null as any;
    constructor(public userService: UserService) {
        makeObservable(this, {
            LoggedInUser: observable,
            theme: computed,
            isLoggedIn: computed,
            setLoggedInUser: action,
            setTheme: action,
        });
    }

    get theme(): ThemeType {
        return this.isLoggedIn && this.LoggedInUser.user.theme
            ? (this.LoggedInUser.user.theme as ThemeType)
            : AppContext.theme;
    }

    get isLoggedIn(): boolean {
        return this.LoggedInUser != null;
    }

    setLoggedInUser = (user: LoggedInUser): void => {
        if (user && user.user) {
            user.user.pictureUrl = user.user.uploadFiles?.length
                ? user.user.uploadFiles[0].file.preview
                : '';
        }
        this.LoggedInUser = user;
    };

    setTheme = async (theme: ThemeType): Promise<void> => {
        if (this.isLoggedIn) {
            this.LoggedInUser = {
                ...this.LoggedInUser,
                user: {
                    ...this.LoggedInUser.user,
                    theme: theme,
                },
            };
            // this.LoggedInUser.user.theme = theme;
            await this.userService.updateTheme(this.LoggedInUser.user.id, theme.toString());
        }
    };
}

export const ReactUserContext = createContext<UserContextClass>(null as any);
export const useUserContext = () => {
    return useContext(ReactUserContext);
};

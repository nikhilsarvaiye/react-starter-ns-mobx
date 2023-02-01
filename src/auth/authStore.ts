import { message } from 'antd';
import { action, makeObservable, observable } from 'mobx';
import { AuthService } from 'auth/auth.service';
import { UserModel } from '@components/user/user.models';
import { AppContext } from './../App.context';
import { AppService } from './../app.service';
import { UserService } from '@components/user/user.service';
import { UserContext } from '@components/user/user.init';

export class AuthStore {
    loading = false;
    constructor(
        public authService: AuthService,
        public userService: UserService,
        public appService: AppService,
    ) {
        makeObservable(this, {
            loading: observable,
            register: action,
            logIn: action,
            loadAppSettings: action,
        });

        this.validate();
    }

    validate = async () => {
        try {
            this.loading = true;
            const storedUser = this.authService.getUser();

            if (!storedUser) {
                this.authService.handleUnauthorized();
                return;
            }

            try {
                const loggedInUser = await this.authService.reLogIn(storedUser);
                if (loggedInUser?.user) {
                    UserContext.setLoggedInUser(loggedInUser);
                    await this.loadAppSettings();
                } else {
                    this.authService.clear();
                    this.authService.handleUnauthorized();
                }
            } catch (e) {
                message.error('Something went wrong. Please try again letter');
            } finally {
                this.loading = false;
            }
        } finally {
            this.loading = false;
        }
    };

    loadAppSettings = async () => {
        const appService = new AppService();
        const appSettings = await appService.get();
        AppContext.setAppSettings(appSettings);
    };

    register = async (model: UserModel, onRegister?: () => void) => {
        try {
            this.loading = true;
            await this.authService.register(model);
            if (onRegister) {
                onRegister();
            }
        } finally {
            this.loading = false;
        }
    };

    logIn = async (user: UserModel) => {
        try {
            this.loading = true;
            await this.authService.logIn(user);
            await this.loadAppSettings();
            message.success(`Welcome`);
        } finally {
            this.loading = false;
        }
    };
}

import { IAuthConfiguration } from '../auth-types';
import { AuthService, IAuthService } from '../auth.service';
import { LoggedInUser } from '@components/user/user.models';
import { UserService } from '@components/user/user.service';

export class UsernamePasswordAuthService implements IAuthService {
    constructor(
        public config: IAuthConfiguration,
        public authService: AuthService,
        public userService: UserService,
    ) {}

    handleUnauthorized = (): void => {
    };

    logIn = async (model?: any): Promise<LoggedInUser> => {
        if (!model) {
            return null as any;
        }
        return await this.authService.authenticate(model.userId, model.password);
    };

    logout = async (): Promise<void> => {
        window.location.href = '/';
    };
}

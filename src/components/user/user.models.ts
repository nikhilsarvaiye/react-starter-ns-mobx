import { BaseModel } from '@components/base/models';

export class UserModel extends BaseModel {
    userId: string = '';
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    name?: string = '';
    pictureUrl?: string = '';
    address?: string = '';
    area?: string = '';
    landmark?: string = '';
    city?: string = '';
    state?: string = '';
    country?: string = '';
    zipcode?: string = '';
    theme?: string = '';
    mobile?: string = '';
    alertnateMobile?: string = '';
}

export class LoggedInUser {
    user: UserModel;
    accessToken: string;
    configuration?: any;

    constructor(user: UserModel, accessToken: string, configuration?: any) {
        this.user = user;
        this.accessToken = accessToken;
        this.configuration = configuration;
    }
}

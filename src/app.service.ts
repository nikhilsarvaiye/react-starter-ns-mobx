import { Api } from '@components/base/api/base.api';
import { AppSettings } from '@components/setting/setting.models';

export class AppService {
    routePath = 'appsettings';

    get = async (): Promise<AppSettings> => {
        const response = await Api.get<AppSettings>(this.routePath);
        return response.data;
    };
}

export const appService = new AppService();

import { Error } from '@library/error';
import { AppErrorType, getErrors } from '@library/util/error';
import { message, notification } from 'antd';

const disableInterceptor = (config: any = {}) => {
    return config.disableInterceptor ? true : false;
};

export const requestHandler = (request: any) => {
    if (!disableInterceptor(request)) {
        // Modify request here
        // request.headers['X-CodePen'] =
        //     'https://codepen.io/teroauralinna/full/vPvKWe';
    }
    return request;
};

export const errorHandler = (error: any) => {
    if (!disableInterceptor(error.config)) {
        var errors = getErrors(error);
        errors
            .filter((x) => x.type !== AppErrorType.Validation)
            .forEach((x) => {
                notification.error({
                    message: x.errorMessage,
                    description: x.description,
                });
            });

        const validationErrors = errors.filter(
            (x) => x.type === AppErrorType.Validation,
        );
        if (validationErrors.length) {
            message.error({
                // title: 'Validation Failed',
                content: <Error errors={validationErrors} />,
            });
        }
    }
    return Promise.reject({ ...error });
};

export const successHandler = (response: any) => {
    if (!disableInterceptor(response.config)) {
        // Handle responses
    }
    return response;
};

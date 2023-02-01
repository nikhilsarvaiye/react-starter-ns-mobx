export const PhoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const yupSync = (schema: any) => {
    return {
        async validator({ field }: any, value: any) {
            await schema.validateSyncAt(field, { [field]: value });
        },
    };
};

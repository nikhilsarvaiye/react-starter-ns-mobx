export enum SettingType {
    User = 1,
    Product = 2,
}

export interface AppSetting {
    type: SettingType;
}

export interface AppSettings {}

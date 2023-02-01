import { BaseModel } from '@components/base/models/base.model';

export class ProductMetadata extends BaseModel {
}

export class ProductModel extends BaseModel {
    name: string = '';
    description: string = '';
}

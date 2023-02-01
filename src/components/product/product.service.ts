import { BaseService } from '@components/base/services/base.service';
import { IService } from '@components/base/services/iservice';
import { ProductModel } from './product.models';

export class ProductService extends BaseService<ProductModel> implements IService<ProductModel> {
    constructor() {
        super('Product', 'product');
    }
}

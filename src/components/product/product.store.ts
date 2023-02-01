import { makeObservable, observable } from 'mobx';
import { QueryOptions } from 'odata-query';
import { SortOrder } from '@library/table/table.models';
import { BaseStore } from '@components/base/stores';
import { ProductModel } from './product.models';
import { ProductService } from './product.service';
import { UploadStore } from '@library/upload';

export class ProductStore extends BaseStore<ProductModel> {
    defaultValues: any = {
        id: '',
        uploadFiles: [],
        uploadStore: new UploadStore(),
    };
    titles = {
        name: 'Product',
        listName: 'Products',
    };
    searchCriteria = {
        page: 1,
        pageSize: 10,
        sortField: 'id',
        sortOrder: SortOrder.Descend,
        name: '',
    } as any;
    constructor(productService: ProductService) {
        super(productService);
        makeObservable(this, {
            searchCriteria: observable,
        });
    }

    buildQueryOptions = (
        queryOptions?: Partial<QueryOptions<ProductModel>>,
    ): Partial<QueryOptions<ProductModel>> => {
        queryOptions = this.buildDefaultQueryOptions(queryOptions);
        queryOptions.filter = {
            and: [
                this.searchCriteria.name
                    ? {
                          name: {
                              contains: this.searchCriteria.name,
                          },
                      }
                    : {},
            ],
        };
        return queryOptions;
    };
}

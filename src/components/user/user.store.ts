import { makeObservable, observable } from 'mobx';
import { QueryOptions } from 'odata-query';
import { SortOrder } from '@library/table/table.models';
import { BaseStore } from '@components/base/stores/base.store';
import { UserService } from './user.service';
import { UserModel } from './user.models';

export class UserStore extends BaseStore<UserModel> {
    defaultValues: any = {
        id: '',
        name: '',
    };
    titles = {
        name: 'User',
        listName: 'Users',
    };
    constructor(public userService: UserService) {
        super(userService);
        this.searchCriteria = {
            page: 1,
            pageSize: 10,
            sortField: 'id',
            sortOrder: SortOrder.Ascend,
            name: '',
        };
        makeObservable(this, {
            searchCriteria: observable,
        });
    }

    buildQueryOptions = (
        queryOptions?: Partial<QueryOptions<UserModel>>,
    ): Partial<QueryOptions<UserModel>> => {
        queryOptions = this.buildDefaultQueryOptions(queryOptions);
        queryOptions.filter = {
            and: [
                this.searchCriteria.userId
                    ? {
                          userId: this.searchCriteria.userId,
                      }
                    : {},
                this.searchCriteria.firstName
                    ? {
                          firstName: {
                              contains: this.searchCriteria.firstName,
                          },
                      }
                    : {},
                this.searchCriteria.lastName
                    ? {
                          lastName: {
                              contains: this.searchCriteria.lastName,
                          },
                      }
                    : {},
                this.searchCriteria.email
                    ? {
                          email: {
                              contains: this.searchCriteria.email,
                          },
                      }
                    : {},
            ],
        };
        return queryOptions;
    };
}

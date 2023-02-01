import { SortOrder } from '@library/table/table.models';

export interface ISearchCriteria {
    page: number;
    pageSize: number;
    sortField: string;
    sortOrder: SortOrder;
    [x: string]: any;
}

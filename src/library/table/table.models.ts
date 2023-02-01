
import {
    ColumnType,
    ExpandableConfig,
    Key,
    SorterResult,
    TableCurrentDataSource,
    TablePaginationConfig,
    TableRowSelection,
} from 'antd/lib/table/interface';
import { ColumnsType } from 'antd/lib/table';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

export enum SortOrder {
    Descend = 'descend',
    Ascend = 'ascend',
}
export enum TableLayout {
    Auto = 'auto',
    Fixed = 'fixed',
}
export type { TablePaginationConfig, Key, TableCurrentDataSource, SorterResult, ColumnsType, TableRowSelection, ExpandableConfig, ColumnType, SizeType };

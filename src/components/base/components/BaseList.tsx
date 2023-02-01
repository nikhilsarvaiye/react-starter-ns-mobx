import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Col, Form, Row, Space, Table, TablePaginationConfig, theme } from 'antd';
import { DeleteFilled, DownCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ColumnGroupType, ColumnType, RowSelectionType } from 'antd/es/table/interface';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Styles } from '@library/styles';
import { ContentListLayout } from '@components/layout/ContentLayouts';
import { IModel } from '../models';
import { BaseStore } from '../stores';

export interface BaseListProps {
    store: BaseStore<IModel>;
    searchFormFields?: ReactNode;
    headerCenterContent?: ReactNode;
    headerRightContent?: ReactNode;
    onSearchFormValueChange?: (changesValues: any, values: any) => void;
    onNew?: () => void;
    onEdit?: (model: IModel) => void;
    onSelectedRows?: (selectedRowKeys: React.Key[], selectedRows: IModel[]) => void;
    enableImport?: boolean;
    enableExport?: boolean;
    enableDelete?: boolean;
    hideSearch?: boolean;
    rowSelectionType?: RowSelectionType;
    // loading: boolean;
    // data: any[];
    // onChange: (
    //     pagination: TablePaginationConfig,
    //     filters: Record<string, (Key | boolean)[] | null>,
    //     sorter: SorterResult<any> | SorterResult<any>[],
    //     extra: TableCurrentDataSource<any>,
    // ) => void;
    // onDelete?: (id: string, index: number) => void;
    // onExport?: () => void;
}

export interface BaseListAdditionalProps extends BaseListProps {
    columns: (ColumnGroupType<any> | ColumnType<any>)[];
    headerTitleIcon?: IconDefinition | ReactNode;
    headerElements?: ReactElement[];
}

const _BaseList = (props: BaseListAdditionalProps) => {
    const { token } = theme.useToken();
    const [search, setSearch] = useState(true);
    const navigator = useNavigate();
    const [searchForm] = Form.useForm();

    const deleteColumn = {
        title: 'Delete',
        key: 'delete',
        width: '5em',
        render: (text: string, item: any, index: number) => (
            <Row justify={'center'}>
                <DeleteFilled
                    onClick={() => props.store.confirmDelete(item)}
                    color={token.colorError}
                />
            </Row>
        ),
    };
    const [columns, setColumns] = useState([
        ...props.columns,
        ...(props.enableDelete ? [deleteColumn] : []),
    ]);

    const pagination = {
        position: ['bottomCenter'],
        pageSize: props.store.searchCriteria.pageSize || 10,
        total: props.store.items.count,
        current: props.store.searchCriteria.page,
        showSizeChanger: true,
        hideOnSinglePage: true,
        showTotal: (total: number, range: [number, number]) => (
            <Row justify={'start'}>Total {total} Records</Row>
        ),
    } as false | TablePaginationConfig;

    const [searchFormValues, setSearchFormValues] = useState({});

    const onSearchFormValueChange = (changesValues: any, values: any) => {
        setSearchFormValues(values);
        if (props.onSearchFormValueChange) {
            props.onSearchFormValueChange(changesValues, values);
        }
    };

    const onFormSearch = (values: any) => {
        props.store.search(values || searchFormValues);
    };

    const onButtonSearch = () => {
        props.store.search(searchFormValues);
    };

    const onNew = () => {
        props.store.clearSelectedItem();
        navigator(`/${props.store.titles.listName.toLowerCase()}/new`);
        if (props.onNew) {
            props.onNew();
        }
    };

    const onChange = (selectedRowKeys: any, selectedRows: any) => {
        props.store.onSelectedRows(selectedRowKeys, selectedRows);
        if (props.onSelectedRows) {
            props.onSelectedRows(selectedRowKeys, selectedRows);
        }
    };

    useEffect(() => {
        props.store.search(props.store.searchCriteria);
    }, [props.store]);

    return (
        <ContentListLayout
            title={props.store.titles.listName}
            headerCenterContent={props.headerCenterContent}
            headerRightContent={
                props.headerRightContent || (
                    <Space>
                        <Button
                            onClick={() => {
                                setSearch(!search);
                            }}
                            type="link"
                            icon={<DownCircleOutlined />}
                        >
                            Show Search
                        </Button>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={onNew}
                            
                        >
                            New
                        </Button>
                    </Space>
                )
            }
        >
            {!props.hideSearch && search && (
                <Form
                    form={searchForm}
                    name="search"
                    initialValues={props.store.searchCriteria}
                    onFinish={onFormSearch}
                    autoComplete="off"
                    layout="vertical"
                    onValuesChange={onSearchFormValueChange}
                >
                    <Row
                        style={{
                            padding: 20,
                            borderBottom: Styles.border,
                        }}
                    >
                        <Col span={22}>{props.searchFormFields}</Col>
                        <Col span={1} offset={1}>
                            <Row justify={'end'}>
                                <Button
                                    // type="primary"
                                    htmlType="submit"
                                    onClick={onButtonSearch}
                                    
                                >
                                    Search
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            )}
            <Table
                columns={columns}
                dataSource={props.store.items.items}
                pagination={pagination}
                loading={props.store.loading}
                onChange={props.store.change}
                rowSelection={{
                    type: props.rowSelectionType || 'checkbox',
                    onChange: onChange,
                    columnTitle: '',
                    columnWidth: 50,
                }}
            ></Table>
        </ContentListLayout>
    );
};

export const BaseList = observer(_BaseList);

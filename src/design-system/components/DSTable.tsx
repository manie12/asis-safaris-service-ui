import type { ColumnsType, TableProps } from 'antd/es/table';
import { Table } from 'antd';

export type DSTableProps<RecordType extends object> = TableProps<RecordType> & {
  columns: ColumnsType<RecordType>;
};

export const DSTable = <RecordType extends object>({ columns, ...props }: DSTableProps<RecordType>) => {
  return <Table<RecordType> columns={columns} pagination={{ pageSize: 10 }} {...props} />;
};

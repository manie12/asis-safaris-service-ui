import type { ColumnsType } from 'antd/es/table';

import { DSTable } from '@/design-system/components/DSTable';

import { useOta } from '../api/useOta';

interface OtaRow {
  id: string;
  partner: string;
  status: 'active' | 'paused';
  lastSyncAt: string;
}

const columns: ColumnsType<OtaRow> = [
  { title: 'Partner', dataIndex: 'partner', key: 'partner' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { title: 'Last sync', dataIndex: 'lastSyncAt', key: 'lastSyncAt' },
];

const OtaMappingsTable = () => {
  const { data = [], isLoading } = useOta();

  return <DSTable<OtaRow> rowKey="id" columns={columns} dataSource={data} loading={isLoading} />;
};

export default OtaMappingsTable;

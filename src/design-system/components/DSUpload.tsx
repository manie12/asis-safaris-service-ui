import { InboxOutlined } from '@ant-design/icons';
import { Upload, type UploadProps } from 'antd';

export type DSUploadProps = UploadProps;

export const DSUpload = ({ style, ...props }: DSUploadProps) => (
  <Upload.Dragger
    multiple
    showUploadList
    style={{
      borderRadius: 24,
      padding: 24,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(250,246,240,0.92) 100%)',
      border: '1px dashed rgba(238, 92, 40, 0.4)',
      ...style,
    }}
    {...props}
  >
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Drag & drop or click to upload documents</p>
  </Upload.Dragger>
);

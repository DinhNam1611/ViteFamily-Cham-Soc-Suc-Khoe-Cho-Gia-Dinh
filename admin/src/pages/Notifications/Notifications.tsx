import { Table, Form, Input, Select, Button, DatePicker, Tag } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './Notifications.module.css';

interface NotifRow {
  key: string; title: string; targetGroup: string;
  scheduledAt: string; status: string; sentCount: number;
}

const mock: NotifRow[] = [
  { key: '1', title: 'Cập nhật chính sách hội viên VitaFamily', targetGroup: 'all', scheduledAt: '01/04/2026 09:00', status: 'sent', sentCount: 1248 },
  { key: '2', title: 'Thông báo bảo trì hệ thống đặt lịch', targetGroup: 'all', scheduledAt: '15/04/2026 22:00', status: 'sent', sentCount: 1248 },
  { key: '3', title: 'Nhắc nhở cập nhật hồ sơ bác sĩ', targetGroup: 'doctor', scheduledAt: '20/04/2026 10:00', status: 'sent', sentCount: 84 },
  { key: '4', title: 'Chương trình khám sức khỏe miễn phí', targetGroup: 'user', scheduledAt: '01/05/2026 08:00', status: 'scheduled', sentCount: 0 },
];

const targetLabel: Record<string, string> = { all: 'Tất cả', doctor: 'Bác sĩ', user: 'Bệnh nhân' };
const targetColor: Record<string, string> = { all: 'purple', doctor: 'blue', user: 'green' };
const statusLabel: Record<string, string> = { sent: 'Đã gửi', scheduled: 'Lên lịch', draft: 'Nháp' };
const statusColor: Record<string, string> = { sent: 'green', scheduled: 'orange', draft: 'default' };

const cols: ColumnsType<NotifRow> = [
  { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
  { title: 'Đối tượng', dataIndex: 'targetGroup', key: 'targetGroup', width: 120,
    render: (v: string) => <Tag color={targetColor[v]}>{targetLabel[v]}</Tag> },
  { title: 'Thời gian gửi', dataIndex: 'scheduledAt', key: 'scheduledAt', width: 160 },
  { title: 'Đã nhận', dataIndex: 'sentCount', key: 'sentCount', width: 90, align: 'center' },
  { title: 'Trạng thái', dataIndex: 'status', key: 'status', width: 110,
    render: (s: string) => <Tag color={statusColor[s]}>{statusLabel[s]}</Tag> },
];

const [form] = Form.useForm ? [Form.useForm()] : [null];

const Notifications = () => {
  const [notifForm] = Form.useForm();

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.pageTitle}>Gửi thông báo</h1>
        <p className={styles.pageSubtitle}>Soạn và phát hành thông báo đến người dùng</p>
      </div>

      <div className={styles.row2}>
        {/* Compose form */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Soạn thông báo mới</h3>
          <Form form={notifForm} layout="vertical">
            <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Nhập tiêu đề' }]}>
              <Input placeholder="Tiêu đề thông báo..." />
            </Form.Item>
            <Form.Item name="content" label="Nội dung" rules={[{ required: true, message: 'Nhập nội dung' }]}>
              <Input.TextArea rows={4} placeholder="Nội dung chi tiết..." />
            </Form.Item>
            <Form.Item name="targetGroup" label="Đối tượng nhận" initialValue="all">
              <Select>
                <Select.Option value="all">Tất cả người dùng</Select.Option>
                <Select.Option value="doctor">Chỉ bác sĩ</Select.Option>
                <Select.Option value="user">Chỉ bệnh nhân</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="url" label="URL đính kèm (tùy chọn)">
              <Input placeholder="https://..." />
            </Form.Item>
            <Form.Item name="scheduledAt" label="Lập lịch gửi (để trống = gửi ngay)">
              <DatePicker showTime style={{ width: '100%' }} format="DD/MM/YYYY HH:mm" />
            </Form.Item>
            <Button type="primary" icon={<SendOutlined />} style={{ background: '#0077C8', width: '100%' }}>
              Gửi thông báo
            </Button>
          </Form>
        </div>

        {/* History */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Lịch sử thông báo</h3>
          <Table dataSource={mock} columns={cols} pagination={{ pageSize: 5 }} size="small" scroll={{ x: 500 }} />
        </div>
      </div>
    </div>
  );
};

// suppress unused warning
void form;

export default Notifications;

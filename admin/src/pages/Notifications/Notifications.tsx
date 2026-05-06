import { useState } from 'react';
import { Table, Form, Input, Select, Button, DatePicker, Tag, Modal, message, Popconfirm } from 'antd';
import { SendOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './Notifications.module.css';

interface NotifRow {
  key: string;
  title: string;
  content: string;
  targetGroup: string;
  scheduledAt: string;
  status: string;
  sentCount: number;
}

const targetLabel: Record<string, string> = { all: 'Tất cả', doctor: 'Bác sĩ', user: 'Bệnh nhân' };
const targetColor: Record<string, string> = { all: 'purple', doctor: 'blue', user: 'green' };
const statusLabel: Record<string, string> = { sent: 'Đã gửi', scheduled: 'Lên lịch', draft: 'Nháp' };
const statusColor: Record<string, string> = { sent: 'green', scheduled: 'orange', draft: 'default' };

const initialHistory: NotifRow[] = [
  { key: '1', title: 'Cập nhật chính sách hội viên VitaFamily', content: 'Kính gửi quý hội viên, chúng tôi xin thông báo...', targetGroup: 'all', scheduledAt: '01/04/2026 09:00', status: 'sent', sentCount: 1248 },
  { key: '2', title: 'Thông báo bảo trì hệ thống đặt lịch', content: 'Hệ thống sẽ bảo trì từ 22:00 ngày 15/04...', targetGroup: 'all', scheduledAt: '15/04/2026 22:00', status: 'sent', sentCount: 1248 },
  { key: '3', title: 'Nhắc nhở cập nhật hồ sơ bác sĩ', content: 'Kính gửi bác sĩ, vui lòng cập nhật hồ sơ...', targetGroup: 'doctor', scheduledAt: '20/04/2026 10:00', status: 'sent', sentCount: 84 },
  { key: '4', title: 'Chương trình khám sức khỏe miễn phí', content: 'VitaFamily tổ chức khám sức khỏe miễn phí...', targetGroup: 'user', scheduledAt: '01/05/2026 08:00', status: 'scheduled', sentCount: 0 },
];

const Notifications = () => {
  const [history, setHistory] = useState<NotifRow[]>(initialHistory);
  const [notifForm] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<{ title: string; content: string; targetGroup: string; scheduledAt: string } | null>(null);

  // Khi bấm "Gửi thông báo", hiển thị preview trước thay vì gửi ngay
  const handleOpenPreview = () => {
    notifForm.validateFields().then((values) => {
      setPreviewData({
        title: values.title,
        content: values.content,
        targetGroup: values.targetGroup ?? 'all',
        scheduledAt: values.scheduledAt
          ? values.scheduledAt.format('DD/MM/YYYY HH:mm')
          : 'Gửi ngay lập tức',
      });
      setPreviewOpen(true);
    });
  };

  // Xác nhận gửi sau khi đã preview
  const handleConfirmSend = () => {
    if (!previewData) return;
    const newRow: NotifRow = {
      key: String(Date.now()),
      title: previewData.title,
      content: previewData.content,
      targetGroup: previewData.targetGroup,
      scheduledAt: previewData.scheduledAt === 'Gửi ngay lập tức'
        ? new Date().toLocaleString('vi-VN')
        : previewData.scheduledAt,
      status: previewData.scheduledAt === 'Gửi ngay lập tức' ? 'sent' : 'scheduled',
      sentCount: previewData.scheduledAt === 'Gửi ngay lập tức' ? 1200 : 0,
    };
    setHistory((prev) => [newRow, ...prev]);
    message.success(
      previewData.scheduledAt === 'Gửi ngay lập tức'
        ? 'Đã gửi thông báo thành công'
        : 'Đã lên lịch gửi thông báo',
    );
    notifForm.resetFields();
    setPreviewOpen(false);
  };

  // Hủy thông báo đã lên lịch
  const handleCancelScheduled = (key: string) => {
    setHistory((prev) => prev.filter((r) => r.key !== key));
    message.success('Đã hủy thông báo đã lên lịch');
  };

  const cols: ColumnsType<NotifRow> = [
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title', ellipsis: true },
    {
      title: 'Đối tượng', dataIndex: 'targetGroup', key: 'targetGroup', width: 120,
      render: (v: string) => <Tag color={targetColor[v]}>{targetLabel[v]}</Tag>,
    },
    { title: 'Thời gian gửi', dataIndex: 'scheduledAt', key: 'scheduledAt', width: 160 },
    { title: 'Đã nhận', dataIndex: 'sentCount', key: 'sentCount', width: 90, align: 'center' },
    {
      title: 'Trạng thái', dataIndex: 'status', key: 'status', width: 110,
      render: (s: string) => <Tag color={statusColor[s]}>{statusLabel[s]}</Tag>,
    },
    {
      title: 'Thao tác', key: 'act', width: 80, fixed: 'right' as const,
      render: (_, r) =>
        r.status === 'scheduled' ? (
          <Popconfirm
            title="Hủy thông báo đã lên lịch?"
            description="Thông báo sẽ không được gửi đi."
            okText="Hủy lịch" cancelText="Không" okButtonProps={{ danger: true }}
            onConfirm={() => handleCancelScheduled(r.key)}
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.pageTitle}>Gửi thông báo</h1>
        <p className={styles.pageSubtitle}>Soạn và phát hành thông báo đến người dùng</p>
      </div>

      <div className={styles.row2}>
        {/* Form soạn thông báo */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Soạn thông báo mới</h3>
          <Form form={notifForm} layout="vertical">
            <Form.Item
              name="title" label="Tiêu đề"
              rules={[{ required: true, message: 'Nhập tiêu đề' }]}
              extra="Tối đa 60 ký tự — push notification sẽ bị cắt nếu dài hơn"
            >
              <Input placeholder="Tiêu đề thông báo..." maxLength={60} showCount />
            </Form.Item>
            <Form.Item
              name="content" label="Nội dung"
              rules={[{ required: true, message: 'Nhập nội dung' }]}
            >
              <Input.TextArea rows={4} placeholder="Nội dung chi tiết..." />
            </Form.Item>
            <Form.Item name="targetGroup" label="Đối tượng nhận" initialValue="all">
              <Select>
                <Select.Option value="all">Tất cả người dùng</Select.Option>
                <Select.Option value="doctor">Chỉ bác sĩ</Select.Option>
                <Select.Option value="user">Chỉ bệnh nhân</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="url" label="URL đính kèm (tùy chọn)"
              rules={[{
                type: 'url',
                message: 'URL không hợp lệ (phải bắt đầu bằng http:// hoặc https://)',
              }]}
            >
              <Input placeholder="https://..." />
            </Form.Item>
            <Form.Item name="scheduledAt" label="Lập lịch gửi (để trống = gửi ngay)">
              <DatePicker showTime style={{ width: '100%' }} format="DD/MM/YYYY HH:mm" />
            </Form.Item>
            <Button
              type="primary" icon={<SendOutlined />}
              style={{ background: '#0077C8', width: '100%' }}
              onClick={handleOpenPreview}
            >
              Xem trước & Gửi
            </Button>
          </Form>
        </div>

        {/* Lịch sử thông báo */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Lịch sử thông báo</h3>
          <Table
            dataSource={history}
            columns={cols}
            rowKey="key"
            pagination={{ pageSize: 5 }}
            size="small"
            scroll={{ x: 'max-content' }}
          />
        </div>
      </div>

      {/* Modal preview trước khi gửi */}
      <Modal
        title="Xác nhận trước khi gửi"
        open={previewOpen}
        onOk={handleConfirmSend}
        onCancel={() => setPreviewOpen(false)}
        okText="Xác nhận gửi"
        cancelText="Quay lại chỉnh sửa"
        width={480}
      >
        {previewData && (
          <div style={{ lineHeight: 1.8 }}>
            <p><b>Tiêu đề:</b> {previewData.title}</p>
            <p><b>Nội dung:</b> {previewData.content}</p>
            <p>
              <b>Đối tượng:</b>{' '}
              <Tag color={targetColor[previewData.targetGroup]}>
                {targetLabel[previewData.targetGroup]}
              </Tag>
            </p>
            <p><b>Thời gian:</b> {previewData.scheduledAt}</p>
            <p style={{ color: '#faad14', marginTop: 12 }}>
              ⚠️ Sau khi xác nhận, thông báo sẽ được gửi đi và không thể thu hồi nếu đã gửi ngay.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Notifications;

import { Table, Rate, Select, Button, Space, Popconfirm, Tag } from 'antd';
import { EyeInvisibleOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './Reviews.module.css';

interface ReviewRow {
  key: string; patient: string; doctor: string;
  rating: number; comment: string; date: string; status: string;
}

const mock: ReviewRow[] = [
  { key: '1', patient: 'Nguyễn Văn An', doctor: 'BS. Trần Thị Bình', rating: 5, comment: 'Bác sĩ rất tận tâm và chu đáo. Rất hài lòng!', date: '28/04/2026', status: 'visible' },
  { key: '2', patient: 'Lê Văn Cường', doctor: 'BS. Phạm Minh Đức', rating: 3, comment: 'Dịch vụ bình thường, thời gian chờ hơi lâu.', date: '27/04/2026', status: 'visible' },
  { key: '3', patient: 'Trần Thị Em', doctor: 'BS. Nguyễn Văn Phú', rating: 1, comment: 'Thái độ không tốt, không hài lòng chút nào.', date: '26/04/2026', status: 'hidden' },
  { key: '4', patient: 'Phạm Thu Hà', doctor: 'BS. Lê Thị Hoa', rating: 4, comment: 'Khám kỹ lưỡng, giải thích rõ ràng.', date: '25/04/2026', status: 'visible' },
];

const Reviews = () => {
  const cols: ColumnsType<ReviewRow> = [
    { title: 'Bệnh nhân', dataIndex: 'patient', key: 'patient', width: 150 },
    { title: 'Bác sĩ', dataIndex: 'doctor', key: 'doctor', width: 180 },
    { title: 'Đánh giá', dataIndex: 'rating', key: 'rating', width: 150, render: (v: number) => <Rate disabled value={v} style={{ fontSize: 14 }} /> },
    { title: 'Nhận xét', dataIndex: 'comment', key: 'comment' },
    { title: 'Ngày', dataIndex: 'date', key: 'date', width: 120 },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', width: 110,
      render: (s: string) => <Tag color={s === 'visible' ? 'green' : 'default'}>{s === 'visible' ? 'Hiển thị' : 'Đã ẩn'}</Tag> },
    {
      title: 'Thao tác', key: 'act', width: 140, fixed: 'right' as const,
      render: (_, r) => (
        <Space>
          <Popconfirm title={r.status === 'visible' ? 'Ẩn đánh giá này?' : 'Hiện lại?'} okText="Xác nhận" cancelText="Hủy">
            <Button type="link" size="small" icon={r.status === 'visible' ? <EyeInvisibleOutlined /> : <EyeOutlined />}>
              {r.status === 'visible' ? 'Ẩn' : 'Hiện'}
            </Button>
          </Popconfirm>
          <Popconfirm title="Xóa vĩnh viễn?" okText="Xóa" cancelText="Hủy" okButtonProps={{ danger: true }}>
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.pageTitle}>Quản lý đánh giá</h1>
        <p className={styles.pageSubtitle}>Kiểm soát chất lượng phản hồi từ bệnh nhân</p>
      </div>
      <div className={styles.card}>
        <div className={styles.toolbar}>
          <Select defaultValue="all" style={{ width: 160 }}>
            <Select.Option value="all">Tất cả trạng thái</Select.Option>
            <Select.Option value="visible">Đang hiển thị</Select.Option>
            <Select.Option value="hidden">Đã ẩn</Select.Option>
          </Select>
          <Select defaultValue="all" style={{ width: 130 }}>
            <Select.Option value="all">Tất cả sao</Select.Option>
            {[1,2,3,4,5].map((n) => <Select.Option key={n} value={String(n)}>{n} sao</Select.Option>)}
          </Select>
        </div>
        <Table dataSource={mock} columns={cols}
          pagination={{ pageSize: 10, showTotal: (t) => `${t} đánh giá` }}
          scroll={{ x: 900 }} size="middle" />
      </div>
    </div>
  );
};

export default Reviews;

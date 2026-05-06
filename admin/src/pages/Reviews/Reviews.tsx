import { useState } from 'react';
import {
  Table, Rate, Select, Button, Space, Popconfirm, Tag, Tooltip,
  Input, Modal, Form, Row, Col, Statistic, message,
} from 'antd';
import {
  EyeInvisibleOutlined, DeleteOutlined, EyeOutlined, SearchOutlined,
  StarFilled,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './Reviews.module.css';

interface ReviewRow {
  key: string;
  patient: string;
  doctor: string;
  rating: number;
  comment: string;
  date: string;
  status: string;
  hideReason?: string;
}

const initialData: ReviewRow[] = [
  { key: '1', patient: 'Nguyễn Văn An', doctor: 'BS. Trần Thị Bình', rating: 5, comment: 'Bác sĩ rất tận tâm và chu đáo. Rất hài lòng!', date: '28/04/2026', status: 'visible' },
  { key: '2', patient: 'Lê Văn Cường', doctor: 'BS. Phạm Minh Đức', rating: 3, comment: 'Dịch vụ bình thường, thời gian chờ hơi lâu.', date: '27/04/2026', status: 'visible' },
  { key: '3', patient: 'Trần Thị Em', doctor: 'BS. Nguyễn Văn Phú', rating: 1, comment: 'Thái độ không tốt, không hài lòng chút nào.', date: '26/04/2026', status: 'hidden', hideReason: 'Nội dung chưa được xác minh' },
  { key: '4', patient: 'Phạm Thu Hà', doctor: 'BS. Lê Thị Hoa', rating: 4, comment: 'Khám kỹ lưỡng, giải thích rõ ràng.', date: '25/04/2026', status: 'visible' },
  { key: '5', patient: 'Hoàng Văn Minh', doctor: 'BS. Trần Thị Bình', rating: 2, comment: 'Chờ lâu quá, bác sĩ tiếp đón chưa nhiệt tình.', date: '24/04/2026', status: 'visible' },
];

const Reviews = () => {
  const [data, setData] = useState<ReviewRow[]>(initialData);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');

  const [hideModalOpen, setHideModalOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [hideForm] = Form.useForm();

  const filtered = data.filter((r) => {
    const matchSearch =
      r.patient.toLowerCase().includes(search.toLowerCase()) ||
      r.doctor.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchRating = ratingFilter === 'all' || r.rating === Number(ratingFilter);
    return matchSearch && matchStatus && matchRating;
  });

  const openHideModal = (key: string) => {
    setSelectedKey(key);
    hideForm.resetFields();
    setHideModalOpen(true);
  };

  const handleHide = () => {
    hideForm.validateFields().then((values) => {
      setData((prev) =>
        prev.map((r) =>
          r.key === selectedKey
            ? { ...r, status: 'hidden', hideReason: values.reason }
            : r,
        ),
      );
      message.success('Đã ẩn đánh giá');
      setHideModalOpen(false);
    });
  };

  const handleShow = (key: string) => {
    setData((prev) =>
      prev.map((r) =>
        r.key === key ? { ...r, status: 'visible', hideReason: undefined } : r,
      ),
    );
    message.success('Đã hiện lại đánh giá');
  };

  const handleDelete = (key: string) => {
    setData((prev) => prev.filter((r) => r.key !== key));
    message.success('Đã xóa đánh giá');
  };

  // Thống kê phân bổ sao
  const totalVisible = data.filter((r) => r.status === 'visible').length;
  const avgRating = data.length > 0
    ? (data.reduce((s, r) => s + r.rating, 0) / data.length).toFixed(1)
    : '—';
  const starCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: data.filter((r) => r.rating === star).length,
  }));

  const cols: ColumnsType<ReviewRow> = [
    { title: 'Bệnh nhân', dataIndex: 'patient', key: 'patient', width: 150 },
    { title: 'Bác sĩ', dataIndex: 'doctor', key: 'doctor', width: 180 },
    {
      title: 'Đánh giá', dataIndex: 'rating', key: 'rating', width: 160,
      render: (v: number) => <Rate disabled value={v} style={{ fontSize: 14 }} />,
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: 'Nhận xét', dataIndex: 'comment', key: 'comment',
      render: (v: string, r) => (
        <div>
          <span style={{ color: r.rating <= 2 ? '#cf1322' : undefined }}>{v}</span>
          {r.hideReason && (
            <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>
              Lý do ẩn: {r.hideReason}
            </div>
          )}
        </div>
      ),
    },
    { title: 'Ngày', dataIndex: 'date', key: 'date', width: 120 },
    {
      title: 'Trạng thái', dataIndex: 'status', key: 'status', width: 120,
      render: (s: string) => (
        <Tag color={s === 'visible' ? 'green' : 'default'}>
          {s === 'visible' ? 'Hiển thị' : 'Đã ẩn'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác', key: 'act', width: 90, fixed: 'right' as const,
      render: (_, r) => (
        <Space size={4}>
          {r.status === 'visible' ? (
            <Tooltip title="Ẩn đánh giá (cần lý do)">
              <Button
                type="link" size="small" icon={<EyeInvisibleOutlined />}
                onClick={() => openHideModal(r.key)}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Hiện lại đánh giá">
              <Popconfirm
                title="Hiện lại đánh giá này?"
                okText="Xác nhận" cancelText="Hủy"
                onConfirm={() => handleShow(r.key)}
              >
                <Button type="link" size="small" style={{ color: '#52c41a' }} icon={<EyeOutlined />} />
              </Popconfirm>
            </Tooltip>
          )}
          <Tooltip title="Xóa vĩnh viễn">
            <Popconfirm
              title="Xóa vĩnh viễn đánh giá này?"
              description="Hành động này không thể hoàn tác."
              okText="Xóa" cancelText="Hủy" okButtonProps={{ danger: true }}
              onConfirm={() => handleDelete(r.key)}
            >
              <Button type="link" size="small" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
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

      {/* Thống kê tổng quan */}
      <div className={styles.card} style={{ marginBottom: 16 }}>
        <Row gutter={24} align="middle">
          <Col>
            <Statistic
              title="Đánh giá trung bình"
              value={avgRating}
              prefix={<StarFilled style={{ color: '#faad14' }} />}
              suffix="/ 5"
            />
          </Col>
          <Col>
            <Statistic title="Đang hiển thị" value={totalVisible} suffix={`/ ${data.length}`} />
          </Col>
          <Col flex="auto">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {starCounts.map(({ star, count }) => (
                <Tag key={star} color={star <= 2 ? 'red' : star === 3 ? 'orange' : 'green'}>
                  {star}★ : {count}
                </Tag>
              ))}
            </div>
          </Col>
        </Row>
      </div>

      <div className={styles.card}>
        <div className={styles.toolbar}>
          <Input
            prefix={<SearchOutlined style={{ color: '#6B7C99' }} />}
            placeholder="Tìm bệnh nhân, bác sĩ, nội dung..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 280 }}
            allowClear
          />
          <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 160 }}>
            <Select.Option value="all">Tất cả trạng thái</Select.Option>
            <Select.Option value="visible">Đang hiển thị</Select.Option>
            <Select.Option value="hidden">Đã ẩn</Select.Option>
          </Select>
          <Select value={ratingFilter} onChange={setRatingFilter} style={{ width: 130 }}>
            <Select.Option value="all">Tất cả sao</Select.Option>
            {[1, 2, 3, 4, 5].map((n) => (
              <Select.Option key={n} value={String(n)}>{n} sao</Select.Option>
            ))}
          </Select>
        </div>
        <Table
          dataSource={filtered}
          columns={cols}
          rowKey="key"
          pagination={{ pageSize: 10, showTotal: (t) => `${t} đánh giá` }}
          scroll={{ x: 'max-content' }}
          size="middle"
          rowClassName={(r) => (r.rating <= 2 ? styles.lowRatingRow ?? '' : '')}
        />
      </div>

      {/* Modal nhập lý do ẩn */}
      <Modal
        title="Ẩn đánh giá"
        open={hideModalOpen}
        onOk={handleHide}
        onCancel={() => setHideModalOpen(false)}
        okText="Xác nhận ẩn"
        okButtonProps={{ danger: true }}
        cancelText="Hủy"
        destroyOnHidden
      >
        <p style={{ marginBottom: 12, color: '#595959' }}>
          Vui lòng nhập lý do ẩn để lưu audit trail. Lý do sẽ không hiển thị cho bệnh nhân.
        </p>
        <Form form={hideForm} layout="vertical">
          <Form.Item
            name="reason"
            label="Lý do ẩn"
            rules={[{ required: true, message: 'Vui lòng nhập lý do ẩn đánh giá' }]}
          >
            <Input.TextArea
              rows={3}
              placeholder="VD: Nội dung chưa xác minh, vi phạm quy định, nghi ngờ spam..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Reviews;

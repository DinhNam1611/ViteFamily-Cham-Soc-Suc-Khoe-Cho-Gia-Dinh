import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button, Tabs, Descriptions, Avatar, Tag, Space, Badge,
  Table, Switch, Modal, Select, message, Form, Input,
  Popconfirm, Empty, Divider, Card, Tooltip, Alert,
  DatePicker, TimePicker, InputNumber, Rate,
} from 'antd';
import {
  ArrowLeftOutlined, UserOutlined, CheckCircleOutlined,
  CloseCircleOutlined, EditOutlined, CalendarOutlined,
  MedicineBoxOutlined, ProfileOutlined,
  PlusOutlined, FormOutlined, DeleteOutlined,
  StarOutlined, WarningOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import styles from './DoctorDetail.module.css';

// ── Types ──────────────────────────────────────────────────────────────────
type ApprovalStatus = 'pending' | 'approved' | 'rejected';
type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
type AppointmentType = 'in-clinic' | 'home' | 'video';

interface TimeSlot { start: string; end: string; }

interface AppointmentItem {
  id: number; patientName: string; patientPhone: string;
  time: string; type: AppointmentType; reason: string;
  status: AppointmentStatus; cancelReason?: string;
}

interface ScheduleRow {
  key: string; id: number; date: string;
  timeSlots: TimeSlot[]; maxPatients: number;
  currentPatients: number; active: boolean;
  appointments: AppointmentItem[];
}

interface ReviewItem {
  id: number; patientName: string; rating: number;
  comment: string; date: string; appointmentId: number;
}

interface DoctorDetailData {
  id: number; name: string; email: string; phone: string;
  specialty: string; hospital: string; experience: string;
  bio: string; qualifications: string;
  approvalStatus: ApprovalStatus; rejectionReason?: string;
  submittedAt: string; schedules: ScheduleRow[]; reviews: ReviewItem[];
}

// ── Helpers ────────────────────────────────────────────────────────────────
const formatSlots = (ts: TimeSlot[]) => ts.map((t) => `${t.start}–${t.end}`).join(' · ');

// ── Mock data ──────────────────────────────────────────────────────────────
const MOCK_DOCTORS: Record<string, DoctorDetailData> = {
  '1': {
    id: 1, name: 'BS. Nguyễn Minh Tú', email: 'tu@gmail.com', phone: '0901111111',
    specialty: 'Tim mạch', hospital: 'BV Chợ Rẫy', experience: '8 năm',
    bio: 'Bác sĩ chuyên khoa Tim mạch với 8 năm kinh nghiệm tại BV Chợ Rẫy.',
    qualifications: 'Bác sĩ CKI Tim mạch\nChứng chỉ Siêu âm tim và mạch máu\nChứng chỉ Can thiệp mạch vành',
    approvalStatus: 'pending', submittedAt: '28/04/2026',
    schedules: [
      {
        key: '1', id: 1, date: '05/05/2026',
        timeSlots: [{ start: '08:00', end: '11:00' }, { start: '13:30', end: '16:30' }],
        maxPatients: 20, currentPatients: 3, active: true,
        appointments: [
          { id: 101, patientName: 'Nguyễn Văn An', patientPhone: '0901234567', time: '08:30', type: 'in-clinic', reason: 'Đau ngực, khó thở khi gắng sức', status: 'confirmed' },
          { id: 102, patientName: 'Trần Thị Bình', patientPhone: '0912345678', time: '09:00', type: 'in-clinic', reason: 'Kiểm tra huyết áp định kỳ', status: 'pending' },
          { id: 103, patientName: 'Lê Văn Cường', patientPhone: '0923456789', time: '14:00', type: 'video', reason: 'Tư vấn sau phẫu thuật van tim', status: 'pending' },
        ],
      },
      {
        key: '2', id: 2, date: '06/05/2026',
        timeSlots: [{ start: '08:00', end: '11:00' }],
        maxPatients: 10, currentPatients: 2, active: true,
        appointments: [
          { id: 104, patientName: 'Phạm Thị Dung', patientPhone: '0934567890', time: '08:00', type: 'in-clinic', reason: 'Khó thở khi gắng sức', status: 'confirmed' },
          { id: 105, patientName: 'Hoàng Văn Em', patientPhone: '0945678901', time: '09:30', type: 'home', reason: 'Bệnh nhân cao tuổi, khó đi lại', status: 'pending' },
        ],
      },
      {
        key: '3', id: 3, date: '08/05/2026',
        timeSlots: [{ start: '13:30', end: '16:30' }],
        maxPatients: 10, currentPatients: 0, active: false,
        appointments: [],
      },
    ],
    reviews: [
      { id: 1, patientName: 'Nguyễn Văn An', rating: 5, comment: 'Bác sĩ rất tận tâm, giải thích rõ ràng.', date: '02/05/2026', appointmentId: 101 },
      { id: 2, patientName: 'Trần Thị Bình', rating: 4, comment: 'Khám kỹ lưỡng, thái độ tốt, chỉ hơi chờ lâu.', date: '01/05/2026', appointmentId: 102 },
    ],
  },
  '2': {
    id: 2, name: 'BS. Trần Thị Lan', email: 'lan@gmail.com', phone: '0902222222',
    specialty: 'Nhi khoa', hospital: 'BV Nhi đồng 1', experience: '5 năm',
    bio: 'Chuyên gia Nhi khoa với 5 năm kinh nghiệm điều trị bệnh nhi.',
    qualifications: 'Thạc sĩ Nhi khoa\nChứng chỉ Nhi khoa cộng đồng',
    approvalStatus: 'pending', submittedAt: '27/04/2026',
    schedules: [
      {
        key: '1', id: 1, date: '05/05/2026',
        timeSlots: [{ start: '08:00', end: '12:00' }],
        maxPatients: 15, currentPatients: 2, active: true,
        appointments: [
          { id: 201, patientName: 'Trần Bảo Khang', patientPhone: '0901111222', time: '08:00', type: 'in-clinic', reason: 'Sốt cao 3 ngày, ho', status: 'pending' },
          { id: 202, patientName: 'Lý Minh Châu', patientPhone: '0902222333', time: '09:30', type: 'in-clinic', reason: 'Khám sức khỏe định kỳ', status: 'confirmed' },
        ],
      },
    ],
    reviews: [
      { id: 3, patientName: 'Trần Bảo Khang', rating: 5, comment: 'Bác sĩ rất nhẹ nhàng với trẻ nhỏ.', date: '30/04/2026', appointmentId: 201 },
    ],
  },
  '3': {
    id: 3, name: 'BS. Lê Văn Hùng', email: 'hung@gmail.com', phone: '0903333333',
    specialty: 'Thần kinh', hospital: 'BV 115', experience: '12 năm',
    bio: 'Bác sĩ Thần kinh học với 12 năm kinh nghiệm điều trị các bệnh lý thần kinh.',
    qualifications: 'Bác sĩ CKII Thần kinh học\nChứng chỉ Điện não đồ (EEG)\nChứng chỉ Siêu âm Doppler mạch não',
    approvalStatus: 'approved', submittedAt: '20/04/2026',
    schedules: [
      {
        key: '1', id: 1, date: '05/05/2026',
        timeSlots: [{ start: '07:30', end: '11:00' }, { start: '14:00', end: '17:00' }],
        maxPatients: 24, currentPatients: 3, active: true,
        appointments: [
          { id: 301, patientName: 'Phan Văn Minh', patientPhone: '0910101010', time: '07:30', type: 'in-clinic', reason: 'Đau đầu kéo dài, chóng mặt', status: 'completed' },
          { id: 302, patientName: 'Bùi Thị Thu', patientPhone: '0920202020', time: '08:30', type: 'in-clinic', reason: 'Tê liệt tay phải sau tai biến', status: 'confirmed' },
          { id: 303, patientName: 'Trương Quang Hải', patientPhone: '0930303030', time: '14:00', type: 'video', reason: 'Tư vấn phục hồi sau đột quỵ', status: 'pending' },
        ],
      },
    ],
    reviews: [
      { id: 4, patientName: 'Phan Văn Minh', rating: 4, comment: 'Chẩn đoán chính xác, điều trị hiệu quả.', date: '28/04/2026', appointmentId: 301 },
      { id: 5, patientName: 'Bùi Thị Thu', rating: 5, comment: 'Bác sĩ rất tận tâm với bệnh nhân nặng.', date: '27/04/2026', appointmentId: 302 },
    ],
  },
  '4': {
    id: 4, name: 'BS. Phạm Thu Hà', email: 'ha@gmail.com', phone: '0904444444',
    specialty: 'Da liễu', hospital: 'BV Da liễu', experience: '6 năm',
    bio: 'Chuyên khoa Da liễu và thẩm mỹ da.', qualifications: 'Bác sĩ CKI Da liễu\nChứng chỉ Laser da',
    approvalStatus: 'approved', submittedAt: '18/04/2026', schedules: [], reviews: [],
  },
  '5': {
    id: 5, name: 'BS. Vũ Công Minh', email: 'minh@gmail.com', phone: '0905555555',
    specialty: 'Chỉnh hình', hospital: 'BV Chấn thương', experience: '9 năm',
    bio: 'Bác sĩ Chỉnh hình và phục hồi chức năng.', qualifications: 'Bác sĩ CKI Chỉnh hình\nChứng chỉ Phẫu thuật khớp nội soi',
    approvalStatus: 'rejected', rejectionReason: 'Bằng cấp chưa được xác minh, thiếu chứng chỉ hành nghề hợp lệ.',
    submittedAt: '15/04/2026', schedules: [], reviews: [],
  },
};

const SPECIALTIES = ['Tim mạch', 'Nhi khoa', 'Thần kinh', 'Da liễu', 'Chỉnh hình', 'Nội tổng quát', 'Tai mũi họng', 'Mắt'];
const HOSPITALS = ['BV Chợ Rẫy', 'BV Nhi đồng 1', 'BV 115', 'BV Da liễu', 'BV Chấn thương', 'BV Đại học Y Dược'];

const approvalColor: Record<ApprovalStatus, string> = { pending: 'orange', approved: 'green', rejected: 'red' };
const approvalLabel: Record<ApprovalStatus, string> = { pending: 'Chờ duyệt', approved: 'Đã duyệt', rejected: 'Từ chối' };
const apptTypeColor: Record<AppointmentType, string> = { 'in-clinic': 'blue', home: 'green', video: 'purple' };
const apptTypeLabel: Record<AppointmentType, string> = { 'in-clinic': 'Tại viện', home: 'Tại nhà', video: 'Video' };
const apptStatusBadge: Record<AppointmentStatus, 'warning' | 'processing' | 'success' | 'error'> = {
  pending: 'warning', confirmed: 'processing', completed: 'success', cancelled: 'error',
};
const apptStatusLabel: Record<AppointmentStatus, string> = {
  pending: 'Chờ xác nhận', confirmed: 'Đã xác nhận', completed: 'Hoàn thành', cancelled: 'Đã hủy',
};
const nextStatusOptions: Record<AppointmentStatus, { value: AppointmentStatus; label: string }[]> = {
  pending: [{ value: 'confirmed', label: 'Xác nhận lịch hẹn' }, { value: 'cancelled', label: 'Hủy lịch hẹn' }],
  confirmed: [{ value: 'completed', label: 'Đánh dấu hoàn thành' }, { value: 'cancelled', label: 'Hủy lịch hẹn' }],
  completed: [],
  cancelled: [],
};

// ── Component ──────────────────────────────────────────────────────────────
const DoctorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState<DoctorDetailData | null>(
    id ? (MOCK_DOCTORS[id] ?? null) : null,
  );
  const [activeTab, setActiveTab] = useState('info');
  const [infoForm] = Form.useForm();

  // Appointment modal state
  const [apptModalOpen, setApptModalOpen] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState<{ scheduleId: number; appt: AppointmentItem } | null>(null);
  const [newStatus, setNewStatus] = useState<AppointmentStatus | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  // Schedule CRUD modal state
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleRow | null>(null);
  const [scheduleForm] = Form.useForm();

  // Reject reason modal state
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectForm] = Form.useForm();

  // Populate schedule form after modal opens (destroyOnHidden ensures fresh mount)
  useEffect(() => {
    if (!scheduleModalOpen) return;
    if (editingSchedule) {
      scheduleForm.setFieldsValue({
        date: dayjs(editingSchedule.date, 'DD/MM/YYYY'),
        timeSlots: editingSchedule.timeSlots.map((ts) => ({
          start: dayjs(ts.start, 'HH:mm'),
          end: dayjs(ts.end, 'HH:mm'),
        })),
        maxPatients: editingSchedule.maxPatients,
      });
    } else {
      scheduleForm.setFieldsValue({ timeSlots: [{}], maxPatients: 10 });
    }
  }, [scheduleModalOpen, editingSchedule, scheduleForm]);

  if (!doctor) {
    return (
      <div className={styles.notFound}>
        <p>Không tìm thấy thông tin bác sĩ.</p>
        <Button onClick={() => navigate('/admin/doctors')}>Quay lại danh sách</Button>
      </div>
    );
  }

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSaveInfo = () => {
    infoForm.validateFields().then((values) => {
      setDoctor((prev) => (prev ? { ...prev, ...values } : prev));
      message.success('Đã lưu thông tin bác sĩ');
    });
  };

  const handleApprove = () => {
    setDoctor((prev) => (prev ? { ...prev, approvalStatus: 'approved', rejectionReason: undefined } : prev));
    message.success('Đã duyệt hồ sơ bác sĩ');
  };

  const openRejectModal = () => { rejectForm.resetFields(); setRejectModalOpen(true); };

  const handleConfirmReject = (values: { reason: string }) => {
    setDoctor((prev) => (prev ? { ...prev, approvalStatus: 'rejected', rejectionReason: values.reason } : prev));
    message.warning('Đã từ chối hồ sơ bác sĩ');
    setRejectModalOpen(false);
  };

  const doToggle = (key: string, active: boolean) => {
    setDoctor((prev) =>
      prev ? { ...prev, schedules: prev.schedules.map((s) => (s.key === key ? { ...s, active } : s)) } : prev,
    );
    message.success(active ? 'Đã kích hoạt lịch làm việc' : 'Đã tạm dừng lịch làm việc');
  };

  const handleToggleSchedule = (scheduleKey: string, active: boolean) => {
    if (!active) {
      const schedule = doctor.schedules.find((s) => s.key === scheduleKey);
      const activeCount =
        schedule?.appointments.filter((a) => a.status === 'pending' || a.status === 'confirmed').length ?? 0;
      if (activeCount > 0) {
        Modal.confirm({
          title: 'Tạm dừng lịch làm việc?',
          icon: <WarningOutlined style={{ color: '#FFC107' }} />,
          content: `Ca này còn ${activeCount} lịch hẹn đang hoạt động. Tạm dừng sẽ không tự hủy các lịch hẹn đó. Tiếp tục?`,
          okText: 'Tạm dừng', cancelText: 'Hủy', okButtonProps: { danger: true },
          onOk: () => doToggle(scheduleKey, false),
        });
        return;
      }
    }
    doToggle(scheduleKey, active);
  };

  const openAddSchedule = () => { setEditingSchedule(null); setScheduleModalOpen(true); };
  const openEditSchedule = (s: ScheduleRow) => { setEditingSchedule(s); setScheduleModalOpen(true); };

  const handleSaveSchedule = (values: {
    date: Dayjs;
    timeSlots: { start: Dayjs; end: Dayjs }[];
    maxPatients: number;
  }) => {
    // Kiểm tra end > start cho mỗi khung giờ
    for (const ts of values.timeSlots) {
      if (ts.end.isBefore(ts.start) || ts.end.isSame(ts.start)) {
        message.error('Giờ kết thúc phải sau giờ bắt đầu trong mỗi khung giờ');
        return;
      }
    }

    // Kiểm tra trùng ngày (không cho thêm 2 ca cùng ngày, trừ khi đang sửa ca đó)
    const newDateStr = values.date.format('DD/MM/YYYY');
    const duplicateExists = doctor.schedules.some(
      (s) => s.date === newDateStr && s.key !== editingSchedule?.key,
    );
    if (duplicateExists) {
      message.error(`Đã có ca làm việc vào ngày ${newDateStr}. Hãy chỉnh sửa ca hiện có thay vì thêm mới.`);
      return;
    }

    const saved: ScheduleRow = {
      key: editingSchedule?.key ?? String(Date.now()),
      id: editingSchedule?.id ?? Date.now(),
      date: values.date.format('DD/MM/YYYY'),
      timeSlots: values.timeSlots.map((ts) => ({ start: ts.start.format('HH:mm'), end: ts.end.format('HH:mm') })),
      maxPatients: values.maxPatients,
      currentPatients: editingSchedule?.currentPatients ?? 0,
      active: editingSchedule?.active ?? true,
      appointments: editingSchedule?.appointments ?? [],
    };
    setDoctor((prev) => {
      if (!prev) return prev;
      const list = editingSchedule
        ? prev.schedules.map((s) => (s.key === editingSchedule.key ? saved : s))
        : [...prev.schedules, saved];
      return {
        ...prev,
        schedules: [...list].sort((a, b) =>
          dayjs(a.date, 'DD/MM/YYYY').diff(dayjs(b.date, 'DD/MM/YYYY')),
        ),
      };
    });
    message.success(editingSchedule ? 'Đã cập nhật ca làm việc' : 'Đã thêm ca làm việc mới');
    setScheduleModalOpen(false);
  };

  const handleDeleteSchedule = (key: string) => {
    const schedule = doctor.schedules.find((s) => s.key === key);
    // Không cho xóa ca nếu còn lịch hẹn pending hoặc confirmed
    const activeAppts = schedule?.appointments.filter(
      (a) => a.status === 'pending' || a.status === 'confirmed',
    ).length ?? 0;
    if (activeAppts > 0) {
      message.error(
        `Không thể xóa — ca này còn ${activeAppts} lịch hẹn đang hoạt động. Hãy hủy hết lịch hẹn trước.`,
      );
      return;
    }
    setDoctor((prev) =>
      prev ? { ...prev, schedules: prev.schedules.filter((s) => s.key !== key) } : prev,
    );
    message.success('Đã xóa ca làm việc');
  };

  const openApptModal = (scheduleId: number, appt: AppointmentItem) => {
    setSelectedAppt({ scheduleId, appt });
    setNewStatus(null);
    setCancelReason('');
    setApptModalOpen(true);
  };

  const closeApptModal = () => {
    setApptModalOpen(false);
    setNewStatus(null);
    setCancelReason('');
  };

  const handleUpdateApptStatus = () => {
    if (!newStatus || !selectedAppt) return;
    setDoctor((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        schedules: prev.schedules.map((s) => {
          if (s.id !== selectedAppt.scheduleId) return s;
          const updatedAppts = s.appointments.map((a) =>
            a.id !== selectedAppt.appt.id
              ? a
              : { ...a, status: newStatus, ...(newStatus === 'cancelled' && { cancelReason }) },
          );
          const activeCount = updatedAppts.filter(
            (a) => a.status === 'pending' || a.status === 'confirmed',
          ).length;
          return { ...s, appointments: updatedAppts, currentPatients: activeCount };
        }),
      };
    });
    message.success('Đã cập nhật trạng thái lịch hẹn');
    closeApptModal();
  };

  // ── Expandable row (appointment list) ─────────────────────────────────────
  const expandedRowRender = (schedule: ScheduleRow) => {
    const apptCols: ColumnsType<AppointmentItem> = [
      {
        title: 'Bệnh nhân', key: 'patient', width: 180,
        render: (_, a) => (
          <div>
            <p className={styles.patientName}>{a.patientName}</p>
            <p className={styles.patientPhone}>{a.patientPhone}</p>
          </div>
        ),
      },
      { title: 'Giờ hẹn', dataIndex: 'time', key: 'time', width: 90 },
      {
        title: 'Hình thức', dataIndex: 'type', key: 'type', width: 110,
        render: (t: AppointmentType) => <Tag color={apptTypeColor[t]}>{apptTypeLabel[t]}</Tag>,
      },
      { title: 'Lý do khám', dataIndex: 'reason', key: 'reason', ellipsis: true },
      {
        title: 'Trạng thái', dataIndex: 'status', key: 'status', width: 150,
        render: (s: AppointmentStatus) => <Badge status={apptStatusBadge[s]} text={apptStatusLabel[s]} />,
      },
      {
        title: 'Thao tác', key: 'act', width: 70, fixed: 'right' as const,
        render: (_, a) => (
          <Tooltip title="Xem chi tiết">
            <Button type="link" size="small" icon={<ProfileOutlined />} onClick={() => openApptModal(schedule.id, a)} />
          </Tooltip>
        ),
      },
    ];
    return (
      <div className={styles.innerTable}>
        <Table dataSource={schedule.appointments} columns={apptCols} rowKey="id" pagination={false} size="small" scroll={{ x: 700 }} />
      </div>
    );
  };

  // ── Schedule table columns ─────────────────────────────────────────────────
  const scheduleCols: ColumnsType<ScheduleRow> = [
    { title: 'Ngày làm việc', dataIndex: 'date', key: 'date', width: 130 },
    { title: 'Khung giờ', key: 'slots', width: 230, render: (_, s) => formatSlots(s.timeSlots) },
    {
      title: 'Lịch hẹn', key: 'count', width: 190,
      render: (_, s) => (
        <Space>
          <Tag color={s.appointments.length > 0 ? 'blue' : 'default'}>{s.appointments.length} lịch hẹn</Tag>
          <span className={styles.patientRatio}>({s.currentPatients}/{s.maxPatients} đang đặt)</span>
        </Space>
      ),
    },
    {
      title: 'Trạng thái', key: 'active', width: 150,
      render: (_, s) => (
        <Switch checked={s.active} onChange={(v) => handleToggleSchedule(s.key, v)} checkedChildren="Hoạt động" unCheckedChildren="Tạm dừng" />
      ),
    },
    {
      title: 'Thao tác', key: 'act', width: 90, fixed: 'right' as const,
      render: (_, s) => (
        <Space size={4}>
          <Tooltip title="Chỉnh sửa ca">
            <Button type="link" size="small" icon={<FormOutlined />} onClick={() => openEditSchedule(s)} />
          </Tooltip>
          <Tooltip title="Xóa ca">
            <Popconfirm
              title="Xóa ca làm việc này?"
              description={s.appointments.length > 0 ? `Ca này có ${s.appointments.length} lịch hẹn. Không thể hoàn tác.` : undefined}
              okText="Xóa" okType="danger" cancelText="Hủy"
              onConfirm={() => handleDeleteSchedule(s.key)}
            >
              <Button type="link" size="small" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  // ── Tab 1: Thông tin Bác Sĩ ────────────────────────────────────────────────
  const infoTab = (
    <div className={styles.tabContent}>
      <Card className={styles.profileCard} bordered={false}>
        <div className={styles.profileHeader}>
          <Avatar size={72} icon={<UserOutlined />} className={styles.profileAvatar} />
          <div className={styles.profileInfo}>
            <p className={styles.profileName}>{doctor.name}</p>
            <Space size={6} wrap>
              <Tag color="blue">{doctor.specialty}</Tag>
              <Tag color="default">{doctor.hospital}</Tag>
              <Tag color={approvalColor[doctor.approvalStatus]}>{approvalLabel[doctor.approvalStatus]}</Tag>
            </Space>
          </div>
        </div>
      </Card>

      <Descriptions bordered size="small" column={2} className={styles.descriptions}>
        <Descriptions.Item label="Email">{doctor.email}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">{doctor.phone}</Descriptions.Item>
        <Descriptions.Item label="Kinh nghiệm">{doctor.experience}</Descriptions.Item>
        <Descriptions.Item label="Ngày nộp hồ sơ">{doctor.submittedAt}</Descriptions.Item>
      </Descriptions>

      <div className={styles.editSection}>
        <p className={styles.sectionTitle}><EditOutlined style={{ marginRight: 6 }} />Chỉnh sửa thông tin</p>
        <Form form={infoForm} layout="vertical" initialValues={{ name: doctor.name, phone: doctor.phone, specialty: doctor.specialty, hospital: doctor.hospital, experience: doctor.experience, bio: doctor.bio, qualifications: doctor.qualifications }}>
          <div className={styles.formGrid}>
            <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: 'Nhập họ tên' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phone"><Input /></Form.Item>
            <Form.Item label="Chuyên khoa" name="specialty" rules={[{ required: true }]}>
              <Select>{SPECIALTIES.map((s) => <Select.Option key={s} value={s}>{s}</Select.Option>)}</Select>
            </Form.Item>
            <Form.Item label="Bệnh viện" name="hospital" rules={[{ required: true }]}>
              <Select>{HOSPITALS.map((h) => <Select.Option key={h} value={h}>{h}</Select.Option>)}</Select>
            </Form.Item>
          </div>
          <Form.Item label="Kinh nghiệm" name="experience"><Input placeholder="VD: 8 năm" /></Form.Item>
          <Form.Item label="Giới thiệu / Bio" name="bio"><Input.TextArea rows={3} /></Form.Item>
          <Form.Item label="Bằng cấp & Chứng chỉ" name="qualifications">
            <Input.TextArea rows={3} placeholder="Mỗi dòng một chứng chỉ..." />
          </Form.Item>
          <Button type="primary" onClick={handleSaveInfo}>Lưu thay đổi</Button>
        </Form>
      </div>

      {doctor.approvalStatus === 'pending' && (
        <Alert
          message="Hồ sơ đang chờ duyệt"
          description={
            <div>
              <p style={{ marginBottom: 12 }}>
                Sau khi duyệt, bác sĩ sẽ <b>hiển thị công khai</b> và bệnh nhân có thể đặt lịch khám.
                Lịch làm việc chỉ thiết lập được sau khi hồ sơ được duyệt.
              </p>
              <Space>
                <Popconfirm
                  title="Duyệt hồ sơ bác sĩ này?"
                  description="Bác sĩ sẽ hiển thị trên hệ thống và bệnh nhân có thể đặt lịch."
                  okText="Duyệt" cancelText="Hủy"
                  onConfirm={handleApprove}
                >
                  <Button type="primary" icon={<CheckCircleOutlined />}>Duyệt hồ sơ</Button>
                </Popconfirm>
                <Button danger icon={<CloseCircleOutlined />} onClick={openRejectModal}>Từ chối</Button>
              </Space>
            </div>
          }
          type="warning"
          showIcon
          style={{ marginTop: 16 }}
        />
      )}

      {doctor.approvalStatus === 'rejected' && (
        <div className={styles.rejectedPanel}>
          <p className={styles.rejectedTitle}><CloseCircleOutlined style={{ marginRight: 6 }} />Hồ sơ đã bị từ chối</p>
          {doctor.rejectionReason && <p className={styles.rejectedReason}>Lý do: {doctor.rejectionReason}</p>}
        </div>
      )}
    </div>
  );

  // ── Tab 2: Lịch Làm Việc ──────────────────────────────────────────────────
  const sortedSchedules = [...doctor.schedules].sort((a, b) =>
    dayjs(a.date, 'DD/MM/YYYY').diff(dayjs(b.date, 'DD/MM/YYYY')),
  );

  const scheduleTab = (
    <div className={styles.tabContent}>
      <div className={styles.scheduleHeader}>
        <p className={styles.sectionTitle}>
          <CalendarOutlined style={{ marginRight: 6 }} />
          Danh sách ca làm việc
          {doctor.schedules.length > 0 && <span className={styles.schedBadge}>{doctor.schedules.length}</span>}
        </p>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAddSchedule} style={{ background: '#0077C8' }}>
          Thêm ca làm việc
        </Button>
      </div>
      {sortedSchedules.length === 0 ? (
        <Empty description="Bác sĩ chưa thiết lập lịch làm việc" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <Table
          dataSource={sortedSchedules}
          columns={scheduleCols}
          rowKey="key"
          pagination={false}
          size="middle"
          expandable={{
            expandedRowRender,
            expandRowByClick: false,
            rowExpandable: (s) => s.appointments.length > 0,
          }}
          scroll={{ x: 700 }}
        />
      )}
    </div>
  );

  // ── Tab 3: Đánh giá ────────────────────────────────────────────────────────
  const avgRating =
    doctor.reviews.length > 0
      ? doctor.reviews.reduce((sum, r) => sum + r.rating, 0) / doctor.reviews.length
      : 0;

  const reviewCols: ColumnsType<ReviewItem> = [
    { title: 'Bệnh nhân', dataIndex: 'patientName', key: 'patientName', width: 160 },
    { title: 'Đánh giá', dataIndex: 'rating', key: 'rating', width: 170, render: (r: number) => <Rate disabled value={r} style={{ fontSize: 13 }} /> },
    { title: 'Nhận xét', dataIndex: 'comment', key: 'comment', ellipsis: true },
    { title: 'Ngày', dataIndex: 'date', key: 'date', width: 120 },
  ];

  const reviewsTab = (
    <div className={styles.tabContent}>
      {doctor.reviews.length === 0 ? (
        <Empty description="Chưa có đánh giá nào" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <>
          <div className={styles.reviewSummary}>
            <span className={styles.reviewAvg}>{avgRating.toFixed(1)}</span>
            <Rate disabled value={avgRating} allowHalf style={{ fontSize: 20 }} />
            <span className={styles.reviewCount}>{doctor.reviews.length} đánh giá</span>
          </div>
          <Table dataSource={doctor.reviews} rowKey="id" columns={reviewCols} size="middle" pagination={{ pageSize: 10, showTotal: (t) => `${t} đánh giá` }} scroll={{ x: 600 }} />
        </>
      )}
    </div>
  );

  // ── Appointment modal vars ──────────────────────────────────────────────────
  const appt = selectedAppt?.appt;
  const canUpdate = appt ? nextStatusOptions[appt.status].length > 0 : false;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/admin/doctors')} className={styles.backBtn}>
          Quay lại danh sách
        </Button>
        <div className={styles.headerMeta}>
          <span className={styles.headerName}>{doctor.name}</span>
          <Tag color={approvalColor[doctor.approvalStatus]} style={{ marginLeft: 8 }}>
            {approvalLabel[doctor.approvalStatus]}
          </Tag>
        </div>
      </div>

      <div className={styles.card}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'info',
              label: <span><MedicineBoxOutlined style={{ marginRight: 6 }} />Thông tin Bác Sĩ</span>,
              children: infoTab,
            },
            {
              key: 'schedule',
              disabled: doctor.approvalStatus !== 'approved',
              label: (
                <Tooltip
                  title={
                    doctor.approvalStatus !== 'approved'
                      ? 'Duyệt hồ sơ trước khi thiết lập lịch làm việc'
                      : undefined
                  }
                >
                  <span>
                    <CalendarOutlined style={{ marginRight: 6 }} />Lịch Làm Việc
                    {doctor.schedules.length > 0 && <span className={styles.schedBadge}>{doctor.schedules.length}</span>}
                  </span>
                </Tooltip>
              ),
              children: scheduleTab,
            },
            {
              key: 'reviews',
              label: (
                <span>
                  <StarOutlined style={{ marginRight: 6 }} />Đánh giá
                  {doctor.reviews.length > 0 && <span className={styles.schedBadge}>{doctor.reviews.length}</span>}
                </span>
              ),
              children: reviewsTab,
            },
          ]}
        />
      </div>

      {/* ── Appointment detail & status modal ── */}
      <Modal
        title={`Chi tiết lịch hẹn #${appt?.id ?? ''}`}
        open={apptModalOpen}
        onCancel={closeApptModal}
        footer={
          canUpdate ? (
            <div className={styles.modalFooter}>
              <Button onClick={closeApptModal}>Đóng</Button>
              <Popconfirm
                title="Xác nhận cập nhật?"
                description={
                  newStatus === 'cancelled'
                    ? 'Lịch hẹn sẽ bị hủy, không thể khôi phục.'
                    : newStatus === 'completed'
                    ? 'Đánh dấu hoàn thành — không thể đổi lại.'
                    : 'Xác nhận thay đổi trạng thái?'
                }
                onConfirm={handleUpdateApptStatus}
                okText="Xác nhận" cancelText="Hủy"
                disabled={!newStatus}
              >
                <Button type="primary" disabled={!newStatus}>Cập nhật trạng thái</Button>
              </Popconfirm>
            </div>
          ) : (
            <Button onClick={closeApptModal}>Đóng</Button>
          )
        }
        width={480}
      >
        {appt && (
          <div className={styles.apptModalContent}>
            <Descriptions bordered size="small" column={1}>
              <Descriptions.Item label="Bệnh nhân">
                <strong>{appt.patientName}</strong> — {appt.patientPhone}
              </Descriptions.Item>
              <Descriptions.Item label="Giờ hẹn">{appt.time}</Descriptions.Item>
              <Descriptions.Item label="Hình thức">
                <Tag color={apptTypeColor[appt.type]}>{apptTypeLabel[appt.type]}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Lý do khám">{appt.reason}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Badge status={apptStatusBadge[appt.status]} text={apptStatusLabel[appt.status]} />
              </Descriptions.Item>
              {appt.status === 'cancelled' && appt.cancelReason && (
                <Descriptions.Item label="Lý do hủy">
                  <span className={styles.cancelText}>{appt.cancelReason}</span>
                </Descriptions.Item>
              )}
            </Descriptions>

            {canUpdate ? (
              <>
                <Divider style={{ margin: '16px 0 12px' }} />
                <p className={styles.updateLabel}>Cập nhật trạng thái:</p>
                <Select
                  placeholder="Chọn trạng thái mới..."
                  style={{ width: '100%' }}
                  value={newStatus}
                  onChange={(v) => { setNewStatus(v); if (v !== 'cancelled') setCancelReason(''); }}
                >
                  {nextStatusOptions[appt.status].map((o) => (
                    <Select.Option key={o.value} value={o.value}>{o.label}</Select.Option>
                  ))}
                </Select>
                {newStatus === 'cancelled' && (
                  <div className={styles.cancelReasonBlock}>
                    <p className={styles.updateLabel}>Lý do hủy:</p>
                    <Input.TextArea
                      rows={2}
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      placeholder="Nhập lý do hủy lịch hẹn (không bắt buộc)..."
                    />
                  </div>
                )}
              </>
            ) : (
              <div className={styles.finalState}>
                Lịch hẹn này đã ở trạng thái cuối — không thể cập nhật thêm.
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* ── Schedule CRUD modal ── */}
      <Modal
        title={editingSchedule ? 'Chỉnh sửa ca làm việc' : 'Thêm ca làm việc mới'}
        open={scheduleModalOpen}
        onCancel={() => setScheduleModalOpen(false)}
        onOk={() => scheduleForm.submit()}
        okText="Lưu" cancelText="Hủy"
        destroyOnHidden
        width={520}
      >
        <Form form={scheduleForm} layout="vertical" onFinish={handleSaveSchedule} style={{ marginTop: 16 }}>
          <Form.Item label="Ngày làm việc" name="date" rules={[{ required: true, message: 'Chọn ngày làm việc' }]}>
            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Khung giờ làm việc" required>
            <Form.List name="timeSlots">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name }) => (
                    <div key={key} className={styles.slotRow}>
                      <Form.Item name={[name, 'start']} rules={[{ required: true, message: 'Chọn giờ bắt đầu' }]} style={{ marginBottom: 0, flex: 1 }}>
                        <TimePicker format="HH:mm" minuteStep={30} placeholder="Bắt đầu" style={{ width: '100%' }} />
                      </Form.Item>
                      <span className={styles.slotSep}>–</span>
                      <Form.Item name={[name, 'end']} rules={[{ required: true, message: 'Chọn giờ kết thúc' }]} style={{ marginBottom: 0, flex: 1 }}>
                        <TimePicker format="HH:mm" minuteStep={30} placeholder="Kết thúc" style={{ width: '100%' }} />
                      </Form.Item>
                      {fields.length > 1 && (
                        <Tooltip title="Xóa khung giờ">
                          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => remove(name)} style={{ flexShrink: 0 }} />
                        </Tooltip>
                      )}
                    </div>
                  ))}
                  {fields.length < 3 && (
                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} style={{ marginTop: 8, width: '100%' }}>
                      Thêm khung giờ
                    </Button>
                  )}
                </>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item label="Số bệnh nhân tối đa" name="maxPatients" rules={[{ required: true, message: 'Nhập số bệnh nhân tối đa' }]}>
            <InputNumber min={1} max={100} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* ── Reject reason modal ── */}
      <Modal
        title="Từ chối hồ sơ bác sĩ"
        open={rejectModalOpen}
        onCancel={() => setRejectModalOpen(false)}
        onOk={() => rejectForm.submit()}
        okText="Xác nhận từ chối"
        okButtonProps={{ danger: true }}
        cancelText="Hủy"
        destroyOnHidden
      >
        <Form form={rejectForm} layout="vertical" onFinish={handleConfirmReject} style={{ marginTop: 16 }}>
          <Form.Item name="reason" label="Lý do từ chối" rules={[{ required: true, message: 'Vui lòng nhập lý do từ chối' }]}>
            <Input.TextArea rows={4} placeholder="Nêu rõ lý do để bác sĩ có thể chỉnh sửa và nộp lại hồ sơ..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DoctorDetail;

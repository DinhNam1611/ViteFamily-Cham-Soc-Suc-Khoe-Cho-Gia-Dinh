import { useState, useEffect, useMemo } from 'react';
import {
  Input,
  Select,
  Button,
  Tag,
  Empty,
  Spin,
  message,
  Modal,
  Collapse,
} from 'antd';
import {
  SearchOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  UserOutlined,
  BankOutlined,
  DownloadOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import * as profileService from '../../services/profileService';
import type { MedicalRecord, MedicalFile } from '../../types';
import styles from './TestResults.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' } }),
};

interface FileIconProps {
  type: MedicalFile['fileType'];
}

const FileIcon = ({ type }: FileIconProps) =>
  type === 'pdf' ? (
    <FilePdfOutlined className={styles.fileIconPdf} />
  ) : (
    <FileImageOutlined className={styles.fileIconImg} />
  );

const TestResults = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [memberFilter, setMemberFilter] = useState<string | undefined>();
  const [previewFile, setPreviewFile] = useState<MedicalFile | null>(null);

  useEffect(() => {
    profileService
      .getMedicalRecords()
      .then(setRecords)
      .catch(() => message.error('Không thể tải hồ sơ khám bệnh'))
      .finally(() => setLoading(false));
  }, []);

  const memberOptions = useMemo(() => {
    const names = [...new Set(records.map((r) => r.memberName))];
    return names.map((n) => ({ value: n, label: n }));
  }, [records]);

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const matchMember = !memberFilter || r.memberName === memberFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        r.hospitalName.toLowerCase().includes(q) ||
        r.doctorName.toLowerCase().includes(q) ||
        r.reason.toLowerCase().includes(q) ||
        (r.diagnosis ?? '').toLowerCase().includes(q);
      return matchMember && matchSearch;
    });
  }, [records, search, memberFilter]);

  const totalFiles = useMemo(() => filtered.reduce((sum, r) => sum + r.files.length, 0), [filtered]);

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.loadingWrap}>
          <Spin size="large" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <FileTextOutlined />
            </div>
            <div>
              <h1 className={styles.pageTitle}>Kết quả xét nghiệm</h1>
              <p className={styles.pageSubtitle}>
                {filtered.length} hồ sơ · {totalFiles} tệp đính kèm
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          className={styles.filterBar}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm theo bệnh viện, bác sĩ, lý do khám..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
            className={styles.searchInput}
          />
          <Select
            placeholder="Lọc theo thành viên"
            options={memberOptions}
            value={memberFilter}
            onChange={setMemberFilter}
            allowClear
            className={styles.memberSelect}
          />
        </motion.div>

        {/* Records list */}
        {filtered.length === 0 ? (
          <div className={styles.emptyWrap}>
            <Empty description="Không tìm thấy hồ sơ khám bệnh nào." />
          </div>
        ) : (
          <div className={styles.list}>
            {filtered.map((record, i) => (
              <motion.div
                key={record.id}
                className={styles.card}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                {/* Card top */}
                <div className={styles.cardTop}>
                  <div className={styles.dateBlock}>
                    <CalendarOutlined className={styles.dateIcon} />
                    <div>
                      <span className={styles.dateText}>
                        {dayjs(record.visitDate).format('DD/MM/YYYY')}
                      </span>
                      <span className={styles.dateSub}>
                        {dayjs(record.visitDate).format('dddd').replace(/^\w/, (c) => c.toUpperCase())}
                      </span>
                    </div>
                  </div>

                  <Tag color="blue" className={styles.memberTag}>
                    <UserOutlined /> {record.memberName}
                  </Tag>
                </div>

                {/* Card body */}
                <div className={styles.cardBody}>
                  <div className={styles.metaGrid}>
                    <div className={styles.metaItem}>
                      <BankOutlined className={styles.metaIcon} />
                      <div>
                        <p className={styles.metaLabel}>Cơ sở khám</p>
                        <p className={styles.metaValue}>{record.hospitalName}</p>
                      </div>
                    </div>
                    <div className={styles.metaItem}>
                      <MedicineBoxOutlined className={styles.metaIcon} />
                      <div>
                        <p className={styles.metaLabel}>Bác sĩ điều trị</p>
                        <p className={styles.metaValue}>{record.doctorName}</p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.reasonBlock}>
                    <p className={styles.reasonLabel}>Lý do khám:</p>
                    <p className={styles.reasonText}>{record.reason}</p>
                  </div>

                  {record.diagnosis && (
                    <div className={styles.diagnosisBlock}>
                      <p className={styles.diagnosisLabel}>Chẩn đoán:</p>
                      <p className={styles.diagnosisText}>{record.diagnosis}</p>
                    </div>
                  )}

                  {record.notes && (
                    <div className={styles.notesBlock}>
                      <p className={styles.notesText}>{record.notes}</p>
                    </div>
                  )}
                </div>

                {/* Files */}
                {record.files.length > 0 && (
                  <Collapse
                    ghost
                    className={styles.fileCollapse}
                    items={[
                      {
                        key: 'files',
                        label: (
                          <span className={styles.fileCollapseLabel}>
                            {record.files.length} tệp đính kèm
                          </span>
                        ),
                        children: (
                          <div className={styles.fileList}>
                            {record.files.map((file) => (
                              <div key={file.id} className={styles.fileItem}>
                                <FileIcon type={file.fileType} />
                                <span className={styles.fileName}>{file.fileName}</span>
                                <div className={styles.fileActions}>
                                  <Button
                                    type="text"
                                    size="small"
                                    icon={<EyeOutlined />}
                                    onClick={() => setPreviewFile(file)}
                                    aria-label={`Xem ${file.fileName}`}
                                  />
                                  <Button
                                    type="text"
                                    size="small"
                                    icon={<DownloadOutlined />}
                                    aria-label={`Tải ${file.fileName}`}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        ),
                      },
                    ]}
                  />
                )}

                {record.files.length === 0 && (
                  <p className={styles.noFiles}>Chưa có tệp đính kèm</p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* File preview modal */}
      <Modal
        title={previewFile?.fileName}
        open={!!previewFile}
        onCancel={() => setPreviewFile(null)}
        footer={
          <Button
            icon={<DownloadOutlined />}
            onClick={() => setPreviewFile(null)}
          >
            Tải xuống
          </Button>
        }
        width={640}
      >
        <div className={styles.previewBody}>
          {previewFile?.fileType === 'image' ? (
            <div className={styles.previewImgPlaceholder}>
              <FileImageOutlined />
              <p>Xem ảnh y tế</p>
              <span>(Demo — chưa có URL thực)</span>
            </div>
          ) : (
            <div className={styles.previewPdfPlaceholder}>
              <FilePdfOutlined />
              <p>Xem PDF</p>
              <span>(Demo — chưa có URL thực)</span>
            </div>
          )}
        </div>
      </Modal>
      </main>
      <Footer />
    </>
  );
};

export default TestResults;

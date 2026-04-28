import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MedicineBoxOutlined,
  HomeOutlined,
  CreditCardOutlined,
  StarOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  CarOutlined,
  WifiOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import styles from './CustomerGuide.module.css';

type TabKey = 'kham-ngoai-tru' | 'nhap-vien' | 'thanh-toan' | 'tien-ich' | 'tham-benh';

interface Tab {
  key: TabKey;
  label: string;
  icon: React.ReactNode;
}

const TABS: Tab[] = [
  { key: 'kham-ngoai-tru', label: 'Khám Bệnh Ngoại Trú', icon: <MedicineBoxOutlined /> },
  { key: 'nhap-vien', label: 'Nhập Viện', icon: <HomeOutlined /> },
  { key: 'thanh-toan', label: 'Thanh Toán', icon: <CreditCardOutlined /> },
  { key: 'tien-ich', label: 'Tiện Ích', icon: <StarOutlined /> },
  { key: 'tham-benh', label: 'Thăm Bệnh', icon: <TeamOutlined /> },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const contentVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, x: -16, transition: { duration: 0.25 } },
};

/* ────────────── Tab Contents ────────────── */

const KhamNgoaiTru = () => (
  <div className={styles.content}>
    <h2 className={styles.contentTitle}>Khám Bệnh Ngoại Trú</h2>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}>
        <ClockCircleOutlined className={styles.blockIcon} /> Giờ Làm Việc
      </h3>
      <div className={styles.infoBox}>
        <p className={styles.highlight}>
          <PhoneOutlined /> Khoa Cấp Cứu tiếp nhận <strong>24 giờ/ngày, 7 ngày/tuần</strong>
        </p>
        <p>Trường hợp khẩn cấp: <strong>024 3574 1111</strong></p>
      </div>
    </section>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Thứ Hai – Thứ Sáu</h3>
      <div className={styles.scheduleRows}>
        <div className={styles.scheduleRow}>
          <div className={styles.scheduleTimeBadge}>07:00 – 12:00<br />13:30 – 17:30</div>
          <div className={styles.scheduleRowBody}>
            <ul className={styles.scheduleSpecialties}>
              {['Khoa Nhi & Nhi sơ sinh', 'Khoa Tiêu hóa & Gan mật', 'Khoa Tim mạch & Tim mạch can thiệp',
                'Khoa Chẩn đoán hình ảnh', 'Khoa Chấn thương chỉnh hình', 'Khoa Tai mũi họng',
                'Khoa Nội thần kinh', 'Đa khoa', 'Sản khoa'].map((item) => (
                <li key={item}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.scheduleRow}>
          <div className={styles.scheduleTimeBadge}>08:30 – 12:00<br />13:30 – 17:30</div>
          <div className={styles.scheduleRowBody}>
            <p className={styles.scheduleNote}>Áp dụng cho các chuyên khoa còn lại</p>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Thứ Bảy</h3>
      <div className={styles.scheduleRows}>
        <div className={styles.scheduleRow}>
          <div className={styles.scheduleTimeBadge}>07:00 – 12:00</div>
          <div className={styles.scheduleRowBody}>
            <ul className={styles.scheduleSpecialties}>
              {['Khoa Nhi & Nhi sơ sinh', 'Khoa Tiêu hóa & Gan mật', 'Khoa Tim mạch & Tim mạch can thiệp',
                'Khoa Chẩn đoán hình ảnh', 'Khoa Chấn thương chỉnh hình', 'Khoa Tai mũi họng',
                'Khoa Nội thần kinh', 'Đa khoa', 'Sản khoa'].map((item) => (
                <li key={item}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.scheduleRow}>
          <div className={styles.scheduleTimeBadge}>08:30 – 12:30</div>
          <div className={styles.scheduleRowBody}>
            <p className={styles.scheduleNote}>Áp dụng cho các chuyên khoa còn lại</p>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Đặt Lịch Khám</h3>
      <p>Vui lòng gọi số: <strong>024 3577 1100</strong> hoặc đặt hẹn trực tuyến trên website.</p>
    </section>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Lưu Ý Khi Đến Khám</h3>
      <ul className={styles.list}>
        <li><CheckCircleOutlined className={styles.checkIcon} />Đến sớm 5–10 phút so với giờ hẹn để hoàn thiện thủ tục và/hoặc lấy mẫu xét nghiệm.</li>
        <li><CheckCircleOutlined className={styles.checkIcon} />Nếu không thể đến đúng giờ, vui lòng thông báo sớm qua số: <strong>024 3577 1100</strong>.</li>
        <li><CheckCircleOutlined className={styles.checkIcon} />Đến sớm giúp bệnh viện chủ động sắp xếp và giảm thời gian chờ đợi.</li>
      </ul>
    </section>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Quy Trình Thăm Khám</h3>
      <div className={styles.steps}>
        {[
          { step: '1', title: 'Đến quầy lễ tân', desc: 'Khu Khám bệnh (Tầng 1 – Tòa A) hoặc Quầy thông tin (Tầng 1 – Tòa B). Nhân viên sẽ xác nhận thông tin đặt hẹn và hướng dẫn đến chuyên khoa.' },
          { step: '2', title: 'Khám và thanh toán', desc: 'Thanh toán phí khám sau khi bác sĩ thăm khám và tư vấn.' },
          { step: '3', title: 'Nhận thuốc', desc: 'Mua thuốc theo đơn tại Quầy Dược – Tầng 1, Tòa A.' },
          { step: '4', title: 'Hoàn tất bảo hiểm', desc: 'Phòng Bảo lãnh viện phí hỗ trợ các bước liên quan đến bảo hiểm (nếu có).' },
        ].map(({ step, title, desc }) => (
          <div key={step} className={styles.stepItem}>
            <div className={styles.stepNumber}>{step}</div>
            <div className={styles.stepBody}>
              <strong>{title}</strong>
              <p>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <div className={styles.infoBox}>
      <p><PhoneOutlined /> Tổng đài: <strong>024 3577 1100</strong></p>
      <p><PhoneOutlined /> Cấp cứu (24/7): <strong>024 3574 1111</strong></p>
      <p className={styles.muted}>Vui lòng mang theo CMND/CCCD, thẻ bảo hiểm (nếu có) và các kết quả xét nghiệm, chẩn đoán hình ảnh cũ khi đến khám.</p>
    </div>
  </div>
);

const NhapVien = () => (
  <div className={styles.content}>
    <h2 className={styles.contentTitle}>Đăng Ký Nhập Viện</h2>
    <p className={styles.intro}>
      Quy trình đăng ký nhập viện được thiết kế nhằm đảm bảo sự nhanh chóng, thuận tiện và an toàn cho người bệnh — cung cấp đầy đủ thông tin về thời gian, thủ tục và các hướng dẫn cần thiết.
    </p>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}><ClockCircleOutlined className={styles.blockIcon} /> Thời Gian Nhập Viện</h3>
      <ul className={styles.list}>
        <li><CheckCircleOutlined className={styles.checkIcon} />Thông thường: <strong>07:00 – 10:00 sáng</strong></li>
        <li><CheckCircleOutlined className={styles.checkIcon} />Cấp cứu hoặc nhập viện chuyển dạ ngoài giờ: tiếp nhận <strong>24/7</strong></li>
      </ul>
    </section>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Chuẩn Bị Trước Khi Nhập Viện</h3>
      <div className={styles.infoBox}>
        <p className={styles.highlight}>Đối với bệnh nhân có hẹn để thực hiện thủ thuật hoặc phẫu thuật:</p>
        <ul className={styles.list}>
          <li><CheckCircleOutlined className={styles.checkIcon} />Nhịn ăn ít nhất <strong>6 tiếng</strong> trước giờ thủ thuật/phẫu thuật</li>
          <li><CheckCircleOutlined className={styles.checkIcon} />Không hút thuốc ít nhất <strong>12 tiếng</strong> trước thủ thuật</li>
          <li><CheckCircleOutlined className={styles.checkIcon} />Bác sĩ sẽ hướng dẫn cụ thể cho từng trường hợp</li>
        </ul>
      </div>
    </section>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Thủ Tục Nhập Viện</h3>
      <p>Khi được bác sĩ chỉ định nhập viện, nhân viên lễ tân sẽ giải thích các vấn đề liên quan, sắp xếp ngày nhập viện và cung cấp tờ thông tin lưu viện.</p>
      <p>Bệnh nhân cần điền thông tin và ký <strong>"Đồng ý điều trị"</strong> — xác nhận đã được giải thích đầy đủ về lợi ích, nguy cơ và đồng ý thực hiện.</p>
    </section>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Giấy Tờ Cần Chuẩn Bị</h3>
      <ul className={styles.list}>
        {[
          'Giấy tờ tùy thân (CMND/CCCD hoặc hộ chiếu)',
          'Thẻ bảo hiểm y tế hoặc bảo hiểm tư nhân (nếu sử dụng)',
          'Giấy chuyển viện, giấy chỉ định nhập viện (nếu có)',
          'Hồ sơ bệnh án, kết quả xét nghiệm, phim chụp trước đó (nếu có)',
          'Thẻ thành viên H Plus Membership (nếu có)',
        ].map((item) => (
          <li key={item}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
        ))}
      </ul>
    </section>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Phòng Lưu Viện</h3>
      <p>Hệ thống <strong>170 giường bệnh nội trú</strong>, bao gồm:</p>
      <div className={styles.bedGrid}>
        {[
          { count: '62', label: 'giường Nội trú Tổng hợp' },
          { count: '47', label: 'giường Sản – Phụ khoa' },
          { count: '38', label: 'giường Nội trú Nhi' },
          { count: '6', label: 'giường Nội trú VIP' },
          { count: '9', label: 'giường Điều trị riêng biệt' },
          { count: '20', label: 'giường Lưu viện trong ngày' },
        ].map(({ count, label }) => (
          <div key={label} className={styles.bedCard}>
            <span className={styles.bedCount}>{count}</span>
            <span className={styles.bedLabel}>{label}</span>
          </div>
        ))}
      </div>
      <p className={styles.muted}>Mỗi phòng được trang bị đầy đủ sữa tắm, dầu gội, bàn chải, kem đánh răng và các vật dụng cần thiết.</p>
    </section>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Hủy Hẹn Nhập Viện</h3>
      <div className={styles.infoBox}>
        <p>Vui lòng gọi <strong>(84-24) 3577 1100</strong> trong giờ hành chính:</p>
        <ul className={styles.list}>
          <li><ClockCircleOutlined className={styles.checkIcon} />Thứ Hai – Thứ Sáu: <strong>07:30 – 17:30</strong></li>
          <li><ClockCircleOutlined className={styles.checkIcon} />Thứ Bảy: <strong>07:30 – 14:00</strong></li>
        </ul>
        <p className={styles.muted}>Thông báo ít nhất <strong>02 ngày</strong> trước ngày nhập viện dự kiến.</p>
      </div>
    </section>
  </div>
);

const ThanhToan = () => (
  <div className={styles.content}>
    <h2 className={styles.contentTitle}>Chính Sách Giá Và Thanh Toán</h2>
    <p className={styles.intro}>
      Tất cả dịch vụ y tế tại bệnh viện được tính theo biểu giá hiện hành.
    </p>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}><MedicineBoxOutlined className={styles.blockIcon} /> Thăm Khám Ngoại Trú</h3>
      <ul className={styles.list}>
        <li><CheckCircleOutlined className={styles.checkIcon} />Phí khám & tư vấn được thanh toán <strong>sau khi</strong> thăm khám với bác sĩ</li>
        <li><CheckCircleOutlined className={styles.checkIcon} />Chi phí xét nghiệm, chẩn đoán hình ảnh, thuốc, hoặc thủ thuật ngoại trú cần thanh toán <strong>trước khi</strong> sử dụng dịch vụ</li>
      </ul>
    </section>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}><HomeOutlined className={styles.blockIcon} /> Bệnh Nhân Nhập Viện</h3>
      <ul className={styles.list}>
        <li><CheckCircleOutlined className={styles.checkIcon} />Khi có chỉ định nhập viện, Quý khách sẽ được xác nhận chi phí dự trù và ký "Đồng ý điều trị"</li>
        <li><CheckCircleOutlined className={styles.checkIcon} />Nhân viên lễ tân, thu ngân hoặc Bảo lãnh viện phí sẽ hỗ trợ hoàn tất thủ tục</li>
        <li><CheckCircleOutlined className={styles.checkIcon} />Hóa đơn lưu viện được hoàn tất và thanh toán <strong>trước khi xuất viện</strong></li>
        <li><CheckCircleOutlined className={styles.checkIcon} />Bệnh viện không chấp nhận nợ cá nhân</li>
      </ul>
    </section>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}><CreditCardOutlined className={styles.blockIcon} /> Tạm Ứng</h3>
      <p>Khi có chỉ định nhập viện, Quý khách sẽ được yêu cầu tạm ứng chi phí điều trị. Mức tạm ứng được tính dựa trên chỉ định điều trị và loại phòng lưu viện.</p>
      <div className={styles.infoBox}>
        <p>Nếu Quý khách có bảo hiểm nhưng bệnh viện chưa nhận được Thư xác nhận bảo lãnh, Quý khách vui lòng thực hiện tạm ứng. Khoản tạm ứng sẽ được hoàn trả khi xuất viện sau khi nhận được xác nhận.</p>
      </div>
      <p>Có thể tạm ứng bằng: <strong>tiền mặt · thẻ tín dụng · chuyển khoản</strong></p>
    </section>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Thanh Toán Thêm Và Hoàn Trả</h3>
      <ul className={styles.list}>
        <li><CheckCircleOutlined className={styles.checkIcon} />Khi xuất viện, thanh toán các khoản chi phí không được công ty bảo hiểm chi trả</li>
        <li><CheckCircleOutlined className={styles.checkIcon} />Hoàn trả tiền mặt: nhận tại quầy thu ngân</li>
        <li><CheckCircleOutlined className={styles.checkIcon} />Hoàn trả thẻ: chuyển vào tài khoản tín dụng theo quy định Ngân hàng Nhà nước</li>
      </ul>
    </section>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Chính Sách Bảo Hiểm</h3>
      <p>Bệnh viện hợp tác với hầu hết các công ty bảo hiểm trong nước và quốc tế — hiện có thỏa thuận thanh toán trực tiếp với <strong>43 công ty bảo hiểm</strong>, cùng 7 đơn vị hỗ trợ và 1 công ty quản lý bảo hiểm.</p>
      <div className={styles.infoBox}>
        <p className={styles.highlight}>Khi đến khám hoặc nhập viện, vui lòng xuất trình:</p>
        <ul className={styles.list}>
          <li><CheckCircleOutlined className={styles.checkIcon} />Căn cước công dân hoặc hộ chiếu</li>
          <li><CheckCircleOutlined className={styles.checkIcon} />Thẻ bảo hiểm hoặc thông tin hợp đồng bảo hiểm</li>
        </ul>
      </div>
      <div className={styles.contactCard}>
        <p><strong>Mọi thắc mắc về Bảo hiểm:</strong></p>
        <p>Ông Trương Kiều Nghị – Trưởng phòng Chăm sóc khách hàng & Hoạt động hợp tác</p>
        <p><PhoneOutlined /> (84-24) 3577 1100</p>
        <p><MailOutlined /> nghi.truongkieu@hfh.com.vn</p>
      </div>
    </section>
  </div>
);

const TienIch = () => (
  <div className={styles.content}>
    <h2 className={styles.contentTitle}>Tiện Ích</h2>
    <p className={styles.intro}>
      Không chỉ nổi bật với chất lượng y tế quốc tế, bệnh viện còn mang đến trải nghiệm chăm sóc toàn diện thông qua hệ thống tiện ích được đầu tư bài bản.
    </p>

    <div className={styles.amenityGrid}>
      {[
        {
          icon: <CarOutlined />,
          title: 'Gửi Xe Miễn Phí',
          desc: 'Khu vực gửi xe máy và ô tô tại tầng hầm B1 và B2, kiểm soát bằng hệ thống tự động hiện đại và hoàn toàn miễn phí.',
        },
        {
          icon: <WifiOutlined />,
          title: 'Wifi Miễn Phí Toàn Viện',
          desc: 'Toàn bộ khuôn viên được phủ sóng wifi tốc độ cao, phục vụ nhu cầu kết nối và tra cứu thông tin của người bệnh và người nhà.',
        },
        {
          icon: <SafetyOutlined />,
          title: 'An Ninh 24/7',
          desc: 'Khu điều trị nội trú được kiểm soát bằng hệ thống thẻ từ, giám sát an ninh chặt chẽ 24/7 từ phòng điều khiển trung tâm.',
        },
      ].map(({ icon, title, desc }) => (
        <div key={title} className={styles.amenityCard}>
          <div className={styles.amenityIcon}>{icon}</div>
          <h3 className={styles.amenityTitle}>{title}</h3>
          <p>{desc}</p>
        </div>
      ))}
    </div>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Nhà Hàng H Café</h3>
      <p>Tọa lạc tại <strong>tầng 1, tòa B</strong> — không gian ẩm thực sang trọng, ấm cúng dành cho khách hàng, người nhà và nhân viên y tế.</p>
      <p>Thực đơn phong phú đáp ứng khẩu vị đa dạng: món Âu chuẩn vị và các món Á quen thuộc như phở, cơm, mì — chế biến từ nguyên liệu tươi ngon, đảm bảo dinh dưỡng và vệ sinh an toàn thực phẩm.</p>
    </section>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Quầy Bánh Café Saint-Honoré</h3>
      <p>Ngay tại <strong>tầng 1, sảnh tòa B</strong> — thưởng thức ẩm thực nhẹ nhàng chuẩn Pháp với bánh thủ công và đồ uống tinh tế từ thương hiệu Saint-Honoré.</p>
      <p>Không gian ấm cúng, phục vụ liên tục trong ngày — rất phù hợp cho các buổi hẹn khám sáng sớm hoặc giờ nghỉ giữa buổi điều trị.</p>
    </section>

    <div className={styles.infoBox}>
      <p className={styles.highlight}>
        Với phương châm <em>"lấy người bệnh làm trung tâm"</em>, bệnh viện luôn hướng đến mục tiêu chăm sóc sức khỏe toàn diện cả thể chất lẫn tinh thần.
      </p>
    </div>
  </div>
);

const ThamBenh = () => (
  <div className={styles.content}>
    <h2 className={styles.contentTitle}>Quy Định Thăm Bệnh</h2>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}><ClockCircleOutlined className={styles.blockIcon} /> Giờ Thăm Bệnh</h3>
      <div className={styles.scheduleGrid}>
        <div className={styles.scheduleCard}>
          <div className={styles.scheduleTime}>14:30 – 21:00</div>
          <p>Khu nội trú — hàng ngày</p>
        </div>
        <div className={styles.scheduleCard}>
          <div className={styles.scheduleTime}>16:00 – 20:00</div>
          <p>Khu hồi sức tích cực & chăm sóc đặc biệt (ICU) — hàng ngày</p>
        </div>
      </div>
      <p className={styles.muted}>Người chăm sóc được ở lại theo chỉ định của bác sĩ điều trị.</p>
    </section>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Quy Định Chung</h3>
      <ul className={styles.list}>
        {[
          'Thăm đúng khung giờ quy định',
          'Tối đa 02 khách/lần thăm',
          'Rửa tay sát khuẩn khi vào/ra phòng',
          'Rời phòng khi người bệnh cần chăm sóc y tế',
          'Không ngồi lên giường bệnh',
          'Không chạm thiết bị y tế, vết thương, đường truyền',
          'Không mang vật nuôi, hoa, cây cảnh',
          'Không mang đồ ăn/đồ uống có mùi mạnh',
          'Giữ trật tự, để điện thoại im lặng',
          'Không hút thuốc (trừ khu vực cho phép cạnh H Café)',
          'Trẻ dưới 16 tuổi phải đi cùng người lớn',
          'Không ở lại qua đêm tại phòng',
          'Bệnh viện không chịu trách nhiệm về tài sản thất lạc',
        ].map((item) => (
          <li key={item}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
        ))}
      </ul>
    </section>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Quy Định Tại Từng Khu Vực</h3>
      <div className={styles.zoneGrid}>
        {[
          {
            zone: 'Khu Nội Trú Nhi',
            rules: ['Cha mẹ được thăm & ở lại phòng bệnh Nhi', 'Khách khác tuân thủ giờ thăm quy định'],
          },
          {
            zone: 'NICU – Hồi Sức Sơ Sinh',
            rules: [
              'Cha mẹ được vào bất kỳ lúc nào (trừ lúc chăm sóc y tế)',
              'Tuân thủ vô khuẩn: mặc đồ bảo hộ, không mang vật dụng cá nhân',
              'Không chạm thiết bị/lồng ấp khi chưa được phép',
              'Không cho khách thăm (kể cả trẻ em)',
            ],
          },
          {
            zone: 'ICU – Hồi Sức Tích Cực',
            rules: [
              'Trẻ dưới 16 tuổi: cha mẹ được vào thăm (trừ lúc cấp cứu)',
              'Tuân thủ nghiêm quy định kiểm soát nhiễm khuẩn',
            ],
          },
          {
            zone: 'Khu Nội Trú Sản',
            rules: [
              'Tối đa 02 khách/lần thăm',
              'Cha được vào phòng Sinh (nếu Sản phụ sinh thường)',
              'Trẻ dưới 16 tuổi phải có người lớn đi kèm',
            ],
          },
          {
            zone: 'Phòng Cách Ly',
            rules: ['Chỉ vào khi được nhân viên y tế cho phép'],
          },
        ].map(({ zone, rules }) => (
          <div key={zone} className={styles.zoneCard}>
            <h4 className={styles.zoneTitle}>{zone}</h4>
            <ul className={styles.list}>
              {rules.map((r) => <li key={r}><CheckCircleOutlined className={styles.checkIcon} />{r}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Lưu Ý Sức Khỏe</h3>
      <div className={styles.warningBox}>
        <p>Vì sự an toàn của người bệnh và cộng đồng, vui lòng <strong>không vào thăm</strong> nếu đang có:</p>
        <ul className={styles.list}>
          {['Nôn, tiêu chảy', 'Ho, sốt, cảm lạnh/cúm', 'Nghi ngờ bệnh truyền nhiễm'].map((s) => (
            <li key={s}><CheckCircleOutlined className={styles.checkIcon} />{s}</li>
          ))}
        </ul>
      </div>
    </section>

    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Trách Nhiệm Khi Thăm Bệnh</h3>
      <p>Bệnh viện khuyến khích người nhà chủ động phối hợp và hợp tác chăm sóc người bệnh:</p>
      <ul className={styles.list}>
        <li><CheckCircleOutlined className={styles.checkIcon} />Hỗ trợ ăn uống, dùng thuốc, hoặc vệ sinh cá nhân khi được điều dưỡng hướng dẫn</li>
        <li><CheckCircleOutlined className={styles.checkIcon} />Tôn trọng và hợp tác với nhân viên y tế, tuân thủ hướng dẫn trong suốt thời gian thăm</li>
        <li><CheckCircleOutlined className={styles.checkIcon} />Giữ thái độ lịch sự, nhẹ nhàng, tạo môi trường an toàn và yên tĩnh cho người bệnh</li>
      </ul>
    </section>
  </div>
);

const TAB_CONTENT: Record<TabKey, React.ReactNode> = {
  'kham-ngoai-tru': <KhamNgoaiTru />,
  'nhap-vien': <NhapVien />,
  'thanh-toan': <ThanhToan />,
  'tien-ich': <TienIch />,
  'tham-benh': <ThamBenh />,
};

/* ────────────── Main Page ────────────── */

const CustomerGuide = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabKey>(() => {
    const tab = searchParams.get('tab');
    return (tab as TabKey) in TAB_CONTENT ? (tab as TabKey) : 'kham-ngoai-tru';
  });

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tab in TAB_CONTENT) {
      setActiveTab(tab as TabKey);
    } else {
      setActiveTab('kham-ngoai-tru');
    }
  }, [searchParams]);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <motion.div
            className={styles.heroInner}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <p className={styles.heroSub}>VitaFamily</p>
            <h1 className={styles.heroTitle}>Hướng Dẫn Khách Hàng</h1>
            <p className={styles.heroDesc}>
              Thông tin đầy đủ về quy trình khám bệnh, nhập viện, thanh toán và các tiện ích tại bệnh viện — giúp Quý khách chuẩn bị tốt nhất cho mỗi lần đến khám.
            </p>
          </motion.div>
        </section>

        {/* Body */}
        <section className={styles.body}>
          <div className={styles.container}>
            {/* Sidebar */}
            <motion.aside
              className={styles.sidebar}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h2 className={styles.sidebarHeading}>Danh Mục</h2>
              <nav className={styles.sidebarNav}>
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    className={`${styles.sidebarItem} ${activeTab === tab.key ? styles.active : ''}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <span className={styles.sidebarIcon}>{tab.icon}</span>
                    <span className={styles.sidebarLabel}>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </motion.aside>

            {/* Content */}
            <div className={styles.main}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {TAB_CONTENT[activeTab]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CustomerGuide;

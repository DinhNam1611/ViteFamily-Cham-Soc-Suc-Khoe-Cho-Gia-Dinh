import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
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
  CalendarOutlined,
  FileTextOutlined,
  BellOutlined,
  SearchOutlined,
  CustomerServiceOutlined,
  BankOutlined,
} from '@ant-design/icons';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import styles from './CustomerGuide.module.css';

type TabKey = 'kham-ngoai-tru' | 'nhap-vien' | 'thanh-toan' | 'tien-ich' | 'tham-benh';

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

const KhamNgoaiTru = () => {
  const specialties = [
    'Khoa Nhi & Nhi sơ sinh', 'Khoa Tiêu hóa & Gan mật', 'Khoa Tim mạch',
    'Khoa Chẩn đoán hình ảnh', 'Khoa Chấn thương chỉnh hình', 'Khoa Tai mũi họng',
    'Khoa Nội thần kinh', 'Đa khoa', 'Sản khoa',
  ];
  const notes = [
    'Đến sớm 10–15 phút so với giờ hẹn để làm thủ tục check-in tại cơ sở y tế.',
    'Nếu không thể đến đúng giờ, vui lòng huỷ lịch trên VitaFamily càng sớm càng tốt để được hoàn tiền theo chính sách.',
    'Mang theo CMND/CCCD và mã lịch hẹn (xem trong mục "Lịch hẹn của tôi").',
    'Mang theo kết quả xét nghiệm, phim chụp trước đó (nếu có) để bác sĩ tham khảo.',
  ];
  const steps = [
    { step: '1', title: 'Đặt lịch trực tuyến', desc: 'Tìm bác sĩ theo chuyên khoa, chọn ngày giờ phù hợp và đặt lịch trên VitaFamily. Lịch hẹn được xác nhận ngay sau khi thanh toán thành công.' },
    { step: '2', title: 'Đến cơ sở y tế', desc: 'Mang theo mã lịch hẹn và CMND/CCCD đến quầy lễ tân. Nhân viên xác nhận thông tin đặt hẹn và hướng dẫn bạn đến đúng chuyên khoa.' },
    { step: '3', title: 'Thăm khám với bác sĩ', desc: 'Bác sĩ thăm khám, tư vấn và kê đơn. Phí dịch vụ phát sinh trong buổi khám được thanh toán trực tiếp tại quầy thu ngân của cơ sở y tế.' },
    { step: '4', title: 'Nhận kết quả & đơn thuốc', desc: 'Nhận đơn thuốc và kết quả xét nghiệm (nếu có). Mua thuốc theo đơn tại quầy dược hoặc nhà thuốc theo chỉ định của bác sĩ.' },
  ];

  return (
    <div className={styles.content}>
      <h2 className={styles.contentTitle}>Khám Bệnh Ngoại Trú</h2>
      <p className={styles.intro}>VitaFamily kết nối bạn với hàng trăm bác sĩ từ nhiều chuyên khoa khác nhau. Dưới đây là hướng dẫn từ lúc đặt lịch đến khi hoàn tất buổi khám tại cơ sở y tế đối tác.</p>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>
          <ClockCircleOutlined className={styles.blockIcon} /> Giờ Khám Tham Khảo
        </h3>
        <div className={styles.infoBox}>
          <p className={styles.highlight}>Giờ khám thực tế phụ thuộc vào từng bác sĩ và cơ sở y tế.</p>
          <p>Lịch trống của từng bác sĩ được cập nhật tự động trên nền tảng VitaFamily khi bạn tìm kiếm.</p>
        </div>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Thứ Hai – Thứ Sáu</h3>
        <div className={styles.scheduleRows}>
          <div className={styles.scheduleRow}>
            <div className={styles.scheduleTimeBadge}>07:00 – 12:00<br />13:30 – 17:30</div>
            <div className={styles.scheduleRowBody}>
              <ul className={styles.scheduleSpecialties}>
                {specialties.map((item) => (
                  <li key={item}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
                ))}
              </ul>
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
                {specialties.map((item) => (
                  <li key={item}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Lưu Ý Khi Đến Khám</h3>
        <ul className={styles.list}>
          {notes.map((item, i) => (
            <li key={i}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Quy Trình Từ Đặt Lịch Đến Khám Xong</h3>
        <div className={styles.steps}>
          {steps.map(({ step, title, desc }) => (
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

      <div className={styles.ctaBox}>
        <p>Sẵn sàng đặt lịch khám?</p>
        <Link to="/doctors" className={styles.ctaBtn}>Tìm bác sĩ & Đặt lịch ngay →</Link>
      </div>
    </div>
  );
};

const NhapVien = () => {
  const timeItems = ['Thông thường: 07:00 – 10:00 sáng', 'Cấp cứu hoặc nhập viện chuyển dạ ngoài giờ: tiếp nhận 24/7'];
  const prepItems = [
    'Nhịn ăn ít nhất 6 tiếng trước giờ thủ thuật/phẫu thuật',
    'Không hút thuốc ít nhất 12 tiếng trước thủ thuật',
    'Bác sĩ sẽ hướng dẫn cụ thể cho từng trường hợp',
  ];
  const docsItems = [
    'Giấy tờ tùy thân (CMND/CCCD hoặc hộ chiếu)',
    'Thẻ bảo hiểm y tế hoặc bảo hiểm tư nhân (nếu sử dụng)',
    'Giấy chuyển viện, giấy chỉ định nhập viện (nếu có)',
    'Hồ sơ bệnh án, kết quả xét nghiệm, phim chụp trước đó (nếu có)',
  ];
  const cancelSchedule = ['Thứ Hai – Thứ Sáu: 07:30 – 17:30', 'Thứ Bảy: 07:30 – 14:00'];

  return (
    <div className={styles.content}>
      <h2 className={styles.contentTitle}>Đăng Ký Nhập Viện</h2>
      <p className={styles.intro}>Thông tin dưới đây là hướng dẫn chung về quy trình nhập viện tại các cơ sở y tế. Chi tiết cụ thể có thể khác nhau tùy từng bệnh viện — vui lòng liên hệ trực tiếp cơ sở y tế để được hỗ trợ.</p>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}><ClockCircleOutlined className={styles.blockIcon} /> Thời Gian Nhập Viện</h3>
        <ul className={styles.list}>
          {timeItems.map((item, i) => (
            <li key={i}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Chuẩn Bị Trước Khi Nhập Viện</h3>
        <div className={styles.infoBox}>
          <p className={styles.highlight}>Đối với bệnh nhân có hẹn để thực hiện thủ thuật hoặc phẫu thuật:</p>
          <ul className={styles.list}>
            {prepItems.map((item, i) => (
              <li key={i}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Thủ Tục Nhập Viện</h3>
        <p>Khi được bác sĩ chỉ định nhập viện, nhân viên lễ tân sẽ giải thích các vấn đề liên quan, sắp xếp ngày nhập viện và cung cấp tờ thông tin lưu viện.</p>
        <p>Bệnh nhân cần điền thông tin và ký "Đồng ý điều trị" — xác nhận đã được giải thích đầy đủ về lợi ích, nguy cơ và đồng ý thực hiện.</p>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Giấy Tờ Cần Chuẩn Bị</h3>
        <ul className={styles.list}>
          {docsItems.map((item, i) => (
            <li key={i}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Hủy Lịch Nhập Viện</h3>
        <div className={styles.infoBox}>
          <p>Vui lòng liên hệ trực tiếp cơ sở y tế trong giờ hành chính để thông báo huỷ:</p>
          <ul className={styles.list}>
            {cancelSchedule.map((item, i) => (
              <li key={i}><ClockCircleOutlined className={styles.checkIcon} />{item}</li>
            ))}
          </ul>
          <p className={styles.muted}>Thông báo ít nhất 02 ngày trước ngày nhập viện dự kiến. Lịch khám ngoại trú đặt qua VitaFamily được huỷ trực tiếp trên ứng dụng.</p>
        </div>
      </section>
    </div>
  );
};

const ThanhToan = () => {
  const paymentSteps = [
    { step: '1', title: 'Đặt lịch khám', desc: 'Chọn bác sĩ, dịch vụ và thời gian khám phù hợp trên nền tảng VitaFamily.' },
    { step: '2', title: 'Thanh toán trực tuyến', desc: 'Xác nhận thông tin lịch khám và thanh toán qua cổng VitaPay. Lịch hẹn chỉ được xác nhận sau khi thanh toán thành công.' },
    { step: '3', title: 'Nhận xác nhận', desc: 'Hệ thống tự động ghi nhận và gửi xác nhận lịch hẹn ngay sau khi thanh toán.' },
    { step: '4', title: 'Đến khám đúng giờ', desc: 'Mang theo mã lịch hẹn đã xác nhận đến cơ sở y tế theo đúng giờ đã đặt.' },
  ];

  const refundTiers = [
    { time: '≥ 24 giờ trước lịch khám', percent: '100%', colorClass: styles.badgeGreen },
    { time: '12 – 24 giờ trước lịch khám', percent: '80%', colorClass: styles.badgeBlue },
    { time: '6 – 12 giờ trước lịch khám', percent: '50%', colorClass: styles.badgeOrange },
    { time: '< 6 giờ trước lịch khám', percent: '0%', colorClass: styles.badgeRed },
  ];

  const specialCases = [
    { title: 'Bác sĩ huỷ lịch', desc: 'Hoàn tiền 100% bất kể thời gian huỷ.' },
    { title: 'Bệnh nhân không đến (no-show)', desc: 'Không được hoàn tiền.' },
    { title: 'Huỷ do lỗi hệ thống', desc: 'Hoàn tiền 100% và hệ thống ghi nhận lỗi.' },
    { title: 'Lịch đã khám xong', desc: 'Không thể yêu cầu hoàn tiền sau khi buổi khám đã hoàn tất.' },
  ];

  const cancelSteps = [
    { step: '1', title: 'Vào trang lịch hẹn', desc: 'Mở chi tiết lịch hẹn cần huỷ trong mục "Lịch hẹn của tôi".' },
    { step: '2', title: 'Nhấn "Huỷ lịch"', desc: 'Hệ thống hiển thị số tiền hoàn lại dựa trên thời gian còn lại trước giờ khám.' },
    { step: '3', title: 'Xác nhận huỷ', desc: 'Đọc kỹ thông tin hoàn tiền và xác nhận huỷ lịch.' },
    { step: '4', title: 'Nhận hoàn tiền', desc: 'Tiền hoàn được xử lý trong 3–5 ngày làm việc sau khi yêu cầu được duyệt.' },
  ];

  return (
    <div className={styles.content}>
      <h2 className={styles.contentTitle}>Thanh Toán & Hoàn Tiền</h2>
      <p className={styles.intro}>
        VitaFamily là nền tảng trung gian kết nối bệnh nhân và cơ sở y tế. Mọi thanh toán được thực hiện trực tuyến qua cổng VitaPay — an toàn, nhanh chóng và minh bạch.
      </p>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}><CreditCardOutlined className={styles.blockIcon} /> Quy Trình Thanh Toán</h3>
        <div className={styles.steps}>
          {paymentSteps.map(({ step, title, desc }) => (
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

      <section className={styles.block}>
        <h3 className={styles.blockTitle}><BankOutlined className={styles.blockIcon} /> Phương Thức Thanh Toán</h3>
        <div className={styles.infoBox}>
          <p>VitaFamily hỗ trợ thanh toán qua <strong>chuyển khoản ngân hàng</strong> thông qua cổng thanh toán VitaPay.</p>
          <p>Sau khi chuyển khoản thành công, lịch hẹn được xác nhận ngay lập tức — không cần chờ xác minh thủ công.</p>
          <p className={styles.muted}>Lưu ý: lịch hẹn chưa thanh toán có thể bị huỷ sau 30 phút nếu không hoàn tất giao dịch.</p>
        </div>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Chính Sách Hoàn Tiền Khi Huỷ Lịch</h3>
        <p className={styles.muted}>Mức hoàn tiền phụ thuộc vào thời điểm huỷ so với giờ khám đã đặt:</p>
        <div className={styles.refundTable}>
          {refundTiers.map(({ time, percent, colorClass }) => (
            <div key={time} className={styles.refundRow}>
              <span className={styles.refundTime}>{time}</span>
              <span className={`${styles.refundBadge} ${colorClass}`}>{percent}</span>
            </div>
          ))}
        </div>
        <p className={styles.muted}>Tiền hoàn được xử lý trong 3–5 ngày làm việc sau khi yêu cầu được Admin duyệt.</p>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Trường Hợp Đặc Biệt</h3>
        <div className={styles.infoBox}>
          {specialCases.map(({ title, desc }) => (
            <p key={title}><strong>{title}:</strong> {desc}</p>
          ))}
        </div>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Quy Trình Huỷ Lịch Và Nhận Hoàn Tiền</h3>
        <div className={styles.steps}>
          {cancelSteps.map(({ step, title, desc }) => (
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
        <p><PhoneOutlined /> Hỗ trợ thanh toán: <strong>024 3577 1100</strong></p>
        <p><MailOutlined /> Email: <strong>support@vitafamily.vn</strong></p>
      </div>
    </div>
  );
};

const TienIch = () => {
  const features = [
    {
      icon: <CalendarOutlined />,
      title: 'Đặt Lịch 24/7',
      desc: 'Tìm và đặt lịch khám với hàng trăm bác sĩ bất kỳ lúc nào trong ngày — không cần gọi điện hay xếp hàng chờ.',
    },
    {
      icon: <FileTextOutlined />,
      title: 'Hồ Sơ Sức Khỏe Cá Nhân',
      desc: 'Toàn bộ lịch sử khám bệnh và lịch hẹn được lưu trữ an toàn trong tài khoản, tra cứu lại bất cứ lúc nào.',
    },
    {
      icon: <BellOutlined />,
      title: 'Nhắc Lịch Tự Động',
      desc: 'Nhận thông báo qua email trước giờ hẹn, giúp bạn không bao giờ bỏ lỡ buổi khám quan trọng.',
    },
    {
      icon: <StarOutlined />,
      title: 'Đánh Giá Bác Sĩ',
      desc: 'Xem nhận xét thực tế từ bệnh nhân đã khám để chọn đúng bác sĩ phù hợp với nhu cầu và ngân sách.',
    },
    {
      icon: <SearchOutlined />,
      title: 'Tìm Kiếm Thông Minh',
      desc: 'Lọc bác sĩ theo chuyên khoa, cơ sở y tế, khung giờ trống và mức giá — nhanh chóng và chính xác.',
    },
    {
      icon: <CustomerServiceOutlined />,
      title: 'Hỗ Trợ Khách Hàng',
      desc: 'Đội ngũ hỗ trợ sẵn sàng giải đáp thắc mắc về lịch hẹn, thanh toán và mọi vấn đề bạn gặp phải.',
    },
  ];

  return (
    <div className={styles.content}>
      <h2 className={styles.contentTitle}>Tiện Ích Nền Tảng</h2>
      <p className={styles.intro}>VitaFamily được xây dựng để đơn giản hóa hành trình chăm sóc sức khỏe của bạn — từ tìm kiếm bác sĩ đến quản lý toàn bộ lịch hẹn và hồ sơ khám bệnh cá nhân.</p>

      <div className={styles.amenityGrid}>
        {features.map(({ icon, title, desc }) => (
          <div key={title} className={styles.amenityCard}>
            <div className={styles.amenityIcon}>{icon}</div>
            <h3 className={styles.amenityTitle}>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.infoBox}>
        <p className={styles.highlight}>Tất cả tiện ích hoàn toàn miễn phí cho người dùng</p>
        <p>Tạo tài khoản miễn phí trên VitaFamily để truy cập đầy đủ tính năng và bắt đầu chủ động quản lý sức khỏe của mình.</p>
      </div>
    </div>
  );
};

const ThamBenh = () => {
  const hoursCards = [
    { time: '14:30 – 21:00', label: 'Khu nội trú — hàng ngày' },
    { time: '16:00 – 20:00', label: 'Khu hồi sức tích cực & chăm sóc đặc biệt (ICU) — hàng ngày' },
  ];
  const rules = [
    'Thăm đúng khung giờ quy định',
    'Tối đa 02 khách/lần thăm',
    'Rửa tay sát khuẩn khi vào/ra phòng',
    'Rời phòng khi người bệnh cần chăm sóc y tế',
    'Không ngồi lên giường bệnh',
    'Không chạm thiết bị y tế, vết thương, đường truyền',
    'Không mang vật nuôi, hoa, cây cảnh',
    'Không mang đồ ăn/đồ uống có mùi mạnh',
    'Giữ trật tự, để điện thoại im lặng',
    'Không hút thuốc trong khuôn viên bệnh viện (chỉ tại khu vực hút thuốc được chỉ định)',
    'Trẻ dưới 16 tuổi phải đi cùng người lớn',
    'Không ở lại qua đêm tại phòng',
    'Bệnh viện không chịu trách nhiệm về tài sản thất lạc',
  ];
  const zones = [
    { zone: 'Khu Nội Trú Nhi', rules: ['Cha mẹ được thăm & ở lại phòng bệnh Nhi', 'Khách khác tuân thủ giờ thăm quy định'] },
    { zone: 'NICU – Hồi Sức Sơ Sinh', rules: ['Cha mẹ được vào bất kỳ lúc nào (trừ lúc chăm sóc y tế)', 'Tuân thủ vô khuẩn: mặc đồ bảo hộ, không mang vật dụng cá nhân', 'Không chạm thiết bị/lồng ấp khi chưa được phép', 'Không cho khách thăm (kể cả trẻ em)'] },
    { zone: 'ICU – Hồi Sức Tích Cực', rules: ['Trẻ dưới 16 tuổi: cha mẹ được vào thăm (trừ lúc cấp cứu)', 'Tuân thủ nghiêm quy định kiểm soát nhiễm khuẩn'] },
    { zone: 'Khu Nội Trú Sản', rules: ['Tối đa 02 khách/lần thăm', 'Cha được vào phòng Sinh (nếu Sản phụ sinh thường)', 'Trẻ dưới 16 tuổi phải có người lớn đi kèm'] },
    { zone: 'Phòng Cách Ly', rules: ['Chỉ vào khi được nhân viên y tế cho phép'] },
  ];
  const healthItems = ['Nôn, tiêu chảy', 'Ho, sốt, cảm lạnh/cúm', 'Nghi ngờ bệnh truyền nhiễm'];
  const responsibilityItems = [
    'Hỗ trợ ăn uống, dùng thuốc, hoặc vệ sinh cá nhân khi được điều dưỡng hướng dẫn',
    'Tôn trọng và hợp tác với nhân viên y tế, tuân thủ hướng dẫn trong suốt thời gian thăm',
    'Giữ thái độ lịch sự, nhẹ nhàng, tạo môi trường an toàn và yên tĩnh cho người bệnh',
  ];

  return (
    <div className={styles.content}>
      <h2 className={styles.contentTitle}>Quy Định Thăm Bệnh</h2>
      <p className={styles.intro}>Thông tin dưới đây là quy định chung tại các cơ sở y tế đối tác trên nền tảng VitaFamily. Vui lòng tuân thủ để đảm bảo an toàn và sức khỏe cho người bệnh.</p>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}><ClockCircleOutlined className={styles.blockIcon} /> Giờ Thăm Bệnh</h3>
        <div className={styles.scheduleGrid}>
          {hoursCards.map(({ time, label }) => (
            <div key={time} className={styles.scheduleCard}>
              <div className={styles.scheduleTime}>{time}</div>
              <p>{label}</p>
            </div>
          ))}
        </div>
        <p className={styles.muted}>Người chăm sóc được ở lại theo chỉ định của bác sĩ điều trị.</p>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Quy Định Chung</h3>
        <ul className={styles.list}>
          {rules.map((item, i) => (
            <li key={i}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Quy Định Tại Từng Khu Vực</h3>
        <div className={styles.zoneGrid}>
          {zones.map(({ zone, rules: zoneRules }) => (
            <div key={zone} className={styles.zoneCard}>
              <h4 className={styles.zoneTitle}>{zone}</h4>
              <ul className={styles.list}>
                {zoneRules.map((r, i) => (
                  <li key={i}><CheckCircleOutlined className={styles.checkIcon} />{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Lưu Ý Sức Khỏe</h3>
        <div className={styles.warningBox}>
          <p>Vì sự an toàn của người bệnh và cộng đồng, vui lòng không vào thăm nếu đang có:</p>
          <ul className={styles.list}>
            {healthItems.map((item, i) => (
              <li key={i}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Trách Nhiệm Khi Thăm Bệnh</h3>
        <p>Bệnh viện khuyến khích người nhà chủ động phối hợp và hợp tác chăm sóc người bệnh:</p>
        <ul className={styles.list}>
          {responsibilityItems.map((item, i) => (
            <li key={i}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

/* ────────────── Main Page ────────────── */

const TAB_KEYS: TabKey[] = ['kham-ngoai-tru', 'nhap-vien', 'thanh-toan', 'tien-ich', 'tham-benh'];

const TABS = [
  { key: 'kham-ngoai-tru' as TabKey, label: 'Khám Bệnh Ngoại Trú', icon: <MedicineBoxOutlined /> },
  { key: 'nhap-vien' as TabKey, label: 'Nhập Viện', icon: <HomeOutlined /> },
  { key: 'thanh-toan' as TabKey, label: 'Thanh Toán', icon: <CreditCardOutlined /> },
  { key: 'tien-ich' as TabKey, label: 'Tiện Ích', icon: <StarOutlined /> },
  { key: 'tham-benh' as TabKey, label: 'Thăm Bệnh', icon: <TeamOutlined /> },
];

const TAB_CONTENT: Record<TabKey, React.ReactNode> = {
  'kham-ngoai-tru': <KhamNgoaiTru />,
  'nhap-vien': <NhapVien />,
  'thanh-toan': <ThanhToan />,
  'tien-ich': <TienIch />,
  'tham-benh': <ThamBenh />,
};

const CustomerGuide = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabKey>(() => {
    const tab = searchParams.get('tab');
    return TAB_KEYS.includes(tab as TabKey) ? (tab as TabKey) : 'kham-ngoai-tru';
  });

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && TAB_KEYS.includes(tab as TabKey)) {
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
            <p className={styles.heroDesc}>Hướng dẫn đầy đủ về cách sử dụng nền tảng VitaFamily — từ đặt lịch khám, thanh toán trực tuyến đến chính sách hoàn tiền — giúp Quý khách trải nghiệm dịch vụ y tế dễ dàng và hiệu quả.</p>
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

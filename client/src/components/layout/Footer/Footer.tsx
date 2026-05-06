import { Link } from 'react-router-dom';
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  FacebookOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { CONTACT_INFO, FOOTER_NAV } from '../../../data/constants';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>V</span>
            <span className={styles.logoText}>
              Vita<strong>Family</strong>
            </span>
          </Link>
          <p className={styles.tagline}>Đồng hành cùng sức khỏe gia đình Việt — chuyên nghiệp, tận tâm, đáng tin cậy.</p>
          <div className={styles.social}>
            <a href="#" aria-label="Facebook VitaFamily" className={styles.socialLink}>
              <FacebookOutlined />
            </a>
            <a href="#" aria-label="YouTube VitaFamily" className={styles.socialLink}>
              <YoutubeOutlined />
            </a>
            <a href="#" aria-label="Zalo VitaFamily" className={styles.socialLink}>
              <span className={styles.zaloIcon}>Z</span>
            </a>
          </div>
        </div>

        {/* Services */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Dịch vụ</h4>
          <ul className={styles.linkList}>
            {FOOTER_NAV.services.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className={styles.footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Liên kết nhanh</h4>
          <ul className={styles.linkList}>
            {FOOTER_NAV.quickLinks.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className={styles.footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Liên hệ</h4>
          <ul className={styles.contactList}>
            <li>
              <EnvironmentOutlined className={styles.contactIcon} />
              <span>{CONTACT_INFO.address}</span>
            </li>
            <li>
              <PhoneOutlined className={styles.contactIcon} />
              <a href={`tel:${CONTACT_INFO.phone}`} className={styles.contactLink}>
                {CONTACT_INFO.phone}
              </a>
            </li>
            <li>
              <MailOutlined className={styles.contactIcon} />
              <a href={`mailto:${CONTACT_INFO.email}`} className={styles.contactLink}>
                {CONTACT_INFO.email}
              </a>
            </li>
            <li>
              <ClockCircleOutlined className={styles.contactIcon} />
              <span>{CONTACT_INFO.workingHours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} VitaFamily. Bảo lưu mọi quyền.</p>
        <div className={styles.bottomLinks}>
          <a href="#">Chính sách bảo mật</a>
          <a href="#">Điều khoản sử dụng</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

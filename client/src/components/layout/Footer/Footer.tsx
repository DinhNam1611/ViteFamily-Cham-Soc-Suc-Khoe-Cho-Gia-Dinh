import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
          <p className={styles.tagline}>{t('footer.tagline')}</p>
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
          <h4 className={styles.colTitle}>{t('footer.services_col')}</h4>
          <ul className={styles.linkList}>
            {FOOTER_NAV.services.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className={styles.footerLink}>
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>{t('footer.quick_links_col')}</h4>
          <ul className={styles.linkList}>
            {FOOTER_NAV.quickLinks.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className={styles.footerLink}>
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>{t('footer.contact_col')}</h4>
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
        <p>© {new Date().getFullYear()} VitaFamily. {t('footer.copyright')}</p>
        <div className={styles.bottomLinks}>
          <a href="#">{t('footer.privacy')}</a>
          <a href="#">{t('footer.terms')}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

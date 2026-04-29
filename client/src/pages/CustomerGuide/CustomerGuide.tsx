import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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

interface Step { step: string; title: string; desc: string; }
interface BedRoom { count: string; label: string; }
interface HoursCard { time: string; label: string; }
interface ZoneRule { zone: string; rules: string[]; }
interface AmenityCard { title: string; desc: string; }

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
  const { t } = useTranslation();
  const specialties = t('customer_guide.outpatient.specialties', { returnObjects: true }) as string[];
  const notes = t('customer_guide.outpatient.notes', { returnObjects: true }) as string[];
  const steps = t('customer_guide.outpatient.steps', { returnObjects: true }) as Step[];

  return (
    <div className={styles.content}>
      <h2 className={styles.contentTitle}>{t('customer_guide.outpatient.title')}</h2>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>
          <ClockCircleOutlined className={styles.blockIcon} /> {t('customer_guide.outpatient.hours_title')}
        </h3>
        <div className={styles.infoBox}>
          <p className={styles.highlight}>
            <PhoneOutlined /> {t('customer_guide.outpatient.emergency_24')} <strong>{t('customer_guide.outpatient.emergency_hours')}</strong>
          </p>
          <p>{t('customer_guide.outpatient.emergency_phone')} <strong>024 3574 1111</strong></p>
        </div>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>{t('customer_guide.outpatient.monfri_title')}</h3>
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
          <div className={styles.scheduleRow}>
            <div className={styles.scheduleTimeBadge}>08:30 – 12:00<br />13:30 – 17:30</div>
            <div className={styles.scheduleRowBody}>
              <p className={styles.scheduleNote}>{t('customer_guide.outpatient.other_specialties')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>{t('customer_guide.outpatient.sat_title')}</h3>
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
          <div className={styles.scheduleRow}>
            <div className={styles.scheduleTimeBadge}>08:30 – 12:30</div>
            <div className={styles.scheduleRowBody}>
              <p className={styles.scheduleNote}>{t('customer_guide.outpatient.other_specialties')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>{t('customer_guide.outpatient.booking_title')}</h3>
        <p>{t('customer_guide.outpatient.booking_desc')} <strong>024 3577 1100</strong> {t('customer_guide.outpatient.booking_or_online')}</p>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>{t('customer_guide.outpatient.notes_title')}</h3>
        <ul className={styles.list}>
          {notes.map((item, i) => (
            <li key={i}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>{t('customer_guide.outpatient.steps_title')}</h3>
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

      <div className={styles.infoBox}>
        <p><PhoneOutlined /> {t('customer_guide.outpatient.info_hotline')} <strong>024 3577 1100</strong></p>
        <p><PhoneOutlined /> {t('customer_guide.outpatient.info_emergency')} <strong>024 3574 1111</strong></p>
        <p className={styles.muted}>{t('customer_guide.outpatient.info_docs')}</p>
      </div>
    </div>
  );
};

const NhapVien = () => {
  const { t } = useTranslation();
  const timeItems = t('customer_guide.inpatient.time_items', { returnObjects: true }) as string[];
  const prepItems = t('customer_guide.inpatient.prep_items', { returnObjects: true }) as string[];
  const docsItems = t('customer_guide.inpatient.docs_items', { returnObjects: true }) as string[];
  const rooms = t('customer_guide.inpatient.rooms', { returnObjects: true }) as BedRoom[];
  const cancelSchedule = t('customer_guide.inpatient.cancel_schedule', { returnObjects: true }) as string[];

  return (
    <div className={styles.content}>
      <h2 className={styles.contentTitle}>{t('customer_guide.inpatient.title')}</h2>
      <p className={styles.intro}>{t('customer_guide.inpatient.intro')}</p>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}><ClockCircleOutlined className={styles.blockIcon} /> {t('customer_guide.inpatient.time_title')}</h3>
        <ul className={styles.list}>
          {timeItems.map((item, i) => (
            <li key={i}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>{t('customer_guide.inpatient.prep_title')}</h3>
        <div className={styles.infoBox}>
          <p className={styles.highlight}>{t('customer_guide.inpatient.prep_highlight')}</p>
          <ul className={styles.list}>
            {prepItems.map((item, i) => (
              <li key={i}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>{t('customer_guide.inpatient.procedure_title')}</h3>
        <p>{t('customer_guide.inpatient.procedure_p1')}</p>
        <p>{t('customer_guide.inpatient.procedure_p2')}</p>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>{t('customer_guide.inpatient.docs_title')}</h3>
        <ul className={styles.list}>
          {docsItems.map((item, i) => (
            <li key={i}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>{t('customer_guide.inpatient.rooms_title')}</h3>
        <p>{t('customer_guide.inpatient.rooms_total')}</p>
        <div className={styles.bedGrid}>
          {rooms.map(({ count, label }) => (
            <div key={label} className={styles.bedCard}>
              <span className={styles.bedCount}>{count}</span>
              <span className={styles.bedLabel}>{label}</span>
            </div>
          ))}
        </div>
        <p className={styles.muted}>{t('customer_guide.inpatient.rooms_note')}</p>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>{t('customer_guide.inpatient.cancel_title')}</h3>
        <div className={styles.infoBox}>
          <p>{t('customer_guide.inpatient.cancel_phone')}</p>
          <ul className={styles.list}>
            {cancelSchedule.map((item, i) => (
              <li key={i}><ClockCircleOutlined className={styles.checkIcon} />{item}</li>
            ))}
          </ul>
          <p className={styles.muted}>{t('customer_guide.inpatient.cancel_note')}</p>
        </div>
      </section>
    </div>
  );
};

const ThanhToan = () => {
  const { t } = useTranslation();
  const outpatientItems = t('customer_guide.payment.outpatient_items', { returnObjects: true }) as string[];
  const inpatientItems = t('customer_guide.payment.inpatient_items', { returnObjects: true }) as string[];
  const refundItems = t('customer_guide.payment.refund_items', { returnObjects: true }) as string[];
  const insuranceDocs = t('customer_guide.payment.insurance_docs', { returnObjects: true }) as string[];

  return (
    <div className={styles.content}>
      <h2 className={styles.contentTitle}>{t('customer_guide.payment.title')}</h2>
      <p className={styles.intro}>{t('customer_guide.payment.intro')}</p>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}><MedicineBoxOutlined className={styles.blockIcon} /> {t('customer_guide.payment.outpatient_title')}</h3>
        <ul className={styles.list}>
          {outpatientItems.map((item, i) => (
            <li key={i}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}><HomeOutlined className={styles.blockIcon} /> {t('customer_guide.payment.inpatient_title')}</h3>
        <ul className={styles.list}>
          {inpatientItems.map((item, i) => (
            <li key={i}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}><CreditCardOutlined className={styles.blockIcon} /> {t('customer_guide.payment.deposit_title')}</h3>
        <p>{t('customer_guide.payment.deposit_p1')}</p>
        <div className={styles.infoBox}>
          <p>{t('customer_guide.payment.deposit_info')}</p>
        </div>
        <p>{t('customer_guide.payment.deposit_methods')}</p>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>{t('customer_guide.payment.refund_title')}</h3>
        <ul className={styles.list}>
          {refundItems.map((item, i) => (
            <li key={i}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>{t('customer_guide.payment.insurance_title')}</h3>
        <p>{t('customer_guide.payment.insurance_p1')}</p>
        <div className={styles.infoBox}>
          <p className={styles.highlight}>{t('customer_guide.payment.insurance_highlight')}</p>
          <ul className={styles.list}>
            {insuranceDocs.map((item, i) => (
              <li key={i}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.contactCard}>
          <p><strong>{t('customer_guide.payment.insurance_contact_title')}</strong></p>
          <p>{t('customer_guide.payment.insurance_contact_name')}</p>
          <p><PhoneOutlined /> (84-24) 3577 1100</p>
          <p><MailOutlined /> nghi.truongkieu@hfh.com.vn</p>
        </div>
      </section>
    </div>
  );
};

const TienIch = () => {
  const { t } = useTranslation();
  const cards = t('customer_guide.amenities.cards', { returnObjects: true }) as AmenityCard[];
  const icons = [<CarOutlined key="car" />, <WifiOutlined key="wifi" />, <SafetyOutlined key="safety" />];

  return (
    <div className={styles.content}>
      <h2 className={styles.contentTitle}>{t('customer_guide.amenities.title')}</h2>
      <p className={styles.intro}>{t('customer_guide.amenities.intro')}</p>

      <div className={styles.amenityGrid}>
        {cards.map(({ title, desc }, i) => (
          <div key={title} className={styles.amenityCard}>
            <div className={styles.amenityIcon}>{icons[i]}</div>
            <h3 className={styles.amenityTitle}>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>{t('customer_guide.amenities.cafe_title')}</h3>
        <p>{t('customer_guide.amenities.cafe_location')}</p>
        <p>{t('customer_guide.amenities.cafe_desc')}</p>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>{t('customer_guide.amenities.bakery_title')}</h3>
        <p>{t('customer_guide.amenities.bakery_location')}</p>
        <p>{t('customer_guide.amenities.bakery_desc')}</p>
      </section>

      <div className={styles.infoBox}>
        <p className={styles.highlight}>{t('customer_guide.amenities.quote')}</p>
      </div>
    </div>
  );
};

const ThamBenh = () => {
  const { t } = useTranslation();
  const hoursCards = t('customer_guide.visit.hours_cards', { returnObjects: true }) as HoursCard[];
  const rules = t('customer_guide.visit.rules', { returnObjects: true }) as string[];
  const zones = t('customer_guide.visit.zones', { returnObjects: true }) as ZoneRule[];
  const healthItems = t('customer_guide.visit.health_items', { returnObjects: true }) as string[];
  const responsibilityItems = t('customer_guide.visit.responsibility_items', { returnObjects: true }) as string[];

  return (
    <div className={styles.content}>
      <h2 className={styles.contentTitle}>{t('customer_guide.visit.title')}</h2>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}><ClockCircleOutlined className={styles.blockIcon} /> {t('customer_guide.visit.hours_title')}</h3>
        <div className={styles.scheduleGrid}>
          {hoursCards.map(({ time, label }) => (
            <div key={time} className={styles.scheduleCard}>
              <div className={styles.scheduleTime}>{time}</div>
              <p>{label}</p>
            </div>
          ))}
        </div>
        <p className={styles.muted}>{t('customer_guide.visit.hours_note')}</p>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>{t('customer_guide.visit.rules_title')}</h3>
        <ul className={styles.list}>
          {rules.map((item, i) => (
            <li key={i}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>{t('customer_guide.visit.zones_title')}</h3>
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
        <h3 className={styles.blockTitle}>{t('customer_guide.visit.health_title')}</h3>
        <div className={styles.warningBox}>
          <p>{t('customer_guide.visit.health_warning')}</p>
          <ul className={styles.list}>
            {healthItems.map((item, i) => (
              <li key={i}><CheckCircleOutlined className={styles.checkIcon} />{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>{t('customer_guide.visit.responsibility_title')}</h3>
        <p>{t('customer_guide.visit.responsibility_intro')}</p>
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

const TAB_CONTENT: Record<TabKey, React.ReactNode> = {
  'kham-ngoai-tru': <KhamNgoaiTru />,
  'nhap-vien': <NhapVien />,
  'thanh-toan': <ThanhToan />,
  'tien-ich': <TienIch />,
  'tham-benh': <ThamBenh />,
};

const CustomerGuide = () => {
  const { t } = useTranslation();
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

  const TABS = [
    { key: 'kham-ngoai-tru' as TabKey, label: t('customer_guide.tab_outpatient'), icon: <MedicineBoxOutlined /> },
    { key: 'nhap-vien' as TabKey, label: t('customer_guide.tab_inpatient'), icon: <HomeOutlined /> },
    { key: 'thanh-toan' as TabKey, label: t('customer_guide.tab_payment'), icon: <CreditCardOutlined /> },
    { key: 'tien-ich' as TabKey, label: t('customer_guide.tab_amenities'), icon: <StarOutlined /> },
    { key: 'tham-benh' as TabKey, label: t('customer_guide.tab_visit'), icon: <TeamOutlined /> },
  ];

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
            <p className={styles.heroSub}>{t('customer_guide.hero_sub')}</p>
            <h1 className={styles.heroTitle}>{t('customer_guide.hero_title')}</h1>
            <p className={styles.heroDesc}>{t('customer_guide.hero_desc')}</p>
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
              <h2 className={styles.sidebarHeading}>{t('customer_guide.sidebar_heading')}</h2>
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

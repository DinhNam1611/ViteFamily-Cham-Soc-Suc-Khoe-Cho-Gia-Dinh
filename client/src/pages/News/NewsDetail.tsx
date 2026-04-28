import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarOutlined, EyeOutlined, UserOutlined, ArrowLeftOutlined, ShareAltOutlined, TagOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import { NEWS_DATA } from '../../data/newsData';
import { NEWS_CATEGORIES } from '../../data/constants';
import styles from './NewsDetail.module.css';

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article = NEWS_DATA.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.notFound}>
          <h2>Không tìm thấy bài viết</h2>
          <Button type="primary" onClick={() => navigate('/news')}>Quay lại Tin tức</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryLabel = NEWS_CATEGORIES.find((c) => c.slug === article.category)?.label ?? article.category;
  const categoryPath = `/news?category=${article.category}`;

  const related = NEWS_DATA
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success('Đã sao chép liên kết bài viết');
  };

  return (
    <div className={styles.page}>
      <Header />

      {/* ── Breadcrumb bar ──────────────────────────────────────── */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <Link to="/" className={styles.breadLink}>Trang chủ</Link>
          <span className={styles.sep}>/</span>
          <Link to={categoryPath} className={styles.breadLink}>Tin tức</Link>
          <span className={styles.sep}>/</span>
          <Link to={categoryPath} className={styles.breadLink}>{categoryLabel}</Link>
          <span className={styles.sep}>/</span>
          <span className={styles.breadCurrent}>{article.title}</span>
        </div>
      </div>

      <main className={styles.main}>
        <div className={`container ${styles.mainInner}`}>

          {/* ── Article ──────────────────────────────────────────── */}
          <motion.article
            className={styles.article}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back button */}
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
              <ArrowLeftOutlined /> Quay lại
            </button>

            {/* Category badge */}
            <Link to={categoryPath} className={styles.categoryBadge}>
              <TagOutlined /> {categoryLabel}
            </Link>

            {/* Title */}
            <h1 className={styles.title}>{article.title}</h1>

            {/* Meta */}
            <div className={styles.meta}>
              {article.author && (
                <span className={styles.metaItem}><UserOutlined /> {article.author}</span>
              )}
              <span className={styles.metaItem}><CalendarOutlined /> {formatDate(article.date)}</span>
              <span className={styles.metaItem}><EyeOutlined /> {article.views.toLocaleString()} lượt xem</span>
              <button className={styles.shareBtn} onClick={handleShare}>
                <ShareAltOutlined /> Chia sẻ
              </button>
            </div>

            {/* Hero image */}
            <div className={styles.heroWrap}>
              <img src={article.image} alt={article.title} className={styles.heroImage} />
            </div>

            {/* Excerpt highlight */}
            <p className={styles.lead}>{article.excerpt}</p>

            {/* Body placeholder */}
            <div className={styles.body}>
              <p>
                Trong bối cảnh hệ thống y tế ngày càng phát triển, VitaFamily luôn tiên phong trong việc ứng dụng
                các công nghệ và phương pháp điều trị tiên tiến nhằm mang lại dịch vụ chăm sóc sức khỏe tốt nhất
                cho người dân. Đây là cam kết mà chúng tôi theo đuổi từ ngày đầu thành lập cho đến hôm nay.
              </p>
              <p>
                Với đội ngũ hơn 200 bác sĩ chuyên khoa giàu kinh nghiệm, trang thiết bị y tế hiện đại và quy trình
                khám chữa bệnh chuẩn quốc tế, VitaFamily tự hào là lựa chọn tin cậy của hàng trăm nghìn bệnh nhân
                và gia đình trên khắp cả nước.
              </p>
              <h3>Những điểm nổi bật</h3>
              <ul>
                <li>Đội ngũ y bác sĩ được đào tạo chuyên sâu tại các trung tâm y tế hàng đầu thế giới</li>
                <li>Hệ thống trang thiết bị hiện đại, được cập nhật thường xuyên theo tiêu chuẩn quốc tế</li>
                <li>Quy trình khám chữa bệnh minh bạch, tôn trọng quyền lợi bệnh nhân</li>
                <li>Dịch vụ chăm sóc toàn diện từ phòng ngừa đến điều trị và phục hồi</li>
              </ul>
              <p>
                Chúng tôi hiểu rằng sức khỏe là tài sản quý giá nhất của mỗi người và mỗi gia đình. Vì vậy,
                mọi quyết định và hành động của VitaFamily đều hướng đến một mục tiêu duy nhất: mang lại sức khỏe
                và hạnh phúc cho cộng đồng.
              </p>
            </div>
          </motion.article>

          {/* ── Related articles ──────────────────────────────────── */}
          {related.length > 0 && (
            <aside className={styles.related}>
              <h2 className={styles.relatedTitle}>Bài viết liên quan</h2>
              <div className={styles.relatedGrid}>
                {related.map((a, i) => (
                  <motion.article
                    key={a.id}
                    className={styles.relatedCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <Link to={`/news/${a.slug}`} className={styles.relatedImageWrap}>
                      <img src={a.image} alt={a.title} className={styles.relatedImage} loading="lazy" />
                    </Link>
                    <div className={styles.relatedBody}>
                      <Link to={`/news/${a.slug}`} className={styles.relatedCardTitle}>
                        {a.title}
                      </Link>
                      <div className={styles.relatedMeta}>
                        <CalendarOutlined /> {formatDate(a.date)}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
              <div className={styles.backToList}>
                <Link to={categoryPath} className={styles.backToListBtn}>
                  <ArrowLeftOutlined /> Xem tất cả bài viết {categoryLabel}
                </Link>
              </div>
            </aside>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetail;

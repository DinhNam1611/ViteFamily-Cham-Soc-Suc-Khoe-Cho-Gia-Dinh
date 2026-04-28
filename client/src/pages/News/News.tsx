import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarOutlined, EyeOutlined, UserOutlined, PictureOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import { NEWS_DATA, PHOTO_GALLERY } from '../../data/newsData';
import { NEWS_CATEGORIES } from '../../data/constants';
import type { NewsArticle } from '../../data/newsData';
import styles from './News.module.css';

const PAGE_SIZE = 9;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.07 },
  }),
};

const formatDate = (d: string) => {
  const dt = new Date(d);
  return dt.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

interface ArticleCardProps {
  article: NewsArticle;
  index: number;
  size?: 'normal' | 'featured' | 'sidebar';
}

const ArticleCard = ({ article, index, size = 'normal' }: ArticleCardProps) => (
  <motion.article
    className={`${styles.card} ${styles[`card_${size}`]}`}
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    custom={index}
    layout
  >
    <Link to={`/news/${article.slug}`} className={styles.cardImageWrap}>
      <img src={article.image} alt={article.title} className={styles.cardImage} loading="lazy" />
      <span className={styles.cardCategoryBadge}>
        {NEWS_CATEGORIES.find((c) => c.slug === article.category)?.label ?? article.category}
      </span>
    </Link>
    <div className={styles.cardBody}>
      <Link to={`/news/${article.slug}`} className={styles.cardTitle}>
        {article.title}
      </Link>
      {size !== 'sidebar' && (
        <p className={styles.cardExcerpt}>{article.excerpt}</p>
      )}
      <div className={styles.cardMeta}>
        {article.author && (
          <span className={styles.metaItem}>
            <UserOutlined /> {article.author}
          </span>
        )}
        <span className={styles.metaItem}>
          <CalendarOutlined /> {formatDate(article.date)}
        </span>
        <span className={styles.metaItem}>
          <EyeOutlined /> {article.views.toLocaleString()}
        </span>
      </div>
    </div>
  </motion.article>
);

const SidebarArticle = ({ article, index }: { article: NewsArticle; index: number }) => (
  <motion.article
    className={styles.sidebarItem}
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    custom={index}
  >
    <Link to={`/news/${article.slug}`} className={styles.sidebarImageWrap}>
      <img src={article.image} alt={article.title} className={styles.sidebarImage} loading="lazy" />
    </Link>
    <div className={styles.sidebarBody}>
      <Link to={`/news/${article.slug}`} className={styles.sidebarTitle}>
        {article.title}
      </Link>
      <div className={styles.sidebarMeta}>
        <CalendarOutlined /> {formatDate(article.date)}
      </div>
    </div>
  </motion.article>
);

const PhotoGallery = () => (
  <div className={styles.galleryGrid}>
    {PHOTO_GALLERY.map((photo, i) => (
      <motion.div
        key={photo.id}
        className={styles.galleryItem}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={i}
      >
        <img src={photo.src} alt={photo.caption} className={styles.galleryImage} loading="lazy" />
        <div className={styles.galleryOverlay}>
          <PictureOutlined className={styles.galleryIcon} />
          <p className={styles.galleryCaption}>{photo.caption}</p>
          <span className={styles.galleryDate}>{photo.date}</span>
        </div>
      </motion.div>
    ))}
  </div>
);

const News = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const activeSlug = searchParams.get('category') ?? 'su-kien';
  const activeCategory = NEWS_CATEGORIES.find((c) => c.slug === activeSlug) ?? NEWS_CATEGORIES[0];

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSlug]);

  const filtered = useMemo(
    () => NEWS_DATA.filter((a) => a.category === activeSlug),
    [activeSlug],
  );

  const isGallery = activeSlug === 'thu-vien';
  const featured = filtered[0];
  const sidebarArticles = filtered.slice(1, 4);
  const gridArticles = filtered.slice(4);
  const pagedGridArticles = gridArticles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleCategoryChange = (slug: string) => {
    setSearchParams({ category: slug });
  };

  return (
    <div className={styles.page}>
      <Header />

      {/* ── Banner image ────────────────────────────────────────── */}
      <section className={styles.banner}>
        <img
          src={activeCategory.banner}
          alt={activeCategory.label}
          className={styles.bannerImage}
        />
        <div className={styles.bannerOverlay} />
      </section>

      {/* ── Category Tabs ────────────────────────────────────────── */}
      <div className={styles.tabsBar}>
        <div className={`container ${styles.tabsInner}`}>
          {NEWS_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              className={`${styles.tab} ${cat.slug === activeSlug ? styles.tabActive : ''}`}
              onClick={() => handleCategoryChange(cat.slug)}
            >
              {cat.slug === 'thu-vien' && <PictureOutlined className={styles.tabIcon} />}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Page header (title + breadcrumb) ────────────────────── */}
      <div className={styles.pageHeader}>
        <div className={`container ${styles.pageHeaderInner}`}>
          <motion.h1
            key={activeSlug}
            className={styles.pageTitle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeCategory.label}
          </motion.h1>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/" className={styles.breadcrumbLink}>Trang chủ</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>Tin tức</span>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{activeCategory.label}</span>
          </nav>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <main className={styles.main}>
        <div className={`container ${styles.mainInner}`}>
          <AnimatePresence mode="wait">
            {isGallery ? (
              <motion.div
                key="gallery"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Thư Viện Ảnh VitaFamily</h2>
                  <p className={styles.sectionSubtitle}>Hình ảnh cơ sở vật chất, sự kiện và đội ngũ y tế</p>
                </div>
                <PhotoGallery />
              </motion.div>
            ) : filtered.length === 0 ? (
              <motion.div
                key="empty"
                className={styles.empty}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p>Chưa có bài viết nào trong mục này.</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeSlug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {/* Featured + Sidebar */}
                {featured && (
                  <div className={styles.featured}>
                    {/* Featured large card */}
                    <motion.article
                      className={styles.featuredMain}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      custom={0}
                    >
                      <Link to={`/news/${featured.slug}`} className={styles.featuredImageWrap}>
                        <img
                          src={featured.image}
                          alt={featured.title}
                          className={styles.featuredImage}
                        />
                        <span className={styles.featuredBadge}>{activeCategory.label}</span>
                      </Link>
                      <div className={styles.featuredBody}>
                        <Link to={`/news/${featured.slug}`} className={styles.featuredTitle}>
                          {featured.title}
                        </Link>
                        <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                        <div className={styles.featuredMeta}>
                          {featured.author && (
                            <span className={styles.metaItem}>
                              <UserOutlined /> {featured.author}
                            </span>
                          )}
                          <span className={styles.metaItem}>
                            <CalendarOutlined /> {formatDate(featured.date)}
                          </span>
                          <span className={styles.metaItem}>
                            <EyeOutlined /> {featured.views.toLocaleString()} lượt xem
                          </span>
                        </div>
                        <Link to={`/news/${featured.slug}`} className={styles.readMoreBtn}>
                          Đọc tiếp <ArrowRightOutlined />
                        </Link>
                      </div>
                    </motion.article>

                    {/* Sidebar list */}
                    {sidebarArticles.length > 0 && (
                      <aside className={styles.featuredSidebar}>
                        <h3 className={styles.sidebarHeading}>Bài viết mới nhất</h3>
                        <div className={styles.sidebarList}>
                          {sidebarArticles.map((a, i) => (
                            <SidebarArticle key={a.id} article={a} index={i + 1} />
                          ))}
                        </div>
                      </aside>
                    )}
                  </div>
                )}

                {/* Grid */}
                {pagedGridArticles.length > 0 && (
                  <>
                    <div className={styles.gridDivider}>
                      <h2 className={styles.gridHeading}>Tất cả bài viết</h2>
                    </div>
                    <div className={styles.grid}>
                      {pagedGridArticles.map((a, i) => (
                        <ArticleCard key={a.id} article={a} index={i} />
                      ))}
                    </div>
                  </>
                )}

                {/* Pagination */}
                {gridArticles.length > PAGE_SIZE && (
                  <div className={styles.paginationWrap}>
                    <Pagination
                      current={currentPage}
                      total={gridArticles.length}
                      pageSize={PAGE_SIZE}
                      onChange={(page) => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      showSizeChanger={false}
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;

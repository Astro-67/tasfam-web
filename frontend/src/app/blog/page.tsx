import Link from 'next/link';
import { getBlogPosts } from '@/lib/db';

const fallbackPosts = [
  { slug: 'dolorum-optio-tempore', image: '/img/blog/blog-1.jpg', day: '12', month: 'December', author: 'John Doe', category: 'Politics', title: 'Dolorum optio tempore voluptas dignissimos' },
  { slug: 'nisi-magni-odit', image: '/img/blog/blog-2.jpg', day: '19', month: 'March', author: 'Julia Parker', category: 'Economics', title: 'Nisi magni odit consequatur autem nulla dolorem' },
  { slug: 'possimus-soluta', image: '/img/blog/blog-3.jpg', day: '24', month: 'June', author: 'Maria Doe', category: 'Sports', title: 'Possimus soluta ut id suscipit ea ut. In quo quia et soluta libero sit sint.' },
  { slug: 'non-rem-rerum', image: '/img/blog/blog-4.jpg', day: '05', month: 'August', author: 'Maria Doe', category: 'Sports', title: 'Non rem rerum nam cum quo minus explicabo eius exercitationem.' },
  { slug: 'accusamus-quaerat', image: '/img/blog/blog-5.jpg', day: '17', month: 'September', author: 'John Parker', category: 'Politics', title: 'Accusamus quaerat aliquam qui debitis facilis consequatur' },
  { slug: 'distinctio-provident', image: '/img/blog/blog-6.jpg', day: '07', month: 'December', author: 'Julia White', category: 'Economics', title: 'Distinctio provident quibusdam numquam aperiam aut' },
];

export default async function BlogPage() {
  let posts = fallbackPosts;

  try {
    const res = await getBlogPosts();
    if (Array.isArray(res.data) && res.data.length > 0) {
      posts = res.data.map((p: Record<string, unknown>) => ({
        slug: (p as { slug?: string }).slug || '',
        image: '/img/blog/blog-1.jpg',
        day: '01',
        month: 'January',
        author: 'TASFAM',
        category: 'News',
        title: (p as { title?: string }).title || '',
      }));
    }
  } catch {
    // Use fallback
  }

  return (
    <>
      {/* Page Title */}
      <div
        className="page-title dark-background"
        data-aos="fade"
        style={{ backgroundImage: 'url(/img/page-title-bg.webp)' }}
      >
        <div className="container position-relative">
          <h1>Blog</h1>
          <p>Home / Blog</p>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li className="current">Blog</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Blog Posts 2 Section */}
      <section id="blog-posts-2" className="blog-posts-2 section">
        <div className="container">
          <div className="row gy-4">
            {posts.map((post, index) => (
              <div key={index} className="col-lg-4">
                <article className="position-relative h-100">
                  <div className="post-img position-relative overflow-hidden">
                    <img src={post.image} className="img-fluid" alt="" />
                  </div>

                  <div className="meta d-flex align-items-end">
                    <span className="post-date">
                      <span>{post.day}</span>
                      {post.month}
                    </span>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-person"></i>{' '}
                      <span className="ps-2">{post.author}</span>
                    </div>
                    <span className="px-3 text-black-50">/</span>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-folder2"></i>{' '}
                      <span className="ps-2">{post.category}</span>
                    </div>
                  </div>

                  <div className="post-content d-flex flex-column">
                    <h3 className="post-title">{post.title}</h3>
                    <Link href={`/blog/${post.slug}`} className="readmore stretched-link">
                      <span>Read More</span>
                      <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Pagination Section */}
      <section id="blog-pagination" className="blog-pagination section">
        <div className="container">
          <div className="d-flex justify-content-center">
            <ul>
              <li>
                <a href="#">
                  <i className="bi bi-chevron-left"></i>
                </a>
              </li>
              <li>
                <a href="#">1</a>
              </li>
              <li>
                <a href="#" className="active">
                  2
                </a>
              </li>
              <li>
                <a href="#">3</a>
              </li>
              <li>
                <a href="#">4</a>
              </li>
              <li>...</li>
              <li>
                <a href="#">10</a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-chevron-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section id="call-to-action" className="call-to-action section light-background">
        <div className="content">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h3>Subscribe To Our Newsletter</h3>
                <p className="opacity-50">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, reprehenderit!
                </p>
              </div>
              <div className="col-lg-6">
                <form className="form-subscribe">
                  <div className="form-group d-flex align-items-stretch">
                    <input
                      type="email"
                      name="email"
                      className="form-control h-100"
                      placeholder="Enter your e-mail"
                    />
                    <input
                      type="submit"
                      className="btn btn-secondary px-4"
                      value="Subscribe"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

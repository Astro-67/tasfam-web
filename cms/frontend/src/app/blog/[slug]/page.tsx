import Link from 'next/link';
import { getBlogPost } from '@/lib/db';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  // Try to fetch from Strapi, fall back to static content
  let title = 'Dolorum optio tempore voluptas dignissimos cumque fuga qui quibusdam quia';
  let author = 'John Doe';

  try {
    const res = await getBlogPost(slug);
    if (Array.isArray(res.data) && res.data.length > 0) {
      const post = res.data[0] as Record<string, unknown>;
      title = (post as { title?: string }).title || title;
      author = (post as { author?: { name?: string } }).author?.name || author;
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
          <h1>Blog Details</h1>
          <p>
            Esse dolorum voluptatum ullam est sint nemo et est ipsa porro placeat quibusdam quia
            assumenda numquam molestias.
          </p>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li className="current">Blog Details</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            {/* Blog Details Section */}
            <section id="blog-details" className="blog-details section">
              <div className="container">
                <article className="article">
                  <div className="post-img">
                    <img src="/img/blog/blog-1.jpg" alt="" className="img-fluid" />
                  </div>

                  <h2 className="title">{title}</h2>

                  <div className="meta-top">
                    <ul>
                      <li className="d-flex align-items-center">
                        <i className="bi bi-person"></i>{' '}
                        <a href="#">{author}</a>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="bi bi-clock"></i>{' '}
                        <a href="#">
                          <time dateTime="2020-01-01">Jan 1, 2022</time>
                        </a>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="bi bi-chat-dots"></i> <a href="#">12 Comments</a>
                      </li>
                    </ul>
                  </div>

                  <div className="content">
                    <p>
                      Similique neque nam consequuntur ad non maxime aliquam quas. Quibusdam animi
                      praesentium. Aliquam et laboriosam eius aut nostrum quidem aliquid dicta. Et
                      eveniet enim. Qui velit est ea dolorem doloremque deleniti aperiam unde soluta.
                      Est cum et quod quos aut ut et sit sunt. Voluptate porro consequatur assumenda
                      perferendis dolore.
                    </p>

                    <p>
                      Sit repellat hic cupiditate hic ut nemo. Quis nihil sunt non reiciendis. Sequi
                      in accusamus harum vel aspernatur. Excepturi numquam nihil cumque odio. Et
                      voluptate cupiditate.
                    </p>

                    <blockquote>
                      <p>
                        Et vero doloremque tempore voluptatem ratione vel aut. Deleniti sunt animi aut.
                        Aut eos aliquam doloribus minus autem quos.
                      </p>
                    </blockquote>

                    <p>
                      Sed quo laboriosam qui architecto. Occaecati repellendus omnis dicta inventore
                      tempore provident voluptas mollitia aliquid. Id repellendus quia. Asperiores
                      nihil magni dicta est suscipit perspiciatis. Voluptate ex rerum assumenda dolores
                      nihil quaerat. Dolor porro tempora et quibusdam voluptas. Beatae aut at ad qui
                      tempore corrupti velit quisquam rerum. Omnis dolorum exercitationem harum qui qui
                      blanditiis neque. Iusto autem itaque. Repudiandae hic quae aspernatur ea neque
                      qui. Architecto voluptatem magni. Vel magnam quod et tempora deleniti error rerum
                      nihil tempora.
                    </p>

                    <h3>Et quae iure vel ut odit alias.</h3>
                    <p>
                      Officiis animi maxime nulla quo et harum eum quis a. Sit hic in qui quos fugit ut
                      rerum atque. Optio provident dolores atque voluptatem rem excepturi molestiae qui.
                      Voluptatem laborum omnis ullam quibusdam perspiciatis nulla nostrum. Voluptatum
                      est libero eum nesciunt aliquid qui. Quia et suscipit non sequi. Maxime sed odit.
                      Beatae nesciunt nesciunt accusamus quia aut ratione aspernatur dolor. Sint harum
                      eveniet dicta exercitationem minima. Exercitationem omnis asperiores natus aperiam
                      dolor consequatur id ex sed. Quibusdam rerum dolores sint consequatur quidem ea.
                      Beatae minima sunt libero soluta sapiente in rem assumenda. Et qui odit voluptatem.
                      Cum quibusdam voluptatem voluptatem accusamus mollitia aut atque aut.
                    </p>
                    <img src="/img/blog/blog-inside-post.jpg" className="img-fluid" alt="" />

                    <h3>Ut repellat blanditiis est dolore sunt dolorum quae.</h3>
                    <p>
                      Rerum ea est assumenda pariatur quasi et quam. Facilis nam porro amet nostrum. In
                      assumenda quia quae a id praesentium. Quos deleniti libero sed occaecati aut
                      porro autem. Consectetur sed excepturi sint non placeat quia repellat incidunt
                      labore. Autem facilis hic dolorum dolores vel. Consectetur quasi id et optio
                      praesentium aut asperiores eaque aut. Explicabo omnis quibusdam esse. Ex libero
                      illum iusto totam et ut aut blanditiis. Veritatis numquam ut illum ut a quam
                      vitae.
                    </p>
                    <p>
                      Alias quia non aliquid. Eos et ea velit. Voluptatem maxime enim omnis ipsa
                      voluptas incidunt. Nulla sit eaque mollitia nisi asperiores est veniam.
                    </p>
                  </div>

                  <div className="meta-bottom">
                    <i className="bi bi-folder"></i>
                    <ul className="cats">
                      <li>
                        <a href="#">Business</a>
                      </li>
                    </ul>

                    <i className="bi bi-tags"></i>
                    <ul className="tags">
                      <li>
                        <a href="#">Creative</a>
                      </li>
                      <li>
                        <a href="#">Tips</a>
                      </li>
                      <li>
                        <a href="#">Marketing</a>
                      </li>
                    </ul>
                  </div>
                </article>
              </div>
            </section>

            {/* Blog Comments Section */}
            <section id="blog-comments" className="blog-comments section">
              <div className="container">
                <h4 className="comments-count">8 Comments</h4>

                <div id="comment-1" className="comment">
                  <div className="d-flex">
                    <div className="comment-img">
                      <img src="/img/blog/comments-1.jpg" alt="" />
                    </div>
                    <div>
                      <h5>
                        <a href="">Georgia Reader</a>{' '}
                        <a href="#" className="reply">
                          <i className="bi bi-reply-fill"></i> Reply
                        </a>
                      </h5>
                      <time dateTime="2020-01-01">01 Jan,2022</time>
                      <p>
                        Et rerum totam nisi. Molestiae vel quam dolorum vel voluptatem et et. Est ad
                        aut sapiente quis molestiae est qui cum soluta. Vero aut rerum vel. Rerum quos
                        laboriosam placeat ex qui. Sint qui facilis et.
                      </p>
                    </div>
                  </div>
                </div>

                <div id="comment-2" className="comment">
                  <div className="d-flex">
                    <div className="comment-img">
                      <img src="/img/blog/comments-2.jpg" alt="" />
                    </div>
                    <div>
                      <h5>
                        <a href="">Aron Alvarado</a>{' '}
                        <a href="#" className="reply">
                          <i className="bi bi-reply-fill"></i> Reply
                        </a>
                      </h5>
                      <time dateTime="2020-01-01">01 Jan,2022</time>
                      <p>
                        Ipsam tempora sequi voluptatem quis sapiente non. Autem itaque eveniet saepe.
                        Officiis illo ut beatae.
                      </p>
                    </div>
                  </div>

                  <div id="comment-reply-1" className="comment comment-reply">
                    <div className="d-flex">
                      <div className="comment-img">
                        <img src="/img/blog/comments-3.jpg" alt="" />
                      </div>
                      <div>
                        <h5>
                          <a href="">Lynda Small</a>{' '}
                          <a href="#" className="reply">
                            <i className="bi bi-reply-fill"></i> Reply
                          </a>
                        </h5>
                        <time dateTime="2020-01-01">01 Jan,2022</time>
                        <p>
                          Enim ipsa eum fugiat fuga repellat. Commodi quo quo dicta. Est ullam
                          aspernatur ut vitae quia mollitia id non. Qui ad quas nostrum rerum sed
                          necessitatibus aut est. Eum officiis sed repellat maxime vero nisi natus.
                          Amet nesciunt nesciunt qui illum omnis est et dolor recusandae.
                        </p>
                      </div>
                    </div>

                    <div id="comment-reply-2" className="comment comment-reply">
                      <div className="d-flex">
                        <div className="comment-img">
                          <img src="/img/blog/comments-4.jpg" alt="" />
                        </div>
                        <div>
                          <h5>
                            <a href="">Sianna Ramsay</a>{' '}
                            <a href="#" className="reply">
                              <i className="bi bi-reply-fill"></i> Reply
                            </a>
                          </h5>
                          <time dateTime="2020-01-01">01 Jan,2022</time>
                          <p>
                            Et dignissimos impedit nulla et quo distinctio ex nemo. Omnis quia dolores
                            cupiditate et. Ut unde qui eligendi sapiente omnis ullam. Placeat porro est
                            commodi est officiis voluptas repellat quisquam possimus. Perferendis id
                            consectetur necessitatibus.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="comment-3" className="comment">
                  <div className="d-flex">
                    <div className="comment-img">
                      <img src="/img/blog/comments-5.jpg" alt="" />
                    </div>
                    <div>
                      <h5>
                        <a href="">Nolan Davidson</a>{' '}
                        <a href="#" className="reply">
                          <i className="bi bi-reply-fill"></i> Reply
                        </a>
                      </h5>
                      <time dateTime="2020-01-01">01 Jan,2022</time>
                      <p>
                        Distinctio nesciunt rerum reprehenderit sed. Iste omnis eius repellendus quia
                        nihil ut accusantium tempore. Nesciunt expedita id dolor exercitationem
                        aspernatur aut quam ut. Voluptatem est accusamus iste at. Non aut et et esse
                        qui sit modi neque. Exercitationem et eos aspernatur. Ea est consequuntur
                        officia beatae ea aut eos soluta. Non qui dolorum voluptatibus et optio veniam.
                        Quam officia sit nostrum dolorem.
                      </p>
                    </div>
                  </div>
                </div>

                <div id="comment-4" className="comment">
                  <div className="d-flex">
                    <div className="comment-img">
                      <img src="/img/blog/comments-6.jpg" alt="" />
                    </div>
                    <div>
                      <h5>
                        <a href="">Kay Duggan</a>{' '}
                        <a href="#" className="reply">
                          <i className="bi bi-reply-fill"></i> Reply
                        </a>
                      </h5>
                      <time dateTime="2020-01-01">01 Jan,2022</time>
                      <p>
                        Dolorem atque aut. Omnis doloremque blanditiis quia eum porro quis ut velit
                        tempore. Cumque sed quia ut maxime. Est ad aut cum. Ut exercitationem non in
                        fugiat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Comment Form Section */}
            <section id="comment-form" className="comment-form section">
              <div className="container">
                <form action="">
                  <h4>Post Comment</h4>
                  <p>Your email address will not be published. Required fields are marked * </p>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Your Name*"
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <input
                        name="email"
                        type="text"
                        className="form-control"
                        placeholder="Your Email*"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col form-group">
                      <input
                        name="website"
                        type="text"
                        className="form-control"
                        placeholder="Your Website"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col form-group">
                      <textarea
                        name="comment"
                        className="form-control"
                        placeholder="Your Comment*"
                      ></textarea>
                    </div>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Post Comment
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>

          <div className="col-lg-4 sidebar">
            <div className="widgets-container">
              {/* Blog Author Widget */}
              <div className="blog-author-widget widget-item">
                <div className="d-flex flex-column align-items-center">
                  <div className="d-flex align-items-center w-100">
                    <img
                      src="/img/blog/blog-author.jpg"
                      className="rounded-circle flex-shrink-0"
                      alt=""
                    />
                    <div>
                      <h4>Jane Smith</h4>
                      <div className="social-links">
                        <a href="https://x.com/#">
                          <i className="bi bi-twitter-x"></i>
                        </a>
                        <a href="https://facebook.com/#">
                          <i className="bi bi-facebook"></i>
                        </a>
                        <a href="https://instagram.com/#">
                          <i className="bi bi-instagram"></i>
                        </a>
                        <a href="https://linkedin.com/#">
                          <i className="bi bi-linkedin"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <p>
                    Itaque quidem optio quia voluptatibus dolorem dolor. Modi eum sed possimus
                    accusantium. Quas repellat voluptatem officia numquam sint aspernatur voluptas.
                    Esse et accusantium ut unde voluptas.
                  </p>
                </div>
              </div>

              {/* Search Widget */}
              <div className="search-widget widget-item">
                <h3 className="widget-title">Search</h3>
                <form action="">
                  <input type="text" />
                  <button type="submit" title="Search">
                    <i className="bi bi-search"></i>
                  </button>
                </form>
              </div>

              {/* Categories Widget */}
              <div className="categories-widget widget-item">
                <h3 className="widget-title">Categories</h3>
                <ul className="mt-3">
                  <li>
                    <a href="#">
                      General <span>(25)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Lifestyle <span>(12)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Travel <span>(5)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Design <span>(22)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Creative <span>(8)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Education <span>(14)</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Recent Posts Widget 2 */}
              <div className="recent-posts-widget-2 widget-item">
                <h3 className="widget-title">Recent Posts</h3>

                <div className="post-item">
                  <h4>
                    <a href="#">Nihil blanditiis at in nihil autem</a>
                  </h4>
                  <time dateTime="2020-01-01">Jan 1, 2020</time>
                </div>

                <div className="post-item">
                  <h4>
                    <a href="#">Quidem autem et impedit</a>
                  </h4>
                  <time dateTime="2020-01-01">Jan 1, 2020</time>
                </div>

                <div className="post-item">
                  <h4>
                    <a href="#">Id quia et et ut maxime similique occaecati ut</a>
                  </h4>
                  <time dateTime="2020-01-01">Jan 1, 2020</time>
                </div>

                <div className="post-item">
                  <h4>
                    <a href="#">Laborum corporis quo dara net para</a>
                  </h4>
                  <time dateTime="2020-01-01">Jan 1, 2020</time>
                </div>

                <div className="post-item">
                  <h4>
                    <a href="#">Et dolores corrupti quae illo quod dolor</a>
                  </h4>
                  <time dateTime="2020-01-01">Jan 1, 2020</time>
                </div>
              </div>

              {/* Tags Widget */}
              <div className="tags-widget widget-item">
                <h3 className="widget-title">Tags</h3>
                <ul>
                  <li>
                    <a href="#">App</a>
                  </li>
                  <li>
                    <a href="#">IT</a>
                  </li>
                  <li>
                    <a href="#">Business</a>
                  </li>
                  <li>
                    <a href="#">Mac</a>
                  </li>
                  <li>
                    <a href="#">Design</a>
                  </li>
                  <li>
                    <a href="#">Office</a>
                  </li>
                  <li>
                    <a href="#">Creative</a>
                  </li>
                  <li>
                    <a href="#">Studio</a>
                  </li>
                  <li>
                    <a href="#">Smart</a>
                  </li>
                  <li>
                    <a href="#">Tips</a>
                  </li>
                  <li>
                    <a href="#">Marketing</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}




import Logo from '@/assets/images/logo.png'
import Video from '@/assets/videos/spicy_tofu(720p).mp4'


export default function FeaturedPosts() {
    return (
        <section className="text-bg-light">
            <h2 className="container fw-normal px-5 pt-5 pb-0">Featured Posts</h2>

            <article className="container px-5 my-5">
                <div className="card shadow border-0">
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-3">
                            <div className="d-flex justify-content-start align-items-center column-gap-2">
                                <div className="rounded-circle">
                                    <img src={ Logo } alt="" width="65" />
                                </div>
                                <div className="d-flex flex-column">
                                    <h3 className="card-title fs-5">
                                        <span>Faansy</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="bi bi-patch-check mb-1" viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                            <path
                                                d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                                        </svg>
                                    </h3>
                                    <span className="text-body-secondary">@faansy</span>
                                </div>
                            </div>

                            <div>
                                <span className="text-body-secondary">9 hours ago</span>
                            </div>
                        </div>
                        
                        <p className="card-text">My First Cold Plunge | The Farago Files Come along with @francesca.farago to try a cold plunge for the first time then sauna as a reward! Let’s get hot and cold! 🧊🔥</p>
                        <span><a href="" className="text-decoration-none text-faansy-red">Read more</a></span>
                    </div>
                    <video controls width="250" className="card-img-bottom" alt="video title">
                        <source src="/media/cc0-videos/flower.webm" type="video/webm" />
                    
                        <source src={ Video } type="video/mp4" />
                    
                        Download the
                        <a href="/media/cc0-videos/flower.webm">WEBM</a>
                        or
                        <a href={ Video }>MP4</a>
                        video.
                    </video>
                </div>
            </article>

            <article className="container px-5 my-5">
                <div className="card shadow border-0">
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-3">
                            <div className="d-flex justify-content-start align-items-center column-gap-2">
                                <div className="rounded-circle">
                                    <img src={ Logo } alt="" width="65" />
                                </div>
                                <div className="d-flex flex-column">
                                    <h3 className="card-title fs-5">
                                        <span>Faansy</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="bi bi-patch-check mb-1" viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                            <path
                                                d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                                        </svg>
                                    </h3>
                                    <span className="text-body-secondary">@faansy</span>
                                </div>
                            </div>

                            <div>
                                <span className="text-body-secondary">9 hours ago</span>
                            </div>
                        </div>
                        
                        <p className="card-text">My First Cold Plunge | The Farago Files Come along with @francesca.farago to try a cold plunge for the first time then sauna as a reward! Let’s get hot and cold! 🧊🔥</p>
                        <span><a href="" className="text-decoration-none text-faansy-red">Read more</a></span>
                    </div>
                    <video controls width="250" className="card-img-bottom" alt="video title">
                        <source src="/media/cc0-videos/flower.webm" type="video/webm" />
                    
                        <source src={ Video } type="video/mp4" />
                    
                        Download the
                        <a href="/media/cc0-videos/flower.webm">WEBM</a>
                        or
                        <a href={ Video }>MP4</a>
                        video.
                    </video>
                </div>
            </article>

            <article className="container px-5 my-5">
                <div className="card shadow border-0">
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-3">
                            <div className="d-flex justify-content-start align-items-center column-gap-2">
                                <div className="rounded-circle">
                                    <img src={ Logo } alt="" width="65" />
                                </div>
                                <div className="d-flex flex-column">
                                    <h3 className="card-title fs-5">
                                        <span>Faansy</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="bi bi-patch-check mb-1" viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                            <path
                                                d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                                        </svg>
                                    </h3>
                                    <span className="text-body-secondary">@faansy</span>
                                </div>
                            </div>

                            <div>
                                <span className="text-body-secondary">9 hours ago</span>
                            </div>
                        </div>
                        
                        <p className="card-text">My First Cold Plunge | The Farago Files Come along with @francesca.farago to try a cold plunge for the first time then sauna as a reward! Let’s get hot and cold! 🧊🔥</p>
                        <span><a href="" className="text-decoration-none text-faansy-red">Read more</a></span>
                    </div>
                    <video controls width="250" className="card-img-bottom" alt="video title">
                        <source src="/media/cc0-videos/flower.webm" type="video/webm" />
                    
                        <source src={ Video } type="video/mp4" />
                    
                        Download the
                        <a href="/media/cc0-videos/flower.webm">WEBM</a>
                        or
                        <a href={ Video }>MP4</a>
                        video.
                    </video>
                </div>
            </article>

            <div className="d-flex justify-content-center pb-5 text-bg-light">
                <button className="btn btn-outline-secondary py-1 px-3 rounded-pill text-faansy-red text-uppercase fw-semibold show-more">Show
                    More</button>
            </div>
        </section>
    )
}

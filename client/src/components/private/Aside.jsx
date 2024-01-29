export default function Aside() {
    return (
        <aside className="d-none d-md-block col-md-4 vh-100 position-sticky top-0 end-0 card rounded-0 d-flex flex-column row-gap-4 align-items-center py-4 px-3 overflow-y-auto">
            <section className="d-flex flex-column">
                <input className="form-control py-2 mb-4" type="text" placeholder="Search posts" aria-label="Search posts" />

                <div className="d-flex align-items-center justify-content-between">
                    <h3 className="text-uppercase text-secondary fs-6"><small>Suggestions</small></h3>
                    <div className="mb-2 d-flex justify-content-between column-gap-3">
                        <span>
                            <a href="" className="text-decoration-none text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise"
                                    viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                                </svg>
                            </a>
                        </span>
                        <span>
                            <a href="" className="text-decoration-none text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-short"
                                    viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                        d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
                                </svg>
                            </a>
                        </span>
                        <span>
                            <a href="" className="text-decoration-none text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short"
                                    viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                                </svg>
                            </a>
                        </span>
                    </div>
                </div>
            </section>

            <section className="d-flex flex-column row-gap-2">
                <article className="card text-bg-dark border-0 rounded">
                    <img src="../images/background.jpeg" className="card-img object-fit-cover" style={{ maxHeight: '125px' }} alt="..." />
                    <div className="card-img-overlay">
                        <div className="d-flex justify-content-between align-items-start px-2 pt-2 h-50">
                            <span className="bg-secondary opacity-50 px-1 rounded z-2"><small>Free</small></span>
                            <span className="mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                </svg>
                            </span>
                        </div>
                        
                        <div className="d-flex column-gap-3 px-2 pb-3 h-50" style={{ background: '#256d7c26' }}>
                            <div className="d-flex align-items-end">
                                <img src="../images/photo.jpeg" alt="" width="70" height="70" className="z-1 object-fit-cover border border-light border-3 rounded-circle" />
                                <span className="z-3 bg-success p-1 border border-light border-1 rounded-circle" style={{ width: '10px', height: '10px', marginLeft: '-17px', marginBottom: '5px' }}></span>
                            </div>
                            <div className="text-light d-flex flex-column justify-content-center">
                                <h4 className="fs-6">Raylan</h4>
                                <span style={{ marginTop: '-14px' }}><small>@goalgoddess</small></span>
                            </div>
                        </div>
                    </div>
                </article>
                <article className="card text-bg-dark border-0 rounded">
                    <img src="../images/background.jpeg" className="card-img object-fit-cover" style={{ maxHeight: '125px' }} alt="..." />
                    <div className="card-img-overlay">
                        <div className="d-flex justify-content-between align-items-start px-2 pt-2 h-50">
                            <span className="bg-secondary opacity-50 px-1 rounded z-2"><small>Free</small></span>
                            <span className="mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                </svg>
                            </span>
                        </div>
                        
                        <div className="d-flex column-gap-3 px-2 pb-3 h-50" style={{ background: '#256d7c26' }}>
                            <div className="d-flex align-items-end">
                                <img src="../images/photo.jpeg" alt="" width="70" height="70" className="z-1 object-fit-cover border border-light border-3 rounded-circle" />
                                <span className="z-3 bg-success p-1 border border-light border-1 rounded-circle" style={{ width: '10px', height: '10px', marginLeft: '-17px', marginBottom: '5px' }}></span>
                            </div>
                            <div className="text-light d-flex flex-column justify-content-center">
                                <h4 className="fs-6">Raylan</h4>
                                <span style={{ marginTop: '-14px' }}><small>@goalgoddess</small></span>
                            </div>
                        </div>
                    </div>
                </article>
                <article className="card text-bg-dark border-0 rounded">
                    <img src="../images/background.jpeg" className="card-img object-fit-cover" style={{ maxHeight: '125px' }} alt="..." />
                    <div className="card-img-overlay">
                        <div className="d-flex justify-content-between align-items-start px-2 pt-2 h-50">
                            <span className="bg-secondary opacity-50 px-1 rounded z-2"><small>Free</small></span>
                            <span className="mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                </svg>
                            </span>
                        </div>
                        
                        <div className="d-flex column-gap-3 px-2 pb-3 h-50" style={{ background: '#256d7c26' }}>
                            <div className="d-flex align-items-end">
                                <img src="../images/photo.jpeg" alt="" width="70" height="70" className="z-1 object-fit-cover border border-light border-3 rounded-circle" />
                                <span className="z-3 bg-success p-1 border border-light border-1 rounded-circle" style={{ width: '10px', height: '10px', marginLeft: '-17px', marginBottom: '5px' }}></span>
                            </div>
                            <div className="text-light d-flex flex-column justify-content-center">
                                <h4 className="fs-6">Raylan</h4>
                                <span style={{ marginTop: '-14px' }}><small>@goalgoddess</small></span>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
            
            <hr className="my-4" />

            <footer className="d-flex justify-content-center column-gap-3 row-gap-5">
                <span><a href="" className="text-decoration-none text-secondary"><small>Privacy</small></a></span>
                <span><a href="" className="text-decoration-none text-secondary"><small>-</small></a></span>
                <span><a href="" className="text-decoration-none text-secondary"><small>Cookie Notice</small></a></span>
                <span><a href="" className="text-decoration-none text-secondary"><small>-</small></a></span>
                <span><a href="" className="text-decoration-none text-secondary"><small>Terms of Service</small></a></span>
            </footer>
        </aside>
    )
}

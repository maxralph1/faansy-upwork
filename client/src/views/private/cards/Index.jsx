import { useContext } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
dayjs.extend(relativeTime);
import { Link, useParams } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import { useCreator } from '@/hooks/useCreator';
import { useSubscription } from '@/hooks/useSubscription';
import Layout from '@/components/private/Layout.jsx';
import MissingUserBackgroundImage from '@/assets/images/logo_non_transparent.png';
import MissingUserImage from '@/assets/images/faansy_icon_non_transparent.png';

export default function Index() {
  const { user } = useContext(AuthContext);

  const addMessage = e => {
      e.preventDefault();
      // send state to server with e.g. `window.fetch`
      console.log('submitted')
  }

  return (
    <Layout>
      <section className="col-sm-10 col-md-5 card rounded-0">
        <div className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
            <h2 className="text-uppercase fs-5 fw-bold">Cards</h2>
            <span className="mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                    viewBox="0 0 16 16">
                    <path
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>
            </span>
        </div>

        <div>
            <section className="mb-1 border px-3 py-2 column-gap-1 default-card">
                <div className="card">
                  <div className="credit-card">
                    <div className="card__reader">
                      <div className="card__reader--risk card__reader--risk-one"></div>
                      <div className="card__reader--risk card__reader--risk-two"></div>
                      <div className="card__reader--risk card__reader--risk-three"></div>
                      <div className="card__reader--risk card__reader--risk-four"></div>
                    </div>
                    <p className="card__number">5032 9334 3764 9846</p>
                    <div className="card__dates">
                      <span className="card__dates--first">09/16</span>
                      <span className="card__dates--second">09/19</span>
                    </div>
                    <p className="card__name">GABRIEL FERREIRA</p>
                    <div className="card__flag">
                      <div className="card__flag--globe"></div>
                      <div className="card__flag--red"></div>
                      <div className="card__flag--yellow"></div>
                    </div>
                  </div>
                  <div className="assign">
                    <p>Designed by <a href="https://github.com/maxralph1" target="_blank">Maximillian Raphaels</a></p>
                  </div>
                </div>
            </section>
            
            <section className="border-top">
                <h3 className='fw-bold pt-4 pb-2 ps-3 fs-4'>Cards List</h3>
                <article className='card rounded-0 chat-item'>
                    <div 
                      type="button" 
                      data-bs-toggle="modal" 
                      data-bs-target="#exampleModal" 
                      data-bs-whatever="@mdo"
                      className="card-body d-flex flex-column">
                        <h4 className='card-text fs-6 fw-semibold'>Default</h4>
                        <div className='column-gap-2'>
                            <p className='card-text fs-6'>Card number: <span className='fw-semibold'>1234 5678 9101 123</span></p>
                        </div>
                    </div>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content position-relative">
                          <div className="modal-header">
                            <h5 className="modal-title fs-5" id="exampleModalLabel">Card Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            <div className="messages overflow-y-auto d-flex flex-column row-gap-2" style={{ maxHeight: '50vh' }}>
                              <div className='w-100 rounded' style={{ backgroundColor: '#82030324' }}>
                                <div className="d-flex align-items-center p-2">
                                  <span className='card-text fs-6 fw-semibold'><small className=''>You paid $2.00 to view content on @shakira's page. You can <a href="#" className='text-decoration-none text-faansy-red'>View content again</a>.</small></span>
                                </div>
                              </div>
                              
                            </div>

                            <hr />

                          </div>
                          {/* <div className="modal-footer">
                          </div> */}
                        </div>
                      </div>
                    </div>
                </article>

                {/* <div className='card rounded-0 chat-item'>
                    <div className="card-body d-flex flex-column">
                        <h2 className='card-text fs-6 fw-semibold'>James John</h2>
                        <div className='d-flex flex-row column-gap-2'>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                              </svg>
                            </span>
                            <p className='card-text fs-6'>This is the last message from me james. Do well to pay me my money.</p>
                        </div>
                        
                    </div>
                </div>

                <div className='card rounded-0 chat-item'>
                    <div className="card-body d-flex flex-column">
                        <h2 className='card-text fs-6 fw-semibold'>James John</h2>
                        <div className='d-flex flex-row column-gap-2'>
                            <p className='card-text fs-6'>This is the last message from me james. Do well to pay me my money.</p>
                        </div>
                        
                    </div>
                </div> */}
            </section>
        </div>

    </section>
    </Layout>
  )
}

import { useContext } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
dayjs.extend(relativeTime);
import { Link, useParams } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import { useCreators } from '@/hooks/useCreators.jsx';
import { useCreator } from '@/hooks/useCreator';
import { useSubscription } from '@/hooks/useSubscription';
import Layout from '@/components/private/Layout.jsx';
import MissingUserBackgroundImage from '@/assets/images/logo_non_transparent.png';
import MissingUserImage from '@/assets/images/faansy_icon_non_transparent.png';

export default function Index() {
  const { user } = useContext(AuthContext);
  const { creators, getCreators } = useCreators();

  const addMessage = e => {
      e.preventDefault();
      // send state to server with e.g. `window.fetch`
      console.log('submitted')
  }

  return (
    <Layout>
      <section className="col-sm-10 col-md-5 card rounded-0">
        <div className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
            <h2 className="text-uppercase fs-5 fw-bold">Subscriptions</h2>
            <span className="mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                    viewBox="0 0 16 16">
                    <path
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>
            </span>
        </div>

        <div>
            <section className="border-top">
                <div className='card rounded-0 chat-item'>
                    {(creators.length > 0) ? creators.map(creator => {
                    return (
                        <article key={ creator.id } className="card text-bg-dark border-0 rounded-0 my-3">
                            <Link to={ route('home.users.show', { username: creator.username }) }>
                              <div>
                                <img src={ creator.user_background_image_url ? `${ Constants.serverURL }/storage/${creator.user_background_image_url}` : MissingUserBackgroundImage } className="card-img object-fit-cover rounded-0" style={{ maxHeight: '125px' }} alt="..." />
                                <div className="card-img-overlay">
                                    <div className="d-flex justify-content-between align-items-start px-2 pt-2 h-50">
                                        <span className="bg-secondary text-light opacity-75 px-1 rounded z-2" style={{ boxShadow: '3px 3px 5px #000000', textShadow: '7px 7px 10px #000000' }}><small>{ creator.free_subscription == true ? 'Free' : 'Paid' }</small></span>
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
                                            <img src={ creator.user_image_url ? `${ Constants.serverURL }/storage/${creator.user_image_url}` : MissingUserImage } alt="" width="70" height="70" className="z-1 object-fit-cover border border-light border-3 rounded-circle" />
                                            { (dayjs().diff(dayjs(creator?.last_seen)) < 7200000) &&
                                            <span className="z-3 bg-success p-1 border border-light border-1 rounded-circle" style={{ width: '10px', height: '10px', marginLeft: '-17px', marginBottom: '5px' }}></span> }
                                        </div>
                                        <div className="text-light d-flex flex-column justify-content-center">
                                            <div className='d-flex align-items-center column-gap-1'>
                                                <h4 className="fs-6 fw-bold" style={{ textShadow: '7px 7px 10px #000000' }}>{ `${ creator.first_name } ${ creator.last_name }`}</h4>
                                                { creator.verified == true
                                                    && 
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                        className="bi bi-patch-check fw-bold mb-2 rounded-circle" style={{ boxShadow: '3px 3px 10px #000000' }} viewBox="0 0 16 16">
                                                        <path fillRule="evenodd"
                                                            d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                                        <path
                                                            d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                                                    </svg>
                                                }
                                            </div>
                                            
                                            <span style={{ marginTop: '-14px', textShadow: '7px 7px 10px #000000' }}><small>@{ creator.username }</small></span>
                                        </div>
                                    </div>
                                </div>
                              </div>
                            </Link>
                        </article>
                            )
                            
                        }) : (
                            <div>
                                <span className='text-center'>No subscriptions yet</span>
                            </div>
                        )}
                        

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content position-relative">
                          <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">New Message</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            <div className="messages overflow-y-auto d-flex flex-column row-gap-2" style={{ maxHeight: '50vh' }}>
                              <div className='w-100 rounded' style={{ backgroundColor: '#82030324' }}>
                                <div className="d-flex align-items-center p-2">
                                  <span className='card-text fs-6 fw-semibold'><span>James says:&nbsp;</span><small className='fst-italic'>This is the last message from me james. Do well to pay me my money.</small></span>
                                </div>
                              </div>
                              
                            </div>

                            <hr />
                            
                            <div className='d-flex justify-content-end'>
                              <a 
                                href={ route('home.chats.index') } className="btn btn-sm btn-faansy-red text-light align-self-end text-decoration-none">Go to messages to respond to them</a>
                            </div>
                          </div>
                          {/* <div className="modal-footer">
                          </div> */}
                        </div>
                      </div>
                    </div>
                </div>

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

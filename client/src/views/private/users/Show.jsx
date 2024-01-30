import { useContext } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
dayjs.extend(relativeTime);
// dayjs.extend(utc);
// dayjs.extend(timezone);
import { Link, useParams } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import { useCreator } from '@/hooks/useCreator';
import { useSubscription } from '@/hooks/useSubscription';
import Layout from '@/components/private/Layout.jsx';
import MissingUserBackgroundImage from '@/assets/images/logo_non_transparent.png';
import MissingUserImage from '@/assets/images/faansy_icon_non_transparent.png';


export default function Show() {
    const { user } = useContext(AuthContext);
    const params = useParams();
    const { creator, getCreator } = useCreator(params.username);
    console.log(creator);
    const { subscription, createSubscription, destroySubscription } = useSubscription();

    async function subscribeToCreator(event) {
        event.preventDefault();

        const subscriber_id = event.target.subscriber_id.value;
        const subscribed_id = event.target.subscribed_id.value;
        const amount_paid = event.target.amount_paid.value;

        if (subscriber_id == subscribed_id) return 'You cannot subscribe to yourself';

        await createSubscription(subscriber_id, subscribed_id, amount_paid);
        await getCreator(params.username);
    }

    return (
        <Layout>
            <section className="col-sm-10 col-md-5 card rounded-0">
                <div
                    className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
                    <div className="d-flex align-items-center column-gap-2">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-short"
                                viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
                            </svg>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row align-items-center column-gap-1">
                                <h1 className="fs-5">{ `${ creator?.data?.first_name } ${ creator?.data?.last_name }` }</h1>
                                { creator.data.verified == true &&
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check" style={{ marginBottom: '8.5px'}}
                                    viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                        d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                    <path
                                        d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                                </svg>
                                }
                            </div>
                            
                            <span style={{ marginTop: '-6.5px'}}>
                                { creator?.data?.last_seen == null ? 'N/A' 
                                    : (dayjs().diff(dayjs(creator?.data?.last_seen)) > 7200000) 
                                    ? `Last seen ${(dayjs(creator?.data?.last_seen).fromNow())}` 
                                    : (dayjs().diff(dayjs(creator?.data?.last_seen)) < 7200000) 
                                    && 'Online' }
                            </span>
                        </div>
                    </div>
                    
                    <div className="d-flex align-items-center column-gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star"
                            viewBox="0 0 16 16">
                            <path
                                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-up-right"
                            viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                            <path fillRule="evenodd"
                                d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                        </svg>
                        <span className="mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                className="bi bi-three-dots-vertical" style={{ marginTop: '10px' }} viewBox="0 0 16 16">
                                <path
                                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                        </span>
                    </div>
                </div>

                <section className="card text-bg-dark border-0 rounded-0">
                    <img src={ creator.user_background_image_url ? `${ Constants.serverURL }/storage/${creator.user_background_image_url}` : MissingUserBackgroundImage } className="card-img object-fit-cover" style={{ maxHeight: '150px' }} alt="..." />
                    <div className="card-img-overlay fw-semibold">
                        <div className="d-flex justify-content-between align-items-center px-3">
                            <div className="icons d-flex align-items-center column-gap-2">
                                <div className="d-flex align-items-center column-gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                        <path
                                            d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                                    </svg>
                                    <small style={{ textShadow: '7px 7px 10px #000000' }}>524</small>
                                </div>
                                <span>-</span>
                                <div className="d-flex align-items-center column-gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                            d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" />
                                    </svg>
                                    <small style={{ textShadow: '7px 7px 10px #000000' }}>524</small>
                                </div>
                                <span>-</span>
                                <div className="d-flex align-items-center column-gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic" viewBox="0 0 16 16">
                                        <path
                                            d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
                                        <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
                                    </svg>
                                    <small style={{ textShadow: '7px 7px 10px #000000' }}>524</small>
                                </div>
                                <span>-</span>
                                <div className="d-flex align-items-center column-gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart"  viewBox="0 0 16 16">
                                        <path
                                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                    </svg>
                                    <small style={{ textShadow: '7px 7px 10px #000000' }}>524</small>
                                </div>
                            </div>

                            <div className="options">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"  viewBox="0 0 16 16">
                                    <path
                                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card rounded-0">
                        <div className="d-flex align-items-end ms-2" style={{ marginTop: '-2.5rem' }}>
                            <img src={ creator.user_image_url ? `${ Constants.serverURL }/storage/${creator.user_image_url}` : MissingUserImage } alt="" width="90" height="90" className="z-1 object-fit-cover border border-light border-3 rounded-circle" />
                            { (dayjs().diff(dayjs(creator?.data?.last_seen)) < 7200000) &&
                            <span className="z-2 bg-success p-1 border border-light border-1 rounded-circle"
                                style={{ width: '10px', height: '10px', marginLeft: '-25px', marginBottom: '5px' }}></span> }
                        </div>
                        <div className="card-body" style={{ marginTop: '-0.5rem' }}>
                            <div className="d-flex align-items-center column-gap-2">
                                <div className="d-flex flex-column">
                                    <div className="d-flex align-items-center">
                                        <span className="fs-5 fw-semibold">{ `${ creator?.data?.first_name } ${ creator?.data?.last_name }` } </span>
                                        { creator?.data?.verified == true &&
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check"
                                            style={{ marginTop: '4px', marginLeft: '2px' }} viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                            <path
                                                d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                                        </svg>
                                        }
                                    </div>
                                    <small className="text-secondary">@{ creator?.data?.username } -&nbsp;
                                        { creator?.data?.last_seen == null ? 'N/A' 
                                            : (dayjs().diff(dayjs(creator?.data?.last_seen)) > 7200000) 
                                            ? `Last seen ${(dayjs(creator?.data?.last_seen).fromNow())}` 
                                            : (dayjs().diff(dayjs(creator?.data?.last_seen)) < 7200000) 
                                            && 'Online' }
                                    </small>
                                </div>
                            </div>
                            <div>
                                <p className="card-text mt-1">{ creator?.data?.profile?.bio ? creator?.data?.profile?.bio : 'User has yet to write a bio. 😉'}</p>
                            </div>
                            {/* <small><a href="" className="text-decoration-none text-info">More info</a></small> */}
                        </div>
                    </div>
                </section>

                <section className="d-flex flex-column align-items-center justify-content-between row-gap-2 border rounded-0 py-3">
                    <h3 className="align-self-start ps-3 text-uppercase text-secondary fs-6"><small>Subscription</small></h3>
                    <span className="w-100 px-3">
                        <form onSubmit={ subscribeToCreator }>
                            <div className="d-none">
                                <input 
                                    type="text" 
                                    name="subscribed_id" 
                                    id="subscribed_id" 
                                    defaultValue={ creator?.data?.id } 
                                    hidden="hidden" />
                                <input 
                                    type="text" 
                                    name="subscriber_id" 
                                    id="subscriber_id" 
                                    defaultValue={ user?.id } 
                                    hidden="hidden" />
                                <input 
                                    type="text" 
                                    name="amount_paid" 
                                    id="amount_paid" 
                                    defaultValue={ creator?.data?.subscription_amount } 
                                    hidden="hidden" />
                            </div>
                            <button type="submit"
                            className="btn btn-faansy-red rounded-pill d-flex justify-content-between px-3 text-light fw-semibold py-2 w-100">
                                <small className="text-uppercase">Subscribe</small>
                                <small className="text-uppercase">For Free</small>
                            </button>
                        </form>
                        
                    </span>
                </section>

                <section className="mt-1 border-top rounded-0">
                    <ul className="nav nav-underline d-flex justify-content-around w-100">
                        <li className="nav-item">
                            <small><a className="nav-link text-uppercase active" aria-current="page" href="#">499 Posts</a></small>
                        </li>
                        <li className="nav-item">
                            <small><a className="nav-link text-uppercase disabled" aria-disabled="true">551 Media</a></small>
                        </li>
                    </ul>
                </section>

            </section>
        </Layout>
    )
}

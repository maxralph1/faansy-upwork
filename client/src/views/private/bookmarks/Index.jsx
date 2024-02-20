import { useContext, useState } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
dayjs.extend(relativeTime);
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import { usePosts } from '@/hooks/usePosts.jsx';
import { usePostcomment } from '@/hooks/usePostcomment.jsx';
import { usePostlike } from '@/hooks/usePostlike.jsx';
import { useBookmarks } from '@/hooks/useBookmarks.jsx';
import { useBookmark } from '@/hooks/useBookmark.jsx';
import { useTip } from '@/hooks/useTip.jsx';
import Layout from '@/components/private/Layout.jsx';
import Loading from '@/components/Loading.jsx';
import Logo from '@/assets/images/logo.png';
import MissingImage from '@/assets/images/name_non-transparent.png';
// import MissingUserBackgroundImage from '@/assets/images/logo_non_transparent.png';
// import MissingUserImage from '@/assets/images/faansy_icon_non_transparent.png';

export default function Index() {
  const { user } = useContext(AuthContext);
  const { posts, getPosts } = usePosts();
  const { postcomment, createPostcomment, destroyPostcomment } = usePostcomment();
  const { postlike, createPostlike, destroyPostlike } = usePostlike();
  const { tip, createTip, destroyTip } = useTip();
  const { bookmarks, getBookmarks } = useBookmarks();
  const { bookmark, destroyBookmark } = useBookmark();

  /* Post comment state*/
  const [postCommentBody, setPostCommentBody] = useState();

//   console.log(user);
  console.log(bookmarks?.data);

  async function commentOnPost(event) {
      event.preventDefault();

      const post_id = event.target.post_id.value;
      const body = postCommentBody;

      await createPostcomment(post_id, body);
      console.log(post_id, body);
      setPostCommentBody('');
      await getBookmarks();
  }

  async function sendTip(event) {
      event.preventDefault();

      const recipient_id = event.target.recipient_id.value;
      const amount = event.target.amount.value;

      await createTip(recipient_id, amount);
      await getPosts();
  }
    
  return (
    <Layout>
        <section className="col-sm-10 col-md-5 card rounded-0 mid-body">
            <div className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
                <h2 className="text-uppercase fs-5 fw-bold">Bookmarks</h2>
                <span className="mb-2">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                        viewBox="0 0 16 16">
                        <path
                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    </svg> */}
                </span>
            </div>

            <div>
                <section className="border-top">
                    {(bookmarks?.data?.length > 0) ? bookmarks?.data?.map(bookmark => {
                        return (
                            <article key={ bookmark?.id } className="card border-0 border-top border-bottom pb-3">
                                { bookmark?.post?.repost == true 
                                    &&                                        
                                        <div className="d-flex justify-content-between card-body">
                                            <div className="d-flex justify-content-start align-items-center column-gap-2">
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#820303" className="bi bi-repeat" viewBox="0 0 16 16">
                                                        <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
                                                    </svg>&nbsp;<span className='fw-bold text-faansy-red'>repost</span>
                                                </span>
                                            </div>
                            
                                            <div className="d-flex column-gap-3">
                                                <small className="text-body-secondary">
                                                    <span>reposted</span> { dayjs.utc(bookmark.post.created_at).fromNow() }
                                                </small>
                                                <span>
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#4c5661" className="bi bi-three-dots"
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                                    </svg> */}
                                                </span>
                                            </div>
                                        </div>
                                    }
                                <div className={ `card-body ${ bookmark.post.repost == true && 'px-5' }` }>
                                    <div className="d-flex justify-content-between mb-3">
                                        {/* <div className="d-flex justify-content-start align-items-center column-gap-2"> */}
                                            <Link 
                                                to={ route('home.users.show', {'username': bookmark.post.user.username})}
                                                className="d-flex justify-content-start align-items-center column-gap-2 text-decoration-none">
                                                <div className="rounded-circle">
                                                    <img src={ bookmark.post.user.user_image_url ? `${ Constants.serverURL }/${ bookmark.post.user.user_image_url }` : Logo } alt="" width="65" />
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <h3 className="card-title fs-5 text-dark">
                                                        <span>{ `${ bookmark.post.user.first_name } ${ bookmark.post.user.last_name }` }</span>
                                                        { bookmark.post.user.verified == true
                                                            && 
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                            className="bi bi-patch-check mb-1" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd"
                                                                d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                                            <path
                                                                d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                                                        </svg>
                                                        }
                                                    </h3>
                                                    <span className="text-body-secondary">@{ bookmark.post.user.username }</span>
                                                </div>
                                            </Link>
                                        {/* </div> */}
                        
                                        <div className="d-flex column-gap-3">
                                            <span className="text-body-secondary">
                                                { bookmark?.post?.repost_original_post_timestamp != null 
                                                    ? dayjs.utc(bookmark.post.repost_original_post_timestamp).fromNow() 
                                                    : dayjs.utc(bookmark.post.created_at).fromNow()}
                                            </span>

                                            { bookmark?.post?.user?.id == user?.id && 
                                                <span className='mb-1 dropstart z-3'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#4c5661" className="bi bi-three-dots"
                                                        viewBox="0 0 16 16" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <path
                                                            d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                                    </svg>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <Link 
                                                                to={ route('home.posts.edit', { id: bookmark?.post?.id})}
                                                                className="dropdown-item fw-bold" 
                                                                href="#edit-post"><small>Edit Post</small>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <button 
                                                                onClick={ async () => {
                                                                    await destroyPost(bookmark?.post);
                                                                    await getPosts(bookmarks?.meta?.current_page);
                                                                } }
                                                                type='button' 
                                                                className="dropdown-item fw-bold text-secondary" href="#delete-post"><small>Delete Post</small>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </span>
                                            }

                                        </div>
                                    </div>
                        
                                    <p className="card-text">{ bookmark.post.body }</p>
                                </div>

                                { (bookmark.post.pay_per_view == false) 
                                    ?
                                        <>
                                        {/* <video controls width="250" className="card-img-bottom rounded-0" alt="video title">
                                            <source src="/media/cc0-videos/flower.webm" type="video/webm" />
                                            <source src="../videos/spicy_tofu(720p).mp4" type="video/mp4" />
                                            Download the
                                            <a href="/media/cc0-videos/flower.webm">WEBM</a>
                                            or
                                            <a href="../videos/spicy_tofu(720p).mp4">MP4</a>
                                            video.
                                        </video> */}
                                        <img src={ bookmark.post.image_url ? `${ Constants.serverURL }/storage/${bookmark.post.image_url}` : MissingImage } className="card-img-bottom rounded-0" alt="..." />
                                        </>
                                    : 
                                        <span className="card-img-bottom rounded d-flex justify-content-center align-items-center">
                                            <button className='btn btn-faansy-red text-light'>View Content (Pay-Per-View (${ bookmark.post.pay_per_view_amount }))</button>
                                        </span>
                                }

                                <section className="px-2 pt-3 d-flex justify-content-between align-items-center">

                                    <div className="mb-2 d-flex justify-content-start align-items-center column-gap-3">

                                        <span className='like-section'>
                                            {(bookmark?.post?.likes?.length > 0) && bookmark?.post?.likes?.find(foundLike => foundLike?.user?.id == user?.id)
                                                ? 
                                                <button 
                                                    onClick={ async () => {
                                                        await destroyPostlike((bookmark?.post?.likes?.length > 0) && bookmark?.post?.likes?.find(foundLike => foundLike?.user?.id == user?.id));
                                                        await getBookmarks();
                                                    } }
                                                    className="text-decoration-none text-secondary d-flex align-items-center border-0 bg-transparent">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#820303" className="bi bi-heart-fill mt-1" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                                        </svg>
                                                </button>
                                                :
                                                <button 
                                                    onClick={ async () => {
                                                        await createPostlike(bookmark?.post?.id);
                                                        await getBookmarks();
                                                    } }
                                                    className="text-decoration-none text-secondary d-flex align-items-center border-0 bg-transparent">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart mt-1" viewBox="0 0 16 16">
                                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                                        </svg>
                                                </button>
                                            }

                                            <div 
                                                className="modal fade" 
                                                id={`likeModal${ bookmark?.post?.id }`} 
                                                tabIndex="-1" aria-labelledby="likeModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h4 className="modal-title fs-5 fw-semibold">Like post</h4>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="d-flex justify-content-end">
                                                                {(bookmark?.post?.likes?.length > 0) && bookmark.post.likes?.find(foundLike => foundLike?.user?.id == user?.id)
                                                                    ? 
                                                                    <button 
                                                                        onClick={ async () => {
                                                                            await destroyPostlike((bookmark?.post?.likes?.length > 0) && bookmark.post.likes?.find(foundLike => foundLike?.user?.id == user?.id));
                                                                            await getBookmarks();
                                                                        } }
                                                                        className="text-decoration-none text-secondary d-flex align-items-center border-0 bg-transparent gap-2">
                                                                            <span className='text-faansy-red'>Unlike post</span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#820303" className="bi bi-heart-fill mt-1" viewBox="0 0 16 16">
                                                                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                                                            </svg>
                                                                    </button>
                                                                    :
                                                                    <button 
                                                                        onClick={ async () => {
                                                                            await createPostlike(bookmark?.post?.id);
                                                                            await getBookmarks();
                                                                        } }
                                                                        className="text-decoration-none text-secondary d-flex align-items-center border-0 bg-transparent gap-2">
                                                                            <span className='text-faansy-red'>Like post</span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart mt-1" viewBox="0 0 16 16">
                                                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                                                            </svg>
                                                                    </button>
                                                                }
                                                            </div>
                                                        </div>

                                                        <hr />

                                                        <div>
                                                            <div className="modal-header">
                                                                <h4 className="modal-title fs-6 fw-semibold">Post likes</h4>
                                                                <small><span className="fw-semibold">{ bookmark?.post?.likes?.length }</span>{ (bookmark?.post?.likes?.length > 1) ? ' likes' : ' like' }</small>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div>
                                                                    {(bookmark?.post?.likes?.length > 0) ? bookmark?.post?.likes?.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at)).map(sortedLike => {
                                                                        if (sortedLike?.post?.id == bookmark?.post?.id){
                                                                        return (
                                                                            <div 
                                                                                key={ sortedLike.id } 
                                                                                className='border-bottom d-flex flex-column'>
                                                                                <span>{ sortedLike?.body }</span>
                                                                                <span className='align-self-end'>by&nbsp;
                                                                                    <a 
                                                                                        href={ route('home.users.show', { username: sortedLike?.user?.username })} 
                                                                                        className='text-decoration-none text-faansy-red'>
                                                                                        { `${ sortedLike?.user?.first_name } ${ sortedLike?.user?.last_name }` }
                                                                                    </a>,&nbsp;
                                                                                    { dayjs.utc(sortedLike.created_at).fromNow() }</span>
                                                                            </div>
                                                                        )}}) : (
                                                                            <div>
                                                                                <span>No likes</span>
                                                                            </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>

                                        <span className='comment-section'>
                                            <button 
                                                href="" 
                                                type='button' 
                                                data-bs-toggle="modal" 
                                                data-bs-target={`#commentModal${ bookmark?.post?.id }`} 
                                                data-bs-body='' 
                                                className="text-decoration-none text-secondary d-flex align-items-center border-0 bg-transparent">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                                                </svg>
                                            </button>

                                            <div 
                                                className="modal fade" 
                                                id={`commentModal${ bookmark?.post?.id }`} 
                                                tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h4 className="modal-title fs-5 fw-semibold">Comment on post</h4>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <form onSubmit={ commentOnPost }>
                                                                <div className="d-none">
                                                                    <input 
                                                                        type="text" 
                                                                        name="post_id" 
                                                                        id="post_id" 
                                                                        defaultValue={ bookmark?.post?.id } 
                                                                        hidden="hidden" />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <textarea 
                                                                        name="body" 
                                                                        id="body" 
                                                                        value={postCommentBody}
                                                                        onChange={e => setPostCommentBody(e.target.value)}
                                                                        placeholder={` Nice post @${bookmark.post.user.username} ...`} 
                                                                        aria-label="Comment body"
                                                                        className="form-control"></textarea>
                                                                </div>
                                                                <div className="d-flex justify-content-end">
                                                                    <button type="submit" className="btn btn-sm btn-faansy-red text-light">Comment</button>
                                                                </div>
                                                            </form>
                                                        </div>

                                                        <hr />

                                                        <div>
                                                            <div className="modal-header">
                                                                <h4 className="modal-title fs-6 fw-semibold">Comments on post</h4>
                                                                <small><span className="fw-semibold">{ bookmark?.post?.comments?.length }</span>{ (bookmark?.post?.comments?.length > 1) ? ' comments' : ' comment' }</small>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div>
                                                                    {(bookmark?.post?.comments?.length > 0) ? bookmark?.post.comments?.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at)).map(sortedComment => {
                                                                        if (sortedComment?.post?.id == bookmark?.post?.id){
                                                                        return (
                                                                            <div 
                                                                                key={ sortedComment.id } 
                                                                                className='border-bottom d-flex flex-column'>
                                                                                <span>{ sortedComment?.body }</span>
                                                                                <span className='align-self-end'>by&nbsp;
                                                                                    <a 
                                                                                        href={ route('home.users.show', { username: sortedComment?.user?.username })} 
                                                                                        className='text-decoration-none text-faansy-red'>
                                                                                        { `${ sortedComment?.user?.first_name } ${ sortedComment?.user?.last_name }` }
                                                                                    </a>,&nbsp;
                                                                                    { dayjs.utc(sortedComment.created_at).fromNow() }</span>
                                                                            </div>
                                                                        )}}) : (
                                                                            <div>
                                                                                <span>No comments</span>
                                                                            </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>

                                        { bookmark?.post?.user?.id !== user?.id &&
                                            <span className='tip-section'>
                                                <button 
                                                    href="" 
                                                    type='button' 
                                                    data-bs-toggle="modal" 
                                                    data-bs-target={`#tipModal${ bookmark?.post?.id }`}
                                                    data-bs-body={ `@${bookmark?.post?.user?.id}` }
                                                    className="text-decoration-none text-secondary d-flex align-items-center border-0 bg-transparent">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-currency-dollar" viewBox="0 0 16 16">
                                                        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z"/>
                                                    </svg>
                                                    <span className="text-uppercase">Send Tip</span>
                                                </button>

                                                <div className="modal fade" id={`tipModal${ bookmark?.post?.id }`} tabIndex="-1" aria-labelledby="tipModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h4 className="modal-title fs-5 fw-semibold" id="tipModalLabel">Specify Amount (in units only)</h4>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <form onSubmit={ sendTip }>
                                                                    <div className="d-none">
                                                                        <input 
                                                                            type="text" 
                                                                            name="recipient_id" 
                                                                            id="recipient_id" 
                                                                            defaultValue={ bookmark?.post?.user?.id } 
                                                                            hidden="hidden" />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <textarea 
                                                                            name="amount" 
                                                                            id="amount" 
                                                                            placeholder='e.g. 20.50' 
                                                                            aria-label="Tip amount"
                                                                            className="form-control"></textarea>
                                                                    </div>
                                                                    <div className="d-flex justify-content-end">
                                                                        <button type="submit" className="btn btn-sm btn-faansy-red text-light">Tip</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span>
                                        }
                                    </div>

                                    <div>
                                        <button 
                                            onClick={ async () => {
                                                await destroyBookmark(bookmark);
                                                await getBookmarks();
                                            } }
                                            className="text-decoration-none text-secondary d-flex align-items-center border-0 bg-transparent">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#820303" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
                                                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
                                                </svg>
                                        </button>
                                    </div>
                                </section>

                                <section className="px-3 d-flex gap-3">
                                    <span 
                                        type='button' 
                                        data-bs-toggle="modal" 
                                        data-bs-target={`#likeModal${ bookmark?.post?.id }`} 
                                        data-bs-body=''><span className="fw-semibold">{ bookmark?.post?.likes?.length }</span>{ (bookmark?.post?.likes?.length > 1) ? ' likes' : ' like' }</span>
                                    <span 
                                        type='button' 
                                        data-bs-toggle="modal" 
                                        data-bs-target={`#commentModal${ bookmark?.post?.id }`} 
                                        data-bs-body=''><span className="fw-semibold">{ bookmark?.post?.comments?.length }</span>{ (bookmark?.post?.comments?.length > 1) ? ' comments' : ' comment' }</span>
                                </section>
                            </article>
                        )
                    })  : (bookmarks?.data?.length < 1) ? (
                        <section className='vh-100 d-flex justify-content-center align-items-center'>
                            <span className='h-50 text-center fw-semibold px-5'>You currently have no bookmarks yet.</span>
                        </section>
                    ) : (
                        <section className='vh-100 pt-5 mt-2 px-5'>
                            <div className='h-50 px-5'>
                                <Loading />
                            </div>
                        </section>
                    )}
            </section>
            </div>

        </section>
    </Layout>
  )
}

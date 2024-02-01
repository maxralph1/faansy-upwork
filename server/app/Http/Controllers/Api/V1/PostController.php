<?php

namespace App\Http\Controllers\Api\V1;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::withTrashed()->latest()->paginate();

        return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $post = new Post();

        $validated = $request->validated();

        if ($request->file('image_url')) {
            // Upload an Image File to Cloudinary with One line of Code
            // $uploadedFileUrl = Cloudinary::upload($validated['image_url'])->getRealPath())->getSecurePath();
            // // $uploadedFileUrl = Cloudinary::upload($request->file('image_url')->getRealPath())->getSecurePath();
            // $post['image_url'] = $uploadedFileUrl;

            $path = $validated['image_url']->store('images/posts');
            $post['image_url'] = $path;
        }

        if ($request->file('video_url')) {
            $path = $validated['video_url']->store('videos/posts');
            $post['video_url'] = $path;
        }

        $post['user_id'] = $validated['user_id'];
        $post['body'] = $validated['body'];

        $post->save();

        return new PostResource($post);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $post->update($request->validated());

        return new PostResource($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
    }

    /**
     * Restore the specified deleted resource.
     */
    public function restore(Post $post)
    {
        $post->restore();
    }

    /**
     * Permanently remove the specified resource from storage.
     */
    public function forceDestroy(Post $post)
    {
        $post->forceDelete();
    }


    /**
     * Additional Methods
     */

    /**
     * Repost a post.
     */
    public function repost(StorePostRequest $request)
    {
        $validated = $request->validated();

        $validated['repost'] = true;

        $post = Post::create($validated);

        return new PostResource($post);
    }
}

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
    public function store(Request $request)
    // public function store(StorePostRequest $request)
    {
        // $request->file('image_url')->store('post_images');

        // $post = Post::create($request->validated());

        // return new PostResource($post);


        $request->validate([
            'user_id' => 'required|string',
            'body' => 'required|string',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,bmp,png|max:2048',
            'video_url' => 'nullable|mimetypes:video/avi,video/mp4,video/mpeg,video/quicktime'
        ]);

        $post = new Post();

        if ($request->file('image_url')) {
            // $file = $request->file('image_url');
            // $filename = date('YmdHi') . $file->getClientOriginalName();
            // $file->move(public_path('post-images'), $filename);
            // $post['image_url'] = $filename;

            // // Upload an Image File to Cloudinary with One line of Code
            // $uploadedFileUrl = Cloudinary::upload($request->file('image_url')->getRealPath())->getSecurePath();
            // $post['image_url'] = $uploadedFileUrl;

            $path = $request->file('image_url')->store('posts/images');
            $post['image_url'] = $path;
        }

        $post['user_id'] = $request->user_id;
        $post['body'] = $request->body;

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
}

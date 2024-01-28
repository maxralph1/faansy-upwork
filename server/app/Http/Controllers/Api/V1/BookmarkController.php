<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Bookmark;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookmarkResource;
use App\Http\Requests\StoreBookmarkRequest;
use App\Http\Requests\UpdateBookmarkRequest;

class BookmarkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookmarks = Bookmark::withTrashed()->latest()->paginate();

        return BookmarkResource::collection($bookmarks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookmarkRequest $request)
    {
        $bookmark = Bookmark::create($request->validated());

        return new BookmarkResource($bookmark);
    }

    /**
     * Display the specified resource.
     */
    public function show(Bookmark $bookmark)
    {
        return new BookmarkResource($bookmark);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookmarkRequest $request, Bookmark $bookmark)
    {
        $bookmark->update($request->validated());

        return new BookmarkResource($bookmark);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bookmark $bookmark)
    {
        $bookmark->delete();
    }

    /**
     * Restore the specified deleted resource.
     */
    public function restore(Bookmark $bookmark)
    {
        $bookmark->restore();
    }

    /**
     * Permanently remove the specified resource from storage.
     */
    public function forceDestroy(Bookmark $bookmark)
    {
        $bookmark->forceDelete();
    }
}

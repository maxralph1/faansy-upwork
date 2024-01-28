<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Userlike;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserlikeResource;
use App\Http\Requests\StoreUserlikeRequest;
use App\Http\Requests\UpdateUserlikeRequest;

class UserlikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userlikes = Userlike::withTrashed()->latest()->paginate();

        return UserlikeResource::collection($userlikes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserlikeRequest $request)
    {
        $userlike = Userlike::create($request->validated());

        return new UserlikeResource($userlike);
    }

    /**
     * Display the specified resource.
     */
    public function show(Userlike $userlike)
    {
        return new UserlikeResource($userlike);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserlikeRequest $request, Userlike $userlike)
    {
        $userlike->update($request->validated());

        return new UserlikeResource($userlike);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Userlike $userlike)
    {
        $userlike->delete();
    }

    /**
     * Restore the specified deleted resource.
     */
    public function restore(Userlike $userlike)
    {
        $userlike->restore();
    }

    /**
     * Permanently remove the specified resource from storage.
     */
    public function forceDestroy(Userlike $userlike)
    {
        $userlike->forceDelete();
    }
}

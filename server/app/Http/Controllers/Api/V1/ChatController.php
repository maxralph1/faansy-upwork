<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Chat;
use App\Http\Controllers\Controller;
use App\Http\Resources\ChatResource;
use App\Http\Requests\StoreChatRequest;
use App\Http\Requests\UpdateChatRequest;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $chats = Chat::where('participator_1_id', auth()->id)
            ->orWhere('participator_2_id', auth()->id)
            ->latest()
            ->paginate();

        return ChatResource::collection($chats);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChatRequest $request)
    {
        $chat = Chat::create($request->validated());

        return new ChatResource($chat);
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat $chat)
    {
        return new ChatResource($chat);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChatRequest $request, Chat $chat)
    {
        // $chat->update($request->validated());

        // return new ChatResource($chat);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chat $chat)
    {
        $chat->delete();
    }

    /**
     * Restore the specified deleted resource.
     */
    public function restore(Chat $chat)
    {
        $chat->restore();
    }

    /**
     * Permanently remove the specified resource from storage.
     */
    public function forceDestroy(Chat $chat)
    {
        $chat->forceDelete();
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\PostcommentCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'body' => $this->body,
            'image_url' => $this->image_url,
            'video_url' => $this->video_url,
            'pinned' => $this->pinned,
            'pinned_at' => $this->pinned_at,
            'user' => [
                'id' => $this->user->id,
                'username' => $this->user->username,
                'first_name' => $this->user->first_name,
                'last_name' => $this->user->last_name,
            ],
            'comments' => $this->comments,
            // 'comments' => PostcommentCollection::collection($this->whenLoaded('comments')),
            'likes' => $this->likes,
            'bookmarks' => $this->bookmarks,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}

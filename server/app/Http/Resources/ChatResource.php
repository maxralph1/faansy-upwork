<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatResource extends JsonResource
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
            'initiator' => [
                'id' => $this->initiator->id,
                'username' => $this->initiator->username,
                'first_name' => $this->initiator->first_name,
                'last_name' => $this->initiator->last_name,
                'user_image_url' => $this->initiator->user_image_url,
                'verified' => $this->initiator->verified,
            ],
            'responder' => [
                'id' => $this->responder->id,
                'username' => $this->responder->username,
                'first_name' => $this->responder->first_name,
                'last_name' => $this->responder->last_name,
                'user_image_url' => $this->responder->user_image_url,
                'verified' => $this->responder->verified,
            ],
            'slug' => $this->slug,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}

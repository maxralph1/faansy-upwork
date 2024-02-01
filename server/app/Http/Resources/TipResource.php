<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TipResource extends JsonResource
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
            'amount' => $this->amount,
            'creator' => [
                'id' => $this->creator->id,
                'username' => $this->creator->username,
                'first_name' => $this->creator->first_name,
                'last_name' => $this->creator->last_name,
                'user_image_url' => $this->creator->user_image_url,
                'verified' => $this->creator->verified,
            ],
            'subscriber' => [
                'id' => $this->subscriber->id,
                'username' => $this->subscriber->username,
                'first_name' => $this->subscriber->first_name,
                'last_name' => $this->subscriber->last_name,
                'user_image_url' => $this->subscriber->user_image_url,
                'verified' => $this->subscriber->verified,
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}

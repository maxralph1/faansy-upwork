<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RestrictResource extends JsonResource
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
            'restrictor' => [
                'id' => $this->restrictor->id,
                'username' => $this->restrictor->username,
                'first_name' => $this->restrictor->first_name,
                'last_name' => $this->restrictor->last_name,
            ],
            'restrictee' => [
                'id' => $this->restrictee->id,
                'username' => $this->restrictee->username,
                'first_name' => $this->restrictee->first_name,
                'last_name' => $this->restrictee->last_name,
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}

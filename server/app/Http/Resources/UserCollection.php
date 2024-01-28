<?php

namespace App\Http\Resources;

use App\Http\Resources\ProfileCollection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            // parent::toArray($request),
            'id' => $this->id,
            'email' => $this->email,
            // 'profile' => $this->profile->id
            // 'profile' => ProfileCollection::collection($this->profile),
            'profile' => ProfileResource::collection($this->whenLoaded('profile')),
            // 'profile' => ProfileResource::collection($this->profile),
        ];

        // $response = parent::toArray($request);

        // // $response['profile'] = ProfileResource::resource($this->profile);
        // $response['profile'] = ProfileResource::resource($this->profile);
        // // 'event_hall' => [
        // //         'id' => $this->event_hall->id,
        // //         'name' => $this->event_hall->name,
        // //         'description' => $this->event_hall->description,
        // //     ],

        // return $response;

        // return ['data' => $this->collection];
    }

    // public function with($request)
    // {
    //     return [
    //         'profile' => $this->profile()
    //     ];
    // }
}

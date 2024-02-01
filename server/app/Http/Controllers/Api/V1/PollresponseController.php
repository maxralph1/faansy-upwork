<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Pollresponse;
use App\Http\Requests\StorePollresponseRequest;
use App\Http\Requests\UpdatePollresponseRequest;

class PollresponseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePollresponseRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Pollresponse $pollresponse)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pollresponse $pollresponse)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePollresponseRequest $request, Pollresponse $pollresponse)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pollresponse $pollresponse)
    {
        //
    }
}

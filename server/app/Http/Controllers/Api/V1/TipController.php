<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Tip;
use App\Models\Transaction;
use App\Models\Notification;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\TipResource;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTipRequest;
use App\Http\Requests\UpdateTipRequest;

class TipController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tips = Tip::where('recipient_id', auth()->id)
            ->orWhere('donor_id', auth()->id)
            ->latest()
            ->paginate();

        return TipResource::collection($tips);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTipRequest $request)
    {
        $tip = Tip::create($request->validated());

        return new TipResource($tip);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tip $tip)
    {
        return new TipResource($tip);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTipRequest $request, Tip $tip)
    {
        $tip->update($request->validated());

        return new TipResource($tip);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tip $tip)
    {
        $tip->delete();
    }

    /**
     * Restore the specified deleted resource.
     */
    public function restore(Tip $tip)
    {
        $tip->restore();
    }

    /**
     * Permanently remove the specified resource from storage.
     */
    public function forceDestroy(Tip $tip)
    {
        $tip->forceDelete();
    }
}

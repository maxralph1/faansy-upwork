<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\BlockController;
use App\Http\Controllers\Api\V1\BookmarkController;
use App\Http\Controllers\Api\V1\PostlikeController;
use App\Http\Controllers\Api\V1\PostcommentController;
use App\Http\Controllers\Api\V1\SubscriptionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
// return $request->user();
// });

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::controller(TodoController::class)->group(function () {
    Route::get('todos', 'index');
    Route::post('todo', 'store');
    Route::get('todo/{id}', 'show');
    Route::put('todo/{id}', 'update');
    Route::delete('todo/{id}', 'destroy');
});

Route::apiResource('users', UserController::class);
Route::controller(UserController::class)->group(function () {
    Route::get('creators', 'creators');
    Route::get('creators/{user:username}', 'creator');
    Route::put('creators/{user:username}/verify', 'verifyCreator');
});

Route::apiResource('posts', PostController::class);
Route::controller(PostController::class)->group(function () {
    Route::get('posts/{post}/repost', 'repost');
});

Route::apiResource('postcomments', PostcommentController::class);
Route::controller(PostcommentController::class)->group(function () {
    Route::get('posts/{postcomment:post_id}/comments', 'getSpecificPostComments');
});
Route::apiResource('postlikes', PostlikeController::class);
Route::apiResource('subscriptions', SubscriptionController::class);
Route::apiResource('bookmarks', BookmarkController::class);
Route::apiResource('blocks', BlockController::class);
Route::controller(BlockController::class)->group(function () {
    Route::patch('blocks/{block}/restore', 'restore');
    Route::delete('blocks/{block}/delete', 'forceDestroy');
});

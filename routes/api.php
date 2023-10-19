<?php declare(strict_types=1);

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\Api\LoginController;
use \App\Http\Controllers\Api\LogoutController;
use \App\Http\Controllers\Api\UserController;
use \App\Http\Controllers\Api\TodoListController;
use \App\Http\Controllers\Api\TodoListItemController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [LoginController::class, 'index']);
Route::post('register', [UserController::class, 'create']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('logout', [LogoutController::class, 'index']);

    Route::post('list', [TodoListController::class, 'createList']);
    Route::get('list', [TodoListController::class, 'getLists']);
    Route::get('list/{id}', [TodoListController::class, 'getListById']);
    Route::delete('list/{id}', [TodoListController::class, 'deleteList']);

    Route::post('list/{listId}/item', [TodoListItemController::class, 'createListItem']);
    Route::post('list-item/{listItemId}/set-status', [TodoListItemController::class, 'setListItemStatus']);
    Route::delete('list-item/{listItemId}/delete', [TodoListItemController::class, 'deleteListItem']);
});

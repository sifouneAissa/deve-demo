<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// you must login using admin cred (you will get the token )
Route::post('login',[\App\Http\Controllers\Api\UserController::class,'login'])->name('admin.login');

//after that you can use those functions (send the token as Bearer in authorization headers)
Route::middleware('auth:sanctum')->group(function (){
    Route::get('/susers',[\App\Http\Controllers\Api\UserController::class,'searchUsers'])->name('api.susers');
    Route::get('/pusers',[\App\Http\Controllers\Api\UserController::class,'pairsUsers'])->name('api.susers');
    Route::get('/dusers',[\App\Http\Controllers\Api\UserController::class,'dUsers'])->name('api.dUsers');
});

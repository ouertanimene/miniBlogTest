<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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


Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('register', 'AuthController@register');
 Route::post('login', 'AuthController@login');
 Route::post('logout', 'AuthController@logout');

 });
 




Route::post('addPost', 'PostController@store');
Route::get('/getPosts', 'PostController@getAllPosts');
Route::get('/post/{id}', 'PostController@show');
Route::put('/post/{id}', 'PostController@update');
Route::delete('/post/{id}', 'PostController@deletePost');


Route::post('addComment', 'CommentController@store');
Route::get('/getComments/{id}', 'CommentController@getAllComments');
Route::delete('/comment/{id}', 'CommentController@deleteComment');
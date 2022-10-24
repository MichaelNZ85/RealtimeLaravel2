<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\PageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [PageController::class, 'index'])->name('root');
Route::get('/dashboard', [PageController::class, 'dashboard'])->name('dashboard');
Route::get('/users', [PageController::class, 'users'])->name('users.all');
Route::get('/game', [PageController::class, 'game'])->name('game');
Route::get('/chat', [ChatController::class, 'showChat'])->name('chat.show');
Route::post('/chat/message', [ChatController::class, 'messageReceived'])->name('chat.message');
Route::post('/chat/greet/{user}', [ChatController::class, 'greetReceived'])->name('chat.greet');

require __DIR__ . '/auth.php';

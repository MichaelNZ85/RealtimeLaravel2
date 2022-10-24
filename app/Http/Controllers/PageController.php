<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PageController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified'])->except('index');
    }

    public function index()
    {
        $user = Auth::user();
        if (!empty($user)) {
            return redirect()->to(route('dashboard'));
        }
        return Inertia::render('Welcome');
    }

    public function dashboard()
    {
        return Inertia::render('Dashboard');
    }

    public function users()
    {
        return Inertia::render('Users');
    }

    public function game()
    {
        return Inertia::render('Game');
    }
}

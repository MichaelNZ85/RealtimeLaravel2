<?php

namespace App\Http\Controllers;

use App\Events\GreetingSent;
use App\Events\MessageSent;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function showChat()
    {
        return Inertia::render('Chat/Show');
    }

    public function messageReceived(Request $request)
    {
        $rules = [
            'message' => 'required|string'
        ];
        $request->validate($rules);

        broadcast(new MessageSent($request->user(), $request->message));

        return response()->json(['status' => 'success', 'the_message' =>$request->message]);
    }

    public function greetReceived(Request $request, User $user)
    {
        broadcast(new GreetingSent($user, "{$request->user()->name} greeted you"));
        broadcast(new GreetingSent($request->user, "You greeted {$user->name}"));
        return "Gday {$user->name} from {$request->user()->name}";
    }
}

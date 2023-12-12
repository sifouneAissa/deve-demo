<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreateRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    //

    public function index(Request $request){
            $users = User::query()->where('is_admin',false)->select([
                'name',
                'email',
                'birth',
                'id',
            ])->paginate(15);
            return response()->json($users);
    }


    public function create(Request $request)
    {
        return Inertia::render('Users/Create');
    }


    public function destroy(User $user){
        return response()->json($user->delete());
    }


    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(UserCreateRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'birth' => $request->birth,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->to(route('user.create'))->with(['message' => "$user->name has been successfully created"]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize("view-users", Auth::user());

        return response([
            // "users" => User::with("courses")->latest()->paginate(10)
            "users" => User::paginate(10)
        ]);
    }

    /**
     * Login method to obtain token from user
     * 
     * @param Request $request
     * 
     * @return Response array
     */
    public function login(Request $request): Response
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // TODO: is this correct? Perhaps old token can be reused without needing to recreate
        return response([
            'success' => $user->createToken('API Token')->plainTextToken
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RegisterRequest $request)
    {
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'city' => $request->city,
            'street_address' => $request->street_address,
            'country' => $request->country,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response([
            'success' => $user->createToken('API Token')->plainTextToken
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response([
            // "user" => $user->with("courses")->paginate(10)
            "user" => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->city = $request->city;
        $user->street_address = $request->street_address;
        $user->country = $request->country;

        return response([
            "user" => $user
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response([
            "status" => "success"
        ]);
    }
}

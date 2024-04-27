<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use \Illuminate\Validation\Validator as IluminateValidator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     * @return Response array
     */
    public function index(): Response
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
     * 
     * @param RegisterRequest $request
     * 
     * @return Response array
     */
    public function store(RegisterRequest $request): Response
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
     * 
     * @param User $user
     * 
     * @return Response array
     */
    public function show(User $user): Response
    {
        return response([
            // "user" => $user->with("courses")->paginate(10)
            "user" => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     * 
     * @param UserRequest $request
     * @param User $user
     * 
     * @return Response array
     */
    public function update(UserRequest $request, User $user): Response
    {
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->city = $request->city;
        $user->street_address = $request->street_address;
        $user->country = $request->country;

        $user->save();

        return response([
            "user" => $user
        ]);
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param User $user
     * 
     * @return Response array
     */
    public function destroy(User $user): Response
    {
        $user->delete();

        return response([
            "status" => "success"
        ]);
    }

    /**
     * Method for setting other users as admin.
     * 
     * @param User $user
     * 
     * @return Response array
     */
    public function setAdmin(User $user): Response
    {
        $user->is_admin = true;

        $user->save();

        return response([
            "user" => $user
        ]);
    }

    /**
     * Updates password
     * 
     * @param Request $request
     * @param User $user
     * 
     * @return Response array
     */
    public function updateUserPassword(Request $request, User $user): Response
    {
        $this->passwordChangeValidator($request, $user);

        $user->password = Hash::make($request['password']);
        $user->save();

        return response([
            "user" => $user
        ]);
    }

    /**
     * Validation method for changing passwords
     * 
     * @param Request $request
     * @param User $user
     * 
     * @return void
     */
    private function passwordChangeValidator(Request $request, User $user): void
    {
        $validator = Validator::make($request->all(), [
            'old' => ['required', function ($attribute, $value, $fail) use ($user) {
                if (!Hash::check($value, $user->password)) {
                    return $fail(__('The current password is incorrect.'));
                }
            }],
            'password' => 'required|string|min:8|confirmed'
        ]);

        $this->validateRequest($validator);
    }

    /**
     * Validate the request and throw error in case of failure
     * 
     * @param IluminateValidator $validator
     * 
     * @return void
     * @throws HttpResponseException
     */
    private function validateRequest(IluminateValidator $validator): void
    {
        if ($validator->fails()) {
            throw new HttpResponseException(response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'data' => $validator->errors()
            ]));
        }
    }
}

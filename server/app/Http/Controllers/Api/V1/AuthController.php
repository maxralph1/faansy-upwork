<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Role;
use App\Models\User;
use App\Models\Wallet;
use App\Models\Profile;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\PasswordResetToken;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Mail\PasswordlessLoginToken;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Laravel\Socialite\Facades\Socialite;


class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['only' => ['logout', 'refresh']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            // 'email' => 'required|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('username', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();

        if ($user->deleted_at != null) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $loggedInUser = User::where('id', auth()->user()->id)->first();
        $loggedInUser->last_seen = now();
        $loggedInUser->save();

        $detailedToken = Auth::claims([
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'username' => $user->username,
            'email' => $user->email,
            'user_image_url' => $user?->user_image_url,
            'verified' => $user->verified,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
            'profile' => $user->profile,
            'role' => $user->role,
            'pollresponses' => $user->pollresponses,
        ])->attempt($credentials);
        // ])->setTTL(1)->attempt($credentials);

        return response()->json([
            'status' => 'success',
            // 'user' => $user,
            'authorization' => [
                'token' => $detailedToken,
                'type' => 'bearer',
            ]
        ]);
    }

    public function passwordlessSigninRequest(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
        ]);

        $user_found = User::where('username', $request->username)->first();

        if (!$user_found) {
            return response()->json([
                'status' => 'Not Found',
                'message' => 'Username does not exist.'
            ], 404);
        } elseif ($user_found) {
            $token_already_exists = DB::table('passwordless_sign_in_tokens')
                ->where('username', $request->username)
                ->first();

            if ($token_already_exists) {
                Mail::to($token_already_exists->email)->send(new PasswordlessLoginToken($token_already_exists->username, $token_already_exists->token));

                return response()->json([
                    'status' => 'success',
                    'message' => 'Sign in token sent to your email. Click on the link to sign in to your account.'
                ]);
            } elseif (!$token_already_exists) {
                $token = Str::random(80);

                $user_found = User::where('username', $request->username)->first();

                $username = $user_found->username;

                DB::table('passwordless_sign_in_tokens')->insert([
                    'username' => $user_found->username,
                    'email' => $user_found->email,
                    'token' => $token,
                    'created_at' => now(),
                ]);

                Mail::to($user_found->email)->send(new PasswordlessLoginToken($username, $token));

                return response()->json([
                    'status' => 'success',
                    'message' => 'Sign in token sent to your email. Click on the link to sign in.'
                ]);
            }
        }
    }

    public function passwordlessSignin(Request $request)
    {
        $sign_in_token_found = DB::table('passwordless_sign_in_tokens')->where([
            'username' => $request->route('username'),
            'token' => $request->route('token'),
        ]);

        if (!$sign_in_token_found) {
            return response()->json([
                'status' => 'error',
                'message' => 'Username wrong or token expired.',
            ], 404);
        }

        $user = User::where('username', $request->route('username'))->first();

        $token = Auth::claims([
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'username' => $user->username,
            'email' => $user->email,
            'user_image_url' => $user?->user_image_url,
            'verified' => $user->verified,
            'created_at' => now(),
            'updated_at' => now(),
            'profile' => $user->profile,
            'role' => $user->role,
            'pollresponses' => $user->pollresponses,
        ])->login($user);

        $sign_in_token_found->delete();

        return response()->json([
            'status' => 'success',
            // 'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'username' => 'required|string|max:55',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $role = Role::where('title', 'generic-user')->first();

        // use Illuminate\Support\Facades\DB;

        // DB::transaction(function () use ($user, $request): void {
        //     $user = User::create([
        //         'email' => $request->email,
        //     ]);

        //     $user->roles()->attach(Role::where('name', 'general')->first());
        // });

        DB::transaction(function () use ($request, $role) {
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'legal_age' => true,
                'role_id' => $role->id
            ]);

            $profile = Profile::create([
                'user_id' => $user->id,
            ]);

            $wallet = Wallet::create([
                'user_id' => $user->id,
                'balance' => 0
            ]);

            $token = Auth::claims([
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'username' => $user->username,
                'email' => $user->email,
                'verified' => $user->verified,
                'created_at' => now(),
                'updated_at' => now(),
                'profile' => $profile,
                'role' => $role->title
            ])->login($user);

            return response()->json([
                'status' => 'success',
                'message' => 'User created successfully',
                // 'user' => $user,
                'authorization' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ], 201);
        });
    }

    public function logout()
    {
        $loggedInUser = User::where('id', auth()->user()->id)->first();
        $loggedInUser->last_seen = now();
        $loggedInUser->save();

        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        // return response()->json([
        //     'access_token' => $token,
        //     'token_type' => 'bearer',
        //     'expires_in' => auth()->factory()->getTTL() * 60
        // ]);
        return response()->json([
            'status' => 'success',
            // 'user' => Auth::user(),
            'authorization' => [
                'token' => Auth::refresh(),
                // 'token' => auth()->refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    public function resetPasswordRequest(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $valid_email = User::where('email', $request->email)->first();

        if (!$valid_email) {
            return response()->json([
                'status' => 'Not Found',
                'message' => 'Email does not exist.'
            ], 404);
        } elseif ($valid_email) {
            $token_already_exists = DB::table('password_reset_tokens')
                ->where('email', $request->email)
                ->first();

            if ($token_already_exists) {
                Mail::to($request->email)->send(new PasswordResetToken($request->email, $token_already_exists->token));

                return response()->json([
                    'status' => 'success',
                    'message' => 'Reset token sent to your email. Click on the link to reset your password.'
                ]);
            } elseif (!$token_already_exists) {
                $token = Str::random(80);
                $email = $request->email;

                DB::table('password_reset_tokens')->insert([
                    'email' => $request->email,
                    'token' => $token,
                    'created_at' => now(),
                ]);

                Mail::to($request->email)->send(new PasswordResetToken($email, $token));

                return response()->json([
                    'status' => 'success',
                    'message' => 'Reset token sent to your email. Click on the link to reset your password.'
                ]);
            }
        }
    }

    public function resetPassword(Request $request)
    {
        $reset_token_found = DB::table('password_reset_tokens')->where([
            'email' => $request->email,
            'token' => $request->token
        ]);

        if (!$reset_token_found) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email wrong or token expired.',
            ], 404);
        }

        $user = User::where('email', $request->email)->first();
        $user->update([
            'password' => Hash::make($request->password)
        ]);

        $reset_token_found->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Password has been updated.'
        ]);
    }

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->user();

        $user = User::updateOrCreate([
            'google_account' => $googleUser->id,
        ], [
            // 'first_name' => $googleUser->name,
            'email' => $googleUser->email,
            'google_token' => $googleUser->token,
            'google_refresh_token' => $googleUser->refreshToken,
        ]);

        Auth::login($user);

        if ($user->deleted_at != null) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user->last_seen = now();
        $user->save();

        $detailedToken = Auth::claims([
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'username' => $user->username,
            'email' => $user->email,
            'user_image_url' => $user?->user_image_url,
            'verified' => $user->verified,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
            'profile' => $user->profile,
            'role' => $user->role,
            'pollresponses' => $user->pollresponses,
        ])->user();

        return response()->json([
            'status' => 'success',
            // 'user' => $user,
            'authorization' => [
                'token' => $detailedToken,
                'type' => 'bearer',
            ]
        ]);
    }
}

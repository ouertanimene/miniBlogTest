<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    { 
        $validator = Validator::make($request->all(),[
            'name' =>'required|min:3',
            'email' =>'required|email',
            'password' =>'required',        
        ]);
    
        if ($validator->fails()) {
            return  response()->json($validator->errors(), 422);
        }
       
        $user = new User([
            'name' => $request->get('name'),
            'email'    => $request->get('email'),
            'password' => bcrypt($request->get('password'))
        ]);
        $user->save(); 

        $token = auth()->login($user);

        return $this->respondWithToken($token);
        
    }

    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);     
        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }      
        return $this->respondWithToken($token);
    }

    public function logout(Request $request)
    { 
        
        $token = $request->header('Authorization');
        // Invalidate the token
        try {
            JWTAuth::parseToken()->invalidate();
            return response()->json([
                'status' => 'success',
                'message' => "User successfully logged out."
            ], 200);
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to logout, please try again.'
            ], 500);
        }
     //   auth()->logout();
      //  return response()->json(['message' => 'Successfully logged out']);
    }

    protected function respondWithToken($token)
    {
        $user= Auth::user();
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth()->factory()->getTTL() * 60,
            'user'         => $user,
            'status'        => 200,
        ]);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Actividade;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class UsersController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
    public function index(Request $request)
    {
        try {
            $users = User::all()->where('role_id', '!=', 'register');
            return response()->json( $users, 200);
        }
        catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }

    public function usuersRegister(Request $request)
    {
        try {
            $users = User::all()->where('role_id', '=', 'register');
            return response()->json( $users, 200);
        }
        catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);
            $user->role_id = $request->all()['role_id'];
            $user->save();
            return response()->json( $user, 200);
        }
        catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }

    public function findById(Request $request, $id)
    {
        $user = User::findOrFasil($id);
        return response()->json( $user, 200);
    }
}

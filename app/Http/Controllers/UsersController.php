<?php

namespace App\Http\Controllers;

use App\Models\Actividade;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Validator;

class UsersController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
    public function index(Request $request)
    {
        try {
            $users = User::all()->where('role_id', '!=', 'registrado');
            return response()->json( $users, 200);
        }
        catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }

    public function usersRegister(Request $request)
    {
        try {
            $users = User::all()->where('role_id',  'registrado');
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
            $validator = Validator::make($request->all(),
                [
                    'name' => 'required',
                ]);
            if (!$validator->fails()) {
                $user->name = $request->all()['name'];
            }

            $validator = Validator::make($request->all(),
                [
                    'email' => 'required',
                ]);
            if (!$validator->fails()) {
                $user->email = $request->all()['email'];
            }

            $user->save();
            return response()->json($user, 200);
        }
        catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }

    public function delete(Request $request, $id)
    {
        $user = User::deleting($id);
        return response()->json( 'Usuario borrado', 200);
    }

    public function findById(Request $request, $id)
    {
        $user = User::findOrFasil($id);
        return response()->json( $user, 200);
    }
}

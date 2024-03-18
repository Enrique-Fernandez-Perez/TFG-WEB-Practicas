<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Peticione;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Categoria;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\ServiceProvider;
use function PHPUnit\Framework\isEmpty;

// use Illuminate\Pagination\LengthAwarePaginator;


class PeticioneController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show']]);
    }

    public function index(Request $request)
    {
        try {
            $peticiones = Peticione::all()->load(['user', 'categoria', 'files']);
            return response()->json( $peticiones, 200);
        }
        catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }

    public function listMine(Request $request)
    {
        $user = Auth::user();
        $peticiones = Peticione::all()-> where('user_id', $user->id);
        return response()->json( $peticiones, 200);
    }

    public function show(Request $request, $id)
    {
        try {
            $peticion = Peticione::findOrFail($id);
            return response()->json( $peticion, 200);
        }
        catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $peticion = Peticione::findOrFail($id);

            $user = Auth::user();
            $rol = $user->role_id;

            if($rol === 0 && $peticion->user_id != $user->id){
                return response()->json( ["Error" => "Este usuario no tiene permisos para modificar"], 201);
            }

            $peticion-> update($request-> all());
            //$peticion->save();
            return response()->json( $peticion, 201);
        }
        catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $this-> validate($request, [
                'titulo' => 'required|max:255',
                'descripcion' => 'required',
                'destinatario' => 'required',
                'categoria_id' => 'required',
                // 'file' => 'required',
            ]);
            $input = $request-> all();
            $category = Categoria::findOrFail($request-> input('categoria_id'));
            $user = Auth::user();
            $peticion = new Peticione($input);
            $peticion-> user()-> associate($user);
            $peticion-> categoria()-> associate($category);
            $peticion-> firmantes = 0;
            $peticion-> estado = 'pendiente';
            $peticion-> save();
        //        return $peticion;
            return response()->json( $peticion, 201);
        }
        catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }

    public function firmar(Request $request, $id)
    {
        try {
            $peticion = Peticione::findOrFail($id);
            $user = Auth::user();
            if(!empty($peticion->firmas->where('id', $user->id)[0])){
                return response()->json( 'El usuario ya ha firmado la peticion');
            }
            $peticion-> firmas()-> attach($user->id);
            $peticion-> firmantes = $peticion-> firmantes + 1;
            $peticion-> save();
            return response()->json($peticion, 201);
        }
        catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }

    }

    public function cambiarEstado(Request $request, $id)
    {
        if(Auth::user()->role_id === 0){
            return response()->json( ["Error" => "Este usuario no tiene permisos para cambiar el estado"], 201);
        }
        $peticion = Peticione::findOrFail($id);
//        if($request->user()->cannot('cambiarEstado'), $peticion){
//            return response()->json([''=>''],403);
//        }
        $peticion-> estado = 'aceptada';
        $resp = $peticion-> save();
//        if($resp){
//            return response()->json([''=>''],403);
//        }
        return $peticion;
    }

    public function delete(Request $request, $id)
    {
        try {
            $user = Auth::user();
            $rol = $user->role_id;

            $peticion = Peticione::findOrFail($id);

            if($rol === 0 && $peticion->user_id != $user->id){
                return response()->json( ["Error" => "Este usuario no tiene permisos para eleminar"], 201);
            }

            $peticion-> delete();
            return response()->json( $peticion, 201);
        }
        catch (\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }
}

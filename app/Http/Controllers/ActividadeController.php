<?php

namespace App\Http\Controllers;

use App\Models\Actividade;
use App\Models\Favorita;
use App\Models\File;
use App\Models\Imagene;
use App\Models\Inscripcione;
use App\Models\User;
//use Dotenv\Store\File\Paths;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use function PHPUnit\Framework\isEmpty;
use Illuminate\Support\Facades\Validator;

// use Illuminate\Pagination\LengthAwarePaginator;


class ActividadeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show']]);
    }
    public function index(Request $request)
    {
        try {
//            $actividades = Actividade::all()->load(['user', 'files']);
            $actividades = Actividade::all();
            return response()->json( $actividades, 200);
        }
        catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }

    public function listMine(Request $request)
    {
        $user = Auth::user();
        $actividades = Actividade::all()-> where('organizador', $user->id)->load(['user', 'files']);
        return response()->json( $actividades, 200);
    }

    public function search(Request $request, $search)
    {
        $user = Auth::user();
        $actividades1 = Actividade::all()-> where('titulo', 'like', '%'+$search.'&')->load(['user', 'files']);
        $actividades2 = Actividade::all()-> where('descripcion', 'like', '%'+$search.'&')->load(['user', 'files']);
        $actividades = array_merge($actividades1, $actividades2);
        return response()->json( $actividades, 200);
    }

    public function show(Request $request, $id)
    {
        try {
            $actividad = Actividade::findOrFail($id)->load(['user', 'files']);;
            return response()->json( $actividad, 200);
        }
        catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $input = $request-> all();

            $actividad = Actividade::findOrFail($id);

//            $user = Auth::user();
//            $rol = $user->role_id;
//
//            if($rol == 'administrador' && $actividad->user_id != $user->id){
//                return response()->json( ["Error" => "Este usuario no tiene permisos para modificar"], 201);
//            }

//            $actividad-> update($request-> all());
            $user = User::find($request->all()['organizador']);

            $actividad->titulo = $request->input('titulo');
            $actividad->descripcion = $request->input('descripcion');
//            $actividad->image = $input['file'];

//            $actividad-> user()-> associate($user);
//            $actividad->organizador = $user->id;

//            $actividad->user()->associate($user->id);


            $validator = Validator::make($input,
                [
                    'fecha' => 'required',
                ]);
            if ($validator->fails()) {
                $actividad->fecha = Date::now();
            }
            else{
                $actividad->fecha = $input['fecha'];
            }

            $actividad-> save();
//            $actividad->save();
            return response()->json( $actividad, 201);
        }
        catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(),
                [
                    'titulo' => 'required|max:255',
                    'descripcion' => 'required',
//                    'fecha' => 'required',
                    //'file' => 'required',
                ]);
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 401);
            }

            $input = $request-> all();

//            $user = Auth::user();
            $user = User::find($request->all()['organizador']);

            $actividad = new Actividade();

            $actividad->titulo = $request->input('titulo');
            $actividad->descripcion = $request->input('descripcion');
//            $actividad->image = $input['file'];

//            $actividad-> user()-> associate($user);
            $actividad->organizador = $user->id;

//            $actividad->user()->associate($user->id);


            $validator = Validator::make($input,
                [
                    'fecha' => 'required',
                ]);
            if ($validator->fails()) {
                $actividad->fecha = Date::now();
            }
            else{
                $actividad->fecha = $input['fecha'];
            }

            $actividad-> save();

            $validator = Validator::make($request->all(),
                [
                    'file' => 'required',
                ]);
            if (!$validator->fails()) {
                $file = $request->file('file');
                $pid = $actividad->id;
                $fileModel = new File;
                $fileModel->peticione_id = $pid;
                $filename = $pid . '_' . $file->getClientOriginalName();
                $file->move('storage/files/', $filename);
                $fileModel->name = $filename;
                $fileModel->file_path = "storage/files" . $filename;
                $fileModel->save();
            }
//            else{
//                $file = new File();
//                $pid = $actividad->id;
//                $file->actividades()->associate($pid);
//                $file->name = 'unless';
//                $file->file_path = 'unless';
//                $file->save();
//            }

            return response()->json($actividad,201);
        }
        catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }

    public function addInscription(Request $request, $id)
    {
        try {
            $user_id = Auth::id();
            $inscripcion = new Inscripcione();

            $inscripcion->user_id = $user_id;
            $inscripcion->actividade_id = $id;

            $inscripcion->save();
            return response()->json( $inscripcion, 200);
        }catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }
    public function addFavorite(Request $request, $id)
    {
        try {
            $user_id = Auth::id();
            $inscripcion = new Favorita();

            $inscripcion->user_id = $user_id;
            $inscripcion->actividade_id = $id;

            $inscripcion->save();
            return response()->json( $inscripcion, 200);
        }catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }
    public function addImage(Request $request, $id)
    {
        $validator = Validator::make($request->all(),
            [
                'name' => 'required',
                'descripcion' => 'required',
                'file' => 'required',
            ]);
        if ($validator->fails()) {
            $file = $request->file('file');
//            $pid = $actividad->id;
            $fileModel = new Imagene();
//            $fileModel->peticione_id = $pid;
            $fileModel->name = $request->all()['name'];
            $fileModel->descripcion = $request->all()['descripcion'];
            $filename = $id . '_' . $file->getClientOriginalName();
            $file->move('storage/images', $filename);
            $fileModel->file_path = "storage/images" . $filename;

            $fileModel->activiades()->attach($id);

            $fileModel->save();
        }
        try {
            return response()->json( $fileModel, 200);
        }catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }

    public function delete(Request $request, $id)
    {
        try {
//            $user = Auth::user();
//            $rol = $user->role_id;

            $actividad = Actividade::findOrFail($id);

            Actividade::destroy($id);
//            if($rol === 0 && $actividad->user_id != $user->id){
//                return response()->json( ["Error" => "Este usuario no tiene permisos para eleminar"], 201);
//            }

//            $this->fileDelete($request,$id);

//            $actividad-> delete();
            return response()->json( $actividad, 201);
        }
        catch (\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }

    public function fileDelete(Request $req, $actividade_id = null)
    {
        $pet = Actividade::findOrFail($actividade_id);
        $path = $pet->files()->first()->file_path;
        $file = unlink($path);
        return $file;
    }

    public function actividadesFavoritas(Request $request)
    {
        try {
            $id = Auth::id();
            $fav = Favorita::all()-> where('user_id', $id);
            $actividades = $fav->actividades;
            return response()->json( $actividades, 200);
        }catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }

    public function actividadesInscritas(Request $request)
    {
//        return response()->json( ['msg'=>'lol'],200);
        try {
            $id = Auth::id();
            $ins = Inscripcione::all()-> where('user_id', $id);
            $actividades = $ins->actividades;
            return response()->json( $actividades, 200);
        }catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }

}

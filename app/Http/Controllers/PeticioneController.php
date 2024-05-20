<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Peticione;
use App\Models\User;
//use Dotenv\Store\File\Paths;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Categoria;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use function PHPUnit\Framework\isEmpty;
use Illuminate\Support\Facades\Validator;

// use Illuminate\Pagination\LengthAwarePaginator;


class PeticioneController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show', 'showImage']]);
    }

    public function index(Request $request)
    {
        try {
//            $peticiones = Peticione::all()->paginate(3)->load(['user', 'categoria', 'files']);
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
//        $peticiones = Peticione::all()->where('user_id', $user->id)->paginate(3)->load(['user', 'categoria', 'files']);
//        $peticiones = Peticione::all()->where('user_id', $user->id)->load(['user', 'categoria', 'files']);
        $peticiones = Peticione::all()->where('user_id', $user->id);
        return response()->json( $peticiones, 200);
    }

    public function show(Request $request, $id)
    {
        try {
            $peticion = Peticione::findOrFail($id)->load(['user', 'categoria', 'files']);
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

            if($rol == 1 && $peticion->user_id != $user->id){
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
            $validator = Validator::make($request->all(),
                [
                    'titulo' => 'required|max:255',
                    'descripcion' => 'required',
                    'destinatario' => 'required',
                    'categoria_id' => 'required',
                    //'file' => 'required',
                ]);
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 401);
            }
            $validator = Validator::make($request->all(),
                [
                    'file' => 'required',
                ]);
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 401);
            }
//            return response()->json('$peticion',201);
            $input = $request-> all();

//            if($file = $request->file('file')){
//                $name = $file->getClientOriginalName();
//                Storage::put($name, file_get_contents($request->file('file')->getRealPath()));
//                $file->move('storage/'. $file);
//                return response()->json('$peticion',201);
//                $input['file'] = $name;
//            }

            $category = Categoria::findOrFail($request-> input('categoria_id'));
            $user = Auth::user();

            $peticion = new Peticione();


            $peticion->titulo = $request->input('titulo');
            $peticion->descripcion = $request->input('descripcion');
            $peticion->destinatario = $request->input('destinatario');
//            $peticion->image = $input['file'];

            $peticion-> user()-> associate($user);
            $peticion-> categoria()-> associate($category);
            $peticion-> firmantes = 0;
            $peticion-> estado = 'pendiente';
            $peticion-> save();


            $file = $request->file('file');
            $pid = $peticion->id;
            $fileModel = new File;
            $fileModel->peticione_id = $pid;
            $filename = $pid . '_' . $file->getClientOriginalName();
            $file->move('storage', $filename);
            $fileModel->name = $filename;
            $fileModel->file_path = "storage/" . $filename;
            $fileModel->save();

//            $imgdb= new File();
//            $imgdb->name = $input['file'];
//            $imgdb->file_path = 'storage/' . $input['file'];
//            $imgdb->peticione_id = $peticion->id;
//            $imgdb->save();

            return response()->json($peticion,201);
//            return response()->json( $peticion, 201);
        }
        catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }


    public function categorias(Request $request){
        try {
            $categorias = Categoria::all()->load(['id', 'nombre']);
            return response()->json( $categorias, 200);
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

            $firmas = $peticion->firmas;
            foreach ($firmas as $firma) {
                if ($firma->id == $user->id) {
                    return response()->json(['message' => 'Ya has firmado esta petición'], 403);
                }
            }
//            if(!empty($peticion->firmas->where('id', $user->id)[0])){
////                return response()->json( 'El usuario ya ha firmado la peticion',403);
//                return response()->json(['message' => 'Ya has firmado esta petición'], 403);
//            }
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
        if(Auth::user()->role_id == 0){
            return response()->json( ["Error" => "Este usuario no tiene permisos para cambiar el estado"], 201);
        }
        $peticion = Peticione::findOrFail($id);
        if(Auth::user()->id != $peticion->user()->id){
            return response()->json([''=>''],403);
        }
//        if($request->user()->cannot('cambiarEstado'), $peticion){
//            return response()->json([''=>''],403);
//        }
        $peticion-> estado = 'aceptada';
        $resp = $peticion-> save();
        if($resp){
            return response()->json([''=>''],403);
        }
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

            $this->fileDelete($request,$id);

//            $peticion-> delete();
            $peticion-> destroy();
            return response()->json( $peticion, 201);
        }
        catch (\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }

    public function showImage(Request $req, $id){
        try{
            $peticion = Peticione::findOrFail($id);
            $image = $peticion->files[0];//File::findOrFail($id);
            return  response()->file($image->file_path);
        }
        catch (\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }

    public function fileDelete(Request $req, $peticione_id = null)
    {
        $pet = Peticione::findOrFail($peticione_id);
        $path = $pet->files()->first()->file_path;
        $file = unlink($path);
        return $file;
    }

    public function peticionesFirmadas(Request $request)
    {
        try {
            $id = Auth::id();
            $usuario = User::findOrFail($id);
//            $peticiones = $usuario->firmas->load(['user', 'categoria', 'files'])->paginate(3);
            $peticiones = $usuario->firmas->load(['user', 'categoria', 'files']);
            return response()->json( $peticiones, 200);
        }catch (\Exception $exception){
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
    }

    public function desfirmar(Request $request, $id)
    {
        try {
            $peticion = Peticione::findOrFail($id);
            $user = Auth::user();

            $firmas = $peticion->firmas;

            $firmada = false;

            $i = 0;

            foreach ($firmas as $firma) {
                if ($firma->id == $user->id) {
                    $firmada = true;
                }
            }

            if(!$firmada){
//                return back()->withError("No has firmado esta petición")->withInput();
                return response()->json(['message' => 'No has firmado esta petición'], 403);
            }
            else
            {
                $peticion->firmas()->detach($user->id);

                $peticion->firmantes = $peticion->firmantes - 1;
                $peticion->save();
                return response()->json( $peticion, 200);
            }
        } catch (\Exception $exception) {
//            return back()->withError($exception->getMessage())->withInput();
            return response()->json( ['error'=>$exception->getMessage()], 500);
        }
        return redirect()->back();
    }

}

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
        // parent::index()
        $user = Auth::user();
//        $id = 1;
        $peticiones = Peticione::all()-> where('user_id', $user->id);
//        return $peticiones;
        return response()->json( $peticiones, 200);
    }

    public function show(Request $request, $id)
    {
//        $peticion = Peticione::findOrFail($id);
//        return $peticion;
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
        //        $user = 1; //harcodeamos el usuario
        //        $user = User::findOrFail(1); //harcodeamos el usuario
            $user = Auth::user();
            ////$user = Auth::user(); //asociarlo al usuario authenticado
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
            //$user = Auth::user();
            //$user = 1;
            //$user_id = [$user];
            //$user_id = [$user->id];
            //$user = User::findOrFail(1); //harcodeamos el usuario.
            //$user_id = 1;
            //$peticion-> firmas()-> attach($user_id);
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

//        return $peticion;
    }

    public function cambiarEstado(Request $request, $id)
    {
        if(Auth::user()->role_id === 0){
            return response()->json( ["Error" => "Este usuario no tiene permisos para cambiar el estado"], 201);
        }
        $peticion = Peticione::findOrFail($id);
        $peticion-> estado = 'aceptada';
        $peticion-> save();
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
    /*
    public function __construct()
    {
//        $this->middleware('auth')->except("index", "show");
    }

    public function index(Request $request)
    {
        $peticiones = Peticione::all();
        return $peticiones;
    }

    public function show(Request $request, $id)
    {
        try{
            $peticion = Peticione::findOrFail($id);
        }
        catch (\Exception $exception){
            return back()->withError( $exception->getMessage())->withInput();
        }
        return $peticion;
    }

    public function listMine(Request $request)
    {
        try {
            $user = $request->user();
            $peticiones = Peticione::where("user_id", $user->id);
            return $peticiones;
        } catch (\Exception $exception) {
            return back()->withErrors($exception->getMessage())->withInput();
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
                    return back()->withError("Ya has firmado esta petición")->withInput();
                }
            }
            $user_id = [$user->id];
            $peticion->firmas()->attach($user_id);
            $peticion->firmantes = $peticion->firmantes + 1;
            $peticion->save();
        } catch (\Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }
        return redirect()->back();
    }

    public function searchUser($by, $str){
        try {
            if($by === 'name'){
                $user = User::where('name',$str)->first();
            }else{
                $user = User::where('email',$str)->first();
            }
        }
        catch (\Exception $exception) {
            return false;
        }
        return $user;
    }

    public function peticionesFirmadas(Request $request)
    {
        try {
            $id = Auth::id();
            // $usuario = User::findOrFail($id);
            // $peticiones = $usuario->firmas;
            $usuario = User::findOrFail($id);
            $peticiones = $usuario->firmas()->paginate(3);
        } catch (\Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }
//        return view('admin.peticiones.index', compact('peticiones'));
        return view('peticiones.index', compact('peticiones'));
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
                $i++;
            }
            // $peticion->firmas()->detach(3);

            if(!$firmada){
                // $peticion->firmantes = $peticion->firmantes + 1;
                // $peticion->save();
                return back()->withError("No has firmado esta petición")->withInput();
            }
            else
            {
                // $user_id = [$user->id];
                // $peticion->firmas()->attach($user_id);

                $peticion->firmas()->detach($user->id);

                $peticion->firmantes = $peticion->firmantes - 1;
                $peticion->save();
            }
        } catch (\Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }
        return redirect()->back();
    }

    public function create(Request $request)
    {
        try{
//            $cats = \App\Models\Categoria::orderBy("nombre", "asc")->get();
            $categorias = \App\Models\Categoria::orderBy("nombre", "asc")->get();
        }
        catch (\Exception $exception){
            return back()-> withError($exception-> getMessage())-> withInput();
        }
//        return view('peticiones.edit-add', compact("cats"));

        return view('peticiones.edit-add2', compact("categorias"));
    }

    public function store(Request $request)
    {
//        $file = $request->file('file');
//
//        $file->move('peticiones', 'pepe');
//
//        return ["file"=>$request->file("FILE")];

        $this->validate($request, [
            'titulo' => 'required|max:255',
            'descripcion' => 'required',
            'destinatario' => 'required',
            'categoria' => 'required|max:255',
            'file' => 'required',
        ]);
        $input = $request->all();
        try {
            $category = Categoria::findOrFail($input['categoria']);
            $user = Auth::user(); //asociarlo al usuario authenticado
            $peticion = new Peticione($input);
            $peticion-> categoria()-> associate($category);
            $peticion-> user()-> associate($user);
            $peticion-> firmantes = 0;
            $peticion-> estado = 'pendiente';
            $res = $peticion-> save();
            if ($res) {
                $res_file = $this->fileUpload($request, $peticion->id);
                if ($res_file) {
                    return redirect('/mispeticiones');
                }
                return back()-> withError('Error creando la peticion')-> withInput();
            }
        }
        catch (\Exception $exception){
            return back()-> withError($exception-> getMessage())-> withInput();
        }
    }

    public function fileUpload(Request $req, $peticione_id = null)
    {
        $file = $req->file('file');
        $fileModel = new File;
        $fileModel->peticione_id = $peticione_id;
        if ($req->file('file')) {
            //return $req->file('file');

            $filename = $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move('peticiones', $filename);
            $fileModel->name = $filename;
            $fileModel->file_path = "peticiones/" . $filename;
            $res = $fileModel->save();
            return $fileModel;
            if ($res) {
                return 0;
            } else {
                return 1;
            }
        }
        return 1;
    }

    function autoFirma($id){
        try {
            $peticion = Peticione::findOrFail($id);
            $user = Auth::user();
            $firmas = $peticion->firmas;
            foreach ($firmas as $firma) {
                if ($firma->id == $user->id) {
                    return back()->withError("Ya has firmado esta petición")->withInput();
                }
            }
            $user_id = [$user->id];
            $peticion->firmas()->attach($user_id);
            $peticion->firmantes = $peticion->firmantes + 1;
            $peticion->save();
        } catch (\Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }
    }

}
*/

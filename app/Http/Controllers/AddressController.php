<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Exceptions\MathException;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Address;
use PhpParser\Node\Expr\Array_;
use function PHPUnit\Framework\isNan;
use function PHPUnit\Framework\isNull;
use function Webmozart\Assert\Tests\StaticAnalysis\isEmptyArray;


class AddressController extends Controller
{
    //
    public function store(Request $request)
    {
        //llamar a la funcion validateEmail
        //llamar a la funcion validateAddress
        //Control de errores con respuesta adecuada

        $emailValidator = $this->validateEmail();
        $addressValidator = $this->validateAddress();

        if($emailValidator->fails() || $addressValidator->fails()){
            return response()->json(["message"=>'Failed',"email"=>$emailValidator->messages(),"address"=>$emailValidator->messages()], 400);
        }

        $user = User::where('email', $request->get('email'))->first();//->firstOrFail();

        if(!($user instanceof User)){
            return response()->json(["message"=>'Email not found'], 400);
        }

        $user = User::where('email', $request->get('email'))->firstOrFail();

        if($user->address){
            return response()->json(["message"=>'Address has Address already',"data"=>null], 400);
        }

        $address = new Address($addressValidator->validate());
        if($user->address()->save($address)){
            return response()->json(['message'=>'User Created','data'=>$address],200);
        }

        return response()->json(["message"=>'Failed complete',"data"=>null], 400);
    }

    public  function validateEmail(){
        return Validator::make(request()->all(),['email'=>'required|string|email|max:255']);
    }

    //usar  metodo validator::make()
    public  function validateAddress(){
        return Validator::make(request()->all(),[ 'country'=>'required|string|min:1|max:12', 'zipcode'=>'required|string|min:5|max:6']);
    }
    public function show(Address $address)
    {
        return response()->json(['message'=>'','data'=>$address],200);
    }
    public function show_user(Address $address)
    {
        $users = User::all();
        return response()->json(['user'=>$address],200);
    }

    public function index()
    {
        $address = Address::all();
        return response()->json(['address'=>$address],200);
    }
}

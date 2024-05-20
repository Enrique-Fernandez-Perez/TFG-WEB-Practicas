<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\EventType;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class EventTypeController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'descripcion' => 'required|string|max:600',
        ]);
        if($validator->fails()){
            return response()->json($validator->messages(), 400);
        }
        $eventType = EventType::create([
            'description' => $request->get('descripcion'),
        ]);
        return response()->json(['message'=>'User Created','data'=>$eventType],200);
    }
    //
    public function listEvents(EventType $type){
        $events = $type->events;
        return response()->json(['message'=>null,'data'=>$events],200);
    }

    public function show(Request $request)
    {
        $eventType = EventType::where('id', $request->get('id'))->firstOrFail();
        return response()->json(['message'=>null,'data'=>$eventType],200);
    }

    public function index()
    {
        $type = EventType::all();
        return response()->json(['users'=>$type],200);
    }
}

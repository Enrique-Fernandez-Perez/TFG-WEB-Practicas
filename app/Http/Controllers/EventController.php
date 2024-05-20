<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventType;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $events = Event::all();
        return response()->json(['mesage'=>null, 'data'=>$events],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        // Creara un evento

        $validator = $this->validateDate();
        if($validator->fails()){
            return response()->json($validator->messages(), 400);
        }

        $type = EventType::where('id', $request->get('type'))->first();

        if(is_null($type)){
            return response()->json(["message"=>'Failed, type event not exist',"data"=>null], 400);
        }

        $event = Event::create([
            'event_name' => $request->get('name'),
            'event_detail' => $request->get('detail'),
            'event_type_id' => $request->get('type'),
        ]);
        return response()->json(['message'=>'Event Created','data'=>$event],200);
    }

    //usar  metodo validator::make()
    public  function validateDate(){
        return Validator::make(request()->all(),[ 'name' => 'required|string|min:1|max:30',
            'detail' => 'required|string|min:1|max:600',
            'type' => 'required|string|min:1',]);
    }

    public function listUsers(Event $event)
    {
        $users = $event->users;
        return response()->json(['message'=>null,'data'=>$users],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $event = Event::where('id', $id)->first();
        if(!($event instanceof Event)){
            return response()->json(["message"=>'Event not found'], 400);
        }
        return response()->json(['message'=>'','data'=>$event],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//use app\Http\Models\Categoria;

class Peticione extends Model
{
    use HasFactory;

    protected $fillable= ['titulo','descripcion','destinatario','firmantes','estado'];

    //pertenece a la categoria
    public function categoria(){
        return $this->belongsTo('App\Models\Categoria');
    }

    //ha sido firmada por
    public function firmas(){
        //return $this->belongsToMany(User::class,'peticione_user');
        return $this->belongsToMany("App\Models\User",'peticione_user');
    }

    //ha sido creado por el usuario
    public function user(){
        return$this->belongsTo("App\Models\User");
    }

    public function files(){
        return $this->hasMany("App\Models\File");
    }
}

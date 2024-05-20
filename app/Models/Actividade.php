<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//use app\Http\Models\Categoria;

class Actividade extends Model
{
    use HasFactory;

    protected $fillable= ['titulo','descripcion','destinatario','firmantes','estado'];


    //ha sido creado por el usuario
    public function user(){
        return$this->belongsTo("App\Models\User");
    }

    public function files(){
        return $this->hasMany("App\Models\File");
    }

    public function favoritas(){
        return $this->belongsTo('App\Models\Peticione');
    }

    public function inscipciones(){
        return $this->belongsTo('App\Models\Peticione');
    }
}

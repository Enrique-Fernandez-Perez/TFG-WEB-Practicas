<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actividade extends Model
{
    use HasFactory;

    protected $fillable= ['titulo','descripcion','organizador', 'fecha'];


    //ha sido creado por el usuario
    public function user(){
        return$this->belongsTo("App\Models\User");
    }

    public function files(){
        return $this->hasMany("App\Models\File");
    }

    public function imagenes(){
        return $this->belongsToMany("App\Models\Imagene");
    }

    public function favoritas(){
        return $this->hasMany('App\Models\Favorita');
    }

    public function inscipciones(){
        return $this->hasMany('App\Models\Inscripcione');
    }
}

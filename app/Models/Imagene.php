<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imagene extends Model
{
    use HasFactory;

    protected $fillable=[
        'name',
        'descripcion',
        'file_path',
    ];

//    public function peticione(){
//        return$this->belongsTo(Peticione::class);
//    }
}

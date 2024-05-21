<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorita extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'actividade_id'
    ];

    public function users(){
        return $this->hasOne('App\Models\User');
    }
    public function actividades(){
        return $this->hasOne('App\Models\Actividade');
    }
}

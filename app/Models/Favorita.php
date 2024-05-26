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

    public function user(){
        return $this->belongsTo('App\Models\User');
    }
    public function actividade(){
        return $this->belongsTo('App\Models\Actividade');
    }
}

<?php

namespace App\Http\Policies;

use App\Models\Peticione;
use App\Models\User;

class PeticionePolicy
{
    public function before(User $user){
        if($user->role_id == 1){
            return true;
        }
    }

    public  function update(User $user, Peticione $peticione){
        return $user->role_id == 0 & $peticione->user_id == $user->id;
    }

    public  function delete(User $user, Peticione $peticione){
        return $user->role_id == 0 & $peticione->user_id == $user->id;
    }

    public  function cambiarEstado(User $user, Peticione $peticione){
        return $user->role_id == 0 & $peticione->user_id == $user->id;
    }

    public  function firmar(User $user, Peticione $peticione){
        return $user->role_id != $peticione->user_id;
    }
}

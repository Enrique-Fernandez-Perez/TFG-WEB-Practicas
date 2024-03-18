<?php

namespace App\Http\Policies;

use App\Models\Peticione;

class PeticionePolicy
{
    public  function update(User $user, Peticione $peticione){
        return $user->role_id == 2 & $peticione->user_id == $user->id;
    }

    public  function delete(User $user, Peticione $peticione){
        return $user->role_id == 2 & $peticione->user_id == $user->id;
    }

    public  function cambiarEstado(User $user, Peticione $peticione){
        return $user->role_id == 2 & $peticione->user_id == $user->id;
    }

    public  function firmar(User $user, Peticione $peticione){
        return $user->role_id != $peticione->user_id;
    }
}

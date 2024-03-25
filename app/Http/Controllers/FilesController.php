<?php

namespace App\Http\Controllers;

class FilesController extends Controller
{
    //
    function download($filename){
        $path = public_path() . "/mispeticiones/" . $filename;
        return $path;
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('actividade_imagene', function (Blueprint $table) {
            $table->primary(['imagene_id','actividade_id']);
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('actividade_id')->unsigned();
            $table->timestamps();
            $table->foreign('imagene_id')
                ->references('id')
                ->on('imagenes')
                ->onDelete('cascade');
            $table->foreign('actividade_id')
                ->references('id')
                ->on('actividades')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imagene_user');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("description");
            $table->integer("rate")->default(0)->change();
            $table->integer("budget");
            $table->integer("final_price")->nullable()->change();
            // $table->string("description");
            $table->string("location");
            $table->enum('status', ['done', 'proccessing'])->nullable()->change();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}

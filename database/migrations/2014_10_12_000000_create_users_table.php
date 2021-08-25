<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('fname');
            $table->string('lname');
            $table->string('password');
            $table->string('username');
            $table->enum('gender', ['male', 'female']);
            $table->string('national_id');
            $table->string('phone_number');
            $table->string('email')->unique();
            $table->string('image')->nullable();
            $table->string('city');
            $table->string('street');
            $table->string('overview')->nullable()->default("Threre is No Overview");
            $table->string('university');
            $table->string('specialization');
            $table->string('experience')->nullable()->default("Threre is No Experience");
            $table->integer('rate')->default(0);
            $table->string('credit')->default(0);
            $table->enum('type', ['developer', 'client']);
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}

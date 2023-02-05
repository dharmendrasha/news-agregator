<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_feed', function (Blueprint $table){
            $table->id();
            $table->foreignIdFor(User::class, 'user_id')->unsigned()->unique()->constrained();
            $table->string('default_source')->nullable();
            $table->string('default_category')->nullable();
            $table->string('default_author')->nullable();
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
        Schema::dropIfExists('user_feed');
    }
};

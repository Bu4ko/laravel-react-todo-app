<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTodoListItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('todo_list_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('list_id');
            $table->foreign('list_id')->references('id')->on('todo_lists');
            $table->string('title');
            $table->text('description');
            $table->enum('status', ['not_complete', 'complete']);
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
        Schema::dropIfExists('todo_list_items');
    }
}

<?php declare(strict_types=1);

namespace App\Repositories;

use App\Models\TodoList;
use App\Repositories\Interfaces\TodoListRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class TodoListRepository implements TodoListRepositoryInterface
{
    public function getUserLists(int $userId): Collection
    {
        return TodoList::where('user_id', '=', $userId)->get();
    }
    public function getListByIdAndUserId(int $id, int $userId): TodoList
    {
        return TodoList::with('todoListItems')
            ->where('id', '=', $id)
            ->where('user_id', '=', $userId)
            ->first();
    }
    public function saveList(int $userId, string $name): TodoList
    {
        return TodoList::create([
            'name' => $name,
            'user_id' => $userId,
        ]);
    }
    public function deleteList(int $id, int $userId): void
    {
        TodoList::query()->where('id', '=', $id)->where('user_id', '=', $userId)->delete();
    }
}

<?php declare(strict_types=1);

namespace App\Repositories\Interfaces;

use App\Models\TodoList;
use Illuminate\Database\Eloquent\Collection;

interface TodoListRepositoryInterface
{
    public function getUserLists(int $userId): Collection;
    public function getListByIdAndUserId(int $id, int $userId): TodoList;
    public function saveList(int $userId, string $name): TodoList;
    public function deleteList(int $id, int $userId): void;
}

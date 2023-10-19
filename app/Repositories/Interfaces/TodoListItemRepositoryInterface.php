<?php declare(strict_types=1);

namespace App\Repositories\Interfaces;

use App\Enums\TodoListItemStatusEnum;
use \App\Models\TodoListItem;
use Illuminate\Database\Eloquent\Collection;

interface TodoListItemRepositoryInterface
{
    public function getListItemsByListId(int $listId): Collection;
    public function getListItemByIdWithList(int $id): TodoListItem;
    public function createListItem(
        int $listId,
        string $title,
        string $description,
        TodoListItemStatusEnum $status
    ): TodoListItem;
    public function changeListItemStatus(int $id, TodoListItemStatusEnum $status): void;
    public function deleteListItem(int $id): void;
}

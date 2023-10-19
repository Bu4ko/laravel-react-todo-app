<?php declare(strict_types=1);

namespace App\Repositories;

use App\Enums\TodoListItemStatusEnum;
use App\Models\TodoListItem;
use App\Repositories\Interfaces\TodoListItemRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class TodoListItemRepository implements TodoListItemRepositoryInterface
{
    public function getListItemsByListId(int $listId): Collection
    {
        return TodoListItem::where('list_id', '=', $listId)->get();
    }

    public function getListItemByIdWithList(int $id): TodoListItem
    {
        return TodoListItem::with('todoList')->where('id', '=', $id)->first();
    }

    public function createListItem(
        int $listId,
        string $title,
        string $description,
        TodoListItemStatusEnum $status
    ): TodoListItem
    {
        return TodoListItem::create(
            [
                'list_id' => $listId,
                'title' => $title,
                'description' => $description,
                'status' => $status,
            ]
        );
    }

    public function changeListItemStatus(int $id, TodoListItemStatusEnum $status): void
    {
        TodoListItem::where('id', '=', $id)->update([
            'status' => $status
        ]);
    }

    public function deleteListItem(int $id): void
    {
        TodoListItem::where('id', '=', $id)->delete();
    }
}

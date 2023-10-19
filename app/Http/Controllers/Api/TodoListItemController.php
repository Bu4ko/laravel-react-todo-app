<?php declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Enums\TodoListItemStatusEnum;
use App\Models\User;
use App\Repositories\Interfaces\TodoListItemRepositoryInterface;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;

class TodoListItemController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function createListItem(
        int $listId,
        Request $request,
        TodoListItemRepositoryInterface $listItemRepository
    ): JsonResponse {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
            'status' => [new Enum(TodoListItemStatusEnum::class)],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid data',
                'errors' => $validator->errors(),
            ]);
        }

        $item = $listItemRepository->createListItem(
            $listId,
            $request->title,
            $request->description,
            TodoListItemStatusEnum::from($request->status)
        );

        return response()->json(
            ['item' => $item],
            201
        );
    }

    public function setListItemStatus(
        int $listItemId,
        Request $request,
        TodoListItemRepositoryInterface $listItemRepository
    ): JsonResponse {
        $validator = Validator::make($request->all(), [
            'status' => [new Enum(TodoListItemStatusEnum::class)],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid data',
                'errors' => $validator->errors(),
            ]);
        }

        if (!$this->isUserOwnsItem($listItemId, $request->user(), $listItemRepository)) {
            return response()->json(
                ['error' => 'List item does not belong to user']
            );
        }

        $listItemRepository->changeListItemStatus($listItemId, TodoListItemStatusEnum::from($request->status));

        return response()->json(
            ['message' => 'Success']
        );
    }

    public function deleteListItem(
        int $listItemId,
        Request $request,
        TodoListItemRepositoryInterface $listItemRepository
    ): JsonResponse {
        if (!$this->isUserOwnsItem($listItemId, $request->user(), $listItemRepository)) {
            return response()->json(
                ['error' => 'List item does not belong to user']
            );
        }

        $listItemRepository->deleteListItem($listItemId);

        return response()->json(
            ['message' => 'Success']
        );
    }

    private function isUserOwnsItem(
        int $listItemId,
        User $user,
        TodoListItemRepositoryInterface $listItemRepository
    ): bool {
        $listItem = $listItemRepository->getListItemByIdWithList($listItemId);

        if ($listItem->todoList->user_id !== $user->id) {
            return false;
        }

        return true;
    }
}

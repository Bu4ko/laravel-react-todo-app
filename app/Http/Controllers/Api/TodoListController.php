<?php declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Repositories\Interfaces\TodoListRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Validator;

class TodoListController extends BaseController
{
    public function createList(Request $request, TodoListRepositoryInterface $listRepository): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid data',
                'errors' => $validator->errors(),
            ]);
        }

        $user = $request->user();

        $list = $listRepository->saveList($user->id, $request->name);

        return response()->json(
            ['list' => $list],
            201
        );
    }

    public function getLists(Request $request, TodoListRepositoryInterface $listRepository): JsonResponse
    {
        $user = $request->user();

        $lists = $listRepository->getUserLists($user->id);

        return response()->json(
            ['lists' => $lists]
        );
    }

    public function getListById(int $id,Request $request, TodoListRepositoryInterface $listRepository): JsonResponse
    {
        $user = $request->user();

        $list = $listRepository->getListByIdAndUserId($id, $user->id);

        return response()->json(
            ['list' => $list]
        );
    }

    public function deleteList(int $id, Request $request, TodoListRepositoryInterface $listRepository): JsonResponse
    {
        $user = $request->user();

        $listRepository->deleteList($id, $user->id);

        return response()->json(
            ['message' => 'Success']
        );
    }
}

<?php declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends BaseController
{
    public function create(Request $request, UserRepositoryInterface $userRepository): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid data',
                'errors' => $validator->errors(),
            ]);
        }

        $user = $userRepository->createUser($request->name, $request->email, $request->password);

        return response()->json(
            [
                'user' => $user,
                'access_token' => $user->createToken('api-token')->plainTextToken,
            ],
            201
        );
    }
}

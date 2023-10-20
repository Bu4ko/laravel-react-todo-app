<?php declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginController extends BaseController
{
    public function index(Request $request, UserRepositoryInterface $userRepository): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid credentials',
                'errors' => $validator->errors(),
            ], 401);
        }

        $user = $userRepository->findUserByEmail($request->email);

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials',
            ]);
        }

        return response()->json([
            'user' => $user,
            'access_token' => $user->createToken('api-token')->plainTextToken,
        ]);
    }
}

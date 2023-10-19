<?php declare(strict_types=1);

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{
    public function findUserByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }
    public function createUser(string $name, string $email, string $password): User
    {
        $hashedPassword = Hash::make($password);

        return User::create([
            'name' => $name,
            'email' => $email,
            'password' => $hashedPassword,
        ]);
    }
}

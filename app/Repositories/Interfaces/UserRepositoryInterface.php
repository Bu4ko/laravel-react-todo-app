<?php declare(strict_types=1);

namespace App\Repositories\Interfaces;

use App\Models\User;

interface UserRepositoryInterface
{
    public function findUserByEmail(string $email): ?User;
    public function createUser(string $name, string $email, string $password): User;
}

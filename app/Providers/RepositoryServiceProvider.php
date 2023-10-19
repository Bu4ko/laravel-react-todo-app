<?php declare(strict_types=1);

namespace App\Providers;

use App\Repositories\Interfaces\TodoListItemRepositoryInterface;
use App\Repositories\Interfaces\TodoListRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Repositories\TodoListItemRepository;
use App\Repositories\TodoListRepository;
use App\Repositories\UserRepository;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(TodoListItemRepositoryInterface::class, TodoListItemRepository::class);
        $this->app->bind(TodoListRepositoryInterface::class, TodoListRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
    }
}

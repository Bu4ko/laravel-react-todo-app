<?php declare(strict_types=1);

namespace App\Enums;

enum TodoListItemStatusEnum: string
{
    case NotCompleted = 'not_complete';
    case Completed = 'complete';
}

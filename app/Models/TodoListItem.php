<?php declare(strict_types=1);

namespace App\Models;

use App\Enums\TodoListItemStatusEnum;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $title
 * @property string $description
 * @property TodoListItemStatusEnum $status
 * @property int $list_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property-read TodoList $todoList
 */
class TodoListItem extends Model
{
    use HasTimestamps;

    protected $table = 'todo_list_items';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'list_id',
        'title',
        'description',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => TodoListItemStatusEnum::class,
    ];

    public function todoList(): BelongsTo
    {
        return $this->belongsTo(TodoList::class, 'list_id', 'id');
    }
}

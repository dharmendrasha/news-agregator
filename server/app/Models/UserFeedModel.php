<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserFeedModel extends Model
{
    use HasFactory;

    protected $table = 'user_feed';

    protected $fillable = [
        'user_id',
        'default_source',
        'default_category',
        'default_author',
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

}

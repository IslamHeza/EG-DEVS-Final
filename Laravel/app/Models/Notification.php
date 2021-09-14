<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = [
        'user_id',
        'purposal_id',
        'message',
    ];

    public function user(){
        return $this->belongsTo(User::class , 'user_id');
    }
    public function purposal (){
        return $this->belongsTo(User::class , 'purposal_id');
    }

}

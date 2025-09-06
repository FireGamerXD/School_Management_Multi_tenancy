<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $primaryKey = 'student_id';
    protected $fillable = [
        'tenant_id',
        'group_id',
        'student_id',
        'first_name',
        'last_name',
        'email',
        'phone_number',
    ];

    public $timestamps = false;

    public function group()
    {
        return $this->belongsTo(Group::class, 'group_id', 'group_id');
    }
}

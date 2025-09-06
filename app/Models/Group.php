<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    //
    use HasFactory;

    protected $primaryKey = 'group_id';
    protected $fillable = [
        'tenant_id',
        'level_id',
        'group_name',
    ];

    public $timestamps = false;


    public function level()
    {
        return $this->belongsTo(Level::class, 'level_id', 'level_id');
    }

    public function students()
    {
        return $this->hasMany(Student::class, 'group_id', 'group_id');
    }


}

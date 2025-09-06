<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory;

    protected $primaryKey = 'staff_id'; 
    protected $fillable = [
        'tenant_id',
        'first_name',
        'last_name',
        'carte_national',
        'phone_number',
        'post_name',
    ];

    public $timestamps = false;

}

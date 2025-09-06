<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    use HasFactory;

    protected $primaryKey = 'tenant_id';
    protected $fillable = [
        'school_name',
        'address',
        'contact_number',
        'signing_in_date',
        'signing_out_date',
    ];

    public $timestamps = false;


    public function groups(){
        return $this->hasMany(Group::class , 'tenant_id', 'tenant_id');
    }

    
}

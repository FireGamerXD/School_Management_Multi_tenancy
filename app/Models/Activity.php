<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{

    use HasFactory;
    
    protected $primaryKey = 'activity_id';

    protected $fillable = [
        'tenant_id',
        'activity_name',
        'description',
        'localisation',
        // 'pdf_file'
    ];

    public $timestamps = false;
}

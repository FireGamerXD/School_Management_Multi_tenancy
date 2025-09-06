<?php

namespace App\Http\Controllers;

use App\Models\Level;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SchoolController extends Controller
{
    public function index(){
        $schools = Tenant::orderBy('created_at' , 'desc')->get();
        return Inertia::render('schools', [
            'schools' => $schools,
        ]);
    }

public function store(Request $request)
{
    $data = $request->validate([
        'school_name' => 'required',
        'address' => 'required',
        'contact_number' => 'required',
        // level selected added feature
        // 'selected_levels' => 'required|array|min:1',
        // 'selected_levels.*' => 'in:Maternelle,Primaire,Collège,Lycée',
    ]);

    $school = Tenant::create([
        'school_name' => $data['school_name'],
        'address' => $data['address'],
        'contact_number' => $data['contact_number'],
    ]);

    // second

    // foreach ($data['selected_levels'] as $type) {
    //     $levels = Level::where('tenant_id', 0)->where('type', $type)->get();
    //     foreach ($levels as $level) {
    //         Level::create([
    //             'tenant_id' => $school->tenant_id,
    //             'level_name' => $level->level_name,
    //             'type' => $level->type,
    //         ]);
    //     }
    // }

    return redirect()->route('schools.index');
}




    public function update(Request $request, $id){
        $school = Tenant::findOrFail($id);
        $data = $request->validate([
            'school_name' => 'required',
            'address' => 'required',
            'contact_number' => 'required'
        ]);

        $school->update($data);
        return redirect()->route('schools.index');
    }

            public function assignLevelsToSchool($tenantId, $selectedType)
        {
            $globalLevels = Level::where('tenant_id', 0)->where('type', $selectedType)->get();

            foreach ($globalLevels as $level) {
                Level::create([
                    'tenant_id' => $tenantId,
                    'level_name' => $level->level_name,
                    'type' => $level->type,
                ]);
            }
        }
}

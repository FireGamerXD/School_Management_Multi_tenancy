<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssignDirectorController extends Controller
{
    public function index(){
        $directors = User::where('role', 'Director')->get();
        $schools = Tenant::all();
        $directorAssignements = $directors->map(function ($director) use ($schools){
            $school = $director->tenant_id
                ? $schools->firstWhere('tenant_id', $director->tenant_id) : null;
            return [
                'id' => $director->id,
                'name' => $director->name,
                'email' => $director->email,
                'is_active' => $director->is_active,
                'school' => $school ? [
                    'tenant_id' => $school->tenant_id,
                    'school_name' => $school->school_name
                ] : null,
            ];
        });

        $schoolAssignements = $schools->map(function ($school) use ($directors){
            $director = $directors->firstWhere('tenant_id', $school->tenant_id);
            return [
                'tenant_id' => $school->tenant_id,
                'school_name' => $school->school_name,
                'director' => $director ? [
                    'id' => $director->id,
                    'name' => $director->name,
                    'email' => $director->email,
                ] : null
            ];
        });

        return Inertia::render('assign-director', [
            'Directors' => $directorAssignements,
            'Schools' => $schoolAssignements,
        ]);
    } 

    public function assign (Request $request, $directorId){
        $request->validate([
            'tenant_id' => 'required',
        ]);

        $director = User::where('role', 'Director')->findOrFail($directorId);
        $director->tenant_id = $request->tenant_id;
        $director->save();
        return redirect()->route('assign-director');
    }

    public function unassign($directorId){
        $director = User::where('role', 'Director')->findOrFail($directorId);
        $director->tenant_id = null;
        $director->save();

        return redirect()->route('assign-director');
    }


    public function toggleActive($id){
        $user = User::findOrFail($id);
        $user->is_active = !$user->is_active;
        $user-> save();

        return back()->with ('success' , 'user status updated');
    }

}

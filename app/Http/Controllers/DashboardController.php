<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Level;
use App\Models\Student;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
public function index(Request $request){
    $user = $request->user();

    if ($user->role === 'Founder') {
        $schools = Tenant::with(['groups'])->get();
        $totalSchools = $schools->count();
        $totalGroups = Group::count();
        $totalDirectors = User::where('role' , 'Director')->count();
        $totalStudents = Student::count();
        $totalLevels = Level::count();

        return Inertia::render('dashboard', [
            'isFounder' => true,
            'schools' => $schools,
            'totalSchools' => $totalSchools,
            'totalGroups' => $totalGroups,
            'totalLevels' => $totalLevels,
            'totalDirectors' => $totalDirectors,
            'totalStudents' => $totalStudents,
        ]);
    }

    $tenantId = $user->tenant_id;
    // edit here school
    $school = Tenant::with('groups')->where('tenant_id' , $tenantId)->first();
    $totalStudents = Student::where('tenant_id' , $tenantId)->count();
    // edit here also for groups
    $groupsCount = $school && $school->groups ? $school->groups->count() : 0;
    $totalLevels = Level::where('tenant_id' , $tenantId)->count();

    return Inertia::render('dashboard' , [
        'isFounder' => false,
        'school' => $school,
        'totalStudents' => $totalStudents,
        'totalGroups' => $groupsCount,
        'totalLevels' => $totalLevels,
    ]);
}

}

<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Group;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    //

    public function index(Request $request){
        $user = $request->user();
        $students = Student::where('tenant_id' , $user->tenant_id)->get();
        $groups = Group::where('tenant_id' , $user->tenant_id)->get();

        return Inertia::render('students/index', [
            'students' => $students,
            'groups' => $groups,
            'tenant_id' => $user->tenant_id
        ]);
    }


    public function store (Request $request){
        $user = $request->user();
        $data = $request->all();
        $data['tenant_id'] = $user->tenant_id;
        Student::create($data);
        $students = Student::where('tenant_id' , $user->tenant_id)->get();
        $groups = Group::where('tenant_id' , $user->tenant_id)->get();
        return Inertia::render('students/index' , [
            'students' => $students,
            'groups' => $groups,
            'tenant_id' => $user->tenant_id
        ]);
    }
    
    public function show($id){
        return response()->json(Student::findOrFail($id));
    }

    public function update(Request $request , $id){

        $user = $request->user();
        $student = Student::findOrFail($id);
        $student->update($request->all());
        $groups = Group::where('tenant_id' , $user->tenant_id)->get();

        $students = Student::where('tenant_id' , $user->tenant_id)->get();
        
        return Inertia::render('students/index', [
            'students' => $students,
            'groups' => $groups,
            'tenant_id' => $user->tenant_id
        ]);
    }

    public function destroy ($id){
        $user = request()->user();
        Student::destroy($id);
        $students = Student::where('tenant_id', $user->tenant_id)->get();
        $groups = Group::where('tenant_id' , $user->tenant_id)->get();

        return Inertia::render('students/index' , [
            'students' => $students,
            'groups' => $groups,
            'tenant_id' => $user->tenant_id
        ]);
    }

    // Activity show

    public function activities()
    {
        $user = request()->user();

        // Fetch activities for the tenant
        $activities = Activity::where('tenant_id', $user->tenant_id)->get();

        // Return Inertia response with activities
        return Inertia::render('students/activity-show', [
            'activities' => $activities,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    //
    public function index (){
        $user = request()->user();
        $activities = Activity::where('tenant_id' , $user->tenant_id)->get();

        return Inertia::render('activities/index' , [
            'activities' => $activities,
        ]);
    }

    public function store (Request $request){
        $validated = $request->validate([
            'activity_name' => 'required',
            'description'=> 'nullable|max:200',
            'localisation' =>'required',
            // 'pdf_file' => 'nullable|mimes:pdf|max:2048'
        ]);

        Activity::create([
            'tenant_id' => $request->user()->tenant_id,
            ...$validated,
        ]);

        return redirect()->back()->with('success', 'Activity created successfully.');
    }

    public function update(Request $request , $id){
        $user = $request->user();
        $activity = Activity::where('tenant_id' , $user->tenant_id)->findOrFail($id);
    
        $validated = $request->validate([
            'activity_name' => 'required',
            'description'=> 'nullable|max:200',
            'localisation' =>'required',
            // 'pdf_file' => 'nullable|mimes:pdf|max:2048'
        ]);

        $activity->update($validated);

        return redirect()->back()->with('success', 'Activity updated successfully.');
    }

    public function destroy(Request $request , $id) {
        $user = $request->user();
        $activity = Activity::where('tenant_id' , $user->tenant_id)->findOrFail($id);

        $activity->delete();

        return redirect()->back();
    
    }
}

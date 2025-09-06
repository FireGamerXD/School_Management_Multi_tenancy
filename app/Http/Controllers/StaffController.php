<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function index(Request $request){
        $user = $request->user();
        $staffs = Staff::where('tenant_id' , $user->tenant_id)->get();

        return Inertia::render('staffs/index' , [
            'staffs' => $staffs,
            'tenant_id' => $user->tenant_id
        ]);
    }

    public function store(Request $request){
        $user = $request->user();

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'carte_national' => 'required|string|max:100',
            'phone_number' => 'required|string|max:20',
            'post_name' => 'required|string|max:100',
        ]);

        $validated['tenant_id'] = $user->tenant_id;
        Staff::create($validated);
        return redirect()->route('staffs.index')->with('success', 'Staff created successfully.');
    }


}

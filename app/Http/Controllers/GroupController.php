<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Level;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GroupController extends Controller
{
    //

public function index(Request $request)
{
    $user = $request->user();

    // Eager load 'level' relation
    $groups = Group::with('level')->get();
    return Inertia::render('groups/index', [
        'groups' => $groups,
        'levels' => Level::where('tenant_id', $user->tenant_id)->get(),
        'tenant_id' => $user->tenant_id,
    ]);
}



    public function store(Request $request)
    {
        $request->validate([
            'group_name' => 'required|string|max:255',
            'level_id' => 'required|integer|exists:levels,level_id',
        ]);

        $user = $request->user();

        Group::create([
            'tenant_id' => $user->tenant_id,
            'group_name' => $request->group_name,  // <--- here must be group_name, not level_name!
            'level_id' => $request->level_id,
        ]);

        return redirect()->back()->with('success', 'Class created successfully.');
    }


    public function update(Request $request, $id)
    {
        $user = $request->user();

        $request->validate([
            'group_name' => 'required|string|max:255',
            'level_id' => 'required|integer|exists:levels,level_id',
        ]);

        $group = Group::where('tenant_id', $user->tenant_id)->findOrFail($id);

        $group->update([
            'group_name' => $request->group_name,
            'level_id' => $request->level_id,
        ]);

        return redirect()->back()->with('success', 'Group updated successfully.');
    }




    public function destroy(Request $request, $id)
    {
        $group = Group::where('tenant_id', $request->user()->tenant_id)->findOrFail($id);

        $group->delete();

        return redirect()->back()->with('success', 'Group deleted successfully.');
    }

}

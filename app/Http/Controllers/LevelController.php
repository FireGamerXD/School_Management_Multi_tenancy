<?php

namespace App\Http\Controllers;

use App\Models\Level;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LevelController extends Controller
{
    /**
     * Display a listing of the levels for the authenticated user's tenant.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $levels = Level::where('tenant_id', $user->tenant_id)->get();

        return Inertia::render('levels/index', [
            'levels' => $levels,
            'tenant_id' => $user->tenant_id,
        ]);
    }

    /**
     * Store a newly created level for the tenant.
     */
    public function store(Request $request)
    {
        $request->validate([
            'level_name' => 'required|string|max:255',
            'type' => 'required|in:Maternelle,Primaire,Collège,Lycée',
        ]);

        $user = $request->user();

        Level::create([
            'tenant_id' => $user->tenant_id,
            'level_name' => $request->level_name,
            'type' => $request->type,
        ]);

        return redirect()->back()->with('success', 'Level created successfully.');
    }

    /**
     * Update the specified level.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'level_name' => 'required|string|max:255',
            'type' => 'required|in:Maternelle,Primaire,Collège,Lycée',
        ]);

        $level = Level::findOrFail($id);

        $level->update([
            'level_name' => $request->level_name,
            'type' => $request->type,
        ]);

        return redirect()->back()->with('success', 'Level updated successfully.');
    }

    /**
     * Remove the specified level.
     */
    public function destroy(Request $request, $id)
    {
        $level = Level::where('tenant_id', $request->user()->tenant_id)->findOrFail($id);

        $level->delete();

        return redirect()->back()->with('success', 'Level deleted successfully.');
    }
}

<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AssignDirectorController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\SortieScolaireController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class , 'index'])->name('dashboard');
    Route::resource('schools', SchoolController::class)->only(['index', 'store', 'update']);
    Route::get('/assign-director' , [AssignDirectorController::class , 'index'])->name('assign-director');
    Route::post('/assign-director/{Director}/assign' , [AssignDirectorController::class , 'assign'])->name('assign-director.assign');
    Route::post('/assign-director/{Director}/unassign' , [AssignDirectorController::class , 'unassign'])->name('assign-director.unassign');
    Route::post('/users/{id}/toggle-active' , [AssignDirectorController::class , 'toggleActive'])->name('users.toggleActive');
    Route::get('/levels', [LevelController::class, 'index'])->name('levels.index');
    Route::post('/levels', [LevelController::class, 'store'])->name('levels.store');
    Route::put('/levels/{id}', [LevelController::class, 'update'])->name('levels.update');
    Route::delete('/levels/{id}', [LevelController::class, 'destroy'])->name('levels.destroy');
    Route::get('/groups', [GroupController::class, 'index'])->name('groups.index');
    Route::post('/groups', [GroupController::class, 'store'])->name('groups.store');
    Route::put('/groups/{group}', [GroupController::class, 'update'])->name('groups.update');
    Route::delete('/groups/{group}', [GroupController::class, 'destroy'])->name('groups.destroy');
    Route::get('/students', [StudentController::class, 'index'])->name('students.index');
    Route::post('/students', [StudentController::class, 'store'])->name('students.store');
    Route::put('/students/{student}', [StudentController::class, 'update'])->name('students.update');
    Route::delete('/students/{student}', [StudentController::class, 'destroy'])->name('students.destroy');
    Route::get('/staffs', [StaffController::class, 'index'])->name('staffs.index');
    Route::post('/staffs', [StaffController::class, 'store'])->name('staffs.store');
    Route::get('/activities', [ActivityController::class, 'index'])->name('activities.index');
    Route::post('/activities', [ActivityController::class, 'store'])->name('activities.store');
    Route::put('/activities/{id}', [ActivityController::class, 'update']);
    Route::delete('/activities/{id}', [ActivityController::class, 'destroy']);
    // new student activity show :
    Route::get('/students/activities', [StudentController::class, 'activities'])->name('students.activities');
    // Route::put('/staffs/{id}', [StaffController::class, 'update'])->name('staffs.update');
    // Route::delete('/staffs/{id}', [StaffController::class, 'destroy'])->name('staffs.destroy');
    // Route::put('/sortiescolaire/{id}', [SortieScolaireController::class, 'update'])->name('sortiescolaire.update'); // Optional
    // Route::delete('/sortiescolaire/{id}', [SortieScolaireController::class, 'destroy'])->name('sortiescolaire.destroy'); // Optional
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

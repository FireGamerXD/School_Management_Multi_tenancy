<?php

namespace Database\Seeders;

use App\Models\Level;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LevelsSeeder extends Seeder
{
    public function run(): void
    {
        $levels = [
            'Maternelle' => [
                'Petite section (PS)',
                'Moyenne section (MS)',
                'Grande section (GS)',
            ],
            'Primaire' => [
                '1ère année (CP – Cours préparatoire)',
                '2ème année (CE1)',
                '3ème année (CE2)',
                '4ème année (CM1)',
                '5ème année (CM2)',
                '6ème année',
            ],
            'Collège' => [
                '1ère année collège (7th grade)',
                '2ème année collège (8th grade)',
                '3ème année collège (9th grade)',
            ],
            'Lycée' => [
                'Tronc Commun',
                '1ère année Baccalauréat (1BAC)',
                '2ème année Baccalauréat (2BAC)',
            ]
        ];

        foreach ($levels as $type => $levelNames) {
            foreach ($levelNames as $name) {
                Level::create([
                    'tenant_id' => 0, // Reserved global levels, not assigned yet
                    'level_name' => $name,
                    'type' => $type,
                ]);
            }
        }
    }
}
<?php

namespace App\DataFixtures;

use App\Entity\Agent;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AgentFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $agents = [
            [
                'name'  => 'Brimstone',
                'role'  => 'Contrôleur',
                'image' => 'path/to/brimstone_image.png',
            ],
            [
                'name'  => 'Phoenix',
                'role'  => 'Duelliste',
                'image' => 'path/to/phoenix_image.png',
            ],
            [
                'name'  => 'Sage',
                'role'  => 'Sentinelle',
                'image' => 'path/to/sage_image.png',
            ],
            [
                'name'  => 'Sova',
                'role'  => 'Initiateur',
                'image' => 'path/to/sova_image.png',
            ],
            [
                'name'  => 'Viper',
                'role'  => 'Contrôleur',
                'image' => 'path/to/viper_image.png',
            ],
            [
                'name'  => 'Cypher',
                'role'  => 'Sentinelle',
                'image' => 'path/to/cypher_image.png',
            ],
            [
                'name'  => 'Reyna',
                'role'  => 'Duelliste',
                'image' => 'path/to/reyna_image.png',
            ],
            [
                'name'  => 'Killjoy',
                'role'  => 'Sentinelle',
                'image' => 'path/to/killjoy_image.png',
            ],
            [
                'name'  => 'Breach',
                'role'  => 'Initiateur',
                'image' => 'path/to/breach_image.png',
            ],
            [
                'name'  => 'Omen',
                'role'  => 'Contrôleur',
                'image' => 'path/to/omen_image.png',
            ],
            [
                'name'  => 'Jett',
                'role'  => 'Duelliste',
                'image' => 'path/to/jett_image.png',
            ],
            [
                'name'  => 'Raze',
                'role'  => 'Duelliste',
                'image' => 'path/to/raze_image.png',
            ],
            [
                'name'  => 'Skye',
                'role'  => 'Initiateur',
                'image' => 'path/to/skye_image.png',
            ],
            [
                'name'  => 'Yoru',
                'role'  => 'Duelliste',
                'image' => 'path/to/yoru_image.png',
            ],
            [
                'name'  => 'Astra',
                'role'  => 'Contrôleur',
                'image' => 'path/to/astra_image.png',
            ],
            [
                'name'  => 'KAY/O',
                'role'  => 'Initiateur',
                'image' => 'path/to/kayo_image.png',
            ],
            [
                'name'  => 'Chamber',
                'role'  => 'Sentinelle',
                'image' => 'path/to/chamber_image.png',
            ],
            [
                'name'  => 'Neon',
                'role'  => 'Duelliste',
                'image' => 'path/to/neon_image.png',
            ],
            [
                'name'  => 'Fade',
                'role'  => 'Initiateur',
                'image' => 'path/to/fade_image.png',
            ],
            [
                'name'  => 'Harbor',
                'role'  => 'Contrôleur',
                'image' => 'path/to/harbor_image.png',
            ],
            [
                'name'  => 'Gekko',
                'role'  => 'Initiateur',
                'image' => 'path/to/gekko_image.png',
            ],
            [
                'name'  => 'Deadlock',
                'role'  => 'Sentinelle',
                'image' => 'path/to/deadlock_image.png',
            ],
            [
                'name'  => 'Iso',
                'role'  => 'Duelliste',
                'image' => 'path/to/iso_image.png',
            ],
            [
                'name'  => 'Clove',
                'role'  => 'Contrôleur',
                'image' => 'path/to/clove_image.png',
            ],
            [
                'name'  => 'Vyse',
                'role'  => 'Sentinelle',
                'image' => 'path/to/vyse_image.png',
            ],

        ];

        foreach ($agents as $data) {
            $agent = new Agent();
            $agent->setName($data['name']);
            $agent->setRole($data['role']);
            $agent->setImage($data['image']);

            $manager->persist($agent);
        }

        $manager->flush();
    }
}

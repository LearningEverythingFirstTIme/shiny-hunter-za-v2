import type { Pokemon } from '$lib/types';
import { EV_DATA } from './ev-data';

export const SPRITE_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

export function getSpriteUrl(nationalId: number): string {
	return `${SPRITE_BASE}/${nationalId}.png`;
}

export function getShinySpriteUrl(nationalId: number): string {
	return `${SPRITE_BASE}/shiny/${nationalId}.png`;
}

// Helper function to format EVs for display
export function formatEVs(evs?: { hp?: number; attack?: number; defense?: number; specialAttack?: number; specialDefense?: number; speed?: number }): string {
	if (!evs) return '';
	const parts: string[] = [];
	if (evs.hp) parts.push(`+${evs.hp} HP`);
	if (evs.attack) parts.push(`+${evs.attack} Attack`);
	if (evs.defense) parts.push(`+${evs.defense} Defense`);
	if (evs.specialAttack) parts.push(`+${evs.specialAttack} Sp. Attack`);
	if (evs.specialDefense) parts.push(`+${evs.specialDefense} Sp. Defense`);
	if (evs.speed) parts.push(`+${evs.speed} Speed`);
	return parts.join(', ');
}

// Lumiose Pokédex — all 232 Pokémon available in Pokémon Legends: Z-A
// id = Lumiose Pokédex number, nationalId = National Pokédex number
export const POKEMON: Pokemon[] = [
	// ── Starters ────────────────────────────────────────────────────────────
	{ id: 1,   nationalId: 152, name: 'Chikorita',    types: ['Grass'], evs: EV_DATA['Chikorita'] },
	{ id: 2,   nationalId: 153, name: 'Bayleef',      types: ['Grass'], evs: EV_DATA['Bayleef'] },
	{ id: 3,   nationalId: 154, name: 'Meganium',     types: ['Grass'], evs: EV_DATA['Meganium'] },
	{ id: 4,   nationalId: 498, name: 'Tepig',        types: ['Fire'], evs: EV_DATA['Tepig'] },
	{ id: 5,   nationalId: 499, name: 'Pignite',      types: ['Fire', 'Fighting'], evs: EV_DATA['Pignite'] },
	{ id: 6,   nationalId: 500, name: 'Emboar',       types: ['Fire', 'Fighting'], evs: EV_DATA['Emboar'] },
	{ id: 7,   nationalId: 158, name: 'Totodile',     types: ['Water'], evs: EV_DATA['Totodile'] },
	{ id: 8,   nationalId: 159, name: 'Croconaw',     types: ['Water'], evs: EV_DATA['Croconaw'] },
	{ id: 9,   nationalId: 160, name: 'Feraligatr',   types: ['Water'], evs: EV_DATA['Feraligatr'] },
	// ── Early Routes ────────────────────────────────────────────────────────
	{ id: 10,  nationalId: 661, name: 'Fletchling',   types: ['Normal', 'Flying'], evs: EV_DATA['Fletchling'] },
	{ id: 11,  nationalId: 662, name: 'Fletchinder',  types: ['Fire', 'Flying'], evs: EV_DATA['Fletchinder'] },
	{ id: 12,  nationalId: 663, name: 'Talonflame',   types: ['Fire', 'Flying'], evs: EV_DATA['Talonflame'] },
	{ id: 13,  nationalId: 659, name: 'Bunnelby',     types: ['Normal'], evs: EV_DATA['Bunnelby'] },
	{ id: 14,  nationalId: 660, name: 'Diggersby',    types: ['Normal', 'Ground'], evs: EV_DATA['Diggersby'] },
	{ id: 15,  nationalId: 664, name: 'Scatterbug',   types: ['Bug'], evs: EV_DATA['Scatterbug'] },
	{ id: 16,  nationalId: 665, name: 'Spewpa',       types: ['Bug'], evs: EV_DATA['Spewpa'] },
	{ id: 17,  nationalId: 666, name: 'Vivillon',     types: ['Bug', 'Flying'], evs: EV_DATA['Vivillon'] },
	{ id: 18,  nationalId: 13,  name: 'Weedle',       types: ['Bug', 'Poison'], evs: EV_DATA['Weedle'] },
	{ id: 19,  nationalId: 14,  name: 'Kakuna',       types: ['Bug', 'Poison'], evs: EV_DATA['Kakuna'] },
	{ id: 20,  nationalId: 15,  name: 'Beedrill',     types: ['Bug', 'Poison'], evs: EV_DATA['Beedrill'] },
	{ id: 21,  nationalId: 16,  name: 'Pidgey',       types: ['Normal', 'Flying'], evs: EV_DATA['Pidgey'] },
	{ id: 22,  nationalId: 17,  name: 'Pidgeotto',    types: ['Normal', 'Flying'], evs: EV_DATA['Pidgeotto'] },
	{ id: 23,  nationalId: 18,  name: 'Pidgeot',      types: ['Normal', 'Flying'], evs: EV_DATA['Pidgeot'] },
	{ id: 24,  nationalId: 179, name: 'Mareep',       types: ['Electric'], evs: EV_DATA['Mareep'] },
	{ id: 25,  nationalId: 180, name: 'Flaaffy',      types: ['Electric'], evs: EV_DATA['Flaaffy'] },
	{ id: 26,  nationalId: 181, name: 'Ampharos',     types: ['Electric'], evs: EV_DATA['Ampharos'] },
	{ id: 27,  nationalId: 504, name: 'Patrat',       types: ['Normal'], evs: EV_DATA['Patrat'] },
	{ id: 28,  nationalId: 505, name: 'Watchog',      types: ['Normal'], evs: EV_DATA['Watchog'] },
	{ id: 29,  nationalId: 406, name: 'Budew',        types: ['Grass', 'Poison'], evs: EV_DATA['Budew'] },
	{ id: 30,  nationalId: 315, name: 'Roselia',      types: ['Grass', 'Poison'], evs: EV_DATA['Roselia'] },
	{ id: 31,  nationalId: 407, name: 'Roserade',     types: ['Grass', 'Poison'], evs: EV_DATA['Roserade'] },
	{ id: 32,  nationalId: 129, name: 'Magikarp',     types: ['Water'], evs: EV_DATA['Magikarp'] },
	{ id: 33,  nationalId: 130, name: 'Gyarados',     types: ['Water', 'Flying'], evs: EV_DATA['Gyarados'] },
	{ id: 34,  nationalId: 688, name: 'Binacle',      types: ['Rock', 'Water'], evs: EV_DATA['Binacle'] },
	{ id: 35,  nationalId: 689, name: 'Barbaracle',   types: ['Rock', 'Water'], evs: EV_DATA['Barbaracle'] },
	{ id: 36,  nationalId: 120, name: 'Staryu',       types: ['Water'], evs: EV_DATA['Staryu'] },
	{ id: 37,  nationalId: 121, name: 'Starmie',      types: ['Water', 'Psychic'], evs: EV_DATA['Starmie'] },
	{ id: 38,  nationalId: 669, name: 'Flabébé',      types: ['Fairy'], evs: EV_DATA['Flabébé'] },
	{ id: 39,  nationalId: 670, name: 'Floette',      types: ['Fairy'], evs: EV_DATA['Floette'] },
	{ id: 40,  nationalId: 671, name: 'Florges',      types: ['Fairy'], evs: EV_DATA['Florges'] },
	{ id: 41,  nationalId: 672, name: 'Skiddo',       types: ['Grass'], evs: EV_DATA['Skiddo'] },
	{ id: 42,  nationalId: 673, name: 'Gogoat',       types: ['Grass'], evs: EV_DATA['Gogoat'] },
	{ id: 43,  nationalId: 677, name: 'Espurr',       types: ['Psychic'], evs: EV_DATA['Espurr'] },
	{ id: 44,  nationalId: 678, name: 'Meowstic',     types: ['Psychic'], evs: EV_DATA['Meowstic'] },
	{ id: 45,  nationalId: 667, name: 'Litleo',       types: ['Fire', 'Normal'], evs: EV_DATA['Litleo'] },
	{ id: 46,  nationalId: 668, name: 'Pyroar',       types: ['Fire', 'Normal'], evs: EV_DATA['Pyroar'] },
	{ id: 47,  nationalId: 674, name: 'Pancham',      types: ['Fighting'], evs: EV_DATA['Pancham'] },
	{ id: 48,  nationalId: 675, name: 'Pangoro',      types: ['Fighting', 'Dark'], evs: EV_DATA['Pangoro'] },
	{ id: 49,  nationalId: 568, name: 'Trubbish',     types: ['Poison'], evs: EV_DATA['Trubbish'] },
	{ id: 50,  nationalId: 569, name: 'Garbodor',     types: ['Poison'], evs: EV_DATA['Garbodor'] },
	{ id: 51,  nationalId: 702, name: 'Dedenne',      types: ['Electric', 'Fairy'], evs: EV_DATA['Dedenne'] },
	{ id: 52,  nationalId: 172, name: 'Pichu',        types: ['Electric'], evs: EV_DATA['Pichu'] },
	{ id: 53,  nationalId: 25,  name: 'Pikachu',      types: ['Electric'], evs: EV_DATA['Pikachu'] },
	{ id: 54,  nationalId: 26,  name: 'Raichu',       types: ['Electric'], evs: EV_DATA['Raichu'] },
	{ id: 55,  nationalId: 173, name: 'Cleffa',       types: ['Fairy'], evs: EV_DATA['Cleffa'] },
	{ id: 56,  nationalId: 35,  name: 'Clefairy',     types: ['Fairy'], evs: EV_DATA['Clefairy'] },
	{ id: 57,  nationalId: 36,  name: 'Clefable',     types: ['Fairy'], evs: EV_DATA['Clefable'] },
	{ id: 58,  nationalId: 167, name: 'Spinarak',     types: ['Bug', 'Poison'], evs: EV_DATA['Spinarak'] },
	{ id: 59,  nationalId: 168, name: 'Ariados',      types: ['Bug', 'Poison'], evs: EV_DATA['Ariados'] },
	{ id: 60,  nationalId: 23,  name: 'Ekans',        types: ['Poison'], evs: EV_DATA['Ekans'] },
	{ id: 61,  nationalId: 24,  name: 'Arbok',        types: ['Poison'], evs: EV_DATA['Arbok'] },
	{ id: 62,  nationalId: 63,  name: 'Abra',         types: ['Psychic'], evs: EV_DATA['Abra'] },
	{ id: 63,  nationalId: 64,  name: 'Kadabra',      types: ['Psychic'], evs: EV_DATA['Kadabra'] },
	{ id: 64,  nationalId: 65,  name: 'Alakazam',     types: ['Psychic'], evs: EV_DATA['Alakazam'] },
	{ id: 65,  nationalId: 92,  name: 'Gastly',       types: ['Ghost', 'Poison'], evs: EV_DATA['Gastly'] },
	{ id: 66,  nationalId: 93,  name: 'Haunter',      types: ['Ghost', 'Poison'], evs: EV_DATA['Haunter'] },
	{ id: 67,  nationalId: 94,  name: 'Gengar',       types: ['Ghost', 'Poison'], evs: EV_DATA['Gengar'] },
	{ id: 68,  nationalId: 543, name: 'Venipede',     types: ['Bug', 'Poison'], evs: EV_DATA['Venipede'] },
	{ id: 69,  nationalId: 544, name: 'Whirlipede',   types: ['Bug', 'Poison'], evs: EV_DATA['Whirlipede'] },
	{ id: 70,  nationalId: 545, name: 'Scolipede',    types: ['Bug', 'Poison'], evs: EV_DATA['Scolipede'] },
	// ── Kalos Core ──────────────────────────────────────────────────────────
	{ id: 71,  nationalId: 679, name: 'Honedge',      types: ['Steel', 'Ghost'], evs: EV_DATA['Honedge'] },
	{ id: 72,  nationalId: 680, name: 'Doublade',     types: ['Steel', 'Ghost'], evs: EV_DATA['Doublade'] },
	{ id: 73,  nationalId: 681, name: 'Aegislash',    types: ['Steel', 'Ghost'], evs: EV_DATA['Aegislash'] },
	{ id: 74,  nationalId: 69,  name: 'Bellsprout',   types: ['Grass', 'Poison'], evs: EV_DATA['Bellsprout'] },
	{ id: 75,  nationalId: 70,  name: 'Weepinbell',   types: ['Grass', 'Poison'], evs: EV_DATA['Weepinbell'] },
	{ id: 76,  nationalId: 71,  name: 'Victreebel',   types: ['Grass', 'Poison'], evs: EV_DATA['Victreebel'] },
	{ id: 77,  nationalId: 511, name: 'Pansage',      types: ['Grass'], evs: EV_DATA['Pansage'] },
	{ id: 78,  nationalId: 512, name: 'Simisage',     types: ['Grass'], evs: EV_DATA['Simisage'] },
	{ id: 79,  nationalId: 513, name: 'Pansear',      types: ['Fire'], evs: EV_DATA['Pansear'] },
	{ id: 80,  nationalId: 514, name: 'Simisear',     types: ['Fire'], evs: EV_DATA['Simisear'] },
	{ id: 81,  nationalId: 515, name: 'Panpour',      types: ['Water'], evs: EV_DATA['Panpour'] },
	{ id: 82,  nationalId: 516, name: 'Simipour',     types: ['Water'], evs: EV_DATA['Simipour'] },
	{ id: 83,  nationalId: 307, name: 'Meditite',     types: ['Fighting', 'Psychic'], evs: EV_DATA['Meditite'] },
	{ id: 84,  nationalId: 308, name: 'Medicham',     types: ['Fighting', 'Psychic'], evs: EV_DATA['Medicham'] },
	{ id: 85,  nationalId: 309, name: 'Electrike',    types: ['Electric'], evs: EV_DATA['Electrike'] },
	{ id: 86,  nationalId: 310, name: 'Manectric',    types: ['Electric'], evs: EV_DATA['Manectric'] },
	{ id: 87,  nationalId: 280, name: 'Ralts',        types: ['Psychic', 'Fairy'], evs: EV_DATA['Ralts'] },
	{ id: 88,  nationalId: 281, name: 'Kirlia',       types: ['Psychic', 'Fairy'], evs: EV_DATA['Kirlia'] },
	{ id: 89,  nationalId: 282, name: 'Gardevoir',    types: ['Psychic', 'Fairy'], evs: EV_DATA['Gardevoir'] },
	{ id: 90,  nationalId: 475, name: 'Gallade',      types: ['Psychic', 'Fighting'], evs: EV_DATA['Gallade'] },
	{ id: 91,  nationalId: 228, name: 'Houndour',     types: ['Dark', 'Fire'], evs: EV_DATA['Houndour'] },
	{ id: 92,  nationalId: 229, name: 'Houndoom',     types: ['Dark', 'Fire'], evs: EV_DATA['Houndoom'] },
	{ id: 93,  nationalId: 333, name: 'Swablu',       types: ['Normal', 'Flying'], evs: EV_DATA['Swablu'] },
	{ id: 94,  nationalId: 334, name: 'Altaria',      types: ['Dragon', 'Flying'], evs: EV_DATA['Altaria'] },
	{ id: 95,  nationalId: 531, name: 'Audino',       types: ['Normal'], evs: EV_DATA['Audino'] },
	{ id: 96,  nationalId: 682, name: 'Spritzee',     types: ['Fairy'], evs: EV_DATA['Spritzee'] },
	{ id: 97,  nationalId: 683, name: 'Aromatisse',   types: ['Fairy'], evs: EV_DATA['Aromatisse'] },
	{ id: 98,  nationalId: 684, name: 'Swirlix',      types: ['Fairy'], evs: EV_DATA['Swirlix'] },
	{ id: 99,  nationalId: 685, name: 'Slurpuff',     types: ['Fairy'], evs: EV_DATA['Slurpuff'] },
	// ── Eevee & Evolutions ──────────────────────────────────────────────────
	{ id: 100, nationalId: 133, name: 'Eevee',        types: ['Normal'], evs: EV_DATA['Eevee'] },
	{ id: 101, nationalId: 134, name: 'Vaporeon',     types: ['Water'], evs: EV_DATA['Vaporeon'] },
	{ id: 102, nationalId: 135, name: 'Jolteon',      types: ['Electric'], evs: EV_DATA['Jolteon'] },
	{ id: 103, nationalId: 136, name: 'Flareon',      types: ['Fire'], evs: EV_DATA['Flareon'] },
	{ id: 104, nationalId: 196, name: 'Espeon',       types: ['Psychic'], evs: EV_DATA['Espeon'] },
	{ id: 105, nationalId: 197, name: 'Umbreon',      types: ['Dark'], evs: EV_DATA['Umbreon'] },
	{ id: 106, nationalId: 470, name: 'Leafeon',      types: ['Grass'], evs: EV_DATA['Leafeon'] },
	{ id: 107, nationalId: 471, name: 'Glaceon',      types: ['Ice'], evs: EV_DATA['Glaceon'] },
	{ id: 108, nationalId: 700, name: 'Sylveon',      types: ['Fairy'], evs: EV_DATA['Sylveon'] },
	// ── More Kalos / Multi-Gen ──────────────────────────────────────────────
	{ id: 109, nationalId: 427, name: 'Buneary',      types: ['Normal'], evs: EV_DATA['Buneary'] },
	{ id: 110, nationalId: 428, name: 'Lopunny',      types: ['Normal'], evs: EV_DATA['Lopunny'] },
	{ id: 111, nationalId: 353, name: 'Shuppet',      types: ['Ghost'], evs: EV_DATA['Shuppet'] },
	{ id: 112, nationalId: 354, name: 'Banette',      types: ['Ghost'], evs: EV_DATA['Banette'] },
	{ id: 113, nationalId: 582, name: 'Vanillite',    types: ['Ice'], evs: EV_DATA['Vanillite'] },
	{ id: 114, nationalId: 583, name: 'Vanillish',    types: ['Ice'], evs: EV_DATA['Vanillish'] },
	{ id: 115, nationalId: 584, name: 'Vanilluxe',    types: ['Ice'], evs: EV_DATA['Vanilluxe'] },
	{ id: 116, nationalId: 322, name: 'Numel',        types: ['Fire', 'Ground'], evs: EV_DATA['Numel'] },
	{ id: 117, nationalId: 323, name: 'Camerupt',     types: ['Fire', 'Ground'], evs: EV_DATA['Camerupt'] },
	{ id: 118, nationalId: 449, name: 'Hippopotas',   types: ['Ground'], evs: EV_DATA['Hippopotas'] },
	{ id: 119, nationalId: 450, name: 'Hippowdon',    types: ['Ground'], evs: EV_DATA['Hippowdon'] },
	{ id: 120, nationalId: 529, name: 'Drilbur',      types: ['Ground'], evs: EV_DATA['Drilbur'] },
	{ id: 121, nationalId: 530, name: 'Excadrill',    types: ['Ground', 'Steel'], evs: EV_DATA['Excadrill'] },
	{ id: 122, nationalId: 551, name: 'Sandile',      types: ['Ground', 'Dark'], evs: EV_DATA['Sandile'] },
	{ id: 123, nationalId: 552, name: 'Krokorok',     types: ['Ground', 'Dark'], evs: EV_DATA['Krokorok'] },
	{ id: 124, nationalId: 553, name: 'Krookodile',   types: ['Ground', 'Dark'], evs: EV_DATA['Krookodile'] },
	{ id: 125, nationalId: 66,  name: 'Machop',       types: ['Fighting'], evs: EV_DATA['Machop'] },
	{ id: 126, nationalId: 67,  name: 'Machoke',      types: ['Fighting'], evs: EV_DATA['Machoke'] },
	{ id: 127, nationalId: 68,  name: 'Machamp',      types: ['Fighting'], evs: EV_DATA['Machamp'] },
	{ id: 128, nationalId: 443, name: 'Gible',        types: ['Dragon', 'Ground'], evs: EV_DATA['Gible'] },
	{ id: 129, nationalId: 444, name: 'Gabite',       types: ['Dragon', 'Ground'], evs: EV_DATA['Gabite'] },
	{ id: 130, nationalId: 445, name: 'Garchomp',     types: ['Dragon', 'Ground'], evs: EV_DATA['Garchomp'] },
	{ id: 131, nationalId: 703, name: 'Carbink',      types: ['Rock', 'Fairy'], evs: EV_DATA['Carbink'] },
	{ id: 132, nationalId: 302, name: 'Sableye',      types: ['Dark', 'Ghost'], evs: EV_DATA['Sableye'] },
	{ id: 133, nationalId: 303, name: 'Mawile',       types: ['Steel', 'Fairy'], evs: EV_DATA['Mawile'] },
	{ id: 134, nationalId: 359, name: 'Absol',        types: ['Dark'], evs: EV_DATA['Absol'] },
	{ id: 135, nationalId: 447, name: 'Riolu',        types: ['Fighting'], evs: EV_DATA['Riolu'] },
	{ id: 136, nationalId: 448, name: 'Lucario',      types: ['Fighting', 'Steel'], evs: EV_DATA['Lucario'] },
	{ id: 137, nationalId: 79,  name: 'Slowpoke',     types: ['Water', 'Psychic'], evs: EV_DATA['Slowpoke'] },
	{ id: 138, nationalId: 80,  name: 'Slowbro',      types: ['Water', 'Psychic'], evs: EV_DATA['Slowbro'] },
	{ id: 139, nationalId: 199, name: 'Slowking',     types: ['Water', 'Psychic'], evs: EV_DATA['Slowking'] },
	{ id: 140, nationalId: 318, name: 'Carvanha',     types: ['Water', 'Dark'], evs: EV_DATA['Carvanha'] },
	{ id: 141, nationalId: 319, name: 'Sharpedo',     types: ['Water', 'Dark'], evs: EV_DATA['Sharpedo'] },
	{ id: 142, nationalId: 602, name: 'Tynamo',       types: ['Electric'], evs: EV_DATA['Tynamo'] },
	{ id: 143, nationalId: 603, name: 'Eelektrik',    types: ['Electric'], evs: EV_DATA['Eelektrik'] },
	{ id: 144, nationalId: 604, name: 'Eelektross',   types: ['Electric'], evs: EV_DATA['Eelektross'] },
	{ id: 145, nationalId: 147, name: 'Dratini',      types: ['Dragon'], evs: EV_DATA['Dratini'] },
	{ id: 146, nationalId: 148, name: 'Dragonair',    types: ['Dragon'], evs: EV_DATA['Dragonair'] },
	{ id: 147, nationalId: 149, name: 'Dragonite',    types: ['Dragon', 'Flying'], evs: EV_DATA['Dragonite'] },
	// ── Kanto Starters ──────────────────────────────────────────────────────
	{ id: 148, nationalId: 1,   name: 'Bulbasaur',    types: ['Grass', 'Poison'], evs: EV_DATA['Bulbasaur'] },
	{ id: 149, nationalId: 2,   name: 'Ivysaur',      types: ['Grass', 'Poison'], evs: EV_DATA['Ivysaur'] },
	{ id: 150, nationalId: 3,   name: 'Venusaur',     types: ['Grass', 'Poison'], evs: EV_DATA['Venusaur'] },
	{ id: 151, nationalId: 4,   name: 'Charmander',   types: ['Fire'], evs: EV_DATA['Charmander'] },
	{ id: 152, nationalId: 5,   name: 'Charmeleon',   types: ['Fire'], evs: EV_DATA['Charmeleon'] },
	{ id: 153, nationalId: 6,   name: 'Charizard',    types: ['Fire', 'Flying'], evs: EV_DATA['Charizard'] },
	{ id: 154, nationalId: 7,   name: 'Squirtle',     types: ['Water'], evs: EV_DATA['Squirtle'] },
	{ id: 155, nationalId: 8,   name: 'Wartortle',    types: ['Water'], evs: EV_DATA['Wartortle'] },
	{ id: 156, nationalId: 9,   name: 'Blastoise',    types: ['Water'], evs: EV_DATA['Blastoise'] },
	// ── More Kalos ──────────────────────────────────────────────────────────
	{ id: 157, nationalId: 618, name: 'Stunfisk',     types: ['Ground', 'Electric'], evs: EV_DATA['Stunfisk'] },
	{ id: 158, nationalId: 676, name: 'Furfrou',      types: ['Normal'], evs: EV_DATA['Furfrou'] },
	{ id: 159, nationalId: 686, name: 'Inkay',        types: ['Dark', 'Psychic'], evs: EV_DATA['Inkay'] },
	{ id: 160, nationalId: 687, name: 'Malamar',      types: ['Dark', 'Psychic'], evs: EV_DATA['Malamar'] },
	{ id: 161, nationalId: 690, name: 'Skrelp',       types: ['Poison', 'Water'], evs: EV_DATA['Skrelp'] },
	{ id: 162, nationalId: 691, name: 'Dragalge',     types: ['Poison', 'Dragon'], evs: EV_DATA['Dragalge'] },
	{ id: 163, nationalId: 692, name: 'Clauncher',    types: ['Water'], evs: EV_DATA['Clauncher'] },
	{ id: 164, nationalId: 693, name: 'Clawitzer',    types: ['Water'], evs: EV_DATA['Clawitzer'] },
	{ id: 165, nationalId: 704, name: 'Goomy',        types: ['Dragon'], evs: EV_DATA['Goomy'] },
	{ id: 166, nationalId: 705, name: 'Sliggoo',      types: ['Dragon'], evs: EV_DATA['Sliggoo'] },
	{ id: 167, nationalId: 706, name: 'Goodra',       types: ['Dragon'], evs: EV_DATA['Goodra'] },
	{ id: 168, nationalId: 225, name: 'Delibird',     types: ['Ice', 'Flying'], evs: EV_DATA['Delibird'] },
	{ id: 169, nationalId: 361, name: 'Snorunt',      types: ['Ice'], evs: EV_DATA['Snorunt'] },
	{ id: 170, nationalId: 362, name: 'Glalie',       types: ['Ice'], evs: EV_DATA['Glalie'] },
	{ id: 171, nationalId: 478, name: 'Froslass',     types: ['Ice', 'Ghost'], evs: EV_DATA['Froslass'] },
	{ id: 172, nationalId: 459, name: 'Snover',       types: ['Grass', 'Ice'], evs: EV_DATA['Snover'] },
	{ id: 173, nationalId: 460, name: 'Abomasnow',    types: ['Grass', 'Ice'], evs: EV_DATA['Abomasnow'] },
	{ id: 174, nationalId: 712, name: 'Bergmite',     types: ['Ice'], evs: EV_DATA['Bergmite'] },
	{ id: 175, nationalId: 713, name: 'Avalugg',      types: ['Ice'], evs: EV_DATA['Avalugg'] },
	{ id: 176, nationalId: 123, name: 'Scyther',      types: ['Bug', 'Flying'], evs: EV_DATA['Scyther'] },
	{ id: 177, nationalId: 212, name: 'Scizor',       types: ['Bug', 'Steel'], evs: EV_DATA['Scizor'] },
	{ id: 178, nationalId: 127, name: 'Pinsir',       types: ['Bug'], evs: EV_DATA['Pinsir'] },
	{ id: 179, nationalId: 214, name: 'Heracross',    types: ['Bug', 'Fighting'], evs: EV_DATA['Heracross'] },
	{ id: 180, nationalId: 587, name: 'Emolga',       types: ['Electric', 'Flying'], evs: EV_DATA['Emolga'] },
	{ id: 181, nationalId: 701, name: 'Hawlucha',     types: ['Fighting', 'Flying'], evs: EV_DATA['Hawlucha'] },
	{ id: 182, nationalId: 708, name: 'Phantump',     types: ['Ghost', 'Grass'], evs: EV_DATA['Phantump'] },
	{ id: 183, nationalId: 709, name: 'Trevenant',    types: ['Ghost', 'Grass'], evs: EV_DATA['Trevenant'] },
	{ id: 184, nationalId: 559, name: 'Scraggy',      types: ['Dark', 'Fighting'], evs: EV_DATA['Scraggy'] },
	{ id: 185, nationalId: 560, name: 'Scrafty',      types: ['Dark', 'Fighting'], evs: EV_DATA['Scrafty'] },
	{ id: 186, nationalId: 714, name: 'Noibat',       types: ['Flying', 'Dragon'], evs: EV_DATA['Noibat'] },
	{ id: 187, nationalId: 715, name: 'Noivern',      types: ['Flying', 'Dragon'], evs: EV_DATA['Noivern'] },
	{ id: 188, nationalId: 707, name: 'Klefki',       types: ['Steel', 'Fairy'], evs: EV_DATA['Klefki'] },
	{ id: 189, nationalId: 607, name: 'Litwick',      types: ['Ghost', 'Fire'], evs: EV_DATA['Litwick'] },
	{ id: 190, nationalId: 608, name: 'Lampent',      types: ['Ghost', 'Fire'], evs: EV_DATA['Lampent'] },
	{ id: 191, nationalId: 609, name: 'Chandelure',   types: ['Ghost', 'Fire'], evs: EV_DATA['Chandelure'] },
	{ id: 192, nationalId: 142, name: 'Aerodactyl',   types: ['Rock', 'Flying'], evs: EV_DATA['Aerodactyl'] },
	{ id: 193, nationalId: 696, name: 'Tyrunt',       types: ['Rock', 'Dragon'], evs: EV_DATA['Tyrunt'] },
	{ id: 194, nationalId: 697, name: 'Tyrantrum',    types: ['Rock', 'Dragon'], evs: EV_DATA['Tyrantrum'] },
	{ id: 195, nationalId: 698, name: 'Amaura',       types: ['Rock', 'Ice'], evs: EV_DATA['Amaura'] },
	{ id: 196, nationalId: 699, name: 'Aurorus',      types: ['Rock', 'Ice'], evs: EV_DATA['Aurorus'] },
	{ id: 197, nationalId: 95,  name: 'Onix',         types: ['Rock', 'Ground'], evs: EV_DATA['Onix'] },
	{ id: 198, nationalId: 208, name: 'Steelix',      types: ['Steel', 'Ground'], evs: EV_DATA['Steelix'] },
	{ id: 199, nationalId: 304, name: 'Aron',         types: ['Steel', 'Rock'], evs: EV_DATA['Aron'] },
	{ id: 200, nationalId: 305, name: 'Lairon',       types: ['Steel', 'Rock'], evs: EV_DATA['Lairon'] },
	{ id: 201, nationalId: 306, name: 'Aggron',       types: ['Steel', 'Rock'], evs: EV_DATA['Aggron'] },
	{ id: 202, nationalId: 694, name: 'Helioptile',   types: ['Electric', 'Normal'], evs: EV_DATA['Helioptile'] },
	{ id: 203, nationalId: 695, name: 'Heliolisk',    types: ['Electric', 'Normal'], evs: EV_DATA['Heliolisk'] },
	{ id: 204, nationalId: 710, name: 'Pumpkaboo',    types: ['Ghost', 'Grass'], evs: EV_DATA['Pumpkaboo'] },
	{ id: 205, nationalId: 711, name: 'Gourgeist',    types: ['Ghost', 'Grass'], evs: EV_DATA['Gourgeist'] },
	{ id: 206, nationalId: 246, name: 'Larvitar',     types: ['Rock', 'Ground'], evs: EV_DATA['Larvitar'] },
	{ id: 207, nationalId: 247, name: 'Pupitar',      types: ['Rock', 'Ground'], evs: EV_DATA['Pupitar'] },
	{ id: 208, nationalId: 248, name: 'Tyranitar',    types: ['Rock', 'Dark'], evs: EV_DATA['Tyranitar'] },
	// ── Kalos Starters ──────────────────────────────────────────────────────
	{ id: 209, nationalId: 656, name: 'Froakie',      types: ['Water'], evs: EV_DATA['Froakie'] },
	{ id: 210, nationalId: 657, name: 'Frogadier',    types: ['Water'], evs: EV_DATA['Frogadier'] },
	{ id: 211, nationalId: 658, name: 'Greninja',     types: ['Water', 'Dark'], evs: EV_DATA['Greninja'] },
	{ id: 212, nationalId: 870, name: 'Falinks',      types: ['Fighting'], evs: EV_DATA['Falinks'] },
	{ id: 213, nationalId: 650, name: 'Chespin',      types: ['Grass'], evs: EV_DATA['Chespin'] },
	{ id: 214, nationalId: 651, name: 'Quilladin',    types: ['Grass'], evs: EV_DATA['Quilladin'] },
	{ id: 215, nationalId: 652, name: 'Chesnaught',   types: ['Grass', 'Fighting'], evs: EV_DATA['Chesnaught'] },
	{ id: 216, nationalId: 227, name: 'Skarmory',     types: ['Steel', 'Flying'], evs: EV_DATA['Skarmory'] },
	{ id: 217, nationalId: 653, name: 'Fennekin',     types: ['Fire'], evs: EV_DATA['Fennekin'] },
	{ id: 218, nationalId: 654, name: 'Braixen',      types: ['Fire'], evs: EV_DATA['Braixen'] },
	{ id: 219, nationalId: 655, name: 'Delphox',      types: ['Fire', 'Psychic'], evs: EV_DATA['Delphox'] },
	{ id: 220, nationalId: 371, name: 'Bagon',        types: ['Dragon'], evs: EV_DATA['Bagon'] },
	{ id: 221, nationalId: 372, name: 'Shelgon',      types: ['Dragon'], evs: EV_DATA['Shelgon'] },
	{ id: 222, nationalId: 373, name: 'Salamence',    types: ['Dragon', 'Flying'], evs: EV_DATA['Salamence'] },
	{ id: 223, nationalId: 115, name: 'Kangaskhan',   types: ['Normal'], evs: EV_DATA['Kangaskhan'] },
	{ id: 224, nationalId: 780, name: 'Drampa',       types: ['Normal', 'Dragon'], evs: EV_DATA['Drampa'] },
	{ id: 225, nationalId: 374, name: 'Beldum',       types: ['Steel', 'Psychic'], evs: EV_DATA['Beldum'] },
	{ id: 226, nationalId: 375, name: 'Metang',       types: ['Steel', 'Psychic'], evs: EV_DATA['Metang'] },
	{ id: 227, nationalId: 376, name: 'Metagross',    types: ['Steel', 'Psychic'], evs: EV_DATA['Metagross'] },
	// ── Legendaries ─────────────────────────────────────────────────────────
	{ id: 228, nationalId: 716, name: 'Xerneas',      types: ['Fairy'], evs: EV_DATA['Xerneas'] },
	{ id: 229, nationalId: 717, name: 'Yveltal',      types: ['Dark', 'Flying'], evs: EV_DATA['Yveltal'] },
	{ id: 230, nationalId: 718, name: 'Zygarde',      types: ['Dragon', 'Ground'], evs: EV_DATA['Zygarde'] },
	{ id: 231, nationalId: 719, name: 'Diancie',      types: ['Rock', 'Fairy'], evs: EV_DATA['Diancie'] },
	{ id: 232, nationalId: 150, name: 'Mewtwo',       types: ['Psychic'], evs: EV_DATA['Mewtwo'] },

	// ── Hyperspace Pokédex ──────────────────────────────────────────────────
	// Hoenn Starters
	{ id: 233, nationalId: 252, name: 'Treecko',      types: ['Grass'], evs: EV_DATA['Treecko'] },
	{ id: 234, nationalId: 253, name: 'Grovyle',      types: ['Grass'], evs: EV_DATA['Grovyle'] },
	{ id: 235, nationalId: 254, name: 'Sceptile',     types: ['Grass'], evs: EV_DATA['Sceptile'] },
	{ id: 236, nationalId: 255, name: 'Torchic',      types: ['Fire'], evs: EV_DATA['Torchic'] },
	{ id: 237, nationalId: 256, name: 'Combusken',    types: ['Fire', 'Fighting'], evs: EV_DATA['Combusken'] },
	{ id: 238, nationalId: 257, name: 'Blaziken',     types: ['Fire', 'Fighting'], evs: EV_DATA['Blaziken'] },
	{ id: 239, nationalId: 258, name: 'Mudkip',       types: ['Water'], evs: EV_DATA['Mudkip'] },
	{ id: 240, nationalId: 259, name: 'Marshtomp',    types: ['Water', 'Ground'], evs: EV_DATA['Marshtomp'] },
	{ id: 241, nationalId: 260, name: 'Swampert',     types: ['Water', 'Ground'], evs: EV_DATA['Swampert'] },
	// Weather Trio
	{ id: 242, nationalId: 382, name: 'Kyogre',       types: ['Water'], evs: EV_DATA['Kyogre'] },
	{ id: 243, nationalId: 383, name: 'Groudon',      types: ['Ground'], evs: EV_DATA['Groudon'] },
	{ id: 244, nationalId: 384, name: 'Rayquaza',     types: ['Dragon', 'Flying'], evs: EV_DATA['Rayquaza'] },
	// Eon Duo
	{ id: 245, nationalId: 380, name: 'Latias',       types: ['Dragon', 'Psychic'], evs: EV_DATA['Latias'] },
	{ id: 246, nationalId: 381, name: 'Latios',       types: ['Dragon', 'Psychic'], evs: EV_DATA['Latios'] },
	// Swords of Justice
	{ id: 247, nationalId: 638, name: 'Cobalion',     types: ['Steel', 'Fighting'], evs: EV_DATA['Cobalion'] },
	{ id: 248, nationalId: 639, name: 'Terrakion',    types: ['Rock', 'Fighting'], evs: EV_DATA['Terrakion'] },
	{ id: 249, nationalId: 640, name: 'Virizion',     types: ['Grass', 'Fighting'], evs: EV_DATA['Virizion'] },
	{ id: 250, nationalId: 647, name: 'Keldeo',       types: ['Water', 'Fighting'], evs: EV_DATA['Keldeo'] },
	// Mythicals
	{ id: 251, nationalId: 485, name: 'Heatran',      types: ['Fire', 'Steel'], evs: EV_DATA['Heatran'] },
	{ id: 252, nationalId: 649, name: 'Genesect',     types: ['Bug', 'Steel'], evs: EV_DATA['Genesect'] },
	{ id: 253, nationalId: 648, name: 'Meloetta',     types: ['Normal', 'Psychic'], evs: EV_DATA['Meloetta'] },
	{ id: 254, nationalId: 721, name: 'Volcanion',    types: ['Fire', 'Water'], evs: EV_DATA['Volcanion'] },
	{ id: 255, nationalId: 802, name: 'Marshadow',    types: ['Fighting', 'Ghost'], evs: EV_DATA['Marshadow'] },
	{ id: 256, nationalId: 807, name: 'Zeraora',      types: ['Electric'], evs: EV_DATA['Zeraora'] },
	{ id: 257, nationalId: 720, name: 'Hoopa',        types: ['Psychic', 'Ghost'], evs: EV_DATA['Hoopa'] },
	{ id: 258, nationalId: 491, name: 'Darkrai',      types: ['Dark'], evs: EV_DATA['Darkrai'] },
	// Magearna Line
	{ id: 259, nationalId: 808, name: 'Meltan',       types: ['Steel'], evs: EV_DATA['Meltan'] },
	{ id: 260, nationalId: 809, name: 'Melmetal',     types: ['Steel'], evs: EV_DATA['Melmetal'] },
	{ id: 261, nationalId: 801, name: 'Magearna',     types: ['Steel', 'Fairy'], evs: EV_DATA['Magearna'] },
	// Zubat Line
	{ id: 262, nationalId: 41,  name: 'Zubat',        types: ['Poison', 'Flying'], evs: EV_DATA['Zubat'] },
	{ id: 263, nationalId: 42,  name: 'Golbat',       types: ['Poison', 'Flying'], evs: EV_DATA['Golbat'] },
	{ id: 264, nationalId: 169, name: 'Crobat',       types: ['Poison', 'Flying'], evs: EV_DATA['Crobat'] },
	// Meowth Line
	{ id: 265, nationalId: 52,  name: 'Meowth',       types: ['Normal'], evs: EV_DATA['Meowth'] },
	{ id: 266, nationalId: 53,  name: 'Persian',      types: ['Normal'], evs: EV_DATA['Persian'] },
	{ id: 267, nationalId: 863, name: 'Perrserker',   types: ['Steel'], evs: EV_DATA['Perrserker'] },
	// Igglybuff Line
	{ id: 268, nationalId: 174, name: 'Igglybuff',    types: ['Normal', 'Fairy'], evs: EV_DATA['Igglybuff'] },
	{ id: 269, nationalId: 39,  name: 'Jigglypuff',   types: ['Normal', 'Fairy'], evs: EV_DATA['Jigglypuff'] },
	{ id: 270, nationalId: 40,  name: 'Wigglytuff',   types: ['Normal', 'Fairy'], evs: EV_DATA['Wigglytuff'] },
	// Mankey Line
	{ id: 271, nationalId: 56,  name: 'Mankey',       types: ['Fighting'], evs: EV_DATA['Mankey'] },
	{ id: 272, nationalId: 57,  name: 'Primeape',     types: ['Fighting'], evs: EV_DATA['Primeape'] },
	{ id: 273, nationalId: 979, name: 'Annihilape',   types: ['Fighting', 'Ghost'], evs: EV_DATA['Annihilape'] },
	// Cubone Line
	{ id: 274, nationalId: 104, name: 'Cubone',       types: ['Ground'], evs: EV_DATA['Cubone'] },
	{ id: 275, nationalId: 105, name: 'Marowak',      types: ['Ground'], evs: EV_DATA['Marowak'] },
	// Mime Line
	{ id: 276, nationalId: 439, name: 'Mime Jr.',     types: ['Psychic', 'Fairy'], evs: EV_DATA['Mime Jr.'] },
	{ id: 277, nationalId: 122, name: 'Mr. Mime',     types: ['Psychic', 'Fairy'], evs: EV_DATA['Mr. Mime'] },
	{ id: 278, nationalId: 866, name: 'Mr. Rime',     types: ['Ice', 'Psychic'], evs: EV_DATA['Mr. Rime'] },
	// Chimecho Line
	{ id: 279, nationalId: 433, name: 'Chingling',    types: ['Psychic'], evs: EV_DATA['Chingling'] },
	{ id: 280, nationalId: 358, name: 'Chimecho',     types: ['Psychic'], evs: EV_DATA['Chimecho'] },
	// Spoink Line
	{ id: 281, nationalId: 325, name: 'Spoink',       types: ['Psychic'], evs: EV_DATA['Spoink'] },
	{ id: 282, nationalId: 326, name: 'Grumpig',      types: ['Psychic'], evs: EV_DATA['Grumpig'] },
	// Gulpin Line
	{ id: 283, nationalId: 316, name: 'Gulpin',       types: ['Poison'], evs: EV_DATA['Gulpin'] },
	{ id: 284, nationalId: 317, name: 'Swalot',       types: ['Poison'], evs: EV_DATA['Swalot'] },
	// Feebas Line
	{ id: 285, nationalId: 349, name: 'Feebas',       types: ['Water'], evs: EV_DATA['Feebas'] },
	{ id: 286, nationalId: 350, name: 'Milotic',      types: ['Water'], evs: EV_DATA['Milotic'] },
	// Toxel Line
	{ id: 287, nationalId: 848, name: 'Toxel',        types: ['Electric', 'Poison'], evs: EV_DATA['Toxel'] },
	{ id: 288, nationalId: 849, name: 'Toxtricity',   types: ['Electric', 'Poison'], evs: EV_DATA['Toxtricity'] },
	// Capsakid Line
	{ id: 289, nationalId: 951, name: 'Capsakid',     types: ['Grass'], evs: EV_DATA['Capsakid'] },
	{ id: 290, nationalId: 952, name: 'Scovillain',   types: ['Grass', 'Fire'], evs: EV_DATA['Scovillain'] },
	// Charcadet Line
	{ id: 291, nationalId: 935, name: 'Charcadet',    types: ['Fire'], evs: EV_DATA['Charcadet'] },
	{ id: 292, nationalId: 936, name: 'Armarouge',    types: ['Fire', 'Psychic'], evs: EV_DATA['Armarouge'] },
	{ id: 293, nationalId: 937, name: 'Ceruledge',    types: ['Fire', 'Ghost'], evs: EV_DATA['Ceruledge'] },
	// Foongus Line
	{ id: 294, nationalId: 590, name: 'Foongus',      types: ['Grass', 'Poison'], evs: EV_DATA['Foongus'] },
	{ id: 295, nationalId: 591, name: 'Amoonguss',    types: ['Grass', 'Poison'], evs: EV_DATA['Amoonguss'] },
	// Gimmighoul Line
	{ id: 296, nationalId: 999, name: 'Gimmighoul',   types: ['Ghost'], evs: EV_DATA['Gimmighoul'] },
	{ id: 297, nationalId: 1000, name: 'Gholdengo',   types: ['Steel', 'Ghost'], evs: EV_DATA['Gholdengo'] },
	// Nacli Line
	{ id: 298, nationalId: 932, name: 'Nacli',        types: ['Rock'], evs: EV_DATA['Nacli'] },
	{ id: 299, nationalId: 933, name: 'Naclstack',    types: ['Rock'], evs: EV_DATA['Naclstack'] },
	{ id: 300, nationalId: 934, name: 'Garganacl',    types: ['Rock'], evs: EV_DATA['Garganacl'] },
	// Glimmet Line
	{ id: 301, nationalId: 969, name: 'Glimmet',      types: ['Rock', 'Poison'], evs: EV_DATA['Glimmet'] },
	{ id: 302, nationalId: 970, name: 'Glimmora',     types: ['Rock', 'Poison'], evs: EV_DATA['Glimmora'] },
	// Fidough Line
	{ id: 303, nationalId: 926, name: 'Fidough',      types: ['Fairy'], evs: EV_DATA['Fidough'] },
	{ id: 304, nationalId: 927, name: 'Dachsbun',     types: ['Fairy'], evs: EV_DATA['Dachsbun'] },
	// Maschiff Line
	{ id: 305, nationalId: 942, name: 'Maschiff',     types: ['Dark'], evs: EV_DATA['Maschiff'] },
	{ id: 306, nationalId: 943, name: 'Mabosstiff',   types: ['Dark'], evs: EV_DATA['Mabosstiff'] },
	// Greavard Line
	{ id: 307, nationalId: 971, name: 'Greavard',     types: ['Ghost'], evs: EV_DATA['Greavard'] },
	{ id: 308, nationalId: 972, name: 'Houndstone',   types: ['Ghost'], evs: EV_DATA['Houndstone'] },
	// Dondozo & Tatsugiri
	{ id: 309, nationalId: 977, name: 'Dondozo',      types: ['Water'], evs: EV_DATA['Dondozo'] },
	{ id: 310, nationalId: 978, name: 'Tatsugiri',    types: ['Dragon', 'Water'], evs: EV_DATA['Tatsugiri'] },
	// Flamigo
	{ id: 311, nationalId: 973, name: 'Flamigo',      types: ['Flying', 'Fighting'], evs: EV_DATA['Flamigo'] },
	// Frigibax Line
	{ id: 312, nationalId: 996, name: 'Frigibax',     types: ['Dragon', 'Ice'], evs: EV_DATA['Frigibax'] },
	{ id: 313, nationalId: 997, name: 'Arctibax',     types: ['Dragon', 'Ice'], evs: EV_DATA['Arctibax'] },
	{ id: 314, nationalId: 998, name: 'Baxcalibur',   types: ['Dragon', 'Ice'], evs: EV_DATA['Baxcalibur'] },
	// Cyclizar
	{ id: 315, nationalId: 967, name: 'Cyclizar',     types: ['Dragon', 'Normal'], evs: EV_DATA['Cyclizar'] },
	// Shroodle Line
	{ id: 316, nationalId: 944, name: 'Shroodle',     types: ['Poison', 'Normal'], evs: EV_DATA['Shroodle'] },
	{ id: 317, nationalId: 945, name: 'Grafaiai',     types: ['Poison', 'Normal'], evs: EV_DATA['Grafaiai'] },
	// Clobbopus Line
	{ id: 318, nationalId: 852, name: 'Clobbopus',    types: ['Fighting'], evs: EV_DATA['Clobbopus'] },
	{ id: 319, nationalId: 853, name: 'Grapploct',    types: ['Fighting'], evs: EV_DATA['Grapploct'] },
	// Wimpod Line
	{ id: 320, nationalId: 767, name: 'Wimpod',       types: ['Bug', 'Water'], evs: EV_DATA['Wimpod'] },
	{ id: 321, nationalId: 768, name: 'Golisopod',    types: ['Bug', 'Water'], evs: EV_DATA['Golisopod'] },
	// Sandygast Line
	{ id: 322, nationalId: 769, name: 'Sandygast',    types: ['Ghost', 'Ground'], evs: EV_DATA['Sandygast'] },
	{ id: 323, nationalId: 770, name: 'Palossand',    types: ['Ghost', 'Ground'], evs: EV_DATA['Palossand'] },
	// Yamask Line
	{ id: 324, nationalId: 562, name: 'Yamask',       types: ['Ghost'], evs: EV_DATA['Yamask'] },
	{ id: 325, nationalId: 563, name: 'Cofagrigus',   types: ['Ghost'], evs: EV_DATA['Cofagrigus'] },
	{ id: 326, nationalId: 867, name: 'Runerigus',    types: ['Ground', 'Ghost'], evs: EV_DATA['Runerigus'] },
	// Golett Line
	{ id: 327, nationalId: 622, name: 'Golett',       types: ['Ground', 'Ghost'], evs: EV_DATA['Golett'] },
	{ id: 328, nationalId: 623, name: 'Golurk',       types: ['Ground', 'Ghost'], evs: EV_DATA['Golurk'] },
	// Cryogonal
	{ id: 329, nationalId: 615, name: 'Cryogonal',    types: ['Ice'], evs: EV_DATA['Cryogonal'] },
	// Crabrawler Line
	{ id: 330, nationalId: 739, name: 'Crabrawler',   types: ['Fighting'], evs: EV_DATA['Crabrawler'] },
	{ id: 331, nationalId: 740, name: 'Crabominable', types: ['Fighting', 'Ice'], evs: EV_DATA['Crabominable'] },
	// Rookidee Line
	{ id: 332, nationalId: 821, name: 'Rookidee',     types: ['Flying'], evs: EV_DATA['Rookidee'] },
	{ id: 333, nationalId: 822, name: 'Corvisquire',  types: ['Flying'], evs: EV_DATA['Corvisquire'] },
	{ id: 334, nationalId: 823, name: 'Corviknight',  types: ['Flying', 'Steel'], evs: EV_DATA['Corviknight'] },
	// Farfetch'd Line
	{ id: 335, nationalId: 83,  name: 'Farfetch\'d',  types: ['Normal', 'Flying'], evs: EV_DATA["Farfetch'd"] },
	{ id: 336, nationalId: 865, name: 'Sirfetch\'d',  types: ['Fighting'], evs: EV_DATA["Sirfetch'd"] },
	// Starly Line
	{ id: 337, nationalId: 396, name: 'Starly',       types: ['Normal', 'Flying'], evs: EV_DATA['Starly'] },
	{ id: 338, nationalId: 397, name: 'Staravia',     types: ['Normal', 'Flying'], evs: EV_DATA['Staravia'] },
	{ id: 339, nationalId: 398, name: 'Staraptor',    types: ['Normal', 'Flying'], evs: EV_DATA['Staraptor'] },
	// Munna Line
	{ id: 340, nationalId: 517, name: 'Munna',        types: ['Psychic'], evs: EV_DATA['Munna'] },
	{ id: 341, nationalId: 518, name: 'Musharna',     types: ['Psychic'], evs: EV_DATA['Musharna'] },
	// Tinkatink Line
	{ id: 342, nationalId: 957, name: 'Tinkatink',    types: ['Fairy', 'Steel'], evs: EV_DATA['Tinkatink'] },
	{ id: 343, nationalId: 958, name: 'Tinkatuff',    types: ['Fairy', 'Steel'], evs: EV_DATA['Tinkatuff'] },
	{ id: 344, nationalId: 959, name: 'Tinkaton',     types: ['Fairy', 'Steel'], evs: EV_DATA['Tinkaton'] },
	// Kecleon
	{ id: 345, nationalId: 352, name: 'Kecleon',      types: ['Normal'], evs: EV_DATA['Kecleon'] },
	// Nickit Line
	{ id: 346, nationalId: 827, name: 'Nickit',       types: ['Dark'], evs: EV_DATA['Nickit'] },
	{ id: 347, nationalId: 828, name: 'Thievul',      types: ['Dark'], evs: EV_DATA['Thievul'] },
	// Purrloin Line
	{ id: 348, nationalId: 509, name: 'Purrloin',     types: ['Dark'], evs: EV_DATA['Purrloin'] },
	{ id: 349, nationalId: 510, name: 'Liepard',      types: ['Dark'], evs: EV_DATA['Liepard'] },
	// Indeedee
	{ id: 350, nationalId: 876, name: 'Indeedee',     types: ['Psychic', 'Normal'], evs: EV_DATA['Indeedee'] },
	// Morpeko
	{ id: 351, nationalId: 877, name: 'Morpeko',      types: ['Electric', 'Dark'], evs: EV_DATA['Morpeko'] },
	// Zangoose & Seviper
	{ id: 352, nationalId: 335, name: 'Zangoose',     types: ['Normal'], evs: EV_DATA['Zangoose'] },
	{ id: 353, nationalId: 336, name: 'Seviper',      types: ['Poison'], evs: EV_DATA['Seviper'] },
	// Sawk & Throh
	{ id: 354, nationalId: 539, name: 'Sawk',         types: ['Fighting'], evs: EV_DATA['Sawk'] },
	{ id: 355, nationalId: 538, name: 'Throh',        types: ['Fighting'], evs: EV_DATA['Throh'] },
	// Qwilfish Line
	{ id: 356, nationalId: 211, name: 'Qwilfish',     types: ['Water', 'Poison'], evs: EV_DATA['Qwilfish'] },
	{ id: 357, nationalId: 904, name: 'Overqwil',     types: ['Dark', 'Poison'], evs: EV_DATA['Overqwil'] },
	// Porygon Line
	{ id: 358, nationalId: 137, name: 'Porygon',      types: ['Normal'], evs: EV_DATA['Porygon'] },
	{ id: 359, nationalId: 233, name: 'Porygon2',     types: ['Normal'], evs: EV_DATA['Porygon2'] },
	{ id: 360, nationalId: 474, name: 'Porygon-Z',    types: ['Normal'], evs: EV_DATA['Porygon-Z'] },
	// Rotom
	{ id: 361, nationalId: 479, name: 'Rotom',        types: ['Electric', 'Ghost'], evs: EV_DATA['Rotom'] },
	// Mimikyu
	{ id: 362, nationalId: 778, name: 'Mimikyu',      types: ['Ghost', 'Fairy'], evs: EV_DATA['Mimikyu'] },
	// Kleavor
	{ id: 363, nationalId: 900, name: 'Kleavor',      types: ['Bug', 'Rock'], evs: EV_DATA['Kleavor'] },
	// Squawkabilly
	{ id: 364, nationalId: 931, name: 'Squawkabilly', types: ['Normal', 'Flying'], evs: EV_DATA['Squawkabilly'] },
];

export const ALL_TYPES = [
	'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice',
	'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
	'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
] as const;

export const HUNT_METHODS = [
	'Random Encounter',
	'Fast Travel',
	'Bench Reset'
] as const;

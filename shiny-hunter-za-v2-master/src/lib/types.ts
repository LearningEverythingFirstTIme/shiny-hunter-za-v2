export interface Pokemon {
	id: number; // Z-A dex number
	nationalId: number; // National dex number (for sprite URLs)
	name: string;
	types: PokemonType[];
	evs?: {
		hp?: number;
		attack?: number;
		defense?: number;
		specialAttack?: number;
		specialDefense?: number;
		speed?: number;
	};
}

export type PokemonType =
	| 'Normal'
	| 'Fire'
	| 'Water'
	| 'Grass'
	| 'Electric'
	| 'Ice'
	| 'Fighting'
	| 'Poison'
	| 'Ground'
	| 'Flying'
	| 'Psychic'
	| 'Bug'
	| 'Rock'
	| 'Ghost'
	| 'Dragon'
	| 'Dark'
	| 'Steel'
	| 'Fairy';

export type HuntMethod =
	| 'Random Encounter'
	| 'Mass Outbreak'
	| 'Alpha Hunt'
	| 'Dex Research'
	| 'Roaming';

export type HuntStatus = 'active' | 'completed' | 'abandoned';

export interface Hunt {
	id?: string;
	userId: string;
	pokemonId: number; // Z-A dex id
	pokemonName: string;
	nationalId: number;
	shinySpriteUrl: string;
	method: HuntMethod;
	encounters: number;
	status: HuntStatus;
	startedAt: Date;
	completedAt?: Date;
	durationMinutes?: number;
	isAlpha?: boolean;
	isPaused?: boolean;
	pausedAt?: Date;
	totalPausedMinutes?: number;
	notes?: string;
}

export interface Shiny {
	id?: string;
	userId: string;
	pokemonId: number;
	pokemonName: string;
	nationalId: number;
	shinySpriteUrl: string;
	method: HuntMethod;
	encounters: number;
	caughtAt: Date;
	durationMinutes: number;
	isAlpha: boolean;
}

export interface UserStats {
	totalShinies: number;
	totalEncounters: number;
	totalHuntTime: number; // minutes
	averageEncounters: number;
	longestHunt: number; // encounters
	shortestHunt: number; // encounters
	favoriteMethod: HuntMethod | null;
	rarest: Shiny | null; // highest encounter count
	luckiest: Shiny | null; // lowest encounter count
}

<script lang="ts">
	import { hunts, huntsLoading } from '$lib/stores/hunts';
	import { folders, foldersLoading, createFolder, renameFolder, deleteFolder } from '$lib/stores/folders';
	import { user } from '$lib/stores/auth';
	import HuntCard from '$lib/components/HuntCard.svelte';
	import Celebration from '$lib/components/Celebration.svelte';
	import { EmptyHunts } from '$lib/components/illustrations';
	import type { Hunt } from '$lib/types';
	import { toast } from '$lib/stores/toasts';

	type HuntGroup = {
		id: string;
		name: string;
		hunts: Hunt[];
		isUngrouped: boolean;
	};

	let celebrationHunt: Hunt | null = null;
	let newFolderName = '';
	let creatingFolder = false;
	let workingFolderId: string | null = null;
	let visibleGroups: HuntGroup[] = [];

	$: huntsByFolderId = $hunts.reduce<Record<string, Hunt[]>>((groups, hunt) => {
		const key = hunt.folderId ?? 'ungrouped';
		groups[key] = [...(groups[key] ?? []), hunt];
		return groups;
	}, {});

	$: visibleGroups = [
		...(huntsByFolderId.ungrouped?.length
			? [{ id: 'ungrouped', name: 'Ungrouped', hunts: huntsByFolderId.ungrouped, isUngrouped: true }]
			: []),
		...$folders
			.map((folder) => ({
				id: folder.id ?? '',
				name: folder.name,
				hunts: huntsByFolderId[folder.id ?? ''] ?? [],
				isUngrouped: false
			}))
	];

	function handleComplete(e: CustomEvent<Hunt>) {
		celebrationHunt = e.detail;
	}

	async function handleCreateFolder() {
		if (!$user || creatingFolder) return;
		const trimmedName = newFolderName.trim();
		if (!trimmedName) {
			toast.warning('Give the folder a name first.');
			return;
		}

		creatingFolder = true;
		try {
			await createFolder($user.uid, trimmedName);
			newFolderName = '';
		} finally {
			creatingFolder = false;
		}
	}

	async function handleRenameFolder(folderId: string, currentName: string) {
		const nextName = prompt('Rename folder', currentName)?.trim();
		if (!nextName || nextName === currentName) return;

		workingFolderId = folderId;
		try {
			await renameFolder(folderId, nextName);
		} finally {
			workingFolderId = null;
		}
	}

	async function handleDeleteFolder(folderId: string, folderName: string) {
		if (!$user) return;
		if (!confirm(`Delete folder ${folderName}? Hunts inside it will move to Ungrouped.`)) return;

		workingFolderId = folderId;
		try {
			await deleteFolder($user.uid, folderId);
		} finally {
			workingFolderId = null;
		}
	}
</script>

<svelte:head>
	<title>Active Hunts – Shiny Hunter Z-A</title>
</svelte:head>

<div class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
	<div>
		<h1 class="page-header">🎯 Active Hunts</h1>
		<p class="page-subheader">Organize shiny hunts into folders for each area, route, or phase.</p>
	</div>

	<div class="card border border-base-300 bg-base-100 p-4 shadow-sm w-full max-w-xl">
		<p class="text-sm font-semibold mb-2">Create a Folder</p>
		<div class="flex flex-col gap-2 sm:flex-row">
			<input
				type="text"
				bind:value={newFolderName}
				placeholder="Couronne Plaza, Wild Zone South..."
				class="input input-bordered flex-1"
				on:keydown={(event) => event.key === 'Enter' && handleCreateFolder()}
			/>
			<button class="btn btn-primary" on:click={handleCreateFolder} disabled={creatingFolder}>
				{creatingFolder ? 'Creating...' : 'Add Folder'}
			</button>
		</div>
		<p class="text-xs opacity-60 mt-2">Use folders to keep hunt batches grouped by area in Pokemon Legends Z-A.</p>
	</div>
</div>

{#if $huntsLoading || $foldersLoading}
	<div class="flex justify-center py-16">
		<span class="loading loading-dots loading-lg text-primary"></span>
	</div>
{:else if $hunts.length === 0 && $folders.length === 0}
	<div class="flex flex-col items-center py-12">
		<EmptyHunts animate={true} />
		<div class="mt-4 flex flex-wrap justify-center gap-2">
			<a href="/pokedex" class="btn btn-primary font-bold">
				📖 Go to Pokédex
			</a>
		</div>
	</div>
{:else}
	<div class="mb-4 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
		<div class="flex flex-wrap items-center gap-2 text-sm opacity-70">
			<span>{$hunts.length} active {$hunts.length === 1 ? 'hunt' : 'hunts'}</span>
			<span>•</span>
			<span>{$folders.length} {$folders.length === 1 ? 'folder' : 'folders'}</span>
		</div>
		<a href="/pokedex" class="btn btn-ghost btn-sm">+ New Hunt</a>
	</div>

	{#if $folders.length > 0}
		<div class="mb-6 flex flex-wrap gap-2">
			{#each $folders as folder (folder.id)}
				<button
					class="badge badge-lg border-base-300 bg-base-200 px-3 py-4"
					on:click={() => document.getElementById(`folder-${folder.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
				>
					{folder.name} ({huntsByFolderId[folder.id ?? '']?.length ?? 0})
				</button>
			{/each}
		</div>
	{/if}

	<div class="space-y-6">
		{#each visibleGroups as group (group.id)}
			<section id={`folder-${group.id}`} class="card border border-base-300 bg-base-100 shadow-sm overflow-hidden">
				<div class="flex flex-col gap-3 border-b border-base-300 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<div class="flex items-center gap-2 flex-wrap">
							<h2 class="text-lg font-bold">{group.isUngrouped ? '📂 Ungrouped' : `🗂 ${group.name}`}</h2>
							<span class="badge badge-outline">{group.hunts.length} {group.hunts.length === 1 ? 'hunt' : 'hunts'}</span>
						</div>
						<p class="text-sm opacity-60 mt-1">
							{#if group.isUngrouped}
								Hunts without a folder assignment live here.
							{:else}
								Area run, route batch, or any custom grouping you want.
							{/if}
						</p>
					</div>

					{#if !group.isUngrouped}
						<div class="flex gap-2">
							<button
								class="btn btn-sm btn-ghost"
								on:click={() => handleRenameFolder(group.id, group.name)}
								disabled={workingFolderId === group.id}
							>
								Rename
							</button>
							<button
								class="btn btn-sm btn-ghost text-error"
								on:click={() => handleDeleteFolder(group.id, group.name)}
								disabled={workingFolderId === group.id}
							>
								Delete
							</button>
						</div>
					{/if}
				</div>

				{#if group.hunts.length > 0}
					<div class="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
						{#each group.hunts as hunt (hunt.id)}
							<HuntCard {hunt} on:complete={handleComplete} />
						{/each}
					</div>
				{:else}
					<div class="px-4 py-8 text-sm opacity-60">No active hunts in this folder yet.</div>
				{/if}
			</section>
		{/each}
	</div>
{/if}

{#if celebrationHunt}
	<Celebration
		hunt={celebrationHunt}
		on:close={() => {
			celebrationHunt = null;
		}}
	/>
{/if}

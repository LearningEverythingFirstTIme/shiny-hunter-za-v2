<script lang="ts">
	import { page } from '$app/stores';
	import { user, signOut } from '$lib/stores/auth';
	import { activeHuntsCount } from '$lib/stores/hunts';

	const links = [
		{ href: '/pokedex', label: 'Pokédex', icon: '📖' },
		{ href: '/hunts',   label: 'Hunts',   icon: '🎯' },
		{ href: '/shinies', label: 'Shinies', icon: '✨' },
		{ href: '/stats',   label: 'Stats',   icon: '📊' },
		{ href: '/tips',    label: 'Tips',    icon: '💡' }
	];
</script>

<nav class="navbar bg-base-200 border-b border-base-300 sticky top-0 z-50 px-4 shadow-sm">
	<!-- Brand -->
	<div class="navbar-start">
		<a href="/pokedex" class="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity">
			<span class="text-2xl">✨</span>
			<span class="hidden sm:inline" style="color: #2D1B2E;">Shiny Hunter Z-A</span>
			<span class="sm:hidden" style="color: #2D1B2E;">Z-A</span>
		</a>
	</div>

	<!-- Desktop nav links -->
	<div class="navbar-center hidden md:flex">
		<ul class="menu menu-horizontal gap-1 px-0">
			{#each links as link}
				<li>
					<a
						href={link.href}
						class="rounded-lg font-medium text-sm transition-all"
						class:bg-primary={$page.url.pathname.startsWith(link.href)}
						class:text-primary-content={$page.url.pathname.startsWith(link.href)}
					>
						<span>{link.icon}</span>
						{link.label}
						{#if link.href === '/hunts' && $activeHuntsCount > 0}
							<span class="badge badge-accent badge-sm">{$activeHuntsCount}</span>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<!-- User section -->
	<div class="navbar-end gap-2">
		{#if $user}
			<div class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0" class="btn btn-ghost btn-circle avatar">
					{#if $user.photoURL}
						<div class="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
							<img src={$user.photoURL} alt={$user.displayName ?? 'User'} referrerpolicy="no-referrer" />
						</div>
					{:else}
						<div class="w-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold">
							{($user.displayName ?? 'U')[0].toUpperCase()}
						</div>
					{/if}
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul tabindex="0" class="menu menu-sm dropdown-content mt-2 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-44 border border-base-300">
					<li class="menu-title px-3 py-1 text-xs opacity-60">{$user.displayName ?? $user.email}</li>
					<li><button on:click={signOut} class="text-error">Sign Out</button></li>
				</ul>
			</div>
		{/if}

		<!-- Mobile hamburger -->
		<div class="dropdown dropdown-end md:hidden">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="btn btn-ghost btn-sm">☰</label>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul tabindex="0" class="menu menu-sm dropdown-content mt-2 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-40 border border-base-300">
				{#each links as link}
					<li>
						<a
							href={link.href}
							class="font-medium"
							class:text-primary={$page.url.pathname.startsWith(link.href)}
							class:font-bold={$page.url.pathname.startsWith(link.href)}
						>
							{link.icon} {link.label}
							{#if link.href === '/hunts' && $activeHuntsCount > 0}
								<span class="badge badge-accent badge-sm ml-auto">{$activeHuntsCount}</span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>

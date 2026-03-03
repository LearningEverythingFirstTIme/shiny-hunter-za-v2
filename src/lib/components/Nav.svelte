<script lang="ts">
	import { page } from '$app/stores';
	import { user, signOut } from '$lib/stores/auth';
	import { activeHuntsCount } from '$lib/stores/hunts';
	import { theme } from '$lib/stores/theme';

	const links = [
		{ href: '/pokedex', label: 'Pokédex', icon: '📖' },
		{ href: '/hunts',   label: 'Hunts',   icon: '🎯' },
		{ href: '/shinies', label: 'Shinies', icon: '✨' },
		{ href: '/stats',   label: 'Stats',   icon: '📊' },
		{ href: '/tips',    label: 'Tips',    icon: '💡' }
	];

	$: isDark = $theme === 'umbreon';
</script>

<nav class="navbar bg-base-200 border-b border-base-300 sticky top-0 z-50 px-4 shadow-sm transition-colors duration-300">
	<!-- Brand -->
	<div class="navbar-start">
		<a href="/pokedex" class="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity">
			<span class="text-2xl">✨</span>
			<span class="hidden sm:inline text-base-content transition-colors duration-300">Shiny Hunter Z-A</span>
			<span class="sm:hidden text-base-content transition-colors duration-300">Z-A</span>
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
		<!-- Theme toggle: SVG sun/moon with neon ring-pulse in dark mode -->
		<button
			class="btn btn-ghost btn-sm btn-circle theme-toggle"
			class:umbreon-active={isDark}
			on:click={theme.toggle}
			title={isDark ? 'Switch to Sylveon (light) mode' : 'Switch to Umbreon (dark) mode'}
			aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
		>
			{#if isDark}
				<!-- Sun icon — click to go light -->
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="5"/>
					<line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
					<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
					<line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
					<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
				</svg>
			{:else}
				<!-- Crescent moon icon — click to go dark -->
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
				</svg>
			{/if}
		</button>

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
				<ul tabindex="0" class="menu menu-sm dropdown-content mt-2 z-[1] p-2 shadow-lg rounded-box w-44 bg-base-200 border border-base-300">
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
			<ul tabindex="0" class="menu menu-sm dropdown-content mt-2 z-[1] p-2 shadow-lg rounded-box w-40 bg-base-200 border border-base-300">
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

<!-- Mobile Bottom Navigation -->
<nav class="btm-nav btm-nav-md md:hidden bg-base-200 border-t border-base-300 sticky bottom-0 z-50 transition-colors duration-300">
	{#each links as link}
		<a
			href={link.href}
			class="transition-all"
			class:active={$page.url.pathname.startsWith(link.href)}
		>
			<span class="btm-nav-label text-xs">{link.icon}</span>
			<span class="btm-nav-label text-[10px] font-medium">{link.label}</span>
			{#if link.href === '/hunts' && $activeHuntsCount > 0}
				<span class="absolute -top-1 -right-1 badge badge-accent badge-xs">{$activeHuntsCount}</span>
			{/if}
		</a>
	{/each}
</nav>

<style>
	.theme-toggle {
		transition: all 0.3s ease;
		color: inherit;
	}

	.theme-toggle:hover {
		opacity: 0.8;
	}

	/* Neon blue ring-pulse glow when umbreon dark mode is active */
	.theme-toggle.umbreon-active {
		color: #00bfff;
		filter: drop-shadow(0 0 6px rgba(0, 191, 255, 0.7));
		animation: ringPulse 3s ease-in-out infinite;
	}

	@keyframes ringPulse {
		0%, 100% { filter: drop-shadow(0 0 4px rgba(0, 191, 255, 0.5)); }
		50%       { filter: drop-shadow(0 0 10px rgba(0, 191, 255, 0.9)); }
	}
</style>

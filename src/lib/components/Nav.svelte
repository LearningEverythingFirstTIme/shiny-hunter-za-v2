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

	function toggleTheme() {
		theme.toggle();
	}
</script>

<nav class="navbar border-b sticky top-0 z-50 px-4 shadow-sm transition-colors duration-300"
	class:bg-base-200={true}
	class:border-base-300={$theme === 'sylveon'}
	class:border-umbreon-purple={$theme === 'umbreon'}
>
	<!-- Brand -->
	<div class="navbar-start">
		<a href="/pokedex" class="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity">
			<span class="text-2xl">✨</span>
			<span class="hidden sm:inline transition-colors duration-300"
				class:text-dark-text={$theme === 'sylveon'}
				class:text-umbreon-moon={$theme === 'umbreon'}>
				Shiny Hunter Z-A
			</span>
			<span class="sm:hidden transition-colors duration-300"
				class:text-dark-text={$theme === 'sylveon'}
				class:text-umbreon-moon={$theme === 'umbreon'}>
				Z-A
			</span>
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
						class:hover:bg-base-300={!$page.url.pathname.startsWith(link.href) && $theme === 'sylveon'}
						class:hover:bg-umbreon-purple={!$page.url.pathname.startsWith(link.href) && $theme === 'umbreon'}
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
		<!-- Theme Toggle Button -->
		<button
			on:click={toggleTheme}
			class="btn btn-ghost btn-circle btn-sm"
			title={$theme === 'sylveon' ? 'Switch to Umbreon Dark Mode' : 'Switch to Sylveon Light Mode'}
		>
			{#if $theme === 'sylveon'}
				<span class="text-lg">🌙</span>
			{:else}
				<span class="text-lg">☀️</span>
			{/if}
		</button>

		{#if $user}
			<div class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0" class="btn btn-ghost btn-circle avatar">
					{#if $user.photoURL}
						<div class="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1"
							class:ring-umbreon-yellow={$theme === 'umbreon'}
							class:ring-offset-umbreon-black={$theme === 'umbreon'}>
							<img src={$user.photoURL} alt={$user.displayName ?? 'User'} referrerpolicy="no-referrer" />
						</div>
					{:else}
						<div class="w-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold">
							{($user.displayName ?? 'U')[0].toUpperCase()}
						</div>
					{/if}
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul tabindex="0" class="menu menu-sm dropdown-content mt-2 z-[1] p-2 shadow-lg rounded-box w-44 border transition-colors duration-300"
					class:bg-base-100={$theme === 'sylveon'}
					class:border-base-300={$theme === 'sylveon'}
					class:bg-umbreon-dark={$theme === 'umbreon'}
					class:ring-border={$theme === 'umbreon'}>
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
			<ul tabindex="0" class="menu menu-sm dropdown-content mt-2 z-[1] p-2 shadow-lg rounded-box w-40 border transition-colors duration-300"
				class:bg-base-100={$theme === 'sylveon'}
				class:border-base-300={$theme === 'sylveon'}
				class:bg-umbreon-dark={$theme === 'umbreon'}
				class:ring-border={$theme === 'umbreon'}>
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
<nav class="btm-nav btm-nav-md md:hidden sticky bottom-0 z-50 transition-colors duration-300"
	class:bg-base-200={true}
	class:border-t={true}
	class:border-base-300={$theme === 'sylveon'}
	class:border-umbreon-purple={$theme === 'umbreon'}
>
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

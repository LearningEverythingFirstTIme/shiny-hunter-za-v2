<script lang="ts">
	import { page } from '$app/stores';
	import { user, signOut } from '$lib/stores/auth';
	import { activeHuntsCount } from '$lib/stores/hunts';
	import { theme, type Theme } from '$lib/stores/theme';

	const links = [
		{ href: '/pokedex', label: 'Pokédex', icon: '📖' },
		{ href: '/hunts',   label: 'Hunts',   icon: '🎯' },
		{ href: '/shinies', label: 'Shinies', icon: '✨' },
		{ href: '/stats',   label: 'Stats',   icon: '📊' },
		{ href: '/tips',    label: 'Tips',    icon: '💡' }
	];

	// Theme display configuration
	const themeConfig: Record<Theme, { icon: string; label: string; tooltip: string; class: string }> = {
		sylveon: {
			icon: '☀️',
			label: 'Sylveon',
			tooltip: 'Sylveon (light) → Umbreon (dark)',
			class: 'sylveon-active'
		},
		umbreon: {
			icon: '🌙',
			label: 'Umbreon',
			tooltip: 'Umbreon (dark) → Aegislash (royal)',
			class: 'umbreon-active'
		},
		aegislash: {
			icon: '🛡️',
			label: 'Aegislash',
			tooltip: 'Aegislash (royal) → Sylveon (light)',
			class: 'aegislash-active'
		}
	};

	$: currentTheme = $theme;
	$: nextTheme = theme.peekNext(currentTheme);
	$: config = themeConfig[currentTheme];
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
		<!-- Theme cycle button: cycles through sylveon → umbreon → aegislash -->
		<button
			class="btn btn-ghost btn-sm btn-circle theme-toggle"
			class:sylveon-active={currentTheme === 'sylveon'}
			class:umbreon-active={currentTheme === 'umbreon'}
			class:aegislash-active={currentTheme === 'aegislash'}
			on:click={theme.cycle}
			title={config.tooltip}
			aria-label="Cycle theme: currently {config.label}, next {themeConfig[nextTheme].label}"
		>
			<span class="theme-icon">{config.icon}</span>
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
		font-size: 1.1rem;
	}

	.theme-toggle:hover {
		opacity: 0.8;
		transform: scale(1.1);
	}

	.theme-icon {
		display: inline-block;
		transition: transform 0.3s ease;
	}

	.theme-toggle:hover .theme-icon {
		transform: rotate(15deg);
	}

	/* Sylveon (light) theme - warm sun glow */
	.theme-toggle.sylveon-active {
		color: #FFB7C5;
		filter: drop-shadow(0 0 6px rgba(255, 183, 197, 0.6));
	}

	/* Umbreon (dark) theme - neon blue ring-pulse glow */
	.theme-toggle.umbreon-active {
		color: #00bfff;
		filter: drop-shadow(0 0 6px rgba(0, 191, 255, 0.7));
		animation: ringPulse 3s ease-in-out infinite;
	}

	/* Aegislash (royal) theme - golden shield glow */
	.theme-toggle.aegislash-active {
		color: #F4E04D;
		filter: drop-shadow(0 0 8px rgba(244, 224, 77, 0.6));
		animation: shieldGlow 4s ease-in-out infinite;
	}

	@keyframes ringPulse {
		0%, 100% { filter: drop-shadow(0 0 4px rgba(0, 191, 255, 0.5)); }
		50%       { filter: drop-shadow(0 0 10px rgba(0, 191, 255, 0.9)); }
	}

	@keyframes shieldGlow {
		0%, 100% { 
			filter: drop-shadow(0 0 4px rgba(244, 224, 77, 0.4)) drop-shadow(0 0 8px rgba(196, 30, 58, 0.2));
		}
		50% { 
			filter: drop-shadow(0 0 10px rgba(244, 224, 77, 0.8)) drop-shadow(0 0 16px rgba(196, 30, 58, 0.4));
		}
	}
</style>

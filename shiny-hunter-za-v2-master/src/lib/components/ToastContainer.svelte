<script lang="ts">
	import { toast } from '$lib/stores/toasts';

	const icons: Record<string, string> = {
		success: '✅',
		error:   '❌',
		warning: '⚠️',
		info:    'ℹ️'
	};
</script>

<div class="toast toast-top toast-end z-[999] pt-4 pr-4 gap-2 pointer-events-none">
	{#each $toast as t (t.id)}
		<div
			class="alert shadow-lg pointer-events-auto max-w-xs animate-fade-in flex items-start gap-2 border"
			class:alert-success={t.type === 'success'}
			class:alert-error={t.type === 'error'}
			class:alert-warning={t.type === 'warning'}
			class:alert-info={t.type === 'info'}
			role="alert"
		>
			<span class="text-base flex-shrink-0">{icons[t.type]}</span>
			<span class="text-sm flex-1">{t.message}</span>
			<button
				class="btn btn-ghost btn-xs flex-shrink-0 opacity-60 hover:opacity-100 -mr-1"
				on:click={() => toast.remove(t.id)}
				aria-label="Dismiss"
			>✕</button>
		</div>
	{/each}
</div>

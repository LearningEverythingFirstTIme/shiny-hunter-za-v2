<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Chart as ChartType } from 'chart.js';
	import { theme } from '$lib/stores/theme';

	export let data: { method: string; count: number; color: string }[] = [];

	let canvas: HTMLCanvasElement;
	let chart: ChartType | null = null;
	let mounted = false;

	// Method colors mapping - consistent across themes
	const methodColors: Record<string, string> = {
		'Random Encounter': '#78C850',
		'Mass Outbreak': '#6890F0',
		'Alpha Hunt': '#F85888',
		'Dex Research': '#A890F0',
		'Roaming': '#F08030'
	};

	function getThemeColors(isDark: boolean) {
		return {
			legendColor: isDark ? '#B8CCF0' : '#2D1B2E',
			tooltipBg: isDark ? '#1C1C2E' : '#2D1B2E',
			tooltipText: isDark ? '#B8CCF0' : '#FFF8F0',
			borderColor: isDark ? '#09090F' : '#FFF8F0'
		};
	}

	async function initChart(isDark: boolean) {
		if (!canvas || data.length === 0) return;

		const colors = getThemeColors(isDark);
		const { Chart, DoughnutController, ArcElement, Tooltip, Legend } = await import('chart.js');
		Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

		chart = new Chart(canvas, {
			type: 'doughnut',
			data: {
				labels: data.map(d => d.method),
				datasets: [{
					data: data.map(d => d.count),
					backgroundColor: data.map(d => methodColors[d.method] || (isDark ? '#00BFFF' : '#FFB7C5')),
					borderColor: colors.borderColor,
					borderWidth: 3,
					hoverOffset: 8
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				cutout: '65%',
				plugins: {
					legend: {
						position: 'right',
						labels: {
							padding: 15,
							usePointStyle: true,
							pointStyle: 'circle',
							font: { size: 12, family: "'Segoe UI', system-ui, sans-serif" },
							color: colors.legendColor
						}
					},
					tooltip: {
						backgroundColor: colors.tooltipBg,
						titleColor: colors.tooltipText,
						bodyColor: colors.tooltipText,
						padding: 12,
						cornerRadius: 8,
						callbacks: {
							label: (context: any) => {
								const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
								const percentage = Math.round((context.parsed / total) * 100);
								return ` ${context.label}: ${context.parsed} (${percentage}%)`;
							}
						}
					}
				},
				animation: {
					animateRotate: true,
					duration: 1000,
					easing: 'easeOutQuart'
				}
			}
		});
	}

	onMount(() => {
		mounted = true;
		initChart($theme === 'umbreon');
	});

	onDestroy(() => {
		chart?.destroy();
	});

	// Rebuild chart when theme or data changes
	let prevTheme = $theme;
	$: if (mounted && ($theme !== prevTheme || data)) {
		prevTheme = $theme;
		if (chart) { chart.destroy(); chart = null; }
		initChart($theme === 'umbreon');
	}
</script>

<div class="relative h-64 w-full">
	<canvas bind:this={canvas}></canvas>
	{#if data.length === 0}
		<div class="absolute inset-0 flex items-center justify-center">
			<p class="text-sm opacity-50">No data yet</p>
		</div>
	{/if}
</div>

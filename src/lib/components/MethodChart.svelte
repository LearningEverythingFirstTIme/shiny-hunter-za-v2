<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Chart as ChartType } from 'chart.js';
	import { theme } from '$lib/stores/theme';

	export let data: { method: string; count: number; color: string }[] = [];

	let canvas: HTMLCanvasElement;
	let chart: ChartType | null = null;

	// Method colors mapping - consistent across themes
	const methodColors: Record<string, string> = {
		'Random Encounter': '#78C850',
		'Mass Outbreak': '#6890F0',
		'Alpha Hunt': '#F85888',
		'Dex Research': '#A890F0',
		'Roaming': '#F08030'
	};

	// Theme-aware colors
	$: borderColor = $theme === 'umbreon' ? '#1A1A2E' : '#FFF8F0';
	$: legendColor = $theme === 'umbreon' ? '#E8E8E8' : '#2D1B2E';
	$: tooltipBg = $theme === 'umbreon' ? '#2D1B4E' : '#2D1B2E';
	$: tooltipText = $theme === 'umbreon' ? '#E8E8E8' : '#FFF8F0';

	async function initChart() {
		if (!canvas || data.length === 0) return;

		const { Chart, DoughnutController, ArcElement, Tooltip, Legend } = await import('chart.js');
		Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

		const chartData = {
			labels: data.map(d => d.method),
			datasets: [{
				data: data.map(d => d.count),
				backgroundColor: data.map(d => methodColors[d.method] || ($theme === 'umbreon' ? '#F4D03F' : '#FFB7C5')),
				borderColor: borderColor,
				borderWidth: 3,
				hoverOffset: 8
			}]
		};

		chart = new Chart(canvas, {
			type: 'doughnut',
			data: chartData,
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
							font: {
								size: 12,
								family: "'Segoe UI', system-ui, sans-serif"
							},
							color: legendColor
						}
					},
					tooltip: {
						backgroundColor: tooltipBg,
						titleColor: tooltipText,
						bodyColor: tooltipText,
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
		initChart();
	});

	onDestroy(() => {
		if (chart) {
			chart.destroy();
		}
	});

	// Update chart when data changes
	$: if (chart && data) {
		chart.data.labels = data.map(d => d.method);
		chart.data.datasets[0].data = data.map(d => d.count);
		chart.data.datasets[0].backgroundColor = data.map(d => methodColors[d.method] || ($theme === 'umbreon' ? '#F4D03F' : '#FFB7C5'));
		chart.data.datasets[0].borderColor = borderColor;
		if (chart.options.plugins?.legend?.labels) {
			chart.options.plugins.legend.labels.color = legendColor;
		}
		if (chart.options.plugins?.tooltip) {
			chart.options.plugins.tooltip.backgroundColor = tooltipBg;
			chart.options.plugins.tooltip.titleColor = tooltipText;
			chart.options.plugins.tooltip.bodyColor = tooltipText;
		}
		chart.update();
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

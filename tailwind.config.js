/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// Sylveon (Light) Theme Colors
				'sylveon-pink': '#FFB7C5',
				'sylveon-blue': '#87CEEB',
				'cream': '#FFF8F0',
				'dark-text': '#2D1B2E',
				
				// Umbreon (Dark) Theme Colors
				'umbreon-black': '#0D0D0D',
				'umbreon-dark': '#1A1A2E',
				'umbreon-purple': '#2D1B4E',
				'umbreon-yellow': '#F4D03F',
				'umbreon-gold': '#FFD700',
				'umbreon-silver': '#C0C0C0',
				'umbreon-moon': '#E8E8E8',

				// Aegislash (Royal Dark) Theme Colors
				'aegislash-purple': '#4A3B5C',
				'aegislash-gold': '#F4E04D',
				'aegislash-silver': '#A8A8A8',
				'aegislash-red': '#C41E3A',
				'aegislash-shadow': '#2D1F3F',
				'aegislash-cream': '#F5F5DC',

				// Emboar (Fiery) Theme Colors
				'emboar-orange': '#E87E3C',
				'emboar-blue': '#5BC5E8',
				'emboar-dark': '#2D2420',
				'emboar-black': '#1A1512',
				'emboar-cream': '#F5F0E8',
				'emboar-red': '#C94A4A',
			},
			animation: {
				'flash-gold': 'flashGold 0.6s ease-out',
				'sprite-pulse': 'spritePulse 0.8s ease-in-out',
				'float-up': 'floatUp 1.5s ease-out forwards',
				'fade-in': 'fadeIn 0.3s ease-out',
				shimmer: 'shimmer 2s linear infinite',
				'ring-glow': 'ringGlow 3s ease-in-out infinite',
				'ring-pulse': 'ringPulse 2s ease-in-out infinite',
				'moon-shimmer': 'moonShimmer 4s ease-in-out infinite',
				'float-moon': 'floatMoon 6s ease-in-out infinite',
			},
			keyframes: {
				flashGold: {
					'0%': { opacity: '0' },
					'30%': { opacity: '1', background: 'rgba(255,215,0,0.6)' },
					'100%': { opacity: '0' }
				},
				spritePulse: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.3)' }
				},
				floatUp: {
					'0%': { transform: 'translateY(0)', opacity: '1' },
					'100%': { transform: 'translateY(-80px)', opacity: '0' }
				},
				fadeIn: {
					from: { opacity: '0', transform: 'translateY(8px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				// Umbreon Ring Glow Animation (neon electric-blue)
				ringGlow: {
					'0%, 100%': {
						boxShadow: '0 0 5px rgba(0, 191, 255, 0.4), 0 0 10px rgba(0, 191, 255, 0.2), 0 0 15px rgba(0, 191, 255, 0.1)'
					},
					'50%': {
						boxShadow: '0 0 10px rgba(0, 191, 255, 0.8), 0 0 20px rgba(0, 191, 255, 0.5), 0 0 30px rgba(0, 191, 255, 0.3)'
					}
				},
				ringPulse: {
					'0%, 100%': {
						textShadow: '0 0 5px rgba(0, 191, 255, 0.6), 0 0 10px rgba(0, 191, 255, 0.3)'
					},
					'50%': {
						textShadow: '0 0 10px rgba(0, 191, 255, 1), 0 0 20px rgba(0, 191, 255, 0.6), 0 0 30px rgba(0, 191, 255, 0.4)'
					}
				},
				moonShimmer: {
					'0%, 100%': { opacity: '0.3' },
					'50%': { opacity: '0.6' }
				},
				floatMoon: {
					'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
					'50%': { transform: 'translateY(-10px) rotate(5deg)' }
				}
			}
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				sylveon: {
					primary: '#FFB7C5',
					'primary-content': '#2D1B2E',
					secondary: '#87CEEB',
					'secondary-content': '#2D1B2E',
					accent: '#FFD700',
					'accent-content': '#2D1B2E',
					neutral: '#4a2d4e',
					'neutral-content': '#FFF8F0',
					'base-100': '#FFF8F0',
					'base-200': '#FFECF2',
					'base-300': '#FFD6E4',
					'base-content': '#2D1B2E',
					info: '#87CEEB',
					'info-content': '#2D1B2E',
					success: '#86efac',
					'success-content': '#14532d',
					warning: '#fbbf24',
					'warning-content': '#2D1B2E',
					error: '#f87171',
					'error-content': '#fff'
				}
			},
			{
				// Shiny Umbreon: deep black body, neon electric-blue rings, red eyes
				umbreon: {
					primary: '#00BFFF',
					'primary-content': '#020B14',
					secondary: '#1E8FFF',
					'secondary-content': '#020B14',
					accent: '#FF2424',
					'accent-content': '#FFFFFF',
					neutral: '#1A1A2C',
					'neutral-content': '#B8CCF0',
					'base-100': '#09090F',
					'base-200': '#111120',
					'base-300': '#1C1C2E',
					'base-content': '#B8CCF0',
					info: '#00BFFF',
					'info-content': '#020B14',
					success: '#22D45A',
					'success-content': '#042514',
					warning: '#F59E0B',
					'warning-content': '#020B14',
					error: '#FF3333',
					'error-content': '#FFFFFF'
				}
			},
			{
				// Shiny Aegislash: regal ghostly knight's shield
				aegislash: {
					primary: '#F4E04D',
					'primary-content': '#2D1F3F',
					secondary: '#A8A8A8',
					'secondary-content': '#2D1F3F',
					accent: '#C41E3A',
					'accent-content': '#F5F5DC',
					neutral: '#4A3B5C',
					'neutral-content': '#F5F5DC',
					'base-100': '#2D1F3F',
					'base-200': '#3D2F4F',
					'base-300': '#4A3B5C',
					'base-content': '#F5F5DC',
					info: '#A8A8A8',
					'info-content': '#2D1F3F',
					success: '#22D45A',
					'success-content': '#042514',
					warning: '#F4E04D',
					'warning-content': '#2D1F3F',
					error: '#C41E3A',
					'error-content': '#F5F5DC'
				}
			},
			{
				// Shiny Emboar: fiery boar with blue flames
				emboar: {
					primary: '#5BC5E8',
					'primary-content': '#1A1512',
					secondary: '#E87E3C',
					'secondary-content': '#1A1512',
					accent: '#C94A4A',
					'accent-content': '#F5F0E8',
					neutral: '#3D322C',
					'neutral-content': '#F5F0E8',
					'base-100': '#1A1512',
					'base-200': '#2D2420',
					'base-300': '#3D322C',
					'base-content': '#F5F0E8',
					info: '#5BC5E8',
					'info-content': '#1A1512',
					success: '#4ADE80',
					'success-content': '#042514',
					warning: '#E87E3C',
					'warning-content': '#1A1512',
					error: '#C94A4A',
					'error-content': '#F5F0E8'
				}
			}
		]
	}
};

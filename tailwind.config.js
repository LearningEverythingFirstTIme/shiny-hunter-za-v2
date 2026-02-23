/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'sylveon-pink': '#FFB7C5',
				'sylveon-blue': '#87CEEB',
				cream: '#FFF8F0',
				'dark-text': '#2D1B2E'
			},
			animation: {
				'flash-gold': 'flashGold 0.6s ease-out',
				'sprite-pulse': 'spritePulse 0.8s ease-in-out',
				'float-up': 'floatUp 1.5s ease-out forwards',
				'fade-in': 'fadeIn 0.3s ease-out',
				shimmer: 'shimmer 2s linear infinite'
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
			}
		]
	}
};

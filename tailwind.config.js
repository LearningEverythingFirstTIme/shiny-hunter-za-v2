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
				// Umbreon Ring Glow Animation
				ringGlow: {
					'0%, 100%': { 
						boxShadow: '0 0 5px rgba(244, 208, 63, 0.4), 0 0 10px rgba(244, 208, 63, 0.2), 0 0 15px rgba(244, 208, 63, 0.1)'
					},
					'50%': { 
						boxShadow: '0 0 10px rgba(244, 208, 63, 0.8), 0 0 20px rgba(244, 208, 63, 0.5), 0 0 30px rgba(244, 208, 63, 0.3)'
					}
				},
				ringPulse: {
					'0%, 100%': { 
						textShadow: '0 0 5px rgba(244, 208, 63, 0.6), 0 0 10px rgba(244, 208, 63, 0.3)'
					},
					'50%': { 
						textShadow: '0 0 10px rgba(244, 208, 63, 1), 0 0 20px rgba(244, 208, 63, 0.6), 0 0 30px rgba(244, 208, 63, 0.4)'
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
				umbreon: {
					// Umbreon's glowing yellow rings as primary
					primary: '#F4D03F',
					'primary-content': '#0D0D0D',
					// Moonlight silver as secondary
					secondary: '#8B8B9E',
					'secondary-content': '#0D0D0D',
					// Rich gold accent
					accent: '#FFD700',
					'accent-content': '#0D0D0D',
					// Deep purple neutral
					neutral: '#2D1B4E',
					'neutral-content': '#E8E8E8',
					// Deep dark backgrounds
					'base-100': '#0D0D0D',
					'base-200': '#1A1A2E',
					'base-300': '#2D1B4E',
					'base-content': '#E8E8E8',
					// Info - subtle purple glow
					info: '#6B5B95',
					'info-content': '#E8E8E8',
					// Success - emerald glow in darkness
					success: '#2ECC71',
					'success-content': '#0D0D0D',
					// Warning - amber glow
					warning: '#F39C12',
					'warning-content': '#0D0D0D',
					// Error - crimson in dark
					error: '#E74C3C',
					'error-content': '#E8E8E8'
				}
			}
		]
	}
};

<!-- 
  Empty Hunts Illustration
  A sleeping Sylveon-inspired creature dreaming of shiny hunts
-->
<script lang="ts">
  export let animate = true;
</script>

<div class="empty-illustration" class:animate>
  <svg viewBox="0 0 200 200" class="illustration-svg" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradients -->
      <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#FFF8F0" />
        <stop offset="100%" style="stop-color:#FFECF2" />
      </linearGradient>
      <linearGradient id="earGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#FFB7C5" />
        <stop offset="100%" style="stop-color:#FF91A4" />
      </linearGradient>
      <linearGradient id="bowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#87CEEB" />
        <stop offset="100%" style="stop-color:#5AB3D9" />
      </linearGradient>
      <radialGradient id="cheekGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:#FFB7C5;stop-opacity:0.6" />
        <stop offset="100%" style="stop-color:#FFB7C5;stop-opacity:0" />
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Dream bubbles -->
    <g class="dream-bubbles">
      <circle cx="160" cy="50" r="8" fill="#FFD700" opacity="0.6" class="bubble-1"/>
      <circle cx="175" cy="35" r="5" fill="#87CEEB" opacity="0.5" class="bubble-2"/>
      <circle cx="185" cy="55" r="4" fill="#FFB7C5" opacity="0.5" class="bubble-3"/>
      <!-- Sparkle in bubble -->
      <text x="160" y="54" font-size="10" text-anchor="middle" fill="#B8860B" class="sparkle">✦</text>
    </g>

    <!-- Main body group -->
    <g class="creature" transform="translate(100, 110)">
      <!-- Body -->
      <ellipse cx="0" cy="20" rx="55" ry="45" fill="url(#bodyGrad)" stroke="#2D1B2E" stroke-width="2"/>
      
      <!-- Ribbon feelers (back) -->
      <path d="M-40 -10 Q-60 -5 -65 15 Q-60 25 -45 15" fill="#FFB7C5" stroke="#2D1B2E" stroke-width="1.5" class="feeler-left"/>
      <path d="M40 -10 Q60 -5 65 15 Q60 25 45 15" fill="#FFB7C5" stroke="#2D1B2E" stroke-width="1.5" class="feeler-right"/>

      <!-- Ears -->
      <path d="M-35 -25 Q-50 -55 -30 -60 Q-15 -55 -20 -25" fill="url(#earGrad)" stroke="#2D1B2E" stroke-width="2"/>
      <path d="M35 -25 Q50 -55 30 -60 Q15 -55 20 -25" fill="url(#earGrad)" stroke="#2D1B2E" stroke-width="2"/>
      
      <!-- Inner ears -->
      <path d="M-32 -35 Q-40 -50 -28 -52 Q-22 -48 -25 -35" fill="#2D1B2E" opacity="0.15"/>
      <path d="M32 -35 Q40 -50 28 -52 Q22 -48 25 -35" fill="#2D1B2E" opacity="0.15"/>

      <!-- Head -->
      <ellipse cx="0" cy="-15" rx="45" ry="40" fill="url(#bodyGrad)" stroke="#2D1B2E" stroke-width="2"/>

      <!-- Closed eyes -->
      <path d="M-25 -10 Q-18 -5 -11 -10" fill="none" stroke="#2D1B2E" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M11 -10 Q18 -5 25 -10" fill="none" stroke="#2D1B2E" stroke-width="2.5" stroke-linecap="round"/>

      <!-- Eyelashes -->
      <line x1="-28" y1="-12" x2="-32" y2="-15" stroke="#2D1B2E" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="28" y1="-12" x2="32" y2="-15" stroke="#2D1B2E" stroke-width="1.5" stroke-linecap="round"/>

      <!-- Cheeks -->
      <circle cx="-30" cy="0" r="10" fill="url(#cheekGrad)"/>
      <circle cx="30" cy="0" r="10" fill="url(#cheekGrad)"/>

      <!-- Nose -->
      <ellipse cx="0" cy="5" rx="3" ry="2" fill="#FF91A4"/>

      <!-- Mouth (small smile) -->
      <path d="M-5 12 Q0 16 5 12" fill="none" stroke="#2D1B2E" stroke-width="1.5" stroke-linecap="round"/>

      <!-- Bow on head -->
      <g class="bow" transform="translate(0, -45)">
        <ellipse cx="-12" cy="0" rx="12" ry="8" fill="url(#bowGrad)" stroke="#2D1B2E" stroke-width="1.5"/>
        <ellipse cx="12" cy="0" rx="12" ry="8" fill="url(#bowGrad)" stroke="#2D1B2E" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="5" fill="#87CEEB" stroke="#2D1B2E" stroke-width="1.5"/>
      </g>

      <!-- Paws -->
      <ellipse cx="-35" cy="35" rx="12" ry="10" fill="#FFF8F0" stroke="#2D1B2E" stroke-width="1.5"/>
      <ellipse cx="35" cy="35" rx="12" ry="10" fill="#FFF8F0" stroke="#2D1B2E" stroke-width="1.5"/>

      <!-- Zzz animation -->
      <g class="zzz" transform="translate(50, -50)">
        <text x="0" y="0" font-size="20" fill="#87CEEB" font-weight="bold" font-family="Comic Sans MS, cursive">Z</text>
        <text x="15" y="-15" font-size="16" fill="#87CEEB" font-weight="bold" font-family="Comic Sans MS, cursive">z</text>
        <text x="28" y="-28" font-size="12" fill="#87CEEB" font-weight="bold" font-family="Comic Sans MS, cursive">z</text>
      </g>
    </g>

    <!-- Ground shadow -->
    <ellipse cx="100" cy="175" rx="60" ry="12" fill="#2D1B2E" opacity="0.1"/>
  </svg>

  <div class="message">
    <h3>No Active Hunts</h3>
    <p>Even the best hunters need their beauty sleep...</p>
  </div>
</div>

<style>
  .empty-illustration {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }

  .illustration-svg {
    width: 200px;
    height: 200px;
    filter: drop-shadow(0 8px 24px rgba(255, 183, 197, 0.3));
  }

  .message {
    text-align: center;
    margin-top: 1rem;
  }

  .message h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #2D1B2E;
    margin-bottom: 0.5rem;
  }

  .message p {
    font-size: 0.875rem;
    color: #2D1B2E;
    opacity: 0.6;
  }

  /* Animations */
  .animate .creature {
    animation: breathe 3s ease-in-out infinite;
  }

  .animate .bow {
    animation: bowWiggle 4s ease-in-out infinite;
    transform-origin: center;
  }

  .animate .feeler-left {
    animation: feelerMove 3s ease-in-out infinite;
    transform-origin: -40px -10px;
  }

  .animate .feeler-right {
    animation: feelerMove 3s ease-in-out infinite reverse;
    transform-origin: 40px -10px;
  }

  .animate .bubble-1 {
    animation: float 4s ease-in-out infinite;
  }

  .animate .bubble-2 {
    animation: float 3s ease-in-out infinite 0.5s;
  }

  .animate .bubble-3 {
    animation: float 2.5s ease-in-out infinite 1s;
  }

  .animate .sparkle {
    animation: twinkle 2s ease-in-out infinite;
  }

  .animate .zzz {
    animation: zFloat 3s ease-in-out infinite;
    opacity: 0;
  }

  @keyframes breathe {
    0%, 100% { transform: translate(100px, 110px) scale(1); }
    50% { transform: translate(100px, 110px) scale(1.02, 1.01); }
  }

  @keyframes bowWiggle {
    0%, 100% { transform: translate(0, -45px) rotate(0deg); }
    25% { transform: translate(0, -45px) rotate(-3deg); }
    75% { transform: translate(0, -45px) rotate(3deg); }
  }

  @keyframes feelerMove {
    0%, 100% { transform: rotate(0deg); }
    50% { transform: rotate(5deg); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  @keyframes twinkle {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes zFloat {
    0% { transform: translate(50px, -50px); opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { transform: translate(70px, -80px); opacity: 0; }
  }
</style>

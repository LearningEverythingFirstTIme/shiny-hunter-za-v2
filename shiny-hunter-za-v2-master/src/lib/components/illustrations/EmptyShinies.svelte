<!-- 
  Empty Shinies Illustration
  An empty Pokédex with sparkles waiting to be filled
-->
<script lang="ts">
  export let animate = true;
</script>

<div class="empty-illustration" class:animate>
  <svg viewBox="0 0 200 200" class="illustration-svg" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#FF6B8A" />
        <stop offset="100%" style="stop-color:#DC143C" />
      </linearGradient>
      <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#87CEEB" />
        <stop offset="100%" style="stop-color:#5AB3D9" />
      </linearGradient>
      <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:rgba(255,255,255,0.4)" />
        <stop offset="100%" style="stop-color:rgba(255,255,255,0.1)" />
      </linearGradient>
      <radialGradient id="buttonGrad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" style="stop-color:#87CEEB" />
        <stop offset="100%" style="stop-color:#5AB3D9" />
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Floating sparkles around -->
    <g class="ambient-sparkles">
      <text x="30" y="50" font-size="16" fill="#FFD700" class="sparkle-1">✦</text>
      <text x="170" y="40" font-size="12" fill="#FFB7C5" class="sparkle-2">✦</text>
      <text x="160" y="160" font-size="14" fill="#87CEEB" class="sparkle-3">✦</text>
      <text x="35" y="150" font-size="10" fill="#FFD700" class="sparkle-4">✦</text>
    </g>

    <!-- Pokédex body -->
    <g class="pokedex" transform="translate(100, 100)">
      <!-- Main body -->
      <rect x="-55" y="-75" width="110" height="150" rx="20" fill="url(#dexGrad)" stroke="#2D1B2E" stroke-width="2.5"/>
      
      <!-- Top lid line -->
      <line x1="-55" y1="-25" x2="55" y2="-25" stroke="#2D1B2E" stroke-width="2"/>

      <!-- Large top button -->
      <circle cx="-30" cy="-50" r="12" fill="url(#buttonGrad)" stroke="#2D1B2E" stroke-width="2"/>
      <circle cx="-33" cy="-53" r="4" fill="white" opacity="0.5"/>

      <!-- Small indicator lights -->
      <circle cx="0" cy="-50" r="4" fill="#FF4444" stroke="#2D1B2E" stroke-width="1.5" class="light-red"/>
      <circle cx="15" cy="-50" r="4" fill="#FFD700" stroke="#2D1B2E" stroke-width="1.5" class="light-yellow"/>
      <circle cx="30" cy="-50" r="4" fill="#44FF44" stroke="#2D1B2E" stroke-width="1.5" class="light-green"/>

      <!-- Screen area -->
      <rect x="-45" y="-15" width="90" height="70" rx="8" fill="#2D1B2E"/>
      
      <!-- Inner screen -->
      <rect x="-40" y="-10" width="80" height="60" rx="5" fill="url(#screenGrad)" opacity="0.9"/>

      <!-- Glass reflection -->
      <path d="M-40 -10 L-10 -10 L-40 20 Z" fill="white" opacity="0.2"/>
      <path d="M-35 -5 L-20 -5 L-35 10 Z" fill="white" opacity="0.3"/>

      <!-- Empty state icon on screen -->
      <g class="screen-content" transform="translate(0, 15)">
        <!-- Question mark -->
        <text x="0" y="0" font-size="32" text-anchor="middle" fill="#2D1B2E" opacity="0.3" font-weight="bold">?</text>
        
        <!-- Dotted outline where a sprite would be -->
        <ellipse cx="0" cy="-5" rx="20" ry="18" fill="none" stroke="#2D1B2E" stroke-width="1.5" stroke-dasharray="4 2" opacity="0.3"/>
      </g>

      <!-- Screen waiting dots -->
      <g class="waiting-dots" transform="translate(0, 40)">
        <circle cx="-12" cy="0" r="3" fill="#2D1B2E" opacity="0.4"/>
        <circle cx="0" cy="0" r="3" fill="#2D1B2E" opacity="0.4"/>
        <circle cx="12" cy="0" r="3" fill="#2D1B2E" opacity="0.4"/>
      </g>

      <!-- Bottom controls -->
      <circle cx="-30" cy="55" r="10" fill="#444" stroke="#2D1B2E" stroke-width="1.5"/>
      <rect x="5" y="48" width="35" height="14" rx="3" fill="#666" stroke="#2D1B2E" stroke-width="1.5"/>

      <!-- Decorative stripes -->
      <rect x="-45" y="75" width="90" height="4" fill="#2D1B2E" opacity="0.2"/>
      <rect x="-45" y="82" width="90" height="4" fill="#2D1B2E" opacity="0.2"/>

      <!-- "Empty" indicator -->
      <g transform="translate(50, -5) rotate(15)">
        <rect x="0" y="0" width="40" height="20" rx="4" fill="#FFD700" stroke="#B8860B" stroke-width="2"/>
        <text x="20" y="14" font-size="10" text-anchor="middle" fill="#2D1B2E" font-weight="bold">EMPTY</text>
      </g>
    </g>

    <!-- Shadow -->
    <ellipse cx="100" cy="185" rx="50" ry="10" fill="#2D1B2E" opacity="0.1"/>

    <!-- Eager sparkles waiting -->
    <g class="eager-sparkles">
      <text x="145" y="100" font-size="20" fill="#FFD700" class="eager-1">✨</text>
      <text x="50" y="120" font-size="16" fill="#FFB7C5" class="eager-2">✨</text>
    </g>
  </svg>

  <div class="message">
    <h3>No Shinies Yet!</h3>
    <p>Your Pokédex is waiting for its first sparkles...</p>
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
    filter: drop-shadow(0 8px 24px rgba(220, 20, 60, 0.2));
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
  .animate .pokedex {
    animation: gentleHover 3s ease-in-out infinite;
  }

  .animate .screen-content {
    animation: pulse 2s ease-in-out infinite;
  }

  .animate .waiting-dots circle:nth-child(1) {
    animation: dotPulse 1.4s ease-in-out infinite;
  }

  .animate .waiting-dots circle:nth-child(2) {
    animation: dotPulse 1.4s ease-in-out infinite 0.2s;
  }

  .animate .waiting-dots circle:nth-child(3) {
    animation: dotPulse 1.4s ease-in-out infinite 0.4s;
  }

  .animate .sparkle-1 {
    animation: twinkle 2s ease-in-out infinite;
  }

  .animate .sparkle-2 {
    animation: twinkle 2s ease-in-out infinite 0.5s;
  }

  .animate .sparkle-3 {
    animation: twinkle 2s ease-in-out infinite 1s;
  }

  .animate .sparkle-4 {
    animation: twinkle 2s ease-in-out infinite 1.5s;
  }

  .animate .eager-1 {
    animation: eagerFloat 2s ease-in-out infinite;
  }

  .animate .eager-2 {
    animation: eagerFloat 2s ease-in-out infinite 1s;
  }

  .animate .light-red {
    animation: blink 2s ease-in-out infinite;
  }

  .animate .light-yellow {
    animation: blink 2s ease-in-out infinite 0.3s;
  }

  .animate .light-green {
    animation: blink 2s ease-in-out infinite 0.6s;
  }

  @keyframes gentleHover {
    0%, 100% { transform: translate(100px, 100px); }
    50% { transform: translate(100px, 95px); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.9; }
    50% { opacity: 0.6; }
  }

  @keyframes dotPulse {
    0%, 100% { opacity: 0.2; transform: scale(0.8); }
    50% { opacity: 0.6; transform: scale(1); }
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
    50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
  }

  @keyframes eagerFloat {
    0%, 100% { transform: translateY(0); opacity: 0.4; }
    50% { transform: translateY(-10px); opacity: 1; }
  }

  @keyframes blink {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
</style>

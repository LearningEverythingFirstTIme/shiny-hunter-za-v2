<!-- 
  Empty Search Results Illustration
  A detective Pokemon searching with a magnifying glass
-->
<script lang="ts">
  export let animate = true;
</script>

<div class="empty-illustration" class:animate>
  <svg viewBox="0 0 200 200" class="illustration-svg" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="furGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#F4A460" />
        <stop offset="100%" style="stop-color:#D2691E" />
      </linearGradient>
      <linearGradient id="bellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#FFE4B5" />
        <stop offset="100%" style="stop-color:#F4A460" />
      </linearGradient>
      <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:rgba(135,206,235,0.6)" />
        <stop offset="100%" style="stop-color:rgba(135,206,235,0.3)" />
      </linearGradient>
      <radialGradient id="lensGrad" cx="40%" cy="40%" r="60%">
        <stop offset="0%" style="stop-color:rgba(255,255,255,0.4)" />
        <stop offset="100%" style="stop-color:rgba(135,206,235,0.1)" />
      </radialGradient>
    </defs>

    <!-- Dust particles -->
    <g class="dust-particles">
      <circle cx="30" cy="80" r="2" fill="#FFB7C5" opacity="0.4" class="dust-1"/>
      <circle cx="170" cy="100" r="1.5" fill="#87CEEB" opacity="0.4" class="dust-2"/>
      <circle cx="150" cy="60" r="1" fill="#FFD700" opacity="0.4" class="dust-3"/>
      <circle cx="40" cy="140" r="1.5" fill="#FFB7C5" opacity="0.4" class="dust-4"/>
    </g>

    <!-- Search area indicator -->
    <ellipse cx="100" cy="165" rx="70" ry="15" fill="none" stroke="#2D1B2E" stroke-width="1" stroke-dasharray="4 4" opacity="0.2" class="search-area"/>

    <!-- Magnifying glass (behind) -->
    <g class="magnifying-glass" transform="translate(140, 130)">
      <!-- Handle -->
      <rect x="-3" y="20" width="12" height="35" rx="3" fill="#8B4513" stroke="#2D1B2E" stroke-width="1.5" transform="rotate(-30)"/>
      
      <!-- Glass rim -->
      <circle cx="0" cy="0" r="28" fill="none" stroke="#FFD700" stroke-width="4"/>
      <circle cx="0" cy="0" r="26" fill="url(#glassGrad)" stroke="#2D1B2E" stroke-width="1.5"/>
      
      <!-- Lens reflection -->
      <ellipse cx="-8" cy="-8" rx="8" ry="5" fill="white" opacity="0.4" transform="rotate(-45)"/>

      <!-- Magnified question mark -->
      <text x="0" y="8" font-size="24" text-anchor="middle" fill="#2D1B2E" opacity="0.5" font-weight="bold">?</text>
    </g>

    <!-- Detective Pokemon -->
    <g class="detective" transform="translate(70, 110)">
      <!-- Tail -->
      <path d="M-40 20 Q-55 10 -50 -5 Q-45 -15 -35 -10" fill="url(#furGrad)" stroke="#2D1B2E" stroke-width="2"/>

      <!-- Body -->
      <ellipse cx="0" cy="15" rx="35" ry="30" fill="url(#furGrad)" stroke="#2D1B2E" stroke-width="2"/>
      
      <!-- Belly patch -->
      <ellipse cx="0" cy="20" rx="22" ry="18" fill="url(#bellyGrad)"/>

      <!-- Head -->
      <circle cx="0" cy="-20" r="28" fill="url(#furGrad)" stroke="#2D1B2E" stroke-width="2"/>

      <!-- Ears -->
      <ellipse cx="-20" cy="-35" rx="10" ry="15" fill="url(#furGrad)" stroke="#2D1B2E" stroke-width="2" transform="rotate(-20)"/>
      <ellipse cx="20" cy="-35" rx="10" ry="15" fill="url(#furGrad)" stroke="#2D1B2E" stroke-width="2" transform="rotate(20)"/>
      
      <!-- Inner ears -->
      <ellipse cx="-20" cy="-35" rx="5" ry="8" fill="#FFE4B5" transform="rotate(-20)"/>
      <ellipse cx="20" cy="-35" rx="5" ry="8" fill="#FFE4B5" transform="rotate(20)"/>

      <!-- Detective hat -->
      <g class="hat" transform="translate(0, -45)">
        <!-- Brim -->
        <ellipse cx="0" cy="5" rx="35" ry="10" fill="#8B4513" stroke="#2D1B2E" stroke-width="2"/>
        <!-- Crown -->
        <path d="M-20 0 L-15 -25 Q0 -35 15 -25 L20 0 Z" fill="#8B4513" stroke="#2D1B2E" stroke-width="2"/>
        <!-- Hat band -->
        <rect x="-20" y="-5" width="40" height="8" fill="#2D1B2E"/>
      </g>

      <!-- Face -->
      <!-- Eyes (searching) -->
      <ellipse cx="-10" cy="-18" rx="6" ry="8" fill="white" stroke="#2D1B2E" stroke-width="1.5"/>
      <ellipse cx="10" cy="-18" rx="6" ry="8" fill="white" stroke="#2D1B2E" stroke-width="1.5"/>
      
      <!-- Pupils (looking right at magnifying glass) -->
      <circle cx="-6" cy="-18" r="3" fill="#2D1B2E" class="pupil-left"/>
      <circle cx="14" cy="-18" r="3" fill="#2D1B2E" class="pupil-right"/>

      <!-- Nose -->
      <ellipse cx="0" cy="-8" rx="4" ry="3" fill="#2D1B2E"/>

      <!-- Mouth (concentrated) -->
      <path d="M-5 -2 Q0 0 5 -2" fill="none" stroke="#2D1B2E" stroke-width="1.5" stroke-linecap="round"/>

      <!-- Paws -->
      <ellipse cx="-25" cy="25" rx="8" ry="10" fill="#FFE4B5" stroke="#2D1B2E" stroke-width="1.5"/>
      <ellipse cx="25" cy="25" rx="8" ry="10" fill="#FFE4B5" stroke="#2D1B2E" stroke-width="1.5"/>

      <!-- Footprints behind -->
      <g opacity="0.3" transform="translate(-60, 30)">
        <ellipse cx="0" cy="0" rx="6" ry="8" fill="#D2691E"/>
        <circle cx="-4" cy="-6" r="2" fill="#D2691E"/>
        <circle cx="0" cy="-7" r="2" fill="#D2691E"/>
        <circle cx="4" cy="-6" r="2" fill="#D2691E"/>
      </g>
      <g opacity="0.2" transform="translate(-85, 35)">
        <ellipse cx="0" cy="0" rx="5" ry="7" fill="#D2691E"/>
        <circle cx="-3" cy="-5" r="1.5" fill="#D2691E"/>
        <circle cx="0" cy="-6" r="1.5" fill="#D2691E"/>
        <circle cx="3" cy="-5" r="1.5" fill="#D2691E"/>
      </g>
    </g>

    <!-- Question marks floating -->
    <g class="questions">
      <text x="130" y="60" font-size="20" fill="#FFB7C5" opacity="0.6" class="q-1">?</text>
      <text x="45" y="55" font-size="16" fill="#87CEEB" opacity="0.5" class="q-2">?</text>
      <text x="160" y="85" font-size="14" fill="#FFD700" opacity="0.4" class="q-3">?</text>
    </g>

    <!-- Shadow -->
    <ellipse cx="100" cy="175" rx="55" ry="12" fill="#2D1B2E" opacity="0.1"/>
  </svg>

  <div class="message">
    <h3>No Pokémon Found</h3>
    <p>Our detective searched high and low...</p>
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
    filter: drop-shadow(0 8px 24px rgba(210, 105, 30, 0.25));
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
  .animate .detective {
    animation: detectiveBreathe 2s ease-in-out infinite;
  }

  .animate .hat {
    animation: hatTilt 3s ease-in-out infinite;
  }

  .animate .pupil-left,
  .animate .pupil-right {
    animation: lookAround 4s ease-in-out infinite;
  }

  .animate .magnifying-glass {
    animation: glassMove 3s ease-in-out infinite;
    transform-origin: 140px 130px;
  }

  .animate .search-area {
    animation: searchPulse 2s ease-in-out infinite;
  }

  .animate .q-1 {
    animation: questionFloat 3s ease-in-out infinite;
  }

  .animate .q-2 {
    animation: questionFloat 2.5s ease-in-out infinite 0.5s;
  }

  .animate .q-3 {
    animation: questionFloat 2s ease-in-out infinite 1s;
  }

  .animate .dust-1 {
    animation: dustFloat 4s ease-in-out infinite;
  }

  .animate .dust-2 {
    animation: dustFloat 3s ease-in-out infinite 1s;
  }

  .animate .dust-3 {
    animation: dustFloat 5s ease-in-out infinite 2s;
  }

  .animate .dust-4 {
    animation: dustFloat 3.5s ease-in-out infinite 0.5s;
  }

  @keyframes detectiveBreathe {
    0%, 100% { transform: translate(70px, 110px); }
    50% { transform: translate(70px, 108px); }
  }

  @keyframes hatTilt {
    0%, 100% { transform: translate(0, -45px) rotate(0deg); }
    25% { transform: translate(0, -45px) rotate(-2deg); }
    75% { transform: translate(0, -45px) rotate(2deg); }
  }

  @keyframes lookAround {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(1px, 0); }
    50% { transform: translate(2px, 0); }
    75% { transform: translate(1px, 0); }
  }

  @keyframes glassMove {
    0%, 100% { transform: translate(140px, 130px) rotate(-5deg); }
    50% { transform: translate(140px, 125px) rotate(5deg); }
  }

  @keyframes searchPulse {
    0%, 100% { opacity: 0.2; stroke-width: 1; }
    50% { opacity: 0.4; stroke-width: 1.5; }
  }

  @keyframes questionFloat {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
    50% { transform: translateY(-8px) rotate(5deg); opacity: 0.7; }
  }

  @keyframes dustFloat {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(3px, -3px); }
  }
</style>

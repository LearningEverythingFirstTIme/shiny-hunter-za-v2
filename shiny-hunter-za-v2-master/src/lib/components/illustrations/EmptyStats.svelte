<!-- 
  Empty Stats Illustration
  A data analyst Pokemon with empty charts
-->
<script lang="ts">
  export let animate = true;
</script>

<div class="empty-illustration" class:animate>
  <svg viewBox="0 0 200 200" class="illustration-svg" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bodyGradStats" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#FFB7C5" />
        <stop offset="100%" style="stop-color:#FF91A4" />
      </linearGradient>
      <linearGradient id="creamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#FFF8F0" />
        <stop offset="100%" style="stop-color:#FFE4E1" />
      </linearGradient>
      <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#87CEEB" />
        <stop offset="100%" style="stop-color:#FFB7C5" />
      </linearGradient>
    </defs>

    <!-- Background decorative charts -->
    <g class="bg-charts" opacity="0.15">
      <!-- Bar chart outline -->
      <rect x="30" y="60" width="15" height="40" fill="#FFB7C5" rx="2" class="bg-bar-1"/>
      <rect x="50" y="50" width="15" height="50" fill="#87CEEB" rx="2" class="bg-bar-2"/>
      <rect x="70" y="70" width="15" height="30" fill="#FFD700" rx="2" class="bg-bar-3"/>
      
      <!-- Pie chart outline -->
      <circle cx="160" cy="70" r="20" fill="none" stroke="#FFB7C5" stroke-width="3"/>
      <path d="M160 70 L160 50 A20 20 0 0 1 175 60 Z" fill="#FFB7C5" opacity="0.3"/>
      <path d="M160 70 L175 60 A20 20 0 0 1 175 80 Z" fill="#87CEEB" opacity="0.3"/>
    </g>

    <!-- The Stats Pokemon -->
    <g class="stats-mon" transform="translate(100, 100)">
      <!-- Body -->
      <ellipse cx="0" cy="20" rx="45" ry="40" fill="url(#bodyGradStats)" stroke="#2D1B2E" stroke-width="2"/>
      
      <!-- Cream patch on belly -->
      <ellipse cx="0" cy="25" rx="28" ry="25" fill="url(#creamGrad)"/>

      <!-- Head -->
      <circle cx="0" cy="-25" r="32" fill="url(#bodyGradStats)" stroke="#2D1B2E" stroke-width="2"/>

      <!-- Ears -->
      <path d="M-25 -40 Q-40 -65 -30 -70 Q-15 -60 -18 -40" fill="url(#bodyGradStats)" stroke="#2D1B2E" stroke-width="2"/>
      <path d="M25 -40 Q40 -65 30 -70 Q15 -60 18 -40" fill="url(#bodyGradStats)" stroke="#2D1B2E" stroke-width="2"/>
      <!-- Ear tips -->
      <path d="M-30 -70 Q-35 -60 -28 -58" fill="#2D1B2E" opacity="0.2"/>
      <path d="M30 -70 Q35 -60 28 -58" fill="#2D1B2E" opacity="0.2"/>

      <!-- Face -->
      <!-- Glasses -->
      <g class="glasses">
        <circle cx="-12" cy="-25" r="10" fill="white" stroke="#2D1B2E" stroke-width="2" opacity="0.9"/>
        <circle cx="12" cy="-25" r="10" fill="white" stroke="#2D1B2E" stroke-width="2" opacity="0.9"/>
        <line x1="-2" y1="-25" x2="2" y2="-25" stroke="#2D1B2E" stroke-width="2"/>
        <!-- Glasses reflection -->
        <ellipse cx="-15" cy="-28" rx="3" ry="2" fill="white" opacity="0.6"/>
        <ellipse cx="9" cy="-28" rx="3" ry="2" fill="white" opacity="0.6"/>
      </g>

      <!-- Eyes behind glasses -->
      <circle cx="-12" cy="-25" r="3" fill="#2D1B2E" class="eye-left"/>
      <circle cx="12" cy="-25" r="3" fill="#2D1B2E" class="eye-right"/>

      <!-- Nose -->
      <ellipse cx="0" cy="-15" rx="3" ry="2" fill="#FF69B4"/>

      <!-- Mouth (slight frown - no data sadness) -->
      <path d="M-5 -8 Q0 -5 5 -8" fill="none" stroke="#2D1B2E" stroke-width="1.5" stroke-linecap="round"/>

      <!-- Blush marks -->
      <ellipse cx="-22" cy="-15" rx="5" ry="3" fill="#FF69B4" opacity="0.3"/>
      <ellipse cx="22" cy="-15" rx="5" ry="3" fill="#FF69B4" opacity="0.3"/>

      <!-- Paws holding clipboard -->
      <ellipse cx="-35" cy="10" rx="8" ry="10" fill="#FFF8F0" stroke="#2D1B2E" stroke-width="1.5"/>
      <ellipse cx="35" cy="10" rx="8" ry="10" fill="#FFF8F0" stroke="#2D1B2E" stroke-width="1.5"/>

      <!-- Clipboard with empty chart -->
      <g class="clipboard" transform="translate(0, 5)">
        <!-- Board -->
        <rect x="-30" y="-35" width="60" height="50" rx="4" fill="#8B4513" stroke="#2D1B2E" stroke-width="2"/>
        <!-- Paper -->
        <rect x="-26" y="-31" width="52" height="42" rx="2" fill="white"/>
        
        <!-- Empty chart lines -->
        <line x1="-20" y1="-20" x2="20" y2="-20" stroke="#E5E5E5" stroke-width="2" stroke-linecap="round"/>
        <line x1="-20" y1="-10" x2="15" y2="-10" stroke="#E5E5E5" stroke-width="2" stroke-linecap="round"/>
        <line x1="-20" y1="0" x2="10" y2="0" stroke="#E5E5E5" stroke-width="2" stroke-linecap="round"/>
        
        <!-- Bar chart outline -->
        <rect x="-18" y="5" width="8" height="0" fill="url(#chartGrad)" class="chart-bar-1" opacity="0.5"/>
        <rect x="-6" y="5" width="8" height="0" fill="url(#chartGrad)" class="chart-bar-2" opacity="0.5"/>
        <rect x="6" y="5" width="8" height="0" fill="url(#chartGrad)" class="chart-bar-3" opacity="0.5"/>

        <!-- Clip -->
        <rect x="-10" y="-38" width="20" height="10" rx="2" fill="#666" stroke="#2D1B2E" stroke-width="1.5"/>
      </g>

      <!-- Feet -->
      <ellipse cx="-20" cy="55" rx="10" ry="8" fill="#FFF8F0" stroke="#2D1B2E" stroke-width="1.5"/>
      <ellipse cx="20" cy="55" rx="10" ry="8" fill="#FFF8F0" stroke="#2D1B2E" stroke-width="1.5"/>
    </g>

    <!-- Floating data icons -->
    <g class="data-icons">
      <text x="45" y="150" font-size="18" fill="#FFB7C5" opacity="0.5" class="data-icon-1">📊</text>
      <text x="155" y="140" font-size="16" fill="#87CEEB" opacity="0.5" class="data-icon-2">📈</text>
      <text x="165" y="100" font-size="14" fill="#FFD700" opacity="0.4" class="data-icon-3">📉</text>
    </g>

    <!-- "No Data" stamp -->
    <g transform="translate(130, 60) rotate(-15)" opacity="0.6">
      <rect x="-30" y="-12" width="60" height="24" rx="4" fill="none" stroke="#FF6B6B" stroke-width="2" stroke-dasharray="3 2"/>
      <text x="0" y="4" font-size="11" text-anchor="middle" fill="#FF6B6B" font-weight="bold" font-family="monospace">NO DATA</text>
    </g>

    <!-- Shadow -->
    <ellipse cx="100" cy="175" rx="50" ry="10" fill="#2D1B2E" opacity="0.1"/>
  </svg>

  <div class="message">
    <h3>No Data Yet</h3>
    <p>Start hunting to fill up those charts!</p>
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
  .animate .stats-mon {
    animation: statsBreathe 2.5s ease-in-out infinite;
  }

  .animate .glasses {
    animation: glassesShine 3s ease-in-out infinite;
  }

  .animate .eye-left,
  .animate .eye-right {
    animation: blinkEyes 4s ease-in-out infinite;
  }

  .animate .clipboard {
    animation: clipboardSway 3s ease-in-out infinite;
    transform-origin: center;
  }

  .animate .chart-bar-1 {
    animation: barGrow 2s ease-in-out infinite;
  }

  .animate .chart-bar-2 {
    animation: barGrow 2s ease-in-out infinite 0.3s;
  }

  .animate .chart-bar-3 {
    animation: barGrow 2s ease-in-out infinite 0.6s;
  }

  .animate .bg-bar-1 {
    animation: bgBarPulse 3s ease-in-out infinite;
  }

  .animate .bg-bar-2 {
    animation: bgBarPulse 3s ease-in-out infinite 0.5s;
  }

  .animate .bg-bar-3 {
    animation: bgBarPulse 3s ease-in-out infinite 1s;
  }

  .animate .data-icon-1 {
    animation: dataFloat 3s ease-in-out infinite;
  }

  .animate .data-icon-2 {
    animation: dataFloat 2.5s ease-in-out infinite 0.5s;
  }

  .animate .data-icon-3 {
    animation: dataFloat 2s ease-in-out infinite 1s;
  }

  @keyframes statsBreathe {
    0%, 100% { transform: translate(100px, 100px); }
    50% { transform: translate(100px, 98px); }
  }

  @keyframes glassesShine {
    0%, 100% { opacity: 0.9; }
    50% { opacity: 0.7; }
  }

  @keyframes blinkEyes {
    0%, 90%, 100% { transform: scaleY(1); }
    95% { transform: scaleY(0.1); }
  }

  @keyframes clipboardSway {
    0%, 100% { transform: translate(0, 5px) rotate(0deg); }
    25% { transform: translate(0, 5px) rotate(-1deg); }
    75% { transform: translate(0, 5px) rotate(1deg); }
  }

  @keyframes barGrow {
    0%, 100% { height: 0; }
    50% { height: 8px; }
  }

  @keyframes bgBarPulse {
    0%, 100% { opacity: 0.15; }
    50% { opacity: 0.25; }
  }

  @keyframes dataFloat {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
    50% { transform: translateY(-8px) rotate(5deg); opacity: 0.7; }
  }
</style>

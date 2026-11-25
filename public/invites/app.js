/* Invitations prototype by Made Digital.
   No backend: everything is saved in this browser's localStorage, so the demo works on one device.
   Served as static files at /invites/. The rule in public/_redirects (and .htaccess on Afrihost)
   sends every /invites/... address here instead of to the React site. */
(function () {
  'use strict';

  const KEY = 'invites-demo-v3', MINE = 'invites-mine-v3', VOTES = 'invites-votes-v3';
  const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const app = document.getElementById('app');

  /* ---------- Icons: 24px line drawings ---------- */
  const ICONS = {
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    shirt: '<path d="M8 3 3 6l2 5 2-1v11h10V10l2 1 2-5-5-3a4 4 0 0 1-8 0z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    share: '<path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v14"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    star: '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.8 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
    heart: '<path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',
    gift: '<rect x="3" y="8" width="18" height="13" rx="1"/><path d="M12 8v13M3 12h18M12 8S10 3 7.5 4 9 8 12 8zm0 0s2-5 4.5-4S15 8 12 8z"/>',
    ring: '<circle cx="12" cy="14.5" r="6"/><path d="m9.5 4.5 2.5-2 2.5 2-2.5 3.5z"/>',
    moon: '<path d="M15 3.5a8.5 8.5 0 1 0 5.5 14 7 7 0 0 1-5.5-14z"/><path d="m18 6 .6 1.4L20 8l-1.4.6L18 10l-.6-1.4L16 8l1.4-.6z"/>',
    flower: '<circle cx="12" cy="12" r="2.5"/><path d="M12 9.5C10 6 10 3.5 12 3s2 3 0 6.5zM14.5 12c3.5-2 6-2 6.5 0s-3 2-6.5 0zM12 14.5c2 3.5 2 6 0 6.5s-2-3 0-6.5zM9.5 12C6 14 3.5 14 3 12s3-2 6.5 0z"/>',
    cake: '<path d="M4 21h16v-8H4zM4 16c2 1.5 4 1.5 5.3 0 1.4 1.5 4 1.5 5.4 0 1.3 1.5 3.3 1.5 5.3 0M8 13v-3M12 13v-3M16 13v-3M8 7v.01M12 6v.01M16 7v.01"/>',
    balloon: '<path d="M12 15c3.3 0 6-3 6-6.5S15.3 2 12 2 6 5 6 8.5 8.7 15 12 15z"/><path d="m11 15-1 2h4l-1-2M12 17c0 2-2 2.5-1 5"/>',
    baby: '<circle cx="12" cy="9" r="5"/><path d="M10.2 8.5h.01M13.8 8.5h.01M10.5 11c.8.6 2.2.6 3 0M12 4c0-1 1-2 2-1.5"/><path d="M6 21c1-3.5 3.3-5 6-5s5 1.5 6 5"/>',
    rings: '<circle cx="9" cy="14" r="5"/><circle cx="15" cy="14" r="5"/><path d="m11 5 1-2 1 2-1 1.5z"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m9 14-2 7 5-2.5 5 2.5-2-7"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/>',
    cap: '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c3.5 2.5 8.5 2.5 12 0v-5M22 9v6"/>',
    lantern: '<path d="M12 2v2M9 4h6l1 3H8z"/><path d="M8 7c-1.5 2-1.5 8 0 11h8c1.5-3 1.5-9 0-11"/><path d="M9 18l-.5 2h7l-.5-2M12 10v4"/>',
    dove: '<path d="M3 13c3 0 5.5-2.5 8-2.5 1.6 0 2.6.8 3.4 1.8L20 11l-2.6 3c0 4-3.5 6.5-8 6.5-2.6 0-4.5-1-5.4-2l2.8-1C5 16.5 3.6 15 3 13z"/><path d="M11 10.5C10 7.5 11 4.5 14 3c0 3 .5 5-.6 8.3"/>',
    home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10M10 20v-5h4v5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7z"/>',
    crown: '<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>',
    ticket: '<path d="M3 8a2 2 0 0 0 0 4v0a2 2 0 0 1 0 4v2h18v-2a2 2 0 0 1 0-4 2 2 0 0 0 0-4V6H3z"/><path d="M14 6v12" stroke-dasharray="2 2"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.5-3.5 3-5.5 6.5-5.5s6 2 6.5 5.5M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c2 .8 3.2 2.5 3.5 5.2"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    download: '<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    chat: '<path d="M4 20l1.5-4A8 8 0 1 1 9 19z"/>',
    palette: '<path d="M12 3a9 9 0 0 0 0 18c1.5 0 2-1 2-2 0-1.5-1.5-2 0-3.5 1-1 4-.5 5.5-1.5A9 9 0 0 0 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>'
  };
  const icon = (name, cls) => `<svg class="ic${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;

  /* ---------- Fonts: each theme loads only its own ---------- */
  const FONTS = {
    cormorant: 'Cormorant+Garamond:ital,wght@0,500;0,600;1,500', pinyon: 'Pinyon+Script', playfair: 'Playfair+Display:ital,wght@0,600;1,500',
    unbounded: 'Unbounded:wght@700;900', dmserif: 'DM+Serif+Display:ital@0;1', fredoka: 'Fredoka:wght@500;700', caveat: 'Caveat:wght@700',
    amiri: 'Amiri', fraunces: 'Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,500', syne: 'Syne:wght@700;800', manrope: 'Manrope:wght@400;600;700',
    bricolage: 'Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800', quicksand: 'Quicksand:wght@600;700', outfit: 'Outfit:wght@400;600;700', jost: 'Jost:wght@400;500;600'
  };
  const FAMILY = {
    cormorant: "'Cormorant Garamond', Georgia, serif", pinyon: "'Pinyon Script', cursive", playfair: "'Playfair Display', Georgia, serif",
    unbounded: "'Unbounded', system-ui, sans-serif", dmserif: "'DM Serif Display', Georgia, serif", fredoka: "'Fredoka', system-ui, sans-serif",
    caveat: "'Caveat', cursive", amiri: "'Amiri', serif", fraunces: "'Fraunces', Georgia, serif", syne: "'Syne', system-ui, sans-serif",
    manrope: "'Manrope', system-ui, sans-serif", bricolage: "'Bricolage Grotesque', system-ui, sans-serif", quicksand: "'Quicksand', system-ui, sans-serif",
    outfit: "'Outfit', system-ui, sans-serif", jost: "'Jost', system-ui, sans-serif"
  };
  const loadedFonts = {};
  function loadFonts(keys) {
    const want = keys.filter((k) => k && FONTS[k] && !loadedFonts[k]);
    if (!want.length) return;
    want.forEach((k) => { loadedFonts[k] = true; });
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?' + want.map((k) => 'family=' + FONTS[k]).join('&') + '&display=swap';
    document.head.appendChild(link);
  }
  const themeFonts = (t) => [t.display, t.script, t.body];

  /* ---------- Themes: each one is its own small design system ---------- */
  const THEMES = {
    blush: {
      name: 'Blush Garden', mood: 'Soft, romantic and full of roses', photo: 'blush', layout: 'arch', ornament: 'none', opening: 'envelope', ambient: 'petals',
      display: 'cormorant', script: 'pinyon', body: 'jost', fx: ['#e8a3b1', '#f6d5d9', '#c9a46a', '#a8435b'],
      c: { backdrop: 'radial-gradient(circle at 20% 0, #fbe9e6, #f0d2cd 70%)', card: '#fffaf7', ink: '#4a2a30', muted: '#76565c', accent: '#a8435b', accentInk: '#fffaf7', soft: '#fbecea', line: 'rgba(74,42,48,.16)', gold: '#c9a46a', petal: '#e8a3b1' }
    },
    blacktie: {
      name: 'Black Tie', mood: 'Gold on black, for a grand evening', photo: 'blacktie', layout: 'poster', ornament: 'deco', opening: 'curtain', ambient: 'sparkle',
      display: 'playfair', script: 'playfair', body: 'jost', fx: ['#d4af6a', '#f4ead8', '#8a6d3b'], dark: true,
      c: { backdrop: 'radial-gradient(circle at 30% 0, #2e2820, #0b0a09 70%)', card: '#121110', ink: '#f4ead8', muted: '#c2b6a0', accent: '#d4af6a', accentInk: '#121110', soft: 'rgba(212,175,106,.12)', line: 'rgba(244,234,216,.18)', gold: '#d4af6a', petal: '#d4af6a' }
    },
    neon: {
      name: 'Neon Night', mood: 'Loud, glowing and ready to dance', photo: 'neon', layout: 'poster', ornament: 'none', opening: 'ticket', ambient: 'beams',
      display: 'unbounded', script: 'playfair', body: 'outfit', fx: ['#ff3d9a', '#f0c96a', '#8a2be2', '#fbeff6'], dark: true,
      c: { backdrop: 'radial-gradient(circle at 20% 10%, #4a1240, #12081a 60%)', card: '#1c0f22', ink: '#fbeff6', muted: '#dcc7d5', accent: '#ff3d9a', accentInk: '#1c0f22', soft: 'rgba(255,61,154,.13)', line: 'rgba(251,239,246,.22)', gold: '#f0c96a', petal: '#ff3d9a' }
    },
    carnival: {
      name: 'Carnival', mood: 'Stripes, festoon lights and a night at the fair', photo: 'carnival', layout: 'overlap', ornament: 'scallop', opening: 'ticket', ambient: 'festoon',
      display: 'dmserif', script: 'dmserif', body: 'outfit', fx: ['#c4441e', '#1f2a44', '#e9b949', '#fbf7f0'],
      c: { backdrop: '#e9e4da', card: '#fbf7f0', ink: '#1d2230', muted: '#535969', accent: '#c4441e', accentInk: '#fffaf3', soft: '#f6e6dc', line: 'rgba(29,34,48,.16)', gold: '#e9b949', brand: '#1f2a44', petal: '#c4441e' }
    },
    sweet: {
      name: 'Sweet Party', mood: 'Pink, playful and full of balloons', photo: 'sweet', layout: 'overlap', ornament: 'dots', opening: 'gift', ambient: 'balloons',
      display: 'fredoka', script: 'caveat', body: 'outfit', fx: ['#f39bb6', '#d8b25a', '#b83f71', '#fdeef2', '#9ad0ec'],
      c: { backdrop: 'radial-gradient(circle at 80% 0, #fde9ee, #f6cfd9 70%)', card: '#fffaf8', ink: '#4a2838', muted: '#755263', accent: '#b83f71', accentInk: '#fffaf8', soft: '#fdeef2', line: 'rgba(74,40,56,.16)', gold: '#d8b25a', petal: '#f39bb6' }
    },
    mosaic: {
      name: 'Arches and Lanterns', mood: 'Warm arches, lanterns and geometric detail', photo: 'mosaic', layout: 'arch', ornament: 'pattern', opening: 'lantern', ambient: 'lanterns',
      display: 'cormorant', script: 'cormorant', body: 'jost', fx: ['#c99a3e', '#14513f', '#f8f2e4'],
      c: { backdrop: 'radial-gradient(circle at 50% 0, #1b4a40, #0b241f 70%)', card: '#f8f2e4', ink: '#1d2b26', muted: '#545f58', accent: '#14513f', accentInk: '#f8f2e4', soft: '#efe7d3', line: 'rgba(29,43,38,.16)', gold: '#b8862f', petal: '#c99a3e' }
    },
    coastal: {
      name: 'Coastal Linen', mood: 'Sea air, linen and soft blues', photo: 'coastal', layout: 'overlap', ornament: 'wave', opening: 'envelope', ambient: 'bubbles',
      display: 'cormorant', script: 'cormorant', body: 'jost', fx: ['#2a7480', '#9fc9cf', '#e8c9a0', '#fbf8f2'],
      c: { backdrop: 'linear-gradient(180deg, #d7e8ec, #f3ede2)', card: '#fbf8f2', ink: '#1f3a44', muted: '#526870', accent: '#2a7480', accentInk: '#fbf8f2', soft: '#e6efef', line: 'rgba(31,58,68,.15)', gold: '#c9a46a', petal: '#9fc9cf' }
    },
    boho: {
      name: 'Golden Hour', mood: 'Terracotta, pampas and late sun', photo: 'boho', layout: 'poster', ornament: 'none', opening: 'envelope', ambient: 'petals',
      display: 'fraunces', script: 'caveat', body: 'outfit', fx: ['#a6552f', '#e8c39b', '#c99a5b', '#fbf4ec'],
      c: { backdrop: 'radial-gradient(circle at 30% 0, #f3dcc4, #dfb894 75%)', card: '#fbf4ec', ink: '#3f2a1e', muted: '#72574a', accent: '#a6552f', accentInk: '#fbf4ec', soft: '#f4e4d4', line: 'rgba(63,42,30,.16)', gold: '#c99a5b', petal: '#d9a273' }
    },
    minimal: {
      name: 'Modern Minimal', mood: 'Clean lines and big, confident type', photo: 'minimal', layout: 'type', ornament: 'none', opening: 'envelope', ambient: 'none',
      display: 'syne', script: 'syne', body: 'manrope', fx: ['#141414', '#bdbab2', '#f7f6f2'],
      c: { backdrop: '#e7e5df', card: '#f7f6f2', ink: '#141414', muted: '#585858', accent: '#141414', accentInk: '#f7f6f2', soft: '#ecebe6', line: 'rgba(20,20,20,.14)', gold: '#8c8a83', petal: '#bdbab2' }
    },
    tropical: {
      name: 'Tropical Fiesta', mood: 'Bright, sunny and a little bit wild', photo: 'tropical', layout: 'overlap', ornament: 'dots', opening: 'gift', ambient: 'confetti',
      display: 'bricolage', script: 'caveat', body: 'outfit', fx: ['#c8372c', '#f2b134', '#13403a', '#ff8fa3', '#3fb6a8'],
      c: { backdrop: 'radial-gradient(circle at 70% 0, #ffe08a, #ff9e6d 75%)', card: '#fff9ee', ink: '#13403a', muted: '#456660', accent: '#c8372c', accentInk: '#fff9ee', soft: '#ffecc9', line: 'rgba(19,64,58,.16)', gold: '#f2b134', petal: '#f2b134' }
    },
    littlestar: {
      name: 'Little Star', mood: 'Soft blues, clouds and twinkling stars', photo: 'littlestar', layout: 'arch', ornament: 'none', opening: 'gift', ambient: 'sparkle',
      display: 'quicksand', script: 'caveat', body: 'outfit', fx: ['#4a6fa8', '#d8b25a', '#bcd3ee', '#fbf8f3'],
      c: { backdrop: 'radial-gradient(circle at 50% 0, #e3eefa, #c9dbf0 70%)', card: '#fbf8f3', ink: '#2c3e5c', muted: '#56667f', accent: '#4a6fa8', accentInk: '#fbf8f3', soft: '#e9f0f9', line: 'rgba(44,62,92,.15)', gold: '#d8b25a', petal: '#d8b25a' }
    },
    garden: {
      name: 'Garden Party', mood: 'Long tables, greenery and string lights', photo: 'garden', layout: 'overlap', ornament: 'none', opening: 'envelope', ambient: 'petals',
      display: 'fraunces', script: 'fraunces', body: 'outfit', fx: ['#4a6636', '#b89a4e', '#cfdcae', '#fbf9f2'],
      c: { backdrop: 'linear-gradient(180deg, #dfe7d3, #f3efe4)', card: '#fbf9f2', ink: '#22311f', muted: '#52604c', accent: '#4a6636', accentInk: '#fbf9f2', soft: '#edf0e2', line: 'rgba(34,49,31,.15)', gold: '#b89a4e', petal: '#8fae6d' }
    }
  };

  function lum(hex) {
    const v = [1, 3, 5].map((i) => parseInt(hex.substr(i, 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  }
  const validHex = (h) => /^#[0-9a-f]{6}$/i.test(h || '');
  function themeVars(ev) {
    const t = THEMES[ev.theme] || THEMES.blush, c = Object.assign({}, t.c);
    let accentText = c.accent;
    if (validHex(ev.accent)) {
      c.accent = ev.accent;
      c.accentInk = lum(ev.accent) > 0.4 ? '#1b1a17' : '#fbf8f3';
      c.soft = `color-mix(in srgb, ${ev.accent} 14%, ${c.card})`;
      const cardLight = !t.dark;
      accentText = (cardLight && lum(ev.accent) > 0.3) || (!cardLight && lum(ev.accent) < 0.15) ? c.ink : ev.accent;
    }
    return `--backdrop:${c.backdrop};--card:${c.card};--ink:${c.ink};--muted:${c.muted};--accent:${c.accent};--accent-ink:${c.accentInk};--accent-text:${accentText};` +
      `--soft:${c.soft};--line:${c.line};--gold:${c.gold};--brand:${c.brand || c.ink};--petal:${c.petal};` +
      `--display:${FAMILY[t.display]};--script:${FAMILY[t.script || t.display]};--body:${FAMILY[t.body]};`;
  }
  const photoOf = (ev, thumb) => ev.photo || `/invites/img/${(THEMES[ev.theme] || THEMES.blush).photo}${thumb ? '-thumb' : ''}.jpg`;

  /* ---------- Event types ---------- */
  const MEMORY = {
    love: [['💍', 'Ring'], ['🌸', 'Flower'], ['💌', 'Love letter'], ['🎂', 'Cake'], ['🕊️', 'Dove'], ['💐', 'Bouquet']],
    party: [['🎈', 'Balloon'], ['🎂', 'Cake'], ['🎁', 'Gift'], ['🎉', 'Party popper'], ['🍰', 'Slice of cake'], ['🎵', 'Music note']],
    baby: [['🍼', 'Bottle'], ['🧸', 'Teddy bear'], ['⭐', 'Star'], ['🌙', 'Moon'], ['🎀', 'Ribbon'], ['🐣', 'Chick']],
    work: [['📅', 'Calendar'], ['🤝', 'Handshake'], ['☕', 'Coffee'], ['🎤', 'Microphone'], ['🏆', 'Trophy'], ['💼', 'Briefcase']]
  };
  const NIKAH_WORDS = [['Nikah', 'The marriage contract'], ['Walima', 'The wedding feast'], ['Mahr', "The groom's gift to the bride"], ['Barakah', 'Blessing'], ['Du\'a', 'A personal prayer']];
  const FAITH_WORDS = [['Barakah', 'Blessing'], ['Du\'a', 'A personal prayer'], ['Sadaqah', 'Voluntary charity'], ['Shukr', 'Gratitude'], ['Sabr', 'Patience']];

  const TYPES = {
    wedding: { label: 'Wedding', icon: 'ring', blurb: 'Ceremony and reception', theme: 'blush', kicker: 'The wedding of', namesLabel: "Couple's names", ph: 'Lerato & Daniel',
      wording: 'Together with their families, invite you to celebrate their wedding', fn1: 'Ceremony', fn2: 'Reception', two: true,
      prog: 'Guests arrive\nCeremony\nPhotographs\nReception\nMeal is served', dress: 'Smart and elegant.', moment: 'scratch', secret: 'There is a surprise performance after dinner!',
      reward: 'card', quiz: 'Who knows the couple best?', memory: 'love' },
    engagement: { label: 'Engagement', icon: 'heart', blurb: 'Celebrate the yes', theme: 'boho', kicker: 'Celebrating the engagement of', namesLabel: "Couple's names", ph: 'Naledi & Sipho',
      wording: 'They said yes! Come and celebrate with us', fn1: 'Celebration', fn2: 'Lunch', prog: 'Guests arrive\nWelcome\nThe toast\nMeal is served', dress: 'Smart casual.',
      moment: 'scratch', secret: 'The ring was hidden in a bunch of flowers.', reward: 'card', quiz: 'How well do you know them?', memory: 'love' },
    nikah: { label: 'Nikah and Walima', icon: 'moon', blurb: 'Two functions, one invitation', theme: 'mosaic', kicker: 'The Nikah and Walima of', namesLabel: "Couple's names", ph: 'Amina & Yusuf',
      wording: 'Together with their families, invite you to share in their Nikah and Walima', fn1: 'Nikah', fn2: 'Walima', two: true, faith: true, separate: true,
      prog: 'Guests arrive\nNikah\nSalaah\nMeal is served\nDu\'a and closing', dress: 'Modest dress, please.', notes: 'Salaah facilities are available at the venue.',
      moment: null, reward: 'card', quiz: 'Who knows the couple best?', memory: 'love', words: NIKAH_WORDS },
    bridal: { label: 'Bridal shower', icon: 'flower', blurb: 'Kitchen teas and bridal showers', theme: 'coastal', kicker: 'A bridal shower for', namesLabel: "The bride-to-be's name", ph: 'Zinhle',
      wording: 'Join us to shower the bride-to-be with love', fn1: 'The shower', fn2: 'Lunch', prog: 'Guests arrive\nGames\nGifts\nTea and treats', dress: 'Something pretty.',
      moment: 'balloons', secrets: ['There is a dessert table. A big one.', 'We have a game planned. Prepare to laugh.', 'Bring your best marriage advice.'], reward: 'pass', quiz: 'How well do you know the bride?', memory: 'love' },
    birthday: { label: 'Birthday', icon: 'cake', blurb: 'Milestones and big birthdays', theme: 'neon', kicker: 'You are invited to', namesLabel: 'Whose birthday is it?', ph: "Thandi's 40th",
      wording: 'Come and celebrate with us', fn1: 'The party', fn2: 'After party', prog: 'Guests arrive\nWelcome\nMeal is served\nCake and speeches\nDance floor opens', dress: 'Dress to impress.',
      moment: 'balloons', secrets: ['There is a live DJ.', 'The cake has three tiers.', 'There is a photo booth with props.'], reward: 'pass', quiz: 'Who knows the birthday star?', memory: 'party' },
    kids: { label: "Kids' party", icon: 'balloon', blurb: 'Birthdays for little ones', theme: 'sweet', kicker: 'A party for', namesLabel: "Child's name and age", ph: 'Amara turns 5',
      wording: 'Come and play! There will be cake.', fn1: 'The party', fn2: 'Second event', prog: 'Arrive and play\nGames\nCake\nParty bags', dress: 'Come dressed for fun.',
      moment: 'balloons', secrets: ['There is a jumping castle.', 'Every guest goes home with a party bag.', 'The cake is shaped like a castle.'], reward: 'pass', sleeps: true, quiz: 'Who knows the birthday child?', memory: 'party' },
    baby: { label: 'Baby shower', icon: 'baby', blurb: 'Showers and gender reveals', theme: 'littlestar', kicker: 'A baby shower for', namesLabel: 'Parents or baby', ph: 'Baby Naidoo',
      wording: 'A little one is on the way. Come and celebrate with us', fn1: 'The shower', fn2: 'Lunch', prog: 'Guests arrive\nGames\nThe big reveal\nTea and treats', dress: 'Wear pink or blue: your guess!',
      moment: 'scratch', secret: "It's a girl!", reward: 'pass', quiz: 'Guess the baby facts', memory: 'baby' },
    anniversary: { label: 'Anniversary', icon: 'rings', blurb: 'Years of love, worth a party', theme: 'garden', kicker: 'Celebrating', namesLabel: 'Whose anniversary?', ph: 'Ruth & Peter: 25 years',
      wording: 'Join us as we celebrate a milestone anniversary', fn1: 'Celebration', fn2: 'Lunch', prog: 'Guests arrive\nWelcome\nRenewal of vows\nMeal is served', dress: 'Smart casual.',
      moment: 'scratch', secret: 'They met at a bus stop, in the rain.', reward: 'card', quiz: 'How well do you know them?', memory: 'love' },
    corporate: { label: 'Year-end function', icon: 'briefcase', blurb: 'Year-ends and team celebrations', theme: 'carnival', kicker: 'You are invited to', namesLabel: 'Name of the function', ph: 'Northline Year-End',
      wording: 'Celebrate the year with the whole team', fn1: 'The function', fn2: 'After party', prog: 'Arrivals\nWelcome\nDinner\nAwards and thank-yous\nDance floor', dress: 'Smart, with a bit of fun.',
      moment: 'poll', poll: { q: 'What should we serve for dessert?', options: ['Churros', 'An ice cream bar', 'Koeksisters'] }, reward: 'ticket', quiz: 'Team trivia', memory: 'work' },
    gala: { label: 'Gala and awards', icon: 'award', blurb: 'Formal dinners and award nights', theme: 'blacktie', kicker: 'You are invited to', namesLabel: 'Name of the gala', ph: 'Annual Excellence Awards',
      wording: 'An evening honouring the year\'s best', fn1: 'Gala dinner', fn2: 'After party', prog: 'Arrivals\nWelcome\nDinner\nThe awards', dress: 'Black tie.',
      moment: 'poll', poll: { q: 'Which award are you most excited about?', options: ['Rising Star', 'Team of the Year', 'Lifetime Achievement'] }, reward: 'ticket', quiz: 'Company trivia', memory: 'work' },
    launch: { label: 'Launch or conference', icon: 'mic', blurb: 'Product launches and conferences', theme: 'minimal', kicker: 'Join us for', namesLabel: 'Name of the event', ph: 'The Spring Launch',
      wording: 'Be the first to see what we have been working on', fn1: 'Launch', fn2: 'Networking', prog: 'Registration\nKeynote\nPanel\nNetworking', dress: 'Business casual.',
      moment: 'poll', poll: { q: 'Which session are you most looking forward to?', options: ['The keynote', 'The panel', 'Networking'] }, reward: 'ticket', quiz: 'Quick trivia', memory: 'work' },
    matric: { label: 'Matric dance or graduation', icon: 'cap', blurb: 'Dances, graduations and prize-givings', theme: 'neon', kicker: 'Celebrating the', namesLabel: 'Name of the event', ph: 'Class of 2027',
      wording: 'One last night together. Dress to impress.', fn1: 'The dance', fn2: 'After party', prog: 'Red carpet arrivals\nPhotographs\nDinner\nDance floor opens', dress: 'Formal.',
      moment: 'poll', poll: { q: 'Pick the first song', options: ['Something classic', 'Something to dance to', 'Something to sing along to'] }, reward: 'ticket', quiz: 'Class trivia', memory: 'party' },
    aqiqah: { label: 'Aqiqah and naming', icon: 'lantern', blurb: 'Welcoming a new baby', theme: 'littlestar', kicker: 'The Aqiqah of', namesLabel: "Baby's name", ph: 'Baby Zayd',
      wording: 'The family invite you to celebrate the Aqiqah and naming of their child', fn1: 'Aqiqah', fn2: 'Meal', faith: true,
      prog: 'Guests arrive\nQur\'an recitation\nNaming and du\'a\nMeal is served', dress: 'Modest dress, please.', notes: 'Salaah facilities are available at the venue.',
      moment: null, reward: 'card', quiz: 'Who knows the family?', memory: 'baby', words: FAITH_WORDS },
    christening: { label: 'Christening or dedication', icon: 'dove', blurb: 'Christenings and baby dedications', theme: 'coastal', kicker: 'The christening of', namesLabel: "Baby's name", ph: 'Baby Grace',
      wording: 'Please join us as we celebrate our little one', fn1: 'Service', fn2: 'Lunch', two: true, prog: 'Service\nPhotographs\nLunch', dress: 'Smart casual.',
      moment: null, reward: 'card', quiz: 'Who knows the family?', memory: 'baby' },
    reunion: { label: 'Family day or reunion', icon: 'home', blurb: 'Reunions, family days and picnics', theme: 'garden', kicker: 'You are invited to', namesLabel: 'Name of the gathering', ph: 'The Abrahams family reunion',
      wording: 'Bring your appetite and your best stories', fn1: 'Family day', fn2: 'Dinner', prog: 'Arrive and catch up\nLunch\nGames for the kids\nFamily photo', dress: 'Comfortable.',
      moment: 'balloons', secrets: ['Granny is bringing her famous pudding.', 'There is a family photo at three.', 'Someone found the old home videos.'], reward: 'pass', quiz: 'Family trivia', memory: 'party' }
  };
  const isFaith = (ev) => !!(TYPES[ev.type] || {}).faith;
  const typeOf = (ev) => TYPES[ev.type] || TYPES.wedding;

  /* Fills a draft with the words and look for its type. Runs only when the type changes. */
  function applyType(d) {
    const t = TYPES[d.type];
    d.theme = t.theme; d.wording = t.wording; d.prog = t.prog; d.dress = t.dress; d.notes = t.notes || '';
    d.fns[0].name = t.fn1; d.fns[1].name = t.fn2; d.two = !!t.two;
    d.bismillah = !!t.faith; d.separate = !!t.separate; d.accent = '';
    d.secret = t.secret || ''; d.secrets = (t.secrets || []).slice(); d.poll = t.poll ? { q: t.poll.q, options: t.poll.options.slice() } : null;
  }

  /* ---------- Sample data ---------- */
  function seed() {
    const ad = (id, name, fns, adults, kids, diet, msg) => ({ id, name, going: !!fns.length, fns, men: 0, women: 0, adults, kids, diet: diet || '', msg: msg || '' });
    const mw = (id, name, fns, men, women, kids, diet, msg) => ({ id, name, going: !!fns.length, fns, men, women, adults: 0, kids, diet: diet || '', msg: msg || '' });
    const base = (o) => Object.assign({ wording: TYPES[o.type].wording, prog: TYPES[o.type].prog, dress: TYPES[o.type].dress, notes: TYPES[o.type].notes || '', bismillah: !!TYPES[o.type].faith,
      separate: false, diet: true, games: true, accent: '', photo: '', secret: TYPES[o.type].secret || '', secrets: (TYPES[o.type].secrets || []).slice(),
      poll: TYPES[o.type].poll ? JSON.parse(JSON.stringify(TYPES[o.type].poll)) : null, votes: [0, 0, 0], quiz: [], expected: [], replies: [], scores: [] }, o);
    return {
      venue: { name: 'The Jasmine Hall', address: 'Sample Road, Cape Town' },
      events: [
        base({
          id: 'lerato-daniel', type: 'wedding', theme: 'blush', names: 'Lerato & Daniel',
          fns: [{ name: 'Ceremony', date: '2027-03-06', time: '14:00', place: 'The Jasmine Hall garden' }, { name: 'Reception', date: '2027-03-06', time: '17:00', place: 'The Jasmine Hall' }],
          prog: '13:30 Guests arrive\n14:00 Ceremony\n15:00 Photographs\n17:00 Reception\n18:00 Meal is served', notes: 'There is parking on site.', closes: '2027-02-06',
          secret: 'Dinner is a Cape Malay feast, so come hungry!',
          quiz: [
            { q: 'Who said "I love you" first?', options: ['Lerato', 'Daniel', 'They said it together'], answer: 1 },
            { q: 'Where was their first date?', options: ['Kalk Bay', 'The cinema', 'A very long queue'], answer: 0 },
            { q: 'Who is the better cook?', options: ['Lerato', 'Daniel', 'Neither, ask their mothers'], answer: 2 }
          ],
          expected: ['The Mokoena family', 'Aunt Thandi', 'Uncle Bheki', 'The Peterses'],
          replies: [
            ad('l1', 'The Naidoo family', [0, 1], 2, 2, 'One vegetarian', 'Congratulations, you two!'), ad('l2', 'Sam Peters', [1], 1, 0),
            ad('l3', 'Nomsa & Kagiso', [0, 1], 2, 0, '', 'Wouldn\'t miss it.'), ad('l4', 'The van Wyks', [0, 1], 2, 3, 'One nut allergy'),
            ad('l5', 'Grandma Rose', [0, 1], 1, 0, 'Soft food, please', 'So proud of you both.'), ad('l6', 'Chris Adams', [], 0, 0, '', 'Sorry, I will be overseas. Have the best day.'),
            ad('l7', 'Fatima & Imran', [1], 2, 1, 'Halaal')
          ],
          scores: [{ name: 'Nomsa', score: 3 }, { name: 'Sam', score: 2 }]
        }),
        base({
          id: 'amina-yusuf', type: 'nikah', theme: 'mosaic', names: 'Amina & Yusuf', separate: true,
          fns: [{ name: 'Nikah', date: '2027-04-10', time: '15:00', place: 'Masjid (sample)' }, { name: 'Walima', date: '2027-04-11', time: '13:00', place: 'The Jasmine Hall' }],
          prog: '13:00 Guests arrive\n13:30 Qur\'an recitation and welcome\n14:00 Meal is served\n15:30 Salaah\n16:00 Du\'a and closing', notes: 'Salaah facilities are available at the hall.', closes: '2027-03-20',
          quiz: [{ q: 'Where did Amina and Yusuf first meet?', options: ['At a family lunch', 'At university', 'At a fundraiser'], answer: 2 }, { q: 'What will they never agree on?', options: ['Whose koesisters are best', 'The right time to leave', 'Who drives'], answer: 0 }],
          expected: ['Uncle Ismail & family', 'The Hendricks family', 'Auntie Gadija'],
          replies: [mw('a1', 'The Davids family', [0, 1], 2, 2, 3, 'One nut allergy', 'May Allah bless your marriage.'), mw('a2', 'Zainab Solomons', [1], 0, 1, 0), mw('a3', 'Moegamat & Nazeema Jacobs', [0, 1], 1, 1, 0, '', 'So happy for you both.'), mw('a4', 'Shafiek Daniels', [], 0, 0, 0, '', 'Sorry to miss it. Du\'as from Durban.')]
        }),
        base({
          id: 'amara-turns-5', type: 'kids', theme: 'sweet', names: 'Amara turns 5',
          fns: [{ name: 'The party', date: '2027-02-20', time: '14:00', place: 'The Jasmine Hall garden' }], prog: '14:00 Arrive and play\n15:00 Games\n15:45 Cake\n16:30 Party bags', closes: '2027-02-10',
          expected: ['The Khumalo twins'], replies: [ad('k1', 'Lily and mum', [0], 1, 1, 'Dairy-free'), ad('k2', 'The Jacobs boys', [0], 1, 2)]
        }),
        base({
          id: 'northline-year-end', type: 'corporate', theme: 'carnival', names: 'Northline Year-End',
          fns: [{ name: 'The function', date: '2026-12-04', time: '18:30', place: 'The Jasmine Hall marquee' }], prog: '18:30 Arrivals and carnival games\n19:30 Food trucks open\n20:30 Awards and thank-yous\n21:00 Dance floor',
          notes: 'A shuttle leaves the office at 18:00.', closes: '2026-12-01', votes: [4, 2, 5],
          expected: ['Finance team', 'Sales team'], replies: [ad('c1', 'Thabo Nkosi', [0], 1, 0, 'Vegetarian'), ad('c2', 'Priya Govender', [0], 1, 0)]
        }),
        base({
          id: 'thandis-40th', type: 'birthday', theme: 'neon', names: "Thandi's 40th",
          fns: [{ name: 'The party', date: '2027-01-23', time: '19:00', place: 'The Jasmine Hall' }], prog: '19:00 Doors open\n20:00 Dinner\n21:00 Cake and speeches\n21:30 Dance floor opens', closes: '2027-01-09',
          replies: [ad('t1', 'Lindiwe', [0], 2, 0, '', 'Forty and fabulous!')]
        }),
        base({
          id: 'baby-naidoo', type: 'baby', theme: 'littlestar', names: 'Baby Naidoo',
          fns: [{ name: 'The shower', date: '2027-02-13', time: '11:00', place: 'The Jasmine Hall garden' }], prog: '11:00 Guests arrive\n11:30 Games\n12:30 The big reveal\n13:00 Tea and treats', closes: '2027-02-01',
          replies: [ad('b1', 'Kavitha', [0], 1, 0)]
        }),
        base({
          id: 'excellence-awards', type: 'gala', theme: 'blacktie', names: 'Annual Excellence Awards',
          fns: [{ name: 'Gala dinner', date: '2027-03-19', time: '18:30', place: 'The Jasmine Hall ballroom' }], prog: '18:30 Arrivals\n19:15 Welcome\n19:30 Dinner\n21:00 The awards', closes: '2027-03-01', votes: [3, 6, 2]
        })
      ]
    };
  }

  /* ---------- Store ---------- */
  let db;
  function load() {
    try { db = JSON.parse(localStorage.getItem(KEY)); } catch (e) { db = null; }
    if (!db || !db.events) { db = seed(); save(); }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(db)); return true; }
    catch (e) { toast('This browser could not save that. A smaller photo may help.'); return false; }
  }
  const getEvent = (id) => db.events.find((e) => e.id === id);
  function readMap(key) { try { return JSON.parse(localStorage.getItem(key)) || {}; } catch (e) { return {}; } }
  function writeMap(key, id, val) { const m = readMap(key); m[id] = val; try { localStorage.setItem(key, JSON.stringify(m)); } catch (e) { /* demo keeps working */ } }
  const mineGet = (id) => readMap(MINE)[id];
  const mineSet = (id, rid) => writeMap(MINE, id, rid);
  const voteGet = (id) => readMap(VOTES)[id];

  /* ---------- Helpers ---------- */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const n = (v) => { const x = parseInt(v, 10); return isNaN(x) || x < 0 ? 0 : Math.min(x, 99); };
  function fmtDate(d, opts) {
    if (!d) return '';
    return new Date(d + 'T12:00:00').toLocaleDateString('en-GB', opts ||{ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }
  const shortDate = (d) => fmtDate(d, { day: 'numeric', month: 'long', year: 'numeric' });
  const linkTo = (path) => location.origin + path;
  function go(path) { history.pushState(null, '', path); route(); }
  const people = (r) => n(r.men) + n(r.women) + n(r.adults) + n(r.kids);
  const comingTo = (ev, i) => ev.replies.filter((r) => r.going && (i == null || r.fns.indexOf(i) > -1));
  function totals(ev, i) {
    const t = { men: 0, women: 0, adults: 0, kids: 0, total: 0 };
    comingTo(ev, i).forEach((r) => { t.men += n(r.men); t.women += n(r.women); t.adults += n(r.adults); t.kids += n(r.kids); t.total += people(r); });
    return t;
  }
  const peak = (ev) => Math.max(0, ...ev.fns.map((f, i) => totals(ev, i).total));
  function waiting(ev) {
    const seen = ev.replies.map((r) => r.name.trim().toLowerCase());
    return ev.expected.filter((x) => seen.indexOf(x.trim().toLowerCase()) < 0);
  }
  function countWords(t) {
    const part = (v, one, many) => { v = n(v); return v ? v + ' ' + (v === 1 ? one : many) : ''; };
    return [part(t.men, 'man', 'men'), part(t.women, 'woman', 'women'), part(t.adults, 'adult', 'adults'), part(t.kids, 'child', 'children')].filter(Boolean);
  }
  function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  const rsvpCode = (ev, r) => (hash(ev.id + ':' + r.id) % 1679616).toString(36).toUpperCase().padStart(4, '0');
  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.hidden = false;
    clearTimeout(toast.t);
    toast.t = setTimeout(() => { t.hidden = true; }, 2800);
  }
  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => toast('Link copied'), () => window.prompt('Copy this link:', text));
    else window.prompt('Copy this link:', text);
  }
  const wa = (text) => 'https://wa.me/?text=' + encodeURIComponent(text);
  const inviteMessage = (ev) => (isFaith(ev) ? 'Assalamu alaikum. ' : 'Hello! ') + 'You are invited: ' + ev.names + '. Please open your invitation and RSVP here: ' + linkTo('/invites/' + ev.id);
  /* The ?to= name greets the guest on the opening screen and fills in their RSVP. */
  const reminder = (ev, who) => (isFaith(ev) ? 'Salaam ' : 'Hi ') + who + '. We would love to know if you can join us for ' + ev.names + '. Please open your invitation and RSVP here: ' + linkTo('/invites/' + ev.id + '?to=' + encodeURIComponent(who));
  const guestName = () => new URLSearchParams(location.search).get('to') || '';
  function slug(s) {
    const base = s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'event';
    let out = base, i = 2;
    while (getEvent(out) || out === 'venue' || out === 'host' || out === 'img') out = base + '-' + i++;
    return out;
  }

  /* ---------- The studio side: shell ---------- */
  function shell(body, opts) {
    opts = opts || {};
    const here = location.pathname;
    const nav = opts.nav === false ? '' :
      `<nav class="ui-nav" aria-label="Main"><a href="/invites/venue"${here === '/invites/venue' ? ' aria-current="page"' : ''}>Events</a>` +
      `<a class="ui-nav__new" href="/invites/venue/new">${icon('plus')}<span>New event</span></a></nav>`;
    return `<div class="ui"><header class="ui-bar"><a class="ui-brand" href="/invites/">${icon('sparkle', 'ui-brand__mark')}<span class="ui-brand__name">Invitations<small>${esc(db.venue.name)}</small></span></a>${nav}</header>` +
      `<main class="ui-main${opts.narrow ? ' ui-main--narrow' : ''}">${body}</main>` +
      `<footer class="ui-foot">Prototype by Made Digital. The venue, names and replies are samples, saved on this device only. <button type="button" data-act="reset">Reset the demo</button></footer></div>`;
  }

  /* ---------- Landing ---------- */
  function viewHome() {
    document.title = 'Invitations: prototype by Made Digital';
    loadFonts([].concat(...db.events.map((e) => themeFonts(THEMES[e.theme] || THEMES.blush))));
    const samples = db.events.map((ev) => {
      const th = THEMES[ev.theme] || THEMES.blush;
      return `<li><a class="sample" href="/invites/${esc(ev.id)}"><span class="sample__img"><img src="${esc(photoOf(ev, true))}" alt="" loading="lazy" width="360" height="450" /></span>` +
        `<span class="sample__type">${esc(typeOf(ev).label)} · ${esc(th.name)}</span><strong style="font-family:${FAMILY[th.display]}">${esc(ev.names)}</strong></a></li>`;
    }).join('');
    app.innerHTML = shell(
      `<section class="home-hero"><p class="eyebrow">For venues and event companies</p><h1>Invitations your guests will remember</h1>` +
      `<p class="lede">You choose the occasion and the theme. The host manages the RSVPs. Guests open a link on WhatsApp, with no app and no login.</p>` +
      `<div class="btn-row"><a class="btn btn--dark" href="/invites/venue/new">${icon('plus')}Create an invitation</a><a class="btn btn--line" href="/invites/venue">See your events</a></div></section>` +
      `<section class="home-sec"><div class="sec-head"><h2>Open a sample invitation</h2><p class="small">Each one opens differently. Try them on your phone.</p></div><ul class="samples">${samples}</ul></section>` +
      `<section class="home-sec"><div class="sec-head"><h2>Then see the other side</h2></div><div class="duo">` +
      `<a class="duo__card" href="/invites/venue">${icon('cal', 'duo__ic')}<span class="eyebrow">Your business</span><strong>Every event in one place</strong><span class="small">Choose from ${Object.keys(TYPES).length} occasions and ${Object.keys(THEMES).length} themes, and see the final numbers for each event.</span></a>` +
      `<a class="duo__card" href="/invites/host/lerato-daniel">${icon('users', 'duo__ic')}<span class="eyebrow">The host</span><strong>RSVPs without the chasing</strong><span class="small">Who is coming, who still has to reply, dietary needs, and a reminder on WhatsApp.</span></a>` +
      `</div></section>`, { nav: true });
  }

  /* ---------- Venue: events ---------- */
  function viewVenue() {
    document.title = 'Events: ' + db.venue.name;
    const today = new Date().toISOString().slice(0, 10);
    const sorted = db.events.slice().sort((a, b) => (a.fns[0].date || '').localeCompare(b.fns[0].date || ''));
    const upcoming = sorted.filter((e) => (e.fns[e.fns.length - 1].date || '') >= today);
    const confirmed = upcoming.reduce((s, e) => s + peak(e), 0);
    const toReply = upcoming.reduce((s, e) => s + waiting(e).length, 0);
    const list = sorted.map((ev) => {
      const t = typeOf(ev), th = THEMES[ev.theme] || THEMES.blush;
      const dated = ev.fns.map((f) => fmtDate(f.date, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })).filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join(' and ');
      const diet = ev.replies.filter((r) => r.going && r.diet).length;
      return `<li class="evc"><a class="evc__img" href="/invites/${esc(ev.id)}" aria-label="Open the invitation for ${esc(ev.names)}"><img src="${esc(photoOf(ev, true))}" alt="" loading="lazy" width="360" height="450" /></a>` +
        `<div class="evc__body"><p class="evc__type">${icon(t.icon)}${esc(t.label)}<span aria-hidden="true">·</span>${esc(th.name)}</p><h2>${esc(ev.names)}</h2><p class="small">${esc(dated)}</p>` +
        `<dl class="evc__nums"><div><dt>Confirmed</dt><dd>${peak(ev)}</dd></div><div><dt>To reply</dt><dd>${waiting(ev).length}</dd></div><div><dt>Dietary notes</dt><dd>${diet}</dd></div></dl>` +
        `<div class="evc__acts"><a class="btn btn--sm btn--line" href="/invites/${esc(ev.id)}">${icon('eye')}Invitation</a><a class="btn btn--sm btn--line" href="/invites/host/${esc(ev.id)}">${icon('users')}Host view</a><a class="btn btn--sm btn--ghost" href="/invites/venue/edit/${esc(ev.id)}">${icon('edit')}Edit</a></div></div></li>`;
    }).join('');
    app.innerHTML = shell(
      `<div class="page-head"><div><p class="eyebrow">${esc(db.venue.name)}</p><h1>Your events</h1><p class="lede">Everything coming up, with the final numbers you need.</p></div><a class="btn btn--dark" href="/invites/venue/new">${icon('plus')}New event</a></div>` +
      `<dl class="stats"><div><dt>Upcoming events</dt><dd>${upcoming.length}</dd></div><div><dt>Guests confirmed</dt><dd>${confirmed}</dd></div><div><dt>Still to reply</dt><dd>${toReply}</dd></div></dl>` +
      `<ul class="evs">${list}</ul>` +
      `<section class="panel settings"><h2>Your business</h2><p class="small">This appears at the bottom of every invitation.</p><div class="settings__grid">` +
      `<label class="field"><span>Business or venue name</span><input data-venue="name" value="${esc(db.venue.name)}" /></label>` +
      `<label class="field"><span>Address</span><input data-venue="address" value="${esc(db.venue.address)}" /></label></div></section>`);
  }

  /* ---------- Venue: add or edit an event ---------- */
  let wiz = null;
  const STEPS = ['Occasion', 'Theme', 'Details', 'RSVP and extras'];
  function newDraft() {
    const d = { type: 'wedding', theme: 'blush', names: '', wording: '', two: true, bismillah: false,
      fns: [{ name: '', date: '', time: '', place: db.venue.name }, { name: '', date: '', time: '', place: db.venue.name }],
      prog: '', dress: '', notes: '', closes: '', separate: false, diet: true, games: true, accent: '', photo: '', secret: '', secrets: [], poll: null };
    applyType(d);
    return d;
  }
  function startWizard(id) {
    const ev = id && getEvent(id);
    if (ev) {
      const d = JSON.parse(JSON.stringify(ev));
      d.two = d.fns.length > 1;
      if (!d.two) d.fns.push({ name: typeOf(d).fn2, date: '', time: '', place: db.venue.name });
      wiz = { step: 1, editing: id, draft: d, error: '' };
    } else {
      wiz = { step: 1, editing: null, draft: newDraft(), error: '' };
    }
  }
  const field = (key, label, val, hint, attrs) => `<label class="field"><span>${esc(label)}</span><input data-f="${key}" value="${esc(val)}"${attrs || ''} />${hint ? `<span class="field__hint">${esc(hint)}</span>` : ''}</label>`;
  const area = (key, label, val, hint) => `<label class="field"><span>${esc(label)}</span><textarea data-f="${key}" rows="4">${esc(val)}</textarea>${hint ? `<span class="field__hint">${esc(hint)}</span>` : ''}</label>`;
  const toggle = (key, on, label, hint, rerender) => `<label class="toggle"><input type="checkbox" role="switch" data-f="${key}"${rerender ? ' data-rerender' : ''}${on ? ' checked' : ''} /><span class="toggle__ui" aria-hidden="true"></span><span class="toggle__text"><strong>${esc(label)}</strong>${hint ? `<span>${esc(hint)}</span>` : ''}</span></label>`;
  function fnFields(i, f, title) {
    return `<fieldset class="panel panel--inset"><legend>${esc(title)}</legend><div class="stack">` + field(`fns.${i}.name`, 'Name of this part', f.name) +
      `<div class="field-row">${field(`fns.${i}.date`, 'Date', f.date, '', ' type="date"')}${field(`fns.${i}.time`, 'Time', f.time, '', ' type="time"')}</div>` +
      field(`fns.${i}.place`, 'Where', f.place) + '</div></fieldset>';
  }
  function wizardStep() {
    const d = wiz.draft, t = TYPES[d.type];
    if (wiz.step === 1) {
      const tiles = Object.keys(TYPES).map((k) => {
        const x = TYPES[k];
        return `<label class="occ"><input type="radio" name="type" data-f="type" data-rerender value="${k}"${d.type === k ? ' checked' : ''} /><span class="occ__card">${icon(x.icon, 'occ__ic')}<strong>${esc(x.label)}</strong><span>${esc(x.blurb)}</span></span></label>`;
      }).join('');
      return `<div class="step-head"><h2 id="occ-l">What are you celebrating?</h2><p class="small">This sets the wording, the order of the day and a suggested theme. You can change all of it.</p></div><div class="occs" role="radiogroup" aria-labelledby="occ-l">${tiles}</div>`;
    }
    if (wiz.step === 2) {
      loadFonts([].concat(...Object.keys(THEMES).map((k) => themeFonts(THEMES[k]))));
      const cards = Object.keys(THEMES).map((k) => {
        const th = THEMES[k];
        return `<label class="thm"><input type="radio" name="theme" data-f="theme" value="${k}"${d.theme === k ? ' checked' : ''} />` +
          `<span class="thm__card"><span class="thm__img"><img src="/invites/img/${th.photo}-thumb.jpg" alt="" width="360" height="450" loading="lazy" />${t.theme === k ? '<span class="thm__tag">Suggested</span>' : ''}</span>` +
          `<span class="thm__name" style="font-family:${FAMILY[th.display]}">${esc(th.name)}</span><span class="thm__mood">${esc(th.mood)}</span>` +
          `<span class="thm__dots" aria-hidden="true"><i style="background:${th.c.card}"></i><i style="background:${th.c.accent}"></i><i style="background:${th.c.gold}"></i><i style="background:${th.c.ink}"></i></span></span></label>`;
      }).join('');
      return `<div class="step-head"><h2 id="thm-l">Choose a theme</h2><p class="small">Every theme has its own photograph, fonts, opening and moving details. Any theme works for any occasion.</p></div><div class="thms" role="radiogroup" aria-labelledby="thm-l">${cards}</div>`;
    }
    if (wiz.step === 3) {
      return `<div class="step-head"><h2>Event details</h2><p class="small">The preview updates as you type.</p></div><div class="stack">` +
        field('names', t.namesLabel, d.names, 'For example: ' + t.ph) +
        area('wording', 'Invitation wording', d.wording) +
        fnFields(0, d.fns[0], d.two ? 'First part' : 'When and where') +
        toggle('two', d.two, 'Add a second part', 'For example, a ceremony and a reception. Guests RSVP to each one.', true) +
        (d.two ? fnFields(1, d.fns[1], 'Second part') : '') +
        area('prog', 'Order of the day', d.prog, 'One item per line. Start a line with a time, like 14:00, to show it on the timeline.') +
        field('dress', 'Dress code', d.dress) + field('notes', 'Anything else guests should know', d.notes) +
        toggle('bismillah', d.bismillah, 'Show the Bismillah at the top', 'In Arabic, above the names.') + '</div>';
    }
    let moment = '';
    if (t.moment === 'scratch') moment = `<div class="panel panel--inset"><h3>${icon('sparkle')}Scratch card</h3><p class="small">Guests scratch to reveal this. A date, a surprise, or "It's a girl!"</p>${field('secret', 'Hidden message', d.secret)}</div>`;
    if (t.moment === 'balloons') moment = `<div class="panel panel--inset"><h3>${icon('balloon')}Pop a balloon</h3><p class="small">Each balloon hides one of these little secrets.</p>${area('secrets', 'Secrets, one per line', (d.secrets || []).join('\n'))}</div>`;
    if (t.moment === 'poll') moment = `<div class="panel panel--inset"><h3>${icon('chat')}Guest poll</h3><p class="small">Guests vote once, and you see the results on the host page.</p><div class="stack">${field('poll.q', 'Question', d.poll.q)}${field('poll.options.0', 'Option 1', d.poll.options[0])}${field('poll.options.1', 'Option 2', d.poll.options[1])}${field('poll.options.2', 'Option 3', d.poll.options[2])}</div></div>`;
    return `<div class="step-head"><h2>RSVP and extras</h2><p class="small">Set how guests reply, then make it yours.</p></div><div class="stack">` +
      field('closes', 'RSVP closes on', d.closes, 'Set this before your final numbers are due.', ' type="date"') +
      toggle('separate', d.separate, 'Count men and women separately', 'Guests give a number for men, women and children. Useful for separate seating.') +
      toggle('diet', d.diet, 'Ask about dietary needs', 'The host and the venue see the answers.') +
      toggle('games', d.games, 'Include games for guests', 'A memory game, plus a quiz if the host writes one.') +
      moment +
      `<div class="panel panel--inset"><h3>${icon('palette')}Your colour</h3><p class="small">Use the client's own colour for buttons and highlights. Good for company events.</p>` +
      `<div class="colour-row"><label class="colour"><input type="color" data-f="accent" value="${validHex(d.accent) ? d.accent : (THEMES[d.theme] || THEMES.blush).c.accent}" /><span>Choose a colour</span></label>` +
      `<button type="button" class="btn btn--sm btn--ghost" data-act="accent-reset"${d.accent ? '' : ' disabled'}>Use the theme's colour</button></div></div>` +
      `<div class="panel panel--inset"><h3>${icon('upload')}Your photo</h3><p class="small">Swap the theme's photo for your own, such as your venue or the couple. Portrait photos work best.</p>` +
      `<div class="colour-row"><label class="btn btn--sm btn--line upload">${icon('upload')}<span>Upload a photo</span><input type="file" accept="image/*" id="photo-in" /></label>` +
      `<button type="button" class="btn btn--sm btn--ghost" data-act="photo-reset"${d.photo ? '' : ' disabled'}>Use the theme's photo</button></div></div></div>`;
  }
  function viewWizard() {
    document.title = (wiz.editing ? 'Edit event' : 'New event') + ': ' + db.venue.name;
    const steps = STEPS.map((s, i) => `<li class="${wiz.step === i + 1 ? 'is-on' : ''}${wiz.step > i + 1 ? ' is-done' : ''}"${wiz.step === i + 1 ? ' aria-current="step"' : ''}><span>${i + 1}</span>${s}</li>`).join('');
    const prevScroll = document.getElementById('preview') ? document.getElementById('preview').scrollTop : 0;
    app.innerHTML = shell(
      `<div class="page-head page-head--tight"><div><p class="eyebrow">${wiz.editing ? 'Edit' : 'New event'}</p><h1>${wiz.editing ? esc(wiz.draft.names || 'Edit event') : 'Create an invitation'}</h1></div></div>` +
      `<ol class="steps">${steps}</ol>` +
      `<div class="wiz"><form id="wiz-form" class="wiz__form" novalidate>${wizardStep()}` +
      `<p class="err" role="alert" id="wiz-err">${esc(wiz.error)}</p>` +
      `<div class="wiz__nav">${wiz.step > 1 ? `<button type="button" class="btn btn--line" data-act="wiz-back">${icon('back')}Back</button>` : '<a class="btn btn--line" href="/invites/venue">Cancel</a>'}` +
      `<button type="submit" class="btn btn--dark">${wiz.step < STEPS.length ? 'Next' + icon('arrow') : (wiz.editing ? 'Save changes' : 'Create the invitation')}</button></div></form>` +
      `<aside class="wiz__preview" aria-label="Preview"><div class="phone"><div class="phone__screen" id="preview"></div></div>` +
      `<p class="preview-cap"><button type="button" class="btn btn--sm btn--line" data-act="gate-replay" data-motion>${icon('sparkle')}Play the opening</button></p></aside></div>`);
    refreshPreview(prevScroll);
  }
  const draftEvent = () => { const d = wiz.draft, ev = JSON.parse(JSON.stringify(d)); if (!d.two) ev.fns = [d.fns[0]]; return ev; };
  function previewEvent() {
    const ev = draftEvent();
    if (!ev.names) ev.names = TYPES[ev.type].ph;
    if (!ev.fns[0].date) ev.fns[0].date = new Date(Date.now() + 60 * 864e5).toISOString().slice(0, 10);
    if (!ev.fns[0].time) ev.fns[0].time = '14:00';
    return Object.assign({ id: 'preview', quiz: [], replies: [], expected: [], scores: [], votes: [0, 0, 0] }, ev);
  }
  let previewTimer = null;
  function refreshPreview(keepScroll) {
    const el = document.getElementById('preview');
    if (!el) return;
    const top = keepScroll != null ? keepScroll : el.scrollTop;
    el.innerHTML = inviteHTML(previewEvent(), { preview: true });
    el.scrollTop = top;
    afterInvite(el);
  }
  function queuePreview() { clearTimeout(previewTimer); previewTimer = setTimeout(() => refreshPreview(), 220); }
  function wizardNext() {
    const d = wiz.draft;
    wiz.error = '';
    if (wiz.step === 3) {
      let bad = null, msg = '';
      if (!d.names.trim()) { bad = 'names'; msg = 'Please add the name for the invitation.'; }
      else if (!d.fns[0].date) { bad = 'fns.0.date'; msg = 'Please choose a date.'; }
      else if (!d.fns[0].time) { bad = 'fns.0.time'; msg = 'Please choose a time.'; }
      else if (d.two && !d.fns[1].date) { bad = 'fns.1.date'; msg = 'Please choose a date for the second part.'; }
      else if (d.two && !d.fns[1].time) { bad = 'fns.1.time'; msg = 'Please choose a time for the second part.'; }
      if (bad) { wiz.error = msg; document.getElementById('wiz-err').textContent = msg; document.querySelector(`[data-f="${bad}"]`).focus(); return; }
    }
    if (wiz.step < STEPS.length) { wiz.step++; viewWizard(); window.scrollTo(0, 0); focusForm(); return; }
    const ev = draftEvent();
    delete ev.two;
    if (wiz.editing) {
      const old = getEvent(wiz.editing);
      Object.assign(ev, { id: old.id, quiz: old.quiz, expected: old.expected, replies: old.replies, scores: old.scores, votes: old.votes || [0, 0, 0] });
      db.events[db.events.indexOf(old)] = ev;
      if (save()) { go('/invites/venue'); toast('Changes saved'); }
      return;
    }
    Object.assign(ev, { id: slug(ev.names), quiz: [], expected: [], replies: [], scores: [], votes: [0, 0, 0] });
    db.events.push(ev);
    if (save()) go('/invites/venue/done/' + ev.id);
    else db.events.pop();
  }
  function focusForm() { const f = document.querySelector('#wiz-form input:checked, #wiz-form input, #wiz-form textarea'); if (f) f.focus(); }
  /* A phone photo can be 5 MB; the demo keeps a 1000px JPEG of about 150 KB. */
  function readPhoto(file) {
    if (!file || !/^image\//.test(file.type)) { toast('Please choose a photo.'); return; }
    const img = new Image();
    img.onload = () => {
      const max = 1000, s = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      wiz.draft.photo = c.toDataURL('image/jpeg', 0.8);
      URL.revokeObjectURL(img.src);
      viewWizard();
      toast('Photo added');
    };
    img.onerror = () => toast('That photo could not be opened.');
    img.src = URL.createObjectURL(file);
  }

  function viewDone(id) {
    const ev = getEvent(id);
    if (!ev) return notFound();
    document.title = 'Invitation ready: ' + ev.names;
    const host = linkTo('/invites/host/' + ev.id), guest = linkTo('/invites/' + ev.id);
    app.innerHTML = shell(
      `<div class="done"><div class="done__img"><img src="${esc(photoOf(ev, true))}" alt="" width="360" height="450" /></div><div>` +
      `<p class="eyebrow">${esc(typeOf(ev).label)} · ${esc((THEMES[ev.theme] || THEMES.blush).name)}</p><h1>${esc(ev.names)} is ready</h1>` +
      `<p class="lede">Send the host their link. From here the RSVPs are theirs to manage, and you see the numbers.</p>` +
      `<div class="stack" style="margin-top:1.5rem">` +
      `<section class="panel link-box"><h2>For the host</h2><p class="small">Their private page for managing RSVPs.</p><code>${esc(host)}</code><div class="btn-row"><a class="btn btn--sm btn--dark" target="_blank" rel="noopener" href="${esc(wa('Your invitation for ' + ev.names + ' is ready. Manage your RSVPs here: ' + host))}">${icon('share')}Send on WhatsApp</a><button type="button" class="btn btn--sm btn--line" data-act="copy" data-text="${esc(host)}">${icon('copy')}Copy link</button><a class="btn btn--sm btn--ghost" href="/invites/host/${esc(ev.id)}">Open</a></div></section>` +
      `<section class="panel link-box"><h2>For the guests</h2><p class="small">The host forwards this to everyone.</p><code>${esc(guest)}</code><div class="btn-row"><a class="btn btn--sm btn--line" href="/invites/${esc(ev.id)}">${icon('eye')}Open the invitation</a><button type="button" class="btn btn--sm btn--line" data-act="copy" data-text="${esc(guest)}">${icon('copy')}Copy link</button></div></section>` +
      `<a class="btn btn--ghost" href="/invites/venue">${icon('back')}Back to your events</a></div></div></div>`);
  }

  /* ---------- Guest invitation ---------- */
  let cdTimer = null, revealer = null;
  function titleHTML(ev) {
    return esc(ev.names).replace(/ &amp; /g, ' <span class="amp">&amp;</span> ');
  }
  /* Shrinks the title until its longest word fits on one line, so "Thandi's" never breaks mid-word.
     Widths are each display font's average letter width in em. */
  const FONT_WIDTH = { cormorant: 0.46, playfair: 0.56, unbounded: 0.86, dmserif: 0.55, fredoka: 0.58, fraunces: 0.6, syne: 0.8, bricolage: 0.6, quicksand: 0.6 };
  function titleSize(ev, th) {
    const room = { poster: 86, arch: 84, type: 88, overlap: 74 }[th.layout], base = { poster: 17, arch: 13.5, type: 19, overlap: 12.5 }[th.layout];
    const longest = Math.max(4, ...String(ev.names).split(/\s+/).map((w) => w.length));
    const scale = Math.min(1, room / (base * (FONT_WIDTH[th.display] || 0.6) * longest));
    return +(base * scale).toFixed(2);
  }
  function heroHTML(ev, o) {
    const th = THEMES[ev.theme] || THEMES.blush, t = typeOf(ev), f = ev.fns[0] || {};
    const H = o.preview ? 'p' : 'h1';
    const photo = `<img src="${esc(photoOf(ev))}" alt="" width="900" height="1125"${o.preview ? '' : ' fetchpriority="high"'} />`;
    const bism = ev.bismillah ? '<p class="hv__bism" lang="ar" dir="rtl">بسم الله الرحمن الرحيم</p>' : '';
    const kicker = `<p class="hv__kicker">${esc(t.kicker)}</p>`;
    const title = `<${H} class="hv__title" style="font-size:${titleSize(ev, th)}cqi"${o.preview ? '' : ' tabindex="-1"'}>${titleHTML(ev)}</${H}>`;
    const line = `<p class="hv__line">${esc(ev.wording)}</p>`;
    const chips = `<p class="chips"><span>${esc(fmtDate(f.date, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }))}</span>${f.time ? `<span>${esc(f.time)}</span>` : ''}<span>${esc(f.place || db.venue.name)}</span></p>`;
    const ctaText = ev.closes ? 'RSVP by ' + fmtDate(ev.closes, { day: 'numeric', month: 'long' }) : 'RSVP';
    const cta = o.preview ? `<span class="iv-btn hv__cta">${esc(ctaText)}</span>` : `<button type="button" class="iv-btn hv__cta" data-act="scroll" data-to="rsvp">${esc(ctaText)}</button>`;
    const amb = ambientHTML(th.ambient, th), orn = ornamentHTML(th.ornament);
    const text = bism + kicker + title + line + chips + cta;
    if (th.layout === 'poster') return `<header class="hv hv--poster"><div class="hv__bg">${photo}</div><div class="hv__shade"></div>${orn}${amb}<div class="hv__body">${text}</div></header>`;
    if (th.layout === 'arch') return `<header class="hv hv--arch">${orn}${amb}<div class="hv__arch">${photo}</div><div class="hv__body">${text}</div></header>`;
    if (th.layout === 'type') return `<header class="hv hv--type">${amb}<div class="hv__body">${bism}${kicker}${title}</div><div class="hv__photo">${photo}</div><div class="hv__body hv__body--after">${line}${chips}${cta}</div></header>`;
    return `<header class="hv hv--overlap">${orn}<div class="hv__photo">${photo}${amb}</div><div class="hv__card">${text}</div></header>`;
  }
  function ornamentHTML(kind) {
    if (kind === 'scallop') return '<div class="orn orn--scallop" aria-hidden="true"></div>';
    if (kind === 'deco') return '<div class="orn orn--deco" aria-hidden="true"><i></i><i></i><i></i><i></i></div>';
    if (kind === 'pattern') return '<div class="orn orn--pattern" aria-hidden="true"></div>';
    if (kind === 'wave') return '<div class="orn orn--wave" aria-hidden="true"><svg viewBox="0 0 400 40" preserveAspectRatio="none"><path d="M0 22c50-16 100-16 150 0s100 16 150 0 70-12 100-4v22H0z"/></svg></div>';
    if (kind === 'dots') return '<div class="orn orn--dots" aria-hidden="true"></div>';
    return '';
  }
  function ambientHTML(kind, th) {
    let out = '', i;
    const fx = th.fx;
    if (kind === 'petals') for (i = 0; i < 9; i++) out += `<i class="petal" style="left:${4 + i * 11}%;animation-delay:-${i * 1.7}s;animation-duration:${11 + (i % 4) * 2}s"></i>`;
    else if (kind === 'sparkle') for (i = 0; i < 14; i++) out += `<i class="spk" style="left:${(i * 37) % 96}%;top:${(i * 53) % 92}%;animation-delay:-${(i * 0.45).toFixed(2)}s"></i>`;
    else if (kind === 'beams') out = '<i class="beam"></i><i class="beam beam--2"></i>';
    else if (kind === 'bubbles') for (i = 0; i < 10; i++) out += `<i class="bub" style="left:${3 + i * 10}%;width:${8 + (i % 4) * 6}px;height:${8 + (i % 4) * 6}px;animation-delay:-${i * 1.3}s;animation-duration:${9 + (i % 3) * 3}s"></i>`;
    else if (kind === 'confetti') for (i = 0; i < 16; i++) out += `<i class="cft" style="left:${(i * 29) % 98}%;background:${fx[i % fx.length]};animation-delay:-${(i * 0.7).toFixed(1)}s;animation-duration:${6 + (i % 4)}s"></i>`;
    else if (kind === 'balloons') for (i = 0; i < 6; i++) out += `<button type="button" class="bal" data-act="pop" tabindex="-1" aria-hidden="true" style="left:${4 + i * 16}%;--c:${fx[i % fx.length]};animation-delay:-${(i * 2.3).toFixed(1)}s;animation-duration:${12 + (i % 3) * 2}s"></button>`;
    else if (kind === 'lanterns') {
      for (i = 0; i < 3; i++) out += `<button type="button" class="hang is-lit" data-act="lantern" tabindex="-1" aria-hidden="true" style="left:${8 + i * 36}%;--h:${28 + (i % 2) * 34}px;animation-delay:-${(i * 0.9).toFixed(1)}s"><span></span></button>`;
      for (i = 0; i < 10; i++) out += `<i class="spk spk--sm" style="left:${(i * 41) % 96}%;top:${(i * 31) % 60}%;animation-delay:-${(i * 0.5).toFixed(1)}s"></i>`;
    } else if (kind === 'festoon') {
      out = '<svg class="fest" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 6 Q100 46 200 10 T400 8"/></svg>';
      for (i = 0; i < 11; i++) { const x = 2 + i * 9.6, y = 8 + Math.sin((i / 10) * Math.PI * 2 - 0.3) * -14 + 14; out += `<i class="bulb" style="left:${x}%;top:${y.toFixed(1)}px;animation-delay:-${(i * 0.37).toFixed(2)}s"></i>`; }
    }
    return out ? `<div class="amb amb--${kind}">${out}</div>` : '';
  }
  function countdownHTML(ev) {
    const f = ev.fns[0];
    if (!f.date || startOf(ev) <= new Date()) return '';
    const big = typeOf(ev).sleeps ? 'sleeps' : 'days';
    const cell = (k, label) => `<div><strong data-cd="${k}">0</strong><span>${label}</span></div>`;
    return `<section class="iv-pad iv-pad--count" aria-label="Time until the event"><div class="iv-count rv">${cell('d', big)}${cell('h', 'hours')}${cell('m', 'mins')}${cell('s', 'secs')}</div></section>`;
  }
  function startOf(ev) { const f = ev.fns[0]; return new Date(f.date + 'T' + (f.time || '12:00') + ':00+02:00'); }
  function momentHTML(ev) {
    const t = typeOf(ev);
    if (t.moment === 'scratch' && ev.secret) {
      return `<section class="iv-pad"><p class="iv-kicker rv">A little secret</p><h2 class="iv-h2 rv">Scratch to reveal</h2>` +
        `<div class="scratch rv" data-scratch><p class="scratch__msg" aria-hidden="true">${esc(ev.secret)}</p><canvas class="scratch__foil" aria-hidden="true"></canvas></div>` +
        `<button type="button" class="linkish" data-act="scratch-reveal">Or tap here to reveal it</button></section>`;
    }
    if (t.moment === 'balloons' && ev.secrets && ev.secrets.filter(Boolean).length) {
      const fx = (THEMES[ev.theme] || THEMES.blush).fx;
      const count = Math.min(ev.secrets.filter(Boolean).length, 5) + 1;
      let b = '';
      for (let i = 0; i < count; i++) b += `<button type="button" class="balloon" data-act="balloon" style="--c:${fx[i % fx.length]};--dl:${(i * 0.3).toFixed(1)}s" aria-label="Pop balloon ${i + 1}"></button>`;
      return `<section class="iv-pad iv-pop"><p class="iv-kicker rv">Before the day</p><h2 class="iv-h2 rv">Pop a balloon</h2><div class="balloons rv">${b}</div><p class="pop__msg rv" aria-live="polite">Each one hides a little secret.</p></section>`;
    }
    if (t.moment === 'poll' && ev.poll && ev.poll.q) {
      return `<section class="iv-pad"><p class="iv-kicker rv">Have your say</p><h2 class="iv-h2 rv">${esc(ev.poll.q)}</h2><div id="poll-area" class="rv">${pollHTML(ev)}</div></section>`;
    }
    return '';
  }
  function pollHTML(ev) {
    const voted = voteGet(ev.id), votes = ev.votes || [0, 0, 0], total = votes.reduce((a, b) => a + b, 0);
    const opts = ev.poll.options.map((o, i) => {
      if (voted == null) return `<button type="button" class="poll__opt" data-act="vote" data-id="${esc(ev.id)}" data-i="${i}"><span>${esc(o)}</span></button>`;
      const pct = total ? Math.round((votes[i] / total) * 100) : 0;
      return `<div class="poll__opt is-result${voted === i ? ' is-mine' : ''}"><span class="poll__bar" style="--w:${pct}%"></span><span>${esc(o)}${voted === i ? ' · your vote' : ''}</span><strong>${pct}%</strong></div>`;
    }).join('');
    return `<div class="poll">${opts}</div><p class="iv-note">${voted == null ? 'Tap one. You can vote once.' : total + (total === 1 ? ' vote' : ' votes') + ' so far. Thank you.'}</p>`;
  }
  function factsHTML(ev) {
    const f = ev.fns[0];
    const map = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(db.venue.name + ', ' + db.venue.address);
    return `<ul class="iv-facts rv">` +
      `<li>${icon('pin')}<div><strong>${esc(db.venue.name)}</strong><small>${esc(db.venue.address)} · <a href="${esc(map)}" target="_blank" rel="noopener">Directions</a></small></div></li>` +
      (ev.fns.length < 2 ? `<li>${icon('clock')}<div><strong>${esc(fmtDate(f.date))}</strong><small>${f.time ? 'From ' + esc(f.time) : ''}${f.place && f.place !== db.venue.name ? ' · ' + esc(f.place) : ''}</small></div></li>` : '') +
      (ev.dress ? `<li>${icon('shirt')}<div><strong>Dress code</strong><small>${esc(ev.dress)}</small></div></li>` : '') +
      (ev.notes ? `<li>${icon('info')}<div><strong>Good to know</strong><small>${esc(ev.notes)}</small></div></li>` : '') + '</ul>';
  }
  function timelineHTML(ev) {
    const items = (ev.prog || '').split('\n').map((x) => x.trim()).filter(Boolean);
    if (!items.length) return '';
    return `<h3 class="iv-h3 rv">The order of the day</h3><ol class="iv-when rv">` + items.map((x) => {
      const m = x.match(/^(\d{1,2}[:h]\d{2})\s+(.*)$/);
      return m ? `<li><time>${esc(m[1])}</time> ${esc(m[2])}</li>` : `<li>${esc(x)}</li>`;
    }).join('') + '</ol>';
  }
  function inviteHTML(ev, o) {
    o = o || {};
    const th = THEMES[ev.theme] || THEMES.blush;
    loadFonts(themeFonts(th).concat(ev.bismillah ? ['amiri'] : []));
    const gate = o.gate ? gateHTML(ev) : '';
    const parts = ev.fns.length > 1 ? `<ul class="iv-parts rv">${ev.fns.map((f) => `<li><span class="iv-kicker">${esc(f.name)}</span><strong>${esc(fmtDate(f.date, { weekday: 'long', day: 'numeric', month: 'long' }))}</strong><small>${esc(f.time)} · ${esc(f.place)}</small></li>`).join('')}</ul>` : '';
    return `<div class="iv-page th-${esc(ev.theme)} lay-${th.layout}${th.dark ? ' is-dark' : ''}" style="${themeVars(ev)}">` +
      (o.preview ? '' : `<p class="iv-concept">Invitation concept by Made Digital · a sample event at ${esc(db.venue.name)} · <a href="/invites/">see all samples</a></p>`) +
      gate + `<main class="iv"${o.preview || o.gate ? ' inert' : ''}>` + heroHTML(ev, o) + countdownHTML(ev) + momentHTML(ev) +
      `<section class="iv-pad"><p class="iv-kicker rv">The details</p><h2 class="iv-h2 rv">Everything you need</h2>${parts}${factsHTML(ev)}${timelineHTML(ev)}` +
      `<div class="iv-actions rv"><button type="button" class="iv-btn iv-btn--ghost" data-act="ics" data-id="${esc(ev.id)}">${icon('cal')}Calendar</button><a class="iv-btn iv-btn--ghost" href="${esc(wa(ev.names + ': here is the invitation. ' + linkTo('/invites/' + ev.id)))}" target="_blank" rel="noopener">${icon('share')}Share</a></div></section>` +
      `<section class="iv-pad iv-pad--rsvp" id="rsvp"><p class="iv-kicker rv">${ev.closes ? 'Please reply by ' + esc(fmtDate(ev.closes, { day: 'numeric', month: 'long' })) : 'RSVP'}</p><h2 class="iv-h2 rv">Will you join us?</h2><div id="rsvp-area">${rsvpArea(ev)}</div></section>` +
      (ev.games ? `<section class="iv-pad" id="games"><p class="iv-kicker rv">While you wait</p><h2 class="iv-h2 rv">A little fun</h2><div id="game-area">${gameMenu(ev)}</div></section>` : '') +
      `<footer class="iv-foot">Invitation by <strong>${esc(db.venue.name)}</strong><small>Concept prototype by Made Digital. This event is fictional.</small>${o.preview || reduceMotion ? '' : `<button type="button" class="linkish" data-act="gate-again" data-id="${esc(ev.id)}">See the opening again</button>`}</footer></main></div>`;
  }

  /* The opening: one tap on one real button. Never shown with reduced motion. */
  function gateHTML(ev) {
    const th = THEMES[ev.theme] || THEMES.blush, to = guestName();
    const mono = String(ev.names).split(/\s*(?:&|and)\s*/i).filter(Boolean).slice(0, 2).map((p) => p.trim().charAt(0).toUpperCase()).join(' & ');
    const art = {
      envelope: `<span class="env"><span class="env__back"></span><span class="env__card">${esc(ev.names)}</span><span class="env__front"></span><span class="env__flap"></span><span class="env__seal">${esc(mono)}</span></span>`,
      gift: '<span class="gift"><span class="gift__lid"></span><span class="gift__box"></span><span class="gift__ribbon"></span></span>',
      ticket: `<span class="tkt"><span class="tkt__main"><small>Admit</small><b>${esc(to || 'One guest')}</b></span><span class="tkt__stub">Tear</span></span>`,
      lantern: '<span class="lamp"><span class="lamp__glow"></span><span class="lamp__hook"></span><span class="lamp__cap"></span><span class="lamp__body"><span class="lamp__flame"></span></span></span>',
      curtain: '<span class="curt-tassel">Open</span>'
    }[th.opening];
    const hint = { envelope: 'Tap the seal to open', gift: 'Tap the gift to open', ticket: 'Tap to tear your ticket', lantern: 'Tap the lantern to light it', curtain: 'Tap to raise the curtain' }[th.opening];
    return `<div class="gate gate--${th.opening}" data-fx="${esc(ev.theme)}">` + (th.opening === 'curtain' ? '<span class="curt curt--l" aria-hidden="true"></span><span class="curt curt--r" aria-hidden="true"></span>' : '') +
      `<p class="gate__hello">${to ? 'Dear ' + esc(to) : 'You have an invitation'}</p>` +
      `<button type="button" class="gate__btn" data-act="gate-open" aria-label="Open your invitation">${art}</button><p class="gate__hint">${esc(hint)}</p></div>`;
  }
  function closeGate(g) {
    const page = g.parentElement, inPreview = !!g.closest('#preview');
    const main = inPreview ? null : page.querySelector('main[inert]');
    setTimeout(() => burstAt(g.dataset.fx, g.querySelector('.gate__btn')), 420);
    setTimeout(() => { page.classList.add('play'); g.classList.add('is-gone'); }, 1050);
    setTimeout(() => {
      g.remove();
      if (inPreview) return;
      document.body.classList.remove('gate-up');
      if (main) { main.removeAttribute('inert'); const h = main.querySelector('h1'); if (h) h.focus({ preventScroll: true }); }
    }, 1500);
  }
  function viewInvite(id, again) {
    const ev = getEvent(id);
    if (!ev) return notFound();
    document.title = ev.names + ': your invitation';
    const gate = !reduceMotion && (again || !mineGet(ev.id));
    app.innerHTML = inviteHTML(ev, { gate });
    if (!gate) app.querySelector('.iv-page').classList.add('play');
    document.body.classList.toggle('gate-up', gate);
    afterInvite(app);
    startCountdown(ev);
    startReveals();
  }
  function afterInvite(root) { initScratch(root); }

  function startCountdown(ev) {
    clearInterval(cdTimer);
    const box = document.querySelector('.iv-count');
    if (!box) return;
    const set = (k, v) => {
      const el = box.querySelector(`[data-cd="${k}"]`), txt = k === 'd' ? String(v) : String(v).padStart(2, '0');
      if (el.textContent === txt) return;
      el.textContent = txt;
      el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick');
    };
    const tick = () => {
      const ms = Math.max(0, startOf(ev) - new Date());
      set('d', Math.floor(ms / 864e5)); set('h', Math.floor(ms / 36e5) % 24); set('m', Math.floor(ms / 6e4) % 60); set('s', Math.floor(ms / 1e3) % 60);
    };
    tick();
    cdTimer = setInterval(tick, 1000);
  }
  /* threshold 0, so a block taller than the screen can never get stuck hidden. */
  function startReveals() {
    if (revealer) revealer.disconnect();
    const items = document.querySelectorAll('.iv .rv');
    if (!('IntersectionObserver' in window)) { items.forEach((x) => x.classList.add('is-in')); return; }
    revealer = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); revealer.unobserve(e.target); } }), { threshold: 0 });
    items.forEach((x) => revealer.observe(x));
  }
  /* A burst of colour in a clipped fixed layer, so it can never widen the page. */
  function burst(themeKey, x, y, count) {
    if (reduceMotion) return;
    const th = THEMES[themeKey] || THEMES.blush;
    const box = document.createElement('div');
    box.className = 'fx fx--' + th.ambient;
    box.setAttribute('aria-hidden', 'true');
    let html = '';
    const total = count || 54;
    for (let i = 0; i < total; i++) {
      const ang = Math.random() * Math.PI * 2, far = 60 + Math.random() * 240;
      html += `<i style="left:${x}px;top:${y}px;--x:${Math.round(Math.cos(ang) * far)}px;--y:${Math.round(Math.sin(ang) * far)}px;--r:${Math.round(Math.random() * 720)}deg;background:${th.fx[i % th.fx.length]};animation-delay:${Math.round(Math.random() * 120)}ms"></i>`;
    }
    box.innerHTML = html;
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 1900);
  }
  function burstAt(themeKey, el, count) { const r = el.getBoundingClientRect(); burst(themeKey, r.left + r.width / 2, r.top + r.height / 2, count); }
  const themeOfEl = (el) => { const p = el.closest('.iv-page'); const m = p && p.className.match(/th-(\w+)/); return m ? m[1] : 'blush'; };

  /* Scratch card: a canvas foil over the message. A button reveals it without scratching. */
  function initScratch(root) {
    root.querySelectorAll('[data-scratch]').forEach((box) => {
      const cv = box.querySelector('canvas');
      if (!cv || cv.dataset.ready) return;
      const r = box.getBoundingClientRect();
      if (!r.width) return;
      cv.dataset.ready = '1';
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
      const ctx = cv.getContext('2d'), css = getComputedStyle(box);
      const gold = css.getPropertyValue('--gold').trim() || '#c9a46a', accent = css.getPropertyValue('--accent').trim() || '#a8435b';
      const g = ctx.createLinearGradient(0, 0, cv.width, cv.height);
      g.addColorStop(0, gold); g.addColorStop(0.55, accent); g.addColorStop(1, gold);
      ctx.fillStyle = g; ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = 'rgba(255,255,255,.22)';
      for (let i = 0; i < 70; i++) ctx.fillRect(Math.random() * cv.width, Math.random() * cv.height, 2 * dpr, 2 * dpr);
      ctx.fillStyle = css.getPropertyValue('--accent-ink').trim() || '#fff';
      ctx.font = `600 ${15 * dpr}px ${css.getPropertyValue('--body') || 'sans-serif'}`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('Scratch here', cv.width / 2, cv.height / 2);
      ctx.globalCompositeOperation = 'destination-out';
      let down = false, moves = 0;
      const at = (e) => { const b = cv.getBoundingClientRect(); return [(e.clientX - b.left) * dpr, (e.clientY - b.top) * dpr]; };
      const check = () => {
        const d = ctx.getImageData(0, 0, cv.width, cv.height).data;
        let clear = 0, all = 0;
        for (let i = 3; i < d.length; i += 64) { all++; if (d[i] === 0) clear++; }
        if (clear / all > 0.45) revealScratch(box);
      };
      const scratch = (e) => { const p = at(e); ctx.beginPath(); ctx.arc(p[0], p[1], 22 * dpr, 0, Math.PI * 2); ctx.fill(); if (++moves % 10 === 0) check(); };
      cv.addEventListener('pointerdown', (e) => { down = true; try { cv.setPointerCapture(e.pointerId); } catch (x) { /* fine */ } scratch(e); });
      cv.addEventListener('pointermove', (e) => { if (down) scratch(e); });
      cv.addEventListener('pointerup', () => { down = false; check(); });
      cv.addEventListener('pointercancel', () => { down = false; });
    });
  }
  function revealScratch(box) {
    if (box.classList.contains('is-revealed')) return;
    box.classList.add('is-revealed');
    box.querySelector('.scratch__msg').removeAttribute('aria-hidden');
    const btn = box.parentElement.querySelector('[data-act="scratch-reveal"]');
    if (btn) btn.remove();
    burstAt(themeOfEl(box), box);
  }

  function stepper(name, label, val) {
    return `<div class="stepper"><label for="st-${name}">${esc(label)}</label><div class="stepper__ctl"><button type="button" data-act="step" data-t="st-${name}" data-d="-1" aria-label="One fewer: ${esc(label)}">−</button><input id="st-${name}" name="${name}" type="number" min="0" max="99" inputmode="numeric" value="${n(val)}" /><button type="button" data-act="step" data-t="st-${name}" data-d="1" aria-label="One more: ${esc(label)}">+</button></div></div>`;
  }
  function countFields(ev, r) {
    r = r || {};
    return '<div class="steppers">' + (ev.separate ? stepper('men', 'Men', r.men) + stepper('women', 'Women', r.women) : stepper('adults', 'Adults', r.adults)) + stepper('kids', 'Children', r.kids) + '</div>';
  }
  function fnChoices(ev, r) {
    if (ev.fns.length < 2) return '';
    const picked = r ? r.fns : [0, 1];
    return `<fieldset><legend class="iv-legend">Which will you attend?</legend><div class="iv-choices iv-choices--row">` + ev.fns.map((f, i) =>
      `<label class="iv-choice"><input type="checkbox" name="fn" value="${i}"${picked.indexOf(i) > -1 ? ' checked' : ''} /><span><strong>${esc(f.name)}</strong><small>${esc(fmtDate(f.date, { weekday: 'short', day: 'numeric', month: 'short' }))}</small></span></label>`).join('') + '</div></fieldset>';
  }
  function rewardHTML(ev, r) {
    const t = typeOf(ev), code = rsvpCode(ev, r), f = ev.fns[0];
    const who = esc(r.name), size = people(r) + (people(r) === 1 ? ' guest' : ' guests');
    const parts = ev.fns.length > 1 ? r.fns.map((i) => esc(ev.fns[i].name)).join(' and ') : esc(fmtDate(f.date, { day: 'numeric', month: 'long', year: 'numeric' }));
    if (t.reward === 'ticket') {
      let cells = '';
      for (let i = 0; i < 81; i++) {
        const row = Math.floor(i / 9), col = i % 9;
        const corner = (row < 3 && col < 3) || (row < 3 && col > 5) || (row > 5 && col < 3);
        const on = corner || ((hash(code + i) >>> 13) & 1);
        cells += `<i${on ? '' : ' class="o"'}></i>`;
      }
      return `<div class="rw rw--ticket"><div class="rw__top"><p class="rw__kicker">${esc(ev.names)} · Admit ${people(r)}</p><p class="rw__name">${who}</p><span class="rw__tier">${parts}</span></div><div class="rw__cut" aria-hidden="true"></div>` +
        `<div class="rw__bottom"><div class="rw__code" aria-hidden="true">${cells}</div><p class="rw__meta"><strong>#${code}</strong>${esc(fmtDate(f.date, { weekday: 'short', day: 'numeric', month: 'short' }))} · ${esc(f.time)}<br />${esc(f.place)}</p></div></div>`;
    }
    if (t.reward === 'pass') {
      return `<div class="rw rw--pass">${icon('crown', 'rw__crown')}<p class="rw__kicker">Party pass</p><p class="rw__name">${who}</p><small>${size} · ${parts}</small><p class="rw__codeline">Your code: <strong>${code}</strong></p></div>`;
    }
    return `<div class="rw rw--card"><p class="rw__kicker">You're on the list</p><p class="rw__name">${who}</p><p class="rw__line">${size} · ${parts}</p><p class="rw__codeline">Your RSVP code: <strong>${code}</strong></p></div>`;
  }
  function rsvpArea(ev, editing) {
    const mine = ev.replies.find((r) => r.id === mineGet(ev.id));
    if (mine && !editing) {
      const head = mine.going ? rewardHTML(ev, mine) : `<div class="rw rw--card"><p class="rw__kicker">Thank you for letting us know</p><p class="rw__name">We'll miss you, ${esc(mine.name)}</p><p class="rw__line">Your reply is with the host.</p></div>`;
      return `<div class="iv-done" tabindex="-1" id="rsvp-done">${mine.going ? `<p class="iv-thanks">${isFaith(ev) ? 'Shukran' : 'Thank you'}, ${esc(mine.name)}. See you there!</p>` : ''}${head}` +
        `<div class="iv-actions"><button type="button" class="iv-btn iv-btn--ghost" data-act="rsvp-change" data-id="${esc(ev.id)}">${icon('edit')}Change my reply</button>` +
        (ev.games ? `<button type="button" class="iv-btn" data-act="scroll" data-to="games">${icon('star')}Play a game</button>` : `<button type="button" class="iv-btn" data-act="ics" data-id="${esc(ev.id)}">${icon('cal')}Calendar</button>`) + '</div></div>';
    }
    const closed = ev.closes && new Date(ev.closes + 'T23:59:59') < new Date();
    if (closed && ev.id !== 'preview') return '<p class="iv-note">RSVPs have closed. Please contact the host directly.</p>';
    const going = mine ? mine.going : true;
    return `<form class="iv-form rv" id="rsvp-form" data-id="${esc(ev.id)}" novalidate>` +
      `<label class="iv-field"><span>${ev.type === 'corporate' || ev.type === 'gala' || ev.type === 'launch' ? 'Your name' : 'Your name, or your family\'s name'}</span><input name="name" autocomplete="name" value="${esc(mine ? mine.name : guestName())}" /></label>` +
      `<fieldset><legend class="iv-legend">Can you make it?</legend><div class="iv-choices iv-choices--row">` +
      `<label class="iv-choice"><input type="radio" name="going" value="yes"${going ? ' checked' : ''} /><span><strong>${isFaith(ev) ? 'Yes, in shaa Allah' : 'Yes, I\'ll be there'}</strong></span></label>` +
      `<label class="iv-choice"><input type="radio" name="going" value="no"${going ? '' : ' checked'} /><span><strong>Sadly not</strong></span></label></div></fieldset>` +
      `<div id="rsvp-yes" class="iv-form"${going ? '' : ' hidden'}>${fnChoices(ev, mine)}<fieldset><legend class="iv-legend">How many of you are coming?</legend>${countFields(ev, mine)}</fieldset>` +
      (ev.diet ? `<label class="iv-field"><span>Any dietary needs? (optional)</span><input name="diet" value="${esc(mine ? mine.diet : '')}" placeholder="For example, a nut allergy" /><small>Only the host and the venue see this.</small></label>` : '') + '</div>' +
      `<label class="iv-field"><span>${isFaith(ev) ? 'A message or du\'a for the family (optional)' : 'A message for the host (optional)'}</span><textarea name="msg" rows="2">${esc(mine ? mine.msg : '')}</textarea></label>` +
      `<p class="err" role="alert" id="rsvp-err"></p><button class="iv-btn" type="submit">${icon('check')}Send my RSVP</button></form>`;
  }
  const readCounts = (form) => { const v = (k) => (form.elements[k] ? n(form.elements[k].value) : 0); return { men: v('men'), women: v('women'), adults: v('adults'), kids: v('kids') }; };
  function submitRsvp(form) {
    const ev = getEvent(form.dataset.id);
    if (!ev) return;
    const err = form.querySelector('#rsvp-err'), name = form.elements.name.value.trim();
    err.textContent = '';
    if (!name) { err.textContent = 'Please add your name.'; form.elements.name.focus(); return; }
    const going = form.elements.going.value === 'yes', c = readCounts(form);
    let fns = [];
    if (going) {
      fns = ev.fns.length > 1 ? [...form.querySelectorAll('[name="fn"]:checked')].map((x) => +x.value) : [0];
      if (!fns.length) { err.textContent = 'Please choose at least one part of the event.'; form.querySelector('[name="fn"]').focus(); return; }
      if (!(c.men + c.women + c.adults + c.kids)) { err.textContent = 'Please tell us how many of you are coming.'; form.querySelector('.stepper input').focus(); return; }
    }
    const existing = ev.replies.find((r) => r.id === mineGet(ev.id));
    const rec = existing || { id: uid() };
    Object.assign(rec, { name, going, fns, men: going ? c.men : 0, women: going ? c.women : 0, adults: going ? c.adults : 0, kids: going ? c.kids : 0,
      diet: going && form.elements.diet ? form.elements.diet.value.trim() : '', msg: form.elements.msg.value.trim() });
    if (!existing) ev.replies.unshift(rec);
    save(); mineSet(ev.id, rec.id);
    document.getElementById('rsvp-area').innerHTML = rsvpArea(ev);
    const done = document.getElementById('rsvp-done');
    done.focus();
    done.scrollIntoView({ block: 'center' });
    if (going) setTimeout(() => burstAt(ev.theme, done.querySelector('.rw') || done), 250);
    play = null;
  }
  function makeIcs(ev) {
    const stamp = (dt) => dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const text = (s) => String(s).replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n');
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Made Digital//Invitations//EN'];
    ev.fns.forEach((f, i) => {
      if (!f.date || !f.time) return;
      const s = new Date(f.date + 'T' + f.time + ':00+02:00');
      lines.push('BEGIN:VEVENT', `UID:${ev.id}-${i}@madedigital.co.za`, 'DTSTAMP:' + stamp(new Date()), 'DTSTART:' + stamp(s), 'DTEND:' + stamp(new Date(s.getTime() + 3 * 36e5)), 'SUMMARY:' + text(f.name + ': ' + ev.names), 'LOCATION:' + text(f.place), 'END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar' }));
    a.download = slug(ev.names + ' invitation') + '.ics';
    document.body.appendChild(a); a.click(); a.remove();
  }

  /* ---------- Games ---------- */
  let play = null;
  const matchWords = (ev) => typeOf(ev).words || null;
  function gameMenu(ev) {
    const t = typeOf(ev);
    return (ev.quiz.length ? `<div class="game rv"><div><h3>${esc(t.quiz)}</h3><p class="iv-note">${ev.quiz.length} questions from the host.</p></div>${boardHTML(ev)}<button type="button" class="iv-btn" data-act="quiz-start" data-id="${esc(ev.id)}">Play the quiz</button></div>` : '') +
      `<div class="game rv"><div><h3>Memory match</h3><p class="iv-note">Turn over two cards and find the pairs.</p></div><button type="button" class="iv-btn" data-act="memory-start" data-id="${esc(ev.id)}">Play memory match</button></div>` +
      (matchWords(ev) ? `<div class="game rv"><div><h3>Match the words</h3><p class="iv-note">Tap a word, then tap its meaning.</p></div><button type="button" class="iv-btn" data-act="match-start" data-id="${esc(ev.id)}">Play word match</button></div>` : '');
  }
  function boardHTML(ev) {
    if (!ev.scores.length) return '';
    const top = ev.scores.slice().sort((a, b) => b.score - a.score).slice(0, 5);
    return '<ol class="board">' + top.map((s) => `<li><span>${esc(s.name)}</span><span>${s.score} of ${ev.quiz.length}</span></li>`).join('') + '</ol>';
  }
  function gameArea(html) { const g = document.getElementById('game-area'); g.innerHTML = html; g.querySelectorAll('.rv').forEach((x) => x.classList.add('is-in')); }
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const backBtn = (ev) => `<button type="button" class="iv-btn iv-btn--ghost" data-act="game-menu" data-id="${esc(ev.id)}">${icon('back')}Back to the games</button>`;
  function renderQuiz() {
    const ev = getEvent(play.id);
    if (play.stage === 'name') {
      const mine = ev.replies.find((r) => r.id === mineGet(ev.id));
      gameArea(`<form class="game game--open iv-form" id="quiz-name"><h3>Who is playing?</h3><label class="iv-field"><span>Your name</span><input name="player" value="${esc(mine ? mine.name : guestName())}" /></label><p class="err" role="alert" id="quiz-err"></p><button class="iv-btn" type="submit">Start</button></form>`);
      document.querySelector('#quiz-name input').focus();
      return;
    }
    if (play.stage === 'end') {
      gameArea(`<div class="game game--open" tabindex="-1" id="g-end"><h3>You got ${play.score} of ${ev.quiz.length}</h3>${boardHTML(ev)}${backBtn(ev)}</div>`);
      const end = document.getElementById('g-end');
      end.focus();
      if (play.score) burstAt(ev.theme, end);
      return;
    }
    const q = ev.quiz[play.i];
    gameArea(`<div class="game game--open"><p class="iv-note">Question ${play.i + 1} of ${ev.quiz.length}</p><h3 tabindex="-1" id="g-q">${esc(q.q)}</h3><div class="g-opts">` + q.options.map((o, i) => {
      let cls = '';
      if (play.picked != null) { if (i === q.answer) cls = ' is-right'; else if (i === play.picked) cls = ' is-wrong'; }
      return `<button type="button" class="g-opt${cls}" data-act="quiz-pick" data-i="${i}"${play.picked != null ? ' disabled' : ''}>${esc(o)}</button>`;
    }).join('') + '</div>' + (play.picked != null ? `<button type="button" class="iv-btn" id="g-next" data-act="quiz-next">${play.i + 1 < ev.quiz.length ? 'Next question' : 'See my score'}</button>` : '') + '</div>');
    const focus = document.getElementById(play.picked != null ? 'g-next' : 'g-q');
    if (focus) focus.focus();
  }
  function renderMatch() {
    const ev = getEvent(play.id);
    const left = play.words.map((p) => { const done = play.done.indexOf(p[0]) > -1; return `<button type="button" class="g-opt${done ? ' is-right' : (play.sel === p[0] ? ' is-on' : '')}" data-act="match-word" data-w="${esc(p[0])}"${done ? ' disabled' : ''} aria-pressed="${play.sel === p[0]}">${esc(p[0])}</button>`; }).join('');
    const right = play.means.map((p) => { const done = play.done.indexOf(p[0]) > -1; return `<button type="button" class="g-opt${done ? ' is-right' : ''}" data-act="match-mean" data-w="${esc(p[0])}"${done ? ' disabled' : ''}>${esc(p[1])}</button>`; }).join('');
    const finished = play.done.length === play.words.length;
    gameArea(`<div class="game game--open"><h3 tabindex="-1" id="g-m">${finished ? 'All matched. Well done.' : 'Match the words'}</h3><p class="iv-note" role="status">${esc(play.msg || 'Tap a word, then tap its meaning.')}</p><div class="g-cols"><div class="g-opts">${left}</div><div class="g-opts">${right}</div></div>${backBtn(ev)}</div>`);
    if (finished) { const h = document.getElementById('g-m'); h.focus(); burstAt(ev.theme, h); }
  }
  /* Memory match changes classes in place: a re-render would cancel the card flip. */
  function startMemory(ev) {
    const set = MEMORY[typeOf(ev).memory] || MEMORY.party, deck = shuffle(set.concat(set));
    play = { kind: 'memory', id: ev.id, deck, open: [], found: 0, moves: 0, lock: false };
    gameArea(`<div class="game game--open"><h3 tabindex="-1" id="g-mem">Memory match</h3><p class="iv-note" role="status" id="mem-status">Turn over two cards.</p><div class="mem">` + deck.map((c, i) =>
      `<button type="button" class="mem__c" data-act="memory-flip" data-i="${i}" aria-label="Card ${i + 1}, face down"><span class="mem__in"><span class="mem__back"></span><span class="mem__face" aria-hidden="true">${c[0]}</span></span></button>`).join('') + `</div>${backBtn(ev)}</div>`);
    document.getElementById('g-mem').focus();
  }
  function flipMemory(b) {
    if (!play || play.kind !== 'memory' || play.lock || b.classList.contains('is-up')) return;
    const game = play, i = +b.dataset.i;
    b.classList.add('is-up');
    b.setAttribute('aria-label', `Card ${i + 1}, ${game.deck[i][1]}`);
    game.open.push(b);
    if (game.open.length < 2) return;
    game.moves++;
    const [a, c] = game.open, status = document.getElementById('mem-status');
    game.open = [];
    if (game.deck[+a.dataset.i][0] === game.deck[+c.dataset.i][0]) {
      a.classList.add('is-found'); c.classList.add('is-found');
      game.found++;
      if (game.found * 2 === game.deck.length) { status.textContent = `All found in ${game.moves} turns. Well done.`; burstAt(getEvent(game.id).theme, status); }
      else status.textContent = `A pair! Turns so far: ${game.moves}`;
      return;
    }
    status.textContent = `Not a pair. Turns so far: ${game.moves}`;
    game.lock = true;
    setTimeout(() => {
      [a, c].forEach((x) => { x.classList.remove('is-up'); x.setAttribute('aria-label', `Card ${+x.dataset.i + 1}, face down`); });
      game.lock = false;
    }, 850);
  }

  /* ---------- Host ---------- */
  let hostTab = 'replies';
  function viewHost(id) {
    const ev = getEvent(id);
    if (!ev) return notFound();
    document.title = 'RSVPs: ' + ev.names;
    const all = totals(ev), declined = ev.replies.filter((r) => !r.going).length, chase = waiting(ev), t = typeOf(ev);
    const split = ev.separate ? `<div><dt>Men</dt><dd>${all.men}</dd></div><div><dt>Women</dt><dd>${all.women}</dd></div>` : `<div><dt>Adults</dt><dd>${all.adults}</dd></div>`;
    const parts = ev.fns.length > 1 ? `<div class="fn-totals">${ev.fns.map((f, i) => { const x = totals(ev, i); return `<div class="fn-total"><strong>${esc(f.name)}</strong><span>${x.total} guests</span><span class="small">${esc(countWords(x).join(', ') || 'No one yet')}</span></div>`; }).join('')}</div>` : '';
    const tab = (k, label) => `<button type="button" role="tab" aria-selected="${hostTab === k}" data-act="host-tab" data-k="${k}" data-id="${esc(ev.id)}">${label}</button>`;
    app.innerHTML = shell(
      `<div class="host-head"><div class="host-head__img"><img src="${esc(photoOf(ev, true))}" alt="" width="360" height="450" /></div><div class="host-head__text"><p class="eyebrow">${esc(t.label)} · RSVPs</p><h1>${esc(ev.names)}</h1>` +
      `<p class="lede">${ev.closes ? 'RSVPs close on ' + esc(shortDate(ev.closes)) + '.' : 'No closing date set.'}</p>` +
      `<div class="btn-row"><a class="btn btn--sm btn--dark" target="_blank" rel="noopener" href="${esc(wa(inviteMessage(ev)))}">${icon('share')}Share on WhatsApp</a><a class="btn btn--sm btn--line" href="/invites/${esc(ev.id)}">${icon('eye')}See the invitation</a></div></div></div>` +
      `<dl class="stats stats--host"><div class="stats__lead"><dt>Guests confirmed</dt><dd>${all.total}</dd><span>${comingTo(ev).length} replies coming · ${declined} can't make it</span></div>${split}<div><dt>Children</dt><dd>${all.kids}</dd></div><div><dt>Still to reply</dt><dd>${chase.length}</dd></div></dl>${parts}` +
      `<div class="tabs" role="tablist">${tab('replies', `Replies (${ev.replies.length})`)}${tab('chase', `Still to reply (${chase.length})`)}${ev.poll && t.moment === 'poll' ? tab('poll', 'Poll') : ''}${ev.games ? tab('games', 'Games') : ''}</div>` +
      `<div id="host-panel" role="tabpanel">${hostPanel(ev, chase)}</div><dialog id="reply-dlg"></dialog>`);
  }
  function hostPanel(ev, chase) {
    if (hostTab === 'chase') {
      return `<form class="add-row" id="add-expected" data-id="${esc(ev.id)}"><label class="field"><span>Add someone you're expecting</span><input name="who" /></label><button class="btn btn--dark" type="submit">${icon('plus')}Add</button></form>` +
        (chase.length ? `<ul class="rlist">${chase.map((who) => `<li class="r"><div class="r__head"><span class="r__name">${esc(who)}</span><span class="pill pill--wait">Waiting</span></div><div class="r__acts"><a class="btn btn--sm btn--dark" target="_blank" rel="noopener" href="${esc(wa(reminder(ev, who)))}">${icon('share')}Remind on WhatsApp</a><button type="button" class="btn btn--sm btn--line" data-act="reply-add" data-id="${esc(ev.id)}" data-name="${esc(who)}">They told me</button><button type="button" class="btn btn--sm btn--danger" data-act="expected-remove" data-id="${esc(ev.id)}" data-name="${esc(who)}">Remove</button></div></li>`).join('')}</ul>` : '<p class="panel empty">Everyone on your list has replied.</p>');
    }
    if (hostTab === 'poll' && ev.poll) {
      const votes = ev.votes || [0, 0, 0], total = votes.reduce((a, b) => a + b, 0);
      return `<section class="panel"><h2>${esc(ev.poll.q)}</h2><p class="small">${total} ${total === 1 ? 'vote' : 'votes'} so far.</p><div class="bars">${ev.poll.options.map((o, i) => { const pct = total ? Math.round((votes[i] / total) * 100) : 0; return `<div class="bar"><span>${esc(o)}</span><span class="bar__track"><i style="width:${pct}%"></i></span><strong>${votes[i]}</strong></div>`; }).join('')}</div></section>`;
    }
    if (hostTab === 'games' && ev.games) return hostGames(ev);
    const rows = ev.replies.map((r) => {
      const fnNames = r.going && ev.fns.length > 1 ? r.fns.map((i) => (ev.fns[i] ? ev.fns[i].name : '')).filter(Boolean).join(' and ') : '';
      return `<li class="r"><div class="r__head"><span class="r__name">${esc(r.name)}</span><span class="pill ${r.going ? 'pill--yes' : 'pill--no'}">${r.going ? 'Coming' : "Can't make it"}</span></div>` +
        (r.going ? `<p class="r__meta">${esc(countWords(r).join(', '))}${fnNames ? ' · ' + esc(fnNames) : ''} · code ${rsvpCode(ev, r)}</p>` : '') +
        (r.diet ? `<p class="r__meta"><strong>Dietary:</strong> ${esc(r.diet)}</p>` : '') + (r.msg ? `<p class="r__msg">“${esc(r.msg)}”</p>` : '') +
        `<div class="r__acts"><button type="button" class="btn btn--sm btn--line" data-act="reply-edit" data-id="${esc(ev.id)}" data-r="${esc(r.id)}" aria-label="Edit reply from ${esc(r.name)}">${icon('edit')}Edit</button><button type="button" class="btn btn--sm btn--danger" data-act="reply-del" data-id="${esc(ev.id)}" data-r="${esc(r.id)}" aria-label="Remove reply from ${esc(r.name)}">Remove</button></div></li>`;
    }).join('');
    return `<div class="btn-row panel-tools"><button type="button" class="btn btn--sm btn--dark" data-act="reply-add" data-id="${esc(ev.id)}">${icon('plus')}Add a reply</button><button type="button" class="btn btn--sm btn--line" data-act="csv" data-id="${esc(ev.id)}">${icon('download')}Download the list</button></div>` +
      (rows ? `<ul class="rlist">${rows}</ul>` : '<p class="panel empty">No replies yet. Share the invitation to get started.</p>');
  }
  function hostGames(ev) {
    const list = ev.quiz.map((q, i) => `<li class="r"><p class="r__name">${esc(q.q)}</p><p class="r__meta">Answer: ${esc(q.options[q.answer])}</p><div class="r__acts"><button type="button" class="btn btn--sm btn--danger" data-act="quiz-del" data-id="${esc(ev.id)}" data-i="${i}">Remove</button></div></li>`).join('');
    const opt = (i) => `<label class="quiz-opt"><input type="radio" name="answer" value="${i}"${i === 0 ? ' checked' : ''} aria-label="Answer ${i + 1} is correct" /><input name="o${i}" aria-label="Answer ${i + 1}" placeholder="Answer ${i + 1}" /></label>`;
    return `<p class="small" style="margin-bottom:1rem">Memory match is ready to go. Add your own questions to switch on the quiz.</p>${list ? `<ul class="rlist" style="margin-bottom:1rem">${list}</ul>` : ''}` +
      `<form class="panel stack" id="quiz-add" data-id="${esc(ev.id)}"><h2>Add a question</h2><label class="field"><span>Question</span><input name="q" /></label><span class="small">Mark the correct answer.</span>${opt(0)}${opt(1)}${opt(2)}<p class="err" role="alert" id="quiz-add-err"></p><button class="btn btn--dark" type="submit">${icon('plus')}Add the question</button></form>`;
  }
  function openReply(ev, r, presetName) {
    const dlg = document.getElementById('reply-dlg'), going = r ? r.going : true;
    dlg.innerHTML = `<form class="stack" id="reply-form" data-id="${esc(ev.id)}" data-r="${esc(r ? r.id : '')}"><h2>${r ? 'Edit reply' : 'Add a reply'}</h2>` +
      `<label class="field"><span>Name</span><input name="name" value="${esc(r ? r.name : (presetName || ''))}" /></label>` +
      `<label class="field"><span>Status</span><select name="going"><option value="yes"${going ? ' selected' : ''}>Coming</option><option value="no"${going ? '' : ' selected'}>Can't make it</option></select></label>` +
      (ev.fns.length > 1 ? `<fieldset class="plain"><legend class="field-label">Which parts?</legend>${ev.fns.map((f, i) => `<label class="checkline"><input type="checkbox" name="fn" value="${i}"${!r || r.fns.indexOf(i) > -1 ? ' checked' : ''} /><span>${esc(f.name)}</span></label>`).join('')}</fieldset>` : '') +
      countFields(ev, r) + (ev.diet ? `<label class="field"><span>Dietary needs</span><input name="diet" value="${esc(r ? r.diet : '')}" /></label>` : '') +
      `<p class="err" role="alert" id="reply-err"></p><div class="btn-row"><button class="btn btn--dark" type="submit">Save</button><button type="button" class="btn btn--line" data-act="dlg-close">Cancel</button></div></form>`;
    dlg.showModal();
  }
  function saveReply(form) {
    const ev = getEvent(form.dataset.id), err = form.querySelector('#reply-err'), name = form.elements.name.value.trim();
    if (!name) { err.textContent = 'Please add a name.'; form.elements.name.focus(); return; }
    const going = form.elements.going.value === 'yes', c = readCounts(form);
    const fns = ev.fns.length > 1 ? [...form.querySelectorAll('[name="fn"]:checked')].map((x) => +x.value) : [0];
    if (going && !fns.length) { err.textContent = 'Please choose at least one part.'; return; }
    if (going && !(c.men + c.women + c.adults + c.kids)) { err.textContent = 'Please add how many people are coming.'; return; }
    let rec = ev.replies.find((x) => x.id === form.dataset.r);
    const isNew = !rec;
    rec = rec || { id: uid(), msg: '' };
    Object.assign(rec, { name, going, fns: going ? fns : [], men: going ? c.men : 0, women: going ? c.women : 0, adults: going ? c.adults : 0, kids: going ? c.kids : 0, diet: going && form.elements.diet ? form.elements.diet.value.trim() : '' });
    if (isNew) ev.replies.unshift(rec);
    save();
    document.getElementById('reply-dlg').close();
    viewHost(ev.id);
    toast('Reply saved');
  }
  function downloadCsv(ev) {
    const cell = (v) => { let s = String(v == null ? '' : v); if (/^[=+\-@]/.test(s)) s = "'" + s; return '"' + s.replace(/"/g, '""') + '"'; };
    const head = ['Name', 'Status', 'Code'].concat(ev.fns.map((f) => f.name), ev.separate ? ['Men', 'Women'] : ['Adults'], ['Children', 'Dietary', 'Message']);
    const rows = ev.replies.map((r) => [r.name, r.going ? 'Coming' : "Can't make it", r.going ? rsvpCode(ev, r) : ''].concat(ev.fns.map((f, i) => (r.fns.indexOf(i) > -1 ? 'Yes' : 'No')), ev.separate ? [n(r.men), n(r.women)] : [n(r.adults)], [n(r.kids), r.diet, r.msg]));
    const csv = '﻿' + [head].concat(rows).map((row) => row.map(cell).join(',')).join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    a.download = slug(ev.names + ' rsvps') + '.csv';
    document.body.appendChild(a); a.click(); a.remove();
  }

  function notFound() {
    document.title = 'Not found';
    app.innerHTML = shell(`<div class="empty-page"><p class="eyebrow">Not found</p><h1>We could not find that event</h1><p class="lede">It may have been removed when the demo was reset.</p><p><a class="btn btn--dark" href="/invites/">Back to the samples</a></p></div>`, { narrow: true });
  }

  /* ---------- Router ---------- */
  function route() {
    const p = location.pathname.replace(/^\/invites\/?/, '').split('/').filter(Boolean);
    play = null;
    clearInterval(cdTimer);
    document.body.classList.remove('gate-up');
    window.scrollTo(0, 0);
    document.body.dataset.side = p[0] && p[0] !== 'venue' && p[0] !== 'host' ? 'guest' : 'studio';
    if (p[0] === 'venue' && p[1] === 'new') { startWizard(); return viewWizard(); }
    if (p[0] === 'venue' && p[1] === 'edit' && getEvent(p[2])) { startWizard(p[2]); return viewWizard(); }
    if (p[0] === 'venue' && p[1] === 'done') return viewDone(p[2]);
    if (p[0] === 'venue') return viewVenue();
    if (p[0] === 'host') { hostTab = 'replies'; return viewHost(p[1]); }
    if (p[0]) return viewInvite(p[0]); /* /invites/<event> is the link guests get */
    viewHome();
  }

  /* ---------- Events ---------- */
  const actions = {
    reset() { if (window.confirm('Reset the demo to its sample events?')) { [KEY, MINE, VOTES].forEach((k) => { try { localStorage.removeItem(k); } catch (e) { /* fine */ } }); load(); go('/invites/'); } },
    scroll(b) { const t = document.getElementById(b.dataset.to); if (t) t.scrollIntoView({ block: 'start' }); },
    copy(b) { copy(b.dataset.text); },
    ics(b) { const ev = getEvent(b.dataset.id); if (ev) makeIcs(ev); },
    step(b) { const i = document.getElementById(b.dataset.t); i.value = Math.max(0, Math.min(99, n(i.value) + (+b.dataset.d))); },
    'wiz-back'() { wiz.error = ''; wiz.step--; viewWizard(); window.scrollTo(0, 0); },
    'accent-reset'() { wiz.draft.accent = ''; viewWizard(); },
    'photo-reset'() { wiz.draft.photo = ''; viewWizard(); },
    'gate-open'(b) { const g = b.closest('.gate'); if (g.classList.contains('is-open')) return; g.classList.add('is-open'); closeGate(g); },
    'gate-again'(b) { window.scrollTo(0, 0); viewInvite(b.dataset.id, true); },
    'gate-replay'() {
      if (reduceMotion) return;
      const el = document.getElementById('preview'), page = el.querySelector('.iv-page');
      if (!page || page.querySelector('.gate')) return;
      el.scrollTop = 0;
      page.classList.remove('play');
      page.insertAdjacentHTML('afterbegin', gateHTML(previewEvent()));
    },
    'scratch-reveal'(b) { const box = b.parentElement.querySelector('[data-scratch]'); if (box) revealScratch(box); },
    balloon(b) {
      if (b.classList.contains('is-popped')) return;
      const sec = b.closest('.iv-pop'), ev = getEvent(location.pathname.split('/')[2]) || (wiz ? previewEvent() : null);
      const secrets = ev ? ev.secrets.filter(Boolean) : [];
      const popped = sec.querySelectorAll('.balloon.is-popped').length;
      burstAt(themeOfEl(b), b, 18);
      b.classList.add('is-popped'); b.setAttribute('aria-hidden', 'true'); b.tabIndex = -1;
      const all = sec.querySelectorAll('.balloon').length;
      sec.querySelector('.pop__msg').textContent = popped + 1 >= all ? 'You found them all. See you there!' : (secrets[popped] || 'Pop another one!');
      const next = sec.querySelector('.balloon:not(.is-popped)');
      if (next) next.focus();
    },
    vote(b) {
      const ev = getEvent(b.dataset.id);
      if (!ev || voteGet(ev.id) != null) return;
      ev.votes = ev.votes || [0, 0, 0];
      ev.votes[+b.dataset.i]++;
      save(); writeMap(VOTES, ev.id, +b.dataset.i);
      document.getElementById('poll-area').innerHTML = pollHTML(ev);
      burstAt(ev.theme, document.getElementById('poll-area'), 24);
    },
    pop(b) { if (b.classList.contains('is-pop')) return; burstAt(themeOfEl(b), b, 16); b.classList.add('is-pop'); setTimeout(() => b.classList.remove('is-pop'), 4000); },
    lantern(b) { b.classList.toggle('is-lit'); },
    'rsvp-change'(b) {
      const ev = getEvent(b.dataset.id);
      document.getElementById('rsvp-area').innerHTML = rsvpArea(ev, true);
      document.getElementById('rsvp-form').classList.add('is-in');
      document.querySelector('#rsvp-form input').focus();
    },
    'quiz-start'(b) { play = { kind: 'quiz', id: b.dataset.id, stage: 'name', i: 0, score: 0, picked: null }; renderQuiz(); },
    'quiz-pick'(b) { const ev = getEvent(play.id); play.picked = +b.dataset.i; if (play.picked === ev.quiz[play.i].answer) play.score++; renderQuiz(); },
    'quiz-next'() {
      const ev = getEvent(play.id);
      play.i++; play.picked = null;
      if (play.i >= ev.quiz.length) {
        play.stage = 'end';
        const existing = ev.scores.find((s) => s.name.toLowerCase() === play.name.toLowerCase());
        if (existing) existing.score = Math.max(existing.score, play.score); else ev.scores.push({ name: play.name, score: play.score });
        save();
      }
      renderQuiz();
    },
    'match-start'(b) { const ev = getEvent(b.dataset.id), w = matchWords(ev); play = { kind: 'match', id: ev.id, words: shuffle(w), means: shuffle(w), done: [], sel: null, msg: '' }; renderMatch(); },
    'match-word'(b) { play.sel = b.dataset.w; play.msg = ''; renderMatch(); },
    'match-mean'(b) {
      if (!play.sel) { play.msg = 'Tap a word first.'; return renderMatch(); }
      if (play.sel === b.dataset.w) { play.done.push(play.sel); play.msg = 'Correct!'; } else play.msg = 'Not that one. Try again.';
      play.sel = null;
      renderMatch();
    },
    'memory-start'(b) { startMemory(getEvent(b.dataset.id)); },
    'memory-flip'(b) { flipMemory(b); },
    'game-menu'(b) { play = null; gameArea(gameMenu(getEvent(b.dataset.id))); },
    'host-tab'(b) { hostTab = b.dataset.k; viewHost(b.dataset.id); const t = document.querySelector(`[data-k="${hostTab}"]`); if (t) t.focus(); },
    'reply-add'(b) { openReply(getEvent(b.dataset.id), null, b.dataset.name); },
    'reply-edit'(b) { const ev = getEvent(b.dataset.id); openReply(ev, ev.replies.find((r) => r.id === b.dataset.r)); },
    'reply-del'(b) { const ev = getEvent(b.dataset.id); if (!window.confirm('Remove this reply?')) return; ev.replies = ev.replies.filter((r) => r.id !== b.dataset.r); save(); viewHost(ev.id); },
    'dlg-close'() { document.getElementById('reply-dlg').close(); },
    csv(b) { downloadCsv(getEvent(b.dataset.id)); },
    'expected-remove'(b) { const ev = getEvent(b.dataset.id); ev.expected = ev.expected.filter((x) => x !== b.dataset.name); save(); viewHost(ev.id); },
    'quiz-del'(b) { const ev = getEvent(b.dataset.id); ev.quiz.splice(+b.dataset.i, 1); ev.scores = []; save(); viewHost(ev.id); }
  };
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (b && actions[b.dataset.act]) {
      if (b.closest('#preview') && !/^(gate-open)$/.test(b.dataset.act)) return;
      e.preventDefault(); actions[b.dataset.act](b); return;
    }
    const a = e.target.closest('a[href^="/invites"]');
    if (a && !a.target && !e.metaKey && !e.ctrlKey && !e.shiftKey && !a.closest('#preview')) { e.preventDefault(); go(a.getAttribute('href')); }
  });

  function setDraft(el) {
    const key = el.dataset.f, path = key.split('.');
    let val = el.type === 'checkbox' ? el.checked : el.value;
    if (key === 'secrets') val = el.value.split('\n');
    let o = wiz.draft;
    for (let i = 0; i < path.length - 1; i++) o = o[path[i]];
    o[path[path.length - 1]] = val;
    if (key === 'type') applyType(wiz.draft);
    if ('rerender' in el.dataset) {
      viewWizard();
      const again = document.querySelector(`[data-f="${key}"]:checked`) || document.querySelector(`[data-f="${key}"]`);
      if (again) again.focus();
    } else if (key === 'theme' || key === 'accent' || el.type === 'checkbox') {
      refreshPreview();
      if (key === 'accent') { const r = document.querySelector('[data-act="accent-reset"]'); if (r) r.disabled = false; }
    } else queuePreview();
  }
  document.addEventListener('input', (e) => {
    const el = e.target;
    if (el.dataset.venue) { db.venue[el.dataset.venue] = el.value; save(); return; }
    if (el.dataset.f && wiz && el.type !== 'checkbox' && el.type !== 'radio') setDraft(el);
  });
  document.addEventListener('change', (e) => {
    const el = e.target;
    if (el.id === 'photo-in') return readPhoto(el.files[0]);
    if (el.dataset.f && wiz && (el.type === 'checkbox' || el.type === 'radio')) setDraft(el);
    if (el.name === 'going' && el.form && el.form.id === 'rsvp-form') document.getElementById('rsvp-yes').hidden = el.value !== 'yes';
  });
  document.addEventListener('submit', (e) => {
    const f = e.target;
    e.preventDefault();
    if (f.closest('#preview')) return;
    if (f.id === 'wiz-form') return wizardNext();
    if (f.id === 'rsvp-form') return submitRsvp(f);
    if (f.id === 'reply-form') return saveReply(f);
    if (f.id === 'quiz-name') {
      const who = f.elements.player.value.trim();
      if (!who) { f.querySelector('#quiz-err').textContent = 'Please add your name.'; f.elements.player.focus(); return; }
      play.name = who; play.stage = 'q'; renderQuiz(); return;
    }
    if (f.id === 'add-expected') {
      const ev = getEvent(f.dataset.id), name = f.elements.who.value.trim();
      if (!name) { f.elements.who.focus(); return; }
      if (ev.expected.indexOf(name) < 0) ev.expected.push(name);
      save(); viewHost(ev.id);
      document.querySelector('#add-expected input').focus();
      return;
    }
    if (f.id === 'quiz-add') {
      const ev = getEvent(f.dataset.id), q = f.elements.q.value.trim();
      const opts = [f.elements.o0.value.trim(), f.elements.o1.value.trim(), f.elements.o2.value.trim()];
      if (!q || opts.some((o) => !o)) { f.querySelector('#quiz-add-err').textContent = 'Please add the question and all three answers.'; return; }
      ev.quiz.push({ q, options: opts, answer: +f.elements.answer.value });
      save(); viewHost(ev.id); toast('Question added');
    }
  });

  window.addEventListener('popstate', route);
  window.addEventListener('storage', (e) => { if (e.key === KEY) { load(); if (!document.querySelector('dialog[open]') && !document.querySelector('#wiz-form') && !document.querySelector('#rsvp-form') && !play) route(); } });
  load();
  route();
})();

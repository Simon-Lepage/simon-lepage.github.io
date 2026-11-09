(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || performance.now() > 500 || !CSS.supports('animation-name', 'pixel-clear')) return;

    const size = Math.max(64, Math.min(96, Math.round(window.innerWidth / 14)));
    const columns = Math.ceil(window.innerWidth / size);
    const rows = Math.ceil(window.innerHeight / size);
    const colors = ['#ffaf01', '#ff9a02', '#ff8204', '#ff6529'];
    const overlay = document.createElement('div');
    overlay.className = 'pixel-reveal';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.inert = true;
    overlay.style.setProperty('--columns', columns);
    overlay.style.setProperty('--tile-size', size + 'px');

    for (let i = 0; i < columns * rows; i++) {
        const tile = document.createElement('span');
        const row = Math.floor(i / columns) / Math.max(1, rows - 1);
        tile.style.setProperty('--tile-color', colors[Math.floor(Math.random() * colors.length)]);
        tile.style.setProperty('--tile-delay', 60 + Math.round(row * 340 + Math.random() * 260) + 'ms');
        overlay.appendChild(tile);
    }

    const dismiss = () => {
        overlay.remove();
        motion.removeEventListener('change', dismiss);
        window.removeEventListener('resize', dismiss);
    };
    let remaining = columns * rows;
    overlay.addEventListener('animationend', event => {
        if (event.animationName === 'pixel-clear' && --remaining === 0) dismiss();
    });
    motion.addEventListener('change', dismiss, { once: true });
    window.addEventListener('resize', dismiss, { once: true });
    document.body.appendChild(overlay);
})();

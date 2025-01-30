const container = document.querySelector('.gameContainer');
const btn = document.querySelector('#button');
const style = getComputedStyle(container);

const contWidth = parseInt(style.width);
const contHeight = parseInt(style.height);

btn.addEventListener('click', () => {
    if (btn.textContent.includes('Make Art')) {
        const sqrsPerSide = prompt('How many squares per side? (limit: 900)', 16);
        if (sqrsPerSide > 0 && sqrsPerSide <= 900) {
            container.innerHTML = ''; // Clear existing squares
            const totalSqrs = sqrsPerSide * sqrsPerSide;

            for (let i = 0; i < totalSqrs; ++i) {
                const sqr = document.createElement('div');
                sqr.classList.add('square');
                const sqrSize = contWidth / sqrsPerSide;
                sqr.style.width = `${sqrSize}px`;
                sqr.style.height = `${sqrSize}px`;
                sqr.style.border = '1px solid rgba(0,0,0,0.2)';
                sqr.style.backgroundColor = 'white';
                container.appendChild(sqr);
            }
            btn.textContent = 'Aww Made a mistake :( , Try again!';
        } else {
            alert('Invalid input!');
        }
    } else {
        if (confirm('Are you sure you want to reset?')) {
            container.innerHTML = ''; // Clear squares
            btn.textContent = 'Make Art!';
        }
    }
});

// Hover effect
container.addEventListener('mouseover', (event) => {
    const targetSqr = event.target;
    if (targetSqr.classList.contains('square')) {
        let currentColor = getComputedStyle(targetSqr).backgroundColor;
        let rgbaMatch = currentColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)/);

        if (rgbaMatch) {
            let [r, g, b, opacity] = rgbaMatch.slice(1).map(Number);
            opacity = opacity ? Math.min(opacity + 0.1, 1) : 0.1;
            targetSqr.style.backgroundColor = `rgba(${r || Math.random() * 200},${g || Math.random() * 200},${b || Math.random() * 200},${opacity})`;
        }
    }
});

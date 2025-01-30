const container = document.querySelector('.gameContainer');
const btn = document.querySelector('#btn');
const style = getComputedStyle(container);

// slice() to remove 'px' from string returned to prevent NaN in calculations
const contWidth = style.width.slice(0, style.width.length-2);
console.log(`Container width: ${contWidth}`);
const contHeight = style.height.slice(0, style.height.length-2);
console.log(`Container height: ${contHeight}`);

btn.addEventListener('click', () => {
    //start game logic
    if(btn.textContent === 'Make ART!'){
        const sqrsPerSide = prompt('Total squares per side in grid? (Limit: 1 to 100)', 16);
        console.log(typeof(sqrsPerSide));
        console.log(`Squares per side: ${sqrsPerSide}`);
        const totalSqrs = sqrsPerSide * sqrsPerSide;
        console.log(`Total Squares: ${totalSqrs}`);
        
        // valid user input case
        if (sqrsPerSide > 0 && sqrsPerSide <= 100){
            for (let i = 0; i < totalSqrs; ++i){
                const sqr = document.createElement('div');
                sqr.classList.add('sqr');
                sqr.id = i;
                const sqrWidth = contWidth / sqrsPerSide;
                const sqrHeight = contHeight / sqrsPerSide;
                sqr.style.width = `${sqrWidth}px`;
                sqr.style.height = `${sqrHeight}px`;
                sqr.style.border = 'solid 1px';
                sqr.style.borderColor = 'rgb(0,0,0,0.2)';
                sqr.style.backgroundColor = 'white';
                // No border if total squares is 1
                if(totalSqrs == 1){
                    sqr.style.border = 'none';
                }
                container.appendChild(sqr);
                // check sqr width and height
                if(i == totalSqrs - 1) {
                    console.log(`Square Width: ${sqrWidth}`);
                    console.log(`Square Height: ${sqrHeight}`);
                }
            }
            btn.textContent = 'Aww made a mistake :( , Try again ?';
        }
        // invalid user input case
        else if (sqrsPerSide === null || sqrsPerSide === '') {
            // handle null or empty input case here if needed
        }
        else alert('Invalid input');
        
    }
    //reset game logic
    else if(btn.textContent === 'Aww made a mistake :( , Try again ?'){
        const decision = confirm('Are you sure you want to reset?');
        if(decision){
            console.log(`reset`);
            const sqrs = document.querySelectorAll('.sqr');
            sqrs.forEach((sqr) => sqr.remove());
            btn.textContent = 'Make ART!';
            let clickEvent = new Event('click');
            btn.dispatchEvent(clickEvent);
        }
        else btn.textContent = 'Aww made a mistake :( , Try again ?';
    }
})

// sqr hover logic
container.addEventListener('mouseover', (event) => {
    const targetSqr = event.target;
    if(targetSqr.classList.contains('sqr')){  // Check using classList.contains()
        const clrRandomizer = () => Math.floor(Math.random() * 201);
        
        // sqr bg color randomizer logic
        if(targetSqr.style.backgroundColor === 'white'){
            const sqrBgOpacity = 0.1;
            const sqrBgColor = `rgba(${clrRandomizer()},${clrRandomizer()},${clrRandomizer()},${sqrBgOpacity})`;
            targetSqr.style.backgroundColor = sqrBgColor;
        }
        // sqr bg color opacity increase per hover logic (0.1/10% increase per hover)
        else {
            // get current sqr bg color opacity logic
            const style = getComputedStyle(targetSqr);
            const sqrBgColor = style.backgroundColor;
            const match = sqrBgColor.match(/rgba\((\d+), (\d+), (\d+), (\d(\.\d+)?)\)/);
            if (match) {
                let newSqrBgOpacity = parseFloat(match[4]) + 0.1; // increase opacity
                if (newSqrBgOpacity > 1) newSqrBgOpacity = 1;  // cap the opacity at 1
                const newSqrBgColor = `rgba(${match[1]},${match[2]},${match[3]},${newSqrBgOpacity})`;
                targetSqr.style.backgroundColor = newSqrBgColor;
            }
        }
    }
});

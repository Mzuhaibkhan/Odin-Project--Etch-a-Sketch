const container = document.querySelector('.gameContainer');
const btn = document.querySelector('.#btn');
const style = getComputedStyle(container);

//slice()

const contWidth = style.width.slice(0,style.width.length-2);
console.log(`Container Width: ${contWidth}`);
const contHeight = style.height.slice(0,style.height.length-2);
console.log(`Container Height: ${contHeight}`);

btn.addEventListener('click', () => {
    if(btn.textContent === 'Make Art!'){
        //game logic
        const sqrsPerSide = prompt('How many squares per side?(limit: 900)',16);
        console.log(typeof(sqrsPerSide));
        console.log(`Squares per side: ${sqrsPerSide}`);
        const totalSqrs = sqrsPerSide * sqrsPerSide;
        console.log(`Total squares: ${totalSqrs}`);

        //valid user
        if(sqrsPerSide > 0 && sqrsPerSide <= 900){
            for(let i=0;i<totalSqrs;++i){
                const sqr = document.createElement('div');
                sqr.classList.add('square');
                sqr.id =i;
                const sqrWidth = contWidth/sqrsPerSide;
                const sqrHeight = contHeight/sqrsPerSide;
                sqr.style.width = `${sqrWidth}px`;
                sqr.style.height = `${sqrHeight}px`;
                sqr.style.border = '1px solid';
                sqr.style.borderColor = 'rgb(0,0,0,0.2)';
                sqr.style.backgroundColor = 'white';

                //no border for one square
                if(totalSqrs ==1){
                    sqr.style.border = 'none';
                }
                container.appendChild(sqr);

                //check sqr width and height
                if(i==totalSqrs-1){
                    console.log(`Square Width: ${sqrWidth}`);
                    console.log(`Square Height: ${sqrHeight}`);
                }
            }
            btn.textContent = 'Aww Made a mistake :( , Try again!';
        }

        //invalid user input
        else if (sqrsPerSide == null){
        }
        else alert('Invalid input!');
    }

    //reset game 
    else if (btn.textContent === 'Aww Made a mistake :( , Try again!'){
        const decision = confirm('Are you sure you want to reset?');
        if(decision){
            console.log(`reset`);
            const sqrs =document.querySelectorAll('.sqr');
            sqrs.forEach((sqr) => sqr.remove());
            btn.textContent = 'Make Art!';
            let clickEvent = new Event('click');
            btn.dispatchEvent(clickEvent);
        }

        else btn.textContent = 'Aww Made a mistake :( , Try again!';
            
    }
})

//hover effect
container.addEventListener('mouseover', (event)=>{
    const targetSqr =event.target;
    if(targetSqr.className === 'sqr'){
        const clrRandom = () => Math.floor(Math.random()*201);

        //sqr bg color random
        if(targetSqr.style.backgroundColor === 'white'){
            const sqrBgOpacity = 0.1;
            const sqrBgColor = `rgb(${clrRandom()},${clrRandom()},${clrRandom()},${sqrBgOpacity})`;

            targetSqr.style.backgroundColor = sqrBgColor;
        }

        //sqr bg color opacity increases
        else{
            const style = getComputedStyle(targetSqr);
            const sqrBgOpacity = style.backgroundColor.slice(style.backgroundColor.length-4,style.backgroundColor.length-1);

            //store current bg color and opacity
            let newSqrBgOpacity = +sqrBgOpacity;

            //increase per hover set to 0.1
            newSqrBgOpacity += 0.1;
            
        }
    }
})
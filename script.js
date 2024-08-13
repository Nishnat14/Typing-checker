const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time= document.querySelector('.time span b')
const mistakes= document.querySelector('.mistake span')
const wpm= document.querySelector('.wpm span')
const cpm= document.querySelector('.cpm span')
const btn= document.querySelector('button')
 
//set value
let timer;
let maxTime = 60;
let timeleft = maxTime;
let charIndex = 0;
let mistake = 0;
let istyping = false;




// load paragragh from array of sentence
function loadParagraph(){
    const paragraph=[ "adventure room gentle waves epic whisper tranquil joy painting shining landscape star breeze ocean golden shining birds city moment whispering energy peace epic forest golden vibrant vibrant vibrant rising secrets rain epic sunset room colors horizon peace painting.",
    "forest horizon star night peaceful epic adventure vibrant golden shining whispering shining shining vibrant adventure shining star peace whisper sand ocean epic secrets golden joy vibrant painting golden clouds epic landscape adventure golden sunset forest rising energy landscape joy.",
    "tranquil rising epic night golden painting adventure whisper city forest landscape horizon shining whisper adventure peace sunset landscape landscape peace waves whisper painting peaceful peace whisper star vibrant peaceful vibrant room adventure golden birds golden gentle horizon painting.",
    "whisper star adventure adventure horizon waves golden clouds sand shining city adventure people people peace gentle night whisper rising gentle joy sunset vibrant painting golden city adventure tranquil shining room epic landscape shining vibrant adventure joy shining shining epic.",
    "gentle landscape vibrant star painting horizon landscape peace tranquil epic whispering star night sand peaceful landscape painting peaceful golden forest adventure peace sunset epic gentle birds horizon adventure golden peaceful vibrant sunset shining vibrant people vibrant shining waves.",
    "peaceful vibrant golden sunset painting horizon shining adventure epic whispering gentle forest vibrant tranquil landscape epic rising joy night shining vibrant adventure shining people whisper landscape golden peaceful forest epic energy room sand sunset shining vibrant clouds adventure shining night golden horizon adventure people star peace shining sunset gentle vibrant golden birds whisper.",
    "golden vibrant landscape horizon whisper golden shining tranquil peace forest vibrant adventure epic golden shining rising sunset golden energy whispering landscape shining vibrant epic joy shining painting adventure waves shining vibrant city golden adventure peace night peaceful tranquil peaceful landscape people shining night golden clouds golden star sunset whisper forest vibrant whisper golden horizon adventure.",
    "shining vibrant peaceful horizon adventure vibrant epic adventure golden waves golden peaceful rising whisper adventure shining golden sunset golden vibrant painting golden horizon adventure people shining shining vibrant landscape vibrant whispering city tranquil star landscape whisper rising shining forest sunset vibrant horizon night peaceful golden adventure peaceful sunset golden vibrant golden star vibrant adventure.",
    "whisper shining golden horizon vibrant waves whisper golden epic rising shining golden landscape adventure vibrant golden sunset peaceful vibrant golden sunset epic peaceful golden epic vibrant rising golden shining people vibrant sunset night landscape peaceful sunset vibrant vibrant vibrant golden waves rising horizon tranquil shining forest gentle golden landscape golden night star vibrant adventure shining sunset.",
    "golden peaceful rising vibrant star shining vibrant vibrant forest golden tranquil peaceful golden night golden waves shining landscape golden sunset golden horizon vibrant adventure golden waves golden vibrant golden adventure vibrant peaceful horizon sunset vibrant whisper rising landscape vibrant whispering sunset golden landscape gentle night sunset adventure star epic horizon gentle vibrant peaceful golden horizon."];

    //load it randomly
const randomIndex = Math.floor(Math.random()*paragraph.length);
typingText.innerHTML='';
for(const char of paragraph[randomIndex]){
    console.log(char);
typingText.innerHTML+= `<span>${char}</span>`;
}
typingText.querySelectorAll('span')[0].classList.add('active');
document.addEventListener('keydown',()=>input.focus());
typingText.addEventListener("click",()=>{
    input.focus()
})
}

//handle user input
function initTyping() {
    const chars = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);

    // Check for backspace key press
    if (event.inputType === 'deleteContentBackward') {
        if (charIndex > 0) {
            charIndex--;
            const lastChar = chars[charIndex];

            // Remove correct/incorrect classes
            lastChar.classList.remove('correct', 'incorrect');

            // Decrease mistake count if the character was incorrect
            if (lastChar.classList.contains('incorrect')) {
                mistake--;
            }

            // Update stats and move active class back
            mistakes.innerText = mistake;
            cpm.innerText = charIndex - mistake;
            chars.forEach(span => span.classList.remove('active'));
            chars[charIndex].classList.add('active');
        }
    } else {
        // Handle normal typing
        if (charIndex < chars.length && timeleft > 0) {
            if (!istyping) {
                timer = setInterval(initTime, 1000);
                istyping = true;
            }

            // Ensure that only one active character is highlighted
            chars.forEach(span => span.classList.remove('active'));

            if (chars[charIndex].innerText === typedChar) {
                chars[charIndex].classList.add('correct');
            } else {
                mistake++;
                chars[charIndex].classList.add('incorrect');
            }

            charIndex++;
            if (charIndex < chars.length) {  // Ensure we don't exceed the character length
                chars[charIndex].classList.add('active');
            }

            mistakes.innerText = mistake;
            cpm.innerText = charIndex - mistake;
        } else {
            clearInterval(timer);
            input.value = '';
        }
    }
}


function initTime(){
    if(timeleft>0){
        timeleft--;
        time.innerText=timeleft;
        const wpmval=Math.round(((charIndex-mistake)/5)/(maxTime - timeleft)*60);
        wpm.innerText= wpmval;
    }
    else{
        clearInterval(timer);
    }
}
function reset(){
    loadParagraph();
    clearInterval(timer);
    timeleft=maxTime;
    time.innerText=timeleft;
    input.value='';
    charIndex=0;
    mistake=0;
    istyping=false;
    mistakes.innerText= 0; 
    wpm.innerText= 0;
    cpm.innerText= 0;
    
   

}

input.addEventListener("input",initTyping);
loadParagraph();
btn.addEventListener("click",reset);


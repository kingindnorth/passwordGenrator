const resultEl = document.getElementById("result")
const lengthEl = document.getElementById("length")
const uppercaseEl = document.getElementById("uppercase")
const lowercaseEl = document.getElementById("lowercase")
const numbersEl = document.getElementById("numbers")
const symbolsEl = document.getElementById("symbols")
const generateEl = document.getElementById("generate")
const clipboardEl = document.getElementById("clipboard")

const randomFunction = {
    upper:getRandomUpperCase,
    lower:getRandomLowerCase,
    number:getRandomNumber,
    symbols:getRandomSymbols
}

generateEl.addEventListener("click",()=>{
    const length = +lengthEl.value                                      // + to parse it into number
    const hasUpper = uppercaseEl.checked
    const hasLower = lowercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbols = symbolsEl.checked

    resultEl.innerText = generatePassword(length,hasUpper,hasLower,hasNumber,hasSymbols)
})

function generatePassword(length,upper,lower,number,symbols){
    let generatedPassword = ""
    const checkedCount = upper+lower+number+symbols
    if(checkedCount === 0) return
    const checkedArray = [{upper},{lower},{number},{symbols}].filter(item=>Object.values(item)[0])
    //generate password
    for(let i = 0; i<length; i+=checkedCount){
        checkedArray.forEach(item=>{
            const funcName = Object.keys(item)[0]
            generatedPassword += randomFunction[funcName]()   
        })
    }

    const finalPassword = generatedPassword.slice(0,length)
    return finalPassword
}

//clipboard functionality
clipboardEl.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;
	
	if(!password) return
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
    resultEl.innerText = ""
});

//function to generate random 
//uppercase
function getRandomUpperCase(){
    const randomNumber = Math.floor(Math.random()*26)+65                //65 === A
    const randomUppercase = String.fromCharCode(randomNumber)
    return randomUppercase
}

//lowercase
function getRandomLowerCase(){
    const randomNumber = Math.floor(Math.random()*26)+97                //97 === a
    const randomLowercase = String.fromCharCode(randomNumber)
    return randomLowercase
}

//numbers
function getRandomNumber(){
    const randomNumber = Math.floor(Math.random()*10)
    return randomNumber

}

//symbols
function getRandomSymbols(){
    const symbols = "!@#$%^&_*-=+?<>"
    const symbol = symbols[Math.floor(Math.random()*15)]
    return symbol
}

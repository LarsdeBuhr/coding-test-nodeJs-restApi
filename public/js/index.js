const elBtn = document.querySelector("button");
const elInputWrapper = document.querySelector(".inputWrapper");
const elInput = [...document.querySelectorAll("input")];
const warnMsg = document.createElement("p");

/*Both input fields get an event listener that is fired after each change.
The background color of the input fields turns green or red. 
In addition, a warning text will be printed if not all fields are filled.
*/
for(let i=0; i<elInput.length; i++){
   let currInput = elInput[i];
   currInput.addEventListener("input", ()=>{
      //Background color red/green
      if(currInput.value.length > 0){
         currInput.classList.add("green");
         currInput.classList.remove("red");
      }else{
         currInput.classList.add("red");
         currInput.classList.remove("green");
      }
      //Warn text show/hide
      if(elInput[0].value.length > 0 && elInput[1].value.length > 0){
         warnMsg.classList.add("hide");
      }else{
         warnMsg.classList.remove("hide");
      }
   })
}


elBtn.addEventListener("click",()=>{
   if(elInput[0].value.length == 0 || elInput[1].value.length == 0){
      //Background color red/green
      if(elInput[0].value.length == 0){
         elInput[0].classList.add("red");
      }if(elInput[1].value.length == 0){
         elInput[1].classList.add("red");
      }
      //warn message if at least one input field is empty
      warnMsg.textContent = "Please fill out both input fields!";
      warnMsg.classList.add("redColor", "warnMsg");
      warnMsg.classList.remove("hide");
      elInputWrapper.append(warnMsg);
   }
})





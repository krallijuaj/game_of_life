// var clickCount = 0;
// function clickHandler(evt){
//    clickCount++;
//    console.log(evt);
//    var str = "Thanks for clicking " + clickCount;
//    this.innerText = str;
// }

// var p = document.getElementById("pElement");
// p.addEventListener("click", clickHandler);

// function bodyClick(evt){
//    console.log("Clicked at X: " + evt.pageX + ", Y: " + evt.pageX + ",Y: " + evt.pageY);
// }
// window.on click = bodyClick;

function main() {
   var socket = io();
   var chatDiv = document.getElementById('Chat');
   var input = document.getElementById('Nachricht');
   var button = document.getElementById('Senden');

   function handleSubmit(evt) {
       var val = input.value;
       if (val != "") {
           socket.emit("Nachricht senden", val);
       }
   }
   button.onclick = handleSubmit;
}
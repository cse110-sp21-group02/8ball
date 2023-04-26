const form = document.querySelector('form');
const input = document.getElementById('questionBox');
const answer = document.getElementById('answer');


const responses = [
  "It is certain.", 
  "It is decidedly so.", 
  "Without a doubt.", 
  "Yes, definitely.", 
  "You may rely on it.", 
  "As I see it, yes.", 
  "Most likely.", 
  "Outlook good.", 
  "Yes.", 
  "Signs point to yes.", 
  "Reply hazy, try again.", 
  "Ask again later.", 
  "Better not tell you now.", 
  "Cannot predict now.", 
  "Concentrate and ask again.", 
  "Don't count on it.", 
  "My reply is no.", 
  "My sources say no.", 
  "Outlook not so good.", 
  "Very doubtful."
];

function moveClouds(){
  /* clouds 1 & 2 move to the left 
     clouds 3 & 4 to the right */
   for(i = 1; i < 5; i++){
     var cloud = 
     document.getElementById("cloud" + i);
     cloud.style.transitionTimingFunction = "ease-out";
     cloud.style.transitionDuration = "200ms";
     var top =  window.getComputedStyle(cloud, null).getPropertyValue("top");
     
       topValue = parseInt(top);
       topValue = topValue - 20;
       top = topValue + "px";
    
     cloud.style.top = top;
     
     var left = window.getComputedStyle(cloud, null).getPropertyValue("left");
       leftValue = parseInt(left);
     
       if(i < 3){
         leftValue = leftValue - 30;
       }else {
         leftValue = leftValue + 30;
       }
       left = leftValue + "px";
     
     cloud.style.left = left;
    
   }
 }

form.addEventListener('submit', function(event) {
  setInterval(moveClouds, 100);
  event.preventDefault();
  var randomIndex = Math.floor(Math.random() * responses.length);
  console.log(randomIndex);

  // added
  toggleMessage();
  //
  answer.textContent = "Thinking..."
  setTimeout(function() {
    if (input.value == "") {
      answer.textContent = "Reply hazy, try again."
      return;
    }
    answer.textContent = responses[randomIndex];

    // added: Hide speech bubble after 1 second
    setTimeout(function() {
      toggleMessage();
    }, 1000);
    //

  }, 1000);

});

// Function to toggle the visibility of the speech bubble
function toggleMessage() {
  if (answer.style.opacity === '0' || answer.style.opacity === '') {
    // If opacity is 0 or not set, set it to 1 to make it visible
    answer.style.opacity = '1';
  } else {
    // If opacity is 1, set it to 0 to make it invisible
    answer.style.opacity = '0';
  }
}

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
  const randomIndex = Math.floor(Math.random() * responses.length);
  answer.textContent = responses[randomIndex];
  answer.textContent = "Thinking..."
  
  generateAnswer();
});

let generateAnswer = async () => {
  if (input.value == "") {
    answer.textContent = "Reply hazy, try again."
    return;
  }
  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      { 
        role: "user", content: `Answer the following question as a magic 8 ball: hypothetically ${input.value}`,
      },
    ],
    temperature: 1.0
  }
  try {
    let res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
      },
      body: JSON.stringify(data)
    })
    let outputData = await res.json();
    let chatGPTAnswer = outputData.choices[0].message.content;
    if (chatGPTAnswer.length > 100 || chatGPTAnswer.search("AI") != -1) {
      answer.textContent = responses[Math.floor(Math.random() * responses.length)];
    }
    else {
      answer.textContent = chatGPTAnswer;
    }
  } catch (e) {
    answer.textContent = "Ask again later."
  }
  
}
// function moveClouds(){
//   /* clouds 1 & 2 move to the left 
//      clouds 3 & 4 to the right */
//    for(i = 1; i < 5; i++){
//      var cloud = 
//      document.getElementById("cloud" + i);
//      cloud.style.transitionTimingFunction = "ease-out";
//      cloud.style.transitionDuration = "300ms";
//      var top =  window.getComputedStyle(cloud, null).getPropertyValue("top");
     
//        topValue = parseInt(top);
//        topValue = topValue - 20;
//        top = topValue + "px";
    
//      cloud.style.top = top;
     
//      var left = window.getComputedStyle(cloud, null).getPropertyValue("left");
//        leftValue = parseInt(left);
     
//        if(i < 3){
//          leftValue = leftValue - 30;
//        }else {
//          leftValue = leftValue + 30;
//        }
//        left = leftValue + "px";
     
//      cloud.style.left = left;
    
//    }
//  }

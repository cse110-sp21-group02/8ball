const form = document.querySelector('form');
const input = document.getElementById('questionBox');
const answer = document.getElementById('answer');
const audio = document.getElementById("s");


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

/**
 * Event listener for question asking
 */
form.addEventListener('submit', function(event) {
  setInterval(moveClouds, 100);
   audio.play();
  event.preventDefault();
  answer.style.opacity = '1';
  answer.textContent = "Thinking..."
  setTimeout(generateAnswer, 1000);
});

/*
 * Workaround for key being exposed in client-side code (still exposed but not easily grabbed)
 */
const KEY_PT1 = "sk-KioHoGiuZBHYbG0JRe"
const KEY_PT2 = "G5T3BlbkFJ3kXZgv4VOYPjBzk0mfHx"

/**
 * Generates and displays an answer to the question in 'input'.
 * If empty, will display "Reply hazy, try again."
 * If ChatGPT API fails due to rate limit, bad response, or disallowed input, will display a random response.
 */
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
        'Authorization': 'Bearer ' + KEY_PT1 + KEY_PT2,
      },
      body: JSON.stringify(data)
    })
    let outputData = await res.json();
    let chatGPTAnswer = outputData.choices[0].message.content;
    if (chatGPTAnswer.length > 100 || chatGPTAnswer.search("AI") != -1) {
      throw new Error();
    }
    answer.innerHTML = "";
    appearChars(chatGPTAnswer, answer, 50);

    // answer.textContent = chatGPTAnswer;
    setTimeout(function() {
      answer.style.opacity = '0';
    }, 1000)


  } catch (e) {
    answer.textContent = responses[Math.floor(Math.random() * responses.length)];
    // Hide speech bubble after 1 second
    setTimeout(function() {
      answer.style.opacity = '0';
    }, 2000);
  }
}

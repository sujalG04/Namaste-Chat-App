const socket = io('https://nodeserver-1-tn6b.onrender.com')

const form = document.getElementById('send-box')
const input = document.getElementById('message-input')
const msgContainer = document.querySelector('.container')

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = input.value;
    if(message !== ''){
    append(`You : ${message}` , 'right');
    socket.emit('send' , message);
    input.value = '';
    }
});

const append = (message , position)=>{
    const msgElement = document.createElement('div');
    msgElement.innerHTML = message;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    msgContainer.append(msgElement);
    msgContainer.scrollTop = msgContainer.scrollHeight;

}
const name = prompt("Enter your name to join chat");
if(name){
    socket.emit('new-user-joined' , name);

    socket.on('user-joined' , (name) =>{
       append(`${name} joined the chat`,'right')
    });

    socket.on('receive', data=>{
        append(`${data.user} : ${data.message}` , 'left');
        
    });

    socket.on('left', name=>{
        append(`${name} left the chat` , 'right');
        
    });
}
else{
    append(`You cannot join without name` , 'right');
}



// demo
// Function to adjust chat height on keyboard open
function adjustForKeyboard() {
    const viewportHeight = window.innerHeight;
    document.body.style.height = `${viewportHeight}px`;
  }
  
  // Call this function on window resize
  window.addEventListener('resize', adjustForKeyboard);

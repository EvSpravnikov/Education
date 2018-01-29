const ChatApp = require('./chat.js')
const vkChatApp  = require('./vkchat.js')

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new vkChatApp('---------vk');

let chatOnMessage = (message) => {
  console.log(message);
};

let prepareToAnswer = () => {
  console.log('Готовлюсь к ответу...');
};

webinarChat.on('message', chatOnMessage);
webinarChat.on('message', prepareToAnswer);

facebookChat.on('message', chatOnMessage);


vkChat.setMaxListeners(2);
vkChat.on('message', chatOnMessage);
vkChat.on('message', prepareToAnswer);
vkChat.once('close', function(data){
  console.log(data);
});


// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю вконтакте...');
vkChat.removeListener('message', chatOnMessage);
vkChat.removeListener('message', prepareToAnswer);
vkChat.close();
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
facebookChat.removeListener('message', chatOnMessage);
}, 15000 );

//Закрыть вебинар
setTimeout( ()=> {
  console.log('Закрываю вебинар... До встречи!');
webinarChat.removeListener('message', chatOnMessage);
webinarChat.removeListener('message', prepareToAnswer);
// Закрываем процесс
process.exit();
}, 30000);

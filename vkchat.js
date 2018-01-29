const ChatApp = require('./chat.js');

class vkChat extends ChatApp {

  close(){
    this.emit('close', 'Чат вконтакте закрылся :(');
  }
}

module.exports = vkChat;

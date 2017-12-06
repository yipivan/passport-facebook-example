const session = require('./session')
const socketIOSession = require("socket.io.session");

module.exports = (server)=>{

    
    const io = require('socket.io')(server);
    
    
    //"sessionSettings" same config as http-session used 
    const socketSession = socketIOSession(session.settings); 
    
    io.use(socketSession.parser);
    io.use((socket, next)=>{
        if(!socket.session.passport){
            socket.disconnect();
        }else{
            next();
        }
    });
    io.on('connection',(socket)=>{
        socket.emit('username',socket.session.passport.user);
    });
    return io;
}

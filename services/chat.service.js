const History = require("../models/History");

class SocketServices{
    
    //connection socket
    connection( socket ){
        socket.on('disconnect', () => {
            console.log(`User disconnect id is ${socket.id}`);
        })

        // event on here

        socket.on('chat message', msg => {
            console.log(`msg is:::${msg}`)
            _io.emit('chat message', msg)
        })

        socket.on('mankey',msg => {            
            var url = new URL(socket.handshake.headers.referer);
            var uid = url.searchParams.get("uid");
            var room = url.searchParams.get("room");
            History.findOne({roomId:room,creator:uid,pace:"ready"},(err,h)=>{
                let pace = msg.pace;
                if(h.keys == '1'){
                    if(msg.deleteKey != undefined){
                        msg.deleteKey = msg.deleteKey.toString().toUpperCase();
                    }                    
                    msg.key = msg.key.toString().toUpperCase();
                    var tmp = [];
                    pace = pace.split(",");
                    tmp.push(8 - parseInt(pace[0]));
                    tmp.push(9 - parseInt(pace[1]));
                    tmp.push(8 - parseInt(pace[2]));
                    tmp.push(9 - parseInt(pace[3]));
                    pace = tmp.join(",");
                }
                if(msg.deleteKey != undefined){
                    const delHistory = new History({roomId:room,creator:uid,keys:msg.deleteKey,pace:-1});
                    delHistory.save();
                }
                const newHistory = new History({roomId:room,creator:uid,pace:pace,keys:msg.key});
                newHistory.save();
                _io.emit(`mankey_${room}`,{pace:msg.pace,uid:uid});
            }).sort({createdAt:1}).limit(1);
        });
        socket.on('joiner_ready', () => {
            var url = new URL(socket.handshake.headers.referer);
            var uid = url.searchParams.get("uid");
            var room = url.searchParams.get("room");
            History.find({roomId:room,pace:'ready'},(err,his)=>{
                var _isset = false; var player = 0;
                if(his != null){
                    for(let i=0; i<his.length; i++){
                        if(his[i].creator == uid){
                            _isset = true;
                        }
                        player = parseInt(his[i].keys) + 1; 
                        
                    }
                }
                if(!_isset){
                    const newHistory = new History({roomId:room,keys:player,pace:'ready',creator:uid});
                    newHistory.save();
                }
                
                
                History.find({roomId:room,pace:'ready'},(err,h)=>{
                    _io.emit(`joiner_ready_${room}`,{uid:uid,firstJoiner:h});    
                }).sort({_id:1}).limit(1);
            });            
            //
        });
    }
}

module.exports = new SocketServices();
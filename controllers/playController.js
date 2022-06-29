const Room = require("../models/Room");
const User = require("../models/User");
const Joiner = require("../models/Joiner");
const History = require("../models/History");
const playView = (req, res) => {
    Room.findById(req.query.room, function (err, room) {        
        if (err){
            console.log(err);
        }else{
            if(room != null){
                Joiner.findOne({creator: req.user._id,roomId:room._id},(err, joiner)=>{
                    if (err){
                        console.log(err);
                    }else{                    
                        if(joiner == null && room.player < 2){                        
                            Joiner.findOne({creator:req.user._id},(err,j)=>{
                                if(j!=null){
                                    Room.findById(j.roomId,(err,r)=>{
                                        var player = parseInt(r.player) - 1;
                                        Room.updateOne({_id:j.roomId},{$set:{player:player}}, function (err){
                                            Joiner.deleteOne({creator:req.user._id}, function (err) {
                                                _io.emit(`joiner_out_${j.roomId}`,{id:req.user._id});
                                                
                                            });
                                        }); 
                                    });                                    
                                }                                
                            });
                            
                            const newJoiner = new Joiner({
                                roomId : room._id,
                                creator : req.user._id
                            });
                            newJoiner.save();
                            var player = isNaN(room.player) ? 1:parseInt(room.player) + 1;
                            Room.updateOne({_id:room._id},{$set:{player:player}}, function (err){});
                            User.findById(req.user._id,(err, u)=>{
                                _io.emit(`joiner_in_${room._id.toString()}`,{id:req.user._id,name:u.name});
                            })
                        }

                    }
                });
                Joiner.aggregate([
                    {$match:{roomId:room._id.toString(),creator:{$ne : req.user._id.toString()}}},
                    { "$lookup": {
                      "let": { "userObjId": { "$toObjectId": "$creator" } },
                      "from": "users",
                      "pipeline": [
                        { "$match": { "$expr": { "$eq": [ "$_id", "$$userObjId" ] } } }
                      ],
                      "as": "player"
                    }}
                  ],(error,j)=>{
                    History.aggregate([
                        {$match:{roomId:room._id.toString(),pace:{$nin:["ready","-1"]}}},
                        {$group:{
                            _id:"$keys",
                            pace:{$last:"$pace"},
                            creator:{$last:"$creator"},
                            createdAt:{$last:"$createdAt"}
                        }},
                        {$sort:{createdAt:-1}},
                        
                        ],(err,h)=>{
                            res.render("play/index", {
                                history: h,
                                room : room,
                                joiner:j,
                                me:{id:req.user._id,name:req.user.name}
                            });
                        });                    
                });   
            }else{
                res.redirect("/room");
            }

        }
             
    }); 
    
  };
  
  module.exports = {
    playView
  };


  
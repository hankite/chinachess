const Room = require("../models/Room");
const roomView = (req, res) => {
    
    Room.find({
        
    }, function (err, room) {
        if (err) {
            console.log(err);
        } else {
            res.render("room/index", {
                room:room,
                user:{id:req.user._id.toString(),name:req.user.name}
            });
        }
    }).sort({_id:-1})
    .limit(100);
};

const createRoom = (req, res) => {
    const {name, passwd} = req.body;
    const newRoom = new Room({name: name, password: passwd, creator: req.user._id});
    newRoom
        .save()
        .then((response) => {
            res.send(response._id);
        })
        .catch((err) => console.log(err));
};

module.exports = {
    roomView,
    createRoom
};

let express = require("express");
let app = express();
app.use(express.json());
let port = process.env.PORT || 3000;

let Datastore = require("nedb");
let db = new Datastore({ filename: 'chats.db', timestampData: true });
db.loadDatabase();
let PORT = 3000;

// let msgs = [];

app.use("/", express.static("public"));

app.post("/message", (req,res) => {
    // msgs.push(req.body);
    db.insert(req.body, (err, newDoc) =>{
        if (err) {
            res.send({"task" : "failed"})
        }
        else {
            res.send({"latestMsgs" : req.body})
        }
    })
    // console.log(msgs);
})

app.get("/messages", (req,res) => {
    db.find({}).sort({updateAt: 1}).exec(function (err, docs) {
        if(err) {
            res.json({task: "task failed"})
        } else {
            let obj = {msgs: docs};
            res.json(obj);
        }
      });
    })

// app.get('/messages', (req,res) => {
//     res.json({
//       "msgs" : msgs
//     })
//   })
  

app.listen(port, ()=>{
    console.log("server is runing on port " + port)
})
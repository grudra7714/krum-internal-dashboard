const express = require('express')
const app = express()
const http = require("http").Server(app);
const io = require('socket.io')(http)
const fs = require("fs")
const rp = require("request-promise");
const path = require("path")

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'ui')));

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log("Socket disconnect");
    });

});

http.listen(process.env.PORT, () => {
    console.log('listening on *:', process.env.PORT);
});

app.post("/event/message", (req, res) => {
  // console.log("Inside event message");
  console.log(req.body);
  if(req.body.event.subtype ) {
    console.log("subtype");
    // console.log(req.body.event.attachments);
    io.emit("test-connection", req.body.event.attachments[0].text);
  } else {
    if(req.body.event.text[0] !== '/') {
      io.emit("test-connection", {
        text: req.body.event.text,
        user: JSON.parse(req.body.userInfo).user
      });
    }
  }
  res.sendStatus(200);
});

app.get("/event/message", (req, res) => {
  console.log("Inside event get message", req.query);
  res.sendStatus(200);
});

app.get('/',  (req, res) => {
  res.send(__dirname + "/ui/");
});

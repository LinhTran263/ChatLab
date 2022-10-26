window.addEventListener("load",()=>{

    setInterval(()=>{
        refreshMsgs()
    }, 2000)



    let chatForm = document.getElementById("chat-form");
    //on form submission
    chatForm = addEventListener("submit", (e)=>{
        e.preventDefault();
        console.log("chat sent!");
        let chatName = document.getElementById("chat-name").value;
        let chatMsg = document.getElementById("chat-msg").value;
        document.getElementById("chat-msg").value = '';
        console.log("chat sent", chatName, chatMsg);

        let msgObj = {
            "name" : chatName,
            "msg" : chatMsg
        };

        let msgObjJSON = JSON.stringify(msgObj);

        console.log(msgObjJSON);

        fetch('/message',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: msgObjJSON
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            //once we have confirmation that the message has been sent, get all latest messages
        })
    })
})

function refreshMsgs() {
    //clear out the html div that contains all the messages
    //add all the new messages that we have

    fetch('/messages')
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        document.getElementById("chat-msgs").innerHTML = "";
        let allChats = data.msgs;
        allChats.forEach((chat) => {
            let chatContainer = document.createElement('li');
            let nameElt = document.createElement('p');
            nameElt.id = "name";
            let chatElt = document.createElement('p');
            chatElt.id = "chat";
            nameElt.innerHTML = chat.name;
            chatElt.innerHTML = chat.msg;

            chatContainer.appendChild(nameElt);
            chatContainer.appendChild(chatElt);
            document.getElementById("chat-msgs").appendChild(chatContainer);

        })
    })

}

/*what happen on form submission
1. get the value of what the user typed
2. store the message on the server side
3. display the chat message on screen
*/
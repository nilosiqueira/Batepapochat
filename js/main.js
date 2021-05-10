function loginUser(){
    myUserName = document.querySelector(".input-username").value;
    let data = {name: myUserName};
    const loginPromise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", data);

    loginPromise.then(()=>{
        loadChat();
        keepLoggedInterval = setInterval(keepLogged, 5000);
        loadOnlineUsers();
        getAllUsersOnlineInterval = setInterval(loadOnlineUsers, 10000);
    });
    loginPromise.catch(failInitialLogin);

    loadingPage();
}
function keepLogged(){
    let data = {name: myUserName};
    let loginPromise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status", data);
    loginPromise.then(()=>{
        return;
    });
    loginPromise.catch(failKeepLogin);
}

function allowChat(){
    let loginPage = document.querySelector(".login-page");
    loginPage.classList.add("logged");
}

function loadChat(){
    const chatPromise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
    
    chatPromise.then((response)=>{
        allowChat();
        loadMessages(response.data);
        keepChatInterval = setInterval(()=>{
            keepChat();
        }, 3000);
    });
    chatPromise.catch(failLoadInitialChat);
    loadingMessages();
}
function loadingMessages(){
    let loadingTxt = document.querySelector(".loading-text");
    if(!loadingTxt.classList.contains("hide")){
        loadingTxt.classList.add("hide");
    }
    let loadingMsg = document.querySelector(".loading-messages");
    if(loadingMsg.classList.contains("hide")){
        loadingMsg.classList.remove("hide");
    }
}

function keepChat(){
    const chatPromise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
    chatPromise.then((response)=>{
        loadMessages(response.data);
    });
    chatPromise.catch(failKeepChat);
}

function loadMessages(vectorMessages){
    let chat = document.querySelector(".chat");
    chat.innerHTML = "";
    for(let objMessage of vectorMessages){
        let boolReceivePrivate = (objMessage.to === myUserName);
        boolReceivePrivate = boolReceivePrivate || (objMessage.to === "Todos");
        boolReceivePrivate = boolReceivePrivate || (objMessage.from === myUserName);
        boolReceivePrivate = boolReceivePrivate && (objMessage.type === "private_message");

        if(objMessage.type === "status"){
            chat.innerHTML += createStatusMessage(objMessage);
        }
        else if (objMessage.type === "message"){
            chat.innerHTML += createPublicMessage(objMessage);
        }
        else if(boolReceivePrivate){
            chat.innerHTML += createPrivateMessage(objMessage);
        }
    }
    const lastMessage = document.querySelector(".chat").lastChild;
    lastMessage.scrollIntoView();
}

function failLoadInitialChat(){
    alert("Não foi possível carregar suas mensagens\nTente logar-se novamente");
    restartHomePage();
}
function failKeepChat(){
    alert("Não foi possível recuperar suas mensagens\nTente logar-se novamente");
    restartHomePage();
}

function loadingPage(){
    let inputUserName = document.querySelector(".input-username");
    let buttonLogin = document.querySelector(".button-login");

    inputUserName.classList.add("hide");
    buttonLogin.classList.add("hide");

    let loadingImg = document.querySelector(".loading-img");
    let loadingTxt = document.querySelector(".loading-text");

    if(loadingImg.classList.contains("hide")){
        loadingImg.classList.remove("hide");
    }
    if(loadingTxt.classList.contains("hide")){
        loadingTxt.classList.remove("hide");
    }
}

function failInitialLogin(){
    alert("Não foi possível logar '-'\nTente novamente");
    restartHomePage();
}

function failKeepLogin(){
    alert("Não foi possível manter sua conexão\nTente se logar novamente");
    restartHomePage();
}

let myUserName;
let keepLoggedInterval = null;
let keepChatInterval = null;
let getAllUsersOnlineInterval = null;
let destinataryName = "Todos";
let privateMessage = false;
setDetailsMessage();

function setDetailsMessage(){
    let detailMessage = document.querySelector(".detail-message-to-send");
    if(privateMessage){
        detailMessage.innerHTML = `Enviando para ${destinataryName} (reservadamente)`;
    }
    else{
        detailMessage.innerHTML = `Enviando para ${destinataryName}`;
    }
}
function createStatusMessage(obj){
    const liMessage = `<li class="message status">
        <p class="message-text"><span class="message-time">(${obj.time}) </span><span class="username-text">${obj.from} </span>${obj.text}</p>
    </li>`;
    return liMessage;
}
function createPublicMessage(obj){
    const liMessage = `<li class="message normal">
        <p class="message-text"><span class="message-time">(${obj.time}) </span><span class="username-text">${obj.from} </span>para <span class="username-text">${obj.to} </span>: ${obj.text}</p>
    </li>`;
    return liMessage;
}
function createPrivateMessage(obj){
    const liMessage = `<li class="message private">
        <p class="message-text"><span class="message-time">(${obj.time}) </span><span class="username-text">${obj.from} </span>reservadamente para <span class="username-text">${obj.to} </span>: ${obj.text}</p>
    </li>`;
    return liMessage;
}

function createOnlineUserItem(obj){
    const liOnlineUser = `<li class="user-online" onClick="selectDestinatary(this)">
        <div class="left-side-info">
            <ion-icon name="person-circle" class="user-online-icon"></ion-icon>
            <p class="user-online-name">${obj.name}</p>
        </div>
        <div class="right-side-info">
            <ion-icon name="checkmark-sharp" class="destinatary hide"></ion-icon>
        </div>
    </li>`;
    return liOnlineUser;
}

function restartHomePage(){
    destinataryName = "Todos";
    privateMessage = false;

    if(keepLoggedInterval){
        clearInterval(keepLoggedInterval);
        keepLoggedInterval = null;
    }
    
    if(keepChatInterval){
        clearInterval(keepChatInterval);
        keepChatInterval = null;
    }
    if(getAllUsersOnlineInterval){
        clearInterval(getAllUsersOnlineInterval);
        getAllUsersOnlineInterval = null;
    }

    let loginPage = document.querySelector(".login-page");
    if (loginPage.classList.contains("logged")){
        loginPage.classList.remove("logged");
    }

    let inputUserName = document.querySelector(".input-username");
    let buttonLogin = document.querySelector(".button-login");

    if(inputUserName.classList.contains("hide")){
        inputUserName.value = "";
        inputUserName.classList.remove("hide");
    }
    if(buttonLogin.classList.contains("hide")){
        buttonLogin.classList.toggle("hide");
    }

    let loadingImg = document.querySelector(".loading-img");
    let loadingTxt = document.querySelector(".loading-text");
    let loadingMsg = document.querySelector(".loading-messages");
    
    loadingImg.classList.add("hide");
    loadingTxt.classList.add("hide");
    loadingMsg.classList.add("hide");
}
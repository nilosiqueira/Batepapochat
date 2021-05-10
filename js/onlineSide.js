function showOnlineUsers(){
    let onlineUsers = document.querySelector(".online-users");
    if(onlineUsers.classList.contains("hide")){
        onlineUsers.classList.remove("hide");
    }
}

function backToChat(){
    let onlineUsers = document.querySelector(".online-users");
    onlineUsers.classList.add("hide");
}

function setPrivacity(obj){
    let brotherPrivacity;
    if(obj.classList.contains("send-public-message")){
        privateMessage = false;

        let iconCheckChildren = obj.querySelector(".right-side-privacity");
        iconCheckChildren = iconCheckChildren.querySelector(".choosen-privacity");
        if(iconCheckChildren.classList.contains("hide")){
            iconCheckChildren.classList.remove("hide");
        }
        brotherPrivacity = "send-private-message";
    }
    else if(obj.classList.contains("send-private-message")){
        privateMessage = true;
        
        let iconCheckChildren = obj.querySelector(".right-side-privacity");
        iconCheckChildren = iconCheckChildren.querySelector(".choosen-privacity");
        if(iconCheckChildren.classList.contains("hide")){
            iconCheckChildren.classList.remove("hide");
        }
        brotherPrivacity = "send-public-message";
    }
    brotherPrivacity = "." + brotherPrivacity;
    let brotherPrivacityItem = document.querySelector(brotherPrivacity);
    brotherPrivacityItem = brotherPrivacityItem.querySelector(".right-side-privacity");
    brotherPrivacityItem = brotherPrivacityItem.querySelector(".choosen-privacity");
    if(!brotherPrivacityItem.classList.contains("hide")){
        brotherPrivacityItem.classList.add("hide");
    }
    setDetailsMessage();
}

function loadOnlineUsers(){
    const onlineUsersPromise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants");

    onlineUsersPromise.then((response)=>{
        loadAllOnlineUsers(response.data);
    });
}

function loadAllOnlineUsers(vectorOnlineUsers){
    let listOnlineUsers = document.querySelector(".list-users");
    const allOnlineUserName = `<li class="user-online" onClick="selectDestinatary(this)">
        <div class="left-side-info">
            <ion-icon name="people" class="user-online-icon"></ion-icon>
            <p class="user-online-name">Todos</p>
        </div>
        <div class="right-side-info">
            <ion-icon name="checkmark-sharp" class="destinatary hide"></ion-icon>
        </div>
    </li>`;
    listOnlineUsers.innerHTML = allOnlineUserName;
    for(let objOnlineUser of vectorOnlineUsers){
        listOnlineUsers.innerHTML += createOnlineUserItem(objOnlineUser);
    }
}

function selectDestinatary(obj){
    let listOnlineUsers = document.querySelector(".list-users").children;
    for(let onlineUser of listOnlineUsers){
        onlineUser = getIconInside(onlineUser);
        if(!onlineUser.classList.contains("hide")){
            onlineUser.classList.add("hide");
        }
    }
    let nameInside = obj.querySelector(".left-side-info");
    nameInside = nameInside.querySelector(".user-online-name");
    destinataryName = nameInside.innerHTML;
    setDetailsMessage();
    obj = getIconInside(obj);
    if(obj.classList.contains("hide")){
        obj.classList.remove("hide");
    }
}

function getIconInside(obj){
    obj = obj.querySelector(".right-side-info");
    obj = obj.querySelector(".destinatary");
    return obj;
}

function logoutUser(){
    backToChat();
    restartHomePage();
}

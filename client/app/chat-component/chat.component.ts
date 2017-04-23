import { Component } from "@angular/core";
declare var socket: any;

/// <reference path="../../typings/globals/jquery/index.d.ts/>


@Component({
  selector: "chat-page",
  templateUrl: "./chat.component.html"
})

export class ChatComponent {
    reference: any;
    resFlag: boolean = false;
    newUser: boolean = false;
    exitedUser: boolean = false;
    newUserName: string = null;
    exitedUserName: string = null;
    sentMessageUsername: string = null;
    response: string;
    clientsNameList: number[];
    message: string;
    msgCount: number = 0;

    constructor() {
        let reference = this;
        // let temp;
       /* socket.on("broadcastToAll_chatMessage", function(resObj) {
            reference.msgCount++;
            if (reference.sentMessageUsername !== resObj.name) {
                resObj.name = resObj.name + ": ";
                temp = $("#messages").length;
                console.log("ul length : ", temp);
                console.log(reference.msgCount);
                $("#messages").append($("<li data-index=" + reference.msgCount + ">"));
                $("li[data-index=" + reference.msgCount + "]").append($("<div class='left-msg' data-index=" + reference.msgCount + ">"));
                $("div[data-index=" + reference.msgCount + "]").append($("<span class='name'>").text(resObj.name));
                $("div[data-index=" + reference.msgCount + "]").append($("<span class='msg'>").text(resObj.msg));
                $("#messages").append($("<br>"));

            }
            else if (reference.sentMessageUsername === resObj.name) {
                $("#messages").append($("<li data-index=" + reference.msgCount + ">"));
                $("li[data-index=" + reference.msgCount + "]").append($("<div class='right-msg' data-index=" + reference.msgCount + ">"));
                $("div[data-index=" + reference.msgCount + "]").append($("<span class='msg'>").text(resObj.msg));
                 $("#messages").append($("<br>"));
                reference.sentMessageUsername = null;
            }
        });*/

        socket.on("updateSocketList", function(list){
          reference.clientsNameList = list;
        });

        socket.on("addUserToSocketList", function(username){
            reference.exitedUser = false;
            reference.newUser = true;
            reference.newUserName = username;
        });

        socket.on("removeUserFromSocketList", function(username){
            reference.newUser = false;
            reference.exitedUser = true;
            reference.exitedUserName = username;
        });
    }


    sendMessage(data) {
        this.resFlag = true;
        let reference = this;
        socket.emit("chatMessageToSocketServer", data.value, function(respMsg, username){
            reference.sentMessageUsername = username;
            reference.response = respMsg;
        });
        // $("#message-boxID").val(" ");
    }

    sendMessageOnEnter($event, messagebox) {
        if ($event.which === 13) { // ENTER_KEY
            this.sendMessage(messagebox);
        }
    }

    update() {
        this.resFlag = false;
        this.newUser = false;
        this.exitedUser = false;
    }
}

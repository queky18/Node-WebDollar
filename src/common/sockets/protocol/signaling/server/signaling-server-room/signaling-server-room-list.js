import {SocketAddress} from './../../../../../../common/sockets/socket-address.js';
import {SignalingServerRoomConnectionObject} from './signaling-server-room-connection-object';

const colors = require('colors/safe');

/*
    The List is populated with Node Sockets who are available for WebRTC
 */

class SignalingServerRoomList {

    // signalingRoom = []               - storing the connected sockets
    // events = []                      - used for callbacks

    constructor(){

        console.log("SignalingRoomList constructor");

        this.lastConnectionsId = 0;

        this.list = [];
        this.events = [];
    }

    registerSignalingServerRoomConnection(webPeer1, webPeer2, status) {

        if (webPeer1 === null || webPeer2 === null) return null;

        let connection = this.searchSignalingServerRoomConnection(webPeer1, webPeer2);

        if (connection === null) {

            let roomConnectionObject = new SignalingServerRoomConnectionObject(webPeer1, webPeer2, status, ++this.lastConnectionsId);

            this.list.push(roomConnectionObject);
            this.list.push(roomConnectionObject);

        } else {
            //it was established before, now I only change the status
            connection.status = status;
        }

        return connection;
    }

    searchSignalingServerRoomConnection(webPeer1, webPeer2, skipReverse){

        //previous established connection
        for (let i = 0; i < this.list.length; i++)
            if ( (this.list[i].webPeer1 === webPeer1 && this.list[i].webPeer2 === webPeer2) || (this.list[i].webPeer1 === webPeer2 && this.list[i].webPeer2 === webPeer1) ){

                return this.list[i];

            }

        if (typeof skipReverse === 'undefined' || skipReverse === false)
            return this.searchSignalingServerRoomConnection(webPeer2, webPeer1, true);

        return null;
    }


    /*
        EVENTS - Callbacks
     */

    registerEvent(eventName, params, callback){

        this.events.push({
            name: eventName,
            params: params,
            callback: callback,
        })
    }

    getEvents(eventName){

        let list = [];
        for (let i=0; i<this.events.length; i++)
            if (this.events[i].name === eventName)
                list.push(this.events[i]);

        return list;
    }

}

exports.SignalingServerRoomList = new SignalingServerRoomList();
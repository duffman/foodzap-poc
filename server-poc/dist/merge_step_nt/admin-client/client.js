"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgniterCLIClient = exports.CommandHandler = exports.MessageTypes = void 0;
const db_plugin_1 = require("@root/merge_step_nt/admin-client/db-plugin");
let io = require('socket.io-client');
let url = 'http://localhost:9090';
let socket = io.connect(url, { reconnect: true });
let vorpal = require('vorpal')();
let chalk = require("chalk");
exports.MessageTypes = {
    Session: {
        initialize: "init"
    },
    User: {
        sendMessage: "showMessage"
    }
};
class CommandHandler {
    constructor() { }
    addHandler(vorpal) {
    }
}
exports.CommandHandler = CommandHandler;
class IgniterCLIClient {
    constructor() {
        this.plugins = new Array();
        this.commands = new Array();
        this.initialize();
        this.plugins.push(new db_plugin_1.DbPlugin());
    }
    initialize() {
        socket.on('disconnect', (socket) => {
            console.log(chalk.red('Disconnected'));
        });
        socket.on('connect', (socket) => {
            console.log(chalk.green('Connected'));
        });
        socket.on('message', (data) => {
            console.log("Message received", data);
        });
        vorpal.delimiter('viola$').show();
        this.initVorpal();
    }
    generateTag() {
        return "biCoreClient";
    }
    sendMessage(type, data, tag = "") {
        let dataObject = {
            "type": type,
            "data": data,
            "tag": tag,
        };
        let jsonData = JSON.stringify(dataObject);
        console.log(chalk.green("OUT >>"));
        console.log(chalk.green(jsonData));
        console.log(" ");
        socket.emit("message", jsonData);
    }
    /******************
     * SEND METHODS
     */
    buildPackage(type, data) {
    }
    sendAction(type, data = null) {
        this.sendMessage(type, data);
    }
    initGame(uuid) {
        var dataPacket = {
            "device": "iPhone6s",
            "uuid": uuid
        };
        this.sendMessage(exports.MessageTypes.Session.initialize, dataPacket, "#GENERATED_TAG#");
    }
    initVorpal() {
        var scope = this;
        for (let command in this.commands) {
        }
        for (let plug of this.plugins) {
            plug.init(vorpal);
        }
        vorpal.command('mess [str]').action((args, callback) => {
            let arg = args.str != null ? args.str : "";
            let dataPacket = {
                "rId": arg,
                "type": "text",
                "data": args
            };
            scope.sendAction(exports.MessageTypes.User.sendMessage, dataPacket);
            callback();
        });
        vorpal.command("init [str]").action(function (args, callback) {
            console.log('Arg:', args.str);
            let uuid = args.str != null ? args.str : "MrDuffman81";
            console.log("Using UUID:", args.str);
            scope.initGame(uuid);
            callback();
        });
        vorpal.command("session [str]").action(function (args, callback) {
            console.log('Arg:', args.str);
            scope.sendMessage(exports.MessageTypes.Session.initialize, null);
            callback();
        });
    }
}
exports.IgniterCLIClient = IgniterCLIClient;
let client = new IgniterCLIClient();

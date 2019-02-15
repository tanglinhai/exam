﻿const log4js = require("log4js");
log4js.configure({
    appenders: {
        file: {
            type: 'file', 
            filename: '../../../foreverExam/examLogs/log4jServer.log'
        },
        out: {
            type: 'stdout'
        }
    },
    categories: {
        default: { appenders: ['file', 'out'], level: 'info' }
    },
    replaceConsole: true
});

module.exports = {
    logger: log4js.getLogger('default'),
    getClientIp: (req) => {
        return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    },
    //解码
    html_decode: (str)=>{
        let s = "";
        if (str.length == 0) return "";
        s = str.replace(/&gt;/g, ">");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "'");
        s = s.replace(/&quot;'/g, "\"");
        return s;
    },
    //编码
    html_encode: (str)=>{
        let s = "";
        if (str.length == 0) return "";
        s = str.replace(/>/g, "&gt;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/ /g, "&nbsp;");
        s = s.replace(/'/g, "&#39;");
        s = s.replace(/"/g, "&quot;");
        return s;
    }
};

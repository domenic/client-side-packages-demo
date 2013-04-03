"use strict";

var vagueTime = require("vague-time");

module.exports = function (handlebars) {
    handlebars.registerHelper("shortHash", function (text) {
        var shortened = text.substring(0, 7);

        return handlebars.Utils.escapeExpression(shortened);
    });

    handlebars.registerHelper("branchName", function (text) {
        return text.replace(/^refs\/heads\//, "");
    });

    handlebars.registerHelper("singleLine", function (text) {
        var firstNewline = text.indexOf("\n");
        var shortened = firstNewline === -1 ? text : text.substring(0, firstNewline);

        return shortened;
    });

    handlebars.registerHelper("truncate", function (text) {
        return text.substring(0, 150);
    });

    handlebars.registerHelper("vagueTime", function (timeString) {
        return vagueTime.get({ to: Date.parse(timeString) });
    });
};

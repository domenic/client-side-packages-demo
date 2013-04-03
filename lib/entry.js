"use strict";

var _ = require("underscore");
var github = require("./github");
var templates = require("./templates");

var cutoffDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
function isRecent(event) {
    var createdAt = new Date(event.created_at);
    return createdAt > cutoffDate;
}

function haveTemplateFor(event) {
    return _.has(templates, event.type);
}

var npmRepo = { owner: { login: "isaacs" }, name: "npm" };
github.getRepoEvents(npmRepo).then(function (events) {
    events.filter(function (event) {
        return haveTemplateFor(event) && isRecent(event);
    }).sort(function (a, b) {
        return -a.created_at.localeCompare(b.created_at);
    }).forEach(function (event) {
        var result = templates[event.type](event);
        document.body.innerHTML += result;
    });
}).done();

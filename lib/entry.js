"use strict";

var _ = require("lodash");
var $ = require("jquery2");
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

function requestEventsFor(repoString) {
    var pieces = repoString.split("/");
    var owner = pieces[0];
    var repoName = pieces[1];

    github.getRepoEvents(owner, repoName).done(displayEvents, displayError);
}

function displayEvents(events) {
    var html = events.filter(function (event) {
        return haveTemplateFor(event) && isRecent(event);
    }).sort(function (a, b) {
        return -a.created_at.localeCompare(b.created_at);
    }).reduce(function (soFar, event) {
        var result = templates[event.type](event);
        return soFar + result;
    }, "");

    $("main").html(html).removeClass("error");
}

function displayError(error) {
    $("main").addClass("error").text(error.stack);
}

var $repo = $("#repo");

$repo.on("input", _.debounce(function () {
    requestEventsFor($repo.val());
}, 200));

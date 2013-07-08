"use strict";

var Q = require("q");
var $ = require("jquery-browserify");
var _ = require("underscore");

function getResponse(path, params) {
    var deferred = Q.defer();

    $.ajax("https://api.github.com/" + path, {
            dataType: "jsonp",
            data: params
        })
        .done(function (result) {
            if (result && result.meta && result.meta.status) {
                var status = result.meta.status;
                if (status >= 400) {
                    var error = new Error(result.data.message);
                    _.extend(error, result.meta);
                    deferred.reject(error);
                }
            }
            deferred.resolve(result);
        })
        .fail(function (xhr, textStatus, errorThrown) {
            var error = new Error("Ajax request to the GitHub API failed.");
            error.textStatus = textStatus;
            error.errorThrown = errorThrown;
            deferred.reject(error);
        });

    return deferred.promise;
}

exports.getRepoEvents = function (owner, repoName) {
    var uri = "repos/" + encodeURIComponent(owner) + "/" + encodeURIComponent(repoName) + "/events";
    return getResponse(uri).get("data");
};

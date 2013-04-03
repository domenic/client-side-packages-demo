"use strict";

var handlebars = require("handlebars");
var addHandlebarsHelpers = require("./addHandlebarsHelpers");

addHandlebarsHelpers(handlebars);

var templateEls = document.querySelectorAll("script[type='text/x-handlebars-template']");

Array.prototype.forEach.call(templateEls, function (el) {
    exports[el.id] = handlebars.compile(el.innerHTML);
});

'use strict';
/* global response */

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var Categories = require('*/cartridge/models/categories');
var ArrayList = require('dw/util/ArrayList');
const URLUtils = require("dw/web/URLUtils");
const ImageTransformation = require("*/cartridge/experience/utilities/ImageTransformation.js");

/**
 * Render logic for the storefront.category component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var {category,image,description,categoryLinkName,categoryLinkPosition} = context.content;

    model.categoryID = URLUtils.url("Search-Show", "cgid", category.getID()).toString();
    model.categoryDescription = description ? description : null;
    model.image = ImageTransformation.getScaledImage(image);
    model.categoryTitle = categoryLinkName;
    model.categoryPosition = categoryLinkPosition;

    var expires = new Date();
    expires.setDate(expires.getDate() + 1);
    response.setExpires(expires);

    return new Template('experience/components/commerce_assets/categoryTile').render(model).text;
};

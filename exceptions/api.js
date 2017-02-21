'use strict';
/*!
 * Author Diego Arce E.
 * @version 1.0
 * Copyright(c) 2017 ArcezD
 */

exports.methodNotAllowed = function(callback) {
    var responseCode = 405;

    var responseBody = {
        error: {
            code: responseCode,
            message: "Method not allowed"
        }
    };

    var response = {
        statusCode: responseCode,
        body: JSON.stringify(responseBody)
    };

    callback(response);
}

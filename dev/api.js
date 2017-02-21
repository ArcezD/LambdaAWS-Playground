'use strict';
/*!
 * Author Diego Arce E.
 * @version 1.0
 * Copyright(c) 2016 ArcezD
 */

const AWS = require('aws-sdk');
AWS.config.update({
    region: "us-east-1"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const Promise = require('bluebird');
const uuidV4 = require('uuid/v4');
const apiExceptions = require('../exceptions/api');

function postAction(event, context, callback) {
    return new Promise(function(resolve, reject) {
        var eventString = JSON.stringify(event);
        var contextString = JSON.stringify(context);
        console.log('Request received:\n', eventString);
        console.log('Context received:\n', contextString);

        var id = uuidV4();

        var table = 'test-db';

        var params = {
            TableName: table,
            Key: {
                'id': id
            },
            UpdateExpression: 'set event=:p1, context=:p2',
            ExpressionAttributeValues: {
                ':p1': eventString,
                ':p2': contextString
            },
            ReturnValues: 'UPDATED_NEW'
        };

        console.log('Updating the item...');

        docClient.update(params, function(err, data) {
            if (err) {
                console.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));
                resolve({
                    statusCode: 500,
                    headers: {
                        'headerName': 'headerValue'
                    },
                    body: {
                        fail: 'Failure'
                    }
                });
            } else {
                console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
                var responseBody = {
                    message: 'Hello World'
                }
                var response = {
                    statusCode: 200,
                    body: JSON.stringify(responseBody)
                };
                resolve(response);
            }
        });
    });
}

exports.myHandler = function(event, context, callback) {
    switch (event.httpMethod) {
        case 'POST':
            postAction(event, context)
                .then(function(response) {
                    context.succeed(response);
                }).catch(function(err) {

                });
            break;
        default:
            apiExceptions.methodNotAllowed(function(response) {
                context.succeed(response);
            });
    }
};

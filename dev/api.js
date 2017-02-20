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
const uuidV4 = require('uuid/v4');

exports.myHandler = function(event, context, callback) {

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
        //console.log('data: \n', data);
        if (err) {
            console.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));
            /*callback('Failure', {
                'statusCode': 500,
                'headers': {
                    'headerName': 'headerValue'
                },
                'body': { fail: 'Failure'}
            });*/
            context.succeed({
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
            context.succeed({
                statusCode: 200,
                headers: {
                    'headerName': 'headerValue'
                },
                body: {
                    fail: 'Failure'
                }
            });
        }
    });
};

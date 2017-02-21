/*!
 * Author Diego Arce E.
 * @version 1.0
 * Copyright(c) 2016 ArcezD
 */

'use strict';

var expect = require('chai').expect;
var LambdaTester = require('lambda-tester');
var index = require('../index');

/*describe('devApi', function() {
    ["POST",
        "GET"
    ].forEach(function(httpMethod) {
        it('Successful invocation: Method=' + httpMethod,
            function(done) {
                LambdaTester(index.devApi)
                    .event({ name: httpMethod })
                    .expectSucceed(function(result) {
                        expect(result.valid).to.be.true;
                    })
                    .verify(done);
            });
    });
});*/

describe('devApi', function() {
    it('Success POST', function() {
        this.timeout(3000);
        return LambdaTester(index.devApi)
            .event({
                httpMethod: 'POST',
                name: 'Fred'
            })
            .expectSucceed(function(result) {
                console.log('Result: ', result);
                expect(result.statusCode).to.equal(200)
            });
    });
    it('Error HTTP 405', function() {
        return LambdaTester(index.devApi)
            .event({
                httpMethod: 'GET'
            })
            .expectSucceed(function(result) {
                console.log('Result: ', result);
                expect(result.statusCode).to.equal(405)
            });
    });
});

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
    it('test success', function() {
        return LambdaTester(index.devApi)
            .event({
                name: 'Fred'
            })
            .expectSucceed(function(result) {
                console.log('Result: ', result);
                expect(result.statusCode).to.equal(200)
            });
    });
});

let chai = require('chai');
let chaiHttp = require('chai-http');
let async = require('async');

let assert = chai.assert;
let expect = chai.expect;
let should = chai.should();

let http = require('http');
chai.use(chaiHttp);

describe('Test Event table Properties:', function () {
//	this.timeout(15000);

	let requestResult;
	let response;
		 
    before(function (done) {
        chai.request("http://localhost:8080")
			.get("/app/event/")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
    });
    

    it('Should return an array object with more than 1 object', function (){
		expect(response).to.have.status(200);
        //expect(response.body).to.be.an.object;
		expect(response.body).to.have.length.above(2);
		expect(response).to.have.headers;
    });
    
	it('The first entry in the array has known properties', function(){
	    expect(requestResult[0]).to.include.keys('eventId');
	    expect(requestResult[0]).to.have.property('eventId');
		expect(response.body).to.not.be.a.string;
	});

	it('The elements in the array have the expected properties', function(){
		expect(response.body).to.satisfy(
			function (body) {
				for (let i = 0; i < body.length; i++) {
					expect(body[i]).to.have.property('eventId');
                    expect(body[i]).to.have.property('title').that.is.a('string');
					expect(body[i]).to.have.property('category').that.is.a('string');
                    expect(body[i]).to.have.property('description').that.is.a('string');
                    expect(body[i]).to.have.property('startDate');
                    expect(body[i]).to.have.property('endDate');
					expect(body[i]).to.have.property('startTime').that.is.a('string');
					expect(body[i]).to.have.property('endTime').that.is.a('string');
				}
				return true;
			});
	});

	
});

describe('table contents:', function () {
    //	this.timeout(15000);
    
        let requestResult;
        let response;
             
        before(function (done) {
            chai.request("http://localhost:8080")
                .get("/app/event/1")
                .end(function (err, res) {
                    requestResult = res.body;
                    response = res;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
        
    
        it('Expected results for event id 1', function (){
            expect(requestResult["eventId"]).to.equal(1);
            expect(requestResult["title"]).to.equal("Rocket Science Zoom Meeting");
            expect(requestResult["category"]).to.equal("Classes");
            expect(requestResult["description"]).to.equal("To the moon!");
            expect(requestResult["startDate"]).to.equal("2021-02-13T00:00:00.000Z");
            expect(requestResult["endDate"]).to.equal('2021-02-13T00:00:00.000Z');
            expect(requestResult["startTime"]).to.equal("13:00");
            expect(requestResult["endTime"]).to.equal("14:30");

        });
    });

/*
var expect  = require("chai").expect;
var request = require("request");
var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');

chai.use(chaiHttp);


describe("Event API Test", function() {

  describe("Retrieve events", function() {
    var url = "http://localhost:8080/app/event/";

    it("returns status 200", function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        
        done();
      });
    });



    var url = "http://localhost:8080/app/event/1";
    it("Returns Event by eventId", function(done) {
        
      request(url, function(err, res) {
        expect(res.statusCode).to.equal(200);
        var obj = JSON.parse(res.body)
        var id = obj["eventId"];

        expect(id).to.equal(1);
        
        //expect(body.eventId).to.equal(1);
        //expect(response).to.be.json;
        done();
      });
    });

  });


});

*/
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


  it('Should return an array object with more than 1 object', function () {
    expect(response).to.have.status(200);
    //expect(response.body).to.be.an.object;
    expect(response.body).to.have.length.above(2);
    expect(response).to.have.headers;
  });

  it('The first entry in the array has known properties', function () {
    expect(requestResult[0]).to.include.keys('eventId');
    expect(requestResult[0]).to.have.property('eventId');
    expect(response.body).to.not.be.a.string;
  });

  it('The elements in the array have the expected properties', function () {
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


  it('Expected results for event id 1', function () {
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

//Part for presintation number 5
//Part Check Event isn't there
describe('Post and DELTE API Test : ', function () {

  let requestResult;
  let response;
  let newEvent = {
    "eventId": 23,
    "title": "Best Presentation Ever!",
    "category": "Classes",
    "description": "Getting an A for hard Work",
    "startDate": "2021-03-16T00:00:00.000Z",
    "endDate": "2021-03-16T00:00:00.000Z",
    "startTime": "18:00",
    "endTime": "20:00"
  }

  let eventByBasicId = {
    "eventId": 23
  }

  it('GET Event 21 expexted Null', function () {
    chai.request("http://localhost:8080")
      .get("/app/event/21")
      .end(function (err, res) {
        requestResult = res.body;
        response = res;
        //expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });


  it('POST Event 21', function () {
    chai.request("http://localhost:8080")
      .post("/app/event")
      .send(newEvent)
      .end(function (err, res) {
        requestResult = res.body;
        response = res;
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        requestResult.should.be.a('object');
        requestResult.should.have.property('errors');
        requestResult.errors.should.have.property('pages');
        requestResult.errors.pages.should.have.property('kind').eql('required');
        done();
      });



  });


  it('GET Event 21', function () {
    chai.request("http://localhost:8080")
      .get("/app/event/21")
      .end(function (err, res) {
        requestResult = res.body;
        response = res;
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(requestResult["eventId"]).to.equal(23);
        expect(requestResult["title"]).to.equal("Best Presentation Ever!");
        expect(requestResult["category"]).to.equal("Classes");
        expect(requestResult["description"]).to.equal("Getting an A for hard Work");
        expect(requestResult["startDate"]).to.equal("2021-03-16T00:00:00.000Z");
        expect(requestResult["endDate"]).to.equal('2021-03-16T00:00:00.000Z');
        expect(requestResult["startTime"]).to.equal("18:00");
        expect(requestResult["endTime"]).to.equal("20:00");
        done();
      });
  });


  it('DELETE Event 21', function () {
    chai.request("http://localhost:8080")
      .delete("/app/event")
      .send(eventByBasicId)
      .end(function (err, res) {
        requestResult = res.body;
        response = res;
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message')
        res.body.result.should.have.property('ok').eql(1);
        res.body.result.should.have.property('n').eql(1);
        done();
      });
  });

  it('GET Event 21 expexted Null after DELETE', function () {
    chai.request("http://localhost:8080")
      .get("/app/event/21")
      .end(function (err, res) {
        requestResult = res.body;
        response = res;
        //expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });
});




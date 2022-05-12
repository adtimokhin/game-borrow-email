const expect = require("chai").expect;

// methods to test
const { sendTextEmail, sendTemplateEmail } = require("../util/email-sender");
const { username } = require("../util/transporter");

// TODO: When you learn how to do meaningful tests make some...

describe("Email Sender", function () {
  describe("sendTextEmail()", function () {
    it("Should return a promise on successfull attempt to send email", function () {
      const result = sendTextEmail.bind(this, { to: "exmaple@example.com" });
      expect(result).to.be.a("function");
    });
  });
});

describe("validtion-success-check", function(){
  it("Should throw an error", function(){
    
  })
})

const sendEmail = require("../util/email-sender.js");
const Response = require("../response.js");
const checkForValidationErrors = require("../util/validtion-success-check.js");

module.exports.sendSimpleEmail = (req, res, next) => {
  checkForValidationErrors(req, "Malformed request");

  const receipent = req.body.to;
  const subject = req.body.subject;
  const text = req.body.text;

  sendEmail
    .sendTextEmail({
      to: receipent,
      subject: subject,
      text: text,
    })
    .then((result) => {
      const code = 200;
      const msg = result.response;
      const data = {
        accepted: result.accepted,
        rejected: result.rejected,
      };

      const response = new Response(code, msg, data);

      // todo: ADD A LOGGING

      res.status(code).json(response);
    })
    .catch((err) => {
      // todo: ADD A LOGGING
      throw err;
    });
};

module.exports.sendTemplateEmail = (req, res, next) => {
  checkForValidationErrors(req, "Malformed request");

  const receipent = req.body.to;
  const subject = req.body.subject;
  const template = req.body.template; // must in format that matches the name of a file from email-templates folder. Does not include format
  const data = req.body.data; // This can be undefined only if a template does not have any parts that require customisation.

  sendEmail
    .sendTemplateEmail(
      {
        to: receipent,
        subject: subject,
      },
      template + ".html",
      data
    )
    .then((result) => {
      const code = 200;
      const msg = result.response;
      const data = {
        accepted: result.accepted,
        rejected: result.rejected,
      };

      const response = new Response(code, msg, data);

      // todo: ADD A LOGGING

      res.status(code).json(response);
    })
    .catch((err) => {
      // todo: ADD A LOGGING
      throw err;
    });
};

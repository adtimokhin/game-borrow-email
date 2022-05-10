const transporter = require("./transporter.js").transporter;
const username = require("./transporter.js").username;

const fs = require("fs");

/* 
Mail Oprions:
{
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body. Not a necessary field 
  }
*/
function sendTextEmail(mailOptions) {
  mailOptions.from = username;
  return transporter.sendMail(mailOptions);
}

// Use this file if there are no fields to populate in the template
function sendTemplateEmail(mailOptions, filename, data) {
  mailOptions.from = username;

  const buffer = fs.readFileSync("email-templates/" + filename);
  var htmlString = buffer.toString();

  if (data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    for (var i = 0; i < keys.length; i++) {
      const varName = keys[i];
      const replaceValue = "${" + varName + "}";
      htmlString = htmlString.replace(replaceValue, values[i]);
    }
  }
  mailOptions.html = htmlString;
  return transporter.sendMail(mailOptions);
}

module.exports.sendTemplateEmail = sendTemplateEmail;
module.exports.sendTextEmail = sendTextEmail;
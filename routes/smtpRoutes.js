const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const service = require("../service/smtpService.js");

const emailTemplates = [
  "email-verification",
  "game-added-notification",
  "game-removed-notification",
  "new-device-notice",
  "password-reset",
  "server-shutdown-notification",
];

/* 
 * Body of every request must include these fields:
 {
     to:recepientEmail,
     subject:emailSubject,
     text:emailTextMessage
 }
*/
// Method sends a simple message that contains only a text
router.get(
  "/simple",
  [
    body("to").isEmpty().withMessage("Empty receipient"),
    body("subject").isEmpty().withMessage("Empty subject"),
    body("text").isEmpty().withMessage("Empty messgae"),
  ],
  service.sendSimpleEmail
);

/* 
 * Body of every request must include these fields:
 {
     to:recepientEmail,
     subject:emailSubject,
     template:templateName, 
     data:dataToFillInTheTemplate
 }
*/
router.get(
  "/template",
  [
    body("to").isEmpty().withMessage("Empty receipient"),
    body("subject").isEmpty().withMessage("Empty subject"),
    body("template")
      .isIn(emailTemplates)
      .not()
      .withMessage(
        "Template entered does not match any of existing templates' names"
      ),
  ],
  service.sendTemplateEmail
);

module.exports = router;

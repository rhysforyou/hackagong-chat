if (process.env.MAILGUN_SMTP_SERVER) {
  // Set up our SMTP server
  var smtpAddress  = process.env.MAILGUN_SMTP_SERVER
  var smtpPort     = process.env.MAILGUN_SMTP_PORT
  var smtpUsername = process.env.MAILGUN_SMTP_LOGIN
  var smtpPassword = process.env.MAILGUN_SMTP_PASSWORD

  process.env.MAIL_URL = "smtp://" + smtpUsername + ":" + smtpPassword + "@" + smtpAddress + ":" + smtpPort
  console.log("Sending emails to " + process.env.MAIL_URL)
} else {
  console.log("Running email in development mode")
}

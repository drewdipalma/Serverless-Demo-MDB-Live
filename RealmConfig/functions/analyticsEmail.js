exports = async function(arg){
  // Mailgun set-up
  const DOMAIN = context.values.get("mailgunDomain");
  const mailgunAPIKey = context.values.get("mailgunAPIKey");
  
  const timestamp = new Date();
  const reportTiming = {
    "start": timestamp.getTime() - 608400,
    "end": timestamp.getTime()
  }
  
  // Require necessary packages 
  const axios = require('axios');
  
  const analyticsTemplate = await context.functions.execute("analyticsTemplate", reportTiming);
  
  // Send an email alert 
  const emailResult = await axios({
      method: 'post',
      url: `https://api.mailgun.net/v3/${DOMAIN}/messages`,
      auth: {
        username: 'api',
        password: mailgunAPIKey
      },
      headers: {'Content-Type':['multipart/form-data']},
      params: {
      	from: analyticsTemplate.from,
      	to: analyticsTemplate.to,
      	subject: analyticsTemplate.subject,
      	text: analyticsTemplate.content
      }
    });
    
  console.log(JSON.stringify(emailResult.data));
};
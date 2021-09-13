exports = async function(arg){
  // Mailgun set-up
  const DOMAIN = context.values.get("mailgunDomain");
  const mailgunAPIKey = context.values.get("mailgunAPIKey");
  
  // Require necessary packages 
  const axios = require('axios');
  
  const welcomeTemplate = await context.functions.execute("welcomeTemplate", context.user);

  
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
      	from: welcomeTemplate.from,
      	to: welcomeTemplate.to,
      	subject: welcomeTemplate.subject,
      	text: welcomeTemplate.content
      }
    });
    
  // Add the user record
  var collection = context.services.get("mongodb-atlas").db("userData").collection("users");
  var response = await collection.insertOne(context.user);
    
  console.log(JSON.stringify(emailResult.data));
};
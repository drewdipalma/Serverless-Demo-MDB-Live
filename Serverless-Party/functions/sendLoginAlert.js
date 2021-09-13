exports = async function(arg){
  // Twilio Set-up
  const twilioSID = context.values.get("twilioSID");
  const twilioToken = context.values.get("twilioToken");
  
  // Require necessary packages 
  const twilioClient = require('twilio')(twilioSID, twilioToken, { 
    lazyLoading: true 
  });
  
  const userFriends = context.user.custom_data.friends
  
  const loginTextTemplate = await context.functions.execute("textTemplate", userFriends);

  // Send a text message alert 
  twilioClient.messages
    .create(loginTextTemplate)
    .then(message => console.log("Message sent: " + message.sid))
    .catch(error => console.log("Error encountered: " + error));
};
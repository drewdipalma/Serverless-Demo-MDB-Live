exports = async function(arg){
  const axios = require('axios');
  
  const joke = await axios.get('https://icanhazdadjoke.com/', {headers: {'Accept': 'application/json'}})
  
  // Record request in MongoDB Atlas 
  var collection = context.services.get("mongodb-atlas").db("partyData").collection("events");
  var response = await collection.insertOne({
    requestType: "Joke API",
    time: new Date(),
    user: context.user
  });

  return {"Joke": joke.data};
};
exports = async function(arg){
  const axios = require('axios')
  const apiKey = context.values.get("newsAPIKey");
  
  console.log(apiKey)
  
  const resp = await axios.get('https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey='+apiKey)
  
  var collection = context.services.get("mongodb-atlas").db("partyData").collection("news");
  var doc = collection.insertMany(resp.data.articles);
  
  console.log(JSON.stringify(resp.data));
};
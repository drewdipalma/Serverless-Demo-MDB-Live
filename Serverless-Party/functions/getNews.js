exports = async function(arg){
  var newsColl = context.services.get("mongodb-atlas").db("partyData").collection("news");
  var doc = await newsColl.aggregate([{ "$sample": { "size": 5 } }]).toArray();
  
    // Record request in MongoDB Atlas 
  var collection = context.services.get("mongodb-atlas").db("partyData").collection("events");
  var response = await collection.insertOne({
    requestType: "News API",
    time: new Date(),
    user: context.user
  });
  
  return doc;
};
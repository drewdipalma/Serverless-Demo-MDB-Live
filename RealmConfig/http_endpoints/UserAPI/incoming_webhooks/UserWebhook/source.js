exports = async function(payload, response) {
  var eventsColl = context.services.get("mongodb-atlas").db("partyData").collection("events");
  const pipeline = [
    { "$match": { "user.id": context.user.id}},
    {"$group": {"_id": "$requestType", "count": {"$sum": 1 }}}
  ];
  var activity = await eventsColl.aggregate(pipeline).toArray();

  console.log(JSON.stringify(activity));

 return JSON.parse(JSON.stringify(activity));
};
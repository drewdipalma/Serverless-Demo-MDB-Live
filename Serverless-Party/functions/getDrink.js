exports = async function(arg){
  const axios = require('axios');
  
  // Make the AP request using Axios
  const resp = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  const cocktail = resp.data.drinks[0];
  
  console.log(JSON.stringify(cocktail));
  
  // Parse the cocktail data for the clientside
  let data = {};
  data.name = cocktail.strDrink; 
  data.instructions = cocktail.strInstructions;
  data.ingredients = []
  
  for(i = 1; i <= 15; i++){
    if(cocktail["strIngredient"+i]){
      data.ingredients.push({
        "ingredient" : cocktail["strIngredient"+i],
        "measure" : cocktail["strMeasure"+i]
      });
    } else {
      break;
    }
  }
  
  // Record request in MongoDB Atlas 
  var collection = context.services.get("mongodb-atlas").db("partyData").collection("events");
  var response = await collection.insertOne({
    requestType: "Cocktail API",
    time: new Date(),
    user: context.user
  });
  
  console.log(JSON.stringify(response));

  // Return the cocktail
  return data;
};
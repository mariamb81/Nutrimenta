console.log("API running");

let searchBtn = document.querySelector("#searchbtn");
searchBtn.addEventListener("click", e => {
    
    let foodInput = document.querySelector("#searchInput").value;
    if(foodInput.value !== null){
        foodInput.value = "";
        APICall(foodInput);
    }
});
const APICall = query => {
  const appId = `bf2d6518`;
  const appKey = `d4764589d19d9d2fb3dea377df91264d`;
  let remoteUID = "1";
  let myQuery = `https://trackapi.nutritionix.com/v2/natural/nutrients`;
  let _body = {
    query: query
  };
  fetch(myQuery, {
    method: "POST",
    body: JSON.stringify(_body),
    headers: {
      "Content-Type": "application/json",
      "x-app-id": appId,
      "x-app-key": appKey,
      "x-remote-user-id": remoteUID
    }
  })
    .then(response => {
      return response.json();
    })
    .then(myjson => {
    // console.log(`Results for ${query}:`, myjson)
    
    let foodIndex =0;
    let foodItem = myjson.foods[0];
    // console.log(foodItem)
    let foodPhoto = document.querySelector("#foodphoto");
    let foodName = document.querySelector("#foodname");
    let foodLink = document.querySelector("#foodlink");
    foodLink.href = `https://www.nutritionix.com/food/${query}`
    foodPhoto.src = foodItem.photo.thumb;

    foodName.innerHTML = ( foodItem.tags.quantity + " serving of " + foodItem.tags.item);
    parseNutritionData(foodItem);

  });
};
const parseNutritionData = (data) => {
    const recommendedAmts = {
    "total_carbohydrate": ((291+421)/2),
    "dietary_fiber": (38),
    "protein" : 38,
    "saturated_fat" : 0,
    "cholesterol" : 0,
    "sodium" : 1500,
    "sugars": 24,
    "potassium": 3500
    }
    const low = 0.05;
    const high = 0.20;
    const prefix = "nf_";
    container = document.getElementById("query-app");

    for(const amount in recommendedAmts) {
        var query = prefix + amount;
        let value = data[query];
        // console.log(value)
        if (value ===0){
            container += `<p>No ${amount}</p>`
        }
        else if (value/recommendedAmts[amount] <= low){
            container.innerHTML += `<p>Low in ${amount}</p>`
        }
        else if (value/recommendedAmts >= high){
            container.innerHTML += `<p>High in ${amount}</p>`
        }
        else {
            container.innerHTML += `<p>Moderate ${amount}</p>`
        }
    }
}


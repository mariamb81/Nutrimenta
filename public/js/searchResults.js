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
    console.log(`Results for ${query}:`, myjson)
    let foodIndex =0;
    let foodItem = myjson.foods[0];
    console.log(foodItem)
    let foodPhoto = document.querySelector("#foodphoto");
    let foodName = document.querySelector("#foodname");
    foodPhoto.src = foodItem.photo.thumb;
    foodName.innerHTML = ( foodItem.tags.quantity + " serving of " + foodItem.tags.item);
  });
};
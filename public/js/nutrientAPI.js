console.log("API running");
let foodInput = document.querySelector("#foodInput");

let Search = () => {
  let foodQuery = document.querySelector("#foodInput").value;

  foodInput.value = "";
  APICall(foodQuery);
};
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
    
  });
};
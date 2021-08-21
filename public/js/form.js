var googleUserId;
window.onload = (event) => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    document.getElementById("welcome-msg").innerHTML = `Hello, ${user.displayName}`;
      googleUserId = user;
      
    } else {
      window.location = 'index.html'; 
    };
  });
};

const handleUserInfo = () => {
    const userInput = document.getElementById("userinputform");
    console.log(userInput.value);
    firebase.database().ref(`users/${googleUserId.uid}/profile/tags`).push({
        name: userInput.value,
  })
  .then(() => {
      userInput.value = "";
  });
};


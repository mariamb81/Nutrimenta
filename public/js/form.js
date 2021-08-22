var googleUserId;
var section;
window.onload = (event) => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    document.getElementById("welcome-msg").innerHTML = `Hello, ${user.displayName}`;
      googleUserId = user;
      readfromDB(user.uid)
    } else {
      window.location = 'index.html'; 
    };
  });
};

const handleUserInfo = () => {
    const userInput = document.getElementById("userinputform");
    firebase.database().ref(`users/${googleUserId.uid}/profile/tags`).push({
        name: userInput.value,
  })
  .then(() => {
      userInput.value = "";
  });
};

const readfromDB = (userId) => {
  const tagsRef = firebase.database().ref(`users/${googleUserId.uid}/profile/tags`);
  tagsRef.on('value', (snapshot) => {
    const data = snapshot.val();
    // console.log(data)
    renderDataAsHtml(data);
  });
};

const renderDataAsHtml = (data) => {
  let badges = ``;
  for(const tagItem in data) {
    const tag = data[tagItem];
    badges += `<span class="badge">
                  <button type="button" class="btn" id=${tagItem} onclick="deleteTag(this.id);">X</button
                  >${tag.name}</span
                >`
  };
  document.querySelector('#tagsapp').innerHTML = badges;
};

const deleteTag = (tagId) => {
//    deleted
section = "tags";
    firebase
      .database()
      .ref(`users/${googleUserId.uid}/profile/${section}/${tagId}`)
      .remove();
};
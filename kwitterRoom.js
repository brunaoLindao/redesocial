const firebaseConfig = {
  apiKey: "AIzaSyA7kNLe-LH8NhcL47mLBQwDNrxm8uIQ-qo",
  authDomain: "rede-social-animal.firebaseapp.com",
  databaseURL: "https://rede-social-animal-default-rtdb.firebaseio.com",
  projectId: "rede-social-animal",
  storageBucket: "rede-social-animal.appspot.com",
  messagingSenderId: "126285213687",
  appId: "1:126285213687:web:80a49b3df3db17ee7248f2"
};
firebase.initializeApp(firebaseConfig);

userName = localStorage.getItem("userName");

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function addRoom() {
  roomName = document.getElementById("roomName").value;

  firebase.database().ref("/").child(roomName).update({
    purpose: "adicionar nome de sala"
  });

  localStorage.setItem("roomName", roomName);

  window.location = "index2.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      roomNames = childKey;
      console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id=" + roomNames + " onclick='redirectToRoomName(this.id)' >#" + roomNames + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("roomName", name);
  window.location = "index2.html";
}

function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
  window.location = "index.html";
}

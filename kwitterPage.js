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
sala = localStorage.getItem("roomName");
function send() {
  msg = document.getElementById('msg').value;
  firebase.database().ref(sala).push({
    nome: userName,
    mensagem: msg,
    like: 0
  });
  document.getElementById('msg').value = '';
}
function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
  window.location = "index.html";
}
function getData() {
  firebase.database().ref("/" + sala).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebaseMessageId = childKey;
        messageData = childData;
        console.log(firebaseMessageId);
        console.log(messageData);
        n = messageData['nome'];
        m = messageData['mensagem'];
        l = messageData['like'];
        na = "<h4>" + n + "<img class = 'user_tick' src = 'tick.png'> </h4>";
        ma = "<h4 class = 'message_h4'>" + m + "</h4>";
        la = "<button class = 'btn btn-warning' id = "+firebaseMessageId+"value = "+l+"onclick = 'aumentar(this.id)'>";
        span = "<span class='glyphicon glyphicon-thumbs-up'>Like:"+l+"</span></button><hr>";
        unir = na+ma+la+span;
        document.getElementById("output").innerHTML += unir;
       }
    });
  });
}
getData();
function aumentar(v){
console.log('button: '+v);
button_id = v;
likes = document.getElementById(button_id).value;
updatel = Number(likes)+1;
firebase.database().ref(sala).child(v).update({ like: updatel });
}
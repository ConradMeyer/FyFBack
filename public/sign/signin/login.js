const EMAIL = document.querySelector("#email");
const PASS = document.querySelector("#pass");
const BTN = document.querySelector("#signup");

BTN.addEventListener("click", () => signin());

function signin() {
    const options = { 
      method: 'POST',
      body: JSON.stringify({email: EMAIL.value, pass:PASS.value }),
      headers:{'Content-Type': 'application/json'}
    }
    if (validateEmail(EMAIL.value) && validatePass(PASS.value) ){
        fetch("/signin", options)
            .then(data => data.json())
            .then(response => {
                if (response.status === 200) {
                    alert(response.data)
                    localStorage.setItem("token", response.token)
                    window.location.href = "http://localhost:8080/"
                }
                else if (response.status === 401) {
                    alert(response.data)
                }
                else{
                    alert("No se que va mal...")
                }
            })
            .catch(err => console.log("Error con el servidor", err))
    }
    else if (!validateEmail(EMAIL.value)){
        alert ("Introduce un email válido")
    }
    else if(!validatePass(PASS.value)){
        alert ("Introduce un pass válido");
    };
}

function validateEmail(email) {
    let patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return patternEmail.test(email);  
}

function validatePass(pass) {
    let patternPass = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return patternPass.test(pass);  
}


// BOTON GOOGLE
var googleUser = {};
var startApp = function() {
  gapi.load('auth2', function(){
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    auth2 = gapi.auth2.init({
      client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      // Request scopes in addition to 'profile' and 'email'
      //scope: 'additional_scope'
    });
    attachSignin(document.getElementById('customBtn'));
  });
};

function attachSignin(element) {
  console.log(element.id);
  auth2.attachClickHandler(element, {},
      function(googleUser) {
        document.getElementById('name').innerText = "Signed in: " +
            googleUser.getBasicProfile().getName();
      }, function(error) {
        alert(JSON.stringify(error, undefined, 2));
      });
}
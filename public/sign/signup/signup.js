const EMAIL = document.querySelector("#email");
const PASS = document.querySelector("#pass");
const BTN = document.querySelector("#signup");

BTN.addEventListener("click", () => signup());

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    const options = { 
        method: 'POST',
        body: JSON.stringify({email: profile.getEmail()}),
        headers:{'Content-Type': 'application/json'}
      }
      fetch("/signup/google", options)
          .then(res => res.json())
          .then(response => {
              if (response.status === 200) {
                  alert(response.data)
                  window.location.href = "http://localhost:8080/sign/signin/"
              }
              else if (response.status === 400) {
                  alert(response.data)
                  window.location.href = "http://localhost:8080/sign/signin/"
              }
              else if (response.status === 406) {
                  alert(response.data)
              }
              else {
                  alert("Algo va mal...")
              }
          })
          .catch(err => console.log(err))
}

function signup() {
    const options = { 
      method: 'POST',
      body: JSON.stringify({email: EMAIL.value, pass:PASS.value }),
      headers:{'Content-Type': 'application/json'}
    }
    fetch("/signup", options)
        .then(res => res.json())
        .then(response => {
            if (response.status === 200) {
                alert(response.data)
                window.location.href = "http://localhost:8080/sign/signin/"
            }
            else if (response.status === 400) {
                alert(response.data)
                window.location.href = "http://localhost:8080/sign/signin/"
            }
            else if (response.status === 406) {
                alert(response.data)
            }
            else {
                alert("Algo va mal...")
            }
        })
        .catch(err => console.log(err))
}
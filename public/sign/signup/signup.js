const EMAIL = document.querySelector("#email");
const PASS = document.querySelector("#pass");
const BTN = document.querySelector("#signup");

BTN.addEventListener("click", () => signup());

function signup() {
    const options = { 
      method: 'POST',
      body: JSON.stringify({email: EMAIL.value, pass:PASS.value }),
      headers:{'Content-Type': 'application/json'}
    }
    fetch("/signup", options)
        .then(response => {
            if (response.status === 200) {
                alert("New user added, redirecting to Login")
                window.location.href = "http://localhost:8080/login"
            }
            else if (response.status === 400) {
                alert("User already exist, redirecting to Login")
                window.location.href = "http://localhost:8080/login"
            }
            else if (response.status === 406) {
                alert("Email or pass no valid")
            }
            else {
                alert("No se que va mal...")
            }
        })
        .catch(err => console.log(err))
  }
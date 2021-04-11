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
            else {
                alert("No se que va mal...")
            }
        })
        .catch(err => console.log("Error con el servidor", err))
}
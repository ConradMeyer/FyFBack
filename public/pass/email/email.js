const BTN = document.querySelector("#send");
const EMAIL = document.querySelector("#email");

BTN.addEventListener("click", () => sendEmail());

function sendEmail() {
  const options = {
    method: "POST",
    body: JSON.stringify({ email: EMAIL.value }),
    headers: { "Content-Type": "application/json" },
  };

  fetch("/users/newpass", options)
    .then((data) => data.json())
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        alert(response.data);
        window.location.href = "http://localhost:8080/";
      } else if (response.status === 404) {
        alert(response.data);
        window.location.href = "http://localhost:8080/";
      } else if (response.status === 500) {
        alert(response.data);
        window.location.href = "http://localhost:8080/";
      } else {
        alert(response.data);
        window.location.href = "http://localhost:8080/";
      }
    })
    .catch((err) => console.log("Error con el servidor", err));
}

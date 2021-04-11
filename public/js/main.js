const SIGNIN = document.querySelector("#signin");
const SIGNUP = document.querySelector("#signup");
const MENU = document.querySelector("#menu");
const KEYWORD = document.querySelector("#keyword");
const UBICACION = document.querySelector("#ubicacion");
const BUSCAR = document.querySelector("#btn");
const RESET = document.querySelector("#btnReset");
const RESULT = document.querySelector("#result");

// FUNCIONES
function search() { 
    fetch(`/search/${UBICACION.value}/${KEYWORD.value}`)
      .then(res => res.json())
      .then(res => res.map(el => pintar(el)))
      .catch(err => console.log("Algo va mal...", err))
}

async function pintar(data) {
  await document.querySelectorAll(".oferta").forEach(el => el.remove())

  let div = document.createElement("div");
  div.setAttribute("class", "oferta")

  let h2 = document.createElement("a")
  let title = document.createTextNode(data.titulo)
  h2.setAttribute("href", data.url)
  h2.appendChild(title)
  div.appendChild(h2)

  let text = document.createElement("h3")
  let resm = document.createTextNode(data.resumen)
  text.appendChild(resm)
  div.appendChild(text)

  RESULT.appendChild(div)
  
  if (sessionStorage.getItem("token")) {
    let btn = document.createElement("div")
    btn.setAttribute("class", "guardar")
    let btnC = document.createTextNode("SAVE")
    btn.appendChild(btnC)
    div.appendChild(btn)

    btn.addEventListener("click", ()=> guardarFav(data))
  }
}

function logout() {
  fetch("/logout", {
    method: 'PUT',
    headers: {
        'authorization': sessionStorage.getItem('token')
    }
  })
    .then(res => res.json())
    .then(data => alert(data.data))
    .catch(err => console.log(err))
}

async function botones () {
  await SIGNIN.remove()
  await SIGNUP.remove()

  let btnFav = document.createElement("div")
  btnFav.setAttribute("class", "favoritos")
  let contA = document.createTextNode("FAVORITOS")
  btnFav.appendChild(contA)
  MENU.appendChild(btnFav)

  let btnOut = document.createElement("div")
  btnOut.setAttribute("class", "logout")
  let contB = document.createTextNode("LOGOUT")
  btnOut.appendChild(contB)
  MENU.appendChild(btnOut)

  btnFav.addEventListener("click", ()=> verFavoritos())

  btnOut.addEventListener("click", ()=> logout())
}

async function verFav() {
  const options = { 
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'authorization': sessionStorage.getItem('token')
    }
  }

  fetch("/verfavoritos", options)
    .then(res => res.json())
    .then(res => res.map(el => pintarFav(el)))
    .catch(err => console.log("Algo va mal...", err))
}

async function pintarFav(data) {
    await document.querySelectorAll(".oferta").forEach(el => el.remove())
  
    let div = document.createElement("div");
    div.setAttribute("class", "oferta")
  
    let h2 = document.createElement("a")
    let title = document.createTextNode(data.titulo)
    h2.setAttribute("href", data.url)
    h2.appendChild(title)
    div.appendChild(h2)
  
    let text = document.createElement("h3")
    let resm = document.createTextNode(data.resumen)
    text.appendChild(resm)
    div.appendChild(text)

    let btn = document.createElement("div")
    btn.setAttribute("class", "guardar")
    let btnC = document.createTextNode("DELETE")
    btn.appendChild(btnC)
    div.appendChild(btn)

    btn.addEventListener("click", ()=> deleteFav(data))
}

function guardarFav(data) {
  const token = localStorage.getItem("token");
  const options = { 
    method: 'POST',
    body: JSON.stringify({titulo: data.titulo, resumen: data.resumen, url: data.url, token: token}),
    headers:{
      'Content-Type': 'application/json',
      'authorization': sessionStorage.getItem('token')
    }
  }

  fetch("/favorito", options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log("Algo va mal...", err))
}

function deleteFav(data) {
  const options = { 
    method: 'DELETE',
    body: JSON.stringify({url: data.url}),
    headers:{
      'Content-Type': 'application/json',
      'authorization': sessionStorage.getItem('token')
    }
  }

  fetch("/favorito", options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log("Algo va mal...", err))
}

// CAMBIAR BOTONES
if (sessionStorage.getItem('token')) {
  botones()
}

// EVENTOS
BUSCAR.addEventListener("click", () => search());

RESET.addEventListener("click", () => document.querySelectorAll(".oferta").forEach(el => el.remove()))

SIGNIN.addEventListener("click",() => {
    window.location.href = "sign/signin"
} )

SIGNUP.addEventListener("click",() => {
    window.location.href = "sign/signup"
} )


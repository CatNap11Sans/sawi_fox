function esconderTudo() {
  document.querySelectorAll(".card")
    .forEach(el => el.classList.add("hidden"));
}

function mostrarLogin() {
  esconderTudo();
  document.getElementById("login").classList.remove("hidden");
}

function mostrarRegistro() {
  esconderTudo();
  document.getElementById("registro").classList.remove("hidden");
}

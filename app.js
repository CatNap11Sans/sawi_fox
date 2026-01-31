// 🔥 CONFIG FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyAiXTSfRXzVc-SJ1jUE9YMdWeSySjRzlk4",
  authDomain: "sawi-fox-studios.firebaseapp.com",
  projectId: "sawi-fox-studios",
  storageBucket: "sawi-fox-studios.firebasestorage.app",
  messagingSenderId: "711125652228",
  appId: "1:711125652228:web:61bad28c505475a5cfb651"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ===== TROCA DE TELAS =====
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

// ===== ERROS FIREBASE =====
function tratarErroFirebase(err) {
  switch (err.code) {
    case "auth/invalid-email":
      return "Email inválido.";
    case "auth/email-already-in-use":
      return "Email já cadastrado.";
    case "auth/weak-password":
      return "Senha fraca (mín. 6 caracteres).";
    case "auth/user-not-found":
      return "Usuário não encontrado.";
    case "auth/wrong-password":
      return "Senha incorreta.";
    default:
      return "Erro inesperado. Tente novamente.";
  }
}

// ===== REGISTRAR =====
function registrar() {
  const email = document.getElementById("regEmail").value;
  const senha = document.getElementById("regSenha").value;

  auth.createUserWithEmailAndPassword(email, senha)
    .then(userCredential => {
      userCredential.user.sendEmailVerification();
      mostrarMensagem("Conta criada! Verifique seu email.", "sucesso");
      mostrarLogin();
    })
    .catch(err => mostrarMensagem(tratarErroFirebase(err), "erro"));
}

// ===== LOGIN =====
function login() {
  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;

  auth.signInWithEmailAndPassword(email, senha)
    .then(userCredential => {
      if (!userCredential.user.emailVerified) {
        mostrarMensagem("Verifique seu email antes de entrar.", "erro");
        auth.signOut();
        return;
      }
      mostrarPainel();
    })
    .catch(err => mostrarMensagem(tratarErroFirebase(err), "erro"));
}

// ===== PAINEL =====
function mostrarPainel() {
  esconderTudo();
  document.getElementById("painel").classList.remove("hidden");
}

// ===== MENSAGEM =====
function mostrarMensagem(texto, tipo = "sucesso") {
  const msg = document.getElementById("mensagem");
  msg.textContent = texto;
  msg.className = `mensagem ${tipo}`;
  msg.classList.remove("hidden");

  setTimeout(() => {
    msg.classList.add("hidden");
  }, 4000);
}

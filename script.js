document.getElementById("loginBtn").addEventListener("click", () => { 
  let user = document.getElementById("user").value; 
  let pass = document.getElementById("pass").value; 
  let error = document.getElementById("loginError"); 
  switch (user) { 
    case "admin": 
    case "Adolfo Melendez": 
    case "Diego Garcia": 
    case "Diego Ramirez": 
    case "Alexis Buen dia": 
    case "Itzel De la Cruz": 
    case "Daniela Cruz": 
      if (pass === "1234") { 
        document.getElementById("login-section").classList.add("hidden"); 
        document.getElementById("system").classList.remove("hidden"); 
      } else { 
        error.textContent = "Usuario o contraseña incorrectos"; 
      } break; 
    default: error.textContent = "Usuario o contraseña incorrectos"; break; } }); 
// CAMBIO DE PESTAÑAS 
document.querySelectorAll(".tab-btn").forEach(btn => { 
  btn.addEventListener("click", () => { 
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active")); 
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active")); 
    btn.classList.add("active"); 
    document.getElementById(btn.dataset.tab).classList.add("active"); 
  }); 

}); // CONTADOR DE CLICS
let totalClicks = 0; let counters = { "Botón Azul": 0, "Botón Verde": 0, "Botón Naranja": 0, "Botón Rosa": 0, "Botón Morado": 0 }; 
// LOG 
const logList = document.getElementById("logList"); 
// BOTONES DE ACCIÓN 
document.querySelectorAll(".action-btn").forEach(btn => { btn.addEventListener("click", () => { let name = btn.dataset.btn; counters[name]++; totalClicks++; document.getElementById("totalClicks").textContent = totalClicks; let li = document.createElement("li"); li.textContent = ${name} → clic registrado; logList.appendChild(li); updateChart(); }); }); 
// GRÁFICA 
const ctx = document.getElementById("clickChart"); let chart = new Chart(ctx, { type: "bar", data: { labels: Object.keys(counters), datasets: [{ label: "Clics por botón", data: Object.values(counters) }] } 
                                                                              }); 
function updateChart() { chart.data.datasets[0].data = Object.values(counters); chart.update(); 
                       }
***********************
 * FIREBASE CONFIG (COMPAT)
 ***********************/
let usuarioActual = "";

 const firebaseConfig = {
    apiKey: "AIzaSyBJuuAESQthZ4jZCVbHGK5q60OGcctnfO8",
    authDomain: "redes-8685d.firebaseapp.com",
    projectId: "redes-8685d",
    storageBucket: "redes-8685d.firebasestorage.app",
    messagingSenderId: "163949363062",
    appId: "1:163949363062:web:9a6ef769678626f7d18457",
    measurementId: "G-7Q9SQSMFVF"
  };

// Inicializar Firebase (FORMA CORRECTA)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/***********************
 * FUNCIÓN GUARDAR EVENTOS
 ***********************/
function guardarEvento(tipo, descripcion) {
    db.collection("eventos").add({
        usuario: usuarioActual,
        tipo: tipo,
        descripcion: descripcion,
        fecha: firebase.firestore.FieldValue.serverTimestamp()
    });
}

/***********************
 * MOSTRAR REGISTROS DESDE FIRESTORE
 ***********************/
db.collection("eventos")
  .orderBy("fecha", "desc")
  .onSnapshot(snapshot => {
      logList.innerHTML = "";
      snapshot.forEach(doc => {
          const e = doc.data();
          const li = document.createElement("li");
          li.textContent = `${e.usuario} → ${e.tipo}: ${e.descripcion}`;
          logList.appendChild(li);
      });
  });


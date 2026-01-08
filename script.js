
/***********************
 * IMPORTS FIREBASE
 ***********************/
/*import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

/***********************
 * CONFIG FIREBASE
 ***********************/
/*const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
};

/***********************
 * INIT
 ***********************/
/*const app = initializeApp(firebaseConfig);
const db = getFirestore(app); */

<script type="module">
   import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
   import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAnB_sfpz4JbO-BFrblqpAVMpY4BSAnFA0",
    authDomain: "web-app-df58b.firebaseapp.com",
    projectId: "web-app-df58b",
    storageBucket: "web-app-df58b.firebasestorage.app",
    messagingSenderId: "1035576649254",
    appId: "1:1035576649254:web:568f7970c53a409f7ea8e7",
    measurementId: "G-D3JMYZ1EJN"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getAnalytics(app);
</script>

/***********************
 * USUARIO ACTUAL
 ***********************/
let usuarioActual = "";

/***********************
 * GUARDAR EVENTO
 ***********************/
function guardarEvento(tipo, detalle) {
  addDoc(collection(db, "eventos"), {
    usuario: usuarioActual,
    tipo: tipo,
    detalle: detalle,
    fecha: serverTimestamp()
  });
}

/***********************
 * LOGIN
 ***********************/
 console.log("script.js cargado correctamente");
let usuarioActual = "";

document.getElementById("loginBtn").addEventListener("click", () => {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;
    const error = document.getElementById("loginError");

    const usuarios = [
        "admin",
        "Diego Ramirez",
        "Diego Garcia",
        "Alexis Buen dia",
        "Itzel De la Cruz",
        "Daniela Cruz"
    ];

    if (usuarios.includes(user) && pass === "1234") {
        usuarioActual = user;

      guardarEvento("login", "Inicio de sesión");
      
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("system").classList.remove("hidden");
    } else {
        error.textContent = "Usuario o contraseña incorrectos";
    }
});

/***********************
 * PESTAÑAS
 ***********************/
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));

        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
      
      guardarEvento("tab", btn.dataset.tab);

    });
});

/***********************
 * CONTADORES
 ***********************/
let totalClicks = 0;

let counters = {
    "Botón Azul": 0,
    "Botón Verde": 0,
    "Botón Naranja": 0,
    "Botón Rosa": 0,
    "Botón Morado": 0
};

const logList = document.getElementById("logList");

/***********************
 * BOTONES
 ***********************/
document.querySelectorAll(".action-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const nombre = btn.dataset.btn;

        counters[nombre]++;
        totalClicks++;

        document.getElementById("totalClicks").textContent = totalClicks;

        const li = document.createElement("li");
        li.textContent = `${usuarioActual} hizo clic en ${nombre}`;
        logList.prepend(li);

        guardarEvento("click", name);
      
        updateChart();
    });
});

/***********************
 * GRÁFICA
 ***********************/
const ctx = document.getElementById("clickChart");

const chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: Object.keys(counters),
        datasets: [{
            label: "Clics por botón",
            data: Object.values(counters)
        }]
    }
});

function updateChart() {
    chart.data.datasets[0].data = Object.values(counters);
    chart.update();
}

/***********************
 * MOSTRAR REGISTROS EN PANTALLA
 ***********************/
const logList = document.getElementById("logList");

// Obtenemos la colección y la ordenamos por fecha descendente
import { query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const q = query(collection(db, "eventos"), orderBy("fecha", "desc"));

// Escuchamos cambios en tiempo real
onSnapshot(q, (snapshot) => {
    logList.innerHTML = ""; // Limpiamos la lista
    snapshot.forEach(doc => {
        const e = doc.data();
        const li = document.createElement("li");
        li.textContent = `${e.usuario} → ${e.tipo}: ${e.detalle}`;
        logList.appendChild(li);
    });
});


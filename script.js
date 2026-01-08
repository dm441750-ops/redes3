/***********************
 * FIREBASE CONFIG (COMPAT)
 ***********************/
let usuarioActual = "";

const firebaseConfig = {
  apiKey: "AIzaSyAnB_sfpz4JbO-BFrblqpAVMpY4BSAnFA0",
  authDomain: "web-app-df58b.firebaseapp.com",
  projectId: "web-app-df58b"
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
 * LOGIN
 ***********************/
document.getElementById("loginBtn").addEventListener("click", () => {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;
    const error = document.getElementById("loginError");

    const usuariosValidos = [
        "admin",
        "Adolfo Melendez",
        "Diego Garcia",
        "Diego Ramirez",
        "Alexis Buen dia",
        "Itzel De la Cruz",
        "Daniela Cruz"
    ];

    if (usuariosValidos.includes(user) && pass === "1234") {
        usuarioActual = user;

        // Mostrar secciones
        document.getElementById("welcome").classList.remove("hidden");
        document.getElementById("buttons").classList.remove("hidden");
        document.getElementById("stats").classList.remove("hidden");

        // Texto bienvenida
        document.getElementById("welcomeText").textContent =
            `Bienvenido, ${user}`;

        try {
            guardarEvento("login", "Inicio de sesión");
        } catch (e) {
            console.warn("Firebase no disponible");
        }

        error.textContent = "";
    } else {
        error.textContent = "Usuario o contraseña incorrectos";
    }
});


/***********************
 * CAMBIO DE PESTAÑAS
 ***********************/
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {

        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));

        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");

        guardarEvento("tab", `Cambio a ${btn.dataset.tab}`);
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
 * BOTONES DE ACCIÓN
 ***********************/
document.querySelectorAll(".action-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        let name = btn.dataset.btn;

        counters[name]++;
        totalClicks++;

        document.getElementById("totalClicks").textContent = totalClicks;

        guardarEvento("click", name);

        updateChart();
    });
});

/***********************
 * GRÁFICA
 ***********************/
const ctx = document.getElementById("clickChart");

let chart = new Chart(ctx, {
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

/***********************
 * FIREBASE CONFIG
 ***********************/
let usuarioActual = "";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
};

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
                usuarioActual = user;
                guardarEvento("login", "Inicio de sesión");

                document.getElementById("login-section").classList.add("hidden");
                document.getElementById("system").classList.remove("hidden");
            } else {
                error.textContent = "Usuario o contraseña incorrectos";
            }
            break;

        default:
            error.textContent = "Usuario o contraseña incorrectos";
            break;
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
 * MOSTRAR REGISTROS BD
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


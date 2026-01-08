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

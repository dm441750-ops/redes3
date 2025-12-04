// LOGIN SIMPLE
document.getElementById("loginBtn").addEventListener("click", () => {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
    let error = document.getElementById("loginError");

    if (user === "admin" && pass === "1234") {
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("system").classList.remove("hidden");
    } 
    if (user === "Adolfo Melendez" && pass === "1234") {
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("system").classList.remove("hidden");
    } 
    if (user === "Diego Garcia" && pass === "1234") {
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("system").classList.remove("hidden");
    }
    if (user === "Diego Ramirez" && pass === "1234") {
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("system").classList.remove("hidden");
    } else {
        error.textContent = "Usuario o contraseña incorrectos";
    }
});

// CAMBIO DE PESTAÑAS
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));

        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
    });
});

// CONTADOR DE CLICS
let totalClicks = 0;
let counters = {
    "Botón Azul": 0,
    "Botón Verde": 0,
    "Botón Naranja": 0,
    "Botón Rosa": 0,
    "Botón Morado": 0
};

// LOG
const logList = document.getElementById("logList");

// BOTONES DE ACCIÓN
document.querySelectorAll(".action-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        let name = btn.dataset.btn;

        counters[name]++;
        totalClicks++;

        document.getElementById("totalClicks").textContent = totalClicks;

        let li = document.createElement("li");
        li.textContent = `${name} → clic registrado`;
        logList.appendChild(li);

        updateChart();
    });
});

// GRÁFICA
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


//quitalo si lo quieres



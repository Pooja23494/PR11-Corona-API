let allStates = [];

async function loadData() {
    try {
        const res = await fetch("https://api.rootnet.in/covid19-in/stats/latest");
        const data = await res.json();

        allStates = data.data.regional;

        const stateSelect = document.getElementById("stateSelect");
        allStates.forEach(state => {
            const option = document.createElement("option");
            option.value = state.loc;
            option.textContent = state.loc;
            stateSelect.appendChild(option);
        });
    } catch (error) {
        console.error(error.message);
    }
}

function displayStateData() {
    const selected = document.getElementById("stateSelect").value;
    const state = allStates.find(s => s.loc === selected);

    if (state) {
        document.getElementById("confirmed").innerText = state.totalConfirmed;
        document.getElementById("recovered").innerText = state.discharged;
        document.getElementById("deaths").innerText = state.deaths;
    } else {
        document.getElementById("confirmed").innerText = "--";
        document.getElementById("recovered").innerText = "--";
        document.getElementById("deaths").innerText = "--";
    }
}

loadData();
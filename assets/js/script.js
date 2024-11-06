let btnCalcular = document.querySelector("#convert-button");
let resultado = document.querySelector("#resultado");
resultado.innerHTML = `&hellip;`
var myChart = "null";

btnCalcular.addEventListener("click", () => {
    let monedaSelect = document.querySelector("#moneda-select");
    let moneda = monedaSelect.value;
    realizarConversion(moneda);
    getDataAndCreateChart(moneda);      
})

async function realizarConversion(mon) {
    try {
        let pesos = document.querySelector("#pesos").value;
        let res = await fetch("https://mindicador.cl/api");  
        let data = await res.json();
        let total = pesos / data[mon].valor;
        if (total < 1) {
            final = total.toFixed(6);
        } else {
            final = total.toFixed(2);
        };
        resultado.innerHTML = `Resultado: ${final}`;
    } catch (e) {
        alert(e.message);
    }
}

async function getDataAndCreateChart(mon) {
    try {
        let ctx = document.querySelector("#myChart");
        let lastMonth = await fetch("https://mindicador.cl/api/" + mon);
        let lastMonthJson = await lastMonth.json();
        let lastMonthSerie = lastMonthJson.serie;
        let lastTenObject = lastMonthSerie.slice(0, 10);
        let labels = lastTenObject.map((x) => x.fecha.slice(0,10));
        let data = lastTenObject.map((x) => x.valor);
        let datasets = [{
            label: "Historial últimos 10 dias",
            borderColor: "rgb(255,99,132)",
            data
        }];
        let fig = {labels, datasets}
        let config = {
            type: "line",
            data: fig
        };
      
        ctx.style.backgroundColor = "white";
        if (myChart != "null") {
            myChart.destroy();
        }
        myChart = new Chart(ctx, config); 

    } catch (e) {
        alert(e.message);
    }   
}


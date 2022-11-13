console.log("Entro al main.js");
const ENDPOINT_BASE = "https://ucamp.alumnos.dev4humans.com.mx/Main";
const tblDatos = document.getElementById("tblDatos");
const ctx = document.getElementById('myChart').getContext('2d');

function loadData() {
    console.log("entro a cargar data..");
    fetch(ENDPOINT_BASE + "/endpoint_ingresos_mensuales",
        {
            method: "GET",
            mode: "cors",
        })
        .then(response => response.json())
        .then(result => {
            //console.log(result.data.map(item => item.nombre));

            const labels_for_chart = result.data.map(item => item.nombre);
            const data_for_chart = result.data.map(item => item.monto);;

            const myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels_for_chart,
                    datasets: [{
                        label: 'Datos Anuales',
                        data: data_for_chart,
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],

                    }]
                },
                options: {
                    responsive: true,
                }
            });
            tblDatos.innerHTML = "";
            for (const registro of result.data) {
                let tr = `
            <tr>
                <td>${registro.id}</td>
                <td>${registro.nombre.toUpperCase()}</td>
                <td>${registro.monto}</td>
            </tr>`;
                tblDatos.innerHTML += tr;
            }
        })
        .catch(error => {
            console.log(error);
        });

}

loadData();




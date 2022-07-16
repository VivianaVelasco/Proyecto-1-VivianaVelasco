function cargarDatos() {
    fetch("http://localhost:5500/api/coins.json")
    .then(datos => datos.json())
    .then(coins => {
        let precio_total = coins.map(coin => coin.current_price)
        let nombres = coins.map(coin => coin.id)
        document.querySelector("#num_coins").textContent = coins.length
        document.querySelector("#cuadro2").textContent = coins.filter(coin => coin.ath_change_percentage > 0).length 
        document.querySelector("#cuadro3").textContent = coins.filter(coin => coin.ath_change_percentage < 0).length 
        document.querySelector("#cuadro4").textContent = `$ ${precio_total.reduce((acu, sum) => acu + sum).toString().substring(0,10)}`
        document.querySelector("#volumen").textContent = coins.map(coin => coin.total_volume).reduce((acu, sum) => acu + sum).toString()

        //michart1

        const data = {
            labels: nombres.slice(0,10),
            datasets: [{
              label: 'Dolares',
              data: precio_total.slice(0,10),
              backgroundColor: [
                'rgba(67, 94, 190)',
              ],
              borderColor: [
                'rgb(67, 94, 190)',
              ],
              borderWidth: 1
            }]
          };
        const config = {
            type: 'bar',
            data: data,
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            },
          };
          
          const chart1 = new Chart(
            document.getElementById('michart1'),
            config
          )

          //Chart 2
          let container_top5 = document.querySelector("#coins_top5")
          coins.slice(0,5).forEach(coin => {
            let { name, current_price } = coin
            let template = `
            <div class="row">
                <div class="col-6">
                    <div class="d-flex justify-content-between align-items-center">
                        <svg class="bi text-primary" width="32" height="32" fill="blue"
                            style="width:10px">
                        </svg>
                        <h5 class="mb-0 ms-3">${name.localeCompare("USD Coin") ? name : "USD"}</h5>
                    </div>
                </div>
                <div class="col-6">
                    <h5 class="mb-0">${current_price}</h5>
                </div>
            </div>
            `
            container_top5.innerHTML += template
          })
          container_top5.innerHTML += `<canvas id="michart2"></canvas>`
          const data2 = {
            labels: nombres.slice(0,5),
            datasets: [{
              label: 'Precio en Dolares',
              data: precio_total.slice(0,5),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          }
          const config2 = {
            type: 'line',
            data: data2,
          };

          let chart2 = new Chart(
            document.querySelector("#michart2"),
            config2
          )
          
          coins.slice(94, 99).forEach(coin => {
            let {image, current_price, id} = coin
            let template = `
            <tr>
                <td class="col-3">
                    <div class="d-flex align-items-center">
                        <div class="avatar avatar-md">
                            <img src="${image}" alt="${id}">
                        </div>
                        <p class="font-bold ms-3 mb-0 text-capitalize">${id}</p>
                    </div>
                </td>
                <td class="col-3">
                    <p class=" mb-0">$ ${current_price}</p>
                </td>
            </tr>
            `
            document.querySelector("#ultimas_cripto").innerHTML += template
          })

          coins.slice(0, 3).forEach(coin => {
            let {image, current_price, id, ath_change_percentage} = coin
            let template = `
            <div class="recent-message d-flex px-4 py-3">
                <div class="avatar avatar-lg">
                    <img src="${image}" alt="${id}">
                </div>
                <div class="name ms-4">
                    <h5 class="mb-1 text-capitalize">${id}</h5>
                    <h6 class="text-muted mb-0">$ ${current_price} | <span class="${
                        ath_change_percentage.toString().includes("-")
                          ? "color-red"
                          : "color-green"
                      }"> %${ath_change_percentage}</span> </h6>
                </div>
            </div>
            `
            document.querySelector("#container_top3_c").innerHTML += template
          })

          let values = coins.slice(0,2).map(coin => coin.current_price)
          let total = values.reduce((acu, sum) => acu + sum)
          let datasVs = values.map(value => value / total)
          const data3 = {
            labels: nombres.slice(0,2),
            datasets: [{
              label: 'My First Dataset',
              data: datasVs,
              backgroundColor: [
                'rgb(247, 202, 20)',
                'rgb(156, 153, 145)'
              ],
              hoverOffset: 4
            }]
          };

          const config3 = {
            type: 'doughnut',
            data: data3,
          };

          let chart3 = new Chart(
            document.querySelector("#michart3"),
            config3
          )


    })
    .catch(error => console.log(error))
}

document.addEventListener("DOMContentLoaded", () => {
    cargarDatos()
})

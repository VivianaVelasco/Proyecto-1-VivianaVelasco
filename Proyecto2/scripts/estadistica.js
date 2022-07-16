const estadisticasGraficos = () => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true%22")
    .then(datos => datos.json())
    .then(coins => {
        let nombres = coins.map(coin => coin.id)
        let precios = coins.map(coin => coin.current_price)

        const data = {
            labels: nombres.slice(0,15),
            datasets: [{
              axis: 'y',
              label: 'Precio en dolares',
              data: precios.slice(0,15),
              fill: false,
              backgroundColor: [
                'rgba(67, 94, 190)'
              ],
              borderColor: [
                'rgba(67, 94, 190)'
              ],
              borderWidth: 1
            }]
          };

          const config = {
            type: 'bar',
            data,
            options: {
              indexAxis: 'y',
            }
          };

          const chart1 = new Chart(
            document.getElementById('michart1'),
            config
          )
          let cantidad = coins.map(coin => coin.circulating_supply).slice(0,10)

          const data2 = {
          labels: nombres.slice(0,10),
          datasets: [{
              label: '# de Monedas en el Mercado',
              data: cantidad,
              backgroundColor: [
                  'rgba(67, 94, 190)'
              ],
              borderColor: [
                  'rgba(67, 94, 190)'
              ],
              borderWidth: 1
          }]
          };
          const config2 = {
              type: 'bar',
              data: data2,
              options: {
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              },
          };

          const chart2 = new Chart(
            document.getElementById('michart2'),
            config2
          )
          let mercado = coins.map(coin => coin.market_cap)
          const data3 = {
            labels: nombres.splice(0,15),
            datasets: [{
              label: 'Market Cap',
              data: mercado.slice(0,15),
              fill: false,
              borderColor: 'rgba(67, 94, 190)',
              tension: 0.1
            }]
          };

          const config3 = {
            type: 'line',
            data: data3,
          };

          const chart3 = new Chart(
            document.getElementById('michart3'),
            config3
          )

          let volumen = coins.map(coin => coin.total_volume).slice(0,5)
            let nombres5 = coins.map(coin => coin.id).slice(0,5)
          const data4 = {
            labels: nombres5,
            datasets: [{
              label: 'Numero de Intercambios',
              data: volumen,
              backgroundColor: [
                'rgba(67, 94, 190)',
                'rgba(71, 101, 204)',
                'rgba(86, 121, 240)',
                'rgba(72, 99, 194)',
                'rgba(45, 62, 122)'
              ],
              hoverOffset: 4
            }]
          };

          const config4 = {
            type: 'pie',
            data: data4,
          };

          const chart4 = new Chart(
            document.getElementById('michart4'),
            config4
          )

    })
    .catch(err => console.log(err))

    
}
document.addEventListener("DOMContentLoaded", () => {
    estadisticasGraficos()
})
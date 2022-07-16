const cargarTabla = () => {
    fetch("http://localhost:5500/api/coins.json")
    .then(datos => datos.json())
    .then(coins => {
        const container = document.querySelector("#content_table")
        coins.forEach((coin, index) => {
            let {current_price, id, image, price_change_24h, high_24h, ath_change_percentage, total_supply} = coin 
            let template = `
            <tr>
                <td class="text-bold-500 px-2 py-2">${index}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <div class="avatar avatar-md">
                                <img src="${image}" alt="${id}">
                            </div>
                            <p class="font-bold ms-3 mb-0 text-capitalize">${id}</p>
                        </div>
                    </td>
                    <td class="text-bold-500">$ ${current_price}</td>
                    <td>${price_change_24h}</td>
                    <td>${high_24h}</td>
                    <td class="text-muted mb-0">
                        <span class="${
                        ath_change_percentage.toString().includes("-")
                          ? "color-red"
                          : "color-green"
                      }"> % ${ath_change_percentage}</span> </td>
                    <td>${total_supply ? total_supply : "No se conoce."}</td>                           
            </tr>
            `
            container.innerHTML += template
        })
    })
    .catch(err => console.log(err))
}

document.addEventListener("DOMContentLoaded", () => {
    cargarTabla()
})


function cargarDatos() {
  fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false"
  )
    .then((data) => data.json())
    .then((info) => {
      let array = info;
      const container = document.querySelector("#monedas");
      array.forEach((elem) => {
        let { id, symbol, name, image, ath_change_percentage, current_price } =
          elem;
        let template = `
            <div id="card" class="border border-dark w-25 p-3 bg-bl d-flex flex-column justify-content-around align-items-center px-2 py-2">
                <img class="imagen" src="${image}" alt="${id}">
                <h5>${name}</h5>
                <span>$ ${current_price}</span>
                <p class="${
                  ath_change_percentage.toString().includes("-")
                    ? "color-red"
                    : "color-green"
                }">${ath_change_percentage} %</p>
                <span>${symbol}</span>
            </div>
            `;
        container.innerHTML += template;
      });
    });
}

function buscador() {
  //   let user_input = document.querySelector("user_input");
  //   console.log(user_input)
  document.addEventListener("keyup", (e) => {
    if (e.target.matches("#user_input")) {
      document.querySelectorAll("#card").forEach((elemento) => {
        elemento
          .querySelector("h5")
          .textContent.toLowerCase()
          .includes(e.target.value.toLowerCase())
          ? elemento.classList.remove("ocultar")
          : elemento.classList.add("ocultar");
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarDatos();
  buscador();
});

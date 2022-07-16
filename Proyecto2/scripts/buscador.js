function cargarDatos() {
    fetch(
      "http://localhost:5500/api/coins.json"
    )
      .then((data) => data.json())
      .then((info) => {
        let array = info;
        const container = document.querySelector("#monedas");
        array.forEach((elem) => {
          let { id, symbol, name, image, ath_change_percentage, current_price } =
            elem;
          let template = `
              <div id="card" class="col border rounded mw-100 p-3 bg-morado">
                  <div clas="d-flex flex-column px-2 py-2">
                    <img class="imagen my-2" src="${image}" alt="${id}">
                    <h5 class="text-white">${name}</h5>
                    <span class="fs-4">$ ${current_price.toString().substring(0,6)}</span>
                    <p class="${
                        ath_change_percentage.toString().includes("-")
                        ? "color-red"
                        : "color-green"
                    } rounded-pill bg-light w-76 text-center">% ${ath_change_percentage.toString().substring(0,6)} </p>
                    <span>${symbol}</span>
                  </div>
              </div>
              `;
          container.innerHTML += template;
        });
      });
  }
  
  function buscador() {
    document.addEventListener("keyup", (e) => {
      if (e.target.matches("#user_input")) {
        document.querySelectorAll("#card").forEach((card) => {
            card
            .querySelector("h5")
            .textContent.toLowerCase()
            .includes(e.target.value.toLowerCase())
            ? card.classList.remove("filtrador")
            : card.classList.add("filtrador");
        });
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    cargarDatos();
    buscador();
  });
  
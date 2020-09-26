const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.mercadolibre.com/sites/MLA/search?category=MLA1055";
const localStorage = window.localStorage;

const getData = async (api) => {
  await fetch(api)
    .then((response) => response.json())
    .then((data) => {
      const products = data.results.slice(0, 1000);
      let output = products
        .map((products) => {
          return `
        <article class="Card">
          <img src="${products.thumbnail}" />
          <h2>${products.title}<span>$${products.price}</span></h2>
        </article>
      `;
        })
        .join("");

      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

const loadData = async () => {
  await getData(API);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      loadData();
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);
localStorage.removeItem("next_fetch");
intersectionObserver.observe($observe);

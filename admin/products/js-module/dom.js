let tbody = document.querySelector(".tbody");
import { deleteProduct } from "./api.js";
let currentPage = 1;
let limit = 5;
let totalData = 0;
let totalPages = 1;
let jsBox = document.querySelector(".jsBox")
let emptyMSG = document.querySelector(".emptyMSG")
//render
export function get(products) {
  if (products.length === 0) {
    emptyMSG.style.display = "block";
    jsBox.style.display = "none";
  } else {
    jsBox.style.display = "block";
    emptyMSG.style.display = "none";
  }
  tbody.innerHTML = "";
  totalData = products.length;
  totalPages = Math.ceil(totalData / limit);
  let start = (currentPage - 1) * limit;
  let end = start + limit;
  let paginationProducts = products.slice(start, end);
  paginationProducts.forEach((product) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td class="checkbox">
                    <input type="checkbox" name="" id="">
                </td>
              <td class="productTd">
                <div class="product">
                    <img src="${product.images[0].src}" alt="" />
                    <p class="productName">${product.productName}</p>
                </div>
              </td>
              <td class="invertory">${
                product.price.count
                  ? `${product.price.count} in stock`
                  : "Out in stock"
              }</td>
              <td class="CategoryTd">${product.category}</td>
              <td class="priceTd">$${product.price.cost}</td>
              <td class="actionsTd">
                <div class="actionsDiv">
                  <i class="bi bi-pencil-fill" id="editBut"></i>
                  <i class="bi bi-trash-fill" id="deleteBut"></i>
                </div>
              </td>
        `;
    tbody.append(tr);
    let deleteBut = tr.querySelector("#deleteBut");
    deleteBut.onclick = () => deleteProduct(product.id);
    updateControl(products);
  });
}

let nextBut = document.querySelector(".nextBut");
let prevBut = document.querySelector(".prevBut");
let numbers = document.querySelector(".numbers");

export async function updateControl(products) {
  prevBut.disabled = currentPage <= 1;
  nextBut.disabled = currentPage >= totalPages;
  numbers.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    let pageBut = document.createElement("span");
    pageBut.innerHTML = i;
    pageBut.classList.add("number");
    if (i == currentPage) {
      pageBut.classList.remove("number");
      pageBut.classList.add("activePag");
    }
    pageBut.onclick = () => {
      currentPage = i;
      get(products);
    };
    numbers.append(pageBut);
  }
  prevBut.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      get(products);
    }
  };
  nextBut.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      get(products);
    }
  };
}
updateControl();

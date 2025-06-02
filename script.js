const menu = document.getElementById("menu"),
  cartBtn = document.getElementById("cart-btn"),
  cartModal = document.getElementById("cart-modal"),
  cartItemsContainer = document.getElementById("cart-items"),
  cartTotal = document.getElementById("cart-total"),
  checkoutBtn = document.getElementById("checkout-btn"),
  closeModalBtn = document.getElementById("close-modal-btn"),
  cartCounter = document.getElementById("cart-count"),
  addressInput = document.getElementById("address"),
  addressWarn = document.getElementById("address-warn");

let cart = [];

cartBtn.addEventListener("click", function () {
  updateCartModal();
  cartModal.style.display = "flex";
});

closeModalBtn.addEventListener("click", function (event) {
  cartModal.style.display = "none";
});

menu.addEventListener("click", function (event) {
  let parentButton = event.target.closest(".add-to-cart-btn");

  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));

    addToCart(name, price);
  }
});

function addToCart(name, price) {
  const gotItem = cart.find((item) => item.name === name);

  if (gotItem) {
    gotItem.qtd += 1;
    return;
  } else {
    cart.push({
      name,
      price,
      qtd: 1,
    });
  }
  updateCartModal();
}

function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add(
      "flex",
      "justify-between",
      "mb-4",
      "flex-col"
    );

    cartItemElement.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <p class="font-medium">${item.name}</p>
          <p>Qtd: ${item.qtd}</p>
          <p class"font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
        </div>

        
        <button class="remove-from-cart-btn" data-name="${item.name}">
          Remover
        </button>
        

      </div>
    `;

    total += item.price * item.qtd;

    cartItemsContainer.appendChild(cartItemElement);
  });

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  cartCounter.innerHTML = cart.length;
}

cartItemsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const name = event.target.getAttribute("data-name");
    console.log(name);
    removeItemCart(name);
  }
});

function removeItemCart(name) {
  const index = cart.findIndex((item) => item.name === name);

  if (index !== -1) {
    const item = cart[index];

    if (item.qtd > 1) {
      item.qtd -= 1;
      updateCartModal();
      return;
    }
    cart.splice(index, 1);
    updateCartModal();
  }
}

addressInput.addEventListener("input", function (event) {
  let inputValue = event.target.value;

  if (inputValue !== "") {
    addressInput, this.classList.remove("border-red-500");
    addressWarn.classList.add("hidden");
  }
});

checkoutBtn.addEventListener("click", function () {
  if (!isOpen) {
    alert("RESTAURANTE FECHADO!");
    return;
  }

  if (cart.length === 0) return;
  if (addressInput.value === "") {
    addressWarn.classList.remove("hidden");
    addressInput.classList.add("border-red-500");
    return;
  }
});

function checkBurguerOpen() {
  const data = new Date();
  const hora = data.getHours();
  return hora >= 18 && hora < 23;
}

const spanItem = document.getElementById("date-span");
const isOpen = checkBurguerOpen();

if (isOpen) {
  spanItem.classList.remove("bg-red-500");
  spanItem.classList.add("bg-green=600");
} else {
  spanItem.classList.remove("bg-green-600");
  spanItem.classList.add("bg-red-500");
}

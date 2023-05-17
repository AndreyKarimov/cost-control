const LIMIT = 20000;
const CURRENCY = "руб.";
const STATUS_IN_LIMIT = `Все хорошо`;
const STATUS_OUT_OF_LIMIT = `Все плохо`;
const costCategory = [
  "Траты на жизнь",
  "Здоровье",
  "Развитие",
  "Авто",
  "Спорт",
  "Досуг",
  "Вред (табак, алкоголь и т.д.)",
  "Гос.поборы (налоги, штрафы и т.п.",
];

const inputNode = document.querySelector(".js-input__sum");
const buttonNode = document.querySelector(".js-input__btn");
const historyNode = document.querySelector(".js-history__list");
const totalNode = document.querySelector(".js-total__value");
const statusNode = document.querySelector(".js-status__value");
const limitNode = document.querySelector(".js-limit__value");
const resetButtonNode = document.getElementById("js-reset-btn");
const categoryNode = document.getElementById("js-category");

const RED_CLASS_NAME = "red";

let costs = [];
let sum = 0;
statusNode.innerHTML = STATUS_IN_LIMIT;

init();

buttonNode.addEventListener("click", function () {
  costsAdd(costs);
  renderPage(costs);
});

resetButtonNode.addEventListener("click", function () {
  resetCosts(costs);
  renderPage(costs);
});

function init() {
  limitNode.innerHTML = `${LIMIT} ${CURRENCY}`;
  statusNode.innerText = STATUS_IN_LIMIT;
  totalNode.innerHTML = `${sum} ${CURRENCY}`;
  categoryNode.innerHTML = renderCategory();
}

function costsAdd(costs) {
  // add values in costs
  if (!inputNode.value) {
    return;
  }
  const transactionValue = parseInt(inputNode.value);
  costs.push(transactionValue);
  inputNode.value = "";
}

function resetCosts(costs) {
  // costs.splice(0, costs.length);
  costs.length = 0;
}

function getSum(costs) {
  sum = 0;
  costs.forEach((element) => {
    sum += element;
  });
  return sum;
}

function renderHistory(costs) {
  let elemListHTML = "";
  costs.forEach((element) => {
    elemListHTML += `<li class="history__item">${element} ${CURRENCY}</li> `;
  });
  return elemListHTML;
}

function renderPage(costs) {
  totalNode.innerHTML = getSum(costs);
  historyNode.innerHTML = renderHistory(costs);
  renderStatus(costs);
}

function renderStatus(costs) {
  sum = getSum(costs);
  if (sum > LIMIT) {
    statusNode.innerHTML = `${STATUS_OUT_OF_LIMIT} (${
      LIMIT - sum
    } ${CURRENCY})`;
    statusNode.classList.add(RED_CLASS_NAME);
  } else {
    statusNode.classList.remove(RED_CLASS_NAME);
    statusNode.innerHTML = STATUS_IN_LIMIT;
  }
}

function renderCategory() {
  let costCategoryList = `<option class="input__category-item--grey">- Выберите категорию</option>`;
  costCategory.forEach((elem, index) => {
    costCategoryList += `<option value="${index}">${elem}</option>`;
  });
  return costCategoryList;
}

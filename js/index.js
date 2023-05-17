const LIMIT = 20000;
const CURRENCY = "руб.";
const STATUS_IN_LIMIT = `Все хорошо`;
const STATUS_OUT_OF_LIMIT = `Все плохо`;
const FOOL_PROOF = "Заполните обязательные поля";
const costCategory = [
  "Траты на жизнь",
  "Здоровье",
  "Развитие",
  "Авто",
  "Спорт",
  "Досуг",
  "Вред (табак, алкоголь и т.д.)",
  "Гос.поборы (налоги, штрафы)",
];

const inputNode = document.querySelector(".js-input__sum");
const buttonNode = document.querySelector(".js-input__btn");
const historyNode = document.querySelector(".js-history__list");
const totalNode = document.querySelector(".js-total__value");
const statusNode = document.querySelector(".js-status__value");
const limitNode = document.querySelector(".js-limit__value");
const resetButtonNode = document.getElementById("js-reset-btn");
const categoryNode = document.getElementById("js-category");
const foolProofNode = document.getElementById("foolProof");

const RED_CLASS_NAME = "red";
const BORDER_RED = "border-red";
const FOOL_PROOF_CLASS = "input__foolProof";

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
  foolProof = 0;
  if (!inputNode.value) {
    inputNode.classList.add(BORDER_RED);
    foolProof += 1;
  } else {
    inputNode.classList.remove(BORDER_RED);
  }
  if (!costCategory.includes(categoryNode.value)) {
    categoryNode.classList.add(BORDER_RED);
    foolProof += 1;
  } else {
    categoryNode.classList.remove(BORDER_RED);
  }
  if (foolProof > 0) {
    foolProofNode.innerHTML = FOOL_PROOF;
    foolProofNode.classList.add(RED_CLASS_NAME);
    return;
  } else {
    foolProofNode.innerHTML = ``;
    foolProofNode.classList.remove(RED_CLASS_NAME);
  }
  inputNode.classList.remove(BORDER_RED);
  categoryNode.classList.remove(BORDER_RED);
  costs.push([parseInt(inputNode.value), categoryNode.value]);
  inputNode.value = "";
  categoryNode.value = 0;
}

function resetCosts(costs) {
  // costs.splice(0, costs.length);
  costs.length = 0;
}

function getSum(costs) {
  sum = 0;
  costs.forEach((element) => {
    sum += element[0];
  });
  return sum;
}

function renderHistory(costs) {
  let elemListHTML = "";
  costs.forEach((element) => {
    elemListHTML += `<li class="history__item">${element[0]} ${CURRENCY} - ${element[1]}</li> `;
  });
  return elemListHTML;
}

function renderPage(costs) {
  totalNode.innerHTML = `${getSum(costs)} ${CURRENCY}`;
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
  let costCategoryList = `<option></option>`;
  costCategory.forEach((elem, index) => {
    costCategoryList += `<option>${elem}</option>`;
  });
  return costCategoryList;
}

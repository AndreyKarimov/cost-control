const CURRENCY = 'руб.';
const STATUS_IN_LIMIT = `Все хорошо`;
const STATUS_OUT_OF_LIMIT = `Все плохо`;

const inputNode = document.querySelector('.js-input__sum');
const buttonNode = document.querySelector('.js-input__btn');
const historyNode = document.querySelector('.js-history__list')
const totalNode = document.querySelector('.js-total__value');
const statusNode = document.querySelector('.js-status__value');
const limitNode = document.querySelector('.js-limit__value');
const RED_CLASS_NAME = 'red';

const costs = [];
const limit = 20000;
let sum = 0;


init();
function init() {
    limitNode.innerHTML = `${limit} ${CURRENCY}`;
    statusNode.innerText = STATUS_IN_LIMIT;
    totalNode.innerHTML = `${sum} ${CURRENCY}`
}

costsAdd(costs);

buttonNode.addEventListener('click', function() {
    costsAdd(costs);

    // history list output + count sum 
    let elemListHTML = '';
    let sum = 0;
    
    costs.forEach(elem => {
        elemListHTML += `<li class="history__item">${elem} ${CURRENCY}</li> `;
        sum += elem;
        if (sum > limit) {
            statusNode.innerHTML = STATUS_OUT_OF_LIMIT;
            statusNode.classList.add(RED_CLASS_NAME);
        } else {
            statusNode.innerHTML = STATUS_IN_LIMIT;
            statusNode.classList.remove(RED_CLASS_NAME);
        }
    })
    
    historyNode.innerHTML = elemListHTML;
    totalNode.innerHTML = `${sum} ${CURRENCY}`;
    
})

function costsAdd(costs) { 
    // add values in costs
        if (!inputNode.value) {
            return;
        }
        const transactionValue = parseInt(inputNode.value);
        costs.push(transactionValue);
        inputNode.value = '';
}
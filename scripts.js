let billAmount = document.querySelector('#billAmount');
let reset = document.querySelector('#reset');
let zero = document.querySelector('#notZero');
let tip5 = document.querySelector('#tip5');
let tip10 = document.querySelector('#tip10');
let tip15 = document.querySelector('#tip15');
let tip25 = document.querySelector('#tip25');
let tip50 = document.querySelector('#tip50');
let custom = document.querySelector('#customTip');

let tipPerPers = document.querySelector('#tipPerPers');
let totPerPers = document.querySelector('#totPerPers');

let bill = null;
let tips = null;
let pers = null;

function resetAll() {
  bill = null; tips = null; pers = null;
  billAmount.value = null;
  document.querySelectorAll('.btn').forEach(elem => elem.classList.remove('btnActive'));
  custom.value = null;
  billPeople.value = null;
  billPeople.classList.remove('noZero');
  zero.style.display = 'none';
  tipPerPers.innerText = '0.00';
  totPerPers.innerText = '0.00';
  reset.setAttribute('disabled', '');
}

function calculateAll() {
  if(bill != null && tips != null && pers != null) {
    tipPerPers.innerText = (bill * (tips / pers)).toFixed(2);
    totPerPers.innerText = ((bill + (bill * tips)) / pers).toFixed(2);
  }
}

// --- BILL AMOUNT

billAmount.addEventListener('input', () => {
  reset.removeAttribute('disabled', '');
  if(billAmount.value.length != 0) {
    bill = Number(billAmount.value);
  }
  else {
    bill = null;
    tipPerPers.innerText = '0.00';
    totPerPers.innerText = '0.00';
  }
  calculateAll();
});

// --- TIP SELECTION

custom.addEventListener('input', () => {
  document.querySelectorAll('.btn').forEach(elem => elem.classList.remove('btnActive'));
  tips = Number(custom.value) / 100;
  calculateAll();
});

for(let tip of [tip5, tip10, tip15, tip25, tip50]) {
  tip.addEventListener('click', () => {
    reset.removeAttribute('disabled', '');
    custom.value = '';
    document.querySelectorAll('.btn').forEach(elem => elem.classList.remove('btnActive'));
    tip.classList.add('btnActive');
    switch(tip.id) {
      case 'tip5':
        tips = 0.05;
        break;
      case 'tip10':
        tips = 0.10;
        break;
      case 'tip15':
        tips = 0.15;
        break;
      case 'tip25':
        tips = 0.25;
        break;
      case 'tip50':
        tips = 0.50;
        break;
      default:
        break;
    }
    calculateAll();
  });
}

// --- NUMBER OF PEOPLE

billPeople.addEventListener('input', function(){
  reset.removeAttribute('disabled', '');
  if(billPeople.value == '0') {
    billPeople.classList.add('noZero');
    zero.style.display = 'inline';
  }
  else {
    billPeople.classList.remove('noZero');
    zero.style.display = 'none';
    pers = Number(billPeople.value);
  }
  calculateAll();
});

// --- RESET

reset.addEventListener('click', () => {
  resetAll();
});
'use strict';

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

const start = document.getElementById('start'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeValue = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('result-total')[0], 
    budgetDayValue = document.getElementsByClassName('result-total')[1], 
    expensesMonthValue = document.getElementsByClassName('result-total')[2],
    additionalIncomValue = document.getElementsByClassName('result-total')[3],
    additionalExpensesValue = document.getElementsByClassName('result-total')[4],
    incomePeriodValue = document.getElementsByClassName('result-total')[5],
    targetMonthValue = document.getElementsByClassName('result-total')[6],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('input.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('input.expenses-title'),
    additionalExpenses = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('[type="range"]');
    
 const appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {}, 
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    expensesMonth: 0, 
    addExpenses: [], 
    deposit: false, 
    percentDeposit: 0, 
    moneyDeposit: 0,  
    start: function() {

        // if(salaryAmount.value === ''){
        //     alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
        //     return;
        // }
        
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.random(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();
        periodSelect.addEventListener('input', function(){
            incomePeriodV.value = appData.calcPeriod();
        });
    },

    addExpensesBlock: function(){ //поля для плюсиков
       const cloneExpensesItem = expensesItems[0].cloneNode(true);
       expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
       expensesItems = document.querySelectorAll('.expenses-items');
       if(expensesItems.length === 3) {
           expensesPlus.style.display = 'none';
       }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !==''){
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    addIncomeBlock: function(){ 
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
     },
    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !==''){
                appData.income[itemIncome] = +cashIncome;
            }
        });
},
    getAddExpenses: function(){
        let addExpenses = additionalExpensesValue.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !==''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        additionalIncomeValue.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                appData.addIncome.push(itemValue);
            } 
        });
    },

    getExpensesMonth: function() { // Функция возвращает сумму всех обязательных расходов за месяц
        appData.expensesMonth = 0;
        for (let elem in appData.expenses) {
          appData.expensesMonth += appData.expenses[elem];
        }
    },
    getBudget: function() { // Функция возвращает Накопления за месяц (Доходы минус расходы)
        if (!appData.budget) {
            appData.budget = 0;
        }
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() { // Подсчитывает за какой период будет достигнута цель
        return targetAmount.value / appData.budgetMonth;
    },
    getStatusIncome: function() { // Статус дохода (низкий / средний / высокий)
      if (appData.budget >= 1200) {
    return('У вас высокий уровень дохода');
    } else if ( appData.budget >= 600) {
    return('У вас средний уровень дохода');
    } else if (appData.budget >= 0) {
    return('К сожалению у вас уровень дохода ниже среднего');
    } else {
    return('что-то пошло не так');
    }   
    },
    getInfoDeposit: function(){
         appData.deposit = confirm('Есть ли у вас депозит в банке?');
        if(appData.deposit){
            do {
            appData.percentDeposit = prompt('Какой годовой процент?', '10');
            } while(!isNumber(appData.percentDeposit));
            appData.precentDeposit = +prompt;
            do {
            appData.moneyDeposit = prompt('Какая сумма заложена', 10000);
        } while( !isNumber(appData.moneyDeposit));
        appData.moneyDeposit = +prompt;
        }
    },
    calcPeriod: function() {
      return  appData.budgetMonth * periodSelect.value;
    },
    changePeriodSelect: function(event) {
        document.querySelector('.period-amount').textContent = event.target.value;
        incomePeriodValue.value = appData.calcPeriod();
    },
    blockStart: () => {
        start.disabled = !salaryAmount.value.trim();
    }
};

start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriodSelect);
appData.getInfoDeposit();








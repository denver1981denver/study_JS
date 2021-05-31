'use strict';

const money = 100000,

  income = 'Фриланс',

  addExpenses = 'Интернет, Такси, Коммуналка',

  deposit = true,

  mission = 100000000,

  Period = 7,

  budgetDay = money / 30;

  
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + Period + ' месяцам');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);





"use strict";

let money = 100000;
//Доход за месяц//
let income = "20.000";
//Дополнительный доход//
let addExpenses = "Интернет:1.000, Такси:2.000, Коммуналка:10.000";
// дополнительные расходы //
let deposit = true;
//булево значение истина//
let mission = 100000000;
//хочу накопить//
let Period = 7;
//месяц//
console.log("money = Number");
console.log("income = String");
console.log("deposit = Boolean");
console.log(addExpenses.length);
console.log("Период равен " + Period + " месяцам" );
console.log("Цель заработать " +  mission + " рублей");

arrAddExpenses = addExpenses.toLowerCase().split(", ");
//приведение строки к нижнему регистру и разбиение на массив//
console.log(arrAddExpenses);

let budgetDay = money/30;
console.log(budgetDay);





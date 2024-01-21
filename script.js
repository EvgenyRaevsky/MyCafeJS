//
// При текущих данных значения которые должны получаться в таблице В СРЕДНЕМ:
//
// Кол-во людей в день = 60
//
// Стоимость кофе ~ 147.875
// Стоимость допов ~ 45.5
//
// С учетом вероятностей сколько человек (из 60) возьмут 1, 2 или 3 порции:
// 60 чел - 1 порцию + 18 человек - 2 порции + ~5 человек - 3 порции
// Кол-во порций продаваемых за день (в среднем) = 60 + 18 + 5 = 83
//
// С учетом вероятностей сколько  дополнений будет приобретено к 83 порциям ~ 16(17) (шт)
//
// В день: 83 * 147.857 + 16(17) * 45.5 ~ 13000 (руб) - прибыль за день
// В месяц: 13000 * 30 (31) = 390 000 (403 000) (руб)
// В год: 13000 * 365 = 4 745 000 (руб)
//
// Кол-во порций кофе в день (у них одинаковая вероятность выбора) 83 / 7 ~ 11-12 (шт) КАЖДОЙ позиции
// Кол-во порций кофе в месяц ~ 11-12 * 30 (31) = 330-360 (341-372) (шт) КАЖДОЙ позиции
// Кол-во порций кофе в год ~ 11-12 * 365 = 4015-4380 ~ 4198 (шт) (общее)
//
// Кол-во порций допов в день (у них одинаковая вероятность выбора) 16-17 / 10 ~ 1-2 (шт) КАЖДОЙ позиции
// Кол-во порций допов в месяц ~ 1-2 * 30 (31) = 30-31 (60-62) ~ 46 (шт) КАЖДОЙ позиции
// Кол-во порций допов в год ~ 1-2(1.66) * 365 = 365-730 ~ 548(606) (шт) (общее)
// (1.66 так как иначе получается грубое округление и следовательно неточный результат (16.6 = 83 * 0.2 - кол-во допов в день => каждый доп (их 10) 16.6/10 = 1.66)
//

const MIN_PEOPLE = 20;
const MAX_PEOPLE = 100;
const TIME_START = 8;
const TIME_END = 22;

// Добавим перерыв на обед - 45 минут + 2 выхода на перекур по 10 минут
const TIME_DINNER = 45
const TIME_SMOKE_BREAK = 20


// Класс для создания напитков Drink(название напитка, время приготовления(сек), цена)
class Drink {
    constructor(name, time, price) {
        this.name = name;
        this.time = time;
        this.price = price;
        this.quantity = 0;
    }
    qt() {
        this.quantity += 1;
    }
}

// Класс для создания напитков дополнений к напиткам Additions(название допа, время приготовления(сек), цена)
class Additions extends Drink {
    constructor(name, time, price) {
        super(name, time, price);
    }
}

// Получение рандомного числа в заданном диапозоне, потребуется для получения числа посетителей, выбранных напитков и ингридиентов
const getRandNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

// Количество заказанных напитков одним посетителем
const numberDrinks = () => {
    let getNumber = Math.random().toFixed(2);
    if (getNumber < 0.3) {
        getNumber = Math.random().toFixed(2);
        return getNumber < 0.3 ? 3 : 2;
    } else return 1
}

// Добавление дополнительного ингридинета
const additionalIngredient = () => {
    const getNumber = Math.random().toFixed(2);
    return getNumber < 0.2 ? true : false;
}

// По условию есть 7 напитков
const drinksList = [
    new Drink("Эспрессо", 90, 90),
    new Drink("Американо", 150, 120),
    new Drink("Латте", 220, 150),
    new Drink("Капуччино", 220, 150),
    new Drink("Мокка", 250, 180),
    new Drink("Раф", 260, 190),
    new Drink("Флэт Уайт", 200, 155)
];

// По условию есть 10 дополнений
const ingredientsList = [
    new Additions("Корица", 30, 55),
    new Additions("Шоколадная стружка", 30, 30),
    new Additions("Мятный сироп", 60, 50),
    new Additions("Какао порошок", 60, 30),
    new Additions("Кокосовое молоко", 90, 50),
    new Additions("Ванильный сироп", 60, 50),
    new Additions("Молоко", 75, 25),
    new Additions("Сахар", 20, 10),
    new Additions("Карамельный сироп", 60, 75),
    new Additions("Взбитые сливки", 90, 80)
];

// Выбор напитков посетителя
const choosingDrink = (num) => {
    let drinkArr = [];
    for (let i = 0; i < num; i++) {
        drinkArr.push(drinksList[getRandNumber(0, 7)]);
    }
    return drinkArr;
}

// Выбор ингридиента
const choosingIngredients = () => {
    return ingredientsList[getRandNumber(0, 10)];
}

// Хранение информации о месяцах, сколько дней в каждом из них, и info - параметр куда при необходимости запишется дополнительная информация
const months = {
    "Январь": { days: 31, info: '' },
    "Февраль": { days: 28, info: '' },
    "Март": { days: 31, info: '' },
    "Апрель": { days: 30, info: '' },
    "Май": { days: 31, info: '' },
    "Июнь": { days: 30, info: '' },
    "Июль": { days: 31, info: '' },
    "Август": { days: 31, info: '' },
    "Сентябрь": { days: 30, info: '' },
    "Октябрь": { days: 31, info: '' },
    "Ноябрь": { days: 30, info: '' },
    "Декабрь": { days: 31, info: '' }
}

// Сутки (Тут формирутеся информация за сутки, сколько посетителей пришло, какие были заказы по каждой позиции отдельно, прибыль)
const Day = () => {
    let moneyDay = 0;
    const people = getRandNumber(MIN_PEOPLE, MAX_PEOPLE);
    let time = TIME_START * 60 * 60 + (TIME_DINNER + TIME_SMOKE_BREAK) * 60;
    for (let i = 0; i < people; i++) {
        const numDrinks = numberDrinks();
        const drinks = choosingDrink(numDrinks);
        let drinksTime = 0;
        numDrinks > 1 ? drinks.forEach(el => drinksTime += el.time) : drinksTime = drinks[0].time;
        if (TIME_END * 60 * 60 > time + drinksTime) {
            for (let j = 0; j < numDrinks; j++) {
                let isIngredient = additionalIngredient();
                let ingridient;
                isIngredient ? ingridient = choosingIngredients() : ingridient = false;
                let ingridientTime = 0;
                isIngredient ? ingridientTime = ingridient.time : ingridientTime = 0;
                if (TIME_END * 60 * 60 > time + drinksTime + ingridientTime) {
                    drinks[j].qt();
                    isIngredient ? ingridient.qt() : false;
                    moneyDay += drinks[j].price;
                    isIngredient ? moneyDay += ingridient.price : moneyDay;
                    time += ingridientTime;
                } else {
                    time += ingridientTime;
                    break;
                }
            }
            time += drinksTime;
        } else {
            time += drinksTime;
            break;
        };
    }
    return {people, moneyDay};
}

// Год + Месяц (Все информация за каждый день группируется по месяцам)
let moneyDaysAll = [];
let moneyMonthsAll = [];
let peopleMonthsAll =[];
let quantityDrinksMonthsAll = [];
let quantityIngredientsMonthsAll = [];
const Year = () => {
    for (let i = 0; i < Object.keys(months).length; i++) {

        let moneyMonths = [];
        let peopleMonths = [];
        let quantityDrinksMonths = [];
        let quantityIngredientsMonths = [];

        for (let j = 0; j < 7; j++) {
            quantityDrinksMonths.push(0);
        }
        for (let j = 0; j < 10; j++) {
            quantityIngredientsMonths.push(0);
        }

        for (let j = 0; j < months[Object.keys(months)[i]].days; j++) {
            let infoDay = Day();
            peopleMonths.push(infoDay.people);
            moneyMonths.push(infoDay.moneyDay);
            drinksList.forEach((el, i) => {
                quantityDrinksMonths[i] += el.quantity
                el.quantity = 0;
            })
            ingredientsList.forEach((el, i) => {
                quantityIngredientsMonths[i] += el.quantity
                el.quantity = 0;
            })
        }

        moneyDaysAll.push(moneyMonths);
        moneyMonthsAll.push(moneyMonths.reduce((acc, cur) => acc + cur));
        peopleMonthsAll.push(peopleMonths.reduce((acc, cur) => acc + cur));
        quantityDrinksMonthsAll.push(quantityDrinksMonths)
        quantityIngredientsMonthsAll.push(quantityIngredientsMonths)
    }   
}
Year();


// Создание HTML и заполение контента полученного выше в таблицу 
const body = document.querySelector('body');
const table = document.createElement('table');

const theadTable = () => {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const thStart = document.createElement('th');
    thStart.colSpan = 2;
    tr.append(thStart);
    thead.append(tr);
    for (let el in months) {
        const th = document.createElement('th');
        const div = document.createElement('div');
        div.className = 'months';
        div.innerText = el;
        th.append(div);
        tr.append(th);
        thead.append(tr);
    }
    const thEnd = document.createElement('th');
    const div = document.createElement('div');
    div.innerText = 'Общее';
    thEnd.append(div);
    tr.append(thEnd);
    thead.append(tr);
    table.append(thead);
}
theadTable();

const tbody = document.createElement('tbody');

tbodyTable = () => {
    // count = кол-ву напитков + кол-ву ингридиентов + строке для посетителей + строке для выручки + 2 строки(название напитков и ингридиентов)
    let count = drinksList.length + ingredientsList.length + 1 + 1 + 2;
    for (let i = 0; i < count; i++) {
        const tr = document.createElement('tr');
        if (i === 0) {
            tr.className = 'people';
            const th = document.createElement('th');
            th.colSpan = 2;
            const div = document.createElement('div');
            div.innerText = 'Количество посетителей';
            th.append(div);
            tr.append(th);
            for (let i = 0; i < Object.keys(months).length + 1; i++) {
                const th = document.createElement('th');
                const td = document.createElement('td');
                const div = document.createElement('div');
                i !== Object.keys(months).length ? div.innerText = peopleMonthsAll[i] : div.innerText = peopleMonthsAll.reduce((acc, cur) => acc + cur);
                if (i === Object.keys(months).length) {
                    th.append(div);
                    tr.append(th);
                } else {
                    td.append(div);
                    tr.append(td);
                }    
            }
        }
        if (i === 1) {
            const th = document.createElement('th');
            th.rowSpan = 8;
            const div = document.createElement('div');
            div.innerText = 'Напитки';
            th.append(div);
            tr.append(th);
        }
        if (i >= 2 && i <= 8) {
            tr.className = 'drinks';
            const thStart = document.createElement('th');
            const divStart = document.createElement('div');
            divStart.innerText = drinksList[i - 2].name;
            thStart.append(divStart);
            tr.append(thStart);
            let sumMonths = 0;
            for (let j = 0; j < Object.keys(months).length; j++) {
                const td = document.createElement('td');
                const div = document.createElement('div');
                sumMonths += quantityDrinksMonthsAll[j][i - 2]
                div.innerText = quantityDrinksMonthsAll[j][i - 2];
                td.append(div);
                tr.append(td)
            } 
            const thEnd = document.createElement('th');
            const divEnd = document.createElement('div');
            divEnd.innerText = sumMonths;
            thEnd.append(divEnd);
            tr.append(thEnd);
        }
        if (i === 9) {
            const th = document.createElement('th');
            th.rowSpan = 11;
            const div = document.createElement('div');
            div.innerText = 'Дополнения';
            th.append(div);
            tr.append(th);
        }
        if (i >= 10 && i <= 19) {
            tr.className = 'ingredients';
            const thStart = document.createElement('th');
            const divStart = document.createElement('div');
            divStart.innerText = ingredientsList[i - 10].name;
            thStart.append(divStart);
            tr.append(thStart);
            let sumMonths = 0;
            for (let j = 0; j < Object.keys(months).length; j++) {
                const td = document.createElement('td');
                const div = document.createElement('div');
                sumMonths += quantityIngredientsMonthsAll[j][i - 10]
                div.innerText = quantityIngredientsMonthsAll[j][i - 10];
                td.append(div);
                tr.append(td)
            } 
            const thEnd = document.createElement('th');
            const divEnd = document.createElement('div');
            divEnd.innerText = sumMonths;
            thEnd.append(divEnd);
            tr.append(thEnd);
        }
        if (i === 20) {
            tr.className = 'money';
            const th = document.createElement('th');
            th.colSpan = 2;
            const div = document.createElement('div');
            div.innerText = 'Месячная выручка';
            th.append(div);
            tr.append(th);
            for (let i = 0; i < Object.keys(months).length + 1; i++) {
                const th = document.createElement('th');
                const td = document.createElement('td');
                const div = document.createElement('div');
                i !== Object.keys(months).length ? div.innerText = moneyMonthsAll[i] : div.innerText = moneyMonthsAll.reduce((acc, cur) => acc + cur);
                if (i === Object.keys(months).length) {
                    th.append(div);
                    tr.append(th);
                } else {
                    td.append(div);
                    tr.append(td);
                }    
            }
        }
        tbody.append(tr);
    }
}
tbodyTable();

table.append(tbody);
body.append(table);


// Создание модального окна для просмотра заработка за каждый день выбранного месяца
const modalTable = () => {
    const modal = document.createElement('div');
    const article = document.createElement('article');
    modal.className = 'modal';
    modal.style.display = 'none';

    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal__header';
    const h1 = document.createElement('h1');
    h1.innerText = '';
    const divImg = document.createElement('div');
    divImg.addEventListener('click', () => modal.style.display = 'none');
    const img = new Image;
    img.src = './close.svg';
    divImg.append(img);
    modalHeader.append(h1, divImg);

    const modalMain = document.createElement('div');
    modalMain.className = 'modal__main';

    article.append(modalHeader, modalMain);
    modal.append(article);
    table.append(modal);
}
modalTable();

const clearModal = () => {
    const date = document.querySelectorAll('.date');
    for (let el of date) {
        el.remove();
    }
}

const fillModal = (el) => {
    document.querySelector('.modal__header').firstChild.innerText = el;
    clearModal();
    let count = 0;
    for (let i = 0; i < Object.keys(months).length; i++) {
        if (Object.keys(months)[i] === el) {
            count = i;
            break;
        }
    }
    for (let i = 0; i < months[el].days; i++) {
        const div = document.createElement('div');
        div.className = 'date';
        div.innerText = i + 1;
        const p = document.createElement('p');
        p.innerText = `${moneyDaysAll[count][i]}p`;
        div.append(p);
        div.addEventListener('mouseover', () => {
            p.style.display = 'flex'
        })
        div.addEventListener('mouseout', () => {
            p.style.display = 'none'
        })
        document.querySelector('.modal__main').append(div);
    }
}

for (let el of document.querySelectorAll('.months')) {
    el.addEventListener('click', () => {
        fillModal(el.textContent);
        document.querySelector('.modal').style.display = 'flex';
    })
}
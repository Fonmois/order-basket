// Массив КАТАЛОГА товаров
let catalogArr = [
  {
    title: "iPhone 14 Pro",
    price: 110000,
    desc: "Смартфон Apple iPhone 14 Pro 128GB",
    img: 'img/1.jpg'
  },
  {
    title: "AirPods Pro",
    price: 2100,
    desc: "Наушники Apple AirPods Pro (2-го поколения, 2022)",
    img: 'img/2.jpg'
  },
  {
    title: "Чехол iPhone 14 Pro",
    price: 1200,
    desc: "Чехол для Apple iPhone 14 Pro - желтый",
    img: 'img/3.jpg'
  }
]

// Массив КОРЗИНЫ товаров
let basketArray = []

// Функция для создания элементов
let createEl = function (addElement, addClass, text) {
  let item = document.createElement(addElement)
  item.className = addClass;
  item.textContent = text
  return item
}

// Основная разметка страницы
let productBox = createEl("div", "product-box")
let basketBox = createEl("div", "basket-box")

// Заголовок
let headerTitle = createEl("h1", "header__title", "Каталог")

// Обертка - для карточек
let card = createEl("div", "card")

let cardItems = function (arr) {
  // Информация из массива каталога товаров (catalogArr)
  // Обертка карточки товара
  let cardItem = createEl("div", "card-item")
  // Название товара
  let cardTitle = createEl("h2", "card__title", arr.title)
  // Изображение товара
  let cardImg = createEl("img", "card__img")
  cardImg.src = arr.img
  // Описание товара
  let cardDesc = createEl("p", "card__desk", arr.desc)
  // Цена товара
  let cardPrice = createEl("strong", "card__price", `${arr.price} руб`)
  // Кнопка добавления в корзину
  let doneBtn = createEl("button", "card__btn", "+ В корзину")

  // Кнопка выполненения задачи
  doneBtn.onclick = function () {

    basketArray.push(arr)
    renderBuyList(basketArray) // Перерисовка списка корзины
  }

  cardItem.append(cardImg, cardTitle, cardDesc, cardPrice, doneBtn)
  card.append(cardItem)
}

// Вывод карточек товара
cardItems(catalogArr[0])
cardItems(catalogArr[1])
cardItems(catalogArr[2])

// Функция, возвращающая элемент выполненной задачи
function getBuyListItem(index, arr) {

  // Тело(grid) для item элемента
  let buyItem = createEl("li", "list__item")

  // Название товара
  let itemTitle = createEl("h2", "item__title", arr.title)

  // Изображение товара
  let itemImg = createEl("img", "item__img")
  itemImg.src = arr.img

  // Цена товара
  let itemPrice = createEl("strong", "item__price", `${arr.price} руб`)

  // Кнопка удаления задачи
  let removeBtn = createEl("button", "delete__btn", "Удалить")

  buyItem.append(itemImg, itemTitle, itemPrice, removeBtn)

  // Удаление из корзины
  removeBtn.onclick = function () {
    basketArray.splice(index, 1)
    renderBuyList(basketArray) // Перерисовка списка корзины
  }

  return buyItem
}

// Кнопка корзина
let showListBtn = createEl("div", "open__basket")

// Корзина (лист): Два класса
let buyList = createEl("ul", "buy-list hide")

// Кнопка - показать и скрыть корзину
showListBtn.onclick = function () {
  if (buyList.classList.contains("hide") === true) {
    // Показать список   
    showListBtn.classList.remove("open__basket")
    showListBtn.classList.add("close__basket")
    buyList.classList.remove("hide")
  } else {
    // Скрыть список
    showListBtn.classList.remove("close__basket")
    showListBtn.classList.add("open__basket")
    buyList.classList.add("hide")
  }
}

// Функция отрисовки списка покупок
function renderBuyList(arr) {
  // Отчистка поля
  buyList.innerHTML = ""

  // Переменная - общая сумма
  let sum = 0

  // Рендер отрисовки списка
  for (let i = 0; i < arr.length; i++) {
    let buyItem = getBuyListItem(i, arr[i])
    buyList.append(buyItem)

    // Расчет общей суммы
    sum = sum + arr[i].price
  }

  // Li - обертка для кнопки
  let buyItem = createEl("li", "buy__item-btn")

  // Кнопка покупки и вывод общей суммы
  let buyBtn = createEl("button", "buy__btn", `Заказать на сумму ${sum} руб`)

  // Событие кнопки покупки
  buyBtn.onclick = function () {
    alert("Раздел в разработке")
  }

  buyItem.append(buyBtn)
  buyList.append(buyItem)
}

renderBuyList(basketArray) // Отрисовка списка при запуске

basketBox.append(showListBtn)
card.append(buyList)
productBox.append(headerTitle, card)
document.body.append(productBox, basketBox)
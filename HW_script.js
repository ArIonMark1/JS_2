

//     • https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses – адрес API;
//     • /catalogData.json – получить список товаров;

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const makeGETRequest = (url) => {
    return new Promise( (resolve) => {
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        };
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) resolve(xhr.responseText);
        };
        xhr.open('GET', url, true);
        xhr.send();
    });
     
}

// =========================================

class GoodsItem {
    constructor(img,  product_name, id_product, price){
        this.img = img;
        this.product_name = product_name;
        this.id_product = id_product;
        this.price = price;
    }
    render() {
        return `
        <div class="goods-item">
            <img src="${this.img}" alt="picture">
            <h3>${this.product_name}</h3>
            <p>id_product: ${this.id_product}</p>
            <p>${this.price}$</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <button class="buy-button" type="button" data-id="${this.id_product}">Добавить</button>
        </div>`; 
    }
}
// ===================================

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods(cb) {   // теперь млять ассссинхронная херота надо вызывать по выёбному

        makeGETRequest(`${API_URL}/catalogData.json`)
        .then((goods)=>{ this.goods = JSON.parse(goods); cb()});
        // cb()
        // makeGETRequest(`${API_URL}/catalogData.json`, (goods) =>{
        //     this.goods = JSON.parse(goods);
        //     cb();
        // })
        // this.goods = [
        //     {img:'picture.png', product_name: 'Skirt', price: 150 },
        //     {img:'picture.png', product_name: 'Socks', price: 50 },
        //     {img:'picture.png', product_name: 'Jaket', price: 350 },
        //     {img:'picture.png', product_name: 'Shoes', price: 250 },
        // ];
    }
    render() {
        // метод – вывод списка товаров. Создадим для этого действия метод render(). 
        // Для каждого элемента массива goods будем создавать экземпляр класса GoodsItem и запрашивать его разметку.
        let listHtml = '';
        this.goods.forEach( (good) => { const goodItem = new GoodsItem(good.img = 'https://pbs.twimg.com/profile_images/1165552547844829184/pQa03tdY.jpg', good.product_name, good.id_product, good.price); 
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    totalPrice() {
        // DZ!!! цена всех товаров в магазине
        let fieldPrice = 0;
        this.goods.forEach( (cost) => { fieldPrice += cost.price});

        document.querySelector('.total-price').innerHTML = `Total prise: ${fieldPrice}`;
    }
    getTotalSum() {
        // пздц странная штука, при вызове после totalPrice() выводит Undefined
        const totalSum = this.goods.reduce( (acc, item) => acc + item.price, 0);
        console.log(totalSum)
    }
}

// Теперь, чтобы вывести список, нужно создать экземпляр класса GoodsList, 
// вызвать для него метод fetchGoods, чтобы записать список товаров в свойство goods, и вызвать render().
const list = new GoodsList();
list.fetchGoods( ()=>{list.render(); list.getTotalSum(); list.totalPrice();} );


// ========================================================================
// Dz!!!
// добавить класс для корзины с параметрами можно использовать наследование
// ========================================================================
// DZ 3!!!
    // добавить методы для корзины
    // добавления товара 
    // удаления товара
    // получения списка товаров корзины

class BasketRender extends GoodsItem{
    constructor(...args){
        super(...args);
        this.count = 0;
    }
    render() {
        return `
        <div class="basket-list">
            <img src="${this.img}" alt="picture">
            <h3>${this.product_name}</h3>
            <p>id_product: ${this.count}</p>
            <p>${this.price}$</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <button class="buy-button" type="button" data-id="${this.id_product}">Добавить</button>
        </div>`;
    }
}


class BasketList extends GoodsList {
    constructor(...args){
        super(...args);
        // this.priceForAll = price;
        this.basketGoods = []
    }
    addOne({target}) {
        const { product ={} } = target.dataset;
        this.goods.push(JSON.parse(product));
        this.render();
    }
    deleteAll(){ }
    // добавление и уменшение кол-ва товара с помощью кнопок...
 
}

const basket = new BasketList();
const basketList = new BasketList();
// basket.addOne;


// ==========================================================

let basketGoods = []
document.onclick = (event) => {
    if (event.target.classList.contains('buy-button')){
        plusFunction(event.target.dataset.id)
    } };

const plusFunction = (id) => {basketGoods[id]++; render();}

const render = () => {console.log(basketGoods)}
// const list = new GoodsList();
// list.fetchGoods( ()=>{list.render(); list.getTotalSum(); list.totalPrice();} );



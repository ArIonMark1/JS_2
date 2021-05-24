

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
        let data = {
            "img": this.img,
            "product_name": this.product_name,
            "id_product": this.id_product,
            "price": this.price,
        };

        data = JSON.stringify(data);

        return `
        <div class="goods-item">
            <img src="${this.img}" alt="picture">
            <h3>${this.product_name}</h3>
            <p>id_product: ${this.id_product}</p>
            <p>${this.price}$</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <button class="buy-button" type="button" data-id="${this.id_product}" id="add-btn-${this.id_product}">Добавить</button>
        </div>`; 
    }
}
// ===================================

class GoodsList {
    constructor() {
        this.goods = [];
        this.filteredGoods = [];
    }
    fetchGoods(cb) {  

        makeGETRequest(`${API_URL}/catalogData.json`)
        .then((goods)=>{ this.goods = JSON.parse(goods); cb()});
    }

    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        this.render();
    }

    render() {
        // метод – вывод списка товаров. Создадим для этого действия метод render(). 
        // Для каждого элемента массива goods будем создавать экземпляр класса GoodsItem и запрашивать его разметку.
        let listHtml = '';
        this.filteredGoods.forEach( (good) => { 
            const goodItem = new GoodsItem(good.img = 'https://pbs.twimg.com/profile_images/1165552547844829184/pQa03tdY.jpg', good.product_name, good.id_product, good.price); 
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
        this._basket.setAddListeners(this.filteredGoods);
    }

    totalPrice() {
        // DZ!!! цена всех товаров в магазине
        let fieldPrice = this.goods.forEach( (cost) => { fieldPrice += cost.price});

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

// ========================================================================
// Dz!!!
// добавить класс для корзины с параметрами можно использовать наследование
// ========================================================================
// DZ 3!!!
    // добавить методы для корзины
    // добавления товара 
    // удаления товара
    // получения списка товаров корзины

// ==========================================================

class Basket {
    constructor() {
        this.goods = []
    }
    clearAll(){
        this.goods = []

    }
    addItem(event) {
        const {target} = event;
        const { product = {} } = target.dataset;
        this.goods.push(JSON.parse(product));
        this.render();
    }
    removeItem({ target }) {
        const { id } = target.dataset;
        this.goods = this.goods.filter( (item) => String(item.id_product) !== String(id) );
        this.render();
    }

    setAddListeners(list) {
        list.forEach( (item) => {
            document.getElementById(`add-btn-${item.id_product}`).addEventListener('click', (e) => this.addItem(e));
        })
    }

    setDeleteListeners() {
        this.goods.forEach( (item) => {
            document.getElementById(`${item.id_product}`).addEventListener('click', (e) => this.removeItem(e));
        })
    }

    render() {
        let listHtml = '';
        this.goods.forEach( good => {
            const goodItem = new BasketItem(good.product_name, good.price, good.id_product);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
        this.setDeleteListeners();
    }
}
class BasketItem extends GoodsItem {
    constructor(...args) {
        super(...args);
        this.count = 0;
    }

    addOne() {}

    removeOne() {}

    render() {
        return `
        <div class="basket-list">
            <img src="${this.img}" alt="picture">
            <h3>${this.product_name}</h3>
            <p>${this.price}$</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <button class="buy-button" type="button" data-id="${this.id_product}" id="delete-btn-${this.id_product}">Удалить</button>
        </div>`;
    }
}

// const list = new GoodsList();
// list.fetchGoods( () => {list.render});

const list = new GoodsList();

// list.fetchGoods( ()=>{list.render(); list.getTotalSum(); list.totalPrice();} );

const process = new Promise( (ok, err) => {
    list.fetchGoods( ()=>{
        list.render(); list.getTotalSum(); list.totalPrice(); ok();
    })
})

process.then( () => {
    const searchButton = document.querySelector('.search-button')
const searchInput = document.querySelector('.goods-search')
searchButton.addEventListener('click', (e) => {
    const value = searchInput.value;
    list.filterGoods(value);
});
searchInput.addEventListener('keydown', (e) => {
    const value = searchInput.value;
    list.filterGoods(value);
});
} )

// const searchButton = document.querySelector('.search-button')
// const searchInput = document.querySelector('.goods-search')
// searchButton.addEventListener('click', (e) => {
//     const value = searchInput.value;
//     list.filterGoods(value);
// });
// searchInput.addEventListener('keydown', (e) => {
//     const value = searchInput.value;
//     list.filterGoods(value);
// });


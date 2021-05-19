// ==============================

class GoodsItem {
    constructor(img, title, price){
        this.img = img;
        this.title = title;
        this.price = price;
    }
    render() {
        return `
        <div class="goods-item">
            <img src="F:/GeekBrains/JS_2/lesson_2/lesson2/img/${this.img}" alt="picture">
            <h3>${this.title}</h3>
            <p>${this.price}$</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <button class="buy-button" type="button">Добавить</button>
        </div>`; 
    }
}
// ===================================

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            {img:'picture.png', title: 'Skirt', price: 150 },
            {img:'picture.png', title: 'Socks', price: 50 },
            {img:'picture.png', title: 'Jaket', price: 350 },
            {img:'picture.png', title: 'Shoes', price: 250 },
        ];
    }
    render() {
        // метод – вывод списка товаров. Создадим для этого действия метод render(). 
        // Для каждого элемента массива goods будем создавать экземпляр класса GoodsItem и запрашивать его разметку.
        let listHtml = '';
        this.goods.forEach( (good) => { const goodItem = new GoodsItem(good.img, good.title, good.price); 
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
}

// Теперь, чтобы вывести список, нужно создать экземпляр класса GoodsList, 
// вызвать для него метод fetchGoods, чтобы записать список товаров в свойство goods, и вызвать render().
const list = new GoodsList();
list.fetchGoods();
list.render();
list.totalPrice();

// ========================================================================
// Dz!!!
// добавить класс для корзины с параметрами можно использовать наследование

class BasketRender extends GoodsItem{
    constructor(img, title, price){
        super(img, title, price);
    }
    
}


class BasketList extends GoodsList {
    constructor(...args){
        super(...args);
        // this.priceForAll = price;
    }
    deleteAll(){ }
    // добавление и уменшение кол-ва товара с помощью кнопок...
 
}

const basket = new BasketList();




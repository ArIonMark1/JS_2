class MenuItem {
    constructor(name, color){
        this.name = name;
        this.color = color;
    }

    makeRed() {
        this.color = 'red';
    }
}

class UltraMenuItem extends MenuItem {
    constructor(name, color){
        super(name, color);
        // либо
        // constructor(...args){
        // super(...args)}
    }
    makeBlue() {
        this.color = 'blue';
    }
}

const menuItem = new MenuItem('bar', 'green');
const ultraMenu = new UltraMenuItem('bar2', 'yellow');

console.log(menuItem.color);
menuItem.makeRed();
console.log(menuItem.color);

console.log(ultraMenu.color);
ultraMenu.makeBlue();
console.log(ultraMenu.color);
ultraMenu.makeRed();
console.log(ultraMenu.color);

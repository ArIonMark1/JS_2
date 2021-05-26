const str1 = '123 abc 456'; 
const regexp1 = /abc/;

console.log(regexp1.test(str1));


// 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
// 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.


const str = "Lorem adip'sicing elit. Architecto aperiam laborum al'quam et, 'Soluta' ab ex. Animi deserunt, harum 'nam' sit odit excepturi, possimus nulla."
console.log(str);
// найти слово где первый и последний эллемент это " ' "
const reg = /'(.\S*?)'/gi; // выводит слово в кавычках но вместе с кавычками

// найти в тексте скобки которые стоят в начале и конце слова
const reg2 = /\B'|'\B/g; // выводит кавычки в начале и в конце строки

reg.test(str);

console.log(str.match(reg)); // выводит соответствия

console.log(str.replace(reg2, '"')); // заменяет кавычки на заданые
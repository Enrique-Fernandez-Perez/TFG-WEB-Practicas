export function whatIsMyType<T>(argument : T) : T{
    return argument;
}

let iAmString = whatIsMyType<string>('Hola mundo');
let iAmNumber = whatIsMyType<number>(100);
let iAmArray = whatIsMyType<Array<number>>([1,2,3,4,5,6]);

console.log(iAmString.split(' '));
console.log(iAmNumber.toFixed());
console.log(iAmArray.join('-'));
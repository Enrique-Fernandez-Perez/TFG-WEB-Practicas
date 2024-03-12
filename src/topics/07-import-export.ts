import {Product, taxCalculation} from './06-function-destructure'

const shoppingCart : Product[]=[
    {
        name: 'iphone 10',
        description: 'undefined',
        price: 2500
    },
    {
        name: 'tablet 7¨',
        description: 'undefined',
        price: 120
    }];
    
const [total,totalTax] = taxCalculation({taxCalc:0.21,products:shoppingCart});

console.log('Total: ',total);
console.log('Total tax: ', totalTax);

export {}
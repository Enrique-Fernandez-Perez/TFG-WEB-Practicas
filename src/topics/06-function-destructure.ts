interface Product{
    name: String;
    description: String;
    price:number;
}

const phone : Product = {
    name: 'iphone 10',
    description: 'undefined',
    price: 2500
}

const tablet : Product = {
    name: 'tablet 7¨',
    description: 'undefined',
    price: 120
}

const shoppingCart : Array<Product> = [phone,tablet];
const tax : number = 0.15;

interface taxCalculationOption{
    taxCalc:number;
    products : Product[];
}

// function taxCalculation( optionCalc : taxCalculationOption) : [number,number]{
// function taxCalculation( {tax,products} : taxCalculationOption) : [number,number]{
function taxCalculation(  optionCalc : taxCalculationOption) : [number,number]{
    let total : number =0;
    
    const {taxCalc,products} = optionCalc;

    products.forEach(({price}) => {
        total += price;
    });

    return [total, total*taxCalc];
}

// const result  = taxCalculation({tax,products:shoppingCart});
const [total,totalTax] = taxCalculation({taxCalc:tax,products:shoppingCart});

// console.log('Total: ',total);
// console.log('Total tax: ', totalTax);

// export {Product, taxCalculation}
export { taxCalculation };
export type { Product };
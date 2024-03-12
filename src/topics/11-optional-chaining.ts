export interface Passenger{
    name:string;
    children ?: string[];
}

const passenger1  : Passenger = {name:'Fernando', children:['Natalia', 'Elisabeth'] }

const passenger2  : Passenger = {name:'Melisa' }

const printChildren = (passenger : Passenger) : number => {
    const howManyChildren : number= passenger.children?.length || 0;
    // const howManyChildren : number = passenger.children!.length;
    console.log(passenger.name, ' tiene ' , howManyChildren, ' hij@s');
    return howManyChildren;
};

printChildren(passenger1);
printChildren(passenger2);

// console.log(passenger1);
// console.log(passenger2);
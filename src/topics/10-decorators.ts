function classDecorator<T extends {new(...args:any[]):{}}>(
    constructor : T){
    return class extends constructor{
        newProperty = "New Property";
        hello= "override";
    }
}

@classDecorator
export class SuperClass{
    public myPropert : string = 'Abc123';
    print(){
        console.log('first');
    }
}

console.log(SuperClass);

let myClass = new SuperClass();
console.log(myClass);

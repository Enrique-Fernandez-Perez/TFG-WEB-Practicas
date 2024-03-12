// import { Person } from './08-classes';

export class Person{
    private address : String;
    public name : String;
    public lastName : string;

    constructor(name:String, lastName : string,  address : String = 'New York'){
        this.name = name;
        this.lastName = lastName;
        this.address = address;
    }

    // constructor(public name:String, private address : String = 'New York'){}
}

/* export class Hero extends Person{
    
    // public alterEgo : String;
    // public age : number;
    // public realName : string;

    // constructor(name:String, address ?: String ){
    //     super(name,address);
    // }

    constructor(
        public alterEgo : String,
        public age : number,
        public realName : string, 
    ){
        super(realName);
    }
} */

export class Hero{
        
    constructor(
        public alterEgo : String,
        public age : number,
        public person: Person
    ){ }
}

const tony = new Person('Tony', 'Stark');
const ironman = new Hero('Iron Man', 45, tony);
// const ironman = new Hero('Iron Man', 45, 'Tony', 'Fernanda', 'New York');
// const ironman = new Hero('Fernanda', 'New York', 'Iron Man', 45, 'Tony');

console.log(ironman);
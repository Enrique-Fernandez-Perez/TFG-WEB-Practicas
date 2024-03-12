interface AudioPlayer{
    audioVolume: number;
    songDuration:Number;
    song:String;
    details: Details;
}

interface Details{
    author:String;
    year:number;
}

const audioPlayer :  AudioPlayer = {
    audioVolume: 0,
    songDuration: 10,
    song: 'Blanco',
    details: {
        author: 'Pepe',
        year: 0
    }
}

// const {song} = audioPlayer;
// // const {details} = audioPlayer;
// // const {author} = details;
// const {details:{author}} = audioPlayer;

// console.log(song);
// console.log(audioPlayer);
// console.log(author);


// const dbz : Array<String> = ['Vegeta','Goku'];
const [p1='Not found',p2='Not found',p3='Not found'] : String[] = ['Vegeta','Goku'];

console.log(p3);


export {}
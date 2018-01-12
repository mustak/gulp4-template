//import * as $ from 'jquery';
// import whatInput from 'what-input';

//(<any>window).$ = $;

// import Foundation from 'foundation-sites';
// // If you want to pick and choose which modules to include, comment out the above and uncomment
// // the line below
// //import './lib/foundation-explicit-pieces';


// $(document).foundation();
function log(tx: any): void{
    console.warn(tx);
}

let x: [string | number];

x = ['xxx', 12, 're', 'reg'];
x[4] = null;
x.forEach((val, index, arr) => {
    log(val);
})
import { Observable, of, from, fromEvent, concat } from 'rxjs';
import { allBooks, allReaders } from './data';

// let allBooksObservable$ = new Observable(subscriber =>{

//     if(document.title !== 'RxBookTracker') {
//         subscriber.error('Incorrect page title');
//     }
//     for (let book of allBooks) {
//         subscriber.next(book);
//     }
//     setTimeout(() => {
//         subscriber.complete();
//     }, 2000);

//     return () => console.log('Executing tear down code...');
// });

// allBooksObservable$.subscribe((book: any) => console.log(book.title));

// let source1$ = of('hello1', 10, true, allReaders[0].name);

// let source2$ = from(allBooks);

// concat(source1$, source2$).subscribe(data => console.log(data));

let button = document.getElementById('readersButton');

let display = document.getElementById('readers');

fromEvent(button, 'click')
    .subscribe(event => {
        console.log(event);
        // for (let reader of allReaders) {
        //     display.innerHTML += reader.name + '<br/>';
        // }

        // display.innerHTML = allReaders.reduce(reducer, idx);

        // function reducer(total, reader) {
        //     return total + reader.name + '<br/>';
        // }
        // display.innerHTML = allReaders.map(reader => {
        //     return reader.name;
        // }).join('<br/>');

        const authorNames = allReaders.map(reader => {
            return reader.name;
        })
        let val = '';
        display.innerHTML = allReaders.reduce((accumulator, currValue, idx, array) => {
            return idx === array.length - 1? accumulator + currValue.name : accumulator + currValue.name + '<br/>';
        }, val);
    });

// button.addEventListener('click', () => {
//     display.innerHTML = (+display.innerHTML + 1).toString();
// })
import { Observable, of, from, fromEvent, concat } from 'rxjs';
import { allBooks, allReaders } from './data';
import { ajax, AjaxResponse } from 'rxjs/ajax';

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
        ajax('/api/readers').subscribe(ajaxResponse => {
            let readers = ajaxResponse.response;
            display.innerHTML = readers.reduce((acc, curr, idx) => {
                return idx === 0 ? curr.name : acc + '<br/>' + curr.name
            }, '');
        });
    });

// button.addEventListener('click', () => {
//     display.innerHTML = (+display.innerHTML + 1).toString();
// })
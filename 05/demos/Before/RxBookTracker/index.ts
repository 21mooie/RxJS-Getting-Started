import { Observable, of, from, fromEvent, concat, interval, throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { allBooks, allReaders } from './data';
import { mergeMap, filter, tap, catchError } from 'rxjs/operators';

//#region Creating Observables

// let allBooksObservable$ = Observable.create(subscriber => {

//   if (document.title !== 'RxBookTracker') {
//     subscriber.error('Incorrect page title.');
//   }

//   for (let book of allBooks) {
//     subscriber.next(book);
//   }

//   setTimeout(() => {
//     subscriber.complete();
//   }, 2000);

//   return () => console.log('Executing teardown code.');
  
// });

// allBooksObservable$.subscribe(book => console.log(book.title));


// let source1$ = of('hello', 10, true, allReaders[0].name);

// //source1$.subscribe(value => console.log(value));

// let source2$ = from(allBooks);

// //source2$.subscribe(book => console.log(book.title));

// concat(source1$, source2$)
//   .subscribe(value => console.log(value));


// let button = document.getElementById('readersButton');

// fromEvent(button, 'click')
//   .subscribe(event => {
//     console.log(event);

//     let readersDiv = document.getElementById('readers');

//     for (let reader of allReaders) {
//       readersDiv.innerHTML += reader.name + '<br>';
//     }
//   });


// let button = document.getElementById('readersButton');

// fromEvent(button, 'click')
//   .subscribe(event => {
//     ajax('/api/readers')
//       .subscribe(ajaxResponse => {
//         console.log(ajaxResponse);
//         let readers = ajaxResponse.response;

//         let readersDiv = document.getElementById('readers');

//         for (let reader of readers) {
//           readersDiv.innerHTML += reader.name + '<br>';
//         }

//       });
//   });

//#endregion

//#region Subscribing to Observables with Observers

// let books$ = from(allBooks);

// let booksObserver = {
//   next: book => console.log(`Title: ${book.title}`),
//   error: err => console.log(`ERROR: ${err}`),
//   complete: () => console.log(`All done!`)
// };

// books$.subscribe(
//   book => console.log(`Title: ${book.title}`),
//   err => console.log(`ERROR: ${err}`),
//   () => console.log(`All done!`)
// );

// let currentTime$ = new Observable(subscriber => {
//   const timeString = new Date().toLocaleTimeString();
//   subscriber.next(timeString);
//   subscriber.complete();
// });

// currentTime$.subscribe(
//   currentTime => console.log(`Observer 1: ${currentTime}`)
// );

// setTimeout(() => {
//   currentTime$.subscribe(
//     currentTime => console.log(`Observer 2: ${currentTime}`)
//   );
// }, 1000);

// setTimeout(() => {
//   currentTime$.subscribe(
//     currentTime => console.log(`Observer 3: ${currentTime}`)
//   );
// }, 2000);


// let timesDiv = document.getElementById('times');
// let button = document.getElementById('timerButton');

//let timer$ = interval(1000);

// let timer$ = new Observable(subscriber => {
//   let i = 0;
//   let intervalID = setInterval(() => {
//     subscriber.next(i++);
//   }, 1000);

//   return () => {
//     console.log('Executing teardown code.');
//     clearInterval(intervalID);
//   }
// });

// let timerSubscription = timer$.subscribe(
//   value => timesDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br>`,
//   null,
//   () => console.log('All done!')
// );

// let timerConsoleSubscription = timer$.subscribe(
//   value => console.log(`${new Date().toLocaleTimeString()} (${value})`)
// );

// timerSubscription.add(timerConsoleSubscription);

// fromEvent(button, 'click')
//   .subscribe(
//     event => timerSubscription.unsubscribe()
//   );

//#endregion

// #region Using Operators
// let source$ = of(1,2,3,4);

//way of creating your own operator
// let doubler = map(val => val * 2);

// let doubler$ = doubler(source$);

// doubler$.subscribe(output => console.log(output));

//old way of operater pre 5.5
// let source$ = of(1,2,3,4,5);
// source$
//     .map(value => value * 2)
//     .filter(mappedValue => mappedValue > 5)
//     .subscribe(
//         val => console.log(val)
//     );

//current way of operator
// let source$ = of(1,2,3,4,5);

// source$.pipe(
//     map(val => val *2),
//     filter(val => val > 5)
// ).subscribe(
//     final => console.log(final)
// );

ajax('/api/errors/500')
    .pipe(
        mergeMap(ajaxResponse => ajaxResponse.response), //allowed to seperate response instead of dealing with array
        filter((book:any)  => book.publicationYear < 1950),
        tap(oldBook => console.log(`Title: ${oldBook.title}`)),
        // catchError(err => of({title: 'Corduroy', author: 'Don Freeman'})) handle error and return good observable
        // catchError((err, caught) => caught) return same error observable
        // catchError(err => throw `Something bad happened - ${err.message}`) throws new error observable to be handled by error callback in subscribe
        // catchError(err => {return throwError(err.message)}) throw errors using rxjs function throwError to wrap with observable
    ).subscribe(
        (finalValue:any) => console.log(`VALUE: ${finalValue.title}`),
        error => console.error(`ERROR: ${error}`)
    );

//#endregion


import { Component } from '@angular/core';
import { Observable, Observer, from, of } from 'rxjs';

// // 구독자가 구독을 실행하면 새로운 Observable 인스턴스를 생성하고
// // 클라이언트의 접속 위치를 추적하기 시작합니다.
// const locations = new Observable((observer) => {
//   let watchId: number;

//   // 접속 위치를 처리하는 API는 간단하게 사용해 봅니다.
//   if ('geolocation' in navigator) {
//     watchId = navigator.geolocation.watchPosition(
//       (position: GeolocationPosition) => {
//         observer.next(position);
//       },
//       (error: GeolocationPositionError) => {
//         observer.error(error);
//       }
//     );
//   } else {
//     observer.error('Geolocation not available');
//   }

//   // 구독자가 구독을 해지하면 사용하던 데이터를 모두 지웁니다.
//   return {
//     unsubscribe() {
//       navigator.geolocation.clearWatch(watchId);
//     }
//   };
// });

// // 옵저버블을 시작하려면 subscribe() 함수를 실행합니다.
// const locationsSubscription = locations.subscribe({
//   next(position) {
//     console.log('Current Position: ', position);
//   },
//   error(msg) {
//     console.log('Error Getting Location: ', msg);
//   },
//   complete() {
//     console.log('Done');
//   },
// });

// // 옵저버블은 10초 후에 구독을 해지합니다.
// setTimeout(() => {
//   locationsSubscription.unsubscribe();
// }, 10000);

// const lazy5 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(() => {
//       return 5;
//     });
//   }, 1000);
// });

// // 3개의 값을 전달하도록 옵저버블을 간단하게 정의합니다.
// const myOfObservable = of(1, 2, 3, lazy5);
// const myFromObservable = from([4, 5, 6]);

// // 옵저버 객체를 정의합니다.
// const myObserver = {
//   next: (x: any) => {
//     if (x instanceof Promise) {
//       x.then((value) => console.log('Observer got a next promise value: ' + value()));
//     } else console.log('Observer got a next value: ' + x);
//   },
//   error: (err: Error) => console.error('Observer got an error: ' + err),
//   complete: () => console.log('Observer got a complete notification'),
// };

// // 옵저버 객체를 실행합니다.
// myOfObservable.subscribe(myObserver);
// myFromObservable.subscribe(myObserver);

// // 로그:
// // Observer got a next value: 1
// // Observer got a next value: 2
// // Observer got a next value: 3
// // Observer got a complete notification

const genSeq = (arr: number[]): Observable<number> => {
  return new Observable((observer) => {
    let clearTimer: VoidFunction | undefined;

    function doInSequence(arr: number[], idx: number) {
      const timeout = setTimeout(() => {
        observer.next(arr[idx]);
        if (idx === arr.length - 1) {
          observer.complete();
        } else {
          doInSequence(arr, ++idx);
        }
      }, 1000);
      clearTimer = () => clearTimeout(timeout);
    }

    doInSequence(arr, 0);

    return {
      unsubscribe() {
        clearTimer?.();
      },
    };
  });
};

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent {
  arr = [1, 2, 3];

  onClick() {
    // 위에서 정의한 데이터 스트림을 발생하는 옵저버블을 생성합니다.
    const sequence = genSeq(this.arr);
    sequence.subscribe({
      next(num) {
        console.log(num);
      },
      complete() {
        console.log('Finished sequence');
      },
    });
  }

  addSeqNum() {
    this.arr.push(this.arr.length + 1);
  }
}

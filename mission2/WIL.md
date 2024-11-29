## 1. 동기 vs. 비동기
### '동기(synchronous)'란
* 직렬적으로 태스크를 수행하는 방식
* 요청을 보낸 후 응답을 받아야지만 다음 동작이 이루어지는 방식. 어떠한 태스크를 처리할 동안 나머지 태스크는 대기
* 실제로 cpu가 느려지는 것은 아니지만 시스템의 전체적인 효율이 저하됨
<img src="https://velog.velcdn.com/images/khy226/post/a37f9642-9d61-4614-b57e-1052b401774d/image.png" width="50%">

### '비동기 (asynchronous)'란
* 병렬적으로 태스크를 수행하는 방식
* 요청을 보낸 후 응답의 수락 여부와는 상관없이 다음 태스크가 동작하는 방식. a 태스크가 실행되는 시간 동안 b 태스크를 할 수 있으므로 자원을 효율적으로 사용 가능.
* 비동기 요청시 응답 후 처리할 '콜백 함수'를 함께 알려준다. 따라서 해당 태스크가 완료되었을 때, '콜백 함수'가 호출된다.
<img src="https://velog.velcdn.com/images/khy226/post/9c7c7c63-30c9-4360-b64b-138fbf276e50/image.png" width="50%">  

* 하지만 비동기 처리를 위해 콜백 패턴을 사용하면 처리 순서를 보장하기 위해 여러 개의 콜백 함수가 중첩되어 복잡도가 높아지는 콜백 헬(Callback Hell) 이 발생하는 단점
```javascript
step1(function(value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        step5(value4, function(value5) {
            // value5를 사용하는 처리
        });
      });
    });
  });
});
```

## 2. Promisd란?
* 전통적인 콜백 패턴은 **콜백 헬**로 인해 가독성이 나쁘고 비동기 처리 중 발생한 에러의 처리가 곤란하며 여러 개의 비동기 처리를 한번에 처리하는 데도 한계가 있음
* S6에서는 비동기 처리를 위한 또 다른 패턴으로 **프로미스(Promise)**를 도입
* 프로미스는 전통적인 콜백 패턴이 가진 단점을 보완하며 비동기 처리 시점을 명확하게 표현할 수 있다는 장점
* 프로미스는 **Promise 생성자 함수**를 통해 인스턴스화한다. Promise 생성자 함수는 비동기 작업을 수행할 콜백 함수를 인자로 전달받는데 이 콜백 함수는 resolve와 reject 함수를 인자로 전달받는다.
```javascript
// Promise 객체의 생성
const promise = new Promise((resolve, reject) => {
  // 비동기 작업을 수행한다.

  if (/* 비동기 작업 수행 성공 */) {
    resolve('result');
  }
  else { /* 비동기 작업 수행 실패 */
    reject('failure reason');
  }
});
```
Promise는 비동기 처리가 성공(fulfilled)하였는지 또는 실패(rejected)하였는지 등의 상태(state) 정보를 갖는다.
* `pending`: 비동기 처리가 아직 수행되지 않은 상태
* `fulfilled`: 비동기 처리가 수행된 상태 (성공)
* `rejected`: 비동기 처리가 수행된 상태 (실패)
* `settled`: 비동기 처리가 수행된 상태 (성공 또는 실패)

### Promis 호출 과정
1. 비동기 함수 내에서 Promise 객체를 생성하고 그 내부에서 비동기 처리를 구현한다. 이때 비동기 처리에 성공하면 resolve 메소드를 호출한다.
2. 이때 resolve 메소드의 인자로 비동기 처리 결과를 전달 하는데, 이 처리 결과는 Promise 객체의 후속 처리 메소드로 전달된다.
3. 만약 비동기 처리에 실패하면 reject 메소드를 호출한다. 이때 reject 메소드의 인자로 에러 메시지를 전달한다. 이 에러 메시지는 Promise 객체의 후속 처리 메소드로 전달된다.

> **then**
> then 메소드는 두 개의 콜백 함수를 인자로 전달 받는다. 첫 번째 콜백 함수는 성공(fulfilled, resolve 함수가 호출된 상태) 시 호출되고 두 번째 함수는 실패(rejected, reject 함수가 호출된 상태) 시 호출된다. **then 메소드는 Promise를 반환한다.**

> **catch**
> 예외(비동기 처리에서 발생한 에러와 then 메소드에서 발생한 에러)가 발생하면 호출된다. catch 메소드는 Promise를 반환한다.

### Promise 체이닝
프로미스는 후속 처리 메소드인 `then`이나 `catch`로 **메소드를 체이닝(chainning)**하여 여러 개의 프로미스를 연결하여 사용할 수 있다. 이로써 콜백 헬을 해결한다.  

따라서, then 메소드가 Promise 객체를 반환하도록 하면(then 메소드는 기본적으로 Promise를 반환한다.) 여러 개의 프로미스를 연결하여 사용할 수 있다.

```javascript
// 포스트 id가 1인 포스트를 검색하고 프로미스를 반환한다.
promiseAjax('GET', `${url}/1`)
  // 포스트 id가 1인 포스트를 작성한 사용자의 아이디로 작성된 모든 포스트를 검색하고 프로미스를 반환한다.
  .then(res => promiseAjax('GET', `${url}?userId=${JSON.parse(res).userId}`))
  .then(JSON.parse)
  .then(render)
  .catch(console.error);
```

## 3. Async / Await

### async await 이해
복잡했던 Promise를 조금 더 편하게 사용할 수 있다.  
> async await 의 기본 문법
> ```javascript
> async function 함수명() {
>    await 비동기_처리_메서드_명();
> }
> ```

### async 개념
* async 키워드는 function 앞에 사용한다. function 앞에 async를 붙이면 **해당 함수는 항상 프라미스를 반환**한다. 프라미스가 아닌 값을 반환하더라도 **이행 상태의 프라미스(resolved promise)**로 값을 감싸 이행된 프라미스가 반환되도록 한다.
* 아래 예시의 함수를 호출하면 result가 1인 이행 프라미스가 반환된다.
```javascript
async function f() {
  return 1;
}

f().then(alert); // 1
위 함수에서 1을 Promise.resolve로 감싸도 같은 결과를 반환한다.

async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```
즉,`async`가 붙은 함수는 반드시 프라미스를 반환하고, 프라미스가 아닌 것은 프라미스로 감싸 반환한다.  

### await 개념
await는 async 함수 안에서만 동작, 프라미스가 처리될 때 까지 기다리는 역할. 그리고 결과는 그 이후 반환.
```javascript
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("완료!"), 1000)
  });

  let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)

  alert(result); // "완료!"
}

f();
```
* 함수를 호출하고, 함수 본문이 실행되는 도중에 `(*)`로 표시한 줄에서 실행이 잠시 '중단’되었다가 프라미스가 처리되면 실행이 재개된다.
* 이때 프라미스 객체의 `result` 값이 변수 result에 할당된다. 따라서 위 예시를 실행하면 1초 뒤에 '완료!'가 출력된다.

`await`는 말 그대로 **프라미스가 처리될 때까지 함수 실행을 기다리게** 만든다. 프라미스가 처리되면 그 결과와 함께 실행이 재개된다. 프라미스가 처리되길 기다리는 동안엔 엔진이 다른 일(다른 스크립트를 실행, 이벤트 처리 등)을 할 수 있기 때문에, CPU 리소스가 낭비되지 않는다.
* `await`를 사용하지 않았다면 데이터를 받아온 시점에 콘솔을 출력할 수 있게 콜백 함수나 `.then()` 등을 사용해야 했을 것이다. 하지만 async await 문법덕에 비동기에 대한 사고를 하지 않아도 된다.
* 또한, `await`는 `promise.then`보다 좀 더 세련되게 프라미스의 `result` 값을 얻을 수 있도록 해주는 문법이다. `promise.then`보다 가독성 좋고 쓰기도 쉽다.

### async await 에러 제어
`await`가 던진 에러는 `throw`가 던진 에러를 잡을 때처럼 `try..catch`를 사용해 잡을 수 있다.
```javascript
async function f() {

  try {
    let response = await fetch('http://유효하지-않은-주소');
  } catch(err) {
    alert(err); // TypeError: failed to fetch
  }
}

f();
```
에러가 발생하면 제어 흐름이 catch 블록으로 넘어간다. 또한, 여러 줄의 코드를 try로 감쌀 수 있다.

### async/await와 promise.then/catch
* `async/await`을 사용하면 `await`가 대기를 처리해주기 때문에 `.then`이 거의 필요하지 않다. 또한, `.catch` 대신 일반 `try..catch`를 사용할 수 있다는 장점도 있다. 항상 그러한 것은 아니지만, `promise.then`을 사용하는 것보다 `async/await`를 사용하는 것이 대개는 더 편리하다.
* 그런데 문법 제약 때문에 `async`함수 바깥의 최상위 레벨 코드에선 `await`를 사용할 수 없다. 그렇기 때문에 관행처럼 `.then/catch`를 추가해 최종 결과나 처리되지 못한 에러를 다룬다.
# 동기와 비동기, Promise, async/await
## 동기 vs 비동기
동기는 '직렬적'으로 작동하는 방식이고 비동기는 '병렬적'으로 작동하는 방식이다. 즉, 비동기란 특정 **코드가 끝날때 까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행**하는 것을 의미한다. 비동기 처리를 예로 Web API, Ajax, setTimeout 등이 있다.

### '동기 (synchronous)'란 무엇일까?
- 직렬적으로 태스크를 수행하는 방식
- 즉, 요청을 보낸 후 응답을 받아야지만 다음 동작이 이루어지는 방식이다. 어떠한 태스크를 처리할 동안 나머지 태스크는 대기한다.
- 실제로 cpu가 느려지는 것은 아니지만 시스템의 전체적인 효율이 저하된다고 할 수 있다.
### '비동기 (asynchronous)'란 무엇인가?
- 병렬적으로 테스크를 수행하는 방식
- 요청을 보낸 후 응답의 수락 여부와는 상관없이 다음 테스크가 동작하는 방식이다. a 태스크가 실행되는 시간 동안 b 태스크를 할 수 있으므로 자원을 효율적으로 사용할 수 있다.
- 이때, 비동기 요청시 응답 후 처리할 '콜백 함수'를 함께 알려준다. 따라서 해당 태스크가 완료되었을 때, '콜백 함수'가 호출된다.
- 하지만 비동기 처리를 위해 콜백 패턴을 사용하면 처리 순서를 보장하기 위해 여러 개의 콜백 함수가 중첩되어 복잡도가 높아지는 **콜백 헬(Callback Hell)**이 발생하는 단점이 있다.

## Promise란?
- 자바스크립트는 비동기 처리를 위한 하나의 패턴으로 **콜백 함수**를 사용한다. 하지만 전통적인 콜백 패턴은 **콜백 헬**로 인해 가독성이 나쁘고 비동기 처리 중 발생한 에러의 처리가 곤란하며 여러 개의 비동기 처리를 한번에 처리하는 데도 한계가 있다.
- ES6에서는 비동기 처리를 위한 또 다른 패턴으로 **프로미스(Promise)**를 도입했다. 프로미스는 전통적인 콜백 패턴이 가진 단점을 보완하며 비동기 처리 시점을 명확하게 표현할 수 있다는 장점이 있다.
- 프로미스는 **Promise 생성자 함수**를 통해 인스턴스화한다. Promise 생성자 함수는 비동기 작업을 수행할 콜백 함수를 인자로 전달받는데 이 콜백 함수는 resolve와 reject 함수를 인자로 전달받는다.
```js
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

Promise는 비동기 처리가 성공(fulfilled)하였는지 또는 실패(rejected)하였는지 등의 상태(state)정보를 갖는다.
- pending: 비동기 처리가 아직 수행되지 않은 상태
- fulfilled: 비동기 처리가 수행되 상태 (성공)
- rejected: 비동기 처리가 수행된 상태 (실패)
- settled: 비동기 처리가 수행된 상태 (성공 또는 실패)

### Promise 호출 과정
1. 비동기 함수 내에서 Promise 객체를 생성하고 그 내부에서 비동기 처리를 구현한다. 이때 비동기 처리에 성공하면 **resolve** 메소드를 호출한다.
2. 이때 resolve 메소드의 인자로 비동기 처리 결과를 전달 하는데, 이 처리 결과는 Promise 객체의 후속 처리 메소드로 전달된다.
3. 만약 비동기 처리에 실패하면 reject 메소드를 호출한다. 이때 **reject** 메소드의 인자로 에러 메시지를 전달한다. 이 에러 메시지는 Promise 객체의 후속 처리 메소드로 전달된다.

후속 처리 메소드에는 대표적으로 `then`(Promise 반환)과 `catch`(예외)가 있다.
    **then**
    then 메소드는 두 개의 콜백 함수를 인자로 전달 받는다. 첫 번째 콜백 함수는 성공(fulfilled, resolve 함수가 호출된 상태) 시 호출되고 두 번째 함수는 실패(rejected, reject 함수가 호출된 상태) 시 호출된다.**then 메소드는 Promise를 반환한다.**

    **catch**
    예외(비동기 처리에서 발생한 에러와 then 메소드에서 발생한 에러)가 발생하면 호출된다. catch 메소드는 Promise를 반환한다.

### Promise 체이닝
비동기 함수의 처리 결과를 가지고 다른 비동기 함수를 호출해야 하는 경우, 함수의 호출이 중첩(nesting)이 되어 복잡도가 높아지는 **콜백 헬**이 발생한다. 프로미스는 후속 처리 메소드인 then이나 catch로 **메소드를 체이닝(chainning)**하여 여러 개의 프로미스를 연결하여 사용할 수 있다. 이로써 콜백 헬을 해결한다.

따라서, then 메소드가 Promise 객체를 반환하도록 하면(then 메소드는 기본적으로 Promise를 반환한다.) 여러 개의 프로미스를 연결하여 사용할 수 있다.

## Async / Await
### async await 이해
async와 await는 자바스크립트의 비동기 처리 패턴 중 가장 최근에 나온 문법이다. 기존의 비동기 처리 방식인 콜백 함수와 프로미스의 단점을 보완하고 개발자가 읽기 좋은 코드를 작성할 수 있게 도와준다. 특히, 복잡했던 Promise를 조금 더 편하게 사용할 수 있다. async await 의 기본 문법은 아래와 같다.
```js
async function 함수명() {
  await 비동기_처리_메서드_명();
}
```

### async 개념
async 키워드는 function 앞에 사용한다. function 앞에 async를 붙이면 **해당 함수는 항상 프라미스를 반환**한다. 프라미스가 아닌 값을 반환하더라도 **이행 상태의 프라미스(resolved promise)**로 값을 감싸 이행된 프라미스가 반환되도록 한다.

### await 개념
await는 async 함수 안에서만 동작한다. await는 ‘기다리다'라는 뜻을 가진 영단어 인데, 프라미스가 처리될 때 까지 기다리는 역할을 한다. 그리고 결과는 그 이후 반환된다.
```js
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("완료!"), 1000)
  });

  let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)

  alert(result); // "완료!"
}

f();
```

- 함수를 호출하고, 함수 본문이 실행되는 도중에 `(*)`로 표시한 줄에서 실행이 잠시 '중단’되었다가 프라미스가 처리되면 실행이 재개된다.
- 이때 프라미스 객체의 `result` 값이 변수 result에 할당된다. 따라서 위 예시를 실행하면 1초 뒤에 '완료!'가 출력된다.

`await`는 말 그대로 **프라미스가 처리될 때까지 함수 실행을 기다리게** 만든다. 프라미스가 처리되면 그 결과와 함께 실행이 재개된다. 프라미스가 처리되길 기다리는 동안엔 엔진이 다른 일(다른 스크립트를 실행, 이벤트 처리 등)을 할 수 있기 때문에, CPU 리소스가 낭비되지 않는다.

또한, `await`는 `promise.then`보다 좀 더 세련되게 프라미스의 `result` 값을 얻을 수 있도록 해주는 문법이다. `promise.then`보다 가독성 좋고 쓰기도 쉽다.

### async await 에러 제어
`await`가 던진 에러는 `throw`가 던진 에러를 잡을 때처럼 `try..catch`를 사용해 잡을 수 있다.

### async/await와 promise.then/catch
- `async/await`을 사용하면 `await`가 대기를 처리해주기 때문에 `.then`이 거의 필요하지 않다. 또한, `.catch` 대신 일반 `try..catch`를 사용할 수 있다는 장점도 있다. 항상 그러한 것은 아니지만, `promise.then`을 사용하는 것보다 `async/await`를 사용하는 것이 대개는 더 편리하다
- 그런데 문법 제약 때문에 `async`함수 바깥의 최상위 레벨 코드에선 `await`를 사용할 수 없다. 그렇기 때문에 관행처럼 `.then/catch`를 추가해 최종 결과나 처리되지 못한 에러를 다룬다.

# 자바스크립트의 콜백 함수
## 콜백 함수가 무엇인가?
자바스크립트에서 함수는 객체이다. 자바스크립트에서는 함수의 파라미터로서 객체를 전달할 수 있다.
```js
function print(callback) {
    callback();
}
```

`print()` 함수는 다른 함수를 파라미터로 받아서 내부에서 그거를 호출하고 있다. 이런 다른 함수의 파라미터로써 전달되는 함수를 콜백 함수라고 한다.

### 콜백 함수가 왜 필요한가
콜백은 태스크가 끝나기 전에 함수가 실행되지 않는 것을 보장한다. 다르게 말하면 콜백은 그 태스크가 끝난 직후에 실행될 것이다. 콜백은 비동기 자바스크립트 코드를 작성할 수 있도록 해주고 여러 문제와 에러들로부터 안전하게 지켜준다.

자바스크립트에서 콜백 함수를 만드는 방법은 어떤 함수의 파라미터로써 함수를 넘기고 어떤 행위나 태스크가 완료된 직후에 콜백 함수를 호출하는 것이다.

## 콜백을 만드는 방법
```js
const message = function() {
    console.log("This message is shown after 3 seconds");
}

setTimeout(message, 3000);
```
message 함수는 어떤 일이 일어나기 전이 아니라 뒤에 호출된다. 그래서 이 message 함수는 콜백 함수의 예시라고 할 수 있다.

### 화살표 함수 모양의 콜백
```js
setTimeout(() => {
    console.log("This message is shown after 3 seconds");
}, 3000);
```

### 이벤트 처리
```js
document.queryselector("#callback-btn")
    .addEventListener("click", function() {
      console.log("User has clicked on the button!");
});
```

# 콜백 함수 개념 및 응용
## 자바스크립트 콜백 함수란?
```js
function sayHello(name, callback) {
    const words = '안녕하세요 내 이름은 ' + name + ' 입니다.';
    
    callback(words); // 매개변수의 함수(콜백 함수) 호출
}

sayHello("인파", function printing(name) {
	console.log(name); // 안녕하세요 내 이름은 인파 입니다.
});
```
즉, 콜백 함수란 파라미터로 일반적인 변수나 값을 전달하는 것이 아닌 **함수 자체를 전달**하는 것을 말한다고 보면 된다. 또한 어차피 매개변수에 함수를 전달해 일회용으로 사용하기 때문에 굳이 함수의 이름을 명시할 필요가 없어 보통 콜백 함수 형태로 함수를 넘겨줄때 함수의 이름이 없는 '익명 함수' 형태로 넣어주게 된다.

## 콜백 함수 사용 원칙
### 익명의 함수 사용
이밖에도 뜻하지 않은 개발자의 실수로 인한 **함수 이름의 충돌 방지**를 위한 이유도 있다. 콜백함수에 이름을 붙이면, 그 이름은 함수 스코프 내에서 유효한 식별자가 되는데, 만약 같은 스코프 내에 이미 같은 이름의 식별자가 있다면, 콜백함수의 이름이 기존의 식별자를 덮어쓰게 되어 버린다. 이는 의도치 않은 결과를 초래할 수 있다. 예를 들어, 변수 `add`와 콜백함수의 이름이 `add`로 설정할 경우, 콜백 함수가 변수의 값을 변경해 버리게 된다.

### 화살표 함수 모양의 콜백
```js
function sayHello(callback) {
  var name = "Alice";
  callback(name); // 콜백 함수 호출
}

// 익명 화살표 콜백 함수
sayHello((name) => {
  console.log("Hello, " + name);
}); // Hello, Alice
```

### 함수의 이름을 넘기기
자바스크립트는 일급 객체의 특성을 가지고 있기 때문에, 자바스크립트는 null과 undefined 타입을 제외하고 모든 것을 객체로 다룬다. 그래서 매개변수에 일반적인 변수나 상수값 뿐만 아니라 함수 자체를 객체로서 전달이 가능한 것이다. 만일 콜백 함수가 일회용이 아닌 **여러 호출 함수에 재활용**으로 자주 이용될 경우, 별도로 함수를 정의하고 함수의 이름만 호출 함수의 인자에 전달하는 식으로 사용이 가능하다.

이러한 특징을 응용하면, 매개변수에 전달할 콜백 함수 종류만을 바꿔줌으로서 **여러가지 함수 형태를 다양하게 전달**이 가능하다. 아래와 같이 다른 동작을 수행하는 함수 `say_hello` 와 `say_bye`를 정의해두고 `introduce` 함수의 입력값으로 각기 다른 콜백 함수를 전달해주면, `introduce`라는 함수에서 다른 동작을 수행하는 것이 가능해진다.
```js
function introduce (lastName, firstName, callback) {
    var fullName = lastName + firstName;
    
    callback(fullName);
}

function say_hello (name) {
    console.log("안녕하세요 제 이름은 " + name + "입니다");
}

function say_bye (name) {
    console.log("지금까지 " + name + "이었습니다. 안녕히계세요");
}

introduce("홍", "길동", say_hello);
// 결과 -> 안녕하세요 제 이름은 홍길동입니다

introduce("홍", "길동", say_bye);
// 결과 -> 지금까지 홍길동이었습니다. 안녕히계세요
```

## 콜백 함수 활용 사례
### 이벤트 리스너로 사용
```js
let button = document.getElementById("button"); // 버튼 요소를 선택

// 버튼에 클릭 이벤트 리스너를 추가
button.addEventListener("click", function () { // 콜백 함수
  console.log("Button clicked!"); 
});
```

### 고차함수에 사용
자바스크립트에서 for문보다 더 자주 사용되는 반복문이 `forEach` 메서드일 것이다. 이 역시 `forEach` 메서드의 입력값으로 콜백 함수를 전달하는 형태임을 볼 수 있다.
```js
// 예시 : 배열의 각 요소를 두 배로 곱해서 새로운 배열을 생성하는 콜백 함수 
let numbers = [1, 2, 3, 4, 5]; // 배열 선언 
let doubled = []; // 빈 배열 선언 

// numbers 배열의 각 요소에 대해 콜백 함수 실행 
numbers.forEach(function (num) { 
    doubled.push(num * 2); // 콜백 함수로 각 요소를 두 배로 곱해서 doubled 배열에 추가 
}); 

console.log(doubled); // [2, 4, 6, 8, 10]
```
### Ajax 결과값을 받을 때 사용
서버와 데이터를 주고받을 때 사용하는 fetch 메서드의 서버 요청의 결과값을 처리하기 위해 콜백 함수가 사용된다.
```js
// fetch 메서드를 사용하여 서버로부터 JSON 데이터를 받아오고 콜백 함수로 화면에 출력
fetch("https://jsonplaceholder.typicode.com/users")
  .then(function (response) {
    // fetch 메서드가 성공하면 콜백 함수로 response 인자를 받음
    return response.json(); // response 객체의 json 메서드를 호출하여 JSON 데이터를 반환
  })
  .then(function (data) {
    // json 메서드가 성공하면 콜백 함수로 data 인자를 받음
	console.log(data);
  })
```
## 자바스크립트 콜백 함수 주의점
### this를 사용한 콜백함수
콜백 함수 내에서 `this` 키워드를 사용하면, 기대한 대로 작동하지 않을 수가 있다.
```js
let userData = {
    signUp: '2021-4-06 12:00:00',
    name: 'Not Set',
    setName: function(firstName, lastName) {
        this.name = firstName + ' ' + lastName;
    }
}

function getUserName(firstName, lastName, callback) {
    callback(firstName, lastName);
}

getUserName('홍', '길동', userData.setName);

console.log('1: ', userData.name); // Not Set
console.log('2: ', window.name); // 홍 길동
```
`getUserName` 함수를 실행한 후 실행 첫 번째 콘솔의 값이 '홍 길동' 이기를 기대했지만, 'Not Set'이 출력되는 걸 볼 수 있다. 왜냐하면 `userData` 객체의 `setName` 프로퍼티 함수 내부에서 사용된 `this.name` 이 `userData` 객체의 `name`을 가리키는게 아니라 전역 객체 `window` 의 `name`을 가리키기 때문이다.

#### 콜백 함수 this가 전역 객체인 이유
콜백 함수는 다른 함수의 인자로 전달되는 함수다. 그래서 콜백 함수는 자신을 전달받은 함수에 의해 호출되는데, 이때 콜백 함수 내부에서의 `this`는 해당 콜백 함수의 제어권을 넘겨받은 함수가 정의한 바에 따르며, 정의하지 않은 경우에는 전역 객체를 참조하게 된다.

#### 콜백 함수 this 해결 방안
콜백 함수 내의 `this`를 보호할 수 있도록 콜백 함수를 만들어야 한다.
##### call, bind, apply 메서드 사용
해결 방안으로는 `call()` 과 `apply()`를 사용하여 `this`를 보호할 수 있다.
- `call()`: 첫 번째 인자로 this 객체 사용, 나머지 인자들은 , 로 구분
- `apply()`: 첫 번째 인자로 this 객체 사용, 나머지 인자들은 배열 형태로 전달
솔루션 원리는 간단하다. 참조할 객체를 추가로 함수의 매개변수로 전달하고, 콜백 함수 내에서 `call()`, `apply()` 메서드를 통해 콜백 함수가 참조할 객체를 지정해주면 된다.
```js
// this 대신 userData를 사용하는 방법
let userData = {
    signUp: '2021-4-06 12:00:00',
    name: 'Not Set',
    setName: function(firstName, lastName) {
        this.name = firstName + ' ' + lastName;
    }
}

function getUserName(firstName, lastName, callback, data) { // userData를 받는 매개변수 data를 추가
    callback.call(data, firstName, lastName); // data를 this로 사용
    //apply 사용시  callback.apply(data, [firstName, lastName]);
}

getUserName('홍', '길동', userData.setName, userData); // userData를 인수로 전달

console.log('1: ', userData.name); // 홍 길동
console.log('2: ', window.name); // Not Set
```

##### 화살표 함수 사용
또 다른 방법으로는 화살표 함수를 사용해서 this를 외부 함수의 this와 동일하게 유지하는 방법이 있다. 화살표 함수는 자신만의 this를 가지지 않고 상위 스코프의 this를 참조하기 때문에 전역 객체를 무시하고 무조건 자신을 들고 있는 상위 객체를 가리킨다.
```js
let userData = {
    signUp: '2021-4-06 12:00:00',
    name: 'Not Set',
    setName: (firstName, lastName) => { // 화살표 함수로 변경
        this.name = firstName + ' ' + lastName;
    }
}

function getUserName(firstName, lastName, callback) {
    callback(firstName, lastName); // call 메서드 없이 호출
}

getUserName('홍', '길동', userData.setName);

console.log('1: ', userData.name); // 홍 길동
console.log('2: ', window.name); // Not Set
```

## 콜백 지옥 (Callback Hell)
콜백 지옥이란 함수의 매개변수로 넘겨지는 콜백 함수가 반복되어 코드의 들여쓰기 수준이 감당하기 힘들어질 정도로 깊어지는 현상이다.

## 자바스크립트 비동기와 콜백
자바스크립트는 싱글 스레드 언어로서, 하나의 작업만을 동시에 처리할 수 있다. 즉, 자바스크립트는 코드를 위에서 아래로 순차적으로 실행한다. 그런데 웹 개발에서는 네트워크 요청이나 타이머 등의 작업이 필요한 경우가 많은데, 이러한 작업들은 시간이 오래 걸리거나 결과가 불확실하다. 그래서 자바스크립트는 비동기(asynchronous) 방식으로 작업을 처리하는 기법을 제공한다.

비동기 방식으로 작업을 처리하는 방법 중 하나가 바로 콜백(callback) 함수이다.

# 자바스크립트 Fetch
## fetch 사용법
`fetch()` 함수는 첫번째 인자로 URL, 두번째 인자로 옵션 객체를 받고, Promise 타입의 객체를 반환한다. 반환된 객체는, API 호출이 성공했을 경우에는 응답(response) 객체를 resolve하고, 실패했을 경우에는 예외(error) 객체를 reject한다.
```js
fetch(url, options)
  .then((response) => console.log("response:", response))
  .catch((error) => console.log("error:", error));
```

## GET 호출
`fetch()` 함수는 디폴트로 GET 방식으로 작동하고 GET 방식은 요청 전문을 받지 않기 때문에 옵션 인자가 필요가 없다.

## POST 호출
원격 API에서 관리하고 있는 데이터를 생성해야 한다면 요청 전문을 포함할 수 있는 POST 방식의 HTTP 통신이 필요할 것이다.

동일한 API를 대상으로 이번에는 새로운 포스팅를 생성하기 위해서 `fetch()` 함수를 사용한다. `method` 옵션을 `POST`로 지정해주고, `headers` 옵션을 통해 JSON 포맷을 사용한다고 알려줘야 하며, 요청 전문을 JSON 포맷으로 직렬화화여 가장 중요한 `body` 옵션에 설정해준다.
```js
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Test",
    body: "I am testing!",
    userId: 1,
  }),
}).then((response) => console.log(response));
```
이번에는 응답 객체를 통해 응답코드가 `201 Created`인 것을 알 수 있다.

## PUT, DELETE 호출
원격 API에서 관리하는 데이터의 수정과 삭제를 위해서 PUT과 DELETE 방식의 HTTP 호출을 해야할 때가 있다.

PUT 방식은 `method` 옵션만 `PUT`으로 설정한다는 점 빼놓고는 POST 방식과 매우 흡사하다.
```js
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Test",
    body: "I am testing!",
    userId: 1,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

DELETE 방식에서는 보낼 데이터가 없기 때문에, `headers`와 `body` 옵션이 필요가 없다.
```js
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "DELETE",
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```
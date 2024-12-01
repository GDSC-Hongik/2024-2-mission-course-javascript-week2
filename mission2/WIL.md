## 동기 vs. 비동기

동기: '직렬적'으로 작동하는 방식
비동기: '병렬적'으로 작동하는 방식 -> 코드가 끝날 때 까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 것을 의미한다.

## 동기란 무엇일까?

- 직렬적으로 태스크를 수행하는 방식이다.
- 요청을 보낸 후 응답을 받아야지만 다음 동작이 이루어지는 방식이다. 어떠한 태스크를 처리할 동안 나머지 태스크는 대기한다.

## 비동기란 무엇일까?

- 병렬적으로 태스크를 수행하는 방식이다.
- 요청을 보낸 후 응답의 수락 여부와는 상관없이 다음 태스크가 동작하는 방식이다.
- 이때, 비동기 요청시 응답 후 처리할 '콜백 함수'를 함께 알려준다. 따라서 해당 태스크가 완료되었을 때, '콜백 함수'가 호출된다.
- 하지만 비동기 처리를 위해 콜백 패턴을 사용하면 처리 순서를 보장하기 위해 여러개의 콜백 함수가 중첩되어 복잡도가 높아지는 콜백 헬이 발생하는 단점이 있다.

## Promise란?

- 자바스크립트는 비동기 처리를 위한 하나의 패턴으로 콜백 함수를 사용한다. 하지만 전통적인 콜백 패턴은 콜백 헬로 인해 가독성이 나쁘고 비동기 처리 중 발생한 에러의 처리가 곤란하며 여러 개의 비동기 처리를 한번에 처리하는 데도 한계가 있다.
- ES6에서는 비동기 처리를 위한 또 다른 패턴으로 Promise를 도입했다. Promise는 전통적인 콜백 패턴이 가진 단점을 보완하며 비동기 처리 시점을 명확하게 표현할 수 있다는 장점이 있다.
- Promise는 생성자 함수를 통해 인스턴스화한다. Promise 생성자 함수는 비동기 작업을 수행할 콜백 함수를 인자로 전달받는데 이 콜백 함수는 resolve와 reject함수를 인자로 전달받는다.

### Promise 호출 과정

1. 비동기 함수 내에서 Promise객체를 생성하고 그 내부에서 비동기 처리를 구현한다. 이때 비동기 처리에 성공하면 resolve 메소드를 호춯한다.
2. 이때 resolve 메소드의 인자로 비동기 처리 결과를 전달 하는데, 이 처리 결과는 Promise 객체의 후속 처리 메소드로 전달된다.
3. 만약 비동기 처리에 실패하면 reject메소드를 호출한다. 이때 reject 메소드의 인자로 에러 메시지를 전달한다. 이 에러 메시지는 Promise 객체의 후속 처리 메소드로 전달된다.

후속처리 메소드에는 대표적으로 then(Promise 반환)과 catch(예외)가 있다.

then: then메소드는 두개의 콜백 함수를 인자로 전달 받는다. 첫 번째 콜백 함수는 성공 시 호출되고 두 번째 함수는 실패 시 호출된다. then 메소는 Promise를 반환한다.

catch: 예외가 발생하면 호출된다. Promise를 반환한다.

### Promise 체이닝

비동기 함수의 처리 결과를 가지고 다른 비동기 함수를 호출해야 하는 경우, 함수의 호출이 중첩이 되어 복잡도가 높아지는 콜백 헬이 발생한다. Promise는 후속처리 메소드인 then이나 catch로 메소드를 체이닝하여 여러 개의 Promise를 연결하여 사용할 수 있다.

따라서, then메소드가 Promise 객체를 반환하도록 하면 여러개의 Promise를 연결하여 사용할 수 있다.

```
// 포스트 id가 1인 포스트를 검색하고 프로미스를 반환한다.
promiseAjax('GET', `${url}/1`)
  // 포스트 id가 1인 포스트를 작성한 사용자의 아이디로 작성된 모든 포스트를 검색하고 프로미스를 반환한다.
  .then(res => promiseAjax('GET', `${url}?userId=${JSON.parse(res).userId}`))
  .then(JSON.parse)
  .then(render)
  .catch(console.error);
```

## Async/Await

### async await 이해

async와 await는 자바스크립트의 비동기 처리 패턴 중 가장 최근에 나온 문법이다. 기존의 비동기 처리 방식인 콜백 함수와 프로미스의 단점을 보완하고 개발자가 읽기 좋은 코드를 작성할 수 있게 도와준다. 특히, 복잡했던 Promise를 조금 더 편하게 사용할 수 있다.

```
async function 함수명() {
  await 비동기_처리_메서드_명();
}
```

### async 개념

- async 키워드는 function 앞에 사용한다. function 앞에 async를 붙이면 해당 함수는 항상 Promise를 반환한다. Promise가 아닌 값을 반환하더라도 이행 상태의 프라미스로 값을 감싸 이행된 프라미스가 반환되도록 한다.

### await 개념

- await은 async 함수 안에서만 동작한다. 프라미스가 처리될 때 까지 기다리는 역할을 한다. 결과는 그 이후 반환된다.

```
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("완료!"), 1000)
  });

  let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)

  alert(result); // "완료!"
}

f();
```

- 함수를 호출하고, 함수 본문이 실행되는 도중에 (\*)로 표시한 줄에서 실행이 잠시 중단되었다가 프라미스가 처리되면 실행이 재개된다.
- 이때 프라미스 객체의 result값이 변수 result에 할당된다.
- await는 말 그대로 프라미스가 처리될 때까지 함수 실행을 기다리게 만든다. 프라미스가 처리되면 그 결과와 함께 실행이 재개된다. 프라미스가 처리되길 기다리는 동안에 엔진이 다른일을 할 수 있기 때문에, CPU 리소스가 낭비되지 않는다.

# 자바스크립트 콜백함수

## 콜백함수란?

간단히 말하면 매개변수로 함수 객체를 전달해서 호출 함수 내에서 매개변수 함수를 실행하는 것.

```
function sayHello(name, callback) {
    const words = '안녕하세요 내 이름은 ' + name + ' 입니다.';

    callback(words); // 매개변수의 함수(콜백 함수) 호출
}

sayHello("인파", function printing(name) {
	console.log(name); // 안녕하세요 내 이름은 인파 입니다.
});
```

즉, 콜백 함수란 파라미터로 일반적인 변수나 값을 전달하는 것이 아닌 함수 자체를 전달하는 것.

```
function sayHello(name, callback) {
    const words = '안녕하세요 내 이름은 ' + name + ' 입니다.';

    callback(words);
}

sayHello("인파", function (name) { // 함수의 이름이 없는 익명 함수
	console.log(name);
});
```

## 콜백함수 사용 원칙

1. 익명의 함수 사용
2. 화살표 함수 모양의 콜백

```
function sayHello(callback) {
  var name = "Alice";
  callback(name); // 콜백 함수 호출
}

// 익명 화살표 콜백 함수
sayHello((name) => {
  console.log("Hello, " + name);
}); // Hello, Alice
```

3. 함수의 이름을 넘기기

```
// 콜백 함수를 별도의 함수로 정의
function greet(name) {
  console.log("Hello, " + name);
}

function sayHello(callback) {
  var name = "Alice";
  callback(name); // 콜백 함수 호출
}

function sayHello2(callback) {
  var name = "Inpa";
  callback(name); // 콜백 함수 호출
}

// 콜백 함수의 이름만 인자로 전달
sayHello(greet); // Hello, Alice
sayHello2(greet); // Hello, Inpa
```

## 콜백 함수 활용 사례

1. 이벤트 리스너로 사용

```
let button = document.getElementById("button"); // 버튼 요소를 선택

// 버튼에 클릭 이벤트 리스너를 추가
button.addEventListener("click", function () { // 콜백 함수
  console.log("Button clicked!");
});
```

2. Ajax 결과값을 받을 때 사용

```
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

3. 타이머 실행 함수로 사용

```
// 3000 밀리초(3초) 후에 콜백 함수 실행
setTimeout(function () {
  console.log("Time is up!"); // 콜백 함수로 콘솔에 메시지 출력
}, 3000);
```

# 자바스크립트의 fetch() 함수로 원격 API 호출하기

## fetch 사용법

fetch() 함수는 첫번째 인자로 URL, 두번째 인자로 옵션 객체를 받고, Promise 타입의 객체를 반환합니다. 반환된 객체는, API 호출이 성공했을 경우에는 응답(response) 객체를 resolve하고, 실패했을 경우에는 예외(error) 객체를 reject합니다.

```
fetch(url, options)
    .then((response) => console.log("response:", response))
    .catch((error) => console.log("error:", error))
```

## GET 호출

fetch() 함수는 디폴트로 GET 방식으로 작동하고 GET 방식은 요청 전문을 받지 않기 때문에 옵션 인자가 필요가 없습니다.

```
fetch("https://jsonplaceholder.typicode.com/posts/1").then((response) =>
  console.log(response)
);
```

대부분의 REST API들은 JSON 형태의 데이터를 응답하기 때문에, 응답(response) 객체는 json() 메서드를 제공합니다.

```
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

## POST 호출

동일한 API를 대상으로 이번에는 새로운 포스팅를 생성하기 위해서 fetch() 함수를 사용해보겠습니다. method 옵션을 POST로 지정해주고, headers 옵션을 통해 JSON 포맷을 사용한다고 알려줘야 하며, 요청 전문을 JSON 포맷으로 직렬화화여 가장 중요한 body 옵션에 설정해줍니다.

```
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

## PUT, DELETE 호출

PUT 방식은 method 옵션만 PUT으로 설정한다는 점 빼놓고는 POST 방식과 매우 흡사합니다.

```
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

DELETE 방식에서는 보낼 데이터가 없기 때문에, headers와 body 옵션이 필요가 없습니다.

```
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "DELETE",
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

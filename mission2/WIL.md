# 동기/비동기 처리

동기 : *직렬적*으로 작동하는 방식  
비동기 : *병렬적*으로 작동하는 방식

<img src="https://velog.velcdn.com/images/khy226/post/3855ed24-866b-4425-a38b-2a66abd425a2/image.png" width = 60%>

왼쪽 그림이 비동기로 작동하는 방식 => 코드가 끝날때 까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 것을 의미, ex) Web API, Ajax, setTimeout 등등  
오른쪽 그림이 동기적으로 작동하는 방식 => 하나의 태스트가 끝날때 까지 기다렸다가 다음 태스크가 실행

## 동기(synchronous)란?

- 직렬적으로 태스크를 수행하는 방식
- 요청을 보낸 후 응답을 받아야지만 다음 동작이 이루어짐(나머지 태스크는 대기)
- 실제 cpu가 느려지는 것은 아니지만 시스템의 전체적인 효율은 저하

## 비동기(asynchronous)란?

- 병렬적으로 태스크를 수행하는 방식
- 요청을 보낸 후 응답의 수락 여부와는 상관 없이 다음 태스크가 동작하는 방식 => 자원을 효율적으로 사용 가능
- 비동기 요청시 응답 후 처리할 "콜백 함수"를 함께 알려주어 해당 태스크가 완료되었을 때 콜백 함수가 호출됨
- 하지만 비동기 처리를 위해 콜백 패턴을 사용하면 처리 순서를 보장하기 위해 여러 개의 콜백 함수가 중첩되어 복잡도가 높아지는 *콜백 헬*이 발생함  
  이는 가독성을 나쁘게 하며 실수를 유발하는 원인

      ```javascript
      step1(function(value1) {
          step2(function(value2) {
              step3(function(value3) {
                  step4(function(value4) {
                      step5(function(value5){
                          // value5를 사용하는 처리
                      });
                  });
              });
          });
      });
      ```

## Promise란?

- 콜백 헬로 인해 여러개의 비동기 처리를 한번에 처리하는 데 한계가 발생
- ES6에서 비동기 처리를 위한 또 다른 패턴으로 **프로미스**를 도입
- 프로미스는 Promise 생성자 함수를 통해 인스턴스화한다.  
  Promise 생성자 함수는 비동기 작업을 수행할 콜백 함수를 인자로 전달받는데 이 콜백 함수는 resolve와 reject 함수를 인자로 전달 받는다.

      ```Javascript
      // Promise 객체 생성
      const promise = new Promise((resolve, reject) => {
          // 비동기 작업 수행
          if (/* 비동기 작업 수행 성공*/) {
              resolve('result');
          }
          else { // 비동기 작업 수행 실패
              reject('failure reason');
          }
      });
      ```

- Promise는 비동기 처리가 성공하였는지 실패하였는지 등의 상태 정보를 가지고 있음

  - `pending` : 비동기 처리가 아직 수행되지 않은 상태
  - `fulfilled` : 비동기 처리가 수행된 상태(성공)
  - `rejected` : 비동기 처리가 수행된 상태(실패)
  - `settled` : 비동기 처리가 수행된 상태(성공 또는 실패)

#### Promise 호출 과정

1. 비동기 함수 내에서 Promise 객체를 생성하고 그 내부에서 비동기 처리를 구현  
   -> 비동기 처리 성공시 resolve 메소드 호출
2. resolve 메소드의 인자로 비동기 처리 결과를 전달 하는데, 이 처리 결과는 Promise 객체의 후속 처리 메소드로 전달됨
3. 비동기 처리에 실패하면 reject 메소드 호출(인자로 에러 메시지 전달)  
   이 에러 메시지는 Promise 객체의 후속 처리 메소드로 전달됨

<br>

- 후속 처리 메소드에는 대표적으로 then과 catch가 있다.

  - then  
    두개의 콜백 함수를 인자로 전달 받음  
    첫번째 콜백 함수는 성공 시 호출되고 두번쨰 함수는 실패 시 호출됨  
    then 메소드는 Promise를 반환함

  - catch  
    예외(비동기 처리에서 발생한 에러와 then 메소드에서 발생한 에러)가 발생하면 호출  
    catch 메소드는 Promise를 반환

#### Promise 체이닝

비동기 함수의 처리 결과를 가지고 다른 비동기 함수를 호출해야 하는 경우, 함수의 호출이 중첩이 되어 복잡도가 높아지는 콜백 헬이 발생  
then이나 catch로 메소드를 체이닝(chainning)하여 여러 개의 프로미스를 연결하여 사용 가능 -> 콜백 헬 해결

```Javascript
// 포스트 id가 1인 포스트를 검색하고 프로미스를 반환
promiseAjax('GET', `${url}/1`) {
    // 포스트 id가 1인 포스트를 작성한 사용자의 아이디로 작성된 모든 포스트를 검색하고 프로미스를 반환
    .then(res=> promiseAjax('GET', `${url}?usedId=${JSON.parse(res).usedId}`))
    .then(JSON.parse)
    .then(render)
    .catch(console.error);
}
```

## Async / Await

기존의 비동기 처리 방식의 단점을 보완하고 읽기 좋은 코드를 작성할 수 있게 도와주는 문법

```Javascript
async function 함수명() {
    await 비동기_처리_메서드명();
}
```

#### async 개념

- async 키워드는 function 앞에 사용 => 해당 함수는 항상 프라미스를 반환  
  프라미스가 아닌 값을 반환하더라도 이행 상태의 프라미스로 값을 감싸 이행된 프라미스가 반환되도록 함

      ```javascript
      async function f() {
          return 1;
      }

      f().then(alert); // 1
      ```

      => 함수 호출 시 result가 1인 이행 프라미스가 반환됨

      ```javascript
      async function f() {
          return Promise.resolve(1);
      }

      f().then(alert); // 1
      ```

      => 1을 `Promise.resolve`로 감싸도 같은 결과 반환

#### await 개념

- await는 async 함수 안에서만 동작
- 프라미스가 처리될 때까지 기다리는 역할 -> 결과는 이후에 반환됨

  ```javascript
  async function f() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("완료!"), 1000);
    });

    let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)

    alert(result); // "완료!"
  }

  f();
  ```

  => 함수를 호출하고, 함수 본문이 실행되는 도중에 \*로 표시한 줄에서 실행이 잠시 중단되었다가 프라미스가 처리되면 실행이 재개됨  
   => 이때 프라미스 객체의 result 값이 변수 result에 할당  
   => 위 예시에서는 1초 후 "완료!"가 출력

- await 는 말 그대로 프라미스가 처리될 때까지 함수 실행을 기다리게 만들고 프라미스가 처리되면 그 결과와 함께 실행이 제개된다.
- 프라미스가 처리되길 기다리는 동안엔 엔진이 다른 일(다른 스크립트 실행, 이벤트 처리 등)을 할 수 있기 때문에 CPU 리소스가 낭비 X

  - await를 사용하지 않으면 데이터를 받아온 시점에 콘솔을 출력할 수 있게 콜백 함수나 `.then()` 등을 사용해야 함
  - `promise.then`보다 가독성이 좋고 쓰기도 쉬움

#### async await 에러 제어

await가 던진 에러는 `try..catch`를 사용해 잡을 수 있음

```javascript
async function f() {
  try {
    let response = await fetch("http://유효하지_않은_주소");
  } catch (err) {
    alert(err); //TypeError
  }
}

f();
```

=> 에러가 발생하면 제어 흐름이 catch 블록으로 넘어감

# 콜백 함수

자바스크립트에서 함수는 객체  
=> 함수의 파라미터(매개변수)로서 객체를 전달할 수 있음

```javascript
function print(callback) {
  callback();
}
```

print() 함수는 다른 함수를 파라미터로 받아서 내부에서 그것을 호출하고 있다.  
다른 함수의 파라미터로써 전달되는 함수를 **콜백 함수**라고 한다.

#### 콜백 함수가 필요한 이유

자바스크립트는 코드를 위에서 아래로 순차적으로 실행, 비동기 프로그래밍

콜백은 태스크가 끝나기 전에 함수가 실행되지 않는 것을 보장 => 즉 태스크가 끝난 직후에 실행  
자바스크립트에서 콜백 함수를 만드는 방법은 어떤 함수의 파라미터로써 함수를 넘기고 어떤 행위나 태스크가 완료된 직후에 콜백 함수를 호출하는 것

#### 콜백 만드는 방법

```javascript
const message = function () {
  console.log("This message is shown after 3 seconds");
};

setTimeout(message, 3000);
```

setTimeout 함수는 주어진 시간 이후에 함수를 호출하거나 표현식을 평가 -> 3초 후 message라는 함수 호출 = message 함수는 어떤 일이 일어나기 전이 아니라 **뒤**에 호출됨

```javascript
setTimeout(function () {
  console.log("This message is shown after 3 seconds");
}, 3000);
```

위 코드는 비동기 함수를 함수 내부에 직접적으로 정의하는 방법

```javascript
setTimeout(() => {
  console.log("This message is shown after 3 seconds");
}, 3000);
```

콜백 함수를 화살표 함수를 사용해 표현할 수 있음

#### 이벤트 처리

자바스크립트는 이벤트 기반 프로그래밍 언어  
콜백 함수를 이벤트 선언을 위해 사용하기도 함

사용자가 버튼을 클릭했을 때 콘솔에 메시지 남기는 경우

```
<button id="callback-btn">Click here</button>
```

```javascript
document.queryselector("#callback-btn").addEventListener("click", function () {
  console.log("User has clicked on the button!");
});
```

첫 번째로 버튼의 id값을 이용하여 버튼을 선택하고 addEventListener 메소드를 사용하여 이벤트 리스너를 추가했음  
이벤트 리스너 함수는 이벤트 타입인 "클릭"과 버튼이 클릭되었을 때 메시지를 남기는 콜백 함수, 총 2개의 파라미터를 필요로 함

# fetch 함수

원격 API를 간편하게 호출할 수 있도록 브라우저에서 `fetch()` 함수를 제공

## fetch 사용법

fetch 함수는 첫번째 이나로 URL, 두번째 인자로 옵션 객체를 받고, Promise 타입의 객체를 반환  
반환된 객체는 API 호출 성공 시 응답(response) 객체를, 실패 시 예외 객체를 reject함

```javascript
fetch(url, options)
  .then((reponse) => console.log("response", response))
  .then((error) => console.log("error", error));
```

- 옵션 객체에는 HTTP 방식(method), HTTP 요청 헤더(header), HTTP 요청 전문(body) 등을 설정할 수 있음
- 응답 객체로부터는 HTTP 응답 상태(status), HTTP 응답 헤더(header), HTTP 응답 전문(body) 등을 읽어올 수 있음

참고로 fetch함수는 브라우저의 window 객체에 소속되어 있기 때문에 `window.fetch()` 로 사용되기도 함

## GET 호출

원격 API에 있는 데이터를 가져올 때 쓰임

`fetch()` 함수는 디폴트로 GET 방식으로 작동하고 GET 방식은 요청 전문을 받지 않기 때문에 옵션 인자가 필요 없음

```javascript
fetch("https://jsonplaceholder.typicode.com/posts/1").then((response) =>
  console.log(response)
);
```

응답 객체를 통해 응답 상태가 200 OK임을 알 수 있음

대부분의 REST API들은 JSON 형태의 데이터를 응답하기 때문에 응답 객체는 `json()` 메서드를 제공

```javascript
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

이 메소드를 호출하면, 응답 객체로부터 JSON 포맷의 응답 전문을 자바스크립트 객체로 변환하여 얻을 수 있음

```javascript
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit↵suscipit recusandae consequuntur …strum rerum est autem sunt rem eveniet architecto"
}
```

## POST 호출

원격 API에서 관리하고 있는 데이터를 생성해야 하면 POST 방식 필요

메서드 옵션을 `POST`로 지정하고, 헤더 옵션을 통해 JSON 포맷을 사용한다고 알려주며 요청 전문을 JSON 포맷으로 직렬화하여 가장 중요한 body 옵션에 설정

```javascript
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

응답 객체를 통해 응답 코드가 `201 Created`임을 알 수 있음

```javascript
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
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

마찬가지 방법으로 응답 객체의 `json()` 메서드를 호출하면 응답 전문을 객체 형태로 얻을 수 있음

```javascript
{title: "Test", body: "I am testing!", userId: 1, id: 101}
```

## PUT, DELETE 호출

원격 API에서 관리하는 데이터의 수정과 삭제를 위해 PUT와 DELETE 방식의 HTTP 호출이 필요

PUT 방식 :

```javascript
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

```javascript
{title: "Test", body: "I am testing!", userId: 1, id: 1}
```

DELETE 방식 : 보낼 데이터가 없으므로 headers와 body 옵션 필요 X

```javascript
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "DELETE",
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

```
{}
```

## 사용성 개선

코드 반복되는 부분 존재 -> async/await 이용하여 개선 가능

```javascript
async function post(host, path, body, headers = {}) {
  const url = `https://${host}/${path}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  };
  const res = await fetch(url, options);
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
}

post("jsonplaceholder.typicode.com", "posts", {
  title: "Test",
  body: "I am testing!",
  userId: 1,
})
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

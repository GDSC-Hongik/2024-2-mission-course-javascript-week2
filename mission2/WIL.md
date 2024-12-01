# 동기, 비동기

**동기**는 직렬적으로 테스크 수행하는 방식
-> 요청 - 응답 - 요청 - 응답 이런방식
응답을 받아야지만 다음 동작이 이루어져서 효율이 저하됨

**비동기**는 병렬적으로 테스크 수행하는 방식
요청 보내고 응답 수락여부 상관없이 다음 테스크가 동작함
효율이 좋음
비동기 요청시 응답 후 처리할 '콜백 함수'를 함께 알려줘서
해당 태스크 완료시 콜백 함수 호출됨

# romise
전통적인 콜백 패턴은 콜백 헬로 인해 가독성이 나쁘고
비동기 처리 중 발생한 에러의 처리가 곤란하며
여러 개의 비동기 처리를 한번에 처리하는 데도 한계가 있음

이걸 보완하여 만든 것이 **promise**
전통적인 콜백 패턴이 가진 단점을 보완하며 비동기 처리 시점을 명확하게 표현할 수 있음
Promise 생성자 함수를 통해 인스턴스화함.
Promise 생성자 함수는 비동기 작업을 수행할 콜백 함수를 인자로 전달받는데
이 콜백 함수는 resolve와 reject 함수를 인자로 전달받음
```
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
Promise는 비동기 처리가 성공(fulfilled)하였는지 또는 실패(rejected)하였는지 등의 상태 정보를 가짐
pending: 비동기 처리가 아직 수행되지 않은 상태
fulfilled: 비동기 처리가 수행된 상태 (성공)
rejected: 비동기 처리가 수행된 상태 (실패)
settled: 비동기 처리가 수행된 상태 (성공 또는 실패, 처리가 끝난걸 강조하기위해 씀)

**Promise 함수 호출 과정**
1. 비동기 함수 내에서 Promise 객체를 생성하고 그 내부에서 비동기 처리를 구현한다. 이때 비동기 처리에 성공하면 resolve 메소드를 호출한다.
2. 이때 resolve 메소드의 인자로 비동기 처리 결과를 전달 하는데, 이 처리 결과는 Promise 객체의 후속 처리 메소드로 전달된다.
3. 만약 비동기 처리에 실패하면 reject 메소드를 호출한다. 이때 reject 메소드의 인자로 에러 메시지를 전달한다. 이 에러 메시지는 Promise 객체의 후속 처리 메소드로 전달된다.

후속처리 메소드는
- then: 두 개의 콜백 함수를 인자로 전달 받는다.
첫 번째 콜백 함수는 성공(fulfilled, resolve 함수가 호출된 상태) 시 호출되고
두 번째 함수는 실패(rejected, reject 함수가 호출된 상태) 시 호출된다.
then 메소드는 Promise를 반환한다
- catch: 예외(비동기 처리에서 발생한 에러와 then 메소드에서 발생한 에러)가 발생하면 호출된다.
catch 메소드는 Promise를 반환한다.

**Promise 체이닝**
프로미스는 후속 처리 메소드인 then이나 catch로 메소드를 체이닝(chainning)하여 여러 개의 프로미스를 연결하여 사용할 수 있다. 이로써 콜백 헬을 해결함
then 메소드가 Promise 객체를 반환하도록 하면(then 메소드는 기본적으로 Promise를 반환한다.) 여러 개의 프로미스를 연결하여 사용할 수 있음
```
promiseAjax('GET', `${url}/1`)
  // 포스트 id가 1인 포스트를 작성한 사용자의 아이디로 작성된 모든 포스트를 검색하고 프로미스를 반환한다.
  .then(res => promiseAjax('GET', `${url}?userId=${JSON.parse(res).userId}`))
  .then(JSON.parse)
  .then(render)
  .catch(console.error);
```

# Async/Await
기존의 비동기 처리 방식인 콜백 함수와 프로미스의 단점을 보완하고 개발자가 읽기 좋은 코드를 작성할 수 있게 도와줌
복잡했던 Promise를 조금 더 편하게 사용할 수 있음
**기본문법**
```
async function 함수명() {
  await 비동기_처리_메서드_명();
}
```

## async 개념
async 키워드는 function 앞에 사용
function 앞에 async를 붙이면 해당 함수는 항상 프로미스를 반환
프로미스가 아닌 값을 반환하더라도 이행 상태의 프로미스(resolved promise)로 값을 감싸 이행된 프로미스가 반환
ex)
```
async function f() {
  return 1;
}

f().then(alert); // 1
```
```
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```
async가 붙은 함수는 반드시 프로미스를 반환, 프로미스가 아니여도 프로미스로 감싸서 반환

## await 개념
async 함수 안에서만 동작
프로미스가 처리될 때 까지 기다리는 역할, 결과는 그 이후 반환
await 사용 안하면 데이터를 받아온 시점에 콘솔을 출력할 수 있게 콜백 함수나 .then() 등을 사용해야 했을 것
promise.then보다 가독성 좋고 쓰기도 쉬움

## async await 에러 제어
await가 던진 에러는 try..catch를 사용해 잡을 수 있다
```
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

**async/await와 promise.then/catch**
async/await을 사용하면 await가 대기를 처리해주기 때문에 .then이 거의 필요하지 않다
.catch 대신 일반 try..catch를 사용할 수 있다는 장점이 있다
문법 제약 때문에 async함수 바깥의 최상위 레벨 코드에선 await를 사용할 수 없다.
그렇기 때문에 관행처럼 .then/catch를 추가해 최종 결과나 처리되지 못한 에러를 다룬다.

# 콜백함수
다른 함수의 파라미터로써 전달되는 함수
```
function print(callback) {
    callback();
}
```

## 왜 필요한가
비동기 처리할 때 코드가 다른 행위가 일어난 뒤에 실행되는 등 순차적으로 실행되지 않음
콜백은 비동기 자바스크립트 코드를 작성할 수 있도록 해주고 여러 문제와 에러들로부터 안전하게 지켜줌

## 방법
```
const message = function() {
    console.log("This message is shown after 3 seconds");
}

setTimeout(message, 3000);
```
message 함수는 어떤 일이 일어나기 전이 아니라 뒤에(여기서는 3초가 지난 후에) 호출
message 함수는 콜백 함수의 예시라고 볼 수 있음
```
setTimeout(function() {
    console.log("This message is shown after 3 seconds");
}, 3000); // 익명함수 ver

setTimeout(() => {
    console.log("This message is shown after 3 seconds");
}, 3000); // 화살표 함수 ver
```

## 사용 원칙
익명 함수를 사용해야 함
- 코드 간결성
- 함수 이름 충돌 방지
화살표 함수 사용
- 코드 더 간결하게
함수의 이름을 넘기기
- 여러 호출 함수에 재활용으로 자주 이용될 경우, 별도로 함수를 정의하고 함수의 이름만 호출 함수의 인자에 전달하는 식으로 사용이 가능
```function introduce (lastName, firstName, callback) {
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

## 예시
​이벤트 리스너로 사용
고차함수에 사용
Ajax 결과값을 받을 때 사용
타이머 실행 함수로 사용
애니메이션 완료

## 주의사항
콜백 함수 내에서 this 키워드를 사용하면, 기대한 대로 작동하지 않을 수가 있음
따라서 콜백 함수 내의 this를 보호할 수 있도록 콜백 함수를 만들어야 함
1. call, bind, apply 메서드 사용
2.  화살표 함수 사용
자세한 예시:
출처: https://inpa.tistory.com/entry/JS-📚-자바스크립트-콜백-함수 [Inpa Dev 👨‍💻:티스토리]

# fetch
첫번째 인자로 URL, 두번째 인자로 옵션 객체를 받고, Promise 타입의 객체를 반환함
반환된 객체는, API 호출이 성공했을 경우에는 응답(response) 객체를 resolve하고, 실패했을 경우에는 예외(error) 객체를 reject함
```
fetch(url, options)
  .then((response) => console.log("response:", response))
  .catch((error) => console.log("error:", error));
```
옵션(options) 객체에는 HTTP 방식(method), HTTP 요청 헤더(headers), HTTP 요청 전문(body) 등을 설정할 수 있음

## GET 호출
fetch() 함수는 디폴트로 GET 방식으로 작동함
옵션 인자가 필요없음
REST API들은 JSON 형태의 데이터를 응답하기 때문에, 응답(response) 객체는 json() 메서드를 제공함
메서드를 호출하면, 응답(response) 객체로 부터 JSON 포맷의 응답 전문을 자바스크립트 객체로 변환하여 얻을 수 있음
```
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

## POST 호출
원격 API에서 관리하고 있는 데이터를 생성해야 한다면 요청 전문을 포함할 수 있는 POST 방식의 HTTP 통신이 필요함
method 옵션을 POST로 지정해주고, headers 옵션을 통해 JSON 포맷을 사용한다고 알려줘야 하며, 요청 전문을 JSON 포맷으로 직렬화화여 가장 중요한 body 옵션에 설정하면
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
```
Response {type: "cors", url: "https://jsonplaceholder.typicode.com/posts", redirected: false, status: 201, ok: true, …}
```
응답 코드가 201 Created인 것을 알 수 있다.
json() 메서드를 호출하면 응답 전문을 객체 형태로 얻을 수 있음

## PUT, DELETE 호출
원격 API에서 관리하는 데이터의 수정과 삭제를 위해서 PUT과 DELETE 방식의 HTTP 호출을 함
PUT 방식은 method 옵션만 PUT으로 설정한다는 점 빼놓고는 POST 방식과 매우 흡사함
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
DELETE 방식에서는 보낼 데이터가 없기 때문에, headers와 body 옵션이 필요가 없음
```
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "DELETE",
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```
## 참고
계속 사용하다보면 똑같은 코드가 반복된다는 것을 느낄 수 있음
뿐만 아니라, 기존에 사용하시던 라이브러리와 비교해봤을 때, fetch() 함수의 Promise 기반의 API가 좀 투박하다고 느낄 수도 있음
이럴 때는 fetch() 함수를 직접 사용하시기 보다는, 본인 입맛에 맞게 별도의 함수나 모듈로 빼서 사용
EX)async/await 키워드를 이용하여 HTTP 방식별로 비동기 함수를 작성하고 모듈
```
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

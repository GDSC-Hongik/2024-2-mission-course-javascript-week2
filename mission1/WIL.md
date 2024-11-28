## HTTP Response와 Request
HTTP는 프론트엔드(클라이언트)와 백엔드(서버) 간의 통신을 위한 프로토콜입니다. 클라이언트는 HTTP 요청을 통해 서버에 필요한 리소스를 요청하고, 서버는 이에 대한 응답을 HTTP 응답 형태로 반환합니다.

## HTTP Method (GET, POST, DELETE, PATCH 등)
HTTP 메서드는 클라이언트가 서버에서 어떤 작업을 수행하고자 하는지를 나타냅니다. 주요 메서드는 아래와 같습니다:

1. GET
- 서버에서 리소스를 가져오기 위한 요청입니다.
2. POST
- 서버에 데이터를 전송하여 새로운 리소스를 생성하거나 서버의 상태를 변경합니다.
3. PUT
- 서버에 데이터를 전송하여 리소스를 업데이트하거나 새로 생성합니다.
4. DELETE
- 서버의 특정 리소스를 삭제합니다.
5. PATCH
- 리소스의 일부를 업데이트합니다.

## HTTP Status (200, 404 등)
HTTP 상태 코드는 서버가 클라이언트 요청을 처리한 결과를 나타냅니다. 숫자로 된 3자리 코드로 구성되며, 상태에 따라 다음과 같이 구분됩니다:

1. 1xx: 정보성 응답 (Informational Responses)
: 클라이언트의 요청을 처리 중임을 나타냅니다.
- 100 Continue: 클라이언트가 요청을 계속 진행할 수 있음을 나타냅니다.
- 101 Switching Protocols: 프로토콜 전환이 진행 중임을 알립니다.
2. 2xx: 성공 (Successful Responses)
: 요청이 성공적으로 처리되었음을 나타냅니다.
- 200 OK: 요청이 성공적으로 처리되었습니다.
- 201 Created: 요청에 의해 리소스가 성공적으로 생성되었습니다.
- 204 No Content: 요청은 성공했지만 반환할 콘텐츠가 없습니다.
3. 3xx: 리디렉션 (Redirection Responses)
: 요청한 리소스가 다른 위치로 이동되었음을 나타냅니다.
- 301 Moved Permanently: 리소스가 영구적으로 이동되었음을 알립니다.
- 302 Found: 임시로 다른 URI로 리소스를 제공함을 나타냅니다.
- 304 Not Modified: 클라이언트가 캐시된 버전을 사용할 수 있음을 나타냅니다.
4. 4xx: 클라이언트 오류 (Client Error Responses)
: 클라이언트의 요청이 잘못되었음을 나타냅니다.
- 400 Bad Request: 잘못된 요청입니다.
- 401 Unauthorized: 인증이 필요합니다.
- 403 Forbidden: 권한이 없어 접근할 수 없습니다.
- 404 Not Found: 요청한 리소스를 찾을 수 없습니다.
5. 5xx: 서버 오류 (Server Error Responses)
: 서버가 요청을 처리하는 데 실패했음을 나타냅니다.
- 500 Internal Server Error: 서버 내부에서 오류가 발생했습니다.
- 502 Bad Gateway: 게이트웨이 또는 프록시 서버가 잘못된 응답을 받았습니다.
- 503 Service Unavailable: 서버가 현재 요청을 처리할 수 없습니다.
- 504 Gateway Timeout: 게이트웨이 또는 프록시 서버가 응답을 기다리다 시간이 초과되었습니다.

import React from 'react';
import { Link } from 'react-router-dom';

function Blog(props) {
    return (
        <>
            <h1>블로급니다</h1>
            <Link to="/">
                <button>돌아가기</button>
            </Link>
            <div>
                <a href="https://yjhzz.tistory.com/">개발블로그</a>
            </div>
            <div>
                <a href="https://blog.naver.com/yjh_zz">일기블로그</a>
            </div>
        </>
    );
}

export default Blog;
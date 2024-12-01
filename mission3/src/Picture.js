import React from 'react';
import { Link } from 'react-router-dom';
import myStarPhoto1 from './assets/myStarPhoto1.jpg'
import myStarPhoto2 from './assets/myStarPhoto2.jpg'
import styles from "./Main.module.css"

function Picture() {
    return (
        <div className={styles.backgr}>
            <h1 className={styles.white}>개밥바라기 별 사진전입니다</h1>
            <Link to="/">
                <button className={styles.button2}>돌아가기</button>
            </Link>
            <div>
                <img
                src={myStarPhoto1}
                alt='뭐'
                width="490px"
                height="400px">
                </img>
                <p className={styles.white}>&lt;비틀즈가 되고 싶었지만 별이 된&gt; 윤장현, 4899x4000, 2024.6</p>
            </div>
            <div>
                <img
                src={myStarPhoto2}
                alt='뭐'
                width="396px"
                height="594px">
                </img>
                <p className={styles.white}>&lt;별을 등지고 가오를&gt; 윤장현, 3968x5949, 2024.11</p>
            </div>
        </div>
    );
}

export default Picture;
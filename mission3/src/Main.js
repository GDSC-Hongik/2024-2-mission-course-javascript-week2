import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Main.module.css"

function Main() {
    return (
        <div className={styles.backgr}>
            <h1 className={styles.white}>어서옵쇼! 윤장현의 페이집니다</h1>
            <div className={styles.frontier}>블로그 버튼(아래)</div>
            <Link to="/blog">
                <button className={styles.button}>
                    윤장현의 블로그!
                </button>
            </Link>
            <div className={styles.frontier}>사진첩 버튼(아래)</div>
            <Link to ="/picture">
                <button className={styles.button}>
                    윤장현의 사진집
                </button>
            </Link>
        </div>
    );
}

export default Main;
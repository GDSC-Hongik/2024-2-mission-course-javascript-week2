/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function Blog(){
    return (
        <div
        css={css`
            text-align: center;
            background: linear-gradient(180deg,black,yellow);
            padding: 22% 10%;
        `}>
            <button
            css={css`
                border: solid;
                border-radius: 10px;
                background: yellow;
                width: 100px;
                height: 50px;
                font-size: 20px;
            `}>
                <a href="https://velog.io/@tablemin2/posts">Blog</a>
            </button>
        </div>
    )
}

export default Blog
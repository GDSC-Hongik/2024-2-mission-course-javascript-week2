/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import tenet from './tenet.jpg';

function Picture(){
    return (
        <div 
        css={css`
            text-align: center;
            background: linear-gradient(180deg,black,yellow);
            padding: 5%;
            height: 200%;
        `}>
            <img src={tenet} alt="TENET" width="400" />
        </div>
    )
}

export default Picture
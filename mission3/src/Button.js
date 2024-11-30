/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from 'react';
import {Link} from 'react-router-dom';

const Button = (props) => (
    <header>
        <div 
        css={css`
            text-align: center;
            background: linear-gradient(180deg,black,yellow);
            padding: 13% 10%;
            

            h1{
            font-size: 100px;
            color: black;
            }

            button{
            border: solid;
            border-radius: 10px;
            background: yellow;
            width: 100px;
            height: 50px;
            font-size: 20px;
            }
        `}>
            <h1 className='logo'>MainPage</h1>
            <ul>
                <button>
                    <Link to ="/picture">Picture</Link>
                </button>
                <button>
                    <Link to ="/blog">Blog</Link>
                </button>
            </ul>
        </div>
    </header>
)

export default Button
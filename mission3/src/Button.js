import React from 'react';
import {Link} from 'react-router-dom';

const Button = (props) => (
    <header>
        <div className='container'>
            <h1 className='logo'>logo</h1>
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
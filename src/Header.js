import React from 'react';

import Img from './images/troll.jpg'

function Header(){
    return(
        //  we add a trollface image by inserting an <img> tag and setting the src to the image's URL
        <header>
            <img src={Img}
            alt="Problem?" />
        </header>
    );
}

export default Header;
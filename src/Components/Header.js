import React from 'react';
import textLogo from '../img/Logo.png'

function Header(){
    return(
        <div className='headerBanner'>
        <img className='headerLogo' src={textLogo} alt='climateLogo' unselectable='on'/>
        </div>
    )
}

export default Header
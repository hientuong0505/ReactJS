import React, { useState } from 'react';

import './ColorBox.scss';

ColorBox.propTypes = {
    
};

function getRandomColor() {
    //Array COLOR LIST
    const COLOR_LIST = ['deeppink','green','yellow','black','blue'];

    //get random number of string LIST COLOR
    const randomIndex = Math.trunc(Math.random() * COLOR_LIST.length);

    return COLOR_LIST[randomIndex];
}

function ColorBox() {

    const [color, setColor] = useState(() => {
        const initialColor = localStorage.getItem('box_color') || 'deeppink';
        return initialColor;
    });

    function handleBoxClick() {
        //Get random color -> set color changing state
        const newColor = getRandomColor();
        setColor(newColor);
        localStorage.setItem('box_color', newColor);
    }

    return (
        <div 
            className="color-box" 
            style={{backgroundColor: color}}
            onClick ={handleBoxClick}
        >
            
        </div>
    );
}

export default ColorBox;
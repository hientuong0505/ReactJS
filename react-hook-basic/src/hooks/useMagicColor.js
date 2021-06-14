import React, {
    useState,
    useEffect,
    useRef
} from "react";

function randomColor(currentColor) {
    const COLOR_LIST = ["red", "green", "yellow", "pink"];
    const currentIndex = COLOR_LIST.indexOf(currentColor);
    let newIndex = currentIndex;
    while (currentIndex === newIndex) {
        //random 0->3
        newIndex = Math.trunc(Math.random() * COLOR_LIST.length);
    }

    console.log(COLOR_LIST[newIndex]);
    return COLOR_LIST[newIndex];
}

function useMagicColor() {
    const [color, setColor] = useState("black");
    const colorRef = useRef("black");

    //Change color every 1s
    useEffect(() => {
        const colorInterval = setInterval(() => {
            const newColor = randomColor(colorRef.current);
            setColor(newColor);

            colorRef.current = newColor;
        }, 2000);

        //Clear
        return () => {
            clearInterval(colorInterval);
        };
    }, []);

    return color;
}

export default useMagicColor;
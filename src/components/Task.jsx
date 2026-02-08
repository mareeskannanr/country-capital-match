import React, { useState } from "react";

export default function Task({ data }) {
    let checkMap = {};
    let initState = {
        buttons: [],
        colors: {},
        selectedItems: []
    };

    for (let item in data) {
        checkMap[item] = data[item];
        checkMap[data[item]] = item;
        initState.buttons.push(item, data[item]);
        initState.colors[item] = '#fff';
        initState.colors[data[item]] = '#fff';
    }

    const randomizeArray = (random, array) => {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    };

    randomizeArray(Math.random, initState.buttons);

    const [state, setState] = useState(initState);
    const handleClick = label => {
        let { selectedItems, buttons, colors }  = state;
        if (selectedItems.includes(label)) {
            return;
        }

        if (selectedItems.length === 0) {
            colors[label] = '#00f';
            selectedItems.push(label);
        } else if (selectedItems.length === 1) {
            if (checkMap[label] != selectedItems[0] && checkMap[selectedItems[0]] != label) {
                colors[label] = '#f00';
                colors[selectedItems[0]] = '#f00';
            } else {
                buttons = buttons.filter(item => item != label && item != selectedItems[0]);
            }
            selectedItems.push(label);
        } else if (selectedItems.length === 2) {
            for (let item of selectedItems) {
                colors[item] = '#fff';
            }
            selectedItems = [label];
            colors[label] = '#00f';
        }

        console.log(colors, selectedItems, buttons);
        setState({...state, colors, selectedItems, buttons});
    };


    return (
        <>
            {
                (state.buttons.length === 0) ? (
                    <p>Congartulations!</p>
                ) : (
                    <div>
                        {
                            state.buttons.map(item => (<button key={item} type="button" style={{
                                backgroundColor: state.colors[item],
                                border: '1px solid #000',
                                margin: '5px'
                            }} onClick={() => handleClick(item)}>{item}</button>))
                        }
                    </div>
                )
            }
        </>
    );
}
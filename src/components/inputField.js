import React from 'react';

export function InputField(props) {

    const splitAndSetArray = (stringToSplit) => {
        const splitChar = " "; //TODO: /[.,/ -]/;
        props.onChange(stringToSplit.split(splitChar));
    }

    const handleChange = (e) => {
        if(props.doSplit){
            splitAndSetArray(e.target.value);
        }else {
            props.onChange(e.target.value);
        }
    };

    return (
        <label>
            <input value={props.value} onChange={handleChange} placeholder={props.name} />
        </label>
    )
}
import React from 'react';

export function InputField(props) {

    const normalizeInput = (stringToNormalize) => {
        return stringToNormalize.replace(/[.,/-]/g," ").replace(/\s\s+/g," ");
    }

    return (
        <label>
            <input 
            name={props.name}
            ref={props.register}
            placeholder={props.placeholder} 
            onChange = { (e) => { 
                if(props.doNormalize) {
                const {value} = e.target;
                e.target.value = normalizeInput(value)
            }
            }}
            />
        </label>
    )
}
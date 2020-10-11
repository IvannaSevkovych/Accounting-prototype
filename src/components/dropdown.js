import React, { useState, useEffect } from 'react';

export function Dropdown(props) {

     // State stuff
    const [items, setItems] = useState([]);
    
    // Run once when the component mounts
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}${props.endpoint}`)
            .then(response => response.json())
            .then(data => {
                setItems(data);
            });
    }, [props.endpoint]);



    if (items.length > 0) {

        const {register, required} = props;
        
        return (
            <label>
                <select name={props.name} placeholder={props.placeholder} ref={register()}>
                    <option value="" hidden>{props.placeholder}</option>
                    {
                        items.map(
                            item => {
                                const key = Object.keys(item)[0];
                                const data = item[key];
                                return (<option key={data} value={data}>{data.toLowerCase()}</option>);
                            }
                        )
                    }
                </select>
            </label>
        )
    } else {
        return (
            <label>
                <select value="" readOnly></select>
            </label>
        );
    }

}
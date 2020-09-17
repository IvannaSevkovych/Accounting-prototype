import React, { useState, useEffect } from 'react';
import IosArrowDown from 'react-ionicons/lib/IosArrowDown'

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

    
    // Helper wrapper function
    const handleChange = (e) => {
        props.onChange(e.target.value);
    }


    if (items.length > 0) {
        
        return (
            <label>
                <select placeholder={props.name} value={props.value} onChange={handleChange} >
                    <option value={undefined} disabled selected hidden>{props.name}</option>
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
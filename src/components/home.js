import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function Home(props) {
    // State stuff
    const [mode, setMode] = useState("");

    // Run once when the component mounts
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/ping`)
        .then(response => response.json())
        .then(mode => {
            setMode(mode.mode);
        });
    }, [])

    return (
        <div className="Home">
            <h1>Hello Sevkovych!</h1>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <p>({mode} mode)</p>
        </div>
    )
}
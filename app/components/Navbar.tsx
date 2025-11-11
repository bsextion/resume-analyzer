import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router";
import {usePuterStore} from "~/lib/puter";

const Navbar = () => {
    const {auth} = usePuterStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated ) {
            navigate('/');
        }
    }, [auth.isAuthenticated]);

    return (
        <nav className="navbar">
            <Link to="/">
                <p className="text-2xl font-bold text-gradient"> Resume Analyzer</p>
            </Link>
            {auth.isAuthenticated &&
            <Link to="/">
                <button className="primary-button w-fit" onClick={auth.signOut}> Log Out</button>
            </Link>
            }
        </nav>
    );
};

export default Navbar;
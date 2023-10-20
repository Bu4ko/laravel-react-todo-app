import React, { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentToken, setLogOut } from "../../app/redux/authSlice"
import { useLogoutMutation } from "../../app/redux/api/authApiSlice"
import { clearListsState } from "../../app/redux/todoSlice"
import { apiSlice } from "../../app/redux/api/apiSlice"

function Header() {
    const token = useSelector(selectCurrentToken)
    const [logout] = useLogoutMutation()
    const dispatch = useDispatch()

    const location = useLocation();
    const notAuthenticatedLinks = [
        {
            "name": "Home",
            "url" :"/",
        },
        {
            "name": "Login",
            "url" :"/login",
        },
        {
            "name": "Register",
            "url" :"/register",
        },

    ];
    const authenticatedLinks = [
        {
            "name": "UserLists",
            "url" :"/lists",
        },
    ];

    useEffect(() => {
        notAuthenticatedLinks.map((notAuthLink)=>{
            if(notAuthLink.url === location.pathname) {
                document.title = notAuthLink.name;
            }
        });
    }, [])

    useEffect(() => {
        authenticatedLinks.map((authLink)=>{
            if(authLink.url === location.pathname) {
                document.title = authLink.name;
            }
        });
    }, [])

    const handleLogout = async () => {
        try {
            const result = await logout().unwrap()
            if (result.message === 'Logged out') {
                dispatch(clearListsState())
                dispatch(setLogOut())
                dispatch(apiSlice.util.resetApiState())
            } else {
                alert('Error')
            }
        } catch (err) {
            alert(err)
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {
                        token ? (authenticatedLinks.map((page, key) => {
                            return (
                                <div key={key}>
                                    <li className={`nav-item ${location.pathname == page.url ? 'active' : ''}`}>
                                        <Link to={page.url} className="nav-link">{page.name}</Link>
                                    </li>
                                </div>
                            )
                        }))
                        : (notAuthenticatedLinks.map((page, key) => {
                            return (
                                <div key={key}>
                                    <li className={`nav-item ${location.pathname == page.url ? 'active' : ''}`}>
                                        <Link to={page.url} className="nav-link">{page.name}</Link>
                                    </li>
                                </div>
                            )
                        }))
                    }
                    {
                        token ? (
                            <div key={'logout'}>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={(e) => { e.preventDefault(); handleLogout(); }}href="#">Logout</a>
                                </li>
                            </div>
                        )
                            : ''
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Header;

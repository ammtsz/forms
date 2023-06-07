import React, { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { mount } from 'auth/AuthApp'


export default ( { onSignIn } ) => {
    const ref = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()

    let handleParentNavigate

    useEffect(() => {
        const { onParentNavigate } = mount( ref.current, { 
            onSignIn,
            initialPath: location.pathname,
            onNavigate: ( { pathname: nextPathname }) => {
                const { pathname } = location
                
                if(pathname !== nextPathname) {
                    navigate(nextPathname)
                }
            },
        })

        handleParentNavigate = onParentNavigate
    }, [])

    useEffect(() => {
        handleParentNavigate()
    }, [location])

    return <div ref={ref} />
}
import React, { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { mount } from 'forms/FormsApp'


export default () => {
    const ref = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()
    let handleParentNavigation

    useEffect(() => {
        const { onParentNavigate } = mount( ref.current, {
            initialPath: location.pathname,
            onNavigate: ( { pathname: nextPathname }) => {
                const { pathname } = location
                
                if(pathname !== nextPathname) {
                    navigate(nextPathname)
                }
            },
        })

        handleParentNavigation = onParentNavigate

    }, [])

    useEffect(() => {
        handleParentNavigation()
      }, [location]);
    

    return <div ref={ref} />
}
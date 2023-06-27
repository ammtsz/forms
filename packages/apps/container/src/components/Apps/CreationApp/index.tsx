import FormCreationPage from "creation/CreationPage";

export default FormCreationPage

// import { useRef, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// import { mount } from "../../../../creation/src/main"

// interface Root {
//     render: (element: React.ReactElement) => void;
//   }
  
// interface FormCreationProps {
// root: Root;
// }
  
// export const FormCreation: React.FC = () => {
//     const ref = useRef(null)
//     const navigate = useNavigate()
//     const location = useLocation()

//     useEffect(() => {
//         if(ref.current) {
//             const { onParentNavigate } = mount( ref.current, {
//                 initialPath: location.pathname,
//                 onNavigate: ( { location: {pathname: nextPathname} }) => {
//                     const { pathname } = location
                    
//                     if(pathname !== nextPathname) {
//                         navigate(location)
//                     }
//                 },
//             })
            
//             onParentNavigate({pathname: location.pathname})
//         }
//     }, [location, navigate])

//     return ref.current ? <div ref={ref} /> : <div>CREATION</div>
// }

// export default FormCreation
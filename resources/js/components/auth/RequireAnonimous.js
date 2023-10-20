import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../../app/redux/authSlice"

const RequireAnonimous = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()

    return (
        !token
            ? <Outlet />
            : <Navigate to="/lists" state={{ from: location }} replace />
    )
}
export default RequireAnonimous
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Loading from '../components/Loading.jsx'

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();

    if(loading) return <Loading />
    if (!loading && !isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />
};

export default ProtectedRoute;
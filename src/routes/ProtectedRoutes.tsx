import { Navigate, Outlet, RouteProps } from "react-router-dom";
import { useAuth } from "../context/auth.context";

interface CustomRouteProps {
  path?: string;
  element?: React.ReactNode;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  end?: boolean;
  location?: any;
}

export const ProtectedRoute: React.FC<CustomRouteProps> = () => {
  const { refreshToken } = useAuth();

  const refreshTokenLocal = localStorage.getItem("refreshToken");

  return refreshToken && refreshTokenLocal ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

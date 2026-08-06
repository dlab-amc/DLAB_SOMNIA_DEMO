import { useEffect } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAppSelector } from "./useRedux";

const useRedirect = () => {
  const token = useAppSelector((state) => state.userSlice.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // Redirect Logic
  }, []);
};
export default useRedirect;

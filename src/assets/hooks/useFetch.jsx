import { useEffect } from "react";
import axios from "axios";
import { useAppDispatch } from "./useRedux";
import { setLoading } from "../../stores/common/common.slice";

const useGetFetch = (path, headers = {}, params = {}) => {
  // EX) path = '/user/list' / headers = {Authorization: ~~} / params: {key: value, key: value, ...}
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    dispatch(setLoading(true));
    try {
      const response = axios.get(
        `${process.env.REACT_APP_ENDPOINT_URL}${path}`,
        {
          headers: headers || {},
          params: params || {},
        }
      );
      dispatch(setLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setLoading(false));
      return error;
    }
  };

  useEffect(() => {
    if (!path) return;
    return fetchData();
  });
};

const usePostFetch = (path, headers = {}, body) => {
  // EX) path = '/user/list' / headers = {Authorization: ~~} / body: {key: value, key: value, ...}
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    dispatch(setLoading(true));
    try {
      const response = axios.post(
        `${process.env.REACT_APP_ENDPOINT_URL}${path}`,
        body,
        {
          headers: headers || {},
        }
      );
      dispatch(setLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setLoading(false));
      return error;
    }
  };

  useEffect(() => {
    if (!path || !body) return;
    return fetchData();
  });
};

export { useGetFetch, usePostFetch };

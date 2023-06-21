import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import axiosClient from "../config/axios";

export const useAuth = ({middleware, url}) =>
{
  const token = localStorage.getItem('AUTH_TOKEN');
  const navigate = useNavigate();

  const { data: user, error, mutate } = useSWR('api/user', () =>
    axiosClient('/api/user',
      {
        headers: 
        {
          Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
        }
      }
    )
    .then(res => res.data)
    .catch(error => 
    {
      localStorage.removeItem('AUTH_TOKEN');
      throw Error(error?.response?.data?.errors);
    }
  ));

  const login = async (user, setErrors) =>
  {
    try 
    {
      const { data } = await axiosClient.post('/api/login', user);
      localStorage.setItem('AUTH_TOKEN', data.token);
      setErrors([]);
      await mutate();
    } 
    catch (error) 
    {
      setErrors(Object.values(error.response.data.errors));
    }
  }

  const register = async (user, setErrors) =>
  {
    try 
    {
      const { data } = await axiosClient.post('/api/register', user);
      localStorage.setItem('AUTH_TOKEN', data.token);
      setErrors([]);
      await mutate();
    } 
    catch (error) 
    {
      setErrors(Object.values(error.response.data.errors));
    }
  }

  const logout = async () =>
  {
    try 
    {
      await axiosClient.post('/api/logout', null,
      {
        headers: 
        {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem('AUTH_TOKEN');
      await mutate(undefined);
    } 
    catch (error) 
    {
      throw Error(error?.response?.data?.errors);
    }
  }

  useEffect(() =>
  {
    if(middleware === 'guest' && url && user)
    {
      navigate(url);
    }

    if(middleware === 'auth' && error)
    {
      navigate('/login');
    }

    if(middleware === 'auth' && !token)
    {
      navigate('/login');
    }
  },
  [user, error, token]);

  return{
    login,
    register,
    logout,
    user,
    error,
  }
}
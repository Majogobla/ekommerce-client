import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import Swal from 'sweetalert2';
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
      axiosClient.defaults.headers.Authorization = `Bearer ${data.token}`;
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

  const editUser = async (userEdited) =>
  {
    try 
    {
      await axiosClient.patch('/api/user', userEdited);
      await mutate();

      Swal.fire(
        'Ok',
        'You information has been updated',
        'success'
      );
    } 
    catch (error) 
    {
      Swal.fire(
        {
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong!'
        }
      );
    }
    finally
    {
      navigate('/user');
    }
  }

  const editImage = async (image) =>
  {
    try 
    {
      const {data} = await axiosClient.post('/api/user', image);
      
      await mutate();

      Swal.fire(
        'Ok',
        data.message,
        'success'
      );
    } 
    catch (error) 
    {
      Swal.fire(
        {
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong!'
        }
      );
    }
    finally
    {
      navigate('/user');
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
    editUser,
    editImage,
  }
}
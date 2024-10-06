import CommonForm from '@/components/common/form';
import { useToast } from '@/components/hooks/use-toast';
import { loginFormControls } from '@/config'
import { loginUser } from '@/store/auth-slice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
};

const AuthLogin = () => {
  const {toast} = useToast();
  const[formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        
      }
      else{
        toast({
          title: data.payload.message,
          variant: 'destructive',
        });
      }
    })
  }

  return (
    <div className="w-full mx-auto max-w-md space-y-6">
      <div className="text-center">

        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your Account</h1>
        <p className="mt-2">
          Don't have an account
          <Link className='font-medium ml-2 text-primary hover:underline' to="/auth/register">Register</Link>
        </p>
      </div>

      <CommonForm
        formControls={loginFormControls}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />

    </div>
  )
}

export default AuthLogin

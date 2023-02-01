import { useEffect, useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { signInUser } from './accountSlice';
import { useAppDispatch, useAppSelector } from '../../Store/hook';
import { MDBBtn, MDBCheckbox, MDBCol, MDBIcon, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';



export default function LogIn() {
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm<MyInputTypes>();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const dispatch = useAppDispatch();
  

    interface MyInputTypes {
        username: string;
        password: string;
    }  
    async function submitForm(data: FieldValues) {
        try {
            await dispatch(signInUser(data));
            history.push('/Home');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>


            <div className="App d-flex justify-content-center m-5 ">
                <div className="home w-25 p-3 m-5">


                    <h1 className='mb-3'>LOG IN</h1>
                    <div className="card">

                        <Box component="form" className="box-card" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Username"
                                autoFocus
                                {...register('username', { required: "UserName is required", minLength: 4 })}
                                error={!!errors.username}
                                helperText={errors?.username?.message}

                            />

                            <TextField
                                margin="normal"
                                fullWidth
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', { pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).*$/ })}
                                error={!!errors.password}
                                helperText={errors?.password ? 'Password must contain a uppercase letter, number and special character' : ''}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />


                            <MDBRow className='mb-4'>
                                <MDBCol className='d-flex justify-content-center'>
                                    <MDBCheckbox className='bg-success' id='form1Example3' label='Remember me' defaultChecked />
                                </MDBCol>
                                <MDBCol>
                                    <a href='#!'>Forgot password?</a>
                                </MDBCol>
                            </MDBRow>

                            <MDBBtn type='submit' className='bg-success' block>
                                Sign in
                            </MDBBtn>
                            <div className='text-center m-2'>
                                <p>
                                    Not a member? <a href='#!'>Register</a>
                                </p>
                                <p>or sign up with:</p>

                                <MDBBtn floating color="secondary" className='mx-1'>
                                    <MDBIcon fab icon='facebook-f' />
                                </MDBBtn>

                                <MDBBtn floating color="secondary" className='mx-1'>
                                    <MDBIcon fab icon='google' />
                                </MDBBtn>

                                <MDBBtn floating color="secondary" className='mx-1'>
                                    <MDBIcon fab icon='twitter' />
                                </MDBBtn>

                                <MDBBtn floating color="secondary" className='mx-1'>
                                    <MDBIcon fab icon='github' />
                                </MDBBtn>
                            </div>
                        </Box>

                    </div>
                </div>
            </div>
        </>
    );
}


import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { IconButton, InputAdornment, Paper } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../API/agent';
import React, { useState } from 'react';
import { User } from '../../models/user';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Register() {
    const history = useHistory();
    const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    });

    const [allAccounts, setAllAccounts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    React.useEffect(() => {
        agent.Account.getAll()
            .then((response) => {
                setAllAccounts(response);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);
    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Password')) {
                    setError('password', { message: error })
                } else if (error.includes('Email')) {
                    setError('email', { message: error })
                } else if (error.includes('Username')) {
                    setError('username', { message: error })
                }
            });
        }
    }
    const usernameExists = (username: string) => allAccounts.some((account: User) => account.username === username);
    const emailExists = (email: string) => allAccounts.some((account: User) => account.email === email);

    return (
        <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>

            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form"
                onSubmit={handleSubmit((data) => {
                    const { username, email } = data;
                    if (usernameExists(username)) {
                        setError('username', { message: 'Username already exists' });
                    } else if (emailExists(email)) {
                        setError('email', { message: 'Email already exists' });
                    } else {
                        agent.Account.register(data)
                            .then(() => {

                                history.push('/login');
                            })
                            .catch(error => handleApiErrors(error))
                    }
                })}
                noValidate sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    autoFocus
                    {...register('username', {
                        required: 'Username is required',
                        minLength: {
                            value: 4,
                            message: 'Username must be at least 4 characters long'
                        }, validate: value => {
                            if (usernameExists(value)) {
                                return 'Username already exists';
                            }
                        }
                    })}
                    error={!!errors.username}
                    helperText={errors?.username?.message?.toString()}

                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Email address"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^\w+[\w-.]*@\w+((-\w+)|(\w*)).[a-z]{2,3}$/,
                            message: 'Not a valid email address'
                        },
                        validate: value => {
                            if (emailExists(value)) {
                                return 'Email already exists';
                            }
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors?.email?.message?.toString()}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { 
                        required: 'Password is required',
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).*$/,
                            message: 'Password should be more complex'
                        }    
                    })}
                     error={!!errors.password}
                     helperText={errors?.password?.message?.toString()}
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

                <LoadingButton
                    disabled={!isValid}
                    loading={isSubmitting}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to='/login'>
                            {"Already have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
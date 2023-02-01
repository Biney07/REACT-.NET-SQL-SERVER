import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../API/agent';


export default function Register() {
    const history = useHistory();
    const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    });

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

    return (
        <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form"
                onSubmit={handleSubmit((data) =>
                    agent.Account.register(data)
                        .then(() => {
                         
                            history.push('/login');
                        })
                        .catch(error => handleApiErrors(error))
                )}
                noValidate sx={{ mt: 1 }}
            >
                <TextField
                      margin="normal"
                      fullWidth
                      label="Username"
                      autoFocus
                      {...register('username', { required: "UserName is required", minLength: 4 })}
                      error={!!errors.username}
                      helperText={errors?.username?  "UserName is required": ''}

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
                        } 
                    })}
                    error={!!errors.email}
                    helperText={errors?.email? ' Not a valid email address':''}
                />
                <TextField
                     margin="normal"
                     fullWidth
                     label="Password"
                     type="password"
                     {...register('password', { pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).*$/ })}
                     error={!!errors.password}
                     helperText={errors?.password ? 'Password must contain a uppercase letter, number and special character' : ''}
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
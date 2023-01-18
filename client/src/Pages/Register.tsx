
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import { MDBBtn, MDBCheckbox, MDBCol, MDBIcon, MDBInput, MDBListGroupItem, MDBRow } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Register() {

    const [vlerat, setValue] = useState({
        username: "",
        email: "",
        password: "",

    })
    useEffect(() => {
        console.log("vlerat changed:", vlerat);
    }, [vlerat]);

    function handleChange(event: any) {
        const { name, value } = event.target;
        setValue({
            ...value,
            [name]: value
        })

    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const res = await axios.post('https://localhost:7226/register', { Email: "as@gmail.com", UserName: "BINEEEY", Password: "Albin2002@" });
        console.log(res.data);
        // handle successful login

        // handle login error
    }


    return (
        <>

            <div className="App d-flex justify-content-center m-5 ">
                <div className="home w-25 p-3 m-5">
                    {/* {users.map(product => (
                        <li key={product.id}>{product.name}</li>
                    ))} */}

                    <h1 className='mb-3'>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <MDBInput className='mb-4' name="email" onChange={handleChange} value={vlerat.email} id='form1Example2' label='Email' />
                        <MDBInput className='mb-4' name="username" onChange={handleChange} value={vlerat.username} id='form1Example2' label='UserName' />
                        <MDBInput className='mb-4' name="password" onChange={handleChange} value={vlerat.password} type='password' id='form1Example2' label='Password' />

                        <MDBRow className='mb-4'>
                            <MDBCol className='d-flex justify-content-center'>
                                <MDBCheckbox className='bg-success' id='form1Example3' label='Remember me' defaultChecked />
                            </MDBCol>
                            <MDBCol>
                                <a href='#!'>Forgot password?</a>
                            </MDBCol>
                        </MDBRow>

                        <MDBBtn type='submit' className='bg-primary' block>
                            Register
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
                    </form>
                </div>
            </div></>
    );
}




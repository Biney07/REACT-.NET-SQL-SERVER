import React, { useEffect, useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


import { MDBBtn, MDBCheckbox, MDBCol, MDBIcon, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import axios from 'axios';
import Biney from './Biney';

export default function LogIn() {
    const [values, setValue] = useState({
        username: "",
        password: "",

    })
    useEffect(() => {
        console.log("values changed:", values);
    }, [values]);

    function handleChange(event: any) {
        const { name, value } = event.target;
        setValue({
            ...value,
            [name]: value
        })

    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/login', values);
            console.log(res.data);
            // handle successful login
        } catch (error) {

        }
        // handle login error
    }




    return (
        <>
            <Biney/>
            <div className="App d-flex justify-content-center m-5 ">
                <div className="home w-25 p-3 m-5">
                    {/* {users.map(product => (
                        <li key={product.id}>{product.name}</li>
                    ))} */}

                    <h1 className='mb-3'>LOG IN</h1>
                    <form onSubmit={handleSubmit}>

                        <MDBInput className='mb-4' name="username" onChange={handleChange} value={values.username} label='UserName' />
                        <MDBInput className='mb-4' name="password" onChange={handleChange} value={values.password} type='password' label='Password' />

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
                    </form>
                </div>
            </div></>
    );
}



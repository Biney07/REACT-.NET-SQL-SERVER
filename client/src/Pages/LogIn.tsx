import React, { useEffect, useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Route } from 'react-router-dom'

import { MDBBtn, MDBCheckbox, MDBCol, MDBIcon, MDBInput, MDBListGroupItem, MDBRow } from 'mdb-react-ui-kit';
import { User } from '../User';



function LogIn() {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        fetch('https://localhost:7226/api/User')
            .then(response => response.json())
            .then(data => setUsers(data))
    }, [])

    function addProduct() {
        setUsers(prevState => [...prevState, { name: 'product' }])
    }
    return (
        <>

            <div className="App d-flex justify-content-center m-5 ">
                <div className="home w-25 p-3 m-5">
                    {users.map(product => (
                        <li key={product.id}>{product.name}</li>
                    ))}

                    <h1 className='mb-3'>LOG IN</h1>
                    <form>

                        <MDBInput className='mb-4' type='email' name="Email" id='form1Example2' label='Email' />
                        <MDBInput className='mb-4' type='password' name="Password" id='form1Example2' label='Password' />

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

export default LogIn;

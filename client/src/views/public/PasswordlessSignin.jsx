import { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { route } from '@/routes';
import AuthContext from '@/context/AuthContext.jsx';
import Layout from '@/components/public/Layout.jsx';


export default function PasswordlessSignin() {
    const { setUser, setAuthTokens } = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();
    const username = params.username;
    const token = params.token;

    // const passwordlessSignin = async (email, password, token) => {
    //     const response = await fetch(`http://127.0.0.1:8000/api/passwordless-signin/${ username }/${ token }`, {
    //         method: 'POST', 
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }, 
    //         // body: JSON.stringify({
    //         //     email,
    //         //     password, 
    //         //     token
    //         // })
    //     })

    //     if (response.status == 200) {
    //         console.log('Password reset.');
    //         navigate(route('home.index'));
    //     } else {
    //         console.log(response.status);
    //         console.log(response);
    //         // console.log('Something went wrong!');
    //         // console.log(`'An Error Occured ' + ${response.status} + ': Check the password (ensure alphanumeric password not less than 15 characters). You should also check the other details you entered.'`)
    //     }
    // }

    useEffect(() => {
        // fetch("api url").then((res)=>console.log(res));
        const url = `http://127.0.0.1:8000/api/passwordless-signin/${ username }/${ token }`;

        fetch(url, { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'} 
            })
            .then(response => {
                if (response.status == 200) {
                    console.log('Logged in');
                    console.log(response);
                    setAuthTokens(response?.data);
                    setUser(jwtDecode(response?.data.authorization?.token));
                    localStorage.setItem('authTokens', JSON.stringify(response?.data));
                    navigate(route('home.index'));
                    console.log('Login successful');
                } else {
                    console.log(response.status);
                    console.log(response);
                }
            })
            .catch(error => {
                console.log(error);
                console.log('Something went wrong!');
                console.log('Username or password does not exist!');
            })
    });

    return (
        <section className='vh-100'>
            <div className='d-flex justify-content-center align-items-center'>
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </section>
    )
}

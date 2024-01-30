import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { route } from '@/routes';

const AuthContext = createContext();

export default AuthContext;


export const AuthProvider = ({children}) => {
    const [authTokens, setAuthTokens] = useState(() => 
        localStorage.getItem('authTokens') 
            ? JSON.parse(localStorage.getItem('authTokens')) 
            : null);
    const [user, setUser] = useState(() => 
        localStorage.getItem('authTokens') 
            ? jwtDecode(localStorage.getItem('authTokens')) 
            : null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    let loginUser = async (username, password) => {
        const response = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                username, 
                password 
            })
        })
        const data = await response.json()

        if (response.status == 200) {
            console.log('Logged in');
            setAuthTokens(data);
            setUser(jwtDecode(data.authorization.token));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate(route('home.index'));
            console.log('Login successful')
        } else {
            // console.log(response.status);
            // console.log(response);
            console.log(error);
            console.log('Something went wrong!');
            console.log('Username or password does not exist!');
        }
    }


    const registerUser = async (email, firstname, lastname, username, password) => {
        const response = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                email, 
                first_name: firstname, 
                last_name: lastname, 
                username, 
                password 
            })
        })

        if (response.status == 201) {
            navigate(route('index'))
            // navigate(route('home.index'));
            console.log('Registration Successful, Login Now')
        } else {
            console.log(response.status);
            console.log(response);
            // console.log('Something went wrong!');
            // console.log(`'An Error Occured ' + ${response.status} + ': Check the password (ensure alphanumeric password not less than 15 characters). You should also check the other details you entered.'`)
        }
    }


    let logoutUser = async () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens'); 
        await fetch('http://127.0.0.1:8000/api/logout', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                refresh: authTokens?.refresh, 
            })
        })
        navigate(route('index'));
        console.log('You have been logged out.')
    }


    let contextData = {
        user, 
        setUser, 
        authTokens, 
        setAuthTokens, 
        loginUser, 
        registerUser, 
        logoutUser, 
    }


    useEffect(() => {
        if (authTokens) setUser(jwtDecode(authTokens.authorization.token));
        setLoading(false)
    }, [authTokens, loading])


    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
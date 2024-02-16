import React from 'react';
import '../styles/login.scss';

function Login() {
    return (
        <div className='login-container'>
            <div className='login-content'>
                <h2>Connexion</h2>
                <form>
                    <div className='form-group'>
                        <label htmlFor='username'>Nom d'utilisateur :</label>
                        <input type='text' id='username' name='username' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Mot de passe :</label>
                        <input type='password' id='password' name='password' />
                    </div>
                    <button type='submit'>Se connecter</button>
                </form>
            </div>
        </div>
    );
}

export default Login;

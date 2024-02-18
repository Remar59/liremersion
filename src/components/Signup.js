import React from 'react';
import '../styles/signup.scss';

function Signup() {
    return (
        <div className='signup-container'>
            <div className='signup-content'>
                <h2>Créer un compte</h2>
                <form>
                    <div className='form-group'>
                        <label htmlFor='username'>Nom d'utilisateur :</label>
                        <input type='text' id='username' name='username' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Adresse email :</label>
                        <input type='email' id='email' name='email' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Mot de passe :</label>
                        <input type='password' id='password' name='password' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='confirm-password'>Confirmer le mot de passe :</label>
                        <input type='password' id='confirm-password' name='confirm-password' />
                    </div>
                    <button type='submit'>Créer un compte</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;

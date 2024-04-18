import React, { useState } from 'react';
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import Heading from "../../ui/Heading";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleLogin = async () => {
    const endpoint = `http://localhost:3000/api/users/register`; 
    
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: email,
                password: password,
            }),
        });

        if (response.ok && response.headers.get('Content-Type')?.includes('application/json')) {
            const json = await response.json();
            console.log('Login exitoso:', json);

        } else {
            const errorMessage = await response.text();
            console.error(errorMessage);
        }
    } catch (error) {
        console.error(error);
    }
};

  return (
    <div>
      <div>
        <label>Email</label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="off"
        />
      </div>

      <div>
        <label>Password</label>
        <Input
          type={passwordVisibility ? 'password' : 'text'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="off"
        />
        <button onClick={togglePasswordVisibility}>
          {passwordVisibility ? 'Hide' : 'Show'}
        </button>
      </div>

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginScreen;

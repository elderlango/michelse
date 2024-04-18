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

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/getUser');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);*/

  const handleLogin = async (e) => {
    e.preventDefault();
    const endpoint = `http://localhost:3000/api/users/login`; 
    
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

        setEmail("");
        setPassword("");

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
    <Form onSubmit={handleLogin}>
      <Heading as="h1">Login</Heading>
    <FormRowVertical label="Correo electrónico">
        <Input
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         placeholder="Email"
         autoComplete="off"
        />
      </FormRowVertical>

      <FormRowVertical label="Contraseña">
        <Input
         type={passwordVisibility ? 'password' : 'text'}
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         placeholder="Password"
         autoComplete="off"
        />
        
      </FormRowVertical>
      <Button onClick={togglePasswordVisibility}>
          {passwordVisibility ? 'Hide' : 'Show'}
        </Button>

      <FormRowVertical>

      <Button onClick={handleLogin} >
        Login
      </Button>
      </FormRowVertical>

      </Form>
  );
};

export default LoginScreen;

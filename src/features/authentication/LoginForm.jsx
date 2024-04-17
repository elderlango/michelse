import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import Heading from "../../ui/Heading";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function handleSubmit(e) {
  //   e.preventDefault();

  // }

  return (
    <Form action="/login" method="post" >
                <Heading as="h1">Login</Heading>
      <FormRowVertical label="Correo electrónico">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>

      <FormRowVertical label="Contraseña">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">
          Inicia sesión
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;

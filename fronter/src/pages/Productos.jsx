import Button from "../ui/Button";
import Form from "../ui/Form";
import Input from "../ui/Input";
import FormRowVertical from "../ui/FormRowVertical";

function LoginForm() {

  const handleSubmit = async () => {
    const endpoint = `http://localhost:3000/api/users/register`;
    
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

    } catch (error) {
        console.error(error);
        Alert.alert('Error', 'No se pudo completar la solicitud. Por favor, verifica tu conexión y vuelve a intentarlo.');
    }
};
  return (
    <Form onSubmit={handleSubmit}>
    <FormRowVertical label="Código">
      <Input name="codigo" type="text" />
    </FormRowVertical>

    <FormRowVertical label="Nombre">
      <Input name="nombre" type="text" />
    </FormRowVertical>

    <FormRowVertical label="Descripción">
      <Input name="descripcion" type="text" />
    </FormRowVertical>

    <FormRowVertical label="Fecha de Creación">
      <Input name="fecha_creacion" type="date" />
    </FormRowVertical>

    <FormRowVertical label="Estatus">
      <Input name="estatus" type="text" />
    </FormRowVertical>

    <FormRowVertical label="Proveedor">
      <Input name="Proveedor" type="text" />
    </FormRowVertical>

    <FormRowVertical>
      <Button size="large" >
        "Inicia sesión" 
      </Button>
    </FormRowVertical>
  </Form>
  );
}

export default LoginForm;


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
              codigo: document.getElementsByName('codigo')[0].value,
              nombre: document.getElementsByName('nombre')[0].value,
              descripcion: document.getElementsByName('descripcion')[0].value,
              fecha_creacion: document.getElementsByName('fecha_creacion')[0].value,
              estatus: document.getElementsByName('estatus')[0].value,
              Proveedor: document.getElementsByName('Proveedor')[0].value,
            }),
        });

    } catch (error) {
        console.error(error);
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


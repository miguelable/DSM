import { useState } from "react";
import { ref as storageRef, uploadBytes } from "firebase/storage";
import { ref as databaseRef, set, push } from "firebase/database";
import { storage, database } from "../utils/firebase.utils";
import { Button, Form, Modal } from "react-bootstrap";
import "../styles/UploadNFT.css";
import PropTypes from "prop-types";

const UploadNFT = ({ userId, actualizarUsuario, actualizarProductos }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Por favor, selecciona un archivo de imagen válido.");
    }
  };

  const handleUpload = async () => {
    const newErrors = {};
    if (!image) newErrors.image = true;
    if (!name) newErrors.name = true;
    if (!description) newErrors.description = true;
    if (!price) newErrors.price = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Subir la imagen al almacenamiento de Firebase
      const imageRef = storageRef(storage, `NFTImages/${image.name}`);
      await uploadBytes(imageRef, image);

      // Crear un nuevo producto en la base de datos
      const newProductRef = push(databaseRef(database, "Productos"));
      const newProductId = newProductRef.key;

      const newProduct = {
        id: newProductId,
        nombre: name,
        descripcion: description,
        precio: parseFloat(price),
        imagen: image.name,
      };

      await set(newProductRef, newProduct);

      // Actualizar el array "Creados" del usuario
      const userCreadosRef = databaseRef(
        database,
        `Usuarios/${userId}/Creados`
      );
      await push(userCreadosRef, newProductId);

      alert("Imagen subida y detalles guardados exitosamente");

      // Llamar a la función para actualizar el usuario
      if (actualizarUsuario) {
        await actualizarUsuario(); // Asegúrate de que esta función se ejecute correctamente
      }

      if (actualizarProductos) {
        await actualizarProductos(); // Actualiza la lista de productos
      }

      // Limpiar el formulario
      setImage(null);
      setName("");
      setDescription("");
      setPrice("");
      setErrors({});
      handleClose();
    } catch (error) {
      console.error("Error al subir el producto:", error);
      alert(
        "Hubo un error al subir el producto. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <>
      <Button
        onClick={handleShow}
        className="upload-btn m-0"
        style={{ width: "fit-content" }}
      >
        Subir Imagen
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Subir nuevo NFT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Seleccionar imagen</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                isInvalid={errors.image}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, selecciona una imagen.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={errors.name}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, introduce un nombre.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                isInvalid={errors.description}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, introduce una descripción.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPrice" className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                isInvalid={errors.price}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, introduce un precio.
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleUpload}
              className="w-100 m-0"
            >
              Subir
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
UploadNFT.propTypes = {
  userId: PropTypes.string.isRequired,
  actualizarUsuario: PropTypes.func.isRequired,
  actualizarProductos: PropTypes.func.isRequired,
};

export default UploadNFT;

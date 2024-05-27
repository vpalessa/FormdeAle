import { useState } from 'react';
import axios from 'axios';
/** 
* Componente de formulario para enviar datos al backend. 
*/
const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        age: '',
        phone: ''

    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/form',
                formData);
            console.log('Form submitted successfully:', response.data);
            setMessage(response.data.message);  // Actualiza el estado del mensaje con la respuesta del servidor
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage('Error submitting form');  // Muestra un mensaje de error si ocurre un problema
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className='cotenet'></div>
                <label>
                    Nombre:&nbsp;&nbsp;
                    <input type="text" name="name" value={formData.name}
                        onChange={handleChange} />
                </label>
            </div>
            <br />
            <div>
                <label>
                    Apellido:&nbsp;&nbsp;
                    <input type="text" name="lastname" value={formData.lastname}
                        onChange={handleChange} />
                </label>
            </div>
            <br />
            <div>
                <label>
                    Edad:&nbsp;&nbsp;
                    <input type="number" name="age" value={formData.age}
                        onChange={handleChange} />
                </label>
            </div>
            <br />
            <div>
                <label>
                    Telefono:&nbsp;&nbsp;
                    <input type="tel" name="phone" value={formData.phone}
                        onChange={handleChange} />
                </label>
            </div>
            <br />
            <button type="submit">Enviar</button>
            {message && <p>{message}</p>}  {/* Muestra el mensaje del servidor */}
        </form>
    );
};

export default Form;

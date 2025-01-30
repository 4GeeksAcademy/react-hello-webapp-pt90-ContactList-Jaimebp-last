import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const AddContact = () => {
    const { id } = useParams(); // Obtener el ID del contacto a editar
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    // Intentar cargar los datos del contacto desde `store.contacts` primero tontito
    useEffect(() => {
        if (id !== undefined) {
            const existingContact = store.contacts.find(contact => contact.id === parseInt(id));

            if (existingContact) {
                setContact(existingContact); // Cargar el contacto si ya existe en store
            } else {
                // Si no está en el store, buscarlo en la API
                const fetchContact = async () => {
                    try {
                        const response = await fetch(`https://playground.4geeks.com/contact/agendas/Jaime/contacts/${id}`);
                        if (response.ok) {
                            const data = await response.json();
                            setContact(data); // Cargar datos desde la API si es necesario
                        } else {
                            console.error("Error al obtener contacto:", response.statusText);
                        }
                    } catch (error) {
                        console.error("Error en la solicitud:", error);
                    }
                };
                fetchContact();
            }
        }
    }, [id, store.contacts]);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    // Enviar formulario para agregar o actualizar contacto
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id !== undefined) {
            await actions.updateContact(id, contact); // Editar contacto
        } else {
            await actions.addContact(contact); // Agregar contacto nuevo
        }
        navigate("/contacts"); // Redirigir a la lista de contactos
    };

    return (
        <div className="container">
            <h1>{id !== undefined ? "Edit Contact" : "Add a new contact"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={contact.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={contact.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={contact.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Save</button>
            </form>
            <br />
            <Link to="/contacts">or get back to contacts</Link>
        </div>
    );
};

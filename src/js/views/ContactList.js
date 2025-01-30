import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import duneImage from "../../img/dune.jpg";

export const ContactList = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchContacts(); // Cargar contactos al montar el componente
    }, []);

    return (
        <div className="container">
            <div className="d-flex justify-content-between my-3">
                <h1>Contacts</h1>
                <Link to="/add-contact">
                    <button className="btn btn-success">Add new contact</button>
                </Link>
            </div>
            <ul className="list-group">
                {store.contacts.map((contact, index) => (
                    <li key={index} className="list-group-item">
                        {/* Imagen del contacto */}
                        <img src={duneImage} alt="Contact" className="contact-img" />

                        {/* Información del contacto */}
                        <div className="contact-info">
                            <h5>{contact.name}</h5>
                            <p>{contact.address}</p>
                            <p>{contact.phone}</p>
                            <p>{contact.email}</p>
                        </div>

                        {/* Botones alineados a la derecha */}
                        <div className="contact-actions">
                            <Link to={`/edit-contact/${contact.id}`}>
                                <button className="btn btn-primary">
                                    <i className="fa fa-pencil"></i>
                                </button>
                            </Link>
                            <button className="btn btn-danger" onClick={() => actions.deleteContact(contact.id)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

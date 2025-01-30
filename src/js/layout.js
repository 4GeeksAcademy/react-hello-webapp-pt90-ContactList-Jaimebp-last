import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext, { Context } from "./store/appContext";

import { ContactList } from "./views/ContactList";
import { AddContact } from "./views/AddContact";

const Layout = () => {
    const basename = process.env.BASENAME || "";
    const { actions } = useContext(Context);

    useEffect(() => {
        // Verificar o crear la agenda "Jaime" y obtener los contactos
        const initializeAgenda = async () => {
            try {
                await fetch("https://playground.4geeks.com/contact/agendas/Jaime", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log('Agenda "Jaime" verificada o creada exitosamente.');
            } catch (error) {
                console.error("Error al crear/verificar la agenda:", error);
            }

            // Llamar a la función para obtener los contactos desde la API
            actions.fetchContacts();
        };

        initializeAgenda();
    }, []);

    return (
        <div>
            <BrowserRouter basename={basename}>
                <Routes>
                    <Route path="/" element={<ContactList />} />
                    <Route path="/contacts" element={<ContactList />} />
                    <Route path="/add-contact" element={<AddContact />} />
                    <Route path="/edit-contact/:id" element={<AddContact />} />
                    <Route path="*" element={<h1>Not found!</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

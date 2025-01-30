const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],
        },
        actions: {
            // Obtener todos los contactos desde la API
            fetchContacts: async () => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/Jaime");
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ contacts: data.contacts || [] });
                    } else {
                        console.error("Error al obtener contactos:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                }
            },

            // Agregar un nuevo contacto
            addContact: async (contact) => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/Jaime/contacts", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(contact),
                    });

                    if (response.ok) {
                        await getActions().fetchContacts();
                    } else {
                        console.error("Error al agregar contacto:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                }
            },

            // Actualizar un contacto existente
            updateContact: async (id, updatedContact) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/Jaime/contacts/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedContact),
                    });

                    if (response.ok) {
                        await getActions().fetchContacts();
                    } else {
                        console.error("Error al actualizar contacto:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                }
            },

            // Eliminar un contacto
            deleteContact: async (id) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/Jaime/contacts/${id}`, {
                        method: "DELETE",
                    });

                    if (response.ok) {
                        await getActions().fetchContacts();
                    } else {
                        console.error("Error al eliminar contacto:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                }
            },
        },
    };
};

export default getState;

import { createContext, useContext } from "react";
import React from "react";

// Create the context
const CreateContext = createContext();

// Context provider component
export const ContextProvider = ({ children }) => {
    const fetchDetails = async () => {
        console.log("Fetching details...");
        const token = localStorage.getItem("authtoken");
        console.log("Token:", token);

        // First fetch: Get email
        const res = await fetch(`http://localhost:5000/api/getemail_seller`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        console.log("First fetch completed");

        if (res.status !== 500) {
            const response = await res.json();
            console.log("First fetch response:", response);

            // Second fetch: Get seller details
            const res1 = await fetch(`http://localhost:5000/api/getsellerdetails`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(response.payload),
            });

            console.log("Second fetch completed");
            const payloadFinal = await res1.json();
            console.log("Second fetch response:", payloadFinal);

            return payloadFinal.payload;
        } else {
            const response = await res.json();
            alert(response.message);
        }
    };

    return (
        <CreateContext.Provider value={fetchDetails}>
            {children}
        </CreateContext.Provider>
    );
};

// Custom hook to use the context
export const useProvider = () => useContext(CreateContext);
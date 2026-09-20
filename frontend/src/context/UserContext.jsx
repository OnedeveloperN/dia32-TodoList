import { createContext, useContext, useState } from "react";

// Creo el contexto
const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: 1,
        email: "nico@mail.com"
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    return useContext(UserContext);
};

export { UserProvider, useUser };
import { createContext, useState } from "react";
const UserContext = createContext();
function UserProvider({ children }) {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState();

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser(userData)
  };

  // Logout updates the user data to default
  const logoutContext = () => {
    setUser((user) => ({
      name: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
}

export  {UserContext,UserProvider};

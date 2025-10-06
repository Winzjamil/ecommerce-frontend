import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([null]);

  useEffect(() => {
    const userCredential = JSON.parse(localStorage.getItem('user'));
    setUser(userCredential);
  }, []);

  const loginUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData) || '[]');
    setUser(userData);
  };
  const logoutUser = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        loginUser,
        logoutUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

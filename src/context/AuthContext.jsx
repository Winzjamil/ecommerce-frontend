// import { useState, useEffect, createContext, useContext } from 'react';
// import { GlobalContext } from './GlobalContext';
// const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const { user, setUser } = useContext(GlobalContext);

//   const loginUser = (userData) => {
//     localStorage.setItem('user', JSON.stringify(userData) || '[]');
//     setUser(userData);
//   };
//   const logoutUser = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//   };
//   return (
//     <AuthContext.Provider
//       value={{
//         loginUser,
//         logoutUser,
//         user,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
// export const useAuth = () => useContext(AuthContext);

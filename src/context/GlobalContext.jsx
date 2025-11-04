// import { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// export const GlobalContext = createContext();
// export const GlobalContextProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [carts, setCarts] = useState([]);
//   const [userCount, setUserCount] = useState(0);
//   const [user, setUser] = useState([]);

//   useEffect(() => {
//     const userCredential = JSON.parse(localStorage.getItem('user'));
//     setUser(userCredential);
//   }, []);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const userList = await fetch('http://localhost:8080/count');
//       if (!userList.ok)
//         throw new Error(`HTTP error! Status: ${userList.status}`);
//       const finalList = await userList.json();
//       setUserCount(finalList.count); //  just the count number

//       const res = await fetch('http://localhost:8080/product');
//       if (!res.ok) {
//         throw new Error(`http error! status: ${res.status}`);
//       }
//       const result = await res.json();
//       setProducts(result.data);
//       const response = await fetch('http://localhost:8080/cart');
//       if (!res.ok) {
//         throw new Error(`http error! status: ${response.status}`);
//       }
//       const myCart = await res.json();
//       setCarts(myCart.data);
//     } catch (err) {
//       console.error('Failed to fetch  data:', err);
//     }
//   };
//   fetchData();
// }, []);

//   return (
//     <GlobalContext.Provider
//       value={{
//         products,
//         setProducts,
//         carts,
//         setCarts,
//         navigate,
//         userCount,
//         user,
//         setUser,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };

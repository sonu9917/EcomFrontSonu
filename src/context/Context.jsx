import React, { createContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

const MainContext = createContext();

const Context = (props) => {

  const [cookie, setCookie] = useCookies(['token']);
  const [token, setToken] = useState(cookie.token);

  const membershipOptions = [
    {
      _id:123098,
      name: "6-Months Membership",
      price: 5000,
      key: "6-month",
      PriceId: "price_1PjEjZ2K1YkP5vT5ZkVbBQVm",
    },
    {
      _id:123097,
      name: "12-Months Membership",
      price: 9000,
      key: "12-month",
      PriceId: "price_1PjEjZ2K1YkP5vT5ZkVbBQVm",
    },
  ];

  useEffect(() => {
    setToken(cookie.token);
    localStorage.setItem('token', JSON.stringify(cookie.token))
  }, [cookie.token]);

  return (
    <MainContext.Provider value={{ cookie, setCookie, token,membershipOptions }}>{props.children}</MainContext.Provider>
  )
}

export { MainContext }

export default Context
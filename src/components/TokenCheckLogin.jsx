import { redirect } from "react-router-dom";

export const TokenCheckLogin = () => {
    const token = localStorage.getItem('token');
    return token ? redirect('/mainpage') : null;
  }
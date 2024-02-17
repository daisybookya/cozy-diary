import Layout from "../components/Layout";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { SettingProvider } from "../reducer/provider";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function MainLayout() {
  const Navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") {
      Navigate("/home");
    }
  }, [Navigate]);
  return (
    <SettingProvider>
      <Layout>
        <Nav></Nav>
        <Outlet />
        <Footer></Footer>
      </Layout>
    </SettingProvider>
  );
}

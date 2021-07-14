import React from "react";
import Head from "./Head";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import { Button } from "antd";

const Admin = () => {
  const history = useHistory();
  return (
    <div>
      <Head />
      <div style={{ textAlign: "center", margin: 20 }}>
        <h2>Admin Page</h2>
        <Button
          key="buy"
          type="primary"
          onClick={() => {
            history.push("/");
          }}
        >
          Home
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;

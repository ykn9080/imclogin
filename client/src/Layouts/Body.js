import React from "react";
import { useHistory } from "react-router-dom";
import { Result, Button, Typography } from "antd";

const Body = (props) => {
  // keyval = useSelector((state) => state.global.selectedKey);
  // const ctrlist = useSelector((state) => state.global.controls);
  const { Title } = Typography;
  const history = useHistory();
  const token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  if (user) user = JSON.parse(user);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  return (
    <>
      <div>
        {token /* Login Homepage */ ? (
          <>
            <Result
              status="success"
              title="Successfully Logged in"
              subTitle="You can replace this to personalized menu"
              extra={[
                <Title level={5}>Welcome, {user?.name}</Title>,
                <Button
                  key="buy"
                  onClick={() => {
                    logout();
                    history.push("/");
                  }}
                >
                  Log out
                </Button>,
              ]}
            />
          </>
        ) : (
          /* Landing Page - no login
          token */
          <Result
            status="404"
            title="Before Login"
            subTitle="Pleas log in."
            extra={
              <Button type="primary" onClick={() => history.push("/login")}>
                Log In
              </Button>
            }
          />
        )}
      </div>
    </>
  );
};

export default Body;

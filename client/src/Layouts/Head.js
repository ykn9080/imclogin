import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import { Nav, Navbar, NavDropdown, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { useSelector, useDispatch } from "react-redux";
// import { globalVariable } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaUser, FaCog } from "react-icons/fa";

const Topmenu = ({ menu }) => {
  const history = useHistory();
  function handleSelect(selectedKey) {
    const ctrlist = menu.filter((item, itemIndex) => item._id === selectedKey);

    history.push(ctrlist[0].path);
  }

  let topmenu = [];
  if (menu)
    topmenu = menu
      //.filter((item, itemIndex) => item.comp === login.comp && typeof item.pid === "undefined")
      .filter(
        (item, itemIndex) =>
          (item.pid === "") | (typeof item.pid === "undefined")
      )
      .sort(function (a, b) {
        return a.seq < b.seq ? -1 : 1;
      });
  return (
    // <Nav className="mr-auto" onSelect={handleSelect}>
    //   <AntMenu menuList={topmenu} />
    // </Nav>
    <Nav className="mr-auto" onSelect={handleSelect}>
      {topmenu &&
        topmenu.map((dt, i) => {
          //const ddList = menulist(dt, dt.id);
          const ddList = menu
            .filter((item, itemIndex) => item.pid === dt._id)
            .sort(function (a, b) {
              return a.seq < b.seq ? -1 : 1;
            });
          return ddList.length === 0 ? (
            <Nav.Link key={dt.title + i} onClick={() => handleSelect(dt._id)}>
              {dt.title}
            </Nav.Link>
          ) : (
            <NavDropRecur
              myData={menu}
              dt={ddList}
              title={dt.title}
              id={dt._id}
              key={dt._id}
            />
          );
        })}
    </Nav>
  );
};

const NavDropRecur = (props) => {
  /*make menu recursive, */

  const subfilter = (id) => {
    return props.myData
      .filter((item, itemIndex) => id === item.pid)
      .sort(function (a, b) {
        return a.seq < b.seq ? -1 : 1;
      });
  };

  return (
    <NavDropdown title={props.title} id={props.id}>
      {props.dt.map((dtt, index) => {
        //let subdata = menulist(props.myData, dtt.id);
        let subdata = subfilter(dtt._id);

        return subdata.length === 0 ? (
          <NavDropdown.Item eventKey={dtt._id} key={dtt._id + index}>
            {dtt.title}
          </NavDropdown.Item>
        ) : (
          <NavDropRecur
            dt={subdata}
            myData={props.myData}
            title={dtt.title}
            id={dtt._id}
            key={dtt._id}
          />
        );
      })}
    </NavDropdown>
  );
};

const Head1 = (props) => {
  let menu1;
  // const dispatch = useDispatch();
  //const token = useSelector((state) => state.global.token);
  const [menu, setMenu] = useState();
  const token1 = localStorage.getItem("token");
  useEffect(() => {
    const usermenu = localStorage.getItem("menu");
    const openmenu = localStorage.getItem("openmenu");

    if (token1) {
      menu1 = JSON.parse(usermenu);
      //dispatch(globalVariable({ token: token1 }));
    } else {
      //localStorage.removeItem("menu");
      menu1 = JSON.parse(openmenu);
    }
    setMenu(menu1);
  }, []);
  function handleSelect(selectedKey) {
    switch (selectedKey) {
      case "edit":
        //const menu = JSON.parse(localStorage.getItem("menu"));
        //const submenu = directChild(menu, "", "seq");
        var clone = cloneDeep(menu);
        clone.map((k, i) => {
          k.path = "/edit" + k.path;
          return null;
        });
        //dispatch(globalVariable({ tempMenu: clone }));
        //dispatch(globalVariable({ subMenu: submenu }));
        break;
      case "admin":
        break;
      default:
        break;
    }
  }
  const topbrand = (
    <Navbar.Brand href="#home">
      {/* <img
        src={process.env.PUBLIC_URL + "/netminer.png"}
        className="d-inline-block align-top"
        style={{ width: 20, marginRight: 4, paddingTop: 7 }}
      /> */}
      IMCMaster
    </Navbar.Brand>
  );

  const navDropdownTitle = <FaUser style={{ fontSize: 25 }} />;

  const navCog = <FaCog style={{ fontSize: 25, marginTop: 8 }} />;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("menu");
    //dispatch(globalVariable({ token: null }));
  };
  const topright = (
    <Nav onSelect={handleSelect} style={{ marginRight: 20 }}>
      <Nav.Link>
        <NavDropdown title={navDropdownTitle} id="basic-nav-dropdown1">
          <NavDropdown.Item>
            <Link to="/Login">Log In</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/Join">Join</Link>
          </NavDropdown.Item>
        </NavDropdown>
      </Nav.Link>
    </Nav>
  );
  const toprightAfterLogin = (
    <Nav onSelect={handleSelect}>
      <Nav.Link>
        <NavDropdown title={navDropdownTitle} id="basic-nav-dropdown1">
          <NavDropdown.Item>
            <Link to="/" onClick={logout}>
              Log Out
            </Link>
          </NavDropdown.Item>
        </NavDropdown>
      </Nav.Link>
      <Nav.Link>
        <Link to="/admin" style={{ color: "inherit" }}>
          {navCog}
        </Link>
      </Nav.Link>
    </Nav>
  );
  return (
    <>
      {token1 ? (
        <Navbar bg="dark" variant="dark">
          {topbrand}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Topmenu menu={menu} />

            <Form inline style={{ paddingRight: "40" }}>
              {toprightAfterLogin}
            </Form>
          </Navbar.Collapse>
        </Navbar>
      ) : (
        <Navbar bg="dark" variant="dark">
          {topbrand}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Topmenu menu={menu} />
            <Form inline style={{ paddingRight: "40" }}>
              {topright}
            </Form>
          </Navbar.Collapse>
        </Navbar>
      )}
    </>
  );
};

export default Head1;

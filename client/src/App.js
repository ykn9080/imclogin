import "./App.css";
import Home from "./Layouts/Home";
import Login from "./Login/Login";
import Join from "./Login/Join";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/login"
          render={(props) => (
            <Login {...props} title={`Props through render`} />
          )}
        />
        <Route path="/join" component={Join} />
      </Switch>
    </Router>
  );
}

export default App;

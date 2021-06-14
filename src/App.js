import "semantic-ui-css/semantic.min.css";
import { Fragment } from "react";
import { NavBar } from "./components/NavBar";
import { Container } from "semantic-ui-react";
import { Dashboard2 } from "./components/Dashboard2";
import { Route, Switch } from "react-router";
import { Dashboard } from "./components/Dashboard";
import { UserGuide } from "./components/UserGuide";

function App() {
  return (
    <Fragment>
      <NavBar />
      <Container style={{ padding: "4em" }} fluid >
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/Dashboard1" component={Dashboard} />
          <Route path="/Dashboard2" component={Dashboard2} />
          <Route path="/UserGuide" component={UserGuide} />
        </Switch>
      </Container>
    </Fragment>
  );
}

export default App;

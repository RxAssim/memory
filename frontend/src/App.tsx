import React from "react";
import { ThemeProvider } from "styled-components";
import { Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import Cookies from "js-cookie";
import { ApolloProvider } from "react-apollo-hooks";
import { createMemoryHistory } from "history";
import Start from "./Pages/Start";
import InGame from "./Pages/InGame";
import { theme } from "./utils/theme";
import Leaderboard from "./Pages/Leaderboard";

const App: React.FC = () => {
  const history = createMemoryHistory({
    initialEntries: ["/", "/ingame", "/leaderboard"],
    initialIndex: 0
  });
  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    request: async operation => {
      const token = await Cookies.get("token");
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      });
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router history={history}>
          <Route path="/" exact component={Start} />
          <Route path="/ingame" component={InGame} history={history} />
          <Route
            path="/leaderboard"
            component={Leaderboard}
            history={history}
          />
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;

import React, { useState, SyntheticEvent } from "react";
import { MemoryHistory } from "history";
import gql from "graphql-tag";
import Cookies from "js-cookie";
import { useMutation } from "react-apollo-hooks";
import { styled } from "../utils/theme";
import {
  Wrapper,
  Form,
  InputGroup,
  ErrorText,
  Button,
  Label,
  Input
} from "../components/Start.components";

interface AppProps {
  history: MemoryHistory;
}

const CREATE_USER = gql`
  mutation createUser($name: String!) {
    createUser(name: $name) {
      user {
        id
        name
      }
      token
    }
  }
`;

const Start: React.FC<AppProps> = props => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const createUser = useMutation(CREATE_USER, { variables: { name } });
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await createUser();
      Cookies.set("token", data.createUser.token);
      props.history.push("/ingame");
    } catch (err) {
      setLoading(false);
      if (err.networkError) {
        setError("It appears that you're not connected to the server !");
      } else {
        setError("Name already exists :( Please try another one");
      }
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={loading ? () => {} : handleSubmit}>
        <InputGroup>
          <Label htmlFor="username">Name:</Label>
          <Input
            id="username"
            onChange={e => {
              setName(e.target.value);
              if (error !== "") setError("");
            }}
            required
          />
        </InputGroup>
        <Button>Play!</Button>
        <ErrorText>{error}</ErrorText>
      </Form>
    </Wrapper>
  );
};

export default Start;

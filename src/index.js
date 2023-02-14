import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import axios from 'axios';

const BASE_URL = 'https://users-messages-gql.herokuapp.com/graphql';

const client = new ApolloClient({
  uri: 'https://users-messages-gql.herokuapp.com/graphql', //
  cache: new InMemoryCache(),
});

// const client = ...

// client
//   .query({
//     query: gql`
//       query GetUsers {
//         users {
//           username,
//           first_name,
//           last_name
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

async function getUsers() {
  const usersQuery = `
  query GetUsers {
    users {
      username,
      first_name,
      last_name
    }
  }
`
  const resp = await axios(
    {
      url: BASE_URL,
      method: "POST",
      data: {
        query: usersQuery
      },
    }
  )

  console.log(resp.data.data.users);

  return resp.data.data.users;
}

async function getAUser(username) {
  const userQuery = `
  query GetUser {
    user(username: "${username}") {
      username,
      first_name,
      last_name
    }
  }
`
  const resp = await axios(
    {
      url: BASE_URL,
      method: "POST",
      data: {
        query: userQuery
      },
    }
  )

  console.log(resp.data.data.user);

  return resp.data.data.user;
}

async function createAUser({username, firstName, lastName}) {
  const userMutation = `
  mutation CreateUser {
    createUser(username: "${username}", first_name: "${firstName}", last_name: "${lastName}") {
      username,
      first_name,
      last_name,
      messages {
        id,
        body
      }
    }
  }
`
  const resp = await axios(
    {
      url: BASE_URL,
      method: "POST",
      data: {
        query: userMutation
      },
    }
  )

  console.log(resp.data.data.createUser);

  return resp.data.data.createUser;
}

getUsers();
getAUser('david');
// createAUser({
//   username: 'nico',
//   firstName: 'n',
//   lastName: 'ico'
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

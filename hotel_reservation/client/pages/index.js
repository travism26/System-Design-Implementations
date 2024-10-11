import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);

  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  // const { data } = await client.get('/api/auth/currentuser');
  // return data;
  return {
    currentUser: null,
    isAdmin: false,
  };
};

export default LandingPage;

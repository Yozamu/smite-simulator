import { Button } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    const sessionValidity = new Date(localStorage.getItem('session-validity'));
    if (sessionValidity < new Date()) {
      fetch('/api/createSession')
        .then((res) => res.json())
        .then((json) => {
          if (json.session !== '') {
            localStorage.setItem('session', json.session);
            localStorage.setItem('session-validity', json.expirationDate);
          }
        });
    }
  }, []);

  const getSession = () => localStorage.getItem('session');

  const fetchGods = async () => {
    const res = await fetch(`/api/gods?session=${getSession()}`);
    const json = await res.json();
    console.log('GODS: ', json.data);
  };

  const fetchItems = async () => {
    const res = await fetch(`/api/items?session=${getSession()}`);
    const json = await res.json();
    console.log('ITEMS: ', json.data);
  };

  return (
    <>
      <Head>
        <title>Smite simulator</title>
        <meta name="description" content="Check damage output in Smite" />
      </Head>
      <main>
        <div>Home page</div>
        <Button onClick={fetchGods}>Log gods</Button>
        <Button onClick={fetchItems}>Log items</Button>
      </main>
    </>
  );
};

export default Home;

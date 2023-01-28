import Head from 'next/head';
import Home from '../components/Home';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Smite simulator</title>
        <meta name="description" content="Check damage output in Smite" />
      </Head>
      <Home />
    </>
  );
};

export default HomePage;

import Head from 'next/head';
import Gods from '../components/Gods';
import { createSession } from './api/createSession';
import { getGods } from './api/gods';

const GodsPage = ({ gods = null }) => {
  return (
    <>
      <Head>
        <title>Smite simulator - Gods</title>
      </Head>
      <Gods gods={gods} />
    </>
  );
};

export default GodsPage;

export async function getStaticProps() {
  const session = await createSession();
  const gods = (await getGods(session.session)).data;

  return {
    props: { gods },
    revalidate: 60 * 60 * 24 * 30, // revalidate each month
  };
}

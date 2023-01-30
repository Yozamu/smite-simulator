import Head from 'next/head';
import Items from '../components/Items';
import { createSession } from './api/createSession';
import { getItems } from './api/items';

const ItemsPage = ({ items = null }) => {
  return (
    <>
      <Head>
        <title>Smite simulator - Gods</title>
      </Head>
      <Items items={items} />
    </>
  );
};

export default ItemsPage;

export async function getStaticProps() {
  const session = await createSession();
  const items = (await getItems(session.session)).data;

  return {
    props: { items },
    revalidate: 60 * 60 * 24 * 30, // revalidate each month
  };
}

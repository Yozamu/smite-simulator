import Head from 'next/head';
import { createSession } from './api/createSession';
import { getItems } from './api/items';

const ItemsPage = ({ items = null }) => {
  return (
    <>
      <Head>
        <title>Smite simulator - Gods</title>
      </Head>
      <ul>
        {items
          .filter((item) => item.ActiveFlag === 'y')
          .map((item) => (
            <li key={item.ItemId}>{item.DeviceName}</li>
          ))}
      </ul>
    </>
  );
};

export default ItemsPage;

export async function getStaticProps() {
  const session = await createSession();
  const items = (await getItems(session.session)).data;

  return {
    props: { items },
    revalidate: 60 * 60 * 24, // revalidate each day
  };
}

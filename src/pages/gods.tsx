import Gods from '../components/Gods';
import { createSession } from './api/createSession';
import { getGods } from './api/gods';

const GodsPage = ({ gods }) => {
  return <Gods gods={gods} />;
};

export default GodsPage;

export async function getStaticProps() {
  const session = await createSession();
  const gods = (await getGods(session.session)).data;

  return {
    props: { gods },
    revalidate: 60 * 60 * 24, // revalidate each day
  };
}

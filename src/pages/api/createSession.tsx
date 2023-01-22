import { BASE_PATH, RESPONSE_FORMAT } from '../../helpers/constants';
import { getSignature, getTimestamp } from '../../helpers/utils';

export const createSession = async () => {
  const res = await fetch(
    `${BASE_PATH}/createsession${RESPONSE_FORMAT}/${
      process.env.DEV_ID
    }/${getSignature('createsession')}/${getTimestamp()}`
  );
  const json = await res.json();
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 15);
  return { session: json.session_id, expirationDate: expirationDate.toJSON() };
};

export default async function handler(req, res) {
  const json = await createSession();
  res.status(200).json(json);
}

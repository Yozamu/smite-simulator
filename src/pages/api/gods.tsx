import { BASE_PATH } from '../../helpers/constants';
import { getUrlMandatoryPath } from '../../helpers/utils';

export const getGods = async (session) => {
  const res = await fetch(
    `${BASE_PATH}/getgods${getUrlMandatoryPath(session, 'getgods')}/3`
  );
  const json = await res.json();
  return { data: json };
};

export default async function handler(req, res) {
  const json = await getGods(req.query.session);
  res.status(200).json(json);
}

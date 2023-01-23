import { BASE_PATH } from '../../helpers/constants';
import { getUrlMandatoryPath } from '../../helpers/utils';

export const getItems = async (session) => {
  const res = await fetch(
    `${BASE_PATH}/getitems${getUrlMandatoryPath(session, 'getitems')}/3`
  );
  const json = await res.json();
  return { data: json };
};

export default async function handler(req, res) {
  const json = await getItems(req.query.session);
  res.status(200).json(json);
}

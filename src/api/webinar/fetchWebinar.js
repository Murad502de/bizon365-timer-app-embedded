import { sortByNumber } from '@helpers/sortByNumber';

export const fetchWebinar = async ({ code }) => {
  // console.debug('api/fetchWebinar/code', code); //DELETE
  // console.debug('api/fetchWebinar/API_URL', process.env.API_URL); //DELETE

  try {
    let response = await fetch(`${process.env.API_URL}/webinars/${code}`);

    // console.debug('api/fetchWebinar/response', response); //DELETE

    let json = await response.json();

    // console.debug('api/fetchWebinar/json', json); //DELETE

    return fetchWebinarAdapter(json.data);
  } catch (e) {
    return Object.assign({}, e).response;
  }
}
export const fetchWebinarAdapter = (data) => {
  // console.debug('api/fetchWebinarAdapter/data', data); //DELETE

  return {
    ...data,
    gifts: [...data.gifts].sort(sortByNumber)
      .map((gift) => ({
        name: gift.name,
        giftTimer: gift.delay,
        downloadTimer: 15,
        link: gift.link,
      }))
  };
};
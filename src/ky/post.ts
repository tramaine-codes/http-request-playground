import ky from 'ky';

const { data } = await ky
  .post('https://httpbin.org/anything', {
    json: {
      hello: 'world',
    },
  })
  .json<{ data: string }>();

// eslint-disable-next-line no-console
console.log(data);

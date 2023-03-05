import got from 'got';

const resp = await got
  .post('https://httpbin.org/anything', {
    json: {
      hello: 'world',
    },
  })
  .json();

// eslint-disable-next-line no-console
console.log(resp);

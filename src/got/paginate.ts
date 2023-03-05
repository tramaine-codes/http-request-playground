import got from 'got';
import { map, pipe } from 'iter-ops';

const page = 1;
const perPage = 80;

interface Beer {
  id: number;
  name: string;
}

const pagination = got.paginate<Beer>(
  `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`,
  {
    pagination: {
      paginate: ({
        currentItems,
        response: {
          requestUrl: { searchParams },
        },
      }) => {
        const more = currentItems.length > 0;

        if (more) {
          const page = searchParams.get('page') ?? '1';
          const next = +page + 1;

          return {
            url: new URL(
              `https://api.punkapi.com/v2/beers?page=${next}&per_page=${perPage}`
            ),
          };
        }

        return false;
      },
    },
  }
);

const foo = pipe(
  pagination,
  map(({ id, name }) => ({ id, name, foo: 'bar' }))
);

const beers: Beer[] = [];
for await (const beer of foo) {
  beers.push(beer);
}

// eslint-disable-next-line no-console
console.log(beers.length);

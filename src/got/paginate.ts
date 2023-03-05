import got from 'got';
import { map, pipe } from 'iter-ops';

let page = 1;
const perPage = 80;

interface Beer {
  id: number;
  name: string;
}

const pagination = got.paginate<Beer>(
  `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`,
  {
    pagination: {
      //   transform: (response: Response) => {
      //     if (response.request.options.responseType === 'json') {
      //       return response.body;
      //     }

      //     return JSON.parse(response.body as string);
      //   },
      paginate: ({ currentItems }) => {
        const next = currentItems.length > 0;

        if (next) {
          page++;

          return {
            url: new URL(
              `v2/beers?page=${page}&per_page=${perPage}`,
              'https://api.punkapi.com'
            ),
          };
        }

        return false;
      },
      //   filter: () => true,
      //   shouldContinue: () => true,
      //   countLimit: Number.POSITIVE_INFINITY,
      //   backoff: 0,
      //   requestLimit: 10_000,
      //   stackAllItems: false,
    },
  }
);

const beers: Beer[] = [];
for await (const beer of pagination) {
  beers.push(beer);
}

const foo = pipe(
  pagination,
  map((beer) => beer)
);

// eslint-disable-next-line no-console
console.log(beers.length);

// eslint-disable-next-line no-console
console.log(foo);

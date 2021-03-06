import test from 'ava';

import { BitRate, getSong, Provider } from '../src';

const testCases = [
  {
    id: 'A781023E25C4D09EABCB307BE8BD12E8',
    provider: Provider.kugou,
    extra: {
      '320filesize': 12980894,
      sqfilesize: 40487869,
      sqhash: 'A781023E25C4D09EABCB307BE8BD12E8',
      '128hash': 'F3205F0FF2F4891A2C344086B74B6D6E',
      '320hash': '2CA89833D8CF56C154A0E7C183C887F2',
      '128filesize': 5192434,
    },
  },
  {
    id: '29829683',
    provider: Provider.netease,
  },
  {
    id: '1768956303',
    provider: Provider.xiami,
  },
];

test('getSong', async (t) => {
  await Promise.all(
    testCases.map(async ({ id, provider, extra }) => {
      let data = await getSong(id, provider, BitRate.mid);

      let {
        id: resultId, name, url, album, extra: realExtra,
      } = data;

      t.is(resultId, id);
      t.true(!!name);
      t.true(!!url);
      t.true(!!album);

      if (extra) {
        t.deepEqual(realExtra, extra);
      }
    })
  );
});

test('getSong with not support provider', async (t) => {
  let err;
  try {
    await getSong('id', 'unknown-provider' as Provider);
  } catch (e) {
    err = e;
  }

  t.truthy(err);
  t.is(err.message, 'unknown-provider not support');
});

// K6 stress tests

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';
export const requests = new Counter('http_reqs');

// export const options = {
//   stages: [
//     { target: 10, duration: '30s' },
//     // { target: 10, duration: '30s' },
//   ],
//   thresholds: {
//     requests: ['count < 100'],
//   },
// };

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 20,
      maxVUs: 100,
    },
  },
};

export default function () {
    const id = Math.floor(Math.random() * 1000011)
      let res = http.get(`http://localhost:3000/reviews?product_id=${id}`);
        sleep(1);
        const checkRes = check(res, {
          'status is 200': (r) => r.status === 200,
        });
        const id2 = Math.floor(Math.random() * 1000011)
      let res2 = http.get(`http://localhost:3000/reviews/meta?product_id=${id2}`);
        sleep(1);
        const checkRes2 = check(res2, {
          'status is 200': (r) => r.status === 200,
        });
        const id3 = Math.floor(Math.random() * 1000011)
      let res3 = http.put(`http://localhost:3000/reviews/${id3}/helpful`);
        sleep(1);
        const checkRes3 = check(res3, {
          'status is 200': (r) => r.status === 200,
        });
        const id4 = Math.floor(Math.random() * 1000011)
      let res4 = http.put(`http://localhost:3000/reviews/${id4}/report`);
        sleep(1);
        const checkRes4 = check(res4, {
          'status is 200': (r) => r.status === 200,
        });
}
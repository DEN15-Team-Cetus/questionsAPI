import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '5s',
};

export default function () {
  http.put('http://localhost:1234/reviews/5775007/helpful');
}

// CLI command: k6 run ./test/putHelpful.js
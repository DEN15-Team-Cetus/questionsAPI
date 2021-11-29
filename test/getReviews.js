import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 2000 }
  ]
};

export default function () {
  http.get('http://localhost:1234/reviews?product_id=995899');
}

// CLI command: k6 run ./test/getReviews.js
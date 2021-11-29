import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '5s',
};

const data = {
  "product_id": 5,
  "rating": 3,
  "summary": "good product",
  "body": "I liked it",
  "recommend": true,
  "name": "matthew",
  "email": "m@d.com",
  "photos": ["oh", "https://st.depositphotos.com/1050689/2099/i/450/depositphotos_20990611-stock-photo-pineapple-isolated.jpg"],
  "characteristics": {"10": 5, "11": 5}
}

export default function () {
  http.post('http://localhost:1234/reviews?product_id=443888', data);
  sleep(1);
}

// CLI command: k6 run ./test/postReview.js
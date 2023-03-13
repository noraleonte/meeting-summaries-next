export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req);
  } else {
    console.log('FAIL');
  }
}

# Fashionista

[![Watch the video](https://img.youtube.com/vi/fRuE2MAyDt8/maxresdefault.jpg)](https://www.youtube.com/watch?v=fRuE2MAyDt8)

---
## Front-end
- [React](https://es.reactjs.org/) - Front-End JavaScript library
- [Windi CSS](https://windicss.org/) - Next generation utility-first CSS framework
- [Feather Icons](https://feathericons.com/) - Simply beautiful open source icons
- [Vite](https://vitejs.dev/) - Frontend Tooling

## Back-end 
- [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express.js](https://expressjs.com/) - Minimal and flexible Node.js web application framework.
- [Mongoose](https://mongoosejs.com/) - Elegant mongodb object modeling for node.js 
- [Stripe](https://stripe.com/docs/js) - Payments infrastructure for the internet
- [celebrate](https://github.com/arb/celebrate) - A joi validation middleware for Express.
- [JsonWebToken](https://github.com/auth0/node-jsonwebtoken) - An implementation of JSON Web Tokens for Node.js

## Machine Learning Model (Python Flask)
- [Flask](https://flask.palletsprojects.com/) - Lightweight WSGI web application framework
- [Scikit-learn](https://scikit-learn.org/) - Simple and efficient tools for predictive data analysis
- [Pandas](https://pandas.pydata.org/) - Data manipulation and analysis library
- [NumPy](https://numpy.org/) - Fundamental package for scientific computing with Python
- [TensorFlow](https://www.tensorflow.org/) - End-to-end open source machine learning platform
- [Keras](https://keras.io/) - Deep learning API for Python

## Database
- [Monogodb](https://www.mongodb.com/) - Cross-platform document-oriented NoSQL database.

---
## Run yourself
> Make sure you have [mongodb](https://www.mongodb.com/try/download/community), [nodejs](https://nodejs.org/), and [Python](https://www.python.org/) installed on your system before proceeding.

1. Clone this repo
```bash
git clone https://github.com/nimone/Fashion-Store && cd Fashion-Store
```
2. Install project dependencies
```bash
cd ./api && npm install
cd ./client && npm install
cd ../ml && pip install -r requirements.txt
```
3. Start development servers (api, client & ML model) with the provided script `rundev.sh`
```bash
bash rundev.sh
```
> Or, start them manually:
- For the API and client:
  ```bash
  cd ../api && npm run dev
  cd ../client && npm run dev
  ```
- For the ML model:
  ```bash
  cd ../ml && python image_services.py
  ```
```

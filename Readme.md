# A sample VueJs project - Britecore

## Server setup (NodeJs)

``` bash
cd server 

# install dependencies
npm install

# we are using MongoDB to store the data, so use .env.example to set the MongoDB url
cp .env.example .env

# and modify this line
MONGODB_URL="mongodb://localhost/britecore"

# serve with hot reload at localhost:3001, to change the port edit in src/index.js
npm run start

# build for production with minification
npm run build
```

## Client setup (VueJs)
```bash
cd client 

# install dependencies
npm install

# since we are using a NodeJs backend
cp .env.example .env 

# and modify this line with the following
API_URL='http://localhost:3001/api/v1/'

# run the application, by default in port 8080
npm run dev

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Quiz

The quiz solution is located at ```quiz/quiz.js```  

```bash
# to run it use
node quiz.js 
```
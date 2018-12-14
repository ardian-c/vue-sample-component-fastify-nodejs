require("dotenv").config();
const XLSX = require("xlsx");
const fastify = require('fastify')({
  logger: true
});

const helmet = require("fastify-helmet");

fastify.register(
  helmet,
  // Example of passing an option to x-powered-by middleware
  { hidePoweredBy: { setTo: "PHP 4.2.0" } }
);

fastify.register(require("fastify-cors"), {
  origin: '*', // for development purposes only, will need to change when in server
});

const swagger = require('./config/swagger');

const routes = require('./routes');
const Payment = require('./models/Payment');

const mongoose = require("mongoose");
const connectionUrl = process.env.MONGODB_URL || 'mongodb://localhost/my_db';

mongoose.connect(connectionUrl, { useNewUrlParser: true })
.then(() => {
  fastify.log.info(`MongoDB connected to DB ${connectionUrl}`);
})
.catch(err => {
  fastify.log.error(err);
});

fastify.register(require('fastify-swagger'), swagger.options);

fastify.get('/', async(req, res) => {
  return { success: true, message: 'server working' };
});

routes.forEach((route, idx) => {
  fastify.route(route);
});

const getData = async() => {
  try {
    const dt = await XLSX.readFile('./data/data.xlsx', {});
    const first_worksheet = dt.Sheets[dt.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
    // const cols = data[0];
    const rawData = data.slice(1, -1);
    let paymentsData = [];
    rawData.forEach((item, idx) => {
        paymentsData.push({
          productId: item[0],
          name: item[1],
          description: item[2],
          date: item[3],
          amount: item[4]
        });
    });

    Payment.remove().exec()
      .then(() => {
        Payment.insertMany(paymentsData).then(res => {
          // nothing here
        }).catch(err => {
          fastify.log.error(err);
        });
      });
  } catch(err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

fastify.log.info(`successfully inserted dummy data`);

const initServer = async () => {
  try {
    await fastify.listen(3001);
    fastify.swagger();
    fastify.log.info(`server is running on port ${fastify.server.address().port}`);
  } catch(err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

getData();
initServer();
// Assuming you have already done "npm install fernet"
var fernet = require("fernet");
let secret = new fernet.Secret("TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=");
// Oh no! The code is going over the edge! What are you going to do?
let message =
  "gAAAAABcE35ysTuskl_aAj2lIt_o1fHROGrNDRax_GpelGpq6AkgAfKi_6RjztgGKtbIma0w2TpZHHwPWf4mzp7vMQRsnv2GcWW51pqlA1Fo3Nu6qXEClOwtyjT1rm1n3T7TMVZEAc6V5dvysNFW9hPpDZZ33IFdxZNZnQNxyYsvZMQEcS6dY7enmKklVN8G9-pfs_GebJuI";
let token = new fernet.Token({ secret: secret, token: message, ttl:0});
token.decode();

console.log(token.message);

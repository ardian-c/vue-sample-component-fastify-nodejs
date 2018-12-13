// Assuming you have already done "npm install fernet"
var fernet = require("fernet");
let secret = new fernet.Secret("TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=");
// Oh no! The code is going over the edge! What are you going to do?
let message =
  "gAAAAABcD8O5jsH6-ObRsUujBzZJJmZxV2Lyq1KPXo85HMPgCc1M0qtt8iHI9OR2PRONzzqJVKPVcD0kAvQ-Gqri_QO7wlFS0mefhJOhCQj0Jz25NBYmUafWQfR6kFLAokF4ymVuGlq4N0EL1ZX-HjVo_8_L9vE3knBa2W4WD3r0fiE6GEAGZ56PrCQ7XZBjyRQsIs_b5Yvv";
let token = new fernet.Token({ secret: secret, token: message, ttl:0});
token.decode();

console.log(token.message);

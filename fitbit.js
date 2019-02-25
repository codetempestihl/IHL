const FitbitApiClient = require("fitbit-node");
const client = new FitbitApiClient({
	clientId: "22DJKT",
	clientSecret: "035c49af103fcf40103a5191b88a3381",
	apiVersion: '1.2' // 1.2 is the default
});

module.exports = client
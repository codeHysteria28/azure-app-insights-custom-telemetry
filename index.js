const express = require('express');
const app = express();
const appInsights = require('applicationinsights');
require('dotenv').config();

// setting up app insights connection
appInsights.setup(process.env.APP_INSIGHTS_KEY).start();

// setting up client
let client = appInsights.defaultClient;

app.get('/', (req,res) => {
    client.trackEvent({name: "my custom event", properties: {customProperty: "custom property value"}});
    client.trackException({exception: new Error("handled exceptions can be logged with this method")});
    client.trackMetric({name: "custom metric", value: 3});
    client.trackTrace({message: "trace message"});
    client.trackDependency({target:"http://dbname", name:"select customers proc", data:"SELECT * FROM Customers", duration:231, resultCode:0, success: true, dependencyTypeName: "ZSQL"});
    client.trackRequest({name:"GET /customers", url:"http://myserver/customers", duration:309, resultCode:200, success:true});
    
    console.log('custom telemetry was sent...');
    return res.send('custom telemetry was sent..');
});

app.listen(process.env.PORT || 5000, () => console.log("Running on port " + process.env.PORT || 5000));
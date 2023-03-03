˘# Full Stack Project WebhookURL

## Backend API

- I've created 3 apis with Node js TypeScript:

1 - /set-timer (POST) : This api created to get data from client in body and check validate of data. data here means "hours", "minutes", "seconds", "webhookUrl". before save in db I've created schema file for mongoDB Joi npm package to validate data: "minutes" and "seconds" should be number between 0 and 60 and "hours" should be number, also "webhookUrl" should be a string url.
after that I've created a file to send POST request with empty body to the webhookUrl after the time expired.  
for example if webhookUrl is equal to "http://www.forexample.com". after the time expired : POST =====>"http://www.forexample.com/:id".

2 - /get-timer-status/:id (GET): This api created to find webhookUrl with Id in db. so if you send your id in params, if the id is valid and db included that id, it returns secondsLeft to time expired.

3 - /get-all-timers (GET) : I think this is clear. this api will return all ACTIVE webhookUrls with id and secondsLeft to expired from db.

- always there is an important middleware in my projects, I mean CustomError middleware. because all errors in response should have a single format to handle them easier and better in client-side. so this middleware is so important to handle errors and return them clear.

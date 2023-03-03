˘# Full Stack Project WebhookURL

install dependencies : npm install

deploy and run application : npm run deploy

## Backend API

- I've created 3 apis with Node js TypeScript:

1 - /set-timer (POST) : This api created to get data from client in body and check validate of data. data here means "hours", "minutes", "seconds", "webhookUrl". before save in db I've created schema file for mongoDB Joi npm package to validate data: "minutes" and "seconds" should be number between 0 and 60 and "hours" should be number, also "webhookUrl" should be a string url.
after that I've created a file to send POST request with empty body to the webhookUrl after the time expired.  
for example if webhookUrl is equal to "http://www.forexample.com". after the time expired : POST =====>"http://www.forexample.com/:id".

2 - /get-timer-status/:id (GET): This api created to find webhookUrl with Id in db. so if you send your id in params, if the id is valid and db included that id, it returns secondsLeft to time expired.

3 - /get-all-timers (GET) : I think this is clear. this api will return all ACTIVE webhookUrls with id and secondsLeft to expired from db.

- always there is an important middleware in my projects, I mean CustomError middleware. because all errors in response should have a single format to handle them easier and better in client-side. so this middleware is so important to handle errors and return them clear.

## Frontend side

The packages that I used in this project : 
{
 "axios": for http requests,
 "react-notifications-component": to show notifications and http responses,
 "styled-components": for styling,
}
There is a dir that named services. In this dir I wrote a method (Api) and I use it to http requests (get and post ).
There is a dir that named utils. In this dir I wrote two method ( notif & validation ).
notif is used for notifications and showing response of requests and I use react-notification library for this.
validation is a method that used to check validation of values of each input.
There are some component (button , input)

There is Home component that involve 2 components ( Hero & Table )
In Hero component there is a form and when user submit times and url it send data to backend and refresh table to give a new update of timers.

In table component there is a table to show the timers.
In each render it update data from backend and give remain seconds and convert it to a countdown timer in hh:mm:ss format.
If timers less than 5 min the color of timer change to red color.
If timer finishes, it is removed from table and send request to backend to update again the table with a new data.

The titles of table is an input and user can search in table with url and id.
If the id that entered isn't available, table shows a button to check online from backend.
And when click the button, id send to backend to check id and after that It show the response of backend.


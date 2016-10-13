### CMPE277_Project

[ ![Codeship Status for lelea2/college-recommend](https://app.codeship.com/projects/bf03fd80-731c-0134-211c-52e76941e580/status?branch=master)](https://app.codeship.com/projects/178802)

#### Service app for college recommendation

##### Dashboard

Web application to process data, and generate algorithm for college recommendation


ec2 key config in your own ./ec2/credential.json

```
{
  "accessKeyId": "",
  "secretAccessKey": "",
  "region": ""
}
```

Tech stack

* NodeJS
* ReactJS
* DynamoDB
* Bower
* ChartJS


Preference testing:

https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai

```javascript
//Setting to access AWS
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  vogels.AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
  });
} else {
  vogels.AWS.config.loadFromPath('./.ec2/credential.json');
}
```

******Heroku command

```
heroku restart -a college-recommended

heroku logs -t -t college-recommended

```

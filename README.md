# Contact Tracker API

> This is a Node/Express/MongoDB REST API for contacts that uses JWT authentication. All contact endpoints are protected and each registered user has their own contacts. It is the API ONLY. The client app can be found [here](https://github.com/melliottgithub/HT-static) .

Demo : [here](http://18.217.17.250/api)

user : test@test.com
password : password

## Usage

### Getting Started


### Install dependencies
```bash
yarn
```

### Run dev environment
```bash
yarn dev
```

### Run production environment
```bash
yarn start
```

### Config

Rename `example.env` file to `.env`

Fill in the variables 

```javascript
//Add the mongo db url with secret
DB_URL=XXX
//Add any keyword
SECRET=XXX
```
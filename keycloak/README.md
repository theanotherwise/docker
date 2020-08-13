# Mosquitto

```bash
docker-compose up --build keycloak

docker-compose up --build sonarqube
docker-compose up --build grafana
```


## Descriptions

### Requirements
Install required packages where want to run
```bash
* docker 
* docker-compose
```

### Versions `lock`

#### Mosquitto
```bash
eclipse-mosquitto           1.6.10
```

#### Node RED
```bash
# node.js docker image version
node                        12

# node.js modules
node-red                    1.1.3
node-red-admin              0.2.6
bcryptjs                    2.4.3
node-red-contrib-slack      2.0.0
node-red-contrib-bigtimer   2.3.1
node-red-dashboard          2.23.2
```

## Startup

### If `images` builded and no changed made
```bash
docker-compose up 
```

### Debug - build `image` again if changed some
```bash
docker-compose up --build
```

## Configuration

### Setup password

#### Using `node` with `bcryptjs` module
```bash
node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 8));" your-password-here
```

#### Or from `node-red-admin` 
```bash
node-red-admin hash-pw
```

### Setup `keycloak`
```bash
adminAuth: {
    type:"strategy",
    strategy: {
        name: "twitter",
        label: 'Sign in with Twitter',
        icon:"fa-twitter",
        strategy: require("passport-twitter").Strategy,
        options: {
            consumerKey: TWITTER_APP_CONSUMER_KEY,
            consumerSecret: TWITTER_APP_CONSUMER_SECRET,
            callbackURL: "http://example.com/auth/strategy/callback",
            verify: function(token, tokenSecret, profile, done) {
                done(null, profile);
            }
        },
    },
    users: [
       { username: "knolleary",permissions: ["*"]}
    ]
};
```

### Slack Token
Needed to type manually
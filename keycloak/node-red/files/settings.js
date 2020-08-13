module.exports = {
    flowFile: "flows.json",
    uiHost: process.env.RED_HOST || '127.0.0.1',
    uiPort: process.env.RED_PORT || 1880,
    mqttReconnectTime: 15000,
    serialReconnectTime: 15000,
    debugMaxLength: 1000,
    functionGlobalContext: {},
    exportGlobalContextKeys: false,
    logging: {
        console: {
            level: "debug",
            metrics: false,
            audit: false
        }
    },
    editorTheme: {
        projects: {
            enabled: false
        }
    },
    https: {
        key: require("fs").readFileSync('/root/.node-red/server.key.pem'),
        cert: require("fs").readFileSync('/root/.node-red/server.crt.pem')
    },
    // adminAuth: {
    //     type: "credentials",
    //     users: [
    //         {
    //             username: "admin",
    //             password: "$2b$08$RmqR8ZOwijrORKeC1ra/AekiCjp1TlmJ4VNLL4yDJ30V276Bu2w.a",
    //             permissions: "*"
    //         },
    //         {
    //             username: "guest",
    //             password: "$2b$08$RmqR8ZOwijrORKeC1ra/AekiCjp1TlmJ4VNLL4yDJ30V276Bu2w.a",
    //             permissions: "read"
    //         }
    //     ]
    // }
    adminAuth: {
        type: "strategy",
        strategy: {
            name: "Keycloak",
            label: 'Sign in with KeyCloak',
            icon: "fa-key",
            strategy: require("@exlinc/keycloak-passport"),
            options: {
                host: "https://node-red.com",
                realm: "localhost",
                clientID: "node-red",
                clientSecret: "761a35f4-f2bf-48ee-b2cb-999351d0242f",
                callbackURL: "/auth/strategy/callback",
                authorizationURL: "http://keycloak:8080/auth/realms/localhost/protocol/openid-connect/auth",
                tokenURL: "http://keycloak:8080/auth/realms/localhost/protocol/openid-connect/token",
                userInfoURL: "http://keycloak:8080/auth/realms/localhost/protocol/openid-connect/userinfo"
            },
            verify: function (accessToken, refreshToken, profile, done) {
                done(null, profile);
            }
        },
        users: [
            {
                username: "me@example.com", permissions: ["*"]
            }
        ]
    }
}
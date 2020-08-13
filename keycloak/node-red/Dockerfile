FROM node:12

RUN npm update -g && \
    npm install -g --unsafe-perm node-red@1.1.3 \
    node-red-admin@0.2.6 \
    bcryptjs@2.4.3 \
    node-red-contrib-slack@2.0.0 \
    node-red-contrib-bigtimer@2.3.1 \
    node-red-dashboard@2.23.2 \
    @exlinc/keycloak-passport@1.0.2

COPY ./files/settings.js /root/.node-red/
COPY ./files/flows.json /root/.node-red/

RUN openssl req -newkey rsa:4096 -x509  -sha256 -days 3650 -nodes \
            -out /root/.node-red/server.crt.pem \
            -keyout /root/.node-red/server.key.pem \
            -subj "/C=PL/ST=Mazovia/L=Warsaw/O=Applica Sp.z.o.o/OU=SRE/CN=node-red.applica.cloud"

CMD ["node-red"]
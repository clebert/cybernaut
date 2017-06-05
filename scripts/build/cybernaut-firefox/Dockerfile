FROM node:8

RUN wget -q -O - http://mozilla.debian.net/archive.asc | apt-key add -

RUN sh -c 'echo "deb http://mozilla.debian.net/ jessie-backports firefox-release" >> /etc/apt/sources.list.d/mozilla-firefox.list'

RUN apt-get update && apt-get install -y firefox xvfb

RUN npm install -g tap-mocha-reporter

COPY resources/cybernaut-xvfb.sh /opt/cybernaut-xvfb.sh

RUN ln -fs /opt/cybernaut-xvfb.sh /usr/local/bin/cybernaut-xvfb

COPY config.json /opt/cybernaut-config/config.json

COPY resources/config-schema.json /opt/node_modules/cybernaut/config-schema.json
COPY resources/package.json /opt/node_modules/cybernaut/package.json
COPY resources/types /opt/node_modules/cybernaut/types
COPY resources/dist /opt/node_modules/cybernaut/dist

RUN ln -fs /opt/node_modules/cybernaut/dist/index.js /usr/local/bin/cybernaut

WORKDIR /opt/node_modules/cybernaut

RUN npm install --production

WORKDIR /opt/cybernaut-tests

ENTRYPOINT ["cybernaut-xvfb"]

CMD ["1280x720", "spec"]

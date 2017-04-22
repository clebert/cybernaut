FROM node:7

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'

RUN apt-get update && apt-get install -y google-chrome-stable libgconf-2-4 xvfb

RUN npm install -g tap-mocha-reporter

COPY cybernaut-xvfb /opt/cybernaut-xvfb
RUN ln -fs /opt/cybernaut-xvfb /usr/local/bin/cybernaut-xvfb

COPY config.json /opt/config.json

COPY cybernaut /opt/node_modules/cybernaut
RUN ln -fs /opt/node_modules/cybernaut/dist/index.js /usr/local/bin/cybernaut

WORKDIR /opt/node_modules/cybernaut
RUN npm install --production

WORKDIR /opt/e2e-test

ENTRYPOINT ["cybernaut-xvfb"]

CMD ["1280x720", "spec"]

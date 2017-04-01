FROM markadams/chromium-xvfb-js:7

ADD . /opt/cybernaut-example

WORKDIR /opt/cybernaut-example

RUN rm -rf node_modules
RUN npm install
RUN apt-get update && apt-get install -y libgconf-2-4

CMD npm run chrome

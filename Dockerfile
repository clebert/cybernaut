FROM markadams/chromium-xvfb-js:7

ADD . /opt/cybernaut-travis/node_modules/cybernaut
ADD example/example.e2e.js /opt/cybernaut-travis/test.e2e.js

WORKDIR /opt/cybernaut-travis

RUN rm -rf node_modules/cybernaut/node_modules

RUN echo '{"name": "cybernaut-travis"}' > package.json

RUN npm install chromedriver
RUN apt-get update && apt-get install -y libgconf-2-4

CMD $(npm bin)/cybernaut

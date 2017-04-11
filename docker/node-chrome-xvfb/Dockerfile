FROM node

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'

RUN apt-get update && apt-get install -y google-chrome-stable libgconf-2-4 xvfb

RUN npm install -g chromedriver@2.29.0
RUN ln -fs /usr/local/lib/node_modules/chromedriver/lib/chromedriver/chromedriver /usr/local/bin/chromedriver

RUN npm install -g tap-mocha-reporter@3.0.3

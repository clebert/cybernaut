FROM node

RUN wget -q -O - http://mozilla.debian.net/archive.asc | apt-key add -
RUN sh -c 'echo "deb http://mozilla.debian.net/ jessie-backports firefox-release" >> /etc/apt/sources.list.d/mozilla-firefox.list'

RUN apt-get update && apt-get install -y firefox xvfb

# Cybernaut uses selenium-webdriver@3.3.0, which is incompatible with geckodriver@1.5.0.
# Until these incompatibilities have been solved, geckodriver@1.4.0 must be used.
RUN npm install -g geckodriver@1.4.0
RUN ln -fs /usr/local/lib/node_modules/geckodriver/geckodriver /usr/local/bin/geckodriver

RUN npm install -g tap-mocha-reporter@3.0.3

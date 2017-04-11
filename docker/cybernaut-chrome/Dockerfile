FROM clebert/node-chrome-xvfb

COPY cybernaut-xvfb /opt/cybernaut-xvfb
RUN chmod +x /opt/cybernaut-xvfb
RUN ln -fs /opt/cybernaut-xvfb /usr/local/bin/cybernaut-xvfb

COPY config.json /opt/config.json

COPY cybernaut /opt/node_modules/cybernaut
RUN chmod +x /opt/node_modules/cybernaut/dist/index.js
RUN ln -fs /opt/node_modules/cybernaut/dist/index.js /usr/local/bin/cybernaut
WORKDIR /opt/node_modules/cybernaut
RUN npm install --production

WORKDIR /opt/e2e-test

ENTRYPOINT ["cybernaut-xvfb"]

CMD ["1280x720", "/opt/config.json", "spec"]

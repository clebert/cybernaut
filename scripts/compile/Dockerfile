FROM node:8

COPY resources/package.json /opt/cybernaut/package.json

WORKDIR /opt/cybernaut

RUN npm install

RUN ln -fs /opt/cybernaut/node_modules/.bin/tsc /usr/local/bin/tsc

COPY resources/tsconfig.json /opt/cybernaut/tsconfig.json
COPY resources/types /opt/cybernaut/types
COPY resources/src /opt/cybernaut/src

ENTRYPOINT ["tsc"]

CMD ["--project", "."]

FROM clebert/cybernaut-chrome

COPY . /opt/e2e-test

RUN rm -rf node_modules
RUN rm -rf screenshots

# Optional:
COPY config.json /opt/config.json

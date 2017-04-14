FROM clebert/cybernaut-firefox:latest

RUN npm install -g typescript@2.2.2

# The following files are copied into the Docker build context
# by the script `example/docker-build.sh`
COPY example.e2e.ts /opt/e2e-test/example.e2e.ts
COPY tsconfig.json /opt/e2e-test/tsconfig.json

RUN tsc --project .

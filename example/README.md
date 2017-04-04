# Cybernaut Example

![Example][1]

If you want to run the test **locally** then Node.js is required in version 7 or higher. A tool such as [avn][0] can be used to automatically select the appropriate Node.js version.

## Chrome

Run the test with your locally installed Chrome:

```sh
npm install && npm run chrome
```

Alternatively, run the test in a docker container:

```sh
mkdir -p screenshots && \
docker build -t clebert/cybernaut-example . && \
docker run -v $(cd screenshots; pwd):/opt/cybernaut-example/screenshots -t clebert/cybernaut-example
```

## Firefox

Run the test with your locally installed Firefox:

```sh
npm install && npm run firefox
```

[0]: https://github.com/wbyoung/avn
[1]: https://raw.githubusercontent.com/clebert/cybernaut/master/example/example.png

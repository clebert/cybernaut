# Cybernaut Example

![Example][1]

If you want to run the example **locally** then Node.js is required in version 7 or higher. A tool such as [avn][0] can be used to automatically select the appropriate Node.js version.

## Chrome

Run the example with your locally installed Chrome:

```sh
npm install && npm update && \
npm run chrome
```

Alternatively, run the example in a [Docker][2] container:

```sh
mkdir -p screenshots && \
docker build -t clebert/cybernaut-example . && \
docker run -ti --rm -v $(cd screenshots; pwd):/opt/cybernaut-example/screenshots clebert/cybernaut-example
```

*Note: A `screenshots` directory is created and shared with the [Docker][2] container.*

## Firefox

Run the example with your locally installed Firefox:

```sh
npm install && npm update && \
npm run firefox
```

[0]: https://github.com/wbyoung/avn
[1]: https://raw.githubusercontent.com/clebert/cybernaut/master/example/example.png
[2]: https://www.docker.com/

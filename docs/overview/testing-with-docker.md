# Testing with Docker

Tests written with Cybernaut can be run on Docker.
This has the advantage of being able to run them independently of the environment and under reproducible conditions.

## Installation

Only Docker must be [installed][docker-installation], no further dependencies are necessary.

## Docker containers

Cybernaut provides two fully configured Docker containers, which can be found on [Docker Hub][docker-hub-clebert]:

* `cybernaut-chrome` allows testing on Chrome ([Docker tags][chrome-tags])
* `cybernaut-firefox` allows testing on Firefox ([Docker tags][firefox-tags])

Each Docker tag corresponds to the same tag or version of `cybernaut` on [npm][npm-cybernaut].

## Getting started

To get started, copy your test files into the `/opt/cybernaut-tests/` directory inside the Docker container:

```dockerfile
COPY example.e2e.js /opt/cybernaut-tests/example.e2e.js
```

or mount the directory containing your test files as a [data volume][docker-mount]:

```sh
docker run -it --rm \
  -v "$(pwd)"/cybernaut-tests:/opt/cybernaut-tests \
  clebert/cybernaut-firefox:latest
```

The default configuration can be overridden in the same way:

```dockerfile
COPY config.json /opt/cybernaut-config/config.json
```

```sh
docker run -it --rm \
  -v "$(pwd)"/cybernaut-config:/opt/cybernaut-config \
  -v "$(pwd)"/cybernaut-tests:/opt/cybernaut-tests \
  clebert/cybernaut-firefox:latest
```

The default configuration for Chrome:

```json
{
  "capabilities": {
    "browserName": "chrome",
    "chromeOptions": {
      "args": [
        "--disable-gpu",
        "--no-sandbox"
      ]
    }
  }
}
```

and for Firefox:

```json
{
  "capabilities": {
    "browserName": "firefox"
  }
}
```

In addition, a default `CMD` instruction is configured to specify the virtual screen resolution and the reporter:

```dockerfile
CMD ["1280x720", "spec"]
```

*Note: tap-mocha-reporter is used to format the TAP output.
[Here][tap-mocha-reporters] is a list of all available reporters.*

You can override it with your own `CMD` instruction or with CLI arguments for `docker run`:

```sh
docker run -it --rm \
  -v "$(pwd)"/cybernaut-tests:/opt/cybernaut-tests \
  clebert/cybernaut-firefox:latest \
  1920x1080 dot
```

To enable debug output, you can set the `DEBUG='cybernaut:*'` environment variable:

```sh
docker run -it --rm \
  -e DEBUG='cybernaut:*' \
  -v "$(pwd)"/cybernaut-tests:/opt/cybernaut-tests \
  clebert/cybernaut-firefox:latest
```

*Note: When executing `docker run` for an image with chrome browser please add `-v /dev/shm:/dev/shm` [volume mount][docker-mount] to use the host's shared memory.
Since a Docker container is not meant to preserve state and spawning a new one takes less than 3 seconds you will likely want to remove containers after each test with `--rm` command.*

[chrome-tags]: https://hub.docker.com/r/clebert/cybernaut-chrome/tags/
[firefox-tags]: https://hub.docker.com/r/clebert/cybernaut-firefox/tags/
[docker-hub-clebert]: https://hub.docker.com/r/clebert/
[docker-installation]: https://docs.docker.com/engine/installation/
[docker-mount]: https://docs.docker.com/engine/tutorials/dockervolumes/#mount-a-host-directory-as-a-data-volume
[npm-cybernaut]: https://www.npmjs.com/package/cybernaut
[tap-mocha-reporters]: https://github.com/tapjs/tap-mocha-reporter/tree/master/lib/reporters

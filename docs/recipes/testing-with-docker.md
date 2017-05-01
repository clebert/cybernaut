# Testing with Docker

End-to-end tests written with Cybernaut can be run in a Docker container.
This has the advantage of being able to run them independently of the environment and under reproducible conditions.

*Note: The provided [example][example] can serve as a reference implementation.*

Cybernaut brings two fully configured Docker containers, which can be found on [Docker Hub][docker-hub-clebert].
One allows testing on Chrome:

```dockerfile
FROM clebert/cybernaut-chrome:4.0.0
```

 the other on Firefox:

```dockerfile
FROM clebert/cybernaut-firefox:4.0.0
```

You can find a list of available tags for `cybernaut-chrome` [here][chrome-tags] and for `cybernaut-firefox` [here][firefox-tags].
Each Docker tag corresponds to the same tag or version of `cybernaut` on [npm][npm-cybernaut].

The test files must be copied into the `/opt/e2e-test/` directory inside the Docker container:

```dockerfile
COPY example.e2e.js /opt/e2e-test/example.e2e.js
```

The default configuration can be overridden with the following Docker instruction:

```dockerfile
COPY config.json /opt/config.json
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
docker run -it --rm -v /dev/shm:/dev/shm clebert/cybernaut-chrome-example 1920x1080 dot
```

In order to get access to the captured screenshots, a local screenshots directory can be [mounted][docker-mount] into the `/opt/e2e-test/` directory inside the Docker container:

```sh
docker run -it --rm -v $(cd example/screenshots; pwd):/opt/e2e-test/screenshots -v /dev/shm:/dev/shm clebert/cybernaut-chrome-example
```

To enable debug output, you can set the `DEBUG=cybernaut:*` environment variable:

```sh
docker run -it --rm -v /dev/shm:/dev/shm -e DEBUG=cybernaut:* clebert/cybernaut-chrome-example
```

*Note: When executing `docker run` for an image with chrome browser please add `-v /dev/shm:/dev/shm` [volume mount][docker-mount] to use the host's shared memory.
Since a Docker container is not meant to preserve state and spawning a new one takes less than 3 seconds you will likely want to remove containers after each end-to-end test with `--rm` command.*

[chrome-tags]: https://hub.docker.com/r/clebert/cybernaut-chrome/tags/
[firefox-tags]: https://hub.docker.com/r/clebert/cybernaut-firefox/tags/
[docker-hub-clebert]: https://hub.docker.com/r/clebert/
[docker-mount]: https://docs.docker.com/engine/tutorials/dockervolumes/#mount-a-host-directory-as-a-data-volume
[example]: https://github.com/clebert/cybernaut/tree/master/example
[npm-cybernaut]: https://www.npmjs.com/package/cybernaut
[tap-mocha-reporters]: https://github.com/tapjs/tap-mocha-reporter/tree/master/lib/reporters

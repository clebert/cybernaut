# Development

## Installing the dev dependencies

```sh
npm install
```

*Note: Please also install Docker and make.*

## Watching the unit tests

```sh
npm run watch
```

## Running the CI checks

```sh
make clean && make
```

## Formatting the sources

```sh
npm run format
```

## Committing a new change

```sh
npm run cz
```

## Serving the documentation on localhost

```sh
npm run serve
```

## Releasing a new version

```sh
npm run release
```

```sh
DOCKER_USERNAME='clebert' DOCKER_PASSWORD='XXX' npm run push
```

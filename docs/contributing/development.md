# Development

## Installing the dev dependencies

```sh
npm install
```

*Note: Please also install Docker.*

## Watching the unit tests

```sh
npm run watch
```

## Running the unit tests (w/o watching)

```sh
npm test
```

## Running the example with Docker

```sh
npm run example
```

## Checking for formatting and linting errors

```sh
npm run check
```

## Formatting the sources

```sh
npm run format
```

## Committing a new change

```sh
npm run cz
```

## Serving the documentation

```sh
npm run docs
```

## Releasing a new version

```sh
npm run release
```

```sh
DOCKER_USERNAME='clebert' DOCKER_PASSWORD='XXX' npm run push
```

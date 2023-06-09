# SplitBillsAPI

This repository contains the code for the SplitBillsAPI.

## Getting Started

To get started, navigate to the project directory:

```
cd SplitBillsAPI/
```

Then, run the following command to start the development environment:

```
npm run dev
```

To build and run the application, use the following commands:

```
npm run build
npm start
```

To run tests, use the following command:

```
npm test
```

To continuously run tests, use the following command:

```
npm run test:watch
```

The server is running on `http://localhost:3000/api` by default.

## Postman Request

A collection of Postman requests for the API can be found at [link-to-postman-requests](https://elements.getpostman.com/redirect?entityId=27326733-6ba661f2-3403-49e6-b30b-70d19f3658e7&entityType=collection).

## Postman Collection

A collection of Postman requests for the API can be found in the `splitbillsapi.postman_collection.json` file in the root directory of the project.

## Docker

To build a Docker image of the application, use the following command:

```
docker build -t splitbillapi .
```

To run the Docker container, use the following command:

```
docker run -p 3000:3000 splitbillapi
```

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

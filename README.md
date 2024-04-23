<h1 align="center">Auth Service</h1>

<p align="center">Auth service using ECS, Cognito and Aurora Postgres</p>


# Contents

- [Setup](#setup)
  - [Requirements](#requirements)
  - [Running Locally](#run-locally)
  - [Running unit tests](#run-unit-tests)
  - [Running integration tests](#run-integration-tests)
  - [Other yarn commands](#yarn-commands)


## Setup
### Requirements

1. <b> Node 20</b> This can be installed [here](https://nodejs.org/en/download/current)

2. <b>Yarn</b> yarn package manager can be installed from [here](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

3. <b>Docker</b> docker installation [guide](https://www.docker.com/products/docker-desktop/)

4. <b>AWS Vault</b> follow this [guide](https://www.docker.com/products/docker-desktop/) to install aws vault

5. <b>CDK cli </b> cdk cli installed from [here](https://docs.aws.amazon.com/cdk/v2/guide/cli.html)

### Running Locally

After installing the aws-vault configure the profile with lyka sso through this [article](https://rhuaridh.co.uk/blog/using-aws-vault-with-sso.html) (please setup the profile for dev as foundations-dev etc.), and install all the packages using `yarn install`, add a file `.env` and copy the values from the `.env.example`, finally to run the project locally use below command.

```
aws-vault exec <profile-name> -- yarn start:local
```

this would spin up a server locally at port 3001, swagger specs can be accessed on `localhost:3001//api/cognito/v1/docs`

### Running unit tests

Unit tests can be found under `/src/__tests__/unit/`

To run the tests use below command

```
yarn test:unit
```

### Running integration tests

Unit tests can be found under `/src/__tests__/integration/`

Integration tests needs seed and migrations as a dependency. To run the integration test follow below steps.

1. Run the shell script under <b>seeds/development/create-cognito-users.sh</b>. This will generate create user in cognito userpools and generate a user.csv file

2. Start the aurora postgres docker comtainer locally using below command

```
 docker-compose -f docker-compose.ci.yml up -d db
```
3. Now run the migrations using below command

```
yarn migrations --env <env-name>
```

4. On Successful migration, run the seed script using

```
yarn seed:dev --env <env-name>
```

5. Run the integration tests through this command

```
aws-vault exec <profile> -- yarn test:integration
```

### Yarn Commands
- `yarn build` will compile the repository
- `yarn lint:fix` will lint the `src` directory, fixing all fixable errors.
- `yarn lint:commits` will run commitlint against all commits in your branch that aren't already in main

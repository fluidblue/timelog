## Installation

1. Install [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/)

2. Clone this repository to your local disk
```
git clone https://github.com/fluidblue/timelog.git
```

3. In the root directory of the repository, create a file `database_password.txt` and save a new password for the database in it.

4. Execute the following commands (also in the root directory of the repository):
```
docker-compose up -d
```

5. After starting up, start the angular development server (see [Angular.md](Angular.md)).

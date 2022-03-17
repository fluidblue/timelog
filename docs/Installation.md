## Installation

There are two types of installations:
The standard installation and the development installation.

If you just want to use TimeLog, the standard installation is sufficient.


### Standard installation

```
git clone https://github.com/fluidblue/timelog.git
cd timelog

# For the first time, this takes a long time, as sqlite3 is compiled.
npm install

# Make application
npm run make
```

Finally open the compiled application, which is placed in the `./electron/out` directory.


### Development installation

```
git clone https://github.com/fluidblue/timelog.git
cd timelog

# For the first time, this takes a long time, as sqlite3 is compiled.
npm install

# Start application
npm start

# Alternatively, you can start the application in two separate terminal windows with
npm run frontend:start
npm run electron:start
```

An electron instance will open automatically.

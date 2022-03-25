## Installation

There are two types of installations:
The standard installation and the development installation.

If you just want to use TimeLog, the standard installation is sufficient.


### Standard installation

```
git clone https://github.com/fluidblue/timelog.git
cd timelog

# Install dependencies
npm install -g @angular/cli
npm install # For the first time, this takes a long time, as sqlite3 is compiled.

# Make application
npm run package
```

Finally open the compiled application, which is placed in the `./electron/out` directory.

Hint: On Windows, you must use an administrative shell.


### Development installation

```
git clone https://github.com/fluidblue/timelog.git
cd timelog

# Install dependencies
npm install -g @angular/cli
npm install # For the first time, this takes a long time, as sqlite3 is compiled.

# Start application
npm start

# Alternatively, you can start the application in two separate terminal windows with
npm run frontend:start
npm run electron:start
```

An electron instance will open automatically.

Hint: On Windows, you must use an administrative shell.

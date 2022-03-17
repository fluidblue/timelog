#!/bin/bash

SCRIPT_DIR=${0%/*}

# Clean
source "$SCRIPT_DIR/clean.sh"

# Backend
tsc

# Frontend
# TODO

# Docs
cp ../*.md .
cp -R ../docs ./docs

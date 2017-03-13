#!/usr/bin/env node
"use strict";

var server = require("./app/server");

var app = server.Server.start().app;

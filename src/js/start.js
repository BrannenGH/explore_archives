#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server = require("./server");
exports.RunningServer = server.Server.start().app;

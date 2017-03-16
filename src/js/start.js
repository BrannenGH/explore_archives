#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server = require("./server");
var app = server.Server.start().app;

#!/usr/bin/env node
"use strict";

import * as server from "./server";

var app = server.Server.start().app;

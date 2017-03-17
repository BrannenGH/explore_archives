#!/usr/bin/env node
"use strict";

import * as server from "./server";

export var RunningServer = server.Server.start().app;

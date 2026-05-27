#!/usr/bin/env node
import { runSetup } from '../scripts/install-deps.mjs'

runSetup({ force: true, root: process.cwd() })

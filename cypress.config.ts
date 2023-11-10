import { defineConfig } from "cypress";
import { loadEnvConfig } from "@next/env";

import dotenv from "dotenv";
const env = dotenv.config({ path: ".env" }); //.env.test

export default defineConfig({
    env: env.parsed,
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: "http://localhost:3000",
    },
});

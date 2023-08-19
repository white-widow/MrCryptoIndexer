import { builder } from "@/builder";
import "@/schema/mr-crypto";
import "viem";
import { writeFileSync } from "fs";
import { resolve } from "path";
import { printSchema } from "graphql";

export const schema = builder.toSchema({});

writeFileSync(resolve(process.cwd(), "schema.graphql"), printSchema(schema));

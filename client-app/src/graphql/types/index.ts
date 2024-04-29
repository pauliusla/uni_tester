import { mergeTypeDefs } from "@graphql-tools/merge";
import { DocumentNode } from "graphql";

import user from "./user";

const types: DocumentNode[] = [user];

export default mergeTypeDefs(types);

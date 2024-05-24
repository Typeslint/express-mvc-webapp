import type { Config } from "jest";

export default async (): Promise<Config> => {
    return {
        preset: "ts-jest",
        verbose: true,
        modulePathIgnorePatterns: [
            "dist/",
            "node_modules/"
        ]
    };
};

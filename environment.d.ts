import { Session } from "inspector";
import NextAuth from "next-auth/next";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            SECRET: string;
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
        }
    }
}

declare module "next-auth" {
    interface Session {
        user: {
            name: string;
            email: string;
            image: string;
            id: string;
        };
    }
}

export {};

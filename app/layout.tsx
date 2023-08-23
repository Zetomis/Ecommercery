import "./globals.css";

import { ReactNode } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/previews/Navbar";
import Container from "@/components/previews/Container";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                <Container className="pt-20">{children}</Container>
                {/* Footer */}
            </body>
        </html>
    );
};

export default RootLayout;

import { AuthenticatedTemplate } from "@azure/msal-react";
import { ReactNode } from "react";
import { NavigationBar } from "./NavigationBar";
import { Box, Container, Paper } from "@mui/material";

interface PageLayoutProps {
    children: ReactNode;
}

export const PageLayout = ({children}:PageLayoutProps) => {
    return (
        <>
            <NavigationBar />
            <br/>
            <Container className="app_container" component="main">
                <Box sx={{ my: 3 }}>
                    {children}
                </Box>
            </Container>
        </>
    );
}
import { AuthenticatedTemplate, MsalAuthenticationTemplate } from "@azure/msal-react";
import { ReactNode, useEffect, useState } from "react";
import { NavigationBar } from "./NavigationBar";
import { Box, Container, Paper } from "@mui/material";
import { loginRequest, protectedResources } from "../authConfig";
import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { InteractionType } from "@azure/msal-browser";

interface PageLayoutProps {
    children: ReactNode;
}

export const PageLayout = ({children}:PageLayoutProps) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const authRequest = {
        ...loginRequest,
    };

    const apiAuth:any = useFetchWithMsal({
        scopes: protectedResources.oaprojectsApi.scopes.write,
    });

    const fetchData = () => {
        apiAuth.execute("GET", protectedResources.oaprojectsApi.authEndpoint + '/login').then((res:any) => {
            if (!!res) {
                setAuthenticated(res);
                console.log(res)
            }
        });
    }

    useEffect(() => {
        if(!apiAuth.data) {
            fetchData();
        }
    }, [apiAuth.execute, apiAuth.data]);

    return (
        <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            authenticationRequest={authRequest}
        >
            <NavigationBar />
            <br />
            {authenticated ?
                <Container className="app_container" component="main">
                    <Box sx={{ my: 3 }}>
                        {children}
                    </Box>
                </Container>
                : <div>need to authenticate</div>
            }

        </MsalAuthenticationTemplate>
    );
}
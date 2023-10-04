import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Nav, Navbar, Dropdown, DropdownButton } from 'react-bootstrap';
import MenuIcon, { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, } from "@mui/material";
import { loginRequest } from '../authConfig';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const NavigationBar = () => {
    const pages = [
        {   title: "Home", href: "/" },
    ];
    
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorElLogin, setAnchorElLogin] = useState<null | HTMLElement>(null);

    const { instance } = useMsal();
    const navigate = useNavigate();

    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
    }

    const handleLoginRedirect = () => {
        instance.loginRedirect(loginRequest)
            .catch((error) => console.log(error));
    };

    const handleLoginPopup = () => {
        /**
         * When using popup and silent APIs, we recommend setting the redirectUri to a blank page or a page 
         * that does not implement MSAL. Keep in mind that all redirect routes must be registered with the application
         * For more information, please follow this link: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/login-user.md#redirecturi-considerations 
         */

        instance.loginPopup({
            ...loginRequest,
            redirectUri: '/redirect'
        }).catch((error) => console.log(error));
    };

    const handleLogoutRedirect = () => {
        instance.logoutRedirect({
            account: instance.getActiveAccount(),
        });
    };

    const handleLogoutPopup = () => {
        instance.logoutPopup({
            mainWindowRedirectUri: '/', // redirects the top level app after logout
            account: instance.getActiveAccount(),
        });
    };

    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenLoginMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);

    }

    const handleCloseLoginMenu = () => {
        setAnchorElLogin(null);
    };

    const handleNavigateTo = (href:string) => {
        navigate(href);
    }

    /**
     * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
     * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
     * only render their children if a user is authenticated or unauthenticated, respectively.
     */
    return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar variant="dense">
                        <Typography variant="h6" component="div" align="left" sx={{ flexGrow: 1 }}>
                            Show Logger
                        </Typography>
                        <AuthenticatedTemplate>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {pages.map((page) => (
                                    <Button
                                        key={page.title}
                                        onClick={() => handleNavigateTo(page.href)}
                                        sx={{ color: 'white', display: 'block' }}
                                    >
                                        {page.title}
                                    </Button>
                                ))}
                            </Box>
                            <Button
                                onClick={handleOpenUserMenu}
                                color="inherit"
                            >
                                {activeAccount ? activeAccount.name : 'Unknown'}
                            </Button>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleLogoutPopup}>
                                    <Typography textAlign="center">Sign out using Popup</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleLogoutRedirect}>
                                    <Typography textAlign="center">Sign out using Redirect</Typography>
                                </MenuItem>
                            </Menu>
                            {/* <div className="collapse navbar-collapse justify-content-end">
                                <DropdownButton
                                    variant="warning"
                                    drop="start"
                                    title={activeAccount ? activeAccount.name : 'Unknown'}
                                >
                                    <Dropdown.Item as="button" onClick={handleLogoutPopup}>
                                        Sign out using Popup
                                    </Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={handleLogoutRedirect}>
                                        Sign out using Redirect
                                    </Dropdown.Item>
                                </DropdownButton>
                            </div> */}
                        </AuthenticatedTemplate>
                        <UnauthenticatedTemplate>
                        <Button
                                onClick={handleOpenLoginMenu}
                                color="inherit"
                            >
                                Login
                            </Button>
                        <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElLogin}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElLogin)}
                                onClose={handleCloseLoginMenu}
                            >
                                <MenuItem onClick={handleLoginPopup}>
                                    <Typography textAlign="center">Sign in using Popup</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleLoginRedirect}>
                                    <Typography textAlign="center">Sign in using Redirect</Typography>
                                </MenuItem>
                            </Menu>
                        </UnauthenticatedTemplate>
                    </Toolbar>
                </AppBar>
            </Box>
    );
};

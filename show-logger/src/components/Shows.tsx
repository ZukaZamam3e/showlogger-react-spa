import { Box, Tab, Tabs, Typography } from "@mui/material"
import { ReactNode, useState } from "react";

interface ShowsTabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

export const ShowsTabPanel = (props: ShowsTabPanelProps) => {
    const {children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

export const Shows = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const tabs = [
        { id: 0, label: "Shows", content: null },
        { id: 1, label: "TV Stats", content: null },
        { id: 2, label: "Movies Stats", content: null },
        { id: 3, label: "Friends", content: null },
        { id: 4, label: "Year Stats", content: null },
        { id: 5, label: "Watchlist", content: null },
        { id: 6, label: "AMC", content: null },
    ];

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
      };

    return (
        <Box>
            <Box sx={{ width: '100%',borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                    variant="scrollable"
                    //centered
                    //allowScrollButtonsMobile
                >
                    {tabs.map((tab: any, index) => (
                        <Tab
                            key={tab.id}
                            label={tab.label}
                        />
                    ))}
                </Tabs>
            </Box>
            {tabs.map((tab: any, index) => (
                <ShowsTabPanel
                    key={tab.id}
                    index={tab.id}
                    value={selectedTab}
                >
                    {tab.label}
                </ShowsTabPanel>
            ))}
        </Box>
    )
}
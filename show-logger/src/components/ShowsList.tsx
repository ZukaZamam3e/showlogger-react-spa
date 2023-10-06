import { useEffect, useState } from "react";
import { ShowModel, getShowData } from "../models/ShowModel"
import { ShowCard } from "./ShowCard";
import Grid from '@mui/material/Unstable_Grid2';
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
interface ShowsListProps {
    isMobile: boolean;
}

export const ShowsList = (props:ShowsListProps) => {
    const [shows, setShows] = useState<ShowModel[]>([]);

    const fetchData = () => {
        setShows(getShowData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        <Grid container spacing={1}>
        {shows.map((show: ShowModel, index) => (
                <ShowCard 
                    key={show.showId}
                    show={show}
                    isMobile={props.isMobile}
                />
            ))}
        </Grid>
        <Fab sx={{position:'fixed', 'bottom': 16, 'right': 16 }} color="primary" aria-label="add">
  <AddIcon />
</Fab>
        </>

    )
}
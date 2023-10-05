import { useEffect, useState } from "react";
import { ShowModel, getShowData } from "../models/ShowModel"
import { ShowCard } from "./ShowCard";
import Grid from '@mui/material/Unstable_Grid2';

export const ShowsList = () => {
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
                />
            ))}
        </Grid>
            
        </>

    )
}
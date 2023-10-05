import { ShowModel } from "../models/ShowModel";
import { Button, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

interface ShowCardProps {
    show: ShowModel;
}

export const ShowCard = (props:ShowCardProps) => {
    const showTypeIdZ = `${props.show.showTypeIdZ}${props.show.showTypeId === 1000 ? 
        ` - s${props.show.seasonNumber?.toString().padStart(2, "0")}e${props.show.episodeNumber?.toString().padStart(2, "0")}` 
        : ""}`
    return (
        <Grid xs={12}>
            <Card>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {props.show.showName}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {showTypeIdZ}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {props.show.dateWatched.toLocaleDateString()}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}
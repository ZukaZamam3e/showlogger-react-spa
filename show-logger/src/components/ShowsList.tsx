import { useEffect, useState } from "react";
import { ShowModel, createNewShow, getShowData } from "../models/ShowModel"
import { ShowCard } from "./ShowCard";
import Grid from '@mui/material/Unstable_Grid2';
import { Backdrop, BottomNavigation, Box, CircularProgress, Collapse, Fab, Fade, FormControlLabel, InputAdornment, Pagination, Paper, Switch, TextField, Zoom } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import useFetchWithMsal from "../hooks/useFetchWithMsal";
import { protectedResources } from "../authConfig";
import { EditShow } from "./EditShow";
import { CodeValueModel } from "../models/CodeValueModel";
import { ShowListSearch } from "./ShowListSearch";
import SearchIcon from '@mui/icons-material/Search';

interface ShowsListProps {
    isMobile: boolean;
}

export const ShowsList = (props: ShowsListProps) => {
    const [shows, setShows] = useState<ShowModel[]>([]);
    const [showTypeIds, setShowTypeIds] = useState<CodeValueModel[]>([]);
    const [editing, setEditing] = useState({ show: false, editingShow: createNewShow() });
    const [loaded, setLoaded] = useState(false);
    const [searching, setSearching] = useState(false);
    const [zoom, setZoom] = useState(false);
    // const fetchData = () => {
    //     setShows(getShowData);
    // }

    // useEffect(() => {
    //     fetchData();
    // }, []);

    const apiShowLoad: any = useFetchWithMsal({
        scopes: protectedResources.oaprojectsApi.scopes.write,
    });

    const apiShowSave: any = useFetchWithMsal({
        scopes: protectedResources.oaprojectsApi.scopes.write,
    });

    const apiShowGet: any = useFetchWithMsal({
        scopes: protectedResources.oaprojectsApi.scopes.write,
    });

    const fetchData = () => {
        setLoaded(false);
        apiShowLoad.execute("GET", protectedResources.oaprojectsApi.showEndpoint + '/load').then((res: any) => {
            if (!!res) {
                console.log(res);
                setShows(res.model.shows);
                setShowTypeIds(res.model.showTypeIds);
                setLoaded(true);
            }
        });
    }

    useEffect(() => {
        if (!apiShowLoad.data) {
            fetchData();
        }
    }, [apiShowLoad.execute, apiShowLoad.data]);

    const onShowSave = (saveData: ShowModel) => {
        apiShowSave.execute("POST", protectedResources.oaprojectsApi.showEndpoint + '/Save', saveData).then((res: any) => {
            let newShow: ShowModel = createNewShow();

            setEditing({ show: false, editingShow: newShow });
            fetchData();
        });
    }

    const onSearchUpdate = (text:string) => {
        if(text !== '') {
            apiShowSave.execute("GET", protectedResources.oaprojectsApi.showEndpoint + `/Get?search=${text}`).then((res: any) => {
                setShows(res.model.shows);
            });
        } else {
            apiShowSave.execute("GET", protectedResources.oaprojectsApi.showEndpoint + `/Get?offset=0`).then((res: any) => {
                setShows(res.model.shows);
            });
        }
        


    }

    const addNew = () => {
        let newShow: ShowModel = createNewShow();

        setEditing({ show: true, editingShow: newShow });
    }

    const onSelectShow = (show: ShowModel) => {
        console.log(show)
        setEditing({show: true, editingShow: show});
    }


    const onCancelSelectedShow = () => {
        setEditing({ show: false, editingShow: createNewShow() });
        fetchData();
    }

    

    const onToggleSearch = () => {
        setSearching((prev) => {
            if(prev) {
                onSearchUpdate('');
            }
            return !prev;
        });

        
        // setZoom((prev) => !prev);
    }

    const handleChange = () => {
        setZoom((prev) => !prev);
    }

    

    if (apiShowLoad.isLoading) {
        return (
            <Backdrop
                open={true}
                sx={{ color: '#000', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    } else if (editing.show) {
        return (
            <EditShow
                show={editing.editingShow}
                showTypeIds={showTypeIds}
                onCancelSelectedShow={onCancelSelectedShow}
                onShowSave={onShowSave}
            />
        )
    } else if (loaded) {
        return (
            <>
                <Grid container spacing={1}>
                    <Grid xs={12}>
                        {!props.isMobile &&
                            <ShowListSearch
                                isMobile={props.isMobile}
                                onSearchUpdate={onSearchUpdate}
                            />}
                        {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FormControlLabel
        control={<Switch checked={zoom} onChange={handleChange} />}
        label="Show"
      />
                        </Box> */}
                    </Grid>
                    {shows.map((show: ShowModel, index) => (
                        <ShowCard
                            key={show.showId}
                            show={show}
                            isMobile={props.isMobile}
                            onSelectShow={onSelectShow}
                        />
                    ))}
                </Grid>
                {searching ?
                    // <Fade in={searching}
                    // >

                    <ShowListSearch
                        isMobile={props.isMobile}
                        onCancelSearch={onToggleSearch}
                        onSearchUpdate={onSearchUpdate}
                    />
                    // </Fade>

                    :

                    // <Fade
                    //     in={!zoom}
                    // >
                    <div>
                        {props.isMobile &&
                            <Fab
                                sx={{ position: 'fixed', 'bottom': 32 + 56, 'right': 16 }}
                                color="primary"
                                aria-label="add"
                                onClick={onToggleSearch}
                            >
                                <SearchIcon />
                            </Fab>
                        }
                        <Fab
                            sx={{ position: 'fixed', 'bottom': 16, 'right': 16 }}
                            color="primary"
                            aria-label="add"
                            onClick={addNew}
                        >
                            <AddIcon />
                        </Fab>
                    </div>
                    // </Fade>
                }
            </>
        );
    } else {
        return <h1>Not handled case</h1>
    }
}
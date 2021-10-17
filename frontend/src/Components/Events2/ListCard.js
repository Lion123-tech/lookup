import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
    Container,
    Grid,
    Typography,
    Divider,
    Avatar,
    Paper,
    CircularProgress,
    createMuiTheme,
    makeStyles,
    ThemeProvider,
    CssBaseline,
    Badge,
    Chip,
    Card,
    CardMedia,
    CardActions,
    Button
} from "@material-ui/core";
import { EventBtn } from '../Buttons/EventBtn';
import sampleimg from '../../images/eventsample.jpeg'
import { openEventDrawer } from "../../store/uiSlice";

const useStyles = makeStyles((theme) => ({
    root: { display: 'flex' },

    content: {
        // flexGrow: 1,
        padding: theme.spacing(3),
    },

    chips: {
        display: 'flex',
        flexFlow: 'row wrap',
        margin: theme.spacing(1),
    },

    chip: {
        margin: theme.spacing(1),
    },

    card: {
        margin: theme.spacing(2),
        display: 'grid',
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: '1fr 2fr',
        },
        [theme.breakpoints.down('xs')]: {
            gridTemplateRows: '1fr 1fr',
        },
    },
    proot: {
        paddingTop: theme.spacing(.5),
    },
    img: {
        width: '90%',
        // margin:"-50px",
        objectFit: 'fill',
        height: '60%',
        borderRadius: '10px',
        // backgroundSize: 'contain',
        [theme.breakpoints.down("md")]: {
            width: '100%',

        },
        '-webkit-box-reflect': "below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(50%, 50%) , to(rgba(250, 250, 250, 0.9)))",
    },
    btn: {
        color: "red",
        fontSize: "2.2rem"
    },
    MuiCardMediaImg: {

    },
    eventbtn: {
        backgroundColor: "transparent",
        color: "#F8DE7E",
        borderColor: "#F8DE7E",
        fontSize: "1.2rem",
        "&:hover": {
            color: "white",

            backgroundColor: theme.palette.primary.yellow,
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "0.8rem",
        },
    },
    eventbtn2: {
        backgroundColor: "#F8DE7E",
        color: "while",
        borderColor: "#F8DE7E",
        fontSize: "1.2rem",
        "&:hover": {
            backgroundColor: theme.palette.primary.yellow,
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "0.8rem",
        },

    },
    title: {
        color: "#F8DE7E",
        fontSize: "28px",
        fontWeight: "bold",
    },
    subtitle: {
        color: "#F8DE7E",
        fontSize: "25px",
        // fontWeight: "bold",
    },
    info: {
        margin: theme.spacing(1),
    }
}));

function ListCard({ title, subtitle, content, eventIndex }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <>
            <Card style={{ border: "none", boxShadow: "none" }} key={title} className={classes.card}>
                <CardMedia
                    component="img"
                    classes={{ media: classes.img }}
                    className={classes.img}
                    style={{ webkitBoxReflect: "below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(250, 250, 250, 0.1)))" }}
                    image={sampleimg}
                    title="Live from space album cover"
                />

                <div className={classes.content}>
                    <Typography variant="h5" className={classes.title}>{title}</Typography>
                    <Typography variant="caption" className={classes.subtitle} >{subtitle}</Typography>
                    <Typography className={classes.info}  >Groups: Standard 3-5, 6-8, 9-12</Typography>
                    <Typography className={classes.info}  >Prize worth INR 1 lakhs+</Typography>
                    <Typography className={classes.info}  >online video submittion required</Typography>
                    <Typography className={classes.info}  >deadline: Sep 13,2020</Typography>

                    {/* <div>{content}..</div> */}
                    <CardActions >
                        <Button onClick={() => { dispatch(openEventDrawer(eventIndex)) }} className={classes.eventbtn} size="small">Click for more details</Button>
                        <Button className={classes.eventbtn2} size="small">Click to participate</Button>
                    </CardActions>
                </div>

            </Card>
            <Divider />
        </>
    )
}

export default ListCard

import { useEffect, useState } from "react";
import { createTheme } from "@material-ui/core";
import { useSelector } from "react-redux";
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
import ListCard from "./ListCard";
import { EventDetails } from "../Events/EventDetails";


const primaryColor = '#f1f1f1';



const useStyles = makeStyles((theme) => ({
    root: { display: 'flex' },

    content: {
        flexGrow: 1,
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
            gridTemplateRows: '1fr 2fr',
        },
    },
    proot: {
        paddingTop: theme.spacing(.5),
    },
    proot2: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        border: '2px solid yellow',
        width: '100%',
    },
    img: {
        width: '100%',
        paddingTop: theme.spacing(.5),

        backgroundSize: 'cover'
    },
    text: {
        color:"#DBFD04",
        [theme.breakpoints.down("sm")]: {
            fontSize:'20px'
          },
          [theme.breakpoints.down("xs")]: {
            fontSize:'15px'
          },
    },
}));




const _tags = [...new Array(25)]
    .map(() => "speak-up national speech competition")
    .reduce((memo, tag) => ({ ...memo, [tag]: { value: false, badge: 23 } }), {});

const MainEvent = (props) => {
    const classes = useStyles();
    const theme = createTheme();
  const eventID = useSelector(state => state.ui.eventDrawer.eventID)

    theme.typography.h3 = {
        fontSize: '1.2rem',
        '@media (min-width:600px)': {
          fontSize: '1rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '2.4rem',
        },
      };
    const [tags, setTags] = useState(_tags)
    const posts = [...new Array(25)].map(() => ({
        title: `speak-up national speech competition`,
        subtitle: "by camp yellow",
        content: "test"
    }))
    return (
        <div className={classes.root}>
            <CssBaseline />
            <main className={classes.content}>
                <Container>
                    {/* <div className={classes.chips}> */}
                    <Paper className={classes.proot2}>
                        <Grid item container xs={12}>
                            <Typography className = {classes.text} style={{ color: "#DBFD04" }} variant="h4" style={{ fontWeight: "bold" }}>  Recommended Opportunities</Typography>

                        </Grid>
                        {/* <Typography style={{color:"#DBFD04"}} variant="h4" component="h2">
                                Recommended Opportunities
                            </Typography> */}
                    </Paper>

                    {/* </div> */}

                    <Divider />
                    <Paper className={classes.proot}>
                        {posts.map(({ title, subtitle, content }, index) => (
                            <>
                                <ListCard eventIndex={index} title={title} subtitle={subtitle} content={content} />
                            </>
                        ))}
                    </Paper>
                </Container>
            <EventDetails  {...posts[eventID]} eventImage="https://source.unsplash.com/random"/>
            </main>
        </div>
    )
}

export default MainEvent
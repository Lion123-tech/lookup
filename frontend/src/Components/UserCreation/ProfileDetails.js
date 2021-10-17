import { Collapse, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/uiSlice";
import { RedBtn } from "../Buttons/Buttons";
import {delAchievement, delSkill } from "../../store/userProfileSlice";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  mainHeader: {},
  subHeader: {
    width: "calc(100% - 1rem)",
    paddingLeft: "1rem",
    display: "inline-block",
  },
  subItem: {},
  rightIcon: {
    display: "inline-block",
    float: "right",
    backgroundColor: "white",
    "& > *": {
      display: "inline-block",
    },
  },
  iconOpen: {
    transform: "rotate(180deg)",
    transition: "0.2s linear",
  },
  iconClose: {
    transition: "0.2s linear",
  },
  sectionContent: {
    marginLeft: theme.spacing(4),
  },
  subItemHeader: {
    fontSize: "1rem",
    fontWeight: "700",
  },
  topHeader: {
    fontWeight: "700",
    fontSize: "1.2rem",
    width: "100%",
    height: "1rem",
    padding: theme.spacing(2, 0),
    "&::after": {
      content: '""',
      width: "100%",
      height: "1.5px",
      position: "relative",
      backgroundColor: "#adadad",
      zIndex: "-1",
      display: "inline-block",
      transform: "translateY(-35px)",
    },
  },
  headerText: {
    backgroundColor: "white",
    // zIndex: "2",
    // position: "relative",
    paddingRight: "8px",
  },
  bottomContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  dateCompletion: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#adadad",
  },
  deleteBtn: {
    backgroundColor: "#D61900",
  },
  description: {
    wordWrap: "break-word",
    maxHeight: "5rem",
    overflow: "hidden",
  }
}));

const icons = {
  add: <AddIcon fontSize="small"/>,
  edit: <EditIcon fontSize="small"/>
}  

const bullet = (
  <svg
    focusable="false"
    aria-hidden="true"
    class=""
    style={{ height: "1rem" }}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="15" r="6"></circle>
  </svg>
);
const ProfileHeader = ({
  title,
  onEdit,
  onExpand,
  actionIcon,
  children,
  icon,
  editModal,
}) => {
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  //TODO: Get login state from redux
  const userLoggedIn = useSelector(state => state.auth.loggedIn);
  return (
    <div className={classes.profileSection}>
      <div className={classes.mainHeader}>
        <Typography className={classes.topHeader}>
          <span className={classes.headerText}>
            {icon} {title}
          </span>
          <div className={classes.rightIcon}>
            {onExpand && (
              <div>
                <IconButton
                  className={open ? classes.iconOpen : classes.iconClose}
                  size="small"
                  onClick={() => {
                    setOpen((prev) => !prev);
                  }}
                >
                  <ArrowDropDownIcon />
                </IconButton>
              </div>
            )}
            {userLoggedIn && onEdit && (
              <div>
                <IconButton size="small" onClick={onEdit}>
                  {actionIcon}
                </IconButton>
              </div>
            )}
          </div>
        </Typography>
      </div>
      <div className={classes.sectionContent}>
        <Collapse in={open}>{children}</Collapse>
      </div>
    </div>
  );
};

const ProjectInfo = ({ type, id, title, description, year }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const toggle = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div>
      <Typography component="span" className={classes.subItemHeader}>
        {title}
      </Typography>
      <IconButton
        size="small"
        onClick={toggle}
        className={open ? classes.iconOpen : classes.iconClose}
      >
        <ArrowDropDownIcon />
      </IconButton>
      <Collapse in={open}>
        <Typography variant="body1" className={classes.description}>{description}</Typography>
        <div className={classes.bottomContent}>
          <Typography variant="body2" className={classes.dateCompletion}>
            {year}
          </Typography>
          <RedBtn
            variant="contained"
            onClick={() => {
              dispatch(delAchievement({ type: type, id: id }));
            }}
          >
            Delete
          </RedBtn>
        </div>
      </Collapse>
    </div>
  );
};

const AchievementList = ({ type }) => {
  const userDetails = useSelector((state) => state.auth.userInfo[type]);
  return (
    <>
      {userDetails && Object.keys(userDetails).map((index, id) => (
        <ProjectInfo
          id={userDetails[id]._id}
          key={id}
          type={type}
          title={userDetails[id].title}
          description={userDetails[id].description}
          year={userDetails[id].year}
        />
      ))}
    </>
  );
};

const SkillList = () => {
  const userSkills = useSelector((state) => state.auth.userInfo.skills);
  const dispatch = useDispatch()
  return (
    <>
      {userSkills && Object.keys(userSkills).map((skillID) => (
        <div>
          {bullet}  {userSkills[skillID]}
          <IconButton size="small"
          onClick={() => {dispatch(delSkill(userSkills[skillID]))}}
          >
            <DeleteIcon/>
            </IconButton>

        </div>
      ))}
    </>
  )
}
export const ProfileDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userInfo)

  return (
    <>
    <div>
    <ProfileHeader title="Education Details"
    actionIcon = {icons.edit}
    onEdit={() => {dispatch(openModal("profile"))}}
    >
      <div className={classes.subItem}>

          <Typography variant="body1">
            {bullet} Studying in <b>Class {userDetails.education.grade}</b>
          </Typography>
          <Typography variant="body1">
            {bullet} {userDetails.education.school}
          </Typography>
          <Typography variant="body1">
            {bullet} {userDetails.education.address}
          </Typography>
          <Typography variant="body1">
            {bullet} Previous class percentage - {userDetails.education.previouspercentage}%
          </Typography>
      </div>
      </ProfileHeader>
    <ProfileHeader title="Accomplishments" 
    actionIcon={icons.add}
    />
    <div className={classes.subHeader}>
      <div className={classes.subItem}>
        <ProfileHeader
          title="Projects"
          actionIcon={icons.add}
          onEdit={() => {
            dispatch(openModal("projects"));
          }}
          onExpand="TODO"
          icon={bullet}
        >
          <AchievementList type="projects" />
        </ProfileHeader>
      </div>
      <div className={classes.subItem}>
        <ProfileHeader
          title="Scholarships"
          actionIcon={icons.add}
          onEdit={() => {
            dispatch(openModal("scholarships"));
          }}
          onExpand="TODO"
          icon={bullet}
        >
          <AchievementList type="scholarships" />
        </ProfileHeader>
      </div>
      <div className={classes.subItem}>
        <ProfileHeader
          actionIcon={icons.add}
          title="Honors and Awards"
          onEdit={() => {
            dispatch(openModal("awards"));
          }}
          onExpand="TODO"
          icon={bullet}
        >
          <AchievementList type="awards" />
        </ProfileHeader>
      </div>
      <div className={classes.subItem}>
        <ProfileHeader
          title="Internships"
          actionIcon={icons.add}
          onEdit={() => {
            dispatch(openModal("internships"));
          }}
          onExpand="TODO"
          icon={bullet}
        >
          <AchievementList type="internships" />
        </ProfileHeader>
      </div>
      <div className={classes.subItem}>
        <ProfileHeader
          title="Others"
          actionIcon={icons.add}
          onEdit={() => {
            dispatch(openModal("others"));
          }}
          onExpand="TODO"
          icon={bullet}
        >
          <AchievementList type="others" />
        </ProfileHeader>
      </div>
    </div>
    <ProfileHeader title="Skills and Interests" onEdit={() => {dispatch(openModal("skills"))}} actionIcon={icons.add} >
          <SkillList/>
      </ProfileHeader>
  </div>
   </>
  );
};

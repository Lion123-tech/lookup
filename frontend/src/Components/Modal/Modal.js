import {
  Divider,
  Fade,
  IconButton,
  makeStyles,
  Modal,
  Paper,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/uiSlice";
import { LoginDialog } from "../LoginDialog/LoginDialog";
import AddAchievement from "../UserCreation/AddAchievement";
import { AddSkill } from "../UserCreation/AddSkill";
import ProfileEdit from "../UserCreation/ProfileEdit";

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    width: "800px",
    minHeight: "200px",
    maxWidth: "98vw",
    maxHeight: "80vh",
    padding: theme.spacing(1),
    overflow: "auto",
  },
  header: {
    display: "flex",
  },
  modalTitle: {
    display: "flex",
    alignItems: "center",
    flexGrow: "1",
  },
  modalChild: {
    paddingTop: theme.spacing(2),
  },
}));

const modals = {
  profile: {
    title: "Edit Profile",
    content: <ProfileEdit />,
  },
  projects: {
    title: "Add Project",
    content: <AddAchievement type="projects" />,
  },
  scholarships: {
    title: "Add Scholarship",
    content: <AddAchievement type="scholarships" />,
  },
  awards: {
    title: "Add Award",
    content: <AddAchievement type="awards" />,
  },
  internships: {
    title: "Add Internship",
    content: <AddAchievement type="internships" />,
  },
  others: {
    title: "Add other achievement",
    content: <AddAchievement type="others" />,
  },

  login: {
    title: "Login",
    content: <LoginDialog />,
  },
  skills: {
    title: "Add Skill",
    content: <AddSkill/>
  }
};

export const CustomModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.ui.modal.modalOpen);
  const modalView = useSelector((state) => state.ui.modal.modalView);
  const onModalClose = () => {
    dispatch(closeModal());
  };
  return (
    <Modal
      onClose={onModalClose}
      open={modalOpen}
      className={classes.modalContainer}
    >
      <Fade in={modalOpen}>
        <Paper className={classes.modalContent}>
          <div className={classes.header}>
            <Typography variant={"h5"} className={classes.modalTitle}>
              {modals[modalView].title}
            </Typography>
            <IconButton onClick={onModalClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.modalChild}>{modals[modalView].content}</div>
        </Paper>
      </Fade>
    </Modal>
  );
};

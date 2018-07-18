import React from 'react';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Dvr from "@material-ui/icons/Dvr";
// core components
import Button from "components/CustomButtons/Button.jsx";

import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";

import Edit from "./Edit"


function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class ModalEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            data: [],
            editIdx: -1
        };
    }
    handleClickOpen(modal) {
        var x = [];
        x[modal] = true;
        this.setState(x);
    }
    handleClose(modal) {
        var x = [];
        x[modal] = false;
        this.setState(x);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <Button
                    justIcon
                     round
                    simple
                    onClick={() => this.handleClickOpen("modal")}
                     color="info"
                    >
                     <Dvr  />
                    </Button>
                </div>
                <Dialog
                    classes={{
                        root: classes.center,
                        paper: classes.modal
                    }}
                    open={this.state.modal}
                    transition={Transition}
                    keepMounted
                    onClose={() => this.handleClose("modal")}
                    aria-labelledby="modal-slide-title"
                    aria-describedby="modal-slide-description">
                    <DialogTitle
                        id="classic-modal-slide-title"
                        disableTypography
                        className={classes.modalHeader}>
                        <Button
                            justIcon
                            className={classes.modalCloseButton}
                            key="close"
                            aria-label="Close"
                            color="transparent"
                            onClick={() => this.handleClose("modal")}
                        >
                            <Close className={classes.modalClose} />
                        </Button>
                        
                    </DialogTitle>
                    <DialogContent
                        id="modal-slide-description"
                        className={classes.modalBody}>
                       
                        <Edit/>
                    </DialogContent>
                    <DialogActions
                        className={classes.modalFooter + " " + classes.modalFooterCenter}>
                    </DialogActions>

                </Dialog>
            </div>
        );
    }
}

export default withStyles(modalStyle)(ModalEdit);
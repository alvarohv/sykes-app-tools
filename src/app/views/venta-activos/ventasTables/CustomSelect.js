import React, { useState, useEffect } from 'react';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import BlockIcon from "@material-ui/icons/Block";
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from "@material-ui/core";


const defaultToolbarSelectStyles = {
  iconButton: {
  },
  iconContainer: {
    marginRight: "24px",
  },
};

//const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] = useState(false);

class CustomToolbarSelect extends React.Component {
  state = {
    setShouldOpenConfirmationDialog: false
  }
  
    handleClickInverseSelection = () => {
    const nextSelectedRows = this.props.displayData.reduce((nextSelectedRows, _, index) => {
      if (!this.props.selectedRows.data.find(selectedRow => selectedRow.index === index)) {
        nextSelectedRows.push(index);
      }

      return nextSelectedRows;
    }, []);

    this.props.setSelectedRows(nextSelectedRows);
  };

  handleClickEdit = () => {
    this.props.editar(this.props.displayData[this.props.selectedRows.data[0].index].data[0]);
  };

  handleClickDelete = () => {
    //alert(`Eliminar: ` + this.props.displayData[this.props.selectedRows.data[0].index].data[1]);
    //setShouldOpenConfirmationDialog(true)
    this.setState({ "setShouldOpenConfirmationDialog": true })
  };

//   handleConfirm = () => {
//     alert(`Eliminado!` + this.props.displayData[this.props.selectedRows.data[0].index].data[0]);
//     //setShouldOpenConfirmationDialog(true)
    
//   };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.iconContainer}>
        <Tooltip title={"Editar"}>
          <IconButton className={classes.iconButton} onClick={this.handleClickEdit}>
            <Edit className={[classes.icon].join(" ")} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Eliminar"}>
          <IconButton className={classes.iconButton} onClick={this.handleClickDelete}>
            <Delete className={classes.icon} />
          </IconButton>
        </Tooltip>

        <Dialog
            open={this.state.setShouldOpenConfirmationDialog}
            onClose={() => this.setState({ "setShouldOpenConfirmationDialog": false })}
            aria-labelledby="confirm-dialog"
            >
            <DialogTitle id="confirm-dialog">{"Confirmación"}</DialogTitle>
            <DialogContent>{<h4>¿Desea eliminar la campaña {this.props.displayData[this.props.selectedRows.data[0].index].data[1]}?</h4>}</DialogContent>
            <DialogActions>
                <Button
                variant="contained"
                onClick={() => this.setState({ "setShouldOpenConfirmationDialog": false })}
                color="secondary"
                >
                No
                </Button>
                <Button
                variant="contained"
                onClick={() => {
                    this.setState({ "setShouldOpenConfirmationDialog": false });
                    this.props.eliminar(this.props.displayData[this.props.selectedRows.data[0].index].data[0]);
                }}
                color="primary"
                >
                Sí
                </Button>
            </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, { name: "CustomToolbarSelect" })(CustomToolbarSelect);

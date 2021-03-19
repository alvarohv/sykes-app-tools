import React, { useState, Component, useRef, useEffect } from "react";
import {
  Button,
  Card,
  Grid, 
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Dialog,
  IconButton
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../../matx/components/MatxLoadable/Loading";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
//import AgregarDialog from './AgregarArticulo'
import { GetOrderById } from "../../redux/actions/OrderActions";
import { GetBenefitsById, GetBenefitsLocations} from "../../redux/actions/BenefitsActions";
import history from "history.js";
import { useParams } from "react-router";
import moment from "moment";
import LocationsTable from "./ubicacionesTable"
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles({
    cardcarrito: {     
        marginLeft: "3%",
        width: "96%",
        marginTop: "3%",
    },
    formcard: {
        "@media (min-width: 1023px)": {
            marginLeft: "0%",
            width: "100%",
        },
        "@media (min-width: 1024px)": {
            marginLeft: "25%",
            width: "50%",
        }
     
    },
    sectionbutton: {
        marginLeft: "25%",
        width: "50%",
        marginTop: "3%",
        marginBottom: "2%",
        textAlign: "center"
    },
    cellspace:{
        whiteSpace: "unset",
    }
});

const styles = (theme) => ({
    root: {
      margin: "auto",
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
});

const AdminBenefitDetalle = (props) => {
    
    const benefit = useSelector(state => state.benefit.benefit);
    const isLoading  = useSelector(state => state.benefit.loading);
    const isLoadingLocation  = useSelector(state => state.benefit.loadingLocation);
    const benefitslocations = useSelector(state => state.benefit.benefitslocations);
    const dispatch = useDispatch();
    const classes = useStyles();
    let { id } = useParams();
    const SPACED_DATE_FORMAT = "DD/MM/YYYY";
    const [shouldOpenDetailsDialog, setShouldOpenDetailsDialog] = useState(
        {
            open: false,
            index: 0,
        }   
    );

    useEffect(() => {
        dispatch(GetBenefitsById(id));
        dispatch(GetBenefitsLocations());
    }, []);

    const handleClose = () => {
        setShouldOpenDetailsDialog({open: false, index: 0});
      }

    const handleBack = () => {
        history.push("/Benefits/AdminFormBenefits"); 
    }

    return (
        <div className="m-sm-30">
            {(isLoading || isLoadingLocation) ? <Loading/> : 
            <Grid container spacing={2}>
                <Grid item md={12} xs={12}> 
                    <Card className={classes.formcard} elevation={6}>                              
                            <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">Detalles del beneficio</h2>
                             <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Name:</h6></TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].name }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Detail:</h6></TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].detail }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Description:</h6></TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].description }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Link:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].link }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Facebook:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].facebook }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Instagram:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].instagram }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Email:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ benefit[0] == undefined ? "" : benefit[0].email }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Active:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ 
                                            benefit[0] == undefined ? "" :  <Chip style={{backgroundColor: benefit[0].active ? "green" : "red", margin: "1%", color: "white"}} label={benefit[0].active ? "Active" : "Inactive"} key={benefit[0].active ? "Active" : "Inactive"} />}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Logo:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{
                                             benefit[0] == undefined ? null : <img
                                             className={classes.sectionbutton}                                         
                                             alt="..."
                                             src={`${benefit[0].logo}`}
                                             />
                                        }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"100%"} className={classes.cellspace + " pl-sm-24"}>
                                            <h6>Localizaciones:</h6>
                                        </TableCell>
                                        <TableCell className="px-sm-24"><LocationsTable benefitslocations={benefitslocations} type={"detail"} /></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            {/* <h2 style={{ textAlign: "center", marginTop: "2%"}} className="mb-20">Datos de la compra:</h2>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Campaña:</h6></TableCell>
                                        <TableCell width={"70%"} className="px-sm-24">{ order[0] == undefined ? "" : order[0].campaign.name }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Fecha:</h6></TableCell>
                                        <TableCell className="px-sm-24">{ (order[0] != null && order[0] != undefined && order[0].createdDate != "") ? moment(new Date(order[0].createdDate)).format(SPACED_DATE_FORMAT) : "" }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}><h6>Notas:</h6></TableCell>
                                        <TableCell width={"70%"} className="px-sm-24">{ order[0] == undefined ? "" : order[0].notes }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Total articulos comprados:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ order[0] == undefined ? "" : order[0].totalItems }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={"30%"} className={classes.cellspace + " pl-sm-24"}> <h6>Total Compra:</h6> </TableCell>
                                        <TableCell className="px-sm-24">{ order[0] == undefined ? "" : "₡" + order[0].total }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={3} className="px-sm-24 border-none">
                                        {<h5 className={classes.cardcarrito}>Articulos añadidos a la compra:</h5>}
                                        <Card className={classes.cardcarrito} elevation={2}>
                                            <div className="p-16">
                                            <Grid
                                                container
                                                spacing={2}
                                                justify="center"
                                                alignItems="center"
                                                direction="row"
                                            >
                                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                                Articulo
                                                </Grid>
                                                <Grid item lg={2} md={2} sm={2} xs={2}>
                                                Cant
                                                </Grid>
                                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                                Subtotal
                                                </Grid>
                                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                                Acciones
                                                </Grid>
                                            </Grid>
                                            </div>

                                            {(order[0] == undefined || order[0].detail == undefined || order[0].detail.length == 0) && <p className="px-16">No hay ningun artículo</p>}

                                            {(order[0] != undefined && order[0].detail != undefined) ? order[0].detail.map((item, index) => {
                                            return ( 
                                                <div className="px-16 py-16" key={item.item.id}>
                                                <Grid
                                                    container
                                                    spacing={2}
                                                    justify="center"
                                                    alignItems="center"
                                                    direction="row"
                                                >
                                                    <Grid item lg={3} md={3} sm={3} xs={3}>
                                                    {item.itemName}
                                                    </Grid>
                                                    <Grid item lg={2} md={2} sm={2} xs={2}>
                                                    {item.amount}
                                                    </Grid>
                                                    <Grid item lg={4} md={4} sm={4} xs={4}>
                                                    ₡ {item.subTotal}
                                                    </Grid>
                                                    <Grid item lg={3} md={3} sm={3} xs={3}>
                                                    <div className="flex">
                                                    
                                                        <Button
                                                        variant="contained"
                                                        className="bg-primary"
                                                        style={{color: "white"}}
                                                        onClick={() => setShouldOpenDetailsDialog({open: true, id: item.item.id, index: index})}
                                                        >
                                                        Detalles
                                                        </Button>
                                                    </div>
                                                    </Grid>
                                                </Grid>
                                                </div>
                                            ); 
                                            })
                                            : null }
                                        </Card>
                                        <br/>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>    */}
                            <div className={classes.sectionbutton}>
                                <Button variant="contained" onClick={handleBack} color="primary">
                                    VOLVER
                                </Button>
                            </div>
                    </Card>
                </Grid>
          </Grid>}
        </div>
    );
}

export default AdminBenefitDetalle
import React, { Component } from "react";
import ApiService from "./../api/index";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";


class ListPatientComponent extends Component {
    constructor(props) {
        super(props);

        this.deletePatient = this.deletePatient.bind(this);
        this.editPatient = this.editPatient.bind(this);
        this.addPatient = this.addPatient.bind(this);
        this.reloadPatientList = this.reloadPatientList.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);

        this.state = {
            patients: [],
            page: 1,
            count: 0,
            pageSize: 10,
            message: null
        };

    }

    componentDidMount() {
        this.reloadPatientList();
    }

    reloadPatientList() {
        const page =  this.state.page;
        const params = "?pageNo="+page+"&size="+this.state.pageSize;

        ApiService.fetchUsers(params).then(res => {
            console.log(res);
            const totalPages  = Math.round(res.data.total/this.state.pageSize);
            console.log("totalPages:"+totalPages);
            if(res.data.items){
                this.setState({ patients: res.data.items, count: totalPages });
            }
            else {
                this.setState({ norecord: "No patients found." });
            }
        });
    }

    deletePatient(patientId) {
        ApiService.deletePatient(patientId).then(res => {
            this.setState({ message: "Patient deleted successfully." });
            this.setState({
                patients: this.state.patients.filter(patient => patient._id !== patientId)
            });
        });
    }

    editPatient(id) {
        window.localStorage.setItem("patientDocId", id);
        this.props.history.push("/edit-patient");
    }

    addPatient() {
        window.localStorage.removeItem("patientDocId");
        this.props.history.push("/add-patient");
    }

    handlePageChange(event, value) {
        this.setState(
            {
                page: value,
            },
            () => {
                this.reloadPatientList();
            }
        );
    }

    render() {
        const {
            page,
            count
        } = this.state;
        return (
            <div>
                <Typography variant="h4" style={style}>
                    Patient Details
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.addPatient()}
                >
                    Add Patient
                </Button>

                <Table>
                    <TableHead>
                        { (this.state.message) ? (<TableRow><TableCell colSpan={6}>{ this.state.message }</TableCell></TableRow>) : (<TableRow></TableRow>)}
                        <TableRow>
                            <TableCell>PatientId</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Height</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Notes</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { (this.state.patients.length > 0) ? this.state.patients.map(row => (
                            <TableRow key={row.patientid}>
                                <TableCell component="th" scope="row">
                                    {row.patientid}
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.height}</TableCell>
                                <TableCell>{row.age}</TableCell>
                                <TableCell>{row.notes}</TableCell>
                                <TableCell>
                                    <CreateIcon onClick={() => this.editPatient(row._id)}/>
                                    <DeleteIcon  onClick={(e) => { if (window.confirm('Are you sure you wish to delete this patient?')) this.deletePatient(row._id) } }  />
                                </TableCell>
                            </TableRow>
                        )) : <TableRow><TableCell  colSpan={6} align={"center"}>{ this.state.norecord }</TableCell></TableRow>}
                        <TableRow><TableCell colSpan={6} align={"center"}> <Pagination
                            className="my-3"
                            count={count}
                            page={page}
                            siblingCount={1}
                            boundaryCount={1}
                            variant="outlined"
                            shape="rounded"
                            onChange={this.handlePageChange}
                        /></TableCell></TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }
}

const style = {
    display: "flex",
    justifyContent: "center"
};

export default ListPatientComponent;

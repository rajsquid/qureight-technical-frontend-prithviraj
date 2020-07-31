import React, { Component } from "react";
import ApiService from "./../api";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class EditPatientComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientid: "",
            name: "",
            height: "",
            age: "",
            notes: ""
        };
        this.savePatient = this.savePatient.bind(this);
        this.loadPatient = this.loadPatient.bind(this);
    }

    componentDidMount() {
        this.loadPatient();
    }

    goBack = e => {
        e.preventDefault();
        this.props.history.push("/");
    }

    loadPatient() {
        ApiService.fetchUserById(window.localStorage.getItem("patientDocId")).then(
            res => {
                let patient = res.data.items;
                this.setState({
                    patientDocId: patient._id,
                    patientid: patient.patientid,
                    name: patient.name,
                    height: patient.height,
                    age: patient.age,
                    notes: patient.notes
                });
            }
        );
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    savePatient = e => {
        e.preventDefault();
        let patient = {
            id: this.state.patientDocId,
            //password: this.state.password,
            name: this.state.name,
            height: this.state.height,
            age: this.state.age,
            notes: this.state.notes
        };
        ApiService.editPatient(patient).then(res => {
            this.setState({ message: "Patient added successfully." });
            this.props.history.push("/");
        });
    };

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>
                    Edit Patient
                </Typography>
                <form>
                    <TextField
                        placeholder="patientid"
                        fullWidth
                        margin="normal"
                        name="patientid"
                        readOnly={true}
                        value={this.state.patientid}
                    />

                    <TextField
                        placeholder="Name"
                        fullWidth
                        margin="normal"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                    />

                    <TextField
                        placeholder="Height"
                        fullWidth
                        margin="normal"
                        name="height"
                        value={this.state.height}
                        onChange={this.onChange}
                    />

                    <TextField
                        type="number"
                        placeholder="age"
                        fullWidth
                        margin="normal"
                        name="age"
                        value={this.state.age}
                        onChange={this.onChange}
                    />

                    <TextField
                        placeholder="Notes"
                        fullWidth
                        margin="normal"
                        name="notes"
                        value={this.state.notes}
                        onChange={this.onChange}
                    />

                    <Button variant="contained" color="primary" onClick={this.savePatient}>
                        Save
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.goBack}>
                        Cancel
                    </Button>
                </form>
            </div>
        );
    }
}

const style = {
    display: "flex",
    justifyContent: "center"
};

export default EditPatientComponent;

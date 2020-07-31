import React, { Component } from "react";
import ApiService from "./../api/index";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class AddPatientComponent extends Component {
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
    }

    savePatient = e => {
        e.preventDefault();
        let patient = {
            patientid: this.state.patientid,
            name: this.state.name,
            height: this.state.height,
            age: this.state.age,
            notes: this.state.notes
        };
        ApiService.addPatient(patient).then(res => {
            this.setState({ message: "Patient added successfully." });
            this.props.history.push("/");
        });
    };

    goBack = e => {
        e.preventDefault();
        this.props.history.push("/");
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>
                    Add Patient
                </Typography>
                {this.state.message}
                <form style={formContainer}>
                    <TextField
                        placeholder="Patient ID"
                        fullWidth
                        margin="normal"
                        name="patientid"
                        value={this.state.patientid}
                        onChange={this.onChange}
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
                        Back
                    </Button>
                </form>
            </div>
        );
    }
}

const formContainer = {
    display: "flex",
    flexFlow: "row wrap"
};

const style = {
    display: "flex",
    justifyContent: "center"
};

export default AddPatientComponent;

import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Footer = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar style={style}>
                    <Typography variant="caption" color="inherit" >
                        @2020
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

const style = {
    display: "flex",
    justifyContent: "center"
};

export default Footer;
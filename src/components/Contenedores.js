import { Box , withStyles } from "@material-ui/core";

export const RootBox = withStyles((theme) => ({
    root:{
        display: 'flex',
        marginLeft: 300,
        marginTop: 70,
        marginRight: 50,
        flexDirection: "column",
    },
    }))(Box);

export const RootBoxABM = withStyles((theme) => ({
    root:{
        display: 'flex',
        marginLeft: 300,
        flexDirection: "row",
        boxSizing: "unset",
        marginTop: 70
    },
    }))(Box);

export const FormBox = withStyles((theme) => ({
    root:{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        paddingRight: 500,
        outline: 0,
        overflowY: "auto",
        paddingTop: 50,
        marginBottom: 100,
        maxWidth: "1400px"
    },
    }))(Box);

export const RightFormBox = withStyles((theme) => ({
    root:{
        paddingTop: 30,
        position: "fixed",
        right: 0,
        height: "100%",
        display: "flex",
        backgroundColor: "white",
        width: "450px",
        flexDirection: "column",
        overflowY: "auto"
    },
    }))(Box);

export const LeftInputBox = withStyles((theme) => ({
    root:{
        display: "flex",
        flexDirection: "column",
        flex: "50%",
        maxWidth: "48%",
        marginBottom: 50
    },
    }))(Box);

export const RightInputBox = withStyles((theme) => ({
    root:{
        display: "flex",
        flexDirection: "column",
        flex: "50%",
        maxWidth: "48%",
        marginBottom: 50
    },
    }))(Box);

export const FullInputBox = withStyles((theme) => ({
    root:{
        display: "flex",
        flexDirection: "column",
        flex: "50%"
    },
    }))(Box);


export const ButtonBox = withStyles((theme) => ({
    root:{
        display: "flex",
        flexDirection: "column",
        margin: "10px 50px"
    },
    }))(Box);


export const SearchBox = withStyles((theme) => ({
    root:{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 20
    },
    }))(Box);

import { Box , withStyles } from "@material-ui/core";

export const RootBox = withStyles((theme) => ({
    root:{
        display: 'flex',
        marginLeft: 300,
        marginTop: 30,
        marginRight: 50,
        flexDirection: "column"
    },
    }))(Box);

export const RootBoxABM = withStyles((theme) => ({
    root:{
        display: 'flex',
        marginLeft: 300,
        flexDirection: "row",
        height: "100%",
        boxSizing: "unset"
    },
    }))(Box);

export const FormBox = withStyles((theme) => ({
    root:{
        paddingTop: 30,
        display: "flex",
        width: "100%",
        flexDirection: "column",
        paddingRight: 50
    },
    }))(Box);

export const LeftInputBox = withStyles((theme) => ({
    root:{
        display: "flex",
        flexDirection: "column",
        flex: "50%",
        maxWidth: 400,
        marginBottom: 50
    },
    }))(Box);

export const RightInputBox = withStyles((theme) => ({
    root:{
        display: "flex",
        flexDirection: "column",
        flex: "50%",
        maxWidth: 400,
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

export const RightFormBox = withStyles((theme) => ({
    root:{
        paddingTop: 30,
        display: "flex",
        backgroundColor: "white",
        height: "100%",
        width: "600px",
        flexDirection: "column"
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

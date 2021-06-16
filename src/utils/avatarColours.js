 export const avatarColours = (name) =>{
    if(name[0]==="A" || name[0] === "G" || name[0] === "M" || name[0] === "S" || name[0] === "Y" ){
        return "#2C8ABF"
    }
    if(name[0]==="B" || name[0] === "P" || name[0] === "N" || name[0] === "T" || name[0] === "Z" ){
        return "red"
    }
    if(name[0]==="C" || name[0] === "I" || name[0] === "O" || name[0] === "U"){
        return "yellow"
    }
    if(name[0]==="D" || name[0] === "J" || name[0] === "H" || name[0] === "V"){
        return "#159D74"
    }
    if(name[0]==="E" || name[0] === "K" || name[0] === "Q" || name[0] === "W"){
        return "violet"
    }
    if(name[0]==="F" || name[0] === "L" || name[0] === "R" || name[0] === "X"){
        return "orange"
    }
}
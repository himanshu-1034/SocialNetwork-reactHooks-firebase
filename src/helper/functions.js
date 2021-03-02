export default function makeId(length){
    var res = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charlen = characters.length;
    for(var i=0;i<length;i++){
        res += characters.charAt(Math.floor(Math.random()*charlen));
    }
    return res;
}
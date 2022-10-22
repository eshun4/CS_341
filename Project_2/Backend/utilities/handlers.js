const convertError = (obj) => {
    
    let err ={} 
    Object.keys(obj).forEach(key => {
    // err.push(obj[key]);
    err[key] = obj[key]["message"];
    });
    return err
}

module.exports = convertError;
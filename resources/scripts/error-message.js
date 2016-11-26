function errorMessageTranslate(errormsg){
    if(error_msgs[errormsg]){
        return error_msgs[errormsg];
    }
    return "Error("+errormsg+")";
}
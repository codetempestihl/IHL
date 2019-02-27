function edit(event){
    $('#edit').hide();
    $('#save').show();
    
    $('#first').prop('readonly', false);
    $('#last').prop('readonly', false);
    $('#prof-url').prop('readonly', false);
    $('#old-pass').prop('readonly', false);
    $('#new-pass').prop('readonly', false);
    $('#confirm-new-pass').prop('readonly', false);

    event.preventDefault();
    event.stopPropagation();
}

function editDevice(event){
    $('#editDevice').hide();
    $('#update').show();

    $('#steps').prop('readonly', false);
    $('#calories').prop('readonly', false);

    event.preventDefault();
    event.stopPropagation();
}

countData();
function countData(){
    $.ajax({
        url: "http://localhost:8000/api/user",
        method: 'get',
        dataType: 'json',
        success: function (data) {
            $('#countData').text(data.length);
        }
    });
}
//index- get user data
$.ajax({
    url: "http://localhost:8000/api/user",
    method: 'get',
    dataType: 'json',
    success: function (data) {
        //way 1: user foreach

        data.forEach(data =>  $('#appendData').append("<tr class='user"+data.id+"'>" +
            "<td>"+data.id+"</td>"+
            "<td>"+data.name+"</td>"+
            "<td>"+ data.email +"</td>"+
            "<td><a class='btn btn-danger deleteUser' data-id='"+data.id+"'>Delete <i class='fa fa-trash'></i></a></td>"+
            "<td><a class='btn btn-info updateUser' data-id='"+data.id+"'>Update <i class='fa fa-user'></i></a></td>"+
            "<td><a class='btn btn-warning showUser' data-id='"+data.id+"'>Show <i class='fa fa-eye'></i></a></td>"+
            "</tr>"));

        $('#countData').text(data.length);

        //way2 use for

        // for (let i =0; i <data.length; i++){
        //     $('#appendData').append("<tr class='user"+data[i].id+"'>" +
        //         "<td>"+data[i].id+"</td>"+
        //         "<td>"+data[i].name+"</td>"+
        //         "<td>"+ data[i].email +"</td>"+
        //         "<td><a class='btn btn-danger' data-id='"+data[i].id+"'>Delete <i class='fa fa-trash'></i></a></td>"+
        //         "<td><a class='btn btn-info' data-id='"+data[i].id+"'>Update <i class='fa fa-user'></i></a></td>"+
        //         "</tr>");
        // }
    },
    error: function (response) {
        console.log(response);
    }
});

//create new user
$('#createUserBtn').click(function () {
    $('#createModal').modal('show');
});
//store action
$('#createForm').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        url: 'http://localhost:8000/api/user/create',
        method: 'post',
        dataType: 'json',
        data: $('#createForm').serialize(),
        success: function (data) {
            $('#appendData').append("<tr class='user"+data.id+"'>" +
                "<td>"+data.id+"</td>"+
                "<td>"+data.name+"</td>"+
                "<td>"+ data.email +"</td>"+
                "<td><a class='btn btn-danger deleteUser' data-id='"+data.id+"'>Delete <i class='fa fa-trash'></i></a></td>"+
                "<td><a class='btn btn-info updateUser' data-id='"+data.id+"'>Update <i class='fa fa-user'></i></a></td>"+
                "<td><a class='btn btn-warning showUser' data-id='"+data.id+"'>Show <i class='fa fa-eye'></i></a></td>"+
                "</tr>");

            toastr.success(data.name +' has been created!');
            countData();
        },
        error: function (response) {
            console.log(response);
        }
    });
});

//delete user

$('#appendData').on('click','.deleteUser', function (e) {
    e.preventDefault();
    let id = $(this).data('id');
    $('#confirmDeleteModal').modal('show');
    $('#confirmDeleteBtn').click(function () {

        $.ajax({
            url: "http://localhost:8000/api/user/destroy/"+id,
            method: 'delete',
            success: function () {
                toastr.warning('Your user has been deleted!');
                $('.user'+id).remove();
            }
        });
        $('#confirmDeleteModal').modal('hide');
        toastr.error('You data has been removed!');
        countData();
    });

})


//show detail
$('#appendData').on('click','.showUser', function () {
    let id = $(this).data('id');
    $('#showUserModal').modal('show');

    $.ajax({
        url: "http://localhost:8000/api/user/"+id,
        method: 'get',
        dataType: 'json',
        success: function (data) {
            $('#showUserId').text(data.id);
            $('#showUserName').text(data.name);
            $('#showUserEmail').text(data.email);
            toastr.success('This is data user name: '+data.name+ ' with Id:' + data.id + ' , Email: '+ data.email);
        }

    });
})


//update

let update_Id;
$('#appendData').on('click','.updateUser', function () {
    update_Id = $(this).data('id');
    $('#updateModal').modal('show');
    $.ajax({
        url: "http://localhost:8000/api/user/"+update_Id,
        method: 'get',
        dataType: 'json',
        success: function (data) {
            $('#updateName').val(data.name);
            $('#updateEmail').val(data.email)
        }
    });

})

$('#formUpdate').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        url: 'http://localhost:8000/api/user/update/'+ update_Id,
        method: 'post',
        dataType: 'json',
        data: $('#formUpdate').serialize(),
        success: function (data) {
            console.log(data.id);
            $('.user'+data.id).replaceWith("<tr class='user"+data.id+"'>" +
                "<td>"+data.id+"</td>"+
                "<td>"+data.name+"</td>"+
                "<td>"+ data.email +"</td>"+
                "<td><a class='btn btn-danger deleteUser' data-id='"+data.id+"'>Delete <i class='fa fa-trash'></i></a></td>"+
                "<td><a class='btn btn-info updateUser' data-id='"+data.id+"'>Update <i class='fa fa-user'></i></a></td>"+
                "<td><a class='btn btn-warning showUser' data-id='"+data.id+"'>Show <i class='fa fa-eye'></i></a></td>"+
                "</tr>");
            toastr.success(data.name+' has been updated!');
        }

    });
})

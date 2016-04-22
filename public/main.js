/**
 * Created by Admin on 4/21/16.
 */
$(document).ready(function(){init()});

function init() {
    $('.post').on("click",function() {
        console.log('This');
        var img = $('#img').val();
        var nme = $('#name').val();
        var mess = $('#message').val();
        $.ajax({
            type: "POST",
            url: "/messages",
            data: {img:img,usr:nme,message:mess},
            success: null
        });
    })
    $('.delete').on("click",function() {
        console.log($(this).parent()[0].id);
        $.ajax({
            type: "DELETE",
            url: "/messages",
            data: {uuid : $(this).parent()[0].id},
            success: null
        });
        $(this).parent()[0].remove();
    })
    $('.edit').on("click",function() {
        var img = $('#editimg').val();
        var nme = $('#editname').val();
        var mess = $('#editmessage').val();
        console.log($(this).siblings()[4].id)
        $.ajax({
            type: "PUT",
            url: "/messages",
            data: {uuid :$(this).parent()[0].id,img:img,usr:nme,message:mess},
            success: null
        });
    })
}
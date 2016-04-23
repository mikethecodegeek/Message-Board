/**
 * Created by Admin on 4/21/16.
 */
$(document).ready(function(){init()});

function init() {
    $('.post').on("click",function() {

        var img = $('#img').val();
        var nme = $('#name').val();
        var mess = $('#message').val();
        var card = $('<div>',{class:"card delthis"});
        $('.delthis').on('click',function() {
        $(this).remove()
        });
        var img2 = $('<img>', {src: img});
        var message2 = $('<div>',{text: mess});
        var name2 = $('<div>',{text: nme});
        $(img2).addClass("col-md-6");
        $(message2).addClass("message col-md-5");
        $(name2).addClass("user col-md-5");
        var but =$('<button>',{text: "Delete"});
        $(but).addClass("delete");
        $(but).on('click',function() {
            $('.delthis').remove()
        });
        var thisbutton=$('<button>', {text: "Edit Post", id: 'makeedit'});
        $(thisbutton).on('click',function() {
            $(this).parent()[0].remove();
            $("#myModal2").modal('show');
        })
        card.append(img2,name2,message2,but,thisbutton); //,name,message);

        $.ajax({
            type: "POST",
            url: "/messages",
            data: {image:img,user:nme,message:mess},
            success: null
            
        });
        $('#myModal').modal('hide');
        $('body').append(card);
    })

    $('.delete').on("click",function() {
       // console.log($(this).parent()[0].id);
        $.ajax({
            type: "DELETE",
            url: "/messages",
            data: {id : $(this).parent()[0].id},
            success: null
        });
        $(this).parent()[0].remove();
    })
    $('#edit').on("click",function() {

        var img = $('#editimg').val();
        var nme = $('#editname').val();
        var mess = $('#editmessage').val();
       // console.log($(this).siblings()[4].id)
        var card = $('<div>',{class:"card"});
        var img2 = $('<img>', {src: img});
        var message2 = $('<div>',{text: mess});
        var name2 = $('<div>',{text: nme});
        $(img2).addClass("col-md-6");
        $(message2).addClass("message col-md-5");
        $(name2).addClass("user col-md-5");
        var but =$('<button>',{text: "Delete"});
        $(but).addClass("delete");
        $(but).on('click',function() {
            $(this).parent()[0].remove()
        });
        var thisbutton=$('<button>', {text: "Edit Post", id: 'makeedit'});
        $(thisbutton).on('click',function() {
            $("#myModal2").modal('show');
            console.log($(this).parent()[0])
            $(this).parent()[0].remove();
        })
        card.append(img2,name2,message2,but,thisbutton); //,name,message)
        $.ajax({
            type: "PUT",
            url: "/messages",
            data: {uuid :$(this).parent()[0].id,image:img,user:nme,message:mess},
            success: null
        });
        $("#myModal2").modal('hide');
        $('body').append(card);
    })
    $('#postnew').on("click",function() {
        $('#myModal').modal('show');
    })

}
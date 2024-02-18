$(document).ready(function () {
    $('.delete-article').on('click', function (e) {
        const target = $(e.target);
        const id = target.attr('data-id');
        
        $.ajax({
            type: 'DELETE',
            url: '/articles/' + id,
            success: function (response) {
                alert('Deleting Article...');
                window.location.href = '/'   // redirect to a page using JS
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
});
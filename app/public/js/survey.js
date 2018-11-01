
$(function () {
    // Grab info from the html
    const addEmployee = function (event) {
        event.preventDefault();


        // Grab the form elements
        const response = [];
        $('.question').each(function (i) {
            response.push(parseInt($(this).val()));
        });

        const newEmployee = {
            name: $('#empName').val().trim(),
            photo: $('#empPhoto').val().trim(),
            scores: response
        };

        //Clar the fields
        $('#empName').val('');
        $('#empPhoto').val('');
        $('.question').each(function (i) {
            $(this).val('');
        });
        console.log(newEmployee);

        //Add newEployee to the API

        $.ajax({
            method: 'POST',
            url: 'api/employees',
            data: newEmployee
        })
        // Make API call to the employees API

        const getEmployees = function () {
            $.ajax({
                method: 'GET',
                url: 'api/employees'
            }).then(function (data) {
                console.log(data);
                let baseScore = data[6].scores;
                console.log(baseScore);
            });
        }
        getEmployees();
    };


    $('#submit').on('click', addEmployee);
});



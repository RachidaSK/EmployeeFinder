$(function () {

    // Validate function

    const validateForm = function () {
        let isValid = true;

        $('input').each(function () {
            if (!$(this).val()) {
                isValid = false;
            }
        });

        $('.question').each(function (i) {
            if (!$(this).val()) {
                isValid = false;
            }
        });
        return isValid;
    }

    
    //Clear Input fields

    const clearInput = function () {
        $('#empName').val('');
        $('#empPhoto').val('');
        $('.question').each(function (i) {
            $(this).val('');
        });
    }

    //Create render function to render best match

    const render = function (object) {
        // Trigger the modal

        const empMatch = $(".bestMatch");
        empMatch.empty();
        empMatch.append(`<h1>${object.name}</h1>`);
        empMatch.append(`<img src=${object.photo} width="100%">`);
    }

    // Make API call to the employees API

    const getEmployees = function () {
        $(".submit").attr("data-target", "#empMatch");
        $.ajax({
            method: 'GET',
            url: 'api/employees'
        }).then(function (data) {
            const last = data[data.length - 1];
            const newScore = last.scores;
            const result = [];
            for (let i = 0; i < data.length - 1; i++) {
                const compScore = data[i].scores;
                const scoreDiff = [];

                for (let i = 0; i < compScore.length; i++) {
                    scoreDiff.push(Math.abs(newScore[i] - compScore[i]));
                }
                let sum = 0;
                for (let i = 0; i < scoreDiff.length; i++) {
                    sum += scoreDiff[i];
                }
                result.push(sum);
            }
            const miniMum = Math.min.apply(Math, result);
            const bestMatch = data[result.indexOf(miniMum)];
            render(bestMatch);
        });
    };


    const addEmployee = function (event) {
        event.preventDefault();
        console.log(validateForm());
        if (validateForm()) {
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
            clearInput();

            console.log(newEmployee);

            //Add newEployee to the API

            $.ajax({
                method: 'POST',
                url: 'api/employees',
                data: newEmployee
            });
            getEmployees();
        } else  {
            clearInput();
            $("#error").append("<div class='text-center alert alert-danger' role='alert>'>Please fill out all fields before submitting!</div>");
        }

    }
    $('#submit').on('click', addEmployee);

});



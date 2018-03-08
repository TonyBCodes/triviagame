$(document).ready(function () {

    //----- global variables-----------------------------------
    var right = 0;
    var wrong = 0;
    var alreadyasked = [];
    var qindex = 0;
    var howmany = 0;
    var qnaarray = [];
    // var rand = 0;
    var win = 0;
    var lose = 0;
    var coranswid;
    var timesplayed = 0;
    var time = 30;
    var timer;



    //----- functions------------------------------------------

    // generate a new random number
    function randnum() {
        // var x = (Math.floor(Math.random() * (howmany + 1)));
        // if (alreadyasked.includes(x)) {
        //     randnum();
        //     console.log("already have this num");
        // }
        // else {
        //     alreadyasked.push(x);
        //     console.log(x);
        //     return x;
        // }

        while(alreadyasked.length < 50){
            var x = Math.floor(Math.random()*50) + 1;
            if(alreadyasked.indexOf(x) > -1) continue;
            alreadyasked[alreadyasked.length] = x;
            return x;
        }
    }

    


    // show the question and answers
    function showqna(x) {
        var positions = [1, 2, 3, 4];
        // var wrngansw = [0, 1, 2];

        $("#question").html(qnaarray[x].question);

        //randomly pick the position id of the correct answer (1-4)
        var corrpos = ((Math.floor(Math.random() * 4)) + 1);
        coranswid = "#answer" + corrpos;
        $(coranswid).html(qnaarray[x].correct_answer);

        positions.splice((corrpos - 1), 1);

        for (var i = 0; i < 3; i++) {
            console.log(i);
            console.log(qnaarray[x].incorrect_answers[i]);
            var answid = "#answer" + positions[i];
            $(answid).html(qnaarray[x].incorrect_answers[i]);
        }

    }

    function startclock() {
        time = 30;
        $("#timer").html("Timer: 00:30");
        clearInterval(timer);
    }

    //30 second countdown timer
    function timer30() {

        var t;

        startclock();

        timer = setInterval(function () {
            time--;
            if (time < 10) {
                t = "Timer: 00:0" + time;
            }
            else {
                t = "Timer: 00:" + time;
            }
            console.log(time);
            $("#timer").html(t);

            if (time === 0) {
                console.log(time);
                clearInterval(timer);
                lose++;
                $("#loses").html("Loses: " + lose);
                showqna(randnum());
                play();
            }
        }, 1000);
    }

    function play() {
        showqna(randnum());
        timer30();
        var selected = false;

        $(".ans").bind('click', function () {
            var selectans = "#" + $(this).attr('id');
            console.log(selectans);
            if (selectans != coranswid) {
                lose++;
                $("#loses").html("Loses: " + lose);
                selected = true;
                clearInterval(timer);
                showqna(randnum());
                timer30();

                // timesplayed++;
                // timer30();
                // return;
            }
            if (selectans === coranswid) {
                win++;
                $("#wins").html("Wins: " + win);
                selected = true;
                clearInterval(timer);
                showqna(randnum());
                timer30();
                // timesplayed++;
                // timer30();
                // return;
            }
        });

        // if (time === 0) {
        //     lose++;
        //     $("#loses").html("Loses: " + lose);
        //     clearInterval(timer);
        //     showqna(randnum());
        //     timer30();
        //     // timesplayed++;
        //     // timer30();
        // };
        // }
    }

    // function play() {
    //     showqna(randnum());
    //     timer30();
    //     console.log(coranswid);
    //     var selected = false;

    //     // var countdown = setInterval(function () {
    //     // alert("Hello");

    //     $(".ans").bind('click', function () {
    //         var selectans = "#" + $(this).attr('id');
    //         console.log(selectans);
    //         if (selectans != coranswid) {
    //             lose++;
    //             $("#loses").html("Loses: " + lose);
    //             selected = true;
    //             // clearIntervan(countdown);
    //             // return;
    //         }
    //         if (selectans === coranswid) {
    //             win++;
    //             $("#wins").html("Wins: " + win);
    //             selected = true;
    //             // clearInterval(countdown);
    //             // return;
    //         }
    //     });
    //     // }, 30000);


    //     if (selected === false) {
    //         lose++;
    //         $("#loses").html("Loses: " + lose);
    //          // clearInterval(countdown);
    //         // return;
    //     }
    // }


    //----- end of functions-----------------------------------

    //----- start----------------------------------------------
    $(window).on("load", function () {
        $("#playscreen").hide();

        // $("#start").click("on", function () {
        //     $("#startscreen").hide();
        //     $("#playscreen").show();

        // })

        $.ajax({ url: "https://opentdb.com/api.php?amount=50&category=12&difficulty=easy&type=multiple", method: "GET" }).then(function (response) {
            console.log(response);
            qnaarray = response.results;
            console.log(qnaarray);
            howmany = qnaarray.length;
            console.log(howmany);


            $("#start").click("on", function () {
                $("#startscreen").hide();
                $("#playscreen").show();
                $("#wins").html("Wins: " + win);
                $("#loses").html("Loses: " + lose);



                // for (var q = 1; q < 51; q++) {
                // timer30();
                play();
                // }
            })

        });

    });
});
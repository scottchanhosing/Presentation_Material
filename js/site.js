// Write your Javascript code.
eventdata = []
var selected_day

$.ajax({
    url: "data.csv",
    async: false,
    success: function (csvd) {
        var items = $.csv.toObjects(csvd);
        var jsonobject = JSON.stringify(items);
        eventdata = items
    },
    dataType: "text",
    complete: function () {
    }
});
var app = angular.module("EventListApp", []);
app.controller("EventCtrl", function ($scope) {
    $scope.events = eventdata
    $scope.getItem = function getItem(idx, list, key) {
        return list[idx][key];
    };
    $scope.goToDate = function goToDate(year, month, day) {
        $('#datepicker').datepicker('update', new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
        $('#datepicker_input').val(
            $('#datepicker').datepicker('getFormattedDate')
        );
    }
    $scope.addData = function addData(event) {
        data = {};
        start_date = event.StartMonth + '-' + event.StartDate + '-' + event.StartYear;
        end_date = event.EndMonth + '-' + event.EndDate + '-' + event.EndYear;
        data[start_date] = [];
        content = '<span class="cal-event-name">' + '<i class="fa fa-circle ' + event.Nature + '"></i>'
        content +=  event.Name + '</span>';
        if (start_date == end_date) {
            content += '<span class="cal-event-time"><b>Date:</b> ' + start_date + ' to ' + end_date + '<br>'
        }
        else {
            content += '<span class="cal-event-time"><b>Date:</b> ' + start_date + '<br>'
        }
        content += '<b>Time:</b> ' + event.StartTime + ' to ' + event.EndTime + '</span>';
        content += '<span class="cal-event-venue">' + event.Venue + '</span>';
        content += '<span class="cal-event-detail">' + event.Description + '</span>';
        content += '<span class="cal-event-deadline"><b>Deadline:</b> ' + event.Deadline + '</span>';
        //content += '<span class="cal-event-link">Link:     ' + event.Link + '</span>';
        data[start_date].push({ 'content': content, endDate: end_date, allDay: true })
        $('#calendar').calendario('setData', data, false);
    }
});

$(function () {
    // Instantiate MixItUp:
    $('#Container').mixItUp();
    $('#datepicker').datepicker({
        todayHighlight: true,
    });
    $('#datepicker').on("changeDate", function () {
        $('#datepicker_input').val(
            $('#datepicker').datepicker('getFormattedDate')
        );
    });
    $('.go-to-calendar').click(function () {
        if ($('#search-bar').css("display") == "block") {
            $('.go-to-event-list').removeClass("active");
            $('.go-to-calendar').addClass("active");
            $('#search-bar').css("display", "none");
            $('#search-content').css("display", "none");
            $('#my-event').css('display', 'block');
            if (!($('.navbar-toggle').css('display') == 'none')) {
                $('.navbar-toggle').click()
            }        
        }
    })

    $('.go-to-event-list').click(function () {
        if ($('#search-bar').css("display") == "none") {
            $('.go-to-event-list').addClass("active");
            $('.go-to-calendar').removeClass("active");
            $('#search-bar').css("display", "block");
            $('#search-content').css("display", "block");
            $('#my-event').css('display', 'none');
            if (!($('.navbar-toggle').css('display') == 'none')) {
                $('.navbar-toggle').click()
            }
        }
    })

});


window.fbAsyncInit = function () {
    FB.init({
        appId: '325347081159964',
        xfbml: true,
        version: 'v2.5',
        cookie: true,
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function fblogin() {
    // Hex manipulation
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            // Already logged in
            console.log('connected')
            FB.api('/me', {
                fields: 'id, name'
            }, function (response) {
                //share(fbname);
                $(".fb-not-login").css('display', 'none');
                $(".fb-login").css('display', 'block');
                $(".fb-name").html(response.name)
            });
        } else {
            // Not yet logged in
            console.log('not connected')
            FB.login(function (response) {
                if (response.authResponse) {
                    // Log in success
                    console.log('logged in')
                    fblogin()
                }
            }, { scope: 'email, public_profile' }
            );
        }
    });
}


$(function () {

    function updateMonthYear() {
        $('#custom-month').html($('#calendar').calendario('getMonthName'));
        $('#custom-year').html($('#calendar').calendario('getYear'));
    }

    $(document).on('finish.calendar.calendario', function (e) {
        $('#custom-month').html($('#calendar').calendario('getMonthName'));
        $('#custom-year').html($('#calendar').calendario('getYear'));
        $('#custom-next').on('click', function () {
            $('#calendar').calendario('gotoNextMonth', updateMonthYear);
        });
        $('#custom-prev').on('click', function () {
            $('#calendar').calendario('gotoPreviousMonth', updateMonthYear);
        });
        $('#custom-current').on('click', function () {
            $('#calendar').calendario('gotoNow', updateMonthYear);
        });
    });

    $('#calendar').on('shown.calendar.calendario', function () {
        $('div.fc-row > div').on('onDayClick.calendario', function (e, dateprop) {
            $('.fc-calendar .fc-row > div.selected').removeClass('selected');
            $(e.target).addClass('selected');
            console.log(dateprop);
            if (dateprop.data) {
                showEvents(dateprop.data.html, dateprop);
            }
        });
    });

    var transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
    $wrapper = $('#custom-inner');

    function showEvents(contentEl, dateprop) {
        hideEvents();
        var $events = $('<div id="custom-content-reveal" class="custom-content-reveal"><h4>Events for ' + dateprop.monthname + ' '
        + dateprop.day + ', ' + dateprop.year + '</h4></div>')
        $close = $('<span class="custom-content-close"></span>').on('click', hideEvents);
        $events.append(contentEl.join(''), $close).insertAfter($wrapper);
        setTimeout(function () {
            $events.css('top', '0%');
        }, 25);
    }

    function hideEvents() {
        var $events = $('#custom-content-reveal');
        if ($events.length > 0) {
            $events.css('top', '100%');
            Modernizr.csstransitions ? $events.on(transEndEventName, function () { $(this).remove(); }) : $events.remove();
        }
    }

    $('#calendar').calendario({
        caldata: events,
        displayWeekAbbr: true,
        events: ['click', 'focus']
    });
})



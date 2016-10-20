// Write your Javascript code.
eventdata = []

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
    /*
    $scope.events = [
        {
            Name: "Financial Dialogue Day",
            StartDate: "13/11/2017",
            EndDate: "18/11/2016",
            StartTime: "18:30",
            EndTime: "20:30",
            Venue: "CUHK Campus",
            Target: "Members of The China Trade Society",
            Deadline: "18/10/2016 12:00",
            Link: "https://goo.gl/forms/ZTiFUZlncRlNo9xA3",
            Nature: "Talk",
            Description: "The China Trade Society is holding the Financial Dialogue Day on Oct 13 (Thursday) and Oct 18 (Tuesday) respectively. " +
                        "A number of sophisticated speakers, covering investment banking, private equity, real estate investment, risk and wealth management and insurance, are going to share their experiences and ideas in the event."+
                        "By joining the event, you are expected to: "+
                        "1. Connect to the latest investment banking development and future trend "+
                        "2. Understand potential financial opportunities in the Chinese market "+
                        "3. Identify the potential risks and mitigation " +
                        "4. Equip yourself with mindset and know-how to excel in future financial market "+
                        "5. Get to know the available internships offered by the firms the speakers are working in."
        },
        {
            Name: "ACCA Hong Kong Business Competition 2016",
            StartDate: "01/11/2016",
            EndDate: "31/11/2016",
            StartTime: "00:00",
            EndTime: "23:59",
            Venue: "CUHK Campus",
            Target: "All CUHK students",
            Deadline: "19/10/2016 16:00",
            Link: "http://www.anpasia.com/public/run-form.aspx?Id=46405C427745425843&EventId=45445C417340405843&SessionId=4646584575494A5A43",
            Nature: "Competition",
            Description: "SIE Fund and Youth.gov.hk jointly organise the SI (Social Innovation) CEO Competition with the theme 'Tackling Poverty Problems with Social Innovation'."+
                        "The Competition comprises experiential programmes, talk and the contest, with the objectives of enhancing understanding of 'poverty relief' and 'social innovation', inspiring innovative ideas and actions to tackle social and poverty problems and nurturing capability in social entrepreneurship among students. "+
                        "Basing on one, or more than one of the sub-themes, namely Care for Elderly, Food Support and Social Inclusion, participating teams should develop an innovative solution to social issue and formulate a business proposal."
        },
        {
            Name: "Treasury Markets Association (TMA) Challenge 2017",
            StartDate: "01/11/2016",
            EndDate: "31/01/2017",
            StartTime: "00:00",
            EndTime: "23:59",
            Venue: "CUHK Campus",
            Target: "All CUHK students",
            Deadline: "03/11/2016 23:00",
            Link: " http://www.tma.org.hk/en_newsevents_n1.aspx?NewsId=300",
            Nature: "Competition",
            Description: ""
        },
        {
            Name: "Chicago Quantitative Alliance (CQA) Investment Challenge",
            StartDate: "31/11/2016",
            EndDate: "31/03/2017",
            StartTime: "00:00",
            EndTime: "23:59",
            Venue: "CUHK Campus",
            Target: "All CUHK business students",
            Deadline: "20/11/2016 23:00",
            Link: "http://www.cqa.org/investment_challenge",
            Nature: "Competition",
            Description: ""
        },
        {
            Name: "Microsoft Hong Kong Limited",
            StartDate: "12/11/2016",
            EndDate: "12/11/2016",
            StartTime: "12:30",
            EndTime: "14:30",
            Venue: "CUHK Campus",
            Target: "All CUHK students",
            Deadline: "12/11/2016 00:00",
            Link: "https://cpdc.osa.cuhk.edu.hk/event/detail/microsofttalk20161012a",
            Nature: "RecruitmentTalk",
            Description: ""
        },
        {
            Name: "Nan Fung Development Limited",
            StartDate: "17/11/2016",
            EndDate: "17/11/2016",
            StartTime: "12:30",
            EndTime: "12:30",
            Venue: "CUHK Campus",
            Target: "All CUHK students",
            Deadline: "17/11/2016 00:00",
            Link: "https://cpdc.osa.cuhk.edu.hk/event/detail/nanfungtalk20161017a",
            Nature: "RecruitmentTalk",
            Description: ""
        },
        {
            Name: "Societe Generale",
            StartDate: "18/11/2016",
            EndDate: "18/11/2016",
            StartTime: "16:30",
            EndTime: "18:30",
            Venue: "CUHK Campus",
            Target: "All CUHK students",
            Deadline: "18/11/2016 00:00",
            Link: "https://cpdc.osa.cuhk.edu.hk/event/detail/sgtalk20161018p",
            Nature: "RecruitmentTalk",
            Description: ""
        }
    ];
    */
    $scope.events = eventdata
    $scope.getItem = function getItem(idx, list, key) {
        return list[idx][key];
    };
    $scope.goToDate = function goToDate(year, month, day) {
        //console.log(year, month, day);
        $('#datepicker').datepicker('update', new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
        $('#datepicker_input').val(
            $('#datepicker').datepicker('getFormattedDate')
        );
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
    $('.responsive-calendar').responsiveCalendar({
        events: {
            "2016-10-30": { "number": 5, "badgeClass": "badge-warning"},
            "2016-10-26": { "number": 1, "badgeClass": "badge-warning"},
        }
    });

    $('.go-to-calendar').click(function () {
        $('.go-to-calendar').css("display", "none");
        $('.go-to-event-list').css("display", "block");
        $('#search-bar').css("display", "none");
        $('#search-content').css("display", "none");
        $('#my-event').css('display', 'block');
    })

    $('.go-to-event-list').click(function () {
        $('.go-to-calendar').css("display", "block");
        $('.go-to-event-list').css("display", "none");
        $('#search-bar').css("display", "block");
        $('#search-content').css("display", "block");
        $('#my-event').css('display', 'none');
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

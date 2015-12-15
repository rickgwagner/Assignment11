/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {
    "use strict";
    $.getJSON("data/json.js", function (data) {
        $.each(data, function () {
            $.each(this, function (key, value) {
                var theID = value.ID;
                var theSubs = $.grep(data.teammembers, function (element, index) {
                    return element.ReportsTo == theID;
                });
                var numOfSubs = theSubs.length;
                var addIDclass = " class='" + theID + "'";

                // manager exceptions
                if (theID == 5) {
                    var destination = "#manager";
                } else if (theID == 6) {
                    var destination = "#manager";
                } else if (theID == 4) {
                    var destination = "#manager";
                } else {
                    var destination = "#detail";
                }

                $("#result").append(
                    "<li" + addIDclass + ">" + "<a href='" + destination + "'><img src='" + value.ImagePath + "'>" + "<h2>" + value.Name + "</h2>" + "<p>" + value.Title + "</p>" + "<span class='ui-li-count'>" + numOfSubs + "</span></a>" + "</li>"
                );
                $('#result').listview().listview('refresh');
            });
        });
    });
});
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
                $("#result").append(
                    "<li" + addIDclass + ">" + "<a href='#detail'><img src='" + value.ImagePath + "'>" + "<h2>" + value.Name + "</h2>" + "<p>" + value.Title + "</p>" + "<span class='ui-li-count'>" + numOfSubs + "</span></a>" + "</li>"
                );
                $('#result').listview().listview('refresh');
            });
        });
    });
});
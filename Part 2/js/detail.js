/*jslint browser: true*/
/*global $, jQuery, alert*/

// DETAIL VIEW

$(document).ready(function () {
    "use strict";
    $.getJSON("data/json.js", function (json) {
        var employee = "";
        var empID = "";

        $('body').on("click", "ul.team li", function (e) {
            var employeeString = $(this).attr("class").split(" ")[0] - 1;
            employee = parseInt(employeeString, 10);
            $("#details1").empty();
            $("#details2").empty();
            empID = json.teammembers[employee].ID;

            // manager exceptions
            if (empID == 5) {
                var manager = 4;
            } else if (empID == 6) {
                var manager = 5;
            } else if (empID == 4) {
                var manager = 3;
            }

            $("#details1").append(
                "<li class='detailtop'>" + "<img src='" + json.teammembers[employee].ImagePath + "'" + " class='detail'" + ">" + "<h2>" + json.teammembers[employee].Name + "</h2>" + "<p>" + json.teammembers[employee].Title + "</p>" + "</li>"
            );
            $('#details1').listview().listview('refresh');
            var managerNum = json.teammembers[employee].ReportsTo - 1;
            var managerName = json.teammembers[managerNum].Name;
            var numOfReports = $.grep(json.teammembers, function (element, index) {
                return element.ReportsTo == empID;
            });
            var directReports = numOfReports.length;
            var addIDclass = " class='" + empID + "'";

            if (directReports > 0) {
                var drlink = "#directreports";
            } else {
                var drlink = "#";
            }

            $("#details2").append(
                "<li" + addIDclass + ">" + "<a href='#manager'><h2>View Manager</h2><p>" + managerName + "</p></a></li>" + "<li><a href='" + drlink + "'" + "><h2>View Direct Reports</h2><p>" + directReports + "</p></a></li>" + "<li>" + "<a href=" + "'tel:" + json.teammembers[employee].OfficeNumber + "'>" + "<h2>Call Office</h2>" + "<p>" + json.teammembers[employee].OfficeNumber + "</p></a></li>" + "<li>" + "<a href=" + "'tel:" + json.teammembers[employee].CellNumber + "'>" + "<h2>Call Cell</h2>" + "<p>" + json.teammembers[employee].CellNumber + "</p></a></li>" + "<li>" + "<a href=" + "'mailto:" + json.teammembers[employee].Email + "'>" + json.teammembers[employee].Email + "</a>" + "</li>" +
                "<em>" + "ID is " + json.teammembers[employee].ID + "</em>"
            );
            $('#details2').listview().listview('refresh');
        });

        // MANAGER VIEW
        var manager = "";
        $(document).on('pageinit', "#manager", function () {
            $("#mandetails1").empty();
            $("#mandetails2").empty();

            manager = json.teammembers[employee].ReportsTo - 1;

            // manager exceptions
            if (empID == 5) {
                var manager = 4;
            } else if (empID == 6) {
                var manager = 5;
            } else if (empID == 4) {
                var manager = 3;
            }

            $("#mandetails1").append(
                "<li class='detailtop'>" + "<img src='" + json.teammembers[manager].ImagePath + "'" + " class='detail'" + ">" + "<h2>" + json.teammembers[manager].Name + "</h2>" + "<p>" + json.teammembers[manager].Title + "</p>" + "</li>" + "<br>"
            );
            $('#mandetails1').listview().listview('refresh');
            var managerNum = json.teammembers[manager].ID;
            var managerindex = json.teammembers[manager].ID - 1;
            var managerID = json.teammembers[employee].ID;
            var managername = json.teammembers[managerNum].Name;
            var numOfReports = $.grep(json.teammembers, function (element, index) {
                return element.ReportsTo == managerNum;
            });
            var managerReports = numOfReports.length;

            $("#mandetails2").append(
                "<li><a href='#ceo'><h2>View Manager</h2><p>" + "James King" + "</p></a></li>" + "<li><a href='#directreports'><h2>View Direct Reports</h2><p>" + managerReports + "</p></a></li>" + "<li>" + "<a href=" + "'tel:" + json.teammembers[manager].OfficeNumber + "'>" + "<h2>Call Office</h2>" + "<p>" + json.teammembers[manager].OfficeNumber + "</p></a></li>" + "<li>" + "<a href=" + "'tel:" + json.teammembers[manager].CellNumber + "'>" + "<h2>Call Cell</h2>" + "<p>" + json.teammembers[manager].CellNumber + "</p></a></li>" + "<li>" + "<a href=" + "'mailto:" + json.teammembers[manager].Email + "'>" + json.teammembers[manager].Email + "</a>" + "</li>" +
                "<em>" + "ID is " + json.teammembers[manager].ID + "</em>"
            );
            $('#mandetails2').listview().listview('refresh');

            // CEO VIEW
            var ceo = "";
            $(document).on('pageinit', "#ceo", function () {
                $("#ceodetails1").empty();
                $("#ceodetails2").empty();
                ceo = 3;
                var ceoNum = 4;
                $("#ceodetails1").append(
                    "<li class='detailtop'>" + "<img src='" + json.teammembers[ceo].ImagePath + "'" + " class='detail'" + ">" + "<h2>" + json.teammembers[ceo].Name + "</h2>" + "<p>" + json.teammembers[ceo].Title + "</p>" + "</li>" + "<br>"
                );
                $('#ceodetails1').listview().listview('refresh');

                var numOfCeoReports = $.grep(json.teammembers, function (element, index) {
                    return element.ReportsTo == ceoNum;
                });
                var ceoReports = numOfCeoReports.length;
                empID = 4;
                $("#ceodetails2").append(
                    "<li><a href='#directreports'><h2>View Direct Reports</h2><p>" + ceoReports + "</p></a></li>" + "<li>" + "<a href=" + "'tel:" + json.teammembers[ceo].OfficeNumber + "'>" + "<h2>Call Office</h2>" + "<p>" + json.teammembers[ceo].OfficeNumber + "</p></a></li>" + "<li>" + "<a href=" + "'tel:" + json.teammembers[ceo].CellNumber + "'>" + "<h2>Call Cell</h2>" + "<p>" + json.teammembers[ceo].CellNumber + "</p></a></li>" + "<li>" + "<a href=" + "'mailto:" + json.teammembers[ceo].Email + "'>" + json.teammembers[ceo].Email + "</a>" + "</li>" +
                    "<em>" + "ID is " + json.teammembers[ceo].ID + "</em>"
                );
                $('#ceodetails2').listview().listview('refresh');
            });

            // DIRECT REPORTS
            $(document).on('pageinit', "#directreports", function () {
                manager = json.teammembers[employee].ReportsTo - 1;
                // manager exceptions
                if (empID == 5) {
                    var manager = 4;
                } else if (empID == 6) {
                    var manager = 5;
                } else if (empID == 4) {
                    var manager = 3;
                }

                var manID = json.teammembers[manager].ID;
                var theSubs = $.grep(json.teammembers, function (element, index) {
                    return element.ReportsTo == manID;
                });
                var howManySubs = theSubs.length;
                $("#reportslist").empty();
                $.each(theSubs, function (key, value) {
                    var addIDclass = " class='" + theSubs[key].ID + "'";
                    $("#reportslist").append(
                        "<li" + addIDclass + ">" + "<a href='#detail'>" + "<img src='" + theSubs[key].ImagePath + "'>" + "<h2>" + theSubs[key].Name + "</h2>" + "<p>" + theSubs[key].Title + "<span class='ui-li-count'>" + "0" + "</p>" + "<em>" + theSubs[key].ID + "</em>" + "</a></li>"
                    );
                });
                $('#reportslist').listview().listview('refresh');
            });
        });
    });
});
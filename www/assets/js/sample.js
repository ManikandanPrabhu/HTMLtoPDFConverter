'use strict';

var myApp = angular.module('MyApp', []);

 myApp.controller('MyCtrl', function($scope, $http) {

  console.log("in pdf controller");
 
  //Making a Post Call on submit
  $scope.onsubmit = function() {
    console.log("in submit");
    $http.post("http://localhost:8000/sample",{"userData": "<div> Hey this is your new PDF</div>"}).then(function(data) {
      console.log(data);
      var downloadElement = document.getElementById('downloadPdf');   
      
        downloadElement.href = "data:application/octet-stream;base64, " + data.data;
        downloadElement.download = "notes_" + new Date().getTime() + ".pdf";
        downloadElement.click();
    });
  };

  //Making a Get Call Hardcoding the HTML in app.js file
  /*$scope.onsubmit = function() {
    console.log("in submit");
     $http.get("http://localhost:8000/firstPage").then(function(data) {
        console.log(data);
        var downloadElement = document.getElementById('downloadPdf');
      
        downloadElement.href = "data:application/octet-stream;base64, " + data.data;
        downloadElement.download = "notes_" + new Date().getTime() + ".pdf";
        downloadElement.click();
     });
   };*/

});

/*
  local session storgae file
  work all browser
  Author : mahendra@acetz.com
*/
/*
  on controller where you show your data
  example
  $scope.$on('sessionBroacast', function(event,data){
  $scope.viewdata=data;
});

method:
LocalSessionStorage.add();
LocalSessionStorage.clear();
LocalSessionStorage.getData();
LocalSessionStorage.getdataByObject()

*/

//create module  for session
var app=angular.module('LocalSessionStorage',[]);
$sessionArray=new Array();
$Itemlength=50;
//create service for store the data on local system

app.factory('LocalSessionStorage', function($rootScope, $log){
//define blank Array

//check and initilized  array

if(localStorage['localStorageSession'])
  {
    $sessionArray=JSON.parse(localStorage['localStorageSession']);
  }


return {
  //add data in session storege
    add: function (add) {
      if (typeof add === 'object')
      {
        //check the length
        if($sessionArray.length<$Itemlength)
        {
            var $state=true;
              //check existing data in local system
              angular.forEach($sessionArray,function(value, index){
                  $result=angular.equals(value, add)
                  if($result==true)
                  {
                    $state=false;
                  }
                  else
                  {
                    $state=true;
                  }
              })

            if($state==true)
            {
            $sessionArray.push(add);
            localStorage['localStorageSession']=JSON.stringify($sessionArray);
            $rootScope.$broadcast('sessionBroacast',$sessionArray);
            }
          }
          else
           {
             $log.warn('Maximum ' + $Itemlength  + " item allowed");
          }
      }

      else {  $log.error('Invalid json data'); return false;   }
    },

//retrieve data form session by object
getdataByObject: function(data)
{
  angular.forEach($sessionArray, function(value, index){

    $result=angular.equal(value,data);
    if($result==true)
    {
      return value
    }
    else {
      return false;
    }
  })

},
//retrieve data for session
    getData: function()
    {

      if($sessionArray.length>0)
      {
          return $sessionArray;
          $rootScope.$broadcast('sessionBroacast',$sessionArray);
        }
      else {  $log.warn('No data found!!');  }

    },
    clear: function()
    {
      $sessionArray=[];
      localStorage.removeItem('localStorageSession');

      $rootScope.$broadcast('sessionBroacast',null);
      return $sessionArray;
    }
  }

})

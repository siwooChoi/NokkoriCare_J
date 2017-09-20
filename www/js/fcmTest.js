

var ms = function (address, message) {
  document.getElementById(address).innerHTML = message;
}

        var copyOn = function (){
            var clipboard = new Clipboard('#copy');
        }

        if(typeof check_fcm_loaded==='undefined'){
                var check_fcm_loaded = setInterval(function(){
                    if(typeof FCMPlugin!=='undefined'){

                        FCMPlugin.getToken(function (regToken){
                          document.getElementById('view-token').value = regToken;
                        });

                        FCMPlugin.onNotification(function(data){
                            if(data.wasTapped){
                              //Notification was received on device tray and tapped by the user.
                               alert( JSON.stringify(data) );
                            }else{
                              //Notification was received in foreground. Maybe the user needs to be notified.
                               alert( JSON.stringify(data) );
                            }
                            // open the search filtered by topic
                        }, function(msg){ // function registered successfuly
                            // alert(msg); // typically msg='OK'
                        }, function(err){
                            console.log(err);
                        });
                        clearInterval(check_fcm_loaded);
                    }
                }, 2000);

            }
            ms("test","되나1<br>");

          // var test_ara = function (){
          //   ms("test","되나1<br>");
          //   var temp_token = new FCMPlugin.getToken(function(token){
          //     //alert(token);
          //     document.getElementById('view-token').value = token;
          //   });
          //   ms("test","확인은 로그인 후에 가능<br>");
          //   FCMPlugin.onNotification(function(data){
          //       ms("test","태스트2<br>");
          //         if(data.wasTapped){
          //           //Notification was received on device tray and tapped by the user.
          //           ms("test","벡그라운드 텝해 들어왔나요?<br>");
          //           alert( JSON.stringify(data) );
          //         }else{
          //           //Notification was received in foreground. Maybe the user needs to be notified.
          //           ms("test","포그라운드 받았나요?<br>");
          //           alert( JSON.stringify(data) );
          //         }
          //     });
          // }


          //
          //
          // interval( let tempScan = new FCMPlugin.onNotification(function(data){
          //     ms("test","태스트2<br>");
          //       if(data.wasTapped){
          //         //Notification was received on device tray and tapped by the user.
          //         ms("test","벡그라운드 텝해 들어왔나요?<br>");
          //         alert( JSON.stringify(data) );
          //       }else{
          //         //Notification was received in foreground. Maybe the user needs to be notified.
          //         ms("test","포그라운드 받았나요?<br>");
          //         alert( JSON.stringify(data) );
          //       }
          //   }), 2000);


        // var test_ara = function (){
        //   ms("test","되나1<br>");
        //   let temp_token = new FCMPlugin.getToken(function(token){
        //     //alert(token);
        //     document.getElementById('view-token').value = token;
        //   });
        //   ms("test","되나2<br>");
        //   // FCMPlugin.onNotification(function(data){
        //   //     ms("test","태스트2<br>");
        //   //       if(data.wasTapped){
        //   //         //Notification was received on device tray and tapped by the user.
        //   //         ms("test","벡그라운드 텝해 들어왔나요?<br>");
        //   //         alert( JSON.stringify(data) );
        //   //       }else{
        //   //         //Notification was received in foreground. Maybe the user needs to be notified.
        //   //         ms("test","포그라운드 받았나요?<br>");
        //   //         alert( JSON.stringify(data) );
        //   //       }
        //   //   });
        //
        // }
        // ms("test","되나3<br>");



        //
        // FCMPlugin.onNotification(function(data){
        //   ms("test","태스트2<br>");
        //     if(data.wasTapped){
        //       //Notification was received on device tray and tapped by the user.
        //       ms("test","벡그라운드 텝해 들어왔나요?<br>");
        //       alert( JSON.stringify(data) );
        //     }else{
        //       //Notification was received in foreground. Maybe the user needs to be notified.
        //       ms("test","포그라운드 받았나요?<br>");
        //       alert( JSON.stringify(data) );
        //     }






        //
        // FCMPlugin.subscribeToTopic('topicExample');
        // FCMPlugin.onNotification(
        //     function(data){
        //         if(data.kind == "study"){
        //             localStorage.setItem('studyNumber',JSON.stringify(data.data));
        //         }else{
        //             localStorage.setItem('quizNumber',JSON.stringify(data.data));
        //         }
        //         if(data.wasTapped){
        //             if(data.kind == "study"){
        //                 localStorage.setItem('studyNumber',JSON.stringify(data.data));
        //             }else{
        //                 localStorage.setItem('quizNumber',JSON.stringify(data.data));
        //             }
        //             // location.href="brailStudy.html";
        //             //alert("ddd");
        //             //Notification was received on device tray and tapped by the user.
        //             //alert( JSON.stringify(data) );
        //         }
        //         else{ //포 그라운드에서
        //            //Notification was received in foreground. Maybe the user needs to be notified.
        //            //alert( JSON.stringify(data) );
        //            // alert("xx");
        //            //var a = localStorage.getItem('studyNumber');
        //            //alert(a);
        //         }
        //     },
        //
        //     function(msg){
        //         //alert('on Notification : ' + msg);
        //         console.log('onNotification callback successfully registered: ' + msg);
        //     },
        //     function(err){
        //         console.log('Error registering onNotification callback: ' + err);
        //     }
        // );

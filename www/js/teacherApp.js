$(document).ready(function(){

  var tokenTextBox = $("#view-token");
  tokenTextBox.hide();
  $("#copy").unbind("click").bind("click", function(){
    tokenTextBox.slideToggle();
  });

$("#testOpenICheck").unbind("click").bind("click", function(){
  alert('test');
});

var flagLogin = false;

allHide();

// $("#test").show();
loginViewOpen();

  // $("#tLoginTop").show();
  // $("#iCare").show();
  // $("#iCareBody").show();

  var ms = function (address, message) {
    document.getElementById(address).innerHTML = message;
  }

          // window.onload = function (){
          //     var clipboard = new Clipboard('#copy');
          // }

  $(document).ready(function(){
    var clipboard = new Clipboard('#copy');
  });


  if(typeof check_fcm_loaded==='undefined'){
          var check_fcm_loaded = setInterval(function(){
              if(typeof FCMPlugin!=='undefined'){

                // alert('ttt');

                  FCMPlugin.getToken(function (regToken){
                    // javaScript
                    // document.getElementById('view-token').value = regToken;

                    // jQuery
                    $("#view-token").attr("value", regToken);
                  });

                  FCMPlugin.onNotification(function(data){
                      // if(data.wasTapped){
                        //Notification was received on device tray and tapped by the user.
                        //  alert( JSON.stringify(data) );
                        //  tICheck(childID, imageName, childName, dateValue);

                        // var pushData = JSON.stringify(data);
                        // alert("날짜값 : " + data.check_date);
                        // alert("애이름 : " + data.check_name);
                        // alert("아이디 : " + data.check_id);
                        // alert("사진값 : " + data.check_photo);

                        alert("園児の発育日誌を確認してください。");
                         if(flagLogin){
                          //  tICheck(data.check_id, data.check_photo, data.check_name, data.check_date);
                          //  $('#tLoginTop').show();
                        //  alert(data.check_name+"원아의 "+data.check_date+"일자 알림장을 확인해 주세요.");
                         }


                      // }else{
                      //   //Notification was received in foreground. Maybe the user needs to be notified.
                      //    alert( JSON.stringify(data) );
                      //   //  tICheck(childID, imageName, childName, dateValue);
                      // }
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


  // 앱 실행 시 로그인화면 보여주기
  function loginViewOpen(){
    allHide();

    $("#tLoginTop").hide();
    $("#pLoginTop").hide();

    $("#notLogin").show();
    $("#notLoginTop").show();
    $("#notLoginView").show();
  }

  // 실행시 바로 교사메인 보여주기
  // $('#pLoginTop').hide();
  // $('#tLoginTop').show();
  // $('#teacherMain').show();


  // 실행시 바로 학부모메인 보여주기
  // $("#tLoginTop").hide();
  // $("#pSideMenuListDiv").hide();
  // $('#pLoginTop').show();
  // $('#parentMain').show();


  // 로그인 판단
    var position;   // User직위(1->원장, 2->교사, 3->학부모)
    var user_num;   // User고유번호
    var user_name;  // User이름



    $('#noIDLoginBtn').unbind("click").bind("click", function(){

            var user_id = "parents@gmail.com";
            var password = $("#inputPw").val();


            $.ajax({

              dataType:"jsonp",
              data:{
                user_id: user_id,
                password: password
              },
              url:"http://japan-okyo.c9users.io/mobile/login.php",
              // https://japan-okyo.c9users.io/    // 기존
              // https://project-okyo.c9users.io/.   //일어판
              success:function(data){

                position = data.position;   // User직위(1->원장, 2->교사, 3->학부모)
                user_num  = data.userNum;   // User고유번호
                user_name = data.userName;  // User이름

                switch (position) {
                  case "1":
                    alert('원장 준비 중');
                    break;
                  case "2":
                    $('#notLoginTop').hide();
                    $('#notLoginView').hide();

                    $('#tLoginTop').show();
                    $('#sideMenuListDiv').hide();
                    $('#teacherMain').show();
                    break;
                  case "3":
                  $('#notLoginTop').hide();
                  $('#notLoginView').hide();

                  $('#pLoginTop').show();
                  $('#pSideMenuListDiv').hide();
                  $('#parentMain').show();
                  break;

                  default:
                  alert("ユーザーのデータのエラーが発生しました。");

                }

              },
              error:function(){
                alert('サーバーからのエラーが発生しました。');
              }

            });

    });


    // 로그인 버튼 클릭 시  ID,PW 조회 및 User직위에 맞는 앱화면 보여주기
    $('#LoginBtn').unbind("click").bind("click", function(){
      // 입력한 ID와 PW
      var user_id = $("#inputId").val();
      var password = $("#inputPw").val();

      $.ajax({

        dataType:"jsonp",
        data:{
          user_id: user_id,
          password: password
        },
        url:"http://japan-okyo.c9users.io/mobile/login.php",
        success:function(data){

          position = data.position;   // User직위(1->원장, 2->교사, 3->학부모)
          user_num  = data.userNum;   // User고유번호
          user_name = data.userName;  // User이름

          localStorage.setItem('position', position);
          localStorage.setItem('user_num', user_num);
          localStorage.setItem('user_name', user_name);

          switch (position) {
            case "1":
              alert('원장 준비 중');
              break;
            case "2":
            flagLogin = true;
              $('#notLoginTop').hide();
              $('#notLoginView').hide();

              $('#tLoginTop').show();
              $('#sideMenuListDiv').hide();
              $('#teacherMain').show();
              break;
            case "3":
            flagLogin = true;
            $('#notLoginTop').hide();
            $('#notLoginView').hide();

            $('#pLoginTop').show();
            $('#pSideMenuListDiv').hide();
            $('#parentMain').show();
            break;

            default:
            alert("ユーザーのデータのエラーが発生しました。");

          }

        },
        error:function(){
          alert('サーバーからのエラーが発生しました。');
        }

      });

    });


  // 숨기기
  function allHide(){
    $("#notLogin").hide();
    // $('#notLoginTop').hide();
    // $('#notLoginView').hide();
    // $(".mapFlag").remove();
    $('#sideMenuListDiv').hide();
    $('#teacherMain').hide();
    $('#albumChildSelectBox').hide();
    $('#childSelectBox1').hide();
    $('#tObservation').hide();
    $('#tObText').hide();
    $('#tObDraw').hide();
    $('#tDevelopCheck').hide();
    $('#tICheckMain').hide();
    $('#modeBtns').hide();
    $('#ICheck').hide();
    $("#childSelectBox1").hide();
    $("#showAlbum").hide();
    $("#photoUpload").hide();
    $("#showSavedImages").hide();
    $("#tAttendanceCheck").hide();
    $("#showDetailAlbum").hide();
    $('#textMemo').val('');
    $("#iCare").hide();
    $("#iCareBody").hide();
    $("#selectCameraOrAlbumPage").hide();
    $("#tObChangeModePanel").hide();
    $("#tDevChangeModePanel").hide();
    $("#tIChChangeModePanel").hide();
    $("#tPhoUpChangeModePanel").hide();
    $("#tAlbumChangeModePanel").hide();
    // $("#pAttendanceCheck").hide();
    // $('#childSelectBox2').hide();
    // $('#pICheck').hide();
    // $('#tObChildInfo').empty();
    // $(".mapFlag").remove();
    ///////////////////  구분선   //////////////////
    $('#parentMain').hide();
    $('#childSelectBox2').hide();
    $('#pICheck').hide();
    $('#pICheckMain').hide();
    $('#pmodeBtns').hide();
    $("#pShowDetailAlbum").hide();
    $("#pSideMenuListDiv").hide();
    $("#pShowAlbum").hide();
    $("#pAttendanceCheck").hide();
    $("#pAttText").val('');
    $(".changeModePanel").hide();
  }

// 사이드메뉴 슬라이드
  $("#sideMenuBtn").unbind("click").bind("click", function(){
      $("#sideMenuListDiv").toggle("slide",{direction:"left"},350,null);
  });
  $("#pSideMenuBtn").unbind("click").bind("click", function(){
      $("#pSideMenuListDiv").toggle("slide",{direction:"left"},350,null);
  });

  // 사이드메뉴가 열려있을 경우 화면 눌러서 사이드메뉴 닫기
  /*
        $("#teacherMain").unbind("click").bind("click", function(){
            $("#sideMenuListDiv").hide("slide",{direction:"left"},500,null);
        });

        $("#childSelectBox1").unbind("click").bind("click", function(){
            $("#sideMenuListDiv").hide("slide",{direction:"left"},500,null);
        });

        $("#childSelectBox1").unbind("click").bind("click", function(){
            $("#sideMenuListDiv").hide("slide",{direction:"left"},500,null);
        });

        $("#tObservation").unbind("click").bind("click", function(){
            $("#sideMenuListDiv").hide("slide",{direction:"left"},500,null);
        });

        $("#tDevelopCheck").unbind("click").bind("click", function(){
            $("#sideMenuListDiv").hide("slide",{direction:"left"},500,null);
        });

        $("#ICheck").unbind("click").bind("click", function(){
            $("#sideMenuListDiv").hide("slide",{direction:"left"},500,null);
        });

        $("#photoUpload").unbind("click").bind("click", function(){
            $("#sideMenuListDiv").hide("slide",{direction:"left"},500,null);
        });

        $("#showAlbum").unbind("click").bind("click", function(){
            $("#sideMenuListDiv").hide("slide",{direction:"left"},500,null);
        });

        $("#showDetailAlbum").unbind("click").bind("click", function(){
            $("#sideMenuListDiv").hide("slide",{direction:"left"},500,null);
        });

        $("#tAttendanceCheck").unbind("click").bind("click", function(){
            $("#sideMenuListDiv").hide("slide",{direction:"left"},500,null);
        });
    */

  // 로그아웃 클릭
  $("#tlogoutBtn").unbind("click").bind("click", function(){
    var logout = confirm('ログアウトしますか');
    if(logout == true){
      allHide();
      loginViewOpen();
    }
    // $('#tLoginTop').hide();
    // allHide();
    //
    // $("#notLogin").show();
    // loginViewOpen();
    // $('#notLoginTop').show();
    // $('#notLoginView').show();
  });


  // 상단 클릭 (메인으로 돌아가기)
  $('#top').find('#imgLogo').unbind("click").bind("click", function(){


    // $('#tLoginTop').show();
    // $('#sideMenuListDiv').hide();
    // $('#teacherMain').show();
    // var logout = confirm('로그아웃 하시겠습니까?');
    // if(logout == true){
    //   allHide();
    //   loginViewOpen();
    // }
    allHide();

    $('#tLoginTop').show();
    $('#sideMenuListDiv').hide();
    $('#teacherMain').show();

  })
  $('#top').find('#textLogo').unbind("click").bind("click", function(){
    allHide();

    $('#tLoginTop').show();
    $('#sideMenuListDiv').hide();
    $('#teacherMain').show();
  })

  // 원아 선택화면
  function selectChildView(box){
    // 사이드메뉴가 열려있을 경우 화면 눌러서 사이드메뉴 닫기

    allHide();

    $('#tLoginTop').show();

    if(box == "box5_1" || box == "box5_2"){
      $('#childSelectBox1').show();
      $('#albumChildSelect1').empty();
    }
    // else
    if(box == "box4"){
      iCare();
    }
    // else if(box =="attCheck"){
    //     attCheck();
    // }



    else{
      $('#childSelectBox1').show();
      $('#childSelect1').empty();
    }


    $.ajax({
        url:"http://japan-okyo.c9users.io/mobile/getChildrens.php",
        // url:"http://japan-okyo.c9users.io/mobile/mTest.php",
        data:{
          user_num: user_num,
          user_name : user_name
        },
        dataType:"jsonp",
        success:function(data){
            //성공
            if(data.result == "success"){
                var cnt = data.data.length;
                var trCount = 1;

                var table = $("<table></table>").addClass("childTable").appendTo("#childSelect1");

                for(var i = 0; i < cnt ; i++){

                    var childID   = data.data[i].childNum;
                    var imageName = data.data[i].imageName;
                    var childName = data.data[i].childName;
                    var imageComment = data.data[i].imageComment;


                      var imgs = $("<img />").addClass("imageName"+childID).attr("src", "http://japan-okyo.c9users.io/img/child/"+imageName);
                      var names = $("<p></p>").addClass("childName"+childID).text(childName);
                      var namesDiv = $("<div></div>").addClass("childNameDiv"+childID).append(names);

                      // $("#childSelect1").append("<table></table")


                      // if(box == "box5_1" || box == "box5_2"){
                      //   if(i % 2 == 0){
                      //     if(trCount % 2 == 0){
                      //       var childTr = $("<tr></tr>").addClass("childTr childTr1 childTr"+trCount).appendTo(".childTable");
                      //     } else{
                      //       var childTr = $("<tr></tr>").addClass("childTr childTr2 childTr"+trCount).appendTo(".childTable");
                      //     }
                      //     trCount++;
                      //   }
                      //   var childTd = $("<td></td>").addClass('childTd childTd'+childID).appendTo(childTr);
                      //   $("<div></div>").addClass('selectImgAndName selectImgAndName'+childID).appendTo(childTd);
                      //   // $("<div></div>").addClass('selectImgAndName'+childID).appendTo("#childSelect1");
                      //   $("<div></div>").addClass("imageDiv").append(imgs).appendTo(".selectImgAndName"+childID);
                      //   $("<div></div>").addClass("NameDiv").append(namesDiv).appendTo(".selectImgAndName"+childID);
                      //
                      //   // $("<div></div>").addClass('selectImgAndName'+childID).appendTo("#albumChildSelect1");
                      //   // $("<div></div>").addClass("imageDiv").append(imgs).appendTo(".selectImgAndName"+childID);
                      //   // $("<div></div>").addClass("NameDiv").append(namesDiv).appendTo(".selectImgAndName"+childID);
                      //   // $("<div>test</div>").addClass("NameDiv").append(namesDiv).appendTo(".selectImgAndName"+childID);
                      // }
                      // else{
                        if(i % 2 == 0){
                          var childTr = $("<tr></tr>").addClass("childTr childTr"+trCount).appendTo(".childTable");
                          trCount++;
                        }
                        var childTd = $("<td></td>").addClass('childTd childTd'+childID).appendTo(childTr);
                        $("<div></div>").addClass('selectImgAndName selectImgAndName'+childID).appendTo(childTd);
                        // $("<div></div>").addClass('selectImgAndName'+childID).appendTo("#childSelect1");
                        $("<div></div>").addClass("imageDiv").append(imgs).appendTo(".selectImgAndName"+childID);

                        if(trCount % 2 == 0){
                          $("<div></div>").addClass("NameDiv NameDiv1").append(namesDiv).appendTo(".selectImgAndName"+childID);
                        } else{
                          $("<div></div>").addClass("NameDiv NameDiv2").append(namesDiv).appendTo(".selectImgAndName"+childID);
                        }
                      // }
                    (function(childID, imageName, childName){

                    $(".selectImgAndName"+childID).unbind("click").bind("click",function(){

                          switch (box) {
                            case "box1":
                              tObservation(childID, imageName, childName);
                              break;
                            case "box2":
                              var newDate = new Date();

                              var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

                              if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
                                var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
                              } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
                                var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
                              } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
                                var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
                              } else{
                                var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
                              }

                              developCheck(childID, imageName, childName, dateValue);
                              break;
                            case "box3":

                              var newDate = new Date();

                              var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

                              if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
                                var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
                              } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
                                var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
                              } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
                                var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
                              } else{
                                var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
                              }

                              // var explodeDateValue = dateValue.split("-");
                              // var dateString = explodeDateValue[0] + " - " + explodeDateValue[1] + " - " + explodeDateValue[2];
                              $('#tIChSelectChildPanel').hide();

                              tICheck(childID, imageName, childName, dateValue);
                              break;
                            case "box4":
                              alert('원아지킴이...');
                              break;
                            case "box5_1":
                              photoUpload(childID, imageName, childName);
                              break;
                            case "box5_2":
                              showAlbum(childID, imageName, childName, 1);
                              break;
                            // case "attCheck":
                            //   attCheck(childID, imageName, childName);
                            //   break;
                            default:
                              alert("default");
                          }
                    });

                  }(childID, imageName, childName));
                }

                if(cnt == 0)
                    $("<p></p>").text("アップロードのイメージがありません。").appendTo("#selectImgAndName1");
            }
            //오류
            else {
                window.alert("エラーが発生しました。");
            }



        }, error: function(){
            window.alert("サーバーからのエラーが発生しました。");
        }
    });
  }


  function selectChildView_Album(box){
    allHide();
    $('#tLoginTop').show();
    $('#childSelectBox1').show();
    $('#albhildSelect1').empty();

    ////
    var imgs = $("<img />").addClass("imageName"+childID).attr("src","http://japan-okyo.c9users.io/img/child/"+imageName);
    var names = $("<p></p>").addClass("childName"+childID).text(childName);
    var namesDiv = $("<div></div>").addClass("childNameDiv"+childID).append(names);

    $("<div></div>").addClass('selectImgAndName'+childID).appendTo("#albumChildSelect1");
    $("<div></div>").addClass("imageDiv").append(imgs).appendTo(".selectImgAndName"+childID);
    $("<div></div>").addClass("NameDiv").append(namesDiv).appendTo(".selectImgAndName"+childID);
    ////
  }
  // 관찰일지, 발달체크 원아 선택 시 해당 원아 이름, 이미지 출력

  // function makeChangePanel(argValues){
  //
  //   // alert("함수 안에서 "+argValues[0]);
  //   // alert("함수 안에서 "+argValues[1]);
  //   // alert("함수 안에서 "+argValues[2]);
  //
  //   // 패널 속에서 중복으로 추가되는 것을 방지
  //   $(".changeModePanel").empty();
  //
  //   // 패널 닫기 버튼 생성
  //   $("<div></div>").addClass("changeModePanelCloseBtn").appendTo(".changeModePanel");
  //
  //   // 패널 닫기 버튼 이벤트 걸기
  //   $(".changeModePanelCloseBtn").unbind("click").bind("click", function(){
  //       $(".changeModePanel").toggle("slide",{direction:"right"},350,null);
  //   });
  //
  //   // ChangeModePanel
  //   var changeBtn1 = $("<div></div>").addClass("changeBtn1");
  //   var changeBtn1Text = $("<h3>원아 메모 <br>작성</h3>").appendTo(changeBtn1);
  //   $(".changeModePanel").append(changeBtn1);
  //   $(".changeBtn1").unbind("click").bind("click", function(){
  //       allHide();
  //       tObservation(argValues[0], argValues[1], argValues[2]);
  //       $(".changeModePanel").toggle("slide",{direction:"right"},350,null);
  //
  //   });
  //
  //
  //   var changeBtn23Box = $("<div></div>").addClass("changeBtn23Box");
  //   $(".changeModePanel").append(changeBtn23Box);
  //
  //   var changeBtn2 = $("<div></div>").addClass("changeBtn2").appendTo(changeBtn23Box);
  //   var changeBtn2Text = $("<h3>평가항목</h3>").appendTo(changeBtn2);
  //   $(".changeBtn2").unbind("click").bind("click", function(){
  //       // allHide();
  //       developCheck(argValues[0], argValues[1], argValues[2]);
  //       $(".changeModePanel").toggle("slide",{direction:"right"},350,null);
  //   });
  //
  //   var changeBtn3 = $("<div></div>").addClass("changeBtn3").appendTo(changeBtn23Box);
  //   var changeBtn3Text = $("<h3>I-Check</h3>").appendTo(changeBtn3);
  //   $(".changeBtn3").unbind("click").bind("click", function(){
  //       // allHide();
  //
  //       var newDate = new Date();
  //       var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
  //       tICheck(argValues[0], argValues[1], argValues[2], dateValue);
  //       $(".changeModePanel").toggle("slide",{direction:"right"},350,null);
  //   });
  //
  //
  //
  //
  //
  //   var changeBtn45Box = $("<div></div>").addClass("changeBtn45Box");
  //   $(".changeModePanel").append(changeBtn45Box);
  //
  //   var changeBtn4 = $("<div></div>").addClass("changeBtn4").appendTo(changeBtn45Box);
  //   var changeBtn4Text = $("<h3>사진 업로드</h3>").appendTo(changeBtn4);
  //   var changeBtn5 = $("<div></div>").addClass("changeBtn5").appendTo(changeBtn45Box);
  //   var changeBtn5Text = $("<h3>앨범 보기</h3>").appendTo(changeBtn5);
  //
  //
  // }


  // 관찰일지 작성 도우미 클릭
  $('#box1').unbind("click").bind("click", function(){
    var whatIsBox = "box1";
    selectChildView(whatIsBox);
  });


  // 사이드 원아리스트 숨긴채 시작
  $('#tObSelectChildPanel').hide();
  $('#tObChangeModePanel').hide();



  // 관찰일지 작성 도우미
  function tObservation(childID, imageName, childName){
      // alert(id);
      allHide();
      $('#childSelectBox1').hide();
      $('#tObservation').show();
      $('#tObText').show();

      // 시연 용 데이터 미리입력
      $('#textMemo').val('あさ　らくがき');


      $('#tObChildInfo').empty();



      // 원아선택 버튼 (슬라이드 원아리스트 보여주기)
      $("#tObSelectChild").unbind("click").bind("click", function(){
          $("#tObSelectChildPanel").toggle("slide",{direction:"left"},350,null);

          $('#tObSelectChildList').empty();

          // 슬라이드 원아목록에 원아리스트 불러오기
          $.ajax({
              url:"http://japan-okyo.c9users.io/mobile/getChildrens.php",
              // url:"http://japan-okyo.c9users.io/mobile/mTest.php",
              data:{
                user_num: user_num,
                user_name : user_name
              },
              dataType:"jsonp",
              success:function(data){
                  //성공
                  if(data.result == "success"){
                      var cnt = data.data.length;

                      for(var i = 0; i < cnt ; i++){
                          var childID   = data.data[i].childNum;
                          var imageName = data.data[i].imageName;
                          var childName = data.data[i].childName;
                          var imageComment = data.data[i].imageComment;

                          var imgs = $("<img />").addClass("imageNameObs imageNameObs"+childID).attr("src", "http://japan-okyo.c9users.io/img/child/"+imageName);
                          var names = $("<p></p>").addClass("childNameObs childNameObs"+childID).text(childName);
                          var namesDiv = $("<div></div>").addClass("childNameDivObs childNameDivObs"+childID).append(names);

                          $("<div></div>").addClass('selectImgAndNameObs selectImgAndNameObs'+childID).appendTo("#tObSelectChildList");
                          $("<div></div>").addClass("imageDivObs").append(imgs).appendTo(".selectImgAndNameObs"+childID);
                          $("<div></div>").addClass("NameDivObs").append(namesDiv).appendTo(".selectImgAndNameObs"+childID);

                          (function(childID, imageName, childName){

                          $(".selectImgAndNameObs"+childID).unbind("click").bind("click",function(){
                              // tObservation(childID, imageName, childName);

                              if($("#flagTextDraw").children().hasClass("flagTextDraw") == true){
                                // alert("텍스트 열려있음");
                                tObservation(childID, imageName, childName);
                              }
                              else{
                                // alert("그림 열려있음");
                                reStartTodDraw(childID, imageName, childName);
                              }

                              $("#tObSelectChildPanel").toggle("slide",{direction:"left"},350,null);

                          });

                        }(childID, imageName, childName));
                      }

                      if(cnt == 0)
                          $("<p></p>").text("アップロードのイメージがありません。").appendTo("#selectImgAndName1");
                  }
                  //오류
                  else {
                      window.alert("エラーが発生しました。");
                  }



              }, error: function(){
                  window.alert("サーバーからのエラーが発生しました。");
              }
          });
      });

      // 슬라이드 닫기 버튼
      $("#tObSelectChildPanelCloseBtn").unbind("click").bind("click", function(){
          $("#tObSelectChildPanel").toggle("slide",{direction:"left"},350,null);
      });


      var imgs = $("<img />").addClass("write_ImageName").attr("src","http://japan-okyo.c9users.io/img/child/"+imageName);
      var names = $("<p></p>").addClass("write_ChildName").text(childName);
      var namesDiv = $("<div></div>").addClass("write_ChildNameDiv").append(names);

      $("#tObChildInfo").addClass('write_ImgAndName');
      $("<div></div>").addClass("write_ImageNameDiv").append(imgs).append(namesDiv).appendTo(".write_ImgAndName");

      // 기능변경 버튼
      $("#tObChangeModeBtn").unbind("click").bind("click", function(){
        // var changeModePanel = $("<div></div>").addClass("changeModePanel").appendTo("#tObservation");
        // var changeModePanelCloseBtn = $("<div></div>").addClass("changeModePanelCloseBtn").appendTo(".changeModePanel");
        // $("<div></div>").addClass("tObChangeModePanelCloseBtn").appendTo("#tObChangeModePanel");

        $("#tObChangeModePanel").hide("slide",{direction:"right"},350,null);
        $("#tObChangeModePanel").toggle("slide",{direction:"right"},350,null);

        var argValues = new Array();
        argValues.push(childID);
        argValues.push(imageName);
        argValues.push(childName);
        // alert(childID);
        // alert(imageName);
        // alert(childName);
        // makeChangePanel(argValues);

          // 패널 속에서 중복으로 추가되는 것을 방지
          $("#tObChangeModePanel").empty();

          // 패널 닫기 버튼 생성
          $("<div></div>").addClass("changeModePanelCloseBtn").appendTo("#tObChangeModePanel");

          // 패널 닫기 버튼 이벤트 걸기
          $(".changeModePanelCloseBtn").unbind("click").bind("click", function(){
              $("#tObChangeModePanel").toggle("slide",{direction:"right"},350,null);
          });

          // ChangeModePanel
          var changeBtn1 = $("<div></div>").addClass("changeBtn1");
          var changeBtn1Img = $("<img></img>").attr("src", "./img/memo.png").appendTo(changeBtn1);
          var changeBtn1Text = $("<p>園児 メモ 作成</p>").appendTo(changeBtn1);
          $("#tObChangeModePanel").append(changeBtn1);
          $(".changeBtn1").unbind("click").bind("click", function(){
              allHide();
              tObservation(argValues[0], argValues[1], argValues[2]);
              $("#tObChangeModePanel").hide("slide",{direction:"right"},350,null);
          });

          var changeBtn23Box = $("<div></div>").addClass("changeBtn23Box");
          $("#tObChangeModePanel").append(changeBtn23Box);

          var changeBtn2 = $("<div></div>").addClass("changeBtn2").appendTo(changeBtn23Box);
          var changeBtn2Img = $("<img></img>").attr("src", "./img/hyouka.png").appendTo(changeBtn2);
          var changeBtn2Text = $("<p>授業 評価項目</p>").appendTo(changeBtn2);
          $(".changeBtn2").unbind("click").bind("click", function(){
              allHide();
              var newDate = new Date();
              var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

              if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
                var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
              } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
                var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
              } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
                var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
              } else{
                var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
              }
              developCheck(argValues[0], argValues[1], argValues[2], dateValue);
              $("#tObChangeModePanel").hide("slide",{direction:"right"},350,null);
          });

          var changeBtn3 = $("<div></div>").addClass("changeBtn3").appendTo(changeBtn23Box);
          var changeBtn3Img = $("<img></img>").attr("src", "./img/iCheck3.png").appendTo(changeBtn3);
          var changeBtn3Text = $("<p>発育日誌</p>").appendTo(changeBtn3);
          $(".changeBtn3").unbind("click").bind("click", function(){
              allHide();
              var newDate = new Date();
              var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

              if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
                var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
              } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
                var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
              } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
                var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
              } else{
                var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
              }
              tICheck(argValues[0], argValues[1], argValues[2], dateValue);
              $("#tObChangeModePanel").hide("slide",{direction:"right"},350,null);
          });

          var changeBtn45Box = $("<div></div>").addClass("changeBtn45Box");
          $("#tObChangeModePanel").append(changeBtn45Box);

          var changeBtn4 = $("<div></div>").addClass("changeBtn4").appendTo(changeBtn45Box);
          var changeBtn4Img = $("<img></img>").attr("src", "./img/camera.png").appendTo(changeBtn4);
          var changeBtn4Text = $("<p>写真アップロード</p>").appendTo(changeBtn4);
          $(".changeBtn4").unbind("click").bind("click", function(){
              allHide();
              photoUpload(argValues[0], argValues[1], argValues[2]);
              $("#tObChangeModePanel").hide("slide",{direction:"right"},350,null);
          });


          var changeBtn5 = $("<div></div>").addClass("changeBtn5").appendTo(changeBtn45Box);
          var changeBtn5Img = $("<img></img>").attr("src", "./img/album2.png").appendTo(changeBtn5);
          var changeBtn5Text = $("<p>アルバムを見る</p>").appendTo(changeBtn5);
          $(".changeBtn5").unbind("click").bind("click", function(){
              allHide();
              showAlbum(argValues[0], argValues[1], argValues[2], 1);
              $("#tObChangeModePanel").hide("slide",{direction:"right"},350,null);
          });

      });

      // 저장 된 텍스트 보여주기 실행
      showSavedTexts(childID);

      // 관찰일지 텍스트 부분
    // 텍스트 취소 버튼
    $('#tObCancelBtn1').unbind("click").bind("click", function(){
      // selectChildView("box1");
      allHide();

      $('#tLoginTop').show();
      $('#sideMenuListDiv').hide();
      $('#teacherMain').show();
    });

    // 텍스트 저장 버튼
    $('#tObSaveBtn1').unbind("click").bind("click", function(){
      saveText();
    });

    // 텍스트 저장
    function saveText(){
      var textMemo = $('#textMemo').val();

      var newDate = new Date();
      var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

      $.ajax({
        dataType:"jsonp",
        data: {
          childID: childID,
          user_num: user_num,
          textMemo : textMemo,
          dateValue : dateValue,
          memoCategory : 4,      // 1 -> 알림장내용 / 2 -> 알림장의 댓글  / 3 -> 특이사항  / 4 -> 단순메모
          memoType : 1  // 1 -> 글씨  /  2 -> 그림
        },
          url:'http://japan-okyo.c9users.io/mobile/setMemo.php',

         success:function(result){
          alert("メモを登録しました。");
          $('#textMemo').val('');

          // 저장 된 텍스트 보여주기 실행
          showSavedTexts(childID);


         }, error:function(result){
           alert("サーバーからのエラーが発生しました。");
           selectChildView("box1");
         }
      });
    }


    // 저장된 텍스트 보여주기
    function showSavedTexts(childID){
      $("#tObSavedText").empty();
      var newDate = new Date();
      var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

      if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
        var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
      } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
        var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
      } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
        var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
      } else{
        var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
      }


      $.ajax({
        dataType:"jsonp",
        data:{
          childID: childID,
          user_num: user_num,
          user_name: user_name,
          dateValue: dateValue,
          memoCategory : 4, // 1 -> 알림장내용 / 2 -> 알림장의 댓글  / 3 -> 특이사항  / 4 -> 단순메모
          memoType : 1  // 1 -> 글씨  /  2 -> 그림
        },
        url:'http://japan-okyo.c9users.io/mobile/getMemo.php',
        success:function(data){



          var cnt = data.data.length;
          // var savedTextsTileDiv = $("<div></div>").addClass("savedTextsTileDiv");
          // var savedTexts = $("<p></p>").addClass('savedTextsTitle').text("오늘 작성한 메모");
          //
          // $("#tObSavedText").append(savedTextsTileDiv);
          // $(".savedTextsTileDiv").append(savedTexts);

          for(var i = 0; i < cnt; i++){
            var id        = data.data[i].memoId;
            var textValue = data.data[i].comment;

            var savedTexts = $("<p></p>").addClass('savedTextMemos'+id).text(textValue);

              // $('.savedTextMemos').
              $("#tObSavedText").append(savedTexts);

              // (function(id){
              //     $('.savedTextMemos'+id).unbind("click").bind("click",function(){
              //       deleteUploadedTexts(id, childID);  // 오늘 작성하나 메모 클릭시 삭제
              //     });
              // }(id));

          }
        },
        error:function(){
          alert('サーバーからのエラーが発生しました。');
        }
      });
    }


    // 저장된 텍스트 지우기
    function deleteUploadedTexts(id, childID){

      var deleteFlag = confirm("コメントを削除しますか。");

      if(deleteFlag){
        $.ajax({
          dataType:"jsonp",
          data:{
            id: id
          },
          url:'https://chesyu.run.goorm.io/MyProject/ni/delUploadedTextsApp.php',
          success:function(data){
            // alert('삭제하였습니다.');
            showSavedTexts(childID);
          }, error:function(){
            alert('サーバーからのエラーが発生しました。');
          }
        });
      } else{

      }
    }


    // 관찰일지 그리기에서 텍스트로 전환
    $('#tObChangeTextBtn').unbind("click").bind("click", function(){
      $('#tObDraw').hide();
      $('#tObText').show();
      var flag = $("<input>").attr("type", "hidden").addClass("flagTextDraw");
      $("#flagTextDraw").append(flag);
    });

    // 관찰일지 텍스트에서 그리기로 전환
    $('.tObChangeDrawBtn').unbind("click").bind("click", function(){
      $('#tObText').hide();
      $('#textMemo').val('');
      $('#tObDraw').show();
      $("#flagTextDraw").empty();

      var drawCanvas = document.getElementById('drawCanvas');
  	   var drawBackup = new Array();

       drawCanvas.width = window.innerWidth;
       drawCanvas.height = window.innerHeight/2;


  	    if (typeof drawCanvas.getContext == 'function') {
      		var ctx = drawCanvas.getContext('2d');
      		var isDraw = false;
      		var width = $('#width').val();;
      		var color = $('#color').val();
      		var pDraw = $('#drawCanvas').offset();
      		var currP = null;

      		$('#width').bind('change', function(){ width = $('#width').val(); });
      		$('#color').bind('change', function(){ color = $('#color').val(); });

      		// 저장된 이미지 호출
      		if (localStorage['imgCanvas']) {
      			loadImage();
      		} else {
      			ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
      		}

      		// Event (마우스)
      		$('#drawCanvas').bind('mousedown', function(e) {
      			if (e.button===0) {
      				saveCanvas();
      				e.preventDefault();
      				ctx.beginPath();
      				isDraw = true;
      			}
      		});



      		$('#drawCanvas').bind('mousemove', function(e) {
      			var event = e.originalEvent;
      			e.preventDefault();
      			currP = { X:event.offsetX, Y:event.offsetY };
      			if(isDraw) draw_line(currP);
      		});
      		$('#drawCanvas').bind('mouseup', function(e) {
      			e.preventDefault();
      			isDraw = false;
      		});
      		$('#drawCanvas').bind('mouseleave', function(e) {
      			isDraw = false;
      		});

      		// Event (터치스크린)
      		$('#drawCanvas').bind('touchstart', function(e) {
      			saveCanvas();
      			e.preventDefault();
      			ctx.beginPath();
      		});
      		$('#drawCanvas').bind('touchmove', function(e) {
      			var event = e.originalEvent;
      			e.preventDefault();
      			currP = { X:event.touches[0].pageX-pDraw.left, Y:event.touches[0].pageY-pDraw.top };
      			draw_line(currP);
      		});
      		$('#drawCanvas').bind('touchend', function(e) {
      			e.preventDefault();
      		});

      		// 선 그리기
      		function draw_line(p) {
      			ctx.lineWidth = width;
      			ctx.lineCap = 'round';
      			ctx.lineTo(p.X, p.Y);
      			ctx.moveTo(p.X, p.Y);
      			ctx.strokeStyle = color;
      			ctx.stroke();
      		}

          /*

      		function loadImage() { // reload from localStorage
      			var img = new Image();
      			img.onload = function() {
      				ctx.drawImage(img, 0, 0);
      			}
      			img.src = localStorage.getItem('imgCanvas');
      		}
          */

          // 이미지 저장
      		function saveImage(childID) {
                // start
              // alert(id);
                var drawCanvas = document.getElementById('drawCanvas');
                // var test = document.getElementsByClass('')
                // "albumChildNameDiv"+id

            // 그림으로 보내는 데이터양이 많으면 get으로 주고받을수가
            // 없기 때문에 POST를 사용해야 한다.
            $.ajax({
              type:'POST',
              data: {
                imgUpload:drawCanvas.toDataURL('image/png'),
                childID : childID,
                user_num: user_num,
                memoCategory: 4,  // 1 -> 알림장내용 / 2 -> 알림장의 댓글  / 3 -> 특이사항  / 4 -> 단순메모
                memoType : 2  // 1 -> 글씨  /  2 -> 그림

              },

              // dataType:'jsonp',
              // data: {
              //   imgUpload:drawCanvas.toDataURL('image/png'),
              //   childID : childID
              // },
              	url:'http://japan-okyo.c9users.io/mobile/setMemo.php',
                // url:'./testphp.php',

          		 success:function(result){
          		 	alert("イメージのメモを登録しました。");
                clearCanvas();
          		 }, error:function(result){
                 clearCanvas();
                //  selectChildView("box1");
               }
          	});
              // end
          }





          // 캔버스 초기화
      		function clearCanvas() {
      			ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
      			ctx.beginPath();
      			localStorage.removeItem('imgCanvas');
      		}

          // ...?
      		function saveCanvas() {
      			drawBackup.push(ctx.getImageData(0, 0, drawCanvas.width, drawCanvas.height));
      		}

          //
      		function prevCanvas() {
      			ctx.putImageData(drawBackup.pop(), 0, 0);
      		}

          // 캔버스 뒤로돌아가기 버튼 클릭
      		$('#btnPrev').unbind("click").bind("click", function() {
      			prevCanvas();
      		});

          // 캔버스 클리어 버튼 클릭
      		$('#btnClea').unbind("click").bind("click", function() {
      			clearCanvas();
      		});

          // 저장한 이미지 보기 버튼 클릭
          $("#tObSavedDrawBtn").unbind("click").bind("click", function() {
            allHide();
            $("#showSavedImagesDiv").empty();
            $("#showSavedImages").show();
            getUploadedImageApp();


          });

          // 저장한 이미지 보기
          function getUploadedImageApp(){
            var newDate = new Date();
            var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

            if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
              var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
            } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
              var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
            } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
              var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
            } else{
              var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
            }
            $.ajax({
              dataType:"jsonp",
              data:{
                childID: childID,
                user_num: user_num,
                dateValue: dateValue,
                memoCategory: 4,  // 1 -> 알림장내용 / 2 -> 알림장의 댓글  / 3 -> 특이사항  / 4 -> 단순메모
                memoType : 2
              },
              url:'http://japan-okyo.c9users.io/mobile/getMemo.php',
              success:function(data){

                var cnt = data.data.length;

                for(var i = 0; i < cnt ; i++){

                    var id        = data.data[i].id;
                    var imageName = data.data[i].imageName;
                    var imgPath = data.data[i].imgPath;

                    var imgs = $("<img />").attr("src","http://japan-okyo.c9users.io"+imgPath+imageName);
                    // var imgsDiv = $("<div></div>").addClass("uploadedImgDiv").append(imags);
                    $("<div></div>").addClass("uploadedImgDiv"+id).append(imgs).appendTo("#showSavedImagesDiv");

                    (function(id, childId, imgPath, imageName){
                      $(".uploadedImgDiv"+id).unbind("click").bind("click",function(){
                        // deleteUploadedImages(id, childID, path, imageName);  // 클릭한 사진 지우기
                      });
                    }(id, childID, imgPath, imageName));
                }
              }, error:function(){

              }
            });
        }

          // 클릭한 이미지메모 지우기
          // function deleteUploadedImages(id, childID, path, imageName){
          //
          //   var deleteFlag = confirm("이미지를 삭제하시겠습니까?");
          //
          //   if(deleteFlag){
          //     $.ajax({
          //       dataType:"jsonp",
          //       data:{
          //         id: id,
          //         path: path,
          //         imageName: imageName
          //       },
          //       url:'https://chesyu.run.goorm.io/MyProject/ni/delUploadedImagesApp.php',
          //       success:function(data){
          //         // alert('삭제하였습니다.');
          //         $("#showSavedImagesDiv").empty();
          //         getUploadedImageApp();
          //         $("#showSavedImages").show();
          //       }, error:function(){
          //         alert('error');
          //       }
          //     });
          //   } else{
          //
          //   }
          // }

          // 다시 돌아가기
          $("#backTObDraw").unbind("click").bind("click", function(){
            reStartTodDraw(childID, imageName, childName);
          });



          // 그리기 취소버튼
          $('#tObCancelBtn2').unbind("click").bind("click", function(){
            selectChildView("box1");
          });

          // 그리기 저장버튼
      		$('#tObSaveBtn2').unbind("click").bind("click", function() {
      			saveImage(childID);
      		});
    	}

    });

  }


  // 다시 그리기로 보여주기
  function reStartTodDraw(childID, imageName, childName){
    allHide();
    tObservation(childID, imageName, childName);
    $('#tObText').hide();
    $('#tObDraw').show();
  }



  // 발달 행동 체크 클릭
  $('#box2').unbind("click").bind("click", function(){
    var whatIsBox = "box2";
    selectChildView(whatIsBox);
  });

  var feels;
  var health;
  var temperature;
  var meals;

  var basicChecks = new Array();
  var developCheckArrayID = new Array();
  var developCheckArrayValue = new Array();



  var reChildID;
  var reImageName;
  var reChildName;
  var reDevelopCheckArray;
  var testValueArray = new Array();


  var developValueYear;
  var developValueMonth;
  var developValueDay;


  // 발달 행동 체크
  $('#tDevSelectChildPanel').hide();
  $('#tDevChangeModePanel').hide();

  function developCheck(childID, imageName, childName, dateValue){
    reChildID = childID;
    reImageName = imageName;
    reChildName = childName;
    reDateValue;

    $('#childSelectBox1').hide();
    $("#openCheckDiv1Btn").hide();
    $("#tDevelopCheckDiv2").hide();
    $('#tDevelopCheck').show();



    var cnt;

    var newDate = new Date();
    var dateString = newDate.getFullYear() + " - " + (newDate.getMonth() + 1) + " - " + newDate.getDate();

    var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

    if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
      var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
    } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
      var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
    } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
      var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
    } else{
      var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
    }
    reDateValue = dateValue;


    var explodeDateValue = dateValue.split("-");
    var dateString = explodeDateValue[0] + " - " + explodeDateValue[1] + " - " + explodeDateValue[2];

    // 달력
    $(".dateValueP_develop").text(dateString);
    $(".datepicker_develop").datepicker({
            buttonImage: './img/calendar.png',
            buttonImageOnly: true,
             dateFormat: 'yy - mm - dd',
            // changeMonth: true,
            // changeYear: true,

            // nextText: '다음 달', // next 아이콘의 툴팁.
            // prevText: '이전 달',
            showOn: 'both',
            showButtonPanel: true,  // 달력아래 버튼 패널
            // currentText : 'Today',
            closeText:'Close',       // 버튼패널 중 닫기 텍스트 정의
            duration: "slow" ,      // 속도

            // 달력 OPEN시 위치
            beforeShow: function (input, inst) {
                setTimeout(function () {
                    inst.dpDiv.css({
                        top: 65,
                        left: 58
                        // top: 125,
                        // left: 2,
                        // width:340,
                    });
                }, 0);
            },

            // 달력에서 선택한 값을 변수에 저장
            onSelect: function(value) {
              var explodeValue = value.split(" - ");
              dateValue = explodeValue[0]+"-"+explodeValue[1]+"-"+explodeValue[2];

              $(".dateValueP_develop").empty();
              $(".dateValueP_develop").text(value);

              var valueP = $(".dateValueP_develop").text();

              var explodeValue = dateValue.split("-");

              developValueYear = explodeValue[0];
              developValueMonth = explodeValue[1];
              developValueDay = explodeValue[2];
              // alert("re번호 : " + reChildID + " " + " re이름 : " + reChildName);
              drawDevelopCheck(reChildID, reImageName, reChildName, dateValue);

              // if($("#flagDiv1Div2").children().hasClass("flagDiv1Div2") == true){
              //   alert("현재 발달체크 페이지임");
              //
              // }
              // else{
              //   alert("현재 상태체크 페이지임");
              //
              // }


            }
    });


    var explodeValue = dateValue.split("-");
    // explodeValue[0]+"-"+explodeValue[1]+"-"+explodeValue[2];

    developValueYear = explodeValue[0];
    developValueMonth = explodeValue[1];
    developValueDay = explodeValue[2];

    $("#tDevChangeModeBtn").unbind("click").bind("click", function(){
      // var changeModePanel = $("<div></div>").addClass("changeModePanel").appendTo("#tObservation");
      // var changeModePanelCloseBtn = $("<div></div>").addClass("changeModePanelCloseBtn").appendTo(".changeModePanel");
      // $("<div></div>").addClass("tDevChangeModePanelCloseBtn").appendTo("#tDevChangeModePanel");

      $("#tDevChangeModePanel").hide("slide",{direction:"right"},350,null);
      $("#tDevChangeModePanel").toggle("slide",{direction:"right"},350,null);

      var argValues = new Array();
      argValues.push(childID);
      argValues.push(imageName);
      argValues.push(childName);
      // alert(childID);
      // alert(imageName);
      // alert(childName);
      // makeChangePanel(argValues);

        // 패널 속에서 중복으로 추가되는 것을 방지
        $("#tDevChangeModePanel").empty();

        // 패널 닫기 버튼 생성
        $("<div></div>").addClass("changeModePanelCloseBtn").appendTo("#tDevChangeModePanel");

        // 패널 닫기 버튼 이벤트 걸기
        $(".changeModePanelCloseBtn").unbind("click").bind("click", function(){
            $("#tDevChangeModePanel").toggle("slide",{direction:"right"},350,null);
        });

        // ChangeModePanel
        var changeBtn1 = $("<div></div>").addClass("changeBtn1");
        var changeBtn1Img = $("<img></img>").attr("src", "./img/memo.png").appendTo(changeBtn1);
        var changeBtn1Text = $("<p>園児 メモ 作成</p>").appendTo(changeBtn1);
        $("#tDevChangeModePanel").append(changeBtn1);
        $(".changeBtn1").unbind("click").bind("click", function(){
            allHide();
            tObservation(argValues[0], argValues[1], argValues[2]);
            $("#tDevChangeModePanel").hide("slide",{direction:"right"},350,null);
        });

        var changeBtn23Box = $("<div></div>").addClass("changeBtn23Box");
        $("#tDevChangeModePanel").append(changeBtn23Box);

        var changeBtn2 = $("<div></div>").addClass("changeBtn2").appendTo(changeBtn23Box);
        var changeBtn2Img = $("<img></img>").attr("src", "./img/hyouka.png").appendTo(changeBtn2);
        var changeBtn2Text = $("<p>授業 評価項目</p>").appendTo(changeBtn2);
        $(".changeBtn2").unbind("click").bind("click", function(){
            allHide();
            var newDate = new Date();
            var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

            if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
              var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
            } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
              var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
            } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
              var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
            } else{
              var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
            }
            developCheck(argValues[0], argValues[1], argValues[2], dateValue);
            $("#tDevChangeModePanel").hide("slide",{direction:"right"},350,null);
        });

        var changeBtn3 = $("<div></div>").addClass("changeBtn3").appendTo(changeBtn23Box);
        var changeBtn3Img = $("<img></img>").attr("src", "./img/iCheck3.png").appendTo(changeBtn3);
        var changeBtn3Text = $("<p>発育日誌</p>").appendTo(changeBtn3);
        $(".changeBtn3").unbind("click").bind("click", function(){
            allHide();
            var newDate = new Date();
            var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

            if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
              var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
            } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
              var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
            } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
              var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
            } else{
              var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
            }
            tICheck(argValues[0], argValues[1], argValues[2], dateValue);
            $("#tDevChangeModePanel").hide("slide",{direction:"right"},350,null);
        });

        var changeBtn45Box = $("<div></div>").addClass("changeBtn45Box");
        $("#tDevChangeModePanel").append(changeBtn45Box);

        var changeBtn4 = $("<div></div>").addClass("changeBtn4").appendTo(changeBtn45Box);
        var changeBtn4Img = $("<img></img>").attr("src", "./img/camera.png").appendTo(changeBtn4);
        var changeBtn4Text = $("<p>写真アップロード</p>").appendTo(changeBtn4);
        $(".changeBtn4").unbind("click").bind("click", function(){
            allHide();
            photoUpload(argValues[0], argValues[1], argValues[2]);
            $("#tDevChangeModePanel").hide("slide",{direction:"right"},350,null);
        });


        var changeBtn5 = $("<div></div>").addClass("changeBtn5").appendTo(changeBtn45Box);
        var changeBtn5Img = $("<img></img>").attr("src", "./img/album2.png").appendTo(changeBtn5);
        var changeBtn5Text = $("<p>アルバムを見る</p>").appendTo(changeBtn5);
        $(".changeBtn5").unbind("click").bind("click", function(){
            allHide();
            showAlbum(argValues[0], argValues[1], argValues[2], 1);
            $("#tDevChangeModePanel").hide("slide",{direction:"right"},350,null);
        });

    });

    drawDevelopCheck(reChildID, reImageName, reChildName, dateValue);

    // ㅁㄴㅇㄹ2
    $("#tDevSelectChild").unbind("click").bind("click", function(){
        $("#tDevSelectChildPanel").toggle("slide",{direction:"left"},350,null);

        $('#tDevSelectChildList').empty();

        // 슬라이드 원아목록에 원아리스트 불러오기
        $.ajax({
            url:"http://japan-okyo.c9users.io/mobile/getChildrens.php",
            // url:"http://japan-okyo.c9users.io/mobile/mTest.php",
            data:{
              user_num: user_num,
              user_name : user_name
            },
            dataType:"jsonp",
            success:function(data){
                //성공
                if(data.result == "success"){
                    var cnt = data.data.length;

                    for(var i = 0; i < cnt ; i++){
                        var childID   = data.data[i].childNum;
                        var imageName = data.data[i].imageName;
                        var childName = data.data[i].childName;
                        var imageComment = data.data[i].imageComment;

                        var imgs = $("<img />").addClass("imageNameDev imageNameDev"+childID).attr("src", "http://japan-okyo.c9users.io/img/child/"+imageName);
                        var names = $("<p></p>").addClass("childNameDev childNameDev"+childID).text(childName);
                        var namesDiv = $("<div></div>").addClass("childNameDivDev childNameDivDev"+childID).append(names);

                        $("<div></div>").addClass('selectImgAndNameDev selectImgAndNameDev'+childID).appendTo("#tDevSelectChildList");
                        $("<div></div>").addClass("imageDivDev").append(imgs).appendTo(".selectImgAndNameDev"+childID);
                        $("<div></div>").addClass("NameDivDev").append(namesDiv).appendTo(".selectImgAndNameDev"+childID);

                        (function(childID, imageName, childName, dateValue){

                        $(".selectImgAndNameDev"+childID).unbind("click").bind("click",function(){
                            reChildID = childID;
                            reImageName = imageName;
                            reChildName = childName;
                            reDateValue = dateValue;
                            // alert("re번호 : " + reChildID + " " + " re이름 : " + reChildName);
                            // alert("번호 : " + childID + " " + " 이름 : " + childName);
                            // alert(reImageName);
                            // alert(reChildName);
                            // drawDevelopCheck(childID, imageName, childName, dateValue);
                            // tDevservation(childID, imageName, childName);

                            drawDevelopCheck(childID, imageName, childName, dateValue);

                            // if($("#flagDiv1Div2").children().hasClass("flagDiv1Div2") == true){
                            //   alert("현재 발달체크 페이지임");
                            //
                            //     $("#openCheckDiv2Btn").empty();
                            //     var btnText = $("<p></p>").text('状態チェック項目を見る');
                            //     $("#openCheckDiv2Btn").append(btnText);
                            //     $("#openCheckDiv2Btn").show();
                            //     $("#openCheckDiv1Btn").hide();
                            //     $("#tDevelopCheckDiv1").show();
                            //     $("#tDevelopCheckDiv2").hide();
                            //
                            //     var flag = $("<input></input>").attr("type", "hidden").addClass("flagDiv1Div2");
                            //     $("#flagDiv1Div2").append(flag);
                            // }
                            // else{
                            //   alert("현재 상태체크 페이지임");
                            //
                            //     $("#openCheckDiv1Btn").empty();
                            //     var btnText = $("<p></p>").text('発育チェック項目を見る');
                            //     $("#openCheckDiv1Btn").append(btnText);
                            //     $("#openCheckDiv2Btn").hide();
                            //     $("#openCheckDiv1Btn").show();
                            //     $("#tDevelopCheckDiv1").hide();
                            //     $("#tDevelopCheckDiv2").show();
                            //
                            //     $("#flagDiv1Div2").empty();
                            // }




                            // $("#openCheckDiv2Btn").unbind("click").bind("click", function(){
                            //   $("#openCheckDiv1Btn").empty();
                            //   var btnText = $("<p></p>").text('発育チェック項目を見る');
                            //   $("#openCheckDiv1Btn").append(btnText);
                            //   $("#openCheckDiv2Btn").hide();
                            //   $("#openCheckDiv1Btn").show();
                            //   $("#tDevelopCheckDiv1").hide();
                            //   $("#tDevelopCheckDiv2").show();
                            //
                            //   $("#flagDiv1Div2").empty();
                            // });
                            //
                            // $("#openCheckDiv1Btn").unbind("click").bind("click", function(){
                            //   $("#openCheckDiv2Btn").empty();
                            //   var btnText = $("<p></p>").text('状態チェック項目を見る');
                            //   $("#openCheckDiv2Btn").append(btnText);
                            //   $("#openCheckDiv2Btn").show();
                            //   $("#openCheckDiv1Btn").hide();
                            //   $("#tDevelopCheckDiv1").show();
                            //   $("#tDevelopCheckDiv2").hide();
                            //
                            //   var flag = $("<input></input>").attr("type", "hidden").addClass("flagDiv1Div2");
                            //   $("#flagDiv1Div2").append(flag);
                            //
                            // });




                            $("#tDevSelectChildPanel").toggle("slide",{direction:"left"},350,null);

                        });

                      }(childID, imageName, childName, dateValue));
                    }

                    if(cnt == 0)
                        $("<p></p>").text("アップロードの写真がありません。").appendTo("#selectImgAndName1");
                }
                //오류
                else {
                    window.alert("エラーの発生でございます。");
                }



            }, error: function(){
                window.alert("サーバーからのエラーが発生しました。");
            }
        });
    });

    $("#tDevSelectChildPanelCloseBtn").unbind("click").bind("click", function(){
        $("#tDevSelectChildPanel").toggle("slide",{direction:"left"},350,null);
    });
    //

    function drawDevelopCheck(childID, imageName, childName, dateValue){

      // 선택한 원아 이름, 이미지 출력
        $('#tDevelopChildInfo').empty();
        // var id        = data.data.id;
        // var imageName = data.data.imageName;
        // var childNum = data.data.childNum;
        // var childName = data.data.childName;

        var imgs = $("<img />").addClass("develop_ImageName").attr("src","http://japan-okyo.c9users.io/img/child/"+imageName);
        var names = $("<p></p>").addClass("develop_ChildName").text(childName);
        var namesDiv = $("<div></div>").addClass("develop_ChildNameDiv").append(names);

        $("#tDevelopChildInfo").append("<div></div>").addClass('develop_ImgAndName');
        $("<div></div>").addClass("develop_ImageNameDiv").append(imgs).append(namesDiv).appendTo(".develop_ImgAndName");
        // 발달 사항 체크 저장버튼 클릭
        // $('#tDevelopCheckSaveBtn').unbind("click").bind("click", function(){
        //   tDevelopCheckSave(childID);
        // });



        switch (developValueMonth) {
          case "01":
          developValueMonthText = "jan";
            break;
          case "02":
          developValueMonthText = "feb";
            break;
          case "03":
          developValueMonthText = "mar";
            break;
          case "04":
          developValueMonthText = "apr";
            break;
          case "05":
          developValueMonthText = "may";
            break;
          case "06":
          developValueMonthText = "jun";
            break;
          case "07":
          developValueMonthText = "jul";
            break;
          case "08":
          developValueMonthText = "aug";
            break;
          case "09":
          developValueMonthText = "sep";
            break;
          case "10":
          developValueMonthText = "oct";
            break;
          case "11":
          developValueMonthText = "nov";
            break;
          case "12":
          developValueMonthText = "dec";
            break;
          default:

        }




        // alert(user_num);
        // alert(childID);
        // alert(developValueYear);
        // alert(developValueMonthText);
        // alert(developValueDay);
        // alert(dateValue);


        $.ajax({
          dataType:"jsonp",
          data:{
            user_num: user_num,
            childID: childID,
            developValueYear: developValueYear,
            developValueMonthText: developValueMonthText,
            developValueDay: developValueDay,
            dateValue: dateValue
          },
          url:"http://japan-okyo.c9users.io/mobile/assessments.php",
          success:function(result){

            $("#tDevelopCheckDiv2").hide();
            $("#openCheckDiv1Btn").hide();

            $("#tDevelopCheckDiv1").show();
            $("#openCheckDiv2Btn").show();

              // 항목 표시
              $("#tDevelopCheckDiv1").empty();
              var cnt = result.data.length;
              reDevelopCheckArray = result.data;

              // for(var i = 0; i < cnt; i++){
              //   testValueArray = result.data[i].score;
              //   alert("위쪽for문에서의 값 : " + testValueArray);
              // }

              // alert(cnt);

              // alert("as멘츠에서 불러오는 data의 length : " + cnt);

              // for(var i = 0; i < result.data.length; i++){
                for(var i = 0; i < cnt ; i++){

                    checkID = result.data[i].mentsAssId;
                    developCheckArrayID = result.data[i].mentsAssId;
                    // developCheckArrayValue = result.data[i].score;


                (function(checkID, i){
                    //항목이름 담을 div
                    var checkTitleDiv = $("<div></div>").addClass("checkTitleDiv");
                    // var checkTitleP   = $("<pre></pre>").text(result.data[i].assContent).appendTo(checkTitleDiv);

                    var assContents = result.data[i].assContent;
                    var removeBrTag = assContents.replace(/<br>/g, '');
                     var checkTitleP   = $("<pre></pre>").text(removeBrTag).appendTo(checkTitleDiv);


                    // 항목 값 담을 div
                    var checkValuesDiv = $("<div></div>").addClass("checkValuesDiv");

                    var checkValueDiv1 = $("<div></div>").appendTo(checkValuesDiv).addClass("checkValueDiv1"+checkID);
                    $("<p>1</p>").appendTo(checkValueDiv1);

                    var checkValueDiv2 = $("<div></div>").appendTo(checkValuesDiv).addClass("checkValueDiv2"+checkID);
                    $("<p>2</p>").appendTo(checkValueDiv2);

                    var checkValueDiv3 = $("<div></div>").appendTo(checkValuesDiv).addClass("checkValueDiv3"+checkID);
                    $("<p>3</p>").appendTo(checkValueDiv3);

                    var checkValueDiv4 = $("<div></div>").appendTo(checkValuesDiv).addClass("checkValueDiv4"+checkID);
                    $("<p>4</p>").appendTo(checkValueDiv4);

                    var checkValueDiv5 = $("<div></div>").appendTo(checkValuesDiv).addClass("checkValueDiv5"+checkID);
                    $("<p>5</p>").appendTo(checkValueDiv5);




                    $("#tDevelopCheckDiv1").append(checkTitleDiv);
                    $("#tDevelopCheckDiv1").append(checkValuesDiv);

                    $("#openCheckDiv2Btn").show();
                    $("#tDevelopCheckDiv1").show();


                    $("#openCheckDiv2Btn").unbind("click").bind("click", function(){
                      $("#openCheckDiv1Btn").empty();
                      var btnText = $("<p></p>").text('発育チェック項目を見る');
                      $("#openCheckDiv1Btn").append(btnText);
                      $("#openCheckDiv2Btn").hide();
                      $("#openCheckDiv1Btn").show();6
                      $("#tDevelopCheckDiv1").hide();
                      $("#tDevelopCheckDiv2").show();

                      $("#flagDiv1Div2").empty();
                    });

                    $("#openCheckDiv1Btn").unbind("click").bind("click", function(){
                      $("#openCheckDiv2Btn").empty();
                      var btnText = $("<p></p>").text('状態チェック項目を見る');
                      $("#openCheckDiv2Btn").append(btnText);
                      $("#openCheckDiv2Btn").show();
                      $("#openCheckDiv1Btn").hide();
                      $("#tDevelopCheckDiv1").show();
                      $("#tDevelopCheckDiv2").hide();

                      var flag = $("<input></input>").attr("type", "hidden").addClass("flagDiv1Div2");
                      $("#flagDiv1Div2").append(flag);

                    });



                      // 값이 이미 있을경우 미리 색칠해놓기
                      if(result.data[i].score == "1"){
                        $(".checkValueDiv1"+checkID).empty();
                        $("<p></p>").text('1').appendTo(".checkValueDiv1"+checkID);
                        $(".checkValueDiv1"+checkID).css({
                          "border" : "2px solid white",
                          "background-color":"#00B1F2"
                        });
                        // var on = $("<input></input>").attr("type", "hidden").addClass("tAttendanceOn"+checkID);
                        var on = $("<input></input>").attr("type", "hidden").addClass("on");
                        $(".checkValueDiv1"+checkID).append(on);
                        developCheckArrayValue[i] = "1";
                        inputTestValueArray("1");



                        $(".checkValueDiv2"+checkID).empty();
                        $("<p></p>").text('2').appendTo(".checkValueDiv2"+checkID);
                        $(".checkValueDiv2"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });


                        $(".checkValueDiv3"+checkID).empty();
                        $("<p></p>").text('3').appendTo(".checkValueDiv3"+checkID);
                        $(".checkValueDiv3"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });

                        $(".checkValueDiv4"+checkID).empty();
                        $("<p></p>").text('4').appendTo(".checkValueDiv4"+checkID);
                        $(".checkValueDiv4"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });

                        $(".checkValueDiv5"+checkID).empty();
                        $("<p></p>").text('5').appendTo(".checkValueDiv5"+checkID);
                        $(".checkValueDiv5"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });
                      }

                      if(result.data[i].score == "2"){
                        $(".checkValueDiv1"+checkID).empty();
                        $("<p></p>").text('1').appendTo(".checkValueDiv1"+checkID);
                        $(".checkValueDiv1"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });

                        $(".checkValueDiv2"+checkID).empty();
                        $("<p></p>").text('2').appendTo(".checkValueDiv2"+checkID);
                        $(".checkValueDiv2"+checkID).css({
                          "border" : "2px solid white",
                          "background-color":"#00B1F2"
                        });
                        // var on = $("<input></input>").attr("type", "hidden").addClass("tEarlyLeaveOn"+checkID);
                        var on = $("<input></input>").attr("type", "hidden").addClass("on");
                        $(".checkValueDiv2"+checkID).append(on);
                        developCheckArrayValue[i] = "2";
                        inputTestValueArray("2");


                        $(".checkValueDiv3"+checkID).empty();
                        $("<p></p>").text('3').appendTo(".checkValueDiv3"+checkID);
                        $(".checkValueDiv3"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });

                        $(".checkValueDiv4"+checkID).empty();
                        $("<p></p>").text('4').appendTo(".checkValueDiv4"+checkID);
                        $(".checkValueDiv4"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });

                        $(".checkValueDiv5"+checkID).empty();
                        $("<p></p>").text('5').appendTo(".checkValueDiv5"+checkID);
                        $(".checkValueDiv5"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });
                      }

                      if(result.data[i].score == "3"){
                        $(".checkValueDiv1"+checkID).empty();
                        $("<p></p>").text('1').appendTo(".checkValueDiv1"+checkID);
                        $(".checkValueDiv1"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });


                        $(".checkValueDiv2"+checkID).empty();
                        $("<p></p>").text('2').appendTo(".checkValueDiv2"+checkID);
                        $(".checkValueDiv2"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });


                        $(".checkValueDiv3"+checkID).empty();
                        $("<p></p>").text('3').appendTo(".checkValueDiv3"+checkID);
                        $(".checkValueDiv3"+checkID).css({
                          "border" : "2px solid white",
                          "background-color":"#00B1F2"
                        });
                        // var on = $("<input></input>").attr("type", "hidden").addClass("tAbsenceOn"+checkID);
                        var on = $("<input></input>").attr("type", "hidden").addClass("on");
                        $(".checkValueDiv3"+checkID).append(on);
                        developCheckArrayValue[i] = "3";
                        inputTestValueArray("3");


                        $(".checkValueDiv4"+checkID).empty();
                        $("<p></p>").text('4').appendTo(".checkValueDiv4"+checkID);
                        $(".checkValueDiv4"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });

                        $(".checkValueDiv5"+checkID).empty();
                        $("<p></p>").text('5').appendTo(".checkValueDiv5"+checkID);
                        $(".checkValueDiv5"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });
                      }

                      if(result.data[i].score == "4"){
                        $(".checkValueDiv1"+checkID).empty();
                        $("<p></p>").text('1').appendTo(".checkValueDiv1"+checkID);
                        $(".checkValueDiv1"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });


                        $(".checkValueDiv2"+checkID).empty();
                        $("<p></p>").text('2').appendTo(".checkValueDiv2"+checkID);
                        $(".checkValueDiv2"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });


                        $(".checkValueDiv3"+checkID).empty();
                        $("<p></p>").text('3').appendTo(".checkValueDiv3"+checkID);
                        $(".checkValueDiv3"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });

                        $(".checkValueDiv4"+checkID).empty();
                        $("<p></p>").text('4').appendTo(".checkValueDiv4"+checkID);
                        $(".checkValueDiv4"+checkID).css({
                          "border" : "2px solid white",
                          "background-color":"#00B1F2"
                        });
                        var on = $("<input></input>").attr("type", "hidden").addClass("on");
                        $(".checkValueDiv4"+checkID).append(on);
                        developCheckArrayValue[i] = "4";
                        inputTestValueArray("4");

                        $(".checkValueDiv5"+checkID).empty();
                        $("<p></p>").text('5').appendTo(".checkValueDiv5"+checkID);
                        $(".checkValueDiv5"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });
                      }

                      if(result.data[i].score == "5"){
                        $(".checkValueDiv1"+checkID).empty();
                        $("<p></p>").text('1').appendTo(".checkValueDiv1"+checkID);
                        $(".checkValueDiv1"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });


                        $(".checkValueDiv2"+checkID).empty();
                        $("<p></p>").text('2').appendTo(".checkValueDiv2"+checkID);
                        $(".checkValueDiv2"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });


                        $(".checkValueDiv3"+checkID).empty();
                        $("<p></p>").text('3').appendTo(".checkValueDiv3"+checkID);
                        $(".checkValueDiv3"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });

                        $(".checkValueDiv4"+checkID).empty();
                        $("<p></p>").text('4').appendTo(".checkValueDiv4"+checkID);
                        $(".checkValueDiv4"+checkID).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });


                        $(".checkValueDiv5"+checkID).empty();
                        $("<p></p>").text('5').appendTo(".checkValueDiv5"+checkID);
                        $(".checkValueDiv5"+checkID).css({
                          "border" : "2px solid white",
                          "background-color":"#00B1F2"
                        });
                        var on = $("<input></input>").attr("type", "hidden").addClass("on");
                        $(".checkValueDiv5"+checkID).append(on);
                        developCheckArrayValue[i] = "5";
                        inputTestValueArray("5");
                      }


                      /////////
                      // 1번 버튼 클릭
                       $(".checkValueDiv1"+checkID).unbind("click").bind("click", function(){
                         // attendanceInfo[i] = "출석";
                         // alert("선택한 원아는 " + checkID + "이며, " + attendanceInfo[i]);
                         $(".checkValueDiv1"+checkID).empty();
                         $("<p></p>").text('1').appendTo(".checkValueDiv1"+checkID);
                         $(".checkValueDiv1"+checkID).css({
                           "border" : "2px solid white",
                           "background-color":"#00B1F2"
                         });
                         // var on = $("<input></input>").attr("type", "hidden").addClass("tAttendanceOn"+checkID);
                         var on = $("<input></input>").attr("type", "hidden").addClass("on");
                         $(".checkValueDiv1"+checkID).append(on);
                         developCheckArrayValue[i] = "1";
                          inputTestValueArray("1");



                         $(".checkValueDiv2"+checkID).empty();
                         $("<p></p>").text('2').appendTo(".checkValueDiv2"+checkID);
                         $(".checkValueDiv2"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });


                         $(".checkValueDiv3"+checkID).empty();
                         $("<p></p>").text('3').appendTo(".checkValueDiv3"+checkID);
                         $(".checkValueDiv3"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });

                         $(".checkValueDiv4"+checkID).empty();
                         $("<p></p>").text('4').appendTo(".checkValueDiv4"+checkID);
                         $(".checkValueDiv4"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });

                         $(".checkValueDiv5"+checkID).empty();
                         $("<p></p>").text('5').appendTo(".checkValueDiv5"+checkID);
                         $(".checkValueDiv5"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });
                       });

                       // 2번 버튼 클릭
                       $(".checkValueDiv2"+checkID).unbind("click").bind("click", function(){
                         // attendanceInfo[i] = "조퇴";
                         // alert("선택한 원아는 " + checkID + "이며, " + attendanceInfo[i]);
                         $(".checkValueDiv1"+checkID).empty();
                         $("<p></p>").text('1').appendTo(".checkValueDiv1"+checkID);
                         $(".checkValueDiv1"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });

                         $(".checkValueDiv2"+checkID).empty();
                         $("<p></p>").text('2').appendTo(".checkValueDiv2"+checkID);
                         $(".checkValueDiv2"+checkID).css({
                           "border" : "2px solid white",
                           "background-color":"#00B1F2"
                         });
                         // var on = $("<input></input>").attr("type", "hidden").addClass("tEarlyLeaveOn"+checkID);
                         var on = $("<input></input>").attr("type", "hidden").addClass("on");
                         $(".checkValueDiv2"+checkID).append(on);
                         developCheckArrayValue[i] = "2";
                         inputTestValueArray("2");


                         $(".checkValueDiv3"+checkID).empty();
                         $("<p></p>").text('3').appendTo(".checkValueDiv3"+checkID);
                         $(".checkValueDiv3"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });

                         $(".checkValueDiv4"+checkID).empty();
                         $("<p></p>").text('4').appendTo(".checkValueDiv4"+checkID);
                         $(".checkValueDiv4"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });

                         $(".checkValueDiv5"+checkID).empty();
                         $("<p></p>").text('5').appendTo(".checkValueDiv5"+checkID);
                         $(".checkValueDiv5"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });

                       });

                       // 3번 버튼 클릭
                       $(".checkValueDiv3"+checkID).unbind("click").bind("click", function(){
                         // attendanceInfo[i] = "결석";
                         // alert("선택한 원아는 " + checkID + "이며, " + attendanceInfo[i]);
                         $(".checkValueDiv1"+checkID).empty();
                         $("<p></p>").text('1').appendTo(".checkValueDiv1"+checkID);
                         $(".checkValueDiv1"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });


                         $(".checkValueDiv2"+checkID).empty();
                         $("<p></p>").text('2').appendTo(".checkValueDiv2"+checkID);
                         $(".checkValueDiv2"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });


                         $(".checkValueDiv3"+checkID).empty();
                         $("<p></p>").text('3').appendTo(".checkValueDiv3"+checkID);
                         $(".checkValueDiv3"+checkID).css({
                           "border" : "2px solid white",
                           "background-color":"#00B1F2"
                         });
                         // var on = $("<input></input>").attr("type", "hidden").addClass("tAbsenceOn"+checkID);
                         var on = $("<input></input>").attr("type", "hidden").addClass("on");
                         $(".checkValueDiv3"+checkID).append(on);
                         developCheckArrayValue[i] = "3";
                         inputTestValueArray("3");


                         $(".checkValueDiv4"+checkID).empty();
                         $("<p></p>").text('4').appendTo(".checkValueDiv4"+checkID);
                         $(".checkValueDiv4"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });

                         $(".checkValueDiv5"+checkID).empty();
                         $("<p></p>").text('5').appendTo(".checkValueDiv5"+checkID);
                         $(".checkValueDiv5"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });
                       });

                       // 4번 버튼 클릭
                       $(".checkValueDiv4"+checkID).unbind("click").bind("click", function(){
                         // attendanceInfo[i] = "결석";
                         // alert("선택한 원아는 " + checkID + "이며, " + attendanceInfo[i]);
                         $(".checkValueDiv1"+checkID).empty();
                         $("<p></p>").text('1').appendTo(".checkValueDiv1"+checkID);
                         $(".checkValueDiv1"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });


                         $(".checkValueDiv2"+checkID).empty();
                         $("<p></p>").text('2').appendTo(".checkValueDiv2"+checkID);
                         $(".checkValueDiv2"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });


                         $(".checkValueDiv3"+checkID).empty();
                         $("<p></p>").text('3').appendTo(".checkValueDiv3"+checkID);
                         $(".checkValueDiv3"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });

                         $(".checkValueDiv4"+checkID).empty();
                         $("<p></p>").text('4').appendTo(".checkValueDiv4"+checkID);
                         $(".checkValueDiv4"+checkID).css({
                           "border" : "2px solid white",
                           "background-color":"#00B1F2"
                         });
                         var on = $("<input></input>").attr("type", "hidden").addClass("on");
                         $(".checkValueDiv4"+checkID).append(on);
                         developCheckArrayValue[i] = "4";
                         inputTestValueArray("4");

                         $(".checkValueDiv5"+checkID).empty();
                         $("<p></p>").text('5').appendTo(".checkValueDiv5"+checkID);
                         $(".checkValueDiv5"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });
                       });

                       // 5번 버튼 클릭
                       $(".checkValueDiv5"+checkID).unbind("click").bind("click", function(){
                         // attendanceInfo[i] = "결석";
                         // alert("선택한 원아는 " + checkID + "이며, " + attendanceInfo[i]);
                         $(".checkValueDiv1"+checkID).empty();
                         $("<p></p>").text('1').appendTo(".checkValueDiv1"+checkID);
                         $(".checkValueDiv1"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });


                         $(".checkValueDiv2"+checkID).empty();
                         $("<p></p>").text('2').appendTo(".checkValueDiv2"+checkID);
                         $(".checkValueDiv2"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });


                         $(".checkValueDiv3"+checkID).empty();
                         $("<p></p>").text('3').appendTo(".checkValueDiv3"+checkID);
                         $(".checkValueDiv3"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });

                         $(".checkValueDiv4"+checkID).empty();
                         $("<p></p>").text('4').appendTo(".checkValueDiv4"+checkID);
                         $(".checkValueDiv4"+checkID).css({
                           "border" : "2px solid #00B1F2",
                           "background-color":"white"
                         });


                         $(".checkValueDiv5"+checkID).empty();
                         $("<p></p>").text('5').appendTo(".checkValueDiv5"+checkID);
                         $(".checkValueDiv5"+checkID).css({
                           "border" : "2px solid white",
                           "background-color":"#00B1F2"
                         });
                         var on = $("<input></input>").attr("type", "hidden").addClass("on");
                         $(".checkValueDiv5"+checkID).append(on);
                         developCheckArrayValue[i] = "5";
                        inputTestValueArray("5");
                       });

                      //////////
                }(checkID, i));






              }

          },error:function(){
            alert('サーバーからのエラーが発生しました。');
          }
        });

        // var on = $("<input></input>").attr("type", "hidden").attr("value", "on").addClass("on");
        // basicChecks 의 값을 읽어보는데, 값이 있으면 미리색칠해놓기, 없으면 Pass
        $.ajax({
          dataType:"jsonp",
          data:{
            user_num: user_num,
            childID: childID,
            dateValue : dateValue
          },
          url:"http://japan-okyo.c9users.io/mobile/getBasicChecks.php",
          success:function(data){
            if(data.result == "success"){

              // 기분  미리 색칠하기
              if(data.data.feels == 1){
                $("#checkBoxDiv1Value1").css({"background-color":"#F15F5F"});
                // $("#checkBoxDiv1Value1").empty();
                // $("#checkBoxDiv1Value1").append("<p>나쁨</p>");
                // $("#checkBoxDiv1Value1").append(on);
                feels = "1";
                $("#checkBoxDiv1Value2").css({"background-color":"white"});
                $("#checkBoxDiv1Value3").css({"background-color":"white"});
              }
              else if(data.data.feels == 2){
                $("#checkBoxDiv1Value1").css({"background-color":"white"});
                $("#checkBoxDiv1Value2").css({"background-color":"#FFCD12"});
                // $("#checkBoxDiv1Value2").empty(on);
                // $("#checkBoxDiv1Value2").append("<p>보통</p>");
                // $("#checkBoxDiv1Value2").append(on);
                feels = "2";
                $("#checkBoxDiv1Value3").css({"background-color":"white"});
              }
              else if(data.data.feels == 3){
                $("#checkBoxDiv1Value1").css({"background-color":"white"});
                $("#checkBoxDiv1Value2").css({"background-color":"white"});
                $("#checkBoxDiv1Value3").css({"background-color":"#00B1F2"});
                // $("#checkBoxDiv1Value3").empty(on);
                // $("#checkBoxDiv1Value3").append("<p>좋음</p>");
                // $("#checkBoxDiv1Value3").append(on);
                feels = "3";
              }

              if(data.data.health == 1){
                $("#checkBoxDiv2Value1").css({"background-color":"#F15F5F"});
                // $("#checkBoxDiv2Value1").empty(on);
                // $("#checkBoxDiv2Value1").append("<p>나쁨</p>");
                // $("#checkBoxDiv2Value1").append(on);
                health = "1";
                $("#checkBoxDiv2Value2").css({"background-color":"white"});
                $("#checkBoxDiv2Value3").css({"background-color":"white"});
              }
              else if(data.data.health == 2){
                $("#checkBoxDiv2Value1").css({"background-color":"white"});
                $("#checkBoxDiv2Value2").css({"background-color":"#FFCD12"});
                // $("#checkBoxDiv2Value2").empty(on);
                // $("#checkBoxDiv2Value2").append("<p>보통</p>");
                // $("#checkBoxDiv2Value2").append(on);
                health = "2";
                $("#checkBoxDiv2Value3").css({"background-color":"white"});
              }
              else if(data.data.health == 3){
                $("#checkBoxDiv2Value1").css({"background-color":"white"});
                $("#checkBoxDiv2Value2").css({"background-color":"white"});
                $("#checkBoxDiv2Value3").css({"background-color":"#00B1F2"});
                // $("#checkBoxDiv2Value3").empty(on);
                // $("#checkBoxDiv2Value3").append("<p>좋음</p>");
                // $("#checkBoxDiv2Value3").append(on);
                health = "3";
              }

              if(data.data.temperature == 2){
                $("#checkBoxDiv3Value1").css({"background-color":"#F361A6"});
                // $("#checkBoxDiv3Value1").empty(on);
                // $("#checkBoxDiv3Value1").append("<p>정상</p>");
                // $("#checkBoxDiv3Value1").append(on);
                temperature = "2";
                $("#checkBoxDiv3Value2").css({"background-color":"white"});
                $("#checkBoxDiv3Value3").css({"background-color":"white"});
              }
              else if(data.data.temperature == 3){
                $("#checkBoxDiv3Value1").css({"background-color":"white"});
                $("#checkBoxDiv3Value2").css({"background-color":"#00B1F2"});
                // $("#checkBoxDiv3Value2").empty(on);
                // $("#checkBoxDiv3Value2").append("<p>미열</p>");
                // $("#checkBoxDiv3Value2").append(on);
                temperature = "3";
                $("#checkBoxDiv3Value3").css({"background-color":"white"});
              }
              else if(data.data.temperature == 4){
                $("#checkBoxDiv3Value1").css({"background-color":"white"});
                $("#checkBoxDiv3Value2").css({"background-color":"white"});
                $("#checkBoxDiv3Value3").css({"background-color":"#FF0000"});
                // $("#checkBoxDiv3Value1").empty(on);
                // $("#checkBoxDiv3Value1").append("<p>고열</p>");
                // $("#checkBoxDiv3Value1").append(on);
                temperature = "4";
              }

              if(data.data.meals == 1){
                $("#checkBoxDiv4Value1").css({"background-color":"white"});
                $("#checkBoxDiv4Value2").css({"background-color":"white"});
                $("#checkBoxDiv4Value3").css({"background-color":"white"});
                $("#checkBoxDiv4Value4").css({"background-color":"#FF0000"});
                // $("#checkBoxDiv4Value4").empty(on);
                // $("#checkBoxDiv4Value4").append("<p>안함</p>");
                // $("#checkBoxDiv4Value4").append(on);
                meals = "1";
              }

              else if(data.data.meals == 2){
                $("#checkBoxDiv4Value1").css({"background-color":"##F361A6"});
                // $("#checkBoxDiv4Value1").empty(on);
                // $("#checkBoxDiv4Value1").append("<p>적음</p>");
                // $("#checkBoxDiv4Value1").append(on);
                meals = "2";
                $("#checkBoxDiv4Value2").css({"background-color":"white"});
                $("#checkBoxDiv4Value3").css({"background-color":"white"});
                $("#checkBoxDiv4Value4").css({"background-color":"white"});
              }
              else if(data.data.meals == 3){
                $("#checkBoxDiv4Value1").css({"background-color":"white"});
                $("#checkBoxDiv4Value2").css({"background-color":"#00B1F2"});
                // $("#checkBoxDiv4Value2").empty(on);
                // $("#checkBoxDiv4Value2").append("<p>보통</p>");
                // $("#checkBoxDiv4Value2").append(on);
                meals = "3";
                $("#checkBoxDiv4Value3").css({"background-color":"white"});
                $("#checkBoxDiv4Value4").css({"background-color":"white"});
              }
              else if(data.data.meals == 4){
                $("#checkBoxDiv4Value1").css({"background-color":"white"});
                $("#checkBoxDiv4Value2").css({"background-color":"white"});
                $("#checkBoxDiv4Value3").css({"background-color":"#F15F5F"});
                // $("#checkBoxDiv4Value3").empty(on);
                // $("#checkBoxDiv4Value3").append("<p>많음</p>");
                // $("#checkBoxDiv4Value3").append(on);
                meals = "4";
                $("#checkBoxDiv4Value4").css({"background-color":"white"});
              }


            }else{
              // 오늘 작성한 값이 없다면 다시 공백인 색으로 되돌림
              // 기분
              $("#checkBoxDiv1Value1").css({"background-color":"white"});
              $("#checkBoxDiv1Value2").css({"background-color":"white"});
              $("#checkBoxDiv1Value3").css({"background-color":"white"});

              // 건강
              $("#checkBoxDiv2Value1").css({"background-color":"white"});
              $("#checkBoxDiv2Value2").css({"background-color":"white"});
              $("#checkBoxDiv2Value3").css({"background-color":"white"});

              //체온
              $("#checkBoxDiv3Value1").css({"background-color":"white"});
              $("#checkBoxDiv3Value2").css({"background-color":"white"});
              $("#checkBoxDiv3Value3").css({"background-color":"white"});

              //식사여부
              $("#checkBoxDiv4Value1").css({"background-color":"white"});
              $("#checkBoxDiv4Value2").css({"background-color":"white"});
              $("#checkBoxDiv4Value3").css({"background-color":"white"});
              $("#checkBoxDiv4Value4").css({"background-color":"white"});
            }
          },
          error:function(){
              alert('サーバーからのエラーが発生しました。');
          }
        });

        // 기분 버튼들
        $("#checkBoxDiv1Value1").unbind("click").bind("click", function(){
          $("#checkBoxDiv1Value1").css({"background-color":"#F15F5F"});
          // $("#checkBoxDiv1Value1").empty();
          // $("#checkBoxDiv1Value1").append("<p>나쁨</p>");
          // $("#checkBoxDiv1Value1").append(on);
          feels = "1";
          $("#checkBoxDiv1Value2").css({"background-color":"white"});
          $("#checkBoxDiv1Value3").css({"background-color":"white"});
        });
        $("#checkBoxDiv1Value2").unbind("click").bind("click", function(){
          $("#checkBoxDiv1Value1").css({"background-color":"white"});
          $("#checkBoxDiv1Value2").css({"background-color":"#FFCD12"});
          // $("#checkBoxDiv1Value2").empty(on);
          // $("#checkBoxDiv1Value2").append("<p>보통</p>");
          // $("#checkBoxDiv1Value2").append(on);
          feels = "2";
          $("#checkBoxDiv1Value3").css({"background-color":"white"});
        });
        $("#checkBoxDiv1Value3").unbind("click").bind("click", function(){
          $("#checkBoxDiv1Value1").css({"background-color":"white"});
          $("#checkBoxDiv1Value2").css({"background-color":"white"});
          $("#checkBoxDiv1Value3").css({"background-color":"#00B1F2"});
          // $("#checkBoxDiv1Value3").empty(on);
          // $("#checkBoxDiv1Value3").append("<p>좋음</p>");
          // $("#checkBoxDiv1Value3").append(on);
          feels = "3";
        });

        // 건강 버튼들
        $("#checkBoxDiv2Value1").unbind("click").bind("click", function(){
          $("#checkBoxDiv2Value1").css({"background-color":"#F15F5F"});
          // $("#checkBoxDiv2Value1").empty(on);
          // $("#checkBoxDiv2Value1").append("<p>나쁨</p>");
          // $("#checkBoxDiv2Value1").append(on);
          health = "1";
          $("#checkBoxDiv2Value2").css({"background-color":"white"});
          $("#checkBoxDiv2Value3").css({"background-color":"white"});
        });
        $("#checkBoxDiv2Value2").unbind("click").bind("click", function(){
          $("#checkBoxDiv2Value1").css({"background-color":"white"});
          $("#checkBoxDiv2Value2").css({"background-color":"#FFCD12"});
          // $("#checkBoxDiv2Value2").empty(on);
          // $("#checkBoxDiv2Value2").append("<p>보통</p>");
          // $("#checkBoxDiv2Value2").append(on);
          health = "2";
          $("#checkBoxDiv2Value3").css({"background-color":"white"});
        });
        $("#checkBoxDiv2Value3").unbind("click").bind("click", function(){
          $("#checkBoxDiv2Value1").css({"background-color":"white"});
          $("#checkBoxDiv2Value2").css({"background-color":"white"});
          $("#checkBoxDiv2Value3").css({"background-color":"#00B1F2"});
          // $("#checkBoxDiv2Value3").empty(on);
          // $("#checkBoxDiv2Value3").append("<p>좋음</p>");
          // $("#checkBoxDiv2Value3").append(on);
          health = "3";
        });

        // 체온 버튼들
        $("#checkBoxDiv3Value1").unbind("click").bind("click", function(){
          $("#checkBoxDiv3Value1").css({"background-color":"#F361A6"});
          // $("#checkBoxDiv3Value1").empty(on);
          // $("#checkBoxDiv3Value1").append("<p>정상</p>");
          // $("#checkBoxDiv3Value1").append(on);
          temperature = "2";
          $("#checkBoxDiv3Value2").css({"background-color":"white"});
          $("#checkBoxDiv3Value3").css({"background-color":"white"});
        });
        $("#checkBoxDiv3Value2").unbind("click").bind("click", function(){
          $("#checkBoxDiv3Value1").css({"background-color":"white"});
          $("#checkBoxDiv3Value2").css({"background-color":"#00B1F2"});
          // $("#checkBoxDiv3Value2").empty(on);
          // $("#checkBoxDiv3Value2").append("<p>미열</p>");
          // $("#checkBoxDiv3Value2").append(on);
          temperature = "3";
          $("#checkBoxDiv3Value3").css({"background-color":"white"});
        });
        $("#checkBoxDiv3Value3").unbind("click").bind("click", function(){
          $("#checkBoxDiv3Value1").css({"background-color":"white"});
          $("#checkBoxDiv3Value2").css({"background-color":"white"});
          $("#checkBoxDiv3Value3").css({"background-color":"#FF0000"});
          // $("#checkBoxDiv3Value1").empty(on);
          // $("#checkBoxDiv3Value1").append("<p>고열</p>");
          // $("#checkBoxDiv3Value1").append(on);
          temperature = "4";
        });

        // 식사여부 버튼들
        $("#checkBoxDiv4Value1").unbind("click").bind("click", function(){
          $("#checkBoxDiv4Value1").css({"background-color":"#F361A6"});
          // $("#checkBoxDiv4Value1").empty(on);
          // $("#checkBoxDiv4Value1").append("<p>적음</p>");
          // $("#checkBoxDiv4Value1").append(on);
          meals = "2";
          $("#checkBoxDiv4Value2").css({"background-color":"white"});
          $("#checkBoxDiv4Value3").css({"background-color":"white"});
          $("#checkBoxDiv4Value4").css({"background-color":"white"});
        });
        $("#checkBoxDiv4Value2").unbind("click").bind("click", function(){
          $("#checkBoxDiv4Value1").css({"background-color":"white"});
          $("#checkBoxDiv4Value2").css({"background-color":"#00B1F2"});
          // $("#checkBoxDiv4Value2").empty(on);
          // $("#checkBoxDiv4Value2").append("<p>보통</p>");
          // $("#checkBoxDiv4Value2").append(on);
          meals = "3";
          $("#checkBoxDiv4Value3").css({"background-color":"white"});
          $("#checkBoxDiv4Value4").css({"background-color":"white"});
        });
        $("#checkBoxDiv4Value3").unbind("click").bind("click", function(){
          $("#checkBoxDiv4Value1").css({"background-color":"white"});
          $("#checkBoxDiv4Value2").css({"background-color":"white"});
          $("#checkBoxDiv4Value3").css({"background-color":"#F15F5F"});
          // $("#checkBoxDiv4Value3").empty(on);
          // $("#checkBoxDiv4Value3").append("<p>많음</p>");
          // $("#checkBoxDiv4Value3").append(on);
          meals = "4";
          $("#checkBoxDiv4Value4").css({"background-color":"white"});
        });
        $("#checkBoxDiv4Value4").unbind("click").bind("click", function(){
          $("#checkBoxDiv4Value1").css({"background-color":"white"});
          $("#checkBoxDiv4Value2").css({"background-color":"white"});
          $("#checkBoxDiv4Value3").css({"background-color":"white"});
          $("#checkBoxDiv4Value4").css({"background-color":"#FF0000"});
          // $("#checkBoxDiv4Value4").empty(on);
          // $("#checkBoxDiv4Value4").append("<p>안함</p>");
          // $("#checkBoxDiv4Value4").append(on);
          meals = "1";
        });


      // // 발달 사항 체크 저장버튼 클릭
      $('#tDevelopCheckSaveBtn').unbind("click").bind("click", function(){
        // 달력에서 뽑은 값을 다시 조합해서 날짜값 만들기
        var year = developValueYear+"";
        var month = developValueMonth+"";
        var day = developValueDay+"";
        var dateValue = year + "-" + month + "-" + day;

        tDevelopCheckSave(childID, dateValue);
      });

      // 발달 사항 체크 취소버튼 클릭
      $('#tDevelopCheckCancelBtn').unbind("click").bind("click", function(){
        selectChildView("box2");
      });


      function inputTestValueArray(values){
        testValueArray.push(values);
      }

      // 발달 사항 체크 저장
      function tDevelopCheckSave(childID, dateValue){

            if(feels == undefined){
              feels = "2";
            }
            if(health == undefined){
              health = "2";
            }

            if(temperature == undefined){
              temperature = "2";
            }

            if(meals == undefined){
              meals = "2";
            }

            basicChecks[0] = feels;
            basicChecks[1] = health;
            basicChecks[2] = temperature;
            basicChecks[3] = meals;

            // for(var i = 0; i < developCheckArrayID.length; i++){
            //     if(developCheckArrayValue[i] == undefined){
            //       developCheckArrayValue[i] = "3";
            //     }
            //
            //
            //     alert(
            //       "서버로 넘길 항목 고유넘버 : " + developCheckArrayID[i] +
            //       " //////// " +
            //       "항목 선택한값 : " + developCheckArrayValue[i]
            //     );
            //
            // }
            //
            // for(var i = 0; i < basicChecks.length; i++){
            //       alert(basicChecks[i]);
            // }



          // developCheckArrayID[i]]  <--   항목 고유넘버
          // developCheckArrayValue[i]]  <--   항목 고유넘버에 대응하는 클릭한 값


          //ㅁㄴㅇ



          var developCheckArrayID = new Array();
          var developCheckArrayValues = new Array();


          for(var i = 0; i < reDevelopCheckArray.length; i++){
            // alert("아이디값 : " + reDevelopCheckArray[i].mentsAssId + " /////  스코어값 : " + developCheckArrayValue[i]);
            developCheckArrayID[i] = reDevelopCheckArray[i].mentsAssId ;
            developCheckArrayValues[i] = developCheckArrayValue[i];

            // alert("아이디값 : " + developCheckArrayID[i] + " /////  스코어값 : " + developCheckArrayValues[i]);
          }

          // alert("인설트 직전의 항목ID값 length : "+developCheckArrayID.length);
          // alert("인설트 직전의 항목벨류 length : "+  developCheckArrayValues.length);

          // developCheckArrayID = result.data[i].mentsAssId;
          // developCheckArrayValue = result.data[i].score;


          // alert("인설트 직전의 항목Value 값 length : "+developCheckArrayValue.length);
            $.ajax({
              dataType:"jsonp",
              data:{
                childID: childID,
                user_num: user_num,
                developCheckArrayID : developCheckArrayID,
                developCheckArrayValue : developCheckArrayValues,
                basicChecks : basicChecks,
                dateValue : dateValue
              },
              url:"http://japan-okyo.c9users.io/mobile/setAssessed.php",
              success:function(data){
                alert('チェックを完了しました。');
                var whatIsBox = "box2";
                selectChildView(whatIsBox);
              },
              error:function(){
                alert('サーバーからの問題発生');
                $('#tLoginTop').show();
                $('#sideMenuListDiv').hide();
                $('#teacherMain').show();
              }
            });



      }// 발달사항체크저장 끝부분

    }



  }

  // I-Check 클릭
  $('#box3').unbind("click").bind("click", function(){
    var whatIsBox = "box3";
    selectChildView(whatIsBox);
  });


  // var newDate = new Date();
  // var dateString = newDate.getFullYear() + " - " + (newDate.getMonth() + 1) + " - " + newDate.getDate();
  //
  // var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
  //
  // if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
  //   var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
  // } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
  //   var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
  // } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
  //   var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
  // } else{
  //   var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
  // }
  //
  // var explodeDateValue = dateValue.split("-");
  // var dateString = explodeDateValue[0] + " - " + explodeDateValue[1] + " - " + explodeDateValue[2];
  // $('#tIChSelectChildPanel').hide();


  $("#tIChSelectChildPanel").hide();
  $("#tIChChangeModePanel").hide();

  // I-Check
  var reDateValue;
  function tICheck(childID, imageName, childName, dateValue){
    reChildID = childID;
    // reDateValue = dateValue;
    allHide();
    $('#ICheck').show();
    $('#tICheckMain').show();
    $('#modeBtns').show();

    // var newDate = new Date();
    // var dateString = newDate.getFullYear() + " - " + (newDate.getMonth() + 1) + " - " + newDate.getDate();
    //
    // var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
    //
    // if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
    //   var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
    // } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
    //   var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
    // } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
    //   var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
    // } else{
    //   var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
    // }
    //
    // var explodeDateValue = dateValue.split("-");
    // var dateString = explodeDateValue[0] + " - " + explodeDateValue[1] + " - " + explodeDateValue[2];

    // 달력
    var explodeDateValue = dateValue.split("-");
    var dateString = explodeDateValue[0] + " - " + explodeDateValue[1] + " - " + explodeDateValue[2];

    $(".dateValueP").text(dateString);
    $(".datepicker").datepicker({
            buttonImage: './img/calendar.png',
            buttonImageOnly: true,
             dateFormat: 'yy - mm - dd',
            // changeMonth: true,
            changeYear: true,

            // nextText: '다음 달', // next 아이콘의 툴팁.
            // prevText: '이전 달',
            showOn: 'both',
            showButtonPanel: true,  // 달력아래 버튼 패널
            // currentText : 'Today',
            closeText:'Close',       // 버튼패널 중 닫기 텍스트 정의
            duration: "slow" ,      // 속도

            // 달력 OPEN시 위치
            beforeShow: function (input, inst) {
                setTimeout(function () {
                    inst.dpDiv.css({
                        top: 65,
                        left: 58
                        // top: 125,
                        // left: 2,
                        // width:340,
                    });
                }, 0);
            },

            // 달력에서 선택한 값을 변수에 저장
            onSelect: function(value) {
              var explodeValue = value.split(" - ");
              dateValue = explodeValue[0]+"-"+explodeValue[1]+"-"+explodeValue[2];
              reDateValue = dateValue;
                // alert('데이트피커 : '+ dateValue);

              // alert(value);


              $(".dateValueP").empty();
              $(".dateValueP").text(value);

              var valueP = $(".dateValueP").text();
              // var explodeValue = valueP.split(" - ");
              // dateValue = explodeValue[0]+"-"+explodeValue[1]+"-"+explodeValue[2];
              // alert("p태그 날짜는 : " + valueP);
              // alert("dateValue는 : " + dateValue);

              if($("#modeContents").children().hasClass("notification_div") === true){
                // alert('알림내용');
                notification(dateValue, reChildID);
              }

              if($("#modeContents").children().hasClass("developGraph_div2") === true){
                // alert('발달사항');
                developGraph(dateValue, reChildID);
              }

              if($("#modeContents").children().hasClass("significant_div") === true){
                // alert('특이사항');
                significant(dateValue);
              }
            }
    });



    // ㅁㄴㅇㄹ3
    $("#tIChSelectChild").unbind("click").bind("click", function(){
             $("#tIChSelectChildPanel").toggle("slide",{direction:"left"},350,null);

             $('#tIChSelectChildList').empty();

             // 슬라이드 원아목록에 원아리스트 불러오기
             $.ajax({
                 url:"http://japan-okyo.c9users.io/mobile/getChildrens.php",
                 // url:"http://japan-okyo.c9users.io/mobile/mTest.php",
                 data:{
                   user_num: user_num,
                   user_name : user_name
                 },
                 dataType:"jsonp",
                 success:function(data){
                     //성공
                     if(data.result == "success"){
                         var cnt = data.data.length;

                         for(var i = 0; i < cnt ; i++){
                             var childID   = data.data[i].childNum;
                             var imageName = data.data[i].imageName;
                             var childName = data.data[i].childName;
                             var imageComment = data.data[i].imageComment;

                             var imgs = $("<img />").addClass("imageNameICh imageNameICh"+childID).attr("src", "http://japan-okyo.c9users.io/img/child/"+imageName);
                             var names = $("<p></p>").addClass("childNameICh childNameICh"+childID).text(childName);
                             var namesDiv = $("<div></div>").addClass("childNameDivICh childNameDivICh"+childID).append(names);

                             $("<div></div>").addClass('selectImgAndNameICh selectImgAndNameICh'+childID).appendTo("#tIChSelectChildList");
                             $("<div></div>").addClass("imageDivICh").append(imgs).appendTo(".selectImgAndNameICh"+childID);
                             $("<div></div>").addClass("NameDivICh").append(namesDiv).appendTo(".selectImgAndNameICh"+childID);

                             (function(childID, imageName, childName){

                             $(".selectImgAndNameICh"+childID).unbind("click").bind("click",function(){

                                  if(reDateValue == undefined){
                                    // alert('원아변경 시 ' + dateValue);
                                    tICheck(childID, imageName, childName, dateValue);
                                  } else{
                                    dateValue = reDateValue;
                                    // alert('원아변경 시 ' + dateValue);
                                    tICheck(childID, imageName, childName, dateValue);
                                  }

                                 $("#tIChSelectChildPanel").toggle("slide",{direction:"left"},350,null);
                             });
                           }(childID, imageName, childName));
                         }

                         if(cnt == 0)
                             $("<p></p>").text("アップロードのイメージがありません。").appendTo("#selectImgAndName1");
                     }
                     //오류
                     else {
                         window.alert("エラーが発生しました。");
                     }



                 }, error: function(){
                     window.alert("サーバーからのエラーが発生しました。");
                 }
             });
         });

         $("#tIChSelectChildPanelCloseBtn").unbind("click").bind("click", function(){
             $("#tIChSelectChildPanel").toggle("slide",{direction:"left"},350,null);
         });
    //

    //
    $("#tIChChangeModeBtn").unbind("click").bind("click", function(){
      // var changeModePanel = $("<div></div>").addClass("changeModePanel").appendTo("#tObservation");
      // var changeModePanelCloseBtn = $("<div></div>").addClass("changeModePanelCloseBtn").appendTo(".changeModePanel");
      // $("<div></div>").addClass("tIChChangeModePanelCloseBtn").appendTo("#tIChChangeModePanel");

      $("#tIChChangeModePanel").hide("slide",{direction:"right"},350,null);
      $("#tIChChangeModePanel").toggle("slide",{direction:"right"},350,null);

      var argValues = new Array();
      argValues.push(childID);
      argValues.push(imageName);
      argValues.push(childName);
      // alert(childID);
      // alert(imageName);
      // alert(childName);
      // makeChangePanel(argValues);

        // 패널 속에서 중복으로 추가되는 것을 방지
        $("#tIChChangeModePanel").empty();

        // 패널 닫기 버튼 생성
        $("<div></div>").addClass("changeModePanelCloseBtn").appendTo("#tIChChangeModePanel");

        // 패널 닫기 버튼 이벤트 걸기
        $(".changeModePanelCloseBtn").unbind("click").bind("click", function(){
            $("#tIChChangeModePanel").toggle("slide",{direction:"right"},350,null);
        });

        // ChangeModePanel
        var changeBtn1 = $("<div></div>").addClass("changeBtn1");
        var changeBtn1Img = $("<img></img>").attr("src", "./img/memo.png").appendTo(changeBtn1);
        var changeBtn1Text = $("<p>園児 メモ 作成</p>").appendTo(changeBtn1);
        $("#tIChChangeModePanel").append(changeBtn1);
        $(".changeBtn1").unbind("click").bind("click", function(){
            allHide();
            tObservation(argValues[0], argValues[1], argValues[2]);
            $("#tIChChangeModePanel").hide("slide",{direction:"right"},350,null);
        });

        var changeBtn23Box = $("<div></div>").addClass("changeBtn23Box");
        $("#tIChChangeModePanel").append(changeBtn23Box);

        var changeBtn2 = $("<div></div>").addClass("changeBtn2").appendTo(changeBtn23Box);
        var changeBtn2Img = $("<img></img>").attr("src", "./img/hyouka.png").appendTo(changeBtn2);
        var changeBtn2Text = $("<p>授業 評価項目</p>").appendTo(changeBtn2);
        $(".changeBtn2").unbind("click").bind("click", function(){
            allHide();
            var newDate = new Date();
            var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

            if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
              var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
            } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
              var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
            } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
              var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
            } else{
              var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
            }
            developCheck(argValues[0], argValues[1], argValues[2], dateValue);
            $("#tIChChangeModePanel").hide("slide",{direction:"right"},350,null);
        });

        var changeBtn3 = $("<div></div>").addClass("changeBtn3").appendTo(changeBtn23Box);
        var changeBtn3Img = $("<img></img>").attr("src", "./img/iCheck3.png").appendTo(changeBtn3);
        var changeBtn3Text = $("<p>発育日誌</p>").appendTo(changeBtn3);
        $(".changeBtn3").unbind("click").bind("click", function(){
            allHide();
            var newDate = new Date();
            var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

            if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
              var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
            } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
              var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
            } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
              var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
            } else{
              var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
            }
            tICheck(argValues[0], argValues[1], argValues[2], dateValue);
            $("#tIChChangeModePanel").hide("slide",{direction:"right"},350,null);
        });

        var changeBtn45Box = $("<div></div>").addClass("changeBtn45Box");
        $("#tIChChangeModePanel").append(changeBtn45Box);

        var changeBtn4 = $("<div></div>").addClass("changeBtn4").appendTo(changeBtn45Box);
        var changeBtn4Img = $("<img></img>").attr("src", "./img/camera.png").appendTo(changeBtn4);
        var changeBtn4Text = $("<p>写真アップロード</p>").appendTo(changeBtn4);
        $(".changeBtn4").unbind("click").bind("click", function(){
            allHide();
            photoUpload(argValues[0], argValues[1], argValues[2]);
            $("#tIChChangeModePanel").hide("slide",{direction:"right"},350,null);
        });


        var changeBtn5 = $("<div></div>").addClass("changeBtn5").appendTo(changeBtn45Box);
        var changeBtn5Img = $("<img></img>").attr("src", "./img/album2.png").appendTo(changeBtn5);
        var changeBtn5Text = $("<p>アルバムを見る</p>").appendTo(changeBtn5);
        $(".changeBtn5").unbind("click").bind("click", function(){
            allHide();
            showAlbum(argValues[0], argValues[1], argValues[2], 1);
            $("#tIChChangeModePanel").hide("slide",{direction:"right"},350,null);
        });

    });
    //
    notification(dateValue, reChildID);
    $("#tICheck_Notification_btn2").css({
      "background-color":"#FF5E00"
    });
    $("#tICheck_DevelopGraph_btn2").css({
      "background-color":"#FFCA6C"
    });
    $("#tICheck_Significant_btn2").css({
      "background-color":"#FFCA6C"
    });


    var cnt;
    // 선택한 원아 이름, 이미지 출력

    $('#tICheck_childBox_div').empty();

    var imgs = $("<img />").attr("src","http://japan-okyo.c9users.io/img/child/"+imageName);
    var names = $("<p></p>").text(childName);

    $("<div></div>").addClass("tICheck_childBox").appendTo("#tICheck_childBox_div");
    var imgsDiv = $("<div></div>").addClass("tICheck_imgsDiv").appendTo(".tICheck_childBox");
    var namesDiv = $("<div></div>").addClass("tICheck_namesDiv").appendTo(".tICheck_childBox");
    imgsDiv.append(imgs);
    namesDiv.append(names);

    // 모드 버튼들
      // 알림내용 버튼 클릭
    $("#tICheck_Notification_btn").unbind("click").bind("click", function(){
      notification(dateValue, reChildID);
      $("#tICheck_Notification_btn2").css({
        "background-color":"#FF5E00"
      });
      $("#tICheck_DevelopGraph_btn2").css({
        "background-color":"#FFCA6C"
      });
      $("#tICheck_Significant_btn2").css({
        "background-color":"#FFCA6C"
      });
    });

      // 발달사항 버튼 클릭
    $("#tICheck_DevelopGraph_btn").unbind("click").bind("click", function(){
      developGraph(dateValue, reChildID);
      $("#tICheck_Notification_btn2").css({
        "background-color":"#FFCA6C"
      });
      $("#tICheck_DevelopGraph_btn2").css({
        "background-color":"#FF5E00"
      });
      $("#tICheck_Significant_btn2").css({
        "background-color":"#FFCA6C"
      });
    });

      // 특이사항 버튼 클릭
    $("#tICheck_Significant_btn").unbind("click").bind("click", function(){
      significant(dateValue);
      $("#tICheck_Notification_btn2").css({
        "background-color":"#FFCA6C"
      });
      $("#tICheck_DevelopGraph_btn2").css({
        "background-color":"#FFCA6C"
      });
      $("#tICheck_Significant_btn2").css({
        "background-color":"#FF5E00"
      });

    });

    //  알림내용 모드 컨텐츠 보여주기
    function notification(ReDateValue, reChildID){
      childID = reChildID;
      dateValue = ReDateValue;

      $("#modeContents").empty();

      // 댓글보기 버튼
      var showCommentsBtn = $("<div></div>").addClass("showCommentsBtn").appendTo("#modeContents");
      $("<p>コ</p>").appendTo(showCommentsBtn);
      $("<p>メ</p>").appendTo(showCommentsBtn);
      $("<p>ン</p>").appendTo(showCommentsBtn);
      $("<p>ト</p>").appendTo(showCommentsBtn);


      // 알림내용의 댓글 div
      $("<div></div>").addClass("notification_commentsDiv").appendTo("#modeContents");
      $("<div></div>").attr("id", "viewUploadedComment_div").addClass("viewUploadedComment_div").appendTo(".notification_commentsDiv");
      $("<div></div>").addClass("uploadComment_div").appendTo(".notification_commentsDiv");
      $("<p></p>").text("作成").appendTo(".uploadComment_div");
      $(".notification_commentsDiv").hide();


      // 댓글보기 버튼 클릭 시
      $(".showCommentsBtn").unbind("click").bind("click", function(){
        // 댓글창 나타내기
        // $(".notification_commentsDiv").slideUp(500);
         $(".notification_commentsDiv").slideToggle(500, showComments(childID, dateValue));

        // 알림내용의 댓글작성 버튼 클릭
        $('.uploadComment_div').unbind("click").bind("click", function(){
          var newDate = new Date();
          // var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
          //
          // if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
          //   var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
          // } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
          //   var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
          // } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
          //   var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
          // } else{
          //   var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
          // }
          var timeValue = newDate.getHours() + ":" +
                          newDate.getMinutes() + ":" +
                          newDate.getSeconds();

          var comment = prompt('コメントを入力してください.');
          // alert(dateValue);
          $.ajax({
            dataType:'jsonp',
            data: {
              childID: childID,
              user_num: user_num,
              textMemo: comment,
              dateValue: dateValue,
              timeValue: timeValue,
              memoCategory : 2, // 1 -> 알림장내용 / 2 -> 알림장의 댓글  / 3 -> 특이사항  / 4 -> 단순메모
              memoType : 1  // 1 -> 글씨  /  2 -> 그림
            },
              url:'http://japan-okyo.c9users.io/mobile/setMemo.php',
             success:function(result){
                $('.viewUploadedComment_div').empty();
               showComments(childID, dateValue);
             }, error:function(){
              //  alert('실패');
             }
          });
        });
      });

      // var showtextDiv1Btn = $("<div></div>").addClass("showtextDiv1Btn").appendTo("#modeContents");
      // $("<p>알림장</p>").appendTo(showtextDiv1Btn);
      // $(".showtextDiv1Btn").hide();
      //
      // $(".showtextDiv1Btn").unbind("click").bind("click", function(){
      //
      //   // 알림장보기 버튼 숨기고 댓글보기버튼 나타내기
      //   $(".showtextDiv1Btn").hide();
      //   $(".showCommentsBtn").show();
      //
      //
      // });


      // 텍스트메모 보기 버튼
      var showTextMemoBtn = $("<div></div>").addClass("notification_showTextMemoBtn").appendTo("#modeContents");
      $("<p></p>").text("メ").appendTo(showTextMemoBtn);
      $("<p></p>").text("モ").appendTo(showTextMemoBtn);
      $("<p></p>").text("参").appendTo(showTextMemoBtn);
      $("<p></p>").text("考").appendTo(showTextMemoBtn);

      // 텍스트메모 보기 컨텐츠
      var showTextMemoDiv = $("<div></div>").addClass("showTextMemoDiv").appendTo("#modeContents");
      var showTextMemo =  $("<div></div>").addClass("showTextMemo").appendTo(showTextMemoDiv);
      var showTextDateTitle =  $("<div></div>").addClass("showTextDateTitle").appendTo(showTextMemoDiv);
      $("<p></p>").text('メモ作成の日付: '+dateValue).appendTo(showTextDateTitle);
      var TextMemoCloseBtn = $("<div></div>").addClass("TextMemoCloseBtn").appendTo(showTextMemoDiv);
      $(".showTextMemoDiv").hide();

      // 텍스트메모 보기 버튼 클릭 이벤트
      $(".notification_showTextMemoBtn").unbind("click").bind("click", function(){
        $(".showTextMemoDiv").toggle("slide",{direction:"left"},200,null);
        var on = $("<input></input>").attr("type", "hidden").attr("value", "on").addClass("on");
        $(".showTextMemo").empty();

        $(".showTextMemo").append(on);
        $.ajax({
          dataType:"jsonp",
          data:{
            childID: childID,
            user_num: user_num,
            user_name: user_name,
            dateValue: dateValue,
            memoCategory : 4, // 1 -> 알림장내용 / 2 -> 알림장의 댓글  / 3 -> 특이사항  / 4 -> 단순메모
            memoType : 1  // 1 -> 글씨  /  2 -> 그림

          },
          url:'http://japan-okyo.c9users.io/mobile/getMemo.php',
          success:function(data){

            var cnt = data.data.length;

            for(var i = 0; i < cnt; i++){
              var id        = data.data[i].memoId;
              var textValue = data.data[i].comment;

              var textMemo = $("<p></p>").text(textValue).addClass("textMemo"+id);
              $(".showTextMemo").append(textMemo);


              (function(id){
                  $('.savedTextMemos'+id).unbind("click").bind("click",function(){
                    // deleteUploadedTexts(id, childID);  // 오늘 작성하나 메모 클릭시 삭제
                  });
              }(id));

            }
          },
          error:function(){
            alert('サーバーからのエラーが発生しました。');
          }
        });
      });

      // 텍스트메모 닫기 클릭 이벤트
      $(".TextMemoCloseBtn").unbind("click").bind("click", function(){
        $(".showTextMemoDiv").toggle("slide",{direction:"left"},200,null);
        $(".showTextMemo").empty();
      });



      // 이미지메모 보기 버튼
      var showImageMemoBtn = $("<div></div>").addClass("notification_showImageMemoBtn").appendTo("#modeContents");
      $("<p></p>").text("絵").appendTo(showImageMemoBtn);
      $("<p></p>").text("の").appendTo(showImageMemoBtn);
      $("<p></p>").text("メ").appendTo(showImageMemoBtn);
      $("<p></p>").text("モ").appendTo(showImageMemoBtn);

      // 이미지메모 보기 컨텐츠
      var showImageMemoDiv = $("<div></div>").addClass("showImageMemoDiv").appendTo("#modeContents");
      var showImageMemo =  $("<div></div>").addClass("showImageMemo").appendTo(showImageMemoDiv);
      var showImageDateTitle =  $("<div></div>").addClass("showImageDateTitle").appendTo(showImageMemoDiv);
      $("<p></p>").text('メモ作成の日付: '+dateValue).appendTo(showImageDateTitle);
      var ImageMemoCloseBtn = $("<div></div>").addClass("ImageMemoCloseBtn").appendTo(showImageMemoDiv);
      $(".showImageMemoDiv").hide();

      // 이미지메모 보기 버튼 클릭 이벤트
      $(".notification_showImageMemoBtn").unbind("click").bind("click", function(){
        $(".showImageMemoDiv").toggle("slide",{direction:"left"},200,null);
        var on = $("<input></input>").attr("type", "hidden").attr("value", "on").addClass("on");
        $(".showImageMemo").empty();


        $(".showImageMemo").append(on);
        $.ajax({
          dataType:"jsonp",
          data:{
            childID: childID,
            user_num: user_num,
            dateValue: dateValue,
            memoCategory: 4,  // 1 -> 알림장내용 / 2 -> 알림장의 댓글  / 3 -> 특이사항  / 4 -> 단순메모
            memoType : 2
          },
          url:'http://japan-okyo.c9users.io/mobile/getMemo.php',
          success:function(data){

            var cnt = data.data.length;

            for(var i = 0; i < cnt ; i++){

                var id        = data.data[i].id;
                var imageName = data.data[i].imageName;
                var imgPath = data.data[i].imgPath;

                var imgs = $("<img />").attr("src","http://japan-okyo.c9users.io"+imgPath+imageName);
                // var imgsDiv = $("<div></div>").addClass("uploadedImgDiv").append(imags);
                $("<div></div>").addClass("imageMemo"+id).append(imgs).appendTo(".showImageMemo");

                (function(id, childId, imgPath, imageName){
                  $(".imageMemo"+id).unbind("click").bind("click",function(){
                    // deleteUploadedImages(id, childID, path, imageName);  // 클릭한 사진 지우기
                  });
                }(id, childID, imgPath, imageName));
            }
          }, error:function(){

          }
        });

        // $(".notification_showTextMemoBtn").toggle("slide",{direction:"left"},200,null);
      });

      // 이미지메모 닫기 클릭 이벤트
      $(".ImageMemoCloseBtn").unbind("click").bind("click", function(){
        $(".showImageMemoDiv").toggle("slide",{direction:"left"},200,null);
        $(".showImageMemo").empty();

        // $(".notification_showTextMemoBtn").toggle("slide",{direction:"left"},200,null);
      });


      // 앨범추가 보기 버튼
      var showAddAlbumBtn = $("<div></div>").addClass("notification_showAddAlbumBtn").appendTo("#modeContents");
      $("<p></p>").text("写").appendTo(showAddAlbumBtn);
      $("<p></p>").text("真").appendTo(showAddAlbumBtn);
      $("<p></p>").text("登").appendTo(showAddAlbumBtn);
      $("<p></p>").text("録").appendTo(showAddAlbumBtn);

      // 앨범추가 보기 컨텐츠
      var showAddAlbumDiv = $("<div></div>").addClass("showAddAlbumDiv").appendTo("#modeContents");
      var showAddAlbum =  $("<div></div>").addClass("showAddAlbum").appendTo(showAddAlbumDiv);
      var showImageDateTitle =  $("<div></div>").addClass("showImageDateTitle").appendTo(showAddAlbumDiv);
      // $("<p></p>").text('写真撮影の日付 : '+dateValue).appendTo(showImageDateTitle);
      var AddAlbumCloseBtn = $("<div></div>").addClass("AddAlbumCloseBtn").appendTo(showAddAlbumDiv);
      $(".showAddAlbumDiv").hide();

      // 앨범추가 보기 버튼 클릭 이벤트
      $(".notification_showAddAlbumBtn").unbind("click").bind("click", function(){
        $(".showAddAlbumDiv").toggle("slide",{direction:"left"},200,null);
        var on = $("<input></input>").attr("type", "hidden").attr("value", "on").addClass("on");
        $(".showAddAlbum").empty();


        $(".showAddAlbum").append(on);


        $.ajax({
          dataType:"jsonp",
          data:{
            childID: childID,
          },
          url:'http://japan-okyo.c9users.io/mobile/viewPhoto.php',
          success:function(data){

            var cnt = data.data.length;

            for(var i = 0; i < cnt ; i++){

              var photoId   = data.data[i].id;
              var photoName = data.data[i].photoName;
              var registDay = data.data[i].registDay;
              var photoMemo = data.data[i].photoMemo;

                var imgs    = $("<img />").attr("src", "http://japan-okyo.c9users.io/img/album/childID_"+childID+"/"+photoName).addClass("addAlbumID"+photoId);
                // var imgsDiv = $("<div></div>").addClass("uploadedImgDiv").append(imags);
                $("<div></div>").addClass("AddAlbum"+photoId).append(imgs).appendTo(".showAddAlbum");

                var imageCount = 0;
                (function(photoId, childId, photoName, i){

                  $(".AddAlbum"+photoId).unbind("click").bind("click",function(){

                    // if($(".notification_imageDiv2").children().hasClass("notification_addedImg") == true){
                    //   alert('사진추가는 한장만.');
                    // } else{
                    var img = $("<img />").attr("src", "http://japan-okyo.c9users.io/img/album/childID_"+childID+"/"+photoName).attr("value", photoName).addClass("notification_imageDiv2Img notification_imageDiv2Img"+i);
                    // var hiddenPhotoName = $("<input></input>").attr("type", "hidden").attr("value", photoName);

                    // alert("등록되는 i값 : "+i);    // 중복되는 사진이면 i값이 똑같이 나온다.

                    // 등록하려는 사진 갯수
                    var imageCount = $(".notification_imageDiv2").children().length;

                    // 중복되는 사진 못올리도록 막기
                    if(imageCount > 0){

                        var flag;

                        for(var j = 0; j < imageCount; j++){
                          var test = $(".notification_imageDiv2").children().eq(j).attr('src');
                          if(img.attr('src') == test){
                            // alert('중복 이미지');
                            flag = "stop";
                            // alert('잡음');
                            break;
                          } else{
                            flag = "go";
                            // alert('일단 통과');
                          }
                        }

                        if(flag == "go"){
                          // alert('모두 통과, 업로드 Yes');
                            $(".notification_imageDiv2").append(img);
                            $(".notification_imageDiv2").children().unbind("click").bind("click", function(){
                              var value = $(this).attr('value');
                              // alert(value);
                              // 사진클릭 시 제거
                              var YesOrNo = confirm("登録を 中止しますか");

                              if(YesOrNo){
                                $(this).remove();
                              } else{
                              }
                            });

                        } else{
                          // alert('최종 잡음, 업로드 No');
                        }

                    }else{
                      // alert('첫번째 사진은 바로 업로드');
                      $(".notification_imageDiv2").append(img);
                      $(".notification_imageDiv2").children().unbind("click").bind("click", function(){
                        var value = $(this).attr('value');
                        alert(value);
                        // 사진클릭 시 제거
                        var YesOrNo = confirm("登録を 中止しますか");

                        if(YesOrNo){
                          $(this).remove();
                        } else{
                        }
                      });
                    }

                    // }
                    // 사진 클릭한 다음에는 앨범보기 창 숨기기
                    $(".showAddAlbumDiv").toggle("slide",{direction:"left"},200,null);
                    $(".showAddAlbum").empty();

                  });
                }(photoId, childID, photoName, i));
            }
          }, error:function(){

          }
        });

        // $(".notification_showTextMemoBtn").toggle("slide",{direction:"left"},200,null);
      });

      // 앨범추가 닫기 클릭 이벤트
      $(".AddAlbumCloseBtn").unbind("click").bind("click", function(){
        $(".showAddAlbumDiv").toggle("slide",{direction:"left"},200,null);
        $(".showAddAlbum").empty();

        // $(".notification_showTextMemoBtn").toggle("slide",{direction:"left"},200,null);
      });

      $(".notification_showTextMemoBtn").hide();
      $(".notification_showImageMemoBtn").hide();
      $(".notification_showAddAlbumBtn").hide();



      // 알림내용 div
      var ndTitle = $("<div></div>").addClass("notification_divTitle").appendTo("#modeContents");
      ndTitle.append("<p>発育日誌お知らせ</p>");
      $("<div></div>").addClass("notification_div").appendTo("#modeContents");

      $.ajax({
        dataType:"jsonp",
        data:{
          childID: childID,
          user_num: user_num,
          dateValue: dateValue,
          memoCategory : 1,      // 1 -> 알림장내용 / 2 -> 알림장의 댓글  / 3 -> 특이사항  / 4 -> 단순메모
          memoType : 1  // 1 -> 글씨  /  2 -> 그림
          },
          url:'http://japan-okyo.c9users.io/mobile/getMemo.php',
        success:function(data){
          $(".notification_div").show();
          $(".notification_imageDiv1").show();
          $(".notification_textDiv1").show();

          var title = data.data0;
          if(title === null){
            title = "";
          }
          var cnt1 = data.data1.length;   // 알림장내용 있는지 판별
          var cnt2 = data.data2.length;

          ///////

            var commentIndex = data.data1.length;



            commentIndex = commentIndex - 1;
          //////


          // $("<div></div>").addClass("notification_imageDiv1").appendTo(".notification_div");
          // 알림장 내용, 알림장 사진  이 없음
          if(cnt1 < 1 && cnt2 < 1){
                  // 알림장보기 사진들어갈 공간
                  $("<div></div>").addClass("notification_imageDiv1").appendTo(".notification_div");
                  $("<img />").attr("src", "./img/noImg.png").addClass("notification_noImageDiv1Img").appendTo(".notification_imageDiv1");

                  // 알림장보기 제목들어갈 공간
                  $("<div></div>").addClass("notification_textTitleDiv1").appendTo(".notification_div");
                  $("<pre></pre>").text(title).addClass("notification_pre").appendTo(".notification_textTitleDiv1");


                  // 알림장보기 글씨들어갈 공간
                  $("<div></div>").addClass("notification_textDiv1").appendTo(".notification_div");
                  // $("<pre></pre>").text('알림장 작성란').addClass("notification_pre").appendTo(".notification_textDiv1");
                  $("<pre></pre>").addClass("notification_pre").appendTo(".notification_textDiv1");
                  // 알림장 작성버튼
                  $("<div></div>").addClass("notification_createBtn").appendTo(".notification_div");
                  $("<p>作成</p>").appendTo(".notification_createBtn");



          // 알림장 내용은 없는데, 사진은 있음
          } else if(cnt1 < 1 && cnt2 > 0){

                  // 알림장보기 제목들어갈 공간
                  $("<div></div>").addClass("notification_textTitleDiv1").appendTo(".notification_div");
                  $("<pre></pre>").text(title).addClass("notification_pre").appendTo(".notification_textTitleDiv1");

                  for(var i = 0; i < cnt2; i++){
                    // 알림장보기 사진들어갈 공간
                    $("<div></div>").addClass("notification_imageDiv1").appendTo(".notification_div");
                    var img = $("<img />").attr("value", data.data2[i].photoName).attr("src", "http://japan-okyo.c9users.io/img/album/childID_"+childID+"/"+data.data2[i].photoName).addClass("notification_imageDiv1Img notification_imageDiv1Img_"+i);
                    $(".notification_imageDiv1").append(img);
                  }
                  // 알림장보기 글씨들어갈 공간
                  $("<div></div>").addClass("notification_textDiv1").appendTo(".notification_div");
                  $("<pre></pre>").addClass("notification_pre").appendTo(".notification_textDiv1");
                  // 알림장 작성버튼
                  $("<div></div>").addClass("notification_createBtn").appendTo(".notification_div");
                  $("<p>作成</p>").appendTo(".notification_createBtn");




          // 알림장 내용은 있는데, 사진은 없음
          } else if(cnt1 > 0 && cnt2 < 1){

                  // 알림장보기 제목들어갈 공간
                  $("<div></div>").addClass("notification_textTitleDiv1").appendTo(".notification_div");
                  $("<pre></pre>").text(title).addClass("notification_pre").appendTo(".notification_textTitleDiv1");

                  // 알림장보기 사진들어갈 공간
                  $("<div></div>").addClass("notification_imageDiv1").appendTo(".notification_div");
                  $("<img />").attr("src", "./img/noImg.png").addClass("notification_noImageDiv1Img").appendTo(".notification_imageDiv1");

                  // 알림장보기 글씨들어갈 공간
                  $("<div></div>").addClass("notification_textDiv1").appendTo(".notification_div");
                  // $("<pre></pre>").text(data.data1[commentIndex].comment).addClass("notification_pre").appendTo(".notification_textDiv1");
                  $("<div>"+data.data1[commentIndex].comment+"</div>").addClass("notification_pre").appendTo(".notification_textDiv1");


                  // 알림장 작성버튼
                  $("<div></div>").addClass("notification_createBtn").appendTo(".notification_div");
                  $("<p>作成</p>").appendTo(".notification_createBtn");



          // 알림장 내용, 사진 둘다 있음
          } else if(cnt1 > 0 && cnt2 > 0){
                // 알림장보기 제목들어갈 공간
                $("<div></div>").addClass("notification_textTitleDiv1").appendTo(".notification_div");
                $("<pre></pre>").text(title).addClass("notification_pre").appendTo(".notification_textTitleDiv1");

                for(var i = 0; i < cnt2; i++){
                  // 알림장보기 사진들어갈 공간
                  // alert("사진이름 : "+data.data2[i].photoName);
                  // var img = $("<img />").attr("src", "http://japan-okyo.c9users.io/img/album/childID_"+childID+"/"+data.data2[i].photoName).addClass("notification_imageDiv1Img notification_imageDiv1Img_"+i);
                  $("<div></div>").addClass("notification_imageDiv1").appendTo(".notification_div");
                  var img = $("<img />").attr("value", data.data2[i].photoName).attr("src", "http://japan-okyo.c9users.io/img/album/childID_"+childID+"/"+data.data2[i].photoName).addClass("notification_imageDiv1Img notification_imageDiv1Img_"+i);
                  $(".notification_imageDiv1").append(img);
                }


                // 알림장보기 글씨들어갈 공간
                $("<div></div>").addClass("notification_textDiv1").appendTo(".notification_div");
                // $("<pre></pre>").text(data.data1[commentIndex].comment).addClass("notification_pre").appendTo(".notification_textDiv1");
                $("<div>"+data.data1[commentIndex].comment+"</div>").addClass("notification_pre").appendTo(".notification_textDiv1");


                // 알림장 작성버튼
                $("<div></div>").addClass("notification_createBtn").appendTo(".notification_div");
                $("<p>作成</p>").appendTo(".notification_createBtn");
              }


              // 작성버튼 클릭할 시.
              $(".notification_createBtn").unbind("click").bind("click", function(){

                // 작성된 알림장에 사진이 등록되어 있는지 아닌지 판단하기
                // 사진이 없을 경우 아무것도 하지 않음
                if($(".notification_imageDiv1").children().hasClass("notification_noImageDiv1Img") == true){

                }
                // 사진이 있을 경우 사진을 가져옴
                else{

                  var imgCount = $(".notification_imageDiv1").children().length;
                  // alert("등록한 사진 갯수 "+imgCount);

                  for(var i = 0; i < imgCount; i++){
                    // alert(i);

                    //    notification_imageDiv1Img notification_imageDiv1Img_0
                    var imgSrc = $(".notification_imageDiv1Img_"+i).attr("src");
                    var imgValue = $(".notification_imageDiv1Img_"+i).attr("value");

                    // alert(imgValue);

                    var imgs = $("<img />").attr("value", imgValue).attr("src", imgSrc).addClass("notification_imageDiv2Img notification_imageDiv2Img"+i);
                    $(".notification_imageDiv2").append(imgs);



                    $(".notification_imageDiv2").children().unbind("click").bind("click", function(){
                      // var value = $(this).attr('value');
                      // alert(value);
                      // 사진클릭 시 제거
                        var YesOrNo = confirm("登録をキャンセルしますか。");

                        if(YesOrNo){
                          $(this).remove();
                        } else{
                        }
                    });
                  }
                }


                textTitle = $(".notification_textTitleDiv1").text();
                textMemo = $(".notification_textDiv1").text();

                // 댓글보기버튼 숨기기
                $(".showCommentsBtn").hide();

                // 좌측 버튼들 소환
                $(".notification_showTextMemoBtn").show();
                $(".notification_showImageMemoBtn").show();
                $(".notification_showAddAlbumBtn").show();

                $(".notification_textTitleDiv1").hide();
                $(".notification_textDiv1").hide();
                $(".notification_imageDiv1").hide();

                $(".notification_textTitleDiv2").show();
                $(".notification_textDiv2").show();
                $(".notification_imageDiv2").show();

                $(".notification_saveCancelBtnDiv").show();
                $(".notification_cancelBtn").show();
                $(".notification_saveBtn").show();
                $(".notification_createBtn").hide();

                $(".notification_textDiv1").empty();


                $("<textarea></textarea>").text(textTitle).attr("wrap", "hard").addClass("notification_textTitlearea").appendTo(".notification_textDiv2");

                // if($(".notification_textDiv2").children().hasClass("notification_textarea")){
                //
                // } else{
                  $("<textarea></textarea>").text(textMemo).attr("wrap", "hard").addClass("notification_textarea").appendTo(".notification_textDiv2");
                // }



                //////////  ㅂㅈㄷㄱ
                // (function(i){
                //   $(".notification_imageDiv2Img"+i).unbind("click").bind("click", function(){
                //     alert(i + "번째 사진");
                //   });
                //
                // }(i));

                //////////
              });


        },
        error:function(){
          alert('サーバーからのエラーが発生しました。');
        }

      })

      // 알림장작성 사진들어갈 공간
      $("<div></div>").addClass("notification_imageDiv2").appendTo(".notification_div");
      // 알림장작성 글씨들어갈 공간
      $("<div></div>").addClass("notification_textDiv2").appendTo(".notification_div");


      // 처음엔 보기  를 보여주고
      $(".notification_textDiv1").show();
      $(".notification_imageDiv1").show();

      // 작성을 숨긴다
      $(".notification_textDiv2").hide();
      $(".notification_imageDiv2").hide();
      $(".notification_titleDiv2").hide();



      // // 알림장 작성버튼
      // $("<div></div>").addClass("notification_createBtn").appendTo(".notification_div");
      // $("<p>作成</p>").appendTo(".notification_createBtn");


      // 알림장 저장, 취소버튼 담을 div
      $("<div></div>").addClass("notification_saveCancelBtnDiv").appendTo(".notification_div");
      $(".notification_saveCancelBtnDiv").hide();

      // 알림장 저장, 취소버튼
      $("<div></div>").addClass("notification_cancelBtn").appendTo(".notification_saveCancelBtnDiv");
      $("<p>Cancel</p>").appendTo(".notification_cancelBtn");
      $(".notification_cancelBtn").hide();

      $("<div></div>").addClass("notification_saveBtn").appendTo(".notification_saveCancelBtnDiv");
      $("<p>Save</p>").appendTo(".notification_saveBtn");
      $(".notification_saveBtn").hide();


      var textMemo;   // 테스트용 알림장 내용 왔다갔다 하기 변수
      // 작성버튼 클릭할 시.
      $(".notification_createBtn").unbind("click").bind("click", function(){

        textTitleMemo = $(".notification_textTitleDiv1").text();
        textMemo = $(".notification_textDiv1").text();

        // 댓글보기버튼 숨기기
        $(".showCommentsBtn").hide();

        // 좌측 버튼들 소환
        $(".notification_showTextMemoBtn").show();
        $(".notification_showImageMemoBtn").show();
        $(".notification_showAddAlbumBtn").show();

        $(".notification_textTitleDiv1").hide();
        $(".notification_imageDiv1").hide();
        $(".notification_textDiv1").hide();


        $(".notification_textTitleDiv2").show();
        $(".notification_textDiv2").show();
        $(".notification_imageDiv2").show();


        $(".notification_saveCancelBtnDiv").show();
        $(".notification_cancelBtn").show();
        $(".notification_saveBtn").show();
        $(".notification_createBtn").hide();

        $(".notification_textDiv1").empty();


        // $(".notification_textDiv2").empty();



        // if($(".notification_textDiv2").children().hasClass("notification_textarea")){
        //
        // } else{
          $("<textarea></textarea>").text(textMemo).attr("wrap", "hard").addClass("notification_textTitlearea").appendTo(".notification_textDiv2");
          $("<textarea></textarea>").text(textMemo).attr("wrap", "hard").addClass("notification_textarea").appendTo(".notification_textDiv2");
        // }


        // $("<textarea></textarea>").text(textMemo).attr("wrap", "hard").addClass("notification_textTitlearea").appendTo(".notification_textDiv2");
        // $("<textarea></textarea>").text(textMemo).attr("wrap", "hard").addClass("notification_textarea").appendTo(".notification_textDiv2");

        // $(".notification_imageDiv2").unbind("click").bind("click", function(){
        //
        //   // 사진이 들어있을 때만 클릭 시 삭제확인 메시지 출력
        //   if($(".notification_imageDiv2").children().hasClass("notification_imageDiv2Img")){
        //     var YesOrNo = confirm("사진을 삭제하시겠습니까?2");
        //   }
        //     if(YesOrNo){
        //       $(".notification_imageDiv2").empty();
        //     } else{
        //     }
        // });
      });


      // 저장버튼 클릭 시
      $(".notification_saveBtn").unbind("click").bind("click", function(){

        var textMemo = $(".notification_textarea").val();
        var textTitleMemo = $(".notification_textTitlearea").val();
        if(textMemo == ""){
          alert('発育日誌の内容を作成してください。');
        } else{
          // alert(textMemo);
          // 댓글보기 버튼 나타내기
          $(".showCommentsBtn").show();



          // alert('이렇게 디비에 저장하면서 저장한것 불러오기 하면 될 것 같음');
          $(".notification_showTextMemoBtn").hide();
          $(".notification_showImageMemoBtn").hide();
          $(".notification_showAddAlbumBtn").hide();

          $(".notification_textDiv1").show();
          $(".notification_imageDiv1").show();

          $(".notification_textDiv2").hide();
          $(".notification_imageDiv2").hide();

          $(".notification_createBtn").show();
          $(".notification_saveCancelBtnDiv").hide();
          $(".notification_saveBtn").hide();
          $(".notification_cancelBtn").hide();

          // $("<pre></pre>").text(text).addClass("notification_pre").appendTo(".notification_textDiv1");



          // $(".notification_textDiv2").empty();

          var getDiv2ImgSrc = $(".notification_imageDiv2").find('img').attr('src');
          // alert(childID);
          // $(".notification_imageDiv1Img").attr("src", getDiv2ImgSrc);


          // 사진 추가한 갯수
          var imgCount = $(".notification_imageDiv2").children().length;

          // alert('사진 추가한 갯수 : '+imgCount);

          // 사진 여러개일 경우를 대비해서 사진이름들을 담을 배열 정의
          var photoNamesArray = new Array();

          // 작성 된 알림장에 사진이 등록되어 있었는지 없었는지 판별  // 안해도 되는 듯하다.
          // if($(".notification_imageDiv1").children().hasClass("notification_noImageDiv1Img")){
          //   // alert('기존은 사진등록 안된 알림장');
          //
          // } else{
          //   // alert('기존 사진있는 알림장');
          //
          // }

          for(var i = 0; i < imgCount; i++){
            // var imgSrc = $(".notification_imageDiv2Img_"+i).attr('src');
            // var imgNameValue = $(".notification_imageDiv2Img_"+i).attr('src');
            $(".notification_imageDiv1").empty();
            var imgNameValue = $(".notification_imageDiv2").children().eq(i).attr('value');

            photoNamesArray.push(imgNameValue);
            // alert('포토네임배열 길이 : ' + photoNamesArray.length);
            // 자바스크립트에서의 ~.split == php의 explode 와 같은 기능
            // var splitValue = "childID_"+childID+"/";
            // if(imgSrc == undefined){
            //   alert('언디파인드');
            //
            //
            //
            // } else{
            //   alert('값넣음');
            //   var photoSrcSplit = imgSrc.split("childID"+childID+"/");
            //   photoNamesArray.push(photoSrcSplit[1]);
            // }
          }

          // alert("(저장버튼눌렀음) 이미지명은 : "+photoNamesArray);
          //
          // var testC = photoNamesArray.length;
          // alert("길이 : " + testC);

          // if(photoNamesArray == ""){
          //   alert('이미지없음');
          // }

          // alert("보낼 날짜값 : "+dateValue);
          $.ajax({
              dataType:"jsonp",
              data:{
                childID: childID,
                user_num: user_num,
                textTitleMemo: textTitleMemo,
                textMemo: textMemo,
                photoNamesArray: photoNamesArray,
                dateValue: dateValue,
                memoCategory : 1,      // 1 -> 알림장내용 / 2 -> 알림장의 댓글  / 3 -> 특이사항  / 4 -> 단순메모
                memoType : 1  // 1 -> 글씨  /  2 -> 그림
              },
              url:'http://japan-okyo.c9users.io/mobile/setMemo.php',
              success:function(data){

                notificationReload(dateValue);
                alert('発育日誌を作成しました。');

              },
              error:function(){
                alert('サーバーからのエラーが発生しました。');
              }
          });


        }
      });


      // 취소버튼 클릭 시
      $(".notification_cancelBtn").unbind("click").bind("click", function(){
        notification(dateValue, reChildID);
      });


    }
    function notificationReload(dateValue){
      notification(dateValue, reChildID);
    }

    //  발달그래프 모드 컨텐츠 보여주기
    function developGraph(dateValue, reChildID){
      childID = reChildID;
      $("#modeContents").empty();
      $("<div></div>").addClass("developGraph_div1").appendTo("#modeContents");
      $("<div></div>").addClass("developGraph_div2").appendTo("#modeContents");
      $("<p></p>").text('授業 評価項目').appendTo(".developGraph_div1").addClass("developGraphTitleText");


      var explodeValue = dateValue.split("-");


      developValueYear = explodeValue[0];
      developValueMonth = explodeValue[1];
      developValueDay = explodeValue[2];

      switch (developValueMonth) {
        case "01":
        developValueMonthText = "jan";
          break;
        case "02":
        developValueMonthText = "feb";
          break;
        case "03":
        developValueMonthText = "mar";
          break;
        case "04":
        developValueMonthText = "apr";
          break;
        case "05":
        developValueMonthText = "may";
          break;
        case "06":
        developValueMonthText = "jun";
          break;
        case "07":
        developValueMonthText = "jul";
          break;
        case "08":
        developValueMonthText = "aug";
          break;
        case "09":
        developValueMonthText = "sep";
          break;
        case "10":
        developValueMonthText = "oct";
          break;
        case "11":
        developValueMonthText = "nov";
          break;
        case "12":
        developValueMonthText = "dec";
          break;
        default:

      }



      $.ajax({
        dataType:"jsonp",
        data:{
          childID: childID,
          user_num: user_num,
          dateValue: dateValue,
          developValueYear: developValueYear,
          developValueMonthText: developValueMonthText,
          developValueDay: developValueDay,
          position: "teacher"
        },

        url:"http://japan-okyo.c9users.io/mobile/getAssessed.php",
        success:function(data){

          // 쿼리결과 행 갯수
          var cnt1 = data.data1.length;
          var cnt2 = data.data2.length;


          $(".valueGraphDiv1").empty();
          $(".valueGraphDiv2").empty();
          valueGraphDiv1Open();

          // 평가그래프 보기 버튼
          var valueGraphDiv1Btn = $("<div></div>").addClass("valueGraphDiv1Btn").appendTo("#modeContents");
          $("<p></p>").text('評').appendTo(valueGraphDiv1Btn);
          $("<p></p>").text('価').appendTo(valueGraphDiv1Btn);
          $("<p></p>").text('グ').appendTo(valueGraphDiv1Btn);
          $("<p></p>").text('ラ').appendTo(valueGraphDiv1Btn);
          $("<p></p>").text('フ').appendTo(valueGraphDiv1Btn);


          // 평가그래프 보기 버튼 클릭 시
          $(".valueGraphDiv1Btn").unbind("click").bind("click", function(){
            valueGraphDiv1Open();
            $(".valueGraphDiv1").show();
            $(".valueGraphDiv2").hide();
            $(".valueGraphDiv1Btn").css({"background-color":"#FFBB00"});
            $(".valueGraphDiv2Btn").css({"background-color":"#FFE08C"});
            $(".developGraphTitleText").text('授業 評価項目');
          });

          // 상태그래프 보기 버튼
          var valueGraphDiv2Btn = $("<div></div>").addClass("valueGraphDiv2Btn").appendTo("#modeContents");
          $("<p></p>").text('状').appendTo(valueGraphDiv2Btn);
          $("<p></p>").text('態').appendTo(valueGraphDiv2Btn);
          $("<p></p>").text('グ').appendTo(valueGraphDiv2Btn);
          $("<p></p>").text('ラ').appendTo(valueGraphDiv2Btn);
          $("<p></p>").text('フ').appendTo(valueGraphDiv2Btn);

          // 상태그래프 보기 버튼 클릭 시
          $(".valueGraphDiv2Btn").unbind("click").bind("click", function(){
            $(".valueGraphDiv1").hide();
            valueGraphDiv2Open();
            $(".valueGraphDiv2").show();
            $(".valueGraphDiv1Btn").css({"background-color":"#FFE08C"});
            $(".valueGraphDiv2Btn").css({"background-color":"#FFBB00"});
            $(".developGraphTitleText").text('状態グラフ');
          });



          // 항목체크 그래프 담을 div
          function valueGraphDiv1Open(){
            $(".developGraph_div2").empty();
            var valueGraphDiv1 = $("<div></div>").addClass("valueGraphDiv1").appendTo(".developGraph_div2");
              if(cnt1 > 0){

                  for(var i = 0; i < cnt1; i++){
                    // 그래프막대
                    var developValueDiv = $("<div></div>").addClass("developValueDiv").progressbar({ value: data.data1[i].score * 20}).appendTo(".valueGraphDiv1");
                    // // 그래프 라벨
                    var valueLavel = $("<div></div>").addClass("progress-label").appendTo(developValueDiv);
                    var valuePre = $("<pre></pre>").addClass("progress-pre").text(data.data1[i].assContent).appendTo(valueLavel);
                  }
              } else{
                var noCheckMessage = $("<div></div>").text('今日はチェックをしませんでした。');
                $(".valueGraphDiv1").append(noCheckMessage);
              }
          }


          // 상태 그래프 담을 div
          function valueGraphDiv2Open(){
            $(".developGraph_div2").empty();
            var valueGraphDiv2 = $("<div></div>").addClass("valueGraphDiv2").appendTo(".developGraph_div2");
              if(cnt2 > 0){
                $("<canvas></canvas>").attr("id", "myChart").appendTo(valueGraphDiv2);
                  var ctx = document.getElementById("myChart");
                  var myChart = new Chart(ctx, {
                        type: 'radar',
                        data: {

                            labels: ["気分", "健康", "体温", "食事"],
                            datasets: [{
                                label: '# of Votes',
                                data: [data.data2[0].feels, data.data2[0].health, data.data2[0].temperature, data.data2[0].meals],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255,99,132,1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 2,
                                pointRadius: 6,
                                pointBorderWidth: 3,
                                pointBackgroundColor: "orange",
                                pointBorderColor: "rgba(200,0,0,0.6)",
                                pointHoverRadius: 10,

                            }],
                        },
                        options:{
                          scale: {
                            ticks: {
                              beginAtZero: false,
                              min: 0,
                              max: 4,
                              stepSize: 5,
                            },
                            pointLabels: {
                              fontSize: 15
                            }
                          },
                          legend: {
                            position: 'none',
                          },
                        }
                    });
              } else{
                var noCheckMessage = $("<div></div>").text('今日はチェックをしませんでした。');
                $(".valueGraphDiv2").append(noCheckMessage);
              }



          }




        }, error:function(){
          alert("サーバーからのエラーが発生しました。");
        }

      });



    }





    // 특이사항 모드 컨텐츠 보여주기
    function significant(dateValue){
      $("#modeContents").empty();
      $("<div></div>").addClass("significant_divTitle").appendTo("#modeContents");
      $("<div></div>").addClass("significant_div").appendTo("#modeContents");



    }

    // 댓글보기 함수
    function showComments(childID, dateValue){
      $.ajax({
        url:'http://japan-okyo.c9users.io/mobile/getMemo.php',
        data:{
          childID:childID,
          user_num: user_num,
          dateValue:dateValue,
          memoCategory : 2,      // 1 -> 알림장내용 / 2 -> 알림장의 댓글  / 3 -> 특이사항  / 4 -> 단순메모
          memoType : 1  // 1 -> 글씨  /  2 -> 그림
        },
        dataType:"jsonp",
          success:function(data){

            var cnt = data.data.length;
            $(".viewUploadedComment_div").empty();
            for(var i = 0; i < cnt; i++){
              // 댓글 입력한 것이 교사라면.
              if(data.data[i].position == 2){

                var teacherCommentBox = $("<div></div>").addClass("teacherCommentBox");
                $("<div></div>").addClass("teacherTrue1").text("教師").appendTo(teacherCommentBox);
                $("<p></p>").text(data.data[i].comment).appendTo(teacherCommentBox);
                teacherCommentBox.appendTo(".viewUploadedComment_div");
              }
              // 댓글 입력한 것이 교사가 아니라면.
              else {
                var parentCommentBox = $("<div></div>").addClass("parentCommentBox");
                $("<div></div>").addClass("teacherTrue0").text("保護者").appendTo(parentCommentBox);
                $("<p></p>").text(data.data[i].comment).appendTo(parentCommentBox);
                parentCommentBox.appendTo(".viewUploadedComment_div");
              }

              // $("<p></p>").text(data.data[i].comment).appendTo(".viewUploadedComment_div");

            }

            // 댓글창 스크롤 가장 아래로 내리기
            document.getElementById('viewUploadedComment_div').scrollTop = document.getElementById('viewUploadedComment_div').scrollHeight;

        },error:function(){
          alert('サーバーからのエラーが発生しました。');
        }
      });

    }



    // 뒤로 돌아가기 버튼
    $('#backTurnBtn').unbind("click").bind("click", function(){
      var whatIsBox = "box3";
      selectChildView(whatIsBox);
    });

  }

  // I-Check 끝


  // i-Care (구 원아지킴이) 클릭
  $("#box4").unbind("click").bind("click", function(){
    var whatIsBox = "box4";
    selectChildView(whatIsBox);
  });

  // i-Care (구 원아지킴이)
     function iCare(){        // js, css 다하면 주석 풀어야됨
        $("#iCare").show();
        $("#iCareBody").show();

        $("#backgroundPannel").hide();
        $("#iCareModePannel").hide();

        // mapFlag가 있는가  (GPS모드인가?);
        // if($("#mapInfo").children().hasClass("mapFlagOn")){
        //   $("#mapInfo").show();
        // } else{
        //   $("#mapInfo").hide();
        // }


        $("#alarm_range_BLE").hide();
        $("#alarm_range_GPS").show();


        if($("#mapInfo").children().hasClass("mapFlagOn")){
          // var mapFlag = $("<input></input>").attr("type","hidden").addClass("mapFlag").appendTo("#mapInfo");
          $("#mapInfo").show();
          $("#alarm_range_BLE").hide();
          $("#alarm_range_GPS").show();
          $(".mapFlagOn").remove();
          $(".mapFlagOff").remove();
          var mapFlag = $("<input></input>").attr("type","hidden").addClass("mapFlagOn").appendTo("#mapInfo");
        } else{
          $("#mapInfo").hide();
          $("#alarm_range_BLE").show();
          $("#alarm_range_GPS").hide();
          $(".mapFlagOn").remove();
          $(".mapFlagOff").remove();
          var mapFlag = $("<input></input>").attr("type","hidden").addClass("mapFlagOff").appendTo("#mapInfo");
        }

        // 백그라운드 슬라이드 열기
        $("#backgoundBtn").unbind("click").bind("click", function(){
          // $("#backgoundOnBtn").css({
          //   "background-color":"#3162C7"
          // });
          // $("#backgoundOffBtn").css({
          //   "background-color":"#AAD5FF"
          // });
          // enterBackGroundMode();
          // $("#backgroundPannel").toggle("slide",{direction:"left"},350,null);
          $("#backgroundPannel").slideToggle();
          // $(".pNotification_commentsDiv").slideToggle(500, pShowComments(childID, dateValue));
        });


        // new 백그라운드 켜기
        $("#backgroundOn").unbind("click").bind("click", function(){
          $("#backgroundPannel").slideToggle();
          $("#backgoundBtn").css({
            "background-color":"#5182D7"
          });
          $("#backgoundBtnText").text("On").css({"color":"red"});
          enterBackGroundMode();
        });

        // new 백그라운드 끄기
        $("#backgroundOff").unbind("click").bind("click", function(){
          $("#backgroundPannel").slideToggle();
          $("#backgoundBtn").css({
            "background-color":"white"
          });
          $("#backgoundBtnText").text("Off").css({"color":"gray"});
          endBackGroundMode();
        });




        // $("#sideMenuBtn").unbind("click").bind("click", function(){
        //     $("#sideMenuListDiv").toggle("slide",{direction:"left"},350,null);
        // });
        // $("#pSideMenuBtn").unbind("click").bind("click", function(){
        //     $("#pSideMenuListDiv").toggle("slide",{direction:"left"},350,null);
        // });

        // 구 백그라운드 끄기
        $("#backgoundOffBtn").unbind("click").bind("click", function(){
          $("#backgoundOnBtn").css({
            "background-color":"#AAD5FF"
          });
          $("#backgoundOffBtn").css({
            "background-color":"#3162C7"
          });
          endBackGroundMode();
        });



        // (구)모드 변경 클릭
        // $("#modeChangeBtn").unbind("click").bind("click", function(){
        //
        //   if($("#modeMessage2").children().hasClass("in") == true){
        //       $("#modeMessage2").empty();
        //       $("#modeMessage1").css({
        //         "background-color":"#2457BD"
        //       });
        //       $("#modeMessage2").css({
        //         "background-color":"#5A8DF3"
        //       });
        //
        //
        //       var modeText = $("<p></p>").text('室外モード GPS').addClass('out');
        //       $("#modeMessage2").append(modeText);
        //       $("#alarm_range_BLE").hide();
        //       $("#alarm_range_GPS").show();
        //       // 室外モード 일때 동작할 것들
        //       signalSwitch();
        //
        //   } else if($("#modeMessage2").children().hasClass("out") == true){
        //     $("#modeMessage2").empty();
        //
        //     $("#modeMessage1").css({
        //       "background-color":"#0062C4"
        //     });
        //     $("#modeMessage2").css({
        //       "background-color":"#AAD5FF"
        //     });
        //
        //     var modeText = $("<p></p>").text('室内モード Beacon').addClass('in');
        //     $("#modeMessage2").append(modeText);
        //     $("#alarm_range_GPS").hide();
        //     $("#alarm_range_BLE").show();
        //     // 室内モード 일때 동작할 것들
        //       signalSwitch();
        //   }
        // });



        // (new) GPS, 비콘 판넬 열기
        $("#modeMessage2").unbind("click").bind("click", function(){
          $("#iCareModePannel").slideToggle();
        });

        // 첫 화면에는 지도를 띄우기 때문에 시작하자마자 붙임

        // new 실외모드 작동
        $("#gpsOnBtn").unbind("click").bind("click", function(){
          $("#iCareModePannel").slideToggle();
          $("#modeText1").text("室外モード ");
          $("#modeText2").text("GPS").css({"color":"green"});
          $("#modeMessage2").css({
            "background-color":"#efffef"
          });



          // 맵이 열려있으면 아무것도 하지않고, 안열려있을 경우 슬라이드토글
          if($("#mapInfo").children().hasClass("mapFlagOn")){
            // alert('mapFlag 있다. 아무것도 안한다');
            $(".mapFlagOn").remove();
            $(".mapFlagOff").remove();
            var mapFlag = $("<input></input>").attr("type","hidden").addClass("mapFlagOn").appendTo("#mapInfo");
          } else{
            $(".mapFlagOn").remove();
            $(".mapFlagOff").remove();
            var mapFlag = $("<input></input>").attr("type","hidden").addClass("mapFlagOn").appendTo("#mapInfo");
            // alert('mapFlag 없음.');
            // $("#mapInfo").append(mapFlag);
            $("#mapInfo").slideToggle();
          }
          $("#alarm_range_BLE").hide();
          $("#alarm_range_GPS").show();
          // signalSwitch();
        });

        // new 실내모드 작동
        $("#beaconOnBtn").unbind("click").bind("click", function(){
          $("#iCareModePannel").slideToggle();
          $("#modeText1").text("室内モード ");
          $("#modeText2").text("Beacon").css({"color":"blue"});
          $("#modeMessage2").css({
            "background-color":"#efefff"
          });

          // 맵이 열려있으면 닫고, 안열려있을 경우 아무것도 안함
          if($("#mapInfo").children().hasClass("mapFlagOn") === true){
            // alert('mapFlag 있다  지운다.');
            $(".mapFlagOn").remove();
            $(".mapFlagOff").remove();
            var mapFlag = $("<input></input>").attr("type","hidden").addClass("mapFlagOff").appendTo("#mapInfo");
            $("#mapInfo").slideToggle();

          } else{
            // alert('mapFlag 없다 아무것도 안함.');
            $(".mapFlagOn").remove();
            $(".mapFlagOff").remove();
            var mapFlag = $("<input></input>").attr("type","hidden").addClass("mapFlagOff").appendTo("#mapInfo");
          }

          $("#alarm_range_GPS").hide();
          $("#alarm_range_BLE").show();
          // signalSwitch();

        });


        // GPS 좌표값 받아오기 버튼 클릭
        $("#getGpsValueBtn").unbind("click").bind("click", function(){
          cdn.buttonGPS();
        });

        // 내 위치 표시
        $("#viewMyPointBtn").unbind("click").bind("click", function(){
          initMap();
        });

        // 스캔 중지

        $("#scanStopBtn").unbind("click").bind("click", function(){
          ms('scanMessage', '');
          BT_stopScan();
        });


        // 스캔 시작
        $("#scanStartBtn").unbind("click").bind("click", function(){
          BT_startScan2();
        });
      }        // js, css 다하면 이 괄호 주석 풀어야됨




    // 사진 앨범 클릭
    $("#box5").unbind("click").bind("click", function(){
      allHide();
      $("#selectCameraOrAlbumPage").show();
      // var whatIsBox = "box5";
      // selectChildView(whatIsBox);
      // $("#etcPicture1").unbind("click").bind("click",function(){
      //                             alert('기타 사진업로드 구현 대기중');
      //                           });

      // 촬영하기 버튼
      $("#box5_1").unbind("click").bind("click", function(){
        selectChildView("box5_1");
      });

      // 앨범보기 버튼
      $("#box5_2").unbind("click").bind("click", function(){
        selectChildView("box5_2");
      });

      // 돌아가기 버튼
      $("#box5_3").unbind("click").bind("click", function(){
        allHide();

        $('#tLoginTop').show();
        $('#sideMenuListDiv').hide();
        $('#teacherMain').show();
      });
    });



    $("#tPhotoSelectChildPanel").hide();
    $("#tPhoUpChangeModePanel").hide();

    // 사진 업로드
    function photoUpload(childID, imageName, childName){
      allHide();
      $("#photoUpload").show();

      $(".photoUpload_ImgAndName").empty();

      //ㅁㄴㅇㄹ3
      $("#tPhotoSelectChild").unbind("click").bind("click", function(){
              $("#tPhotoSelectChildPanel").toggle("slide",{direction:"left"},350,null);

              $('#tPhotoSelectChildList').empty();

              // 슬라이드 원아목록에 원아리스트 불러오기
              $.ajax({
                  url:"http://japan-okyo.c9users.io/mobile/getChildrens.php",
                  // url:"http://japan-okyo.c9users.io/mobile/mTest.php",
                  data:{
                    user_num: user_num,
                    user_name : user_name
                  },
                  dataType:"jsonp",
                  success:function(data){
                      //성공
                      if(data.result == "success"){
                          var cnt = data.data.length;

                          for(var i = 0; i < cnt ; i++){
                              var childID   = data.data[i].childNum;
                              var imageName = data.data[i].imageName;
                              var childName = data.data[i].childName;
                              var imageComment = data.data[i].imageComment;

                              var imgs = $("<img />").addClass("imageNamePhoto imageNamePhoto"+childID).attr("src", "http://japan-okyo.c9users.io/img/child/"+imageName);
                              var names = $("<p></p>").addClass("childNamePhoto childNamePhoto"+childID).text(childName);
                              var namesDiv = $("<div></div>").addClass("childNameDivPhoto childNameDivPhoto"+childID).append(names);

                              $("<div></div>").addClass('selectImgAndNamePhoto selectImgAndNamePhoto'+childID).appendTo("#tPhotoSelectChildList");
                              $("<div></div>").addClass("imageDivPhoto").append(imgs).appendTo(".selectImgAndNamePhoto"+childID);
                              $("<div></div>").addClass("NameDivPhoto").append(namesDiv).appendTo(".selectImgAndNamePhoto"+childID);

                              (function(childID, imageName, childName){

                              $(".selectImgAndNamePhoto"+childID).unbind("click").bind("click",function(){

                                  $("#photoMemo").val('');
                                  photoUpload(childID, imageName, childName);

                                  $("#tPhotoSelectChildPanel").toggle("slide",{direction:"left"},350,null);

                              });

                            }(childID, imageName, childName));
                          }

                          if(cnt == 0)
                              $("<p></p>").text("アップロードのイメージがありません。").appendTo("#selectImgAndName1");
                      }
                      //오류
                      else {
                          window.alert("エラーが発生しました。");
                      }



                  }, error: function(){
                      window.alert("サーバーからのエラーが発生しました。");
                  }
              });
          });

          $("#tPhotoSelectChildPanelCloseBtn").unbind("click").bind("click", function(){
              $("#tPhotoSelectChildPanel").toggle("slide",{direction:"left"},350,null);
          });
      //

      //
      $("#tPhoUpChangeModeBtn").unbind("click").bind("click", function(){
        // var changeModePanel = $("<div></div>").addClass("changeModePanel").appendTo("#tObservation");
        // var changeModePanelCloseBtn = $("<div></div>").addClass("changeModePanelCloseBtn").appendTo(".changeModePanel");
        // $("<div></div>").addClass("tPhoUpChangeModePanelCloseBtn").appendTo("#tPhoUpChangeModePanel");

        $("#tPhoUpChangeModePanel").hide("slide",{direction:"right"},350,null);
        $("#tPhoUpChangeModePanel").toggle("slide",{direction:"right"},350,null);

        var argValues = new Array();
        argValues.push(childID);
        argValues.push(imageName);
        argValues.push(childName);
        // alert(childID);
        // alert(imageName);
        // alert(childName);
        // makeChangePanel(argValues);

          // 패널 속에서 중복으로 추가되는 것을 방지
          $("#tPhoUpChangeModePanel").empty();

          // 패널 닫기 버튼 생성
          $("<div></div>").addClass("changeModePanelCloseBtn").appendTo("#tPhoUpChangeModePanel");

          // 패널 닫기 버튼 이벤트 걸기
          $(".changeModePanelCloseBtn").unbind("click").bind("click", function(){
              $("#tPhoUpChangeModePanel").toggle("slide",{direction:"right"},350,null);
          });

          // ChangeModePanel
          var changeBtn1 = $("<div></div>").addClass("changeBtn1");
          var changeBtn1Img = $("<img></img>").attr("src", "./img/memo.png").appendTo(changeBtn1);
          var changeBtn1Text = $("<p>園児 メモ 作成</p>").appendTo(changeBtn1);
          $("#tPhoUpChangeModePanel").append(changeBtn1);
          $(".changeBtn1").unbind("click").bind("click", function(){
              allHide();
              tObservation(argValues[0], argValues[1], argValues[2]);
              $("#tPhoUpChangeModePanel").hide("slide",{direction:"right"},350,null);
          });

          var changeBtn23Box = $("<div></div>").addClass("changeBtn23Box");
          $("#tPhoUpChangeModePanel").append(changeBtn23Box);

          var changeBtn2 = $("<div></div>").addClass("changeBtn2").appendTo(changeBtn23Box);
          var changeBtn2Img = $("<img></img>").attr("src", "./img/hyouka.png").appendTo(changeBtn2);
          var changeBtn2Text = $("<p>授業 評価項目</p>").appendTo(changeBtn2);
          $(".changeBtn2").unbind("click").bind("click", function(){
              allHide();
              var newDate = new Date();
              var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

              if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
                var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
              } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
                var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
              } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
                var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
              } else{
                var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
              }
              developCheck(argValues[0], argValues[1], argValues[2], dateValue);
              $("#tPhoUpChangeModePanel").hide("slide",{direction:"right"},350,null);
          });

          var changeBtn3 = $("<div></div>").addClass("changeBtn3").appendTo(changeBtn23Box);
          var changeBtn3Img = $("<img></img>").attr("src", "./img/iCheck3.png").appendTo(changeBtn3);
          var changeBtn3Text = $("<p>発育日誌</p>").appendTo(changeBtn3);
          $(".changeBtn3").unbind("click").bind("click", function(){
              allHide();
              var newDate = new Date();
              var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

              if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
                var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
              } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
                var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
              } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
                var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
              } else{
                var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
              }
              tICheck(argValues[0], argValues[1], argValues[2], dateValue);
              $("#tPhoUpChangeModePanel").hide("slide",{direction:"right"},350,null);
          });

          var changeBtn45Box = $("<div></div>").addClass("changeBtn45Box");
          $("#tPhoUpChangeModePanel").append(changeBtn45Box);

          var changeBtn4 = $("<div></div>").addClass("changeBtn4").appendTo(changeBtn45Box);
          var changeBtn4Img = $("<img></img>").attr("src", "./img/camera.png").appendTo(changeBtn4);
          var changeBtn4Text = $("<p>写真アップロード</p>").appendTo(changeBtn4);
          $(".changeBtn4").unbind("click").bind("click", function(){
              allHide();
              photoUpload(argValues[0], argValues[1], argValues[2]);
              $("#tPhoUpChangeModePanel").hide("slide",{direction:"right"},350,null);
          });


          var changeBtn5 = $("<div></div>").addClass("changeBtn5").appendTo(changeBtn45Box);
          var changeBtn5Img = $("<img></img>").attr("src", "./img/album2.png").appendTo(changeBtn5);
          var changeBtn5Text = $("<p>アルバムを見る</p>").appendTo(changeBtn5);
          $(".changeBtn5").unbind("click").bind("click", function(){
              allHide();
              showAlbum(argValues[0], argValues[1], argValues[2], 1);
              $("#tPhoUpChangeModePanel").hide("slide",{direction:"right"},350,null);
          });

      });
      //


      // 현재 선택된 원아 사진 이름 띄우기
      var imgs = $("<img />").addClass("photoUpload_ImageName").attr("src","http://japan-okyo.c9users.io/img/child/"+imageName);
      var names = $("<p></p>").addClass("photoUpload_ChildName").text(childName);
      var namesDiv = $("<div></div>").addClass("photoUpload_ChildNameDiv").append(names);

      $("#photoUpload_childBox_div").addClass('photoUpload_ImgAndName');
      $("<div></div>").addClass("photoUpload_ImageNameDiv").append(imgs).append(namesDiv).appendTo(".photoUpload_ImgAndName");

      // 이미지태그로 이미지 띄우기
      // var GalleryImageView = $("<img />").attr("src", "").addClass("GalleryImageView");
      var GalleryImageView = $("<img />").attr("src", "./img/noImg.png").addClass("GalleryImageView");

      $("#photoUpload").append(GalleryImageView);

      // 사진촬영 버튼
      $("#takePictureBtn").unbind("click").bind("click", function(){
        btnTakePic();
      });

      // 갤러리찾기 버튼
      $("#getGalleryBtn").unbind("click").bind("click", function(){
        btnAlbumPic();
      });


      // '사진촬영' 클릭 시
      function btnTakePic(){
        navigator.camera.getPicture(onPhotoData, onFail,
                                      { quality: 50, destinationType: Camera.DestinationType.DATA_URL });
      }


      // '갤러리 찾기' 클릭 시
      function btnAlbumPic(){
        navigator.camera.getPicture(onPhotoData, onFail,
                                      { quality: 50, destinationType: Camera.DestinationType.DATA_URL,
                                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY });
      }

      function onPhotoData(imageData){
        // 이미지태그로 이미지값 가져와서 띄우기
        // alert(imageData);
        $(".GalleryImageView").attr("src", "data:image/jpeg;base64, " + imageData);
      }

      function onFail(message){
        // alert('Faild : ' + message);
      }

          //업로드 버튼
      $("#photoUploadBtn").unbind("click").bind("click", function(){
        // alert(childID);
            uploadPhoto(childID);
      });

      // 이미지 저장 클릭
      function uploadPhoto(childID) {
          var viewPhotoDataUrl = $(".GalleryImageView").attr('src');
          var photoMemo = $("#photoMemo").val();

          // alert(childID);
          // alert(user_num);
          // alert(viewPhotoDataUrl);
          // alert(photoMemo);

        // 그림으로 보내는 데이터양이 많으면 get으로 주고받을수가
        // 없기 때문에 POST를 사용해야 한다.
          $.ajax({
            type:'POST',
            data: {
              childID : childID,
              user_num: user_num,
              viewPhotoDataUrl: viewPhotoDataUrl,
              photoMemo: photoMemo
            },
              url:'http://japan-okyo.c9users.io/mobile/uploadPhoto.php',
             success:function(result){

                // alert('ajax 성공');
                alert("イメージをアップロードしました。");


                $("#photoMemo").val('');
                $(".GalleryImageView").attr("src", "");
             }, error:function(result){
               alert("イメージをアップロードできません。");
             }
          });

        // end
      }

        //취소버튼
      $("#photoUploadCancelBtn").unbind("click").bind("click", function(){
        // var whatIsBox = "box5_1";
        // selectChildView(whatIsBox);
        allHide();
        $("#selectCameraOrAlbumPage").show();
      });


      // 이미지업로드 끝부분
    }


    // 앨범 보기 클릭
    $('#box5_2').unbind("click").bind("click", function(){
      selectChildView("box6");
      $("#etcPicture1").unbind("click").bind("click",function(){

                                });
    });




    $("#tAlbumSelectChildPanel").hide();
    $("#tAlbumChangeModePanel").hide();
    // 앨범 보기
    function showAlbum(childID, imageName, childName, optionValue){
      $("#childSelectBox1").hide();
      $("#showAlbum").show();
      $("#tAlbum_childBox_div").empty();

      //ㅁㄴㅇㄹ3
      $("#tAlbumSelectChild").unbind("click").bind("click", function(){
              $("#tAlbumSelectChildPanel").toggle("slide",{direction:"left"},350,null);

              $('#tAlbumSelectChildList').empty();

              // 슬라이드 원아목록에 원아리스트 불러오기
              $.ajax({
                  url:"http://japan-okyo.c9users.io/mobile/getChildrens.php",
                  // url:"http://japan-okyo.c9users.io/mobile/mTest.php",
                  data:{
                    user_num: user_num,
                    user_name : user_name
                  },
                  dataType:"jsonp",
                  success:function(data){
                      //성공
                      if(data.result == "success"){
                          var cnt = data.data.length;

                          for(var i = 0; i < cnt ; i++){
                              var childID   = data.data[i].childNum;
                              var imageName = data.data[i].imageName;
                              var childName = data.data[i].childName;
                              var imageComment = data.data[i].imageComment;

                              var imgs = $("<img />").addClass("imageNameAlbum imageNameAlbum"+childID).attr("src", "http://japan-okyo.c9users.io/img/child/"+imageName);
                              var names = $("<p></p>").addClass("childNameAlbum childNameAlbum"+childID).text(childName);
                              var namesDiv = $("<div></div>").addClass("childNameDivAlbum childNameDivAlbum"+childID).append(names);

                              $("<div></div>").addClass('selectImgAndNameAlbum selectImgAndNameAlbum'+childID).appendTo("#tAlbumSelectChildList");
                              $("<div></div>").addClass("imageDivAlbum").append(imgs).appendTo(".selectImgAndNameAlbum"+childID);
                              $("<div></div>").addClass("NameDivAlbum").append(namesDiv).appendTo(".selectImgAndNameAlbum"+childID);

                              (function(childID, imageName, childName){

                              $(".selectImgAndNameAlbum"+childID).unbind("click").bind("click",function(){

                                  $("#AlbumMemo").val('');
                                  showAlbum(childID, imageName, childName, 1);

                                  $("#tAlbumSelectChildPanel").toggle("slide",{direction:"left"},350,null);


                              });

                            }(childID, imageName, childName));
                          }

                          if(cnt == 0)
                              $("<p></p>").text("アップロードのイメージがありません。").appendTo("#selectImgAndName1");
                      }
                      //오류
                      else {
                          window.alert("エラーが発生しました。");
                      }



                  }, error: function(){
                      window.alert("サーバーからのエラーが発生しました。");
                  }
              });
          });

          $("#tAlbumSelectChildPanelCloseBtn").unbind("click").bind("click", function(){
              $("#tAlbumSelectChildPanel").toggle("slide",{direction:"left"},350,null);
          });
      //

      // 현재 선택된 원아 사진 이름 띄우기
      var imgs = $("<img />").addClass("tAlbum_ImageName").attr("src","http://japan-okyo.c9users.io/img/child/"+imageName);
      var names = $("<p></p>").addClass("tAlbum_ChildName").text(childName);
      var namesDiv = $("<div></div>").addClass("tAlbum_ChildNameDiv").append(names);

      $("#tAlbum_childBox_div").addClass('tAlbum_ImgAndName');
      $("<div></div>").addClass("tAlbum_ImageNameDiv").append(imgs).append(namesDiv).appendTo(".tAlbum_ImgAndName");

      //
      $("#tAlbumChangeModeBtn").unbind("click").bind("click", function(){
        // var changeModePanel = $("<div></div>").addClass("changeModePanel").appendTo("#tObservation");
        // var changeModePanelCloseBtn = $("<div></div>").addClass("changeModePanelCloseBtn").appendTo(".changeModePanel");
        // $("<div></div>").addClass("tAlbumChangeModePanelCloseBtn").appendTo("#tAlbumChangeModePanel");

        $("#tAlbumChangeModePanel").hide("slide",{direction:"right"},350,null);
        $("#tAlbumChangeModePanel").toggle("slide",{direction:"right"},350,null);

        var argValues = new Array();
        argValues.push(childID);
        argValues.push(imageName);
        argValues.push(childName);
        // alert(childID);
        // alert(imageName);
        // alert(childName);
        // makeChangePanel(argValues);

          // 패널 속에서 중복으로 추가되는 것을 방지
          $("#tAlbumChangeModePanel").empty();

          // 패널 닫기 버튼 생성
          $("<div></div>").addClass("changeModePanelCloseBtn").appendTo("#tAlbumChangeModePanel");

          // 패널 닫기 버튼 이벤트 걸기
          $(".changeModePanelCloseBtn").unbind("click").bind("click", function(){
              $("#tAlbumChangeModePanel").toggle("slide",{direction:"right"},350,null);
          });

          // ChangeModePanel
          var changeBtn1 = $("<div></div>").addClass("changeBtn1");
          var changeBtn1Img = $("<img></img>").attr("src", "./img/memo.png").appendTo(changeBtn1);
          var changeBtn1Text = $("<p>園児 メモ 作成</p>").appendTo(changeBtn1);
          $("#tAlbumChangeModePanel").append(changeBtn1);
          $(".changeBtn1").unbind("click").bind("click", function(){
              allHide();
              tObservation(argValues[0], argValues[1], argValues[2]);
              $("#tAlbumChangeModePanel").hide("slide",{direction:"right"},350,null);
          });

          var changeBtn23Box = $("<div></div>").addClass("changeBtn23Box");
          $("#tAlbumChangeModePanel").append(changeBtn23Box);

          var changeBtn2 = $("<div></div>").addClass("changeBtn2").appendTo(changeBtn23Box);
          var changeBtn2Img = $("<img></img>").attr("src", "./img/hyouka.png").appendTo(changeBtn2);
          var changeBtn2Text = $("<p>授業 評価項目</p>").appendTo(changeBtn2);
          $(".changeBtn2").unbind("click").bind("click", function(){
              allHide();var newDate = new Date();
              var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

              if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
                var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
              } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
                var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
              } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
                var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
              } else{
                var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
              }
              developCheck(argValues[0], argValues[1], argValues[2], dateValue);
              $("#tAlbumChangeModePanel").hide("slide",{direction:"right"},350,null);
          });

          var changeBtn3 = $("<div></div>").addClass("changeBtn3").appendTo(changeBtn23Box);
          var changeBtn3Img = $("<img></img>").attr("src", "./img/iCheck3.png").appendTo(changeBtn3);
          var changeBtn3Text = $("<p>発育日誌</p>").appendTo(changeBtn3);
          $(".changeBtn3").unbind("click").bind("click", function(){
              allHide();
              var newDate = new Date();
              var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

              if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
                var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
              } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
                var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
              } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
                var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
              } else{
                var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
              }
              tICheck(argValues[0], argValues[1], argValues[2], dateValue);
              $("#tAlbumChangeModePanel").hide("slide",{direction:"right"},350,null);
          });

          var changeBtn45Box = $("<div></div>").addClass("changeBtn45Box");
          $("#tAlbumChangeModePanel").append(changeBtn45Box);

          var changeBtn4 = $("<div></div>").addClass("changeBtn4").appendTo(changeBtn45Box);
          var changeBtn4Img = $("<img></img>").attr("src", "./img/camera.png").appendTo(changeBtn4);
          var changeBtn4Text = $("<p>写真アップロード</p>").appendTo(changeBtn4);
          $(".changeBtn4").unbind("click").bind("click", function(){
              allHide();
              photoUpload(argValues[0], argValues[1], argValues[2]);
              $("#tAlbumChangeModePanel").hide("slide",{direction:"right"},350,null);
          });


          var changeBtn5 = $("<div></div>").addClass("changeBtn5").appendTo(changeBtn45Box);
          var changeBtn5Img = $("<img></img>").attr("src", "./img/album2.png").appendTo(changeBtn5);
          var changeBtn5Text = $("<p>アルバムを見る</p>").appendTo(changeBtn5);
          $(".changeBtn5").unbind("click").bind("click", function(){
              allHide();
              showAlbum(argValues[0], argValues[1], argValues[2], 1);
              $("#tAlbumChangeModePanel").hide("slide",{direction:"right"},350,null);
          });

      });
      //



      switch (optionValue) {
        case 1:
            showAlbumOption1(childID, childName, optionValue);
            $("#showAlbumOptionBtn1").css({
              "background-color":"#5F00FF"
            });
            $("#showAlbumOptionBtn2").css({
              "background-color":"#D1B2FF"
            });
            $("#showAlbumOptionBtn6").css({
              "background-color":"#D1B2FF"
            });
          break;
        case 2:
            showAlbumOption2(childID, childName, optionValue);
            $("#showAlbumOptionBtn1").css({
              "background-color":"#D1B2FF"
            });
            $("#showAlbumOptionBtn2").css({
              "background-color":"#5F00FF"
            });
            $("#showAlbumOptionBtn6").css({
              "background-color":"#D1B2FF"
            });
        default:

      }


        // 최근순 버튼 클릭
      $("#showAlbumOptionBtn1").unbind("click").bind("click", function(){
        showAlbumOption1(childID, 1);
        $("#showAlbumOptionBtn1").css({
          "background-color":"#5F00FF"
        });
        $("#showAlbumOptionBtn2").css({
          "background-color":"#D1B2FF"
        });
        $("#showAlbumOptionBtn6").css({
          "background-color":"#D1B2FF"
        });
      });

      // $("<div></div>").addClass("tICheck_Notification_btn2").text('알림내용').appendTo("#tICheck_Notification_btn");

        // 오래된순 버튼 클릭
      $("#showAlbumOptionBtn2").unbind("click").bind("click", function(){
        showAlbumOption2(childID, 2);
        $("#showAlbumOptionBtn1").css({
          "background-color":"#D1B2FF"
        });
        $("#showAlbumOptionBtn2").css({
          "background-color":"#5F00FF"
        });
        $("#showAlbumOptionBtn6").css({
          "background-color":"#D1B2FF"
        });


      });
      // $("<div></div>").addClass("tICheck_DevelopGraph_btn2").text('발달사항').appendTo("#tICheck_DevelopGraph_btn");


      //   // 날짜조회 버튼 클릭
      // $("#showAlbumOptionBtn6").unbind("click").bind("click", function(){
      //   showAlbumOption6(childID);
      //   $("#showAlbumOptionBtn1").css({
      //     "background-color":"#D1B2FF"
      //   });
      //   $("#showAlbumOptionBtn2").css({
      //     "background-color":"#D1B2FF"
      //   });
      //   $("#showAlbumOptionBtn6").css({
      //     "background-color":"#5F00FF"
      //   });
      //
      // });





  /*
      // 최근순 정렬
      function showAlbumOption1(childID){
        $.ajax({
          dataType: "jsonp",
          data:{
            childID: childID
          },
          // url:'https://chesyu.run.goorm.io/MyProject/ni/uaaa.php',
          url:'https://chesyu.run.goorm.io/MyProject/ni/getAlbum.php',
          success:function(data){
            var cnt = data.data.length;

            $("#showAlbumDiv").empty();

            var photoData = new Array();

            for(var i = 0; i < cnt; i++){
              photoData['photoId']   = data.data[i].id;
              photoData['folderPath'] = data.data[i].folderPath;
              photoData['photoName'] = data.data[i].photoName;
              photoData['registDay'] = data.data[i].registDay;
              photoData['fullPath'] = childID+"/"+photoData['folderPath']+"/"+photoData['photoName'];
              photoData['photoMemo'] = data.data[i].photoMemo;

              var imgs    = $("<img />").attr("src", "https://chesyu.run.goorm.io/MyProject/ni/album/folder"+photoData['fullPath']).addClass("photo"+photoData['photoId']);
              // var memos   = $("<p></p>").text(photoMemo);
              var imgsDiv = $("<div></div>").addClass("photoImgsDiv").append(imgs);
              $("#showAlbumDiv").append(imgsDiv);

              (function(photoData){
                $(".photo"+photoData['photoId']).unbind("click").bind("click",function(){
                  detailPhotoView(photoData);
                });
              }(photoData));

            }
          },
          error:function(){
            alert('서버 오류');
          }
        });
      }

      // 오래된순 정렬
      function showAlbumOption2(childID){
        var asc = "asc";
        $.ajax({
          dataType: "jsonp",
          data:{
            childID: childID,
            asc : asc
          },
          // url:'https://chesyu.run.goorm.io/MyProject/ni/uaaa.php',
          url:'https://chesyu.run.goorm.io/MyProject/ni/getAlbum.php',
          success:function(data){
            var cnt = data.data.length;

            $("#showAlbumDiv").empty();

            var photoData = new Array();

            for(var i = 0; i < cnt; i++){
              photoData['id']   = data.data[i].id;
              photoData['folderPath'] = data.data[i].folderPath;
              photoData['photoName'] = data.data[i].photoName;
              photoData['registDay'] = data.data[i].registDay;
              photoData['fullPath'] = childID+"/"+photoData['folderPath']+"/"+photoData['photoName'];
              photoData['photoMemo'] = data.data[i].photoMemo;

              var imgs    = $("<img />").attr("src", "https://chesyu.run.goorm.io/MyProject/ni/album/folder"+photoData['fullPath']).addClass("photo"+photoData['photoId']);
              // var memos   = $("<p></p>").text(photoMemo);
              var imgsDiv = $("<div></div>").addClass("photoImgsDiv").append(imgs);
              $("#showAlbumDiv").append(imgsDiv);

              (function(photoData){
                $(".photo"+photoData['photoId']).unbind("click").bind("click",function(){
                  detailPhotoView(photoData);
                });
              }(photoData));

            }

          },
          error:function(){
            alert('서버 오류');
          }
        });
      }
      */
      // 최근순 정렬
      function showAlbumOption1(childID, childName, optionValue){

        $.ajax({
          dataType: "jsonp",
          data:{
            childID: childID
          },
          // url:'https://chesyu.run.goorm.io/MyProject/ni/uaaa.php',
          url:'http://japan-okyo.c9users.io/mobile/viewPhoto.php',
          success:function(data){
            var cnt = data.data.length;

            $("#showAlbumDiv").empty();

            for(var i = 0; i < cnt; i++){
              var photoId   = data.data[i].id;
              var photoName = data.data[i].photoName;
              var registDay = data.data[i].registDay;
              var photoMemo = data.data[i].photoMemo;

              var imgs    = $("<img />").attr("src", "http://japan-okyo.c9users.io/img/album/childID_"+childID+"/"+photoName).addClass("photo"+photoId);
              // var memos   = $("<p></p>").text(photoMemo);
              var imgsDiv = $("<div></div>").addClass("photoImgsDiv").append(imgs);
              $("#showAlbumDiv").append(imgsDiv);

              (function(photoId, photoName, registDay, photoMemo, optionValue){
                $(".photo"+photoId).unbind("click").bind("click",function(){
                  detailPhotoView(photoId, photoName, registDay, photoMemo, optionValue);
                });
              }(photoId, photoName, registDay, photoMemo, optionValue));

            }
          },
          error:function(){
            alert('サーバーからのエラーが発生しました。');
          }
        });
      }

      // 오래된순 정렬
      function showAlbumOption2(childID, childName, optionValue){
        optionValue = 2;
        var asc = "asc";
        $.ajax({
          dataType: "jsonp",
          data:{
            childID: childID,
            asc : asc
          },
          // url:'https://chesyu.run.goorm.io/MyProject/ni/uaaa.php',
          url:'http://japan-okyo.c9users.io/mobile/viewPhoto.php',
          success:function(data){
            var cnt = data.data.length;

            $("#showAlbumDiv").empty();


            for(var i = 0; i < cnt; i++){
              var photoId   = data.data[i].id;
              var photoName = data.data[i].photoName;
              var registDay = data.data[i].registDay;
              var photoMemo = data.data[i].photoMemo;

              var imgs    = $("<img />").attr("src", "http://japan-okyo.c9users.io/img/album/childID_"+childID+"/"+photoName).addClass("photo"+photoId);
              // var memos   = $("<p></p>").text(photoMemo);
              var imgsDiv = $("<div></div>").addClass("photoImgsDiv").append(imgs);
              $("#showAlbumDiv").append(imgsDiv);

              (function(photoId, photoName, registDay, photoMemo, optionValue){
                $(".photo"+photoId).unbind("click").bind("click",function(){
                  detailPhotoView(photoId, photoName, registDay, photoMemo, optionValue);
                });
              }(photoId, photoName, registDay, photoMemo, optionValue));

            }

          },
          error:function(){
            alert('サーバーからのエラーが発生しました。');
          }
        });
      }
      // // 두 날짜 사이 정렬
      // function showAlbumOption2(childID){
      //   var asc = "asc";
      //   $.ajax({
      //     dataType: "jsonp",
      //     data:{
      //       childID: childID,
      //       asc : asc
      //     },
      //     // url:'https://chesyu.run.goorm.io/MyProject/ni/uaaa.php',
      //     url:'https://chesyu.run.goorm.io/MyProject/ni/getAlbum.php',
      //     success:function(data){
      //       var cnt = data.data.length;
      //
      //       $("#showAlbumDiv").empty();
      //
      //       for(var i = 0; i < cnt; i++){
      //         var photoId   = data.data[i].id;
      //         var folderPath = data.data[i].folderPath;
      //         var photoName = data.data[i].photoName;
      //
      //         var fullPath = childID+"/"+folderPath+"/"+photoName;
      //         var photoMemo = data.data[i].photoMemo;
      //
      //         var imgs    = $("<img />").attr("src", "https://chesyu.run.goorm.io/MyProject/ni/album/folder"+fullPath).addClass("photo"+photoId);
      //         // var memos   = $("<p></p>").text(photoMemo);
      //         var imgsDiv = $("<div></div>").addClass("photoImgsDiv").append(imgs);
      //         $("#showAlbumDiv").append(imgsDiv);
      //
      //         (function(photoId, folderPath, photoName, fullPath, photoMemo){
      //           $(".photo"+photoId).unbind("click").bind("click",function(){
      //             detailPhotoView(photoId, folderPath, photoName, fullPath, photoMemo);
      //           });
      //         }(photoId, folderPath, photoName, fullPath, photoMemo));
      //
      //       }
      //     },
      //     error:function(){
      //       alert('서버 오류');
      //     }
      //   });
      // }


      // 원아선택으로 돌아가기
      // $("#showAlbumBackBtn").unbind("click").bind("click",function(){
      //   allHide();
      //   selectChildView("box5_2");
      // });




      // 사진 클릭 시 상세보기
      function detailPhotoView(photoId, photoName, registDay, photoMemo, optionValue){
        allHide();
        $("#showDetailAlbum").show();
        $("#detailAlbumImageDiv").empty();
        $("#detailAlbumRegistDiv").empty();
        $("#detailAlbumMemoDiv").empty();

        var img  = $("<img />").attr("src", "http://japan-okyo.c9users.io/img/album/childID_"+childID+"/"+photoName);
        var memo = $("<p></p>").text(photoMemo).addClass('photoMemo');
        var registDay = $("<p></p>").text("写真の登録日付 : " + registDay).addClass('photoRegistDay');

        $("#detailAlbumImageDiv").append(img);
        $("#detailAlbumRegistDiv").append(registDay);
        $("#detailAlbumMemoDiv").append(memo);

        // 상세보기에서 뒤로가기 버튼 클릭
        $("#detailAlbumBackBtn").unbind("click").bind("click",function(){

          allHide();
          showAlbum(childID, imageName, childName, optionValue);


          $("#showDetailAlbum").hide();
        });
      }
    }

    // 공지사항 클릭

    // 출석체크 클릭
    $("#box6").unbind("click").bind("click", function(){
      allHide();
      $("#tAttendanceChildListDiv").empty();
      $("#tAttendanceCheck").show();
      var childIdArray = new Array();
      var attendanceValue = 1;

      // selectChildView("attCheck");

      attCheck();

      // 원아 이미지 및 이름 출력
      function attCheck(){
      $.ajax({
          url:"http://japan-okyo.c9users.io/mobile/getChildrens.php",
          data:{
            user_num: user_num,
            user_name: user_name
          },
          dataType:"jsonp",
          success:function(data){
              //성공
              if(data.result == "success"){
                  var cnt = data.data.length;
                  // testClick(data);

                  for(var i = 0; i < cnt ; i++){

                      var childID        = data.data[i].childNum;
                      childIdArray[i]    = data.data[i].childNum;
                      var imageName = data.data[i].imageName;
                      var childName = data.data[i].childName;
                      var attendanceInfo = new Array();
                      var firstChildID = data.data[0].id;
                      var lastChildID = firstChildID+cnt;

                      var imgs = $("<img />").addClass("atd_childImage"+childID).attr("src", "http://japan-okyo.c9users.io/img/child/"+imageName);
                      var names = $("<p></p>").addClass("atd_childName"+childID).text(childName);
                      var namesDiv = $("<div></div>").addClass("atd_childNameDiv"+childID).append(names);


                      // 원아 이미지 및 이름
                      $("<div></div>").addClass('atd_ImgAndName'+childID).appendTo("#tAttendanceChildListDiv");
                      $("<div></div>").addClass("atd_imageDiv").append(imgs).appendTo(".atd_ImgAndName"+childID);
                      $("<div></div>").addClass("atd_NameDiv").append(namesDiv).appendTo(".atd_ImgAndName"+childID);

                  }

                  // 출석버튼들 출력
                  attendanceBtns(childIdArray, cnt);
                  if(cnt == 0)
                      $("<p></p>").text("アップロードのイメージがありません。").appendTo("#selectImgAndName1");
              }
              //오류
              else {
                  window.alert("エラーが発生しました。");
              }
          }, error: function(){
              window.alert("サーバーからのエラーが発生しました。");
          }

      });
      //////////////////// 원아 이미지 및 이름 출력 ajax끝부분

  }

        // 출석버튼 관련  /////////////
        function attendanceBtns(childIdArray, cnt){
          $.ajax({
            url:"http://japan-okyo.c9users.io/mobile/getAttendanceCheckT.php",
            data:{
              childIdArray: childIdArray,
              cnt : cnt
            },
            dataType:"jsonp",
            success:function(data){
              for(var i = 0; i < cnt ; i++){

                childID = childIdArray[i];
                var firstChildID = childIdArray[0];
                var lastChildID = firstChildID+cnt;

                (function(childID){

                    // 출석버튼 및 글씨
                    $("<div></div>").addClass("tAttendance tAttendance"+childID).appendTo(".atd_ImgAndName"+childID);
                    $(".tAttendance"+childID).empty();
                    $("<p></p>").text('出席').appendTo(".tAttendance"+childID);
                    if(data.data[i]['attendanceValue'] == 1){
                      $(".tAttendance"+childID).css({
                        "border" : "2px solid white",
                        "background-color":"#00B1F2"
                      });
                      // var on = $("<input></input>").attr("type", "hidden").addClass("tAttendanceOn"+childID);


                      // var on = $("<input></input>").attr("type", "hidden").addClass("on");
                      // $(".tAttendance"+childID).append(on);
                      //  학부모가 업로드 한 것과 구별하기
                      if(data.data[i]['uploaderPosition'] == 3){
                        var on2 = $("<input></input>").attr("type", "hidden").addClass("on2");
                        $(".tAttendance"+childID).append(on2);
                      } else{
                        var on = $("<input></input>").attr("type", "hidden").addClass("on");
                        $(".tAttendance"+childID).append(on);
                      }
                    }

                    // 조퇴버튼 및 글씨
                    $("<div></div>").addClass("tEarlyLeave tEarlyLeave"+childID).appendTo(".atd_ImgAndName"+childID);
                    $(".tEarlyLeave"+childID).empty();
                    $("<p></p>").text('早退').appendTo(".tEarlyLeave"+childID);
                    if(data.data[i]['attendanceValue'] == 2){
                      $(".tEarlyLeave"+childID).css({
                        "border" : "2px solid white",
                        "background-color":"gold"
                      });
                      // var on = $("<input></input>").attr("type", "hidden").addClass("tEarlyLeaveOn"+childID);

                            // 아래 2줄 기존  on  추가하기
                      // var on = $("<input></input>").attr("type", "hidden").addClass("on");
                      // $(".tEarlyLeave"+childID).append(on);
                      if(data.data[i]['uploaderPosition'] == 3){
                        var on2 = $("<input></input>").attr("type", "hidden").addClass("on2");
                        $(".tEarlyLeave"+childID).append(on2);
                      } else{
                        var on = $("<input></input>").attr("type", "hidden").addClass("on");
                        $(".tEarlyLeave"+childID).append(on);
                      }
                    }


                    // 결석버튼 및 글씨
                    $("<div></div>").addClass("tAbsence tAbsence"+childID).appendTo(".atd_ImgAndName"+childID);
                    $(".tAbsence"+childID).empty();
                    $("<p></p>").text('欠席').appendTo(".tAbsence"+childID);
                    if(data.data[i]['attendanceValue'] == 3){
                      $(".tAbsence"+childID).css({
                        "border" : "2px solid white",
                        "background-color":"#FF48FF"
                      });
                      // var on = $("<input></input>").attr("type", "hidden").addClass("tAbsenceOn"+childID);

                      // var on = $("<input></input>").attr("type", "hidden").addClass("on");
                      // $(".tAbsence"+childID).append(on);
                      if(data.data[i]['uploaderPosition'] == 3){
                        var on2 = $("<input></input>").attr("type", "hidden").addClass("on2");
                        $(".tAbsence"+childID).append(on2);
                      } else{
                        var on = $("<input></input>").attr("type", "hidden").addClass("on");
                        $(".tAbsence"+childID).append(on);
                      }
                    }



                    // 출석버튼 클릭
                    $(".tAttendance"+childID).unbind("click").bind("click", function(){
                      // attendanceInfo[i] = "출석";
                      // alert("선택한 원아는 " + childID + "이며, " + attendanceInfo[i]);
                      $(".tAttendance"+childID).empty();
                      $("<p></p>").text('出席').appendTo(".tAttendance"+childID);
                      $(".tAttendance"+childID).css({
                        "border" : "2px solid white",
                        "background-color":"#00B1F2"
                      });
                      // var on = $("<input></input>").attr("type", "hidden").addClass("tAttendanceOn"+childID);
                      var on = $("<input></input>").attr("type", "hidden").addClass("on");
                      $(".tAttendance"+childID).append(on);



                      $(".tEarlyLeave"+childID).empty();
                      $("<p></p>").text('早退').appendTo(".tEarlyLeave"+childID);
                      $(".tEarlyLeave"+childID).css({
                        "border" : "2px solid gold",
                        "background-color":"white"
                      });


                      $(".tAbsence"+childID).empty();
                      $("<p></p>").text('欠席').appendTo(".tAbsence"+childID);
                      $(".tAbsence"+childID).css({
                        "border" : "2px solid #FF48FF",
                        "background-color":"white"
                      });
                    });

                    // 조퇴버튼 클릭
                    $(".tEarlyLeave"+childID).unbind("click").bind("click", function(){
                      // attendanceInfo[i] = "조퇴";
                      // alert("선택한 원아는 " + childID + "이며, " + attendanceInfo[i]);
                      $(".tAttendance"+childID).empty();
                      $("<p></p>").text('出席').appendTo(".tAttendance"+childID);
                      $(".tAttendance"+childID).css({
                        "border" : "2px solid #00B1F2",
                        "background-color":"white"
                      });

                      $(".tEarlyLeave"+childID).empty();
                      $("<p></p>").text('早退').appendTo(".tEarlyLeave"+childID);
                      $(".tEarlyLeave"+childID).css({
                        "border" : "2px solid white",
                        "background-color":"gold"
                      });
                      // var on = $("<input></input>").attr("type", "hidden").addClass("tEarlyLeaveOn"+childID);
                      var on = $("<input></input>").attr("type", "hidden").addClass("on");
                      $(".tEarlyLeave"+childID).append(on);


                      $(".tAbsence"+childID).empty();
                      $("<p></p>").text('欠席').appendTo(".tAbsence"+childID);
                      $(".tAbsence"+childID).css({
                        "border" : "2px solid #FF48FF",
                        "background-color":"white"
                      });

                    });

                      // 결석버튼 클릭
                    $(".tAbsence"+childID).unbind("click").bind("click", function(){
                      // attendanceInfo[i] = "결석";
                      // alert("선택한 원아는 " + childID + "이며, " + attendanceInfo[i]);
                      $(".tAttendance"+childID).empty();
                      $("<p></p>").text('出席').appendTo(".tAttendance"+childID);
                      $(".tAttendance"+childID).css({
                        "border" : "2px solid #00B1F2",
                        "background-color":"white"
                      });


                      $(".tEarlyLeave"+childID).empty();
                      $("<p></p>").text('早退').appendTo(".tEarlyLeave"+childID);
                      $(".tEarlyLeave"+childID).css({
                        "border" : "2px solid gold",
                        "background-color":"white"
                      });


                      $(".tAbsence"+childID).empty();
                      $("<p></p>").text('欠席').appendTo(".tAbsence"+childID);
                      $(".tAbsence"+childID).css({
                        "border" : "2px solid white",
                        "background-color":"#FF48FF"
                      });
                      // var on = $("<input></input>").attr("type", "hidden").addClass("tAbsenceOn"+childID);
                      var on = $("<input></input>").attr("type", "hidden").addClass("on");
                      $(".tAbsence"+childID).append(on);
                    });
                  // $(".tAttendance"+childID).unbind("click").bind("click",function(){
                  //   alert("클릭한 원아는 : " + childID + " 이며, 출석버튼이다.");
                  // });

                  // 모두출석 버튼클릭
                  $("#allCheckBtn").unbind("click").bind("click", function(){
                    for(var i = firstChildID; i < lastChildID; i++){

                      // 학부모가 등록한 출석정보라면 수정하지 않음 (1회만 수정을 피함)
                      if($(".tAttendance"+i).children().hasClass("on2") == true
                          || $(".tEarlyLeave"+i).children().hasClass("on2") == true
                          || $(".tAbsence"+i).children().hasClass("on2") == true){
                            // $(".tAttendance"+i).empty();
                            // $(".tEarlyLeave"+i).empty();
                            // $(".tAbsence"+i).empty();
                            // $("<p></p>").text('出席').appendTo(".tAttendance"+i);
                            // $("<p></p>").text('早退').appendTo(".tEarlyLeave"+i);
                            // $("<p></p>").text('欠席').appendTo(".tAbsence"+i);

                          }

                      else{
                          $(".tAttendance"+i).css({
                            "border" : "2px solid white",
                            "background-color":"#00B1F2"
                          });

                          $(".tAttendance"+i).empty();
                          $("<p></p>").text('出席').appendTo(".tAttendance"+i);
                          var on = $("<input></input>").attr("type", "hidden").addClass("on");
                          $(".tAttendance"+i).append(on);



                          $(".tEarlyLeave"+i).css({
                            "border" : "2px solid gold",
                            "background-color":"white"
                          });

                          $(".tEarlyLeave"+i).empty();
                          $("<p></p>").text('早退').appendTo(".tEarlyLeave"+i);

                          $(".tAbsence"+i).css({
                            "border" : "2px solid #FF48FF",
                            "background-color":"white"
                          });

                          $(".tAbsence"+i).empty();
                          $("<p></p>").text('欠席').appendTo(".tAbsence"+i);


                      }


                        //  학부모가 출석을 눌러놓은 상태일때
                      if($(".tAttendance"+i).children().hasClass("on2") === true){
                        $(".tAttendance"+i).css({
                          "border" : "2px solid white",
                          "background-color":"#00B1F2"
                        });

                        $(".tEarlyLeave"+i).css({
                          "border" : "2px solid gold",
                          "background-color":"white"
                        });
                        $(".tAbsence"+i).css({
                          "border" : "2px solid #FF48FF",
                          "background-color":"white"
                        });
                      }
                      else{
                          $(".tAttendance"+i).css({
                            "border" : "2px solid white",
                            "background-color":"#00B1F2"
                          });

                          // $(".tAttendance"+i).empty();
                          // $("<p></p>").text('出席').appendTo(".tAttendance"+i);

                      }


                        // 학부모가 조퇴를 눌러놓은 상태일때
                      if($(".tEarlyLeave"+i).children().hasClass("on2") === true){
                        $(".tAttendance"+i).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });

                        $(".tEarlyLeave"+i).css({
                          "border" : "2px solid white",
                          "background-color":"gold"
                        });
                        $(".tAbsence"+i).css({
                          "border" : "2px solid #FF48FF",
                          "background-color":"white"
                        });
                      }
                      else{
                          $(".tAttendance"+i).css({
                            "border" : "2px solid white",
                            "background-color":"#00B1F2"
                          });

                          $(".tEarlyLeave"+i).css({
                            "border" : "2px solid gold",
                            "background-color":"white"
                          });

                          // $(".tEarlyLeave"+i).empty();
                          // $("<p></p>").text('早退').appendTo(".tEarlyLeave"+i);
                      }

                        // 학부모가 결석을 눌러놓은 상태일때
                      if($(".tAbsence"+i).children().hasClass("on2") == true){
                        $(".tAttendance"+i).css({
                          "border" : "2px solid #00B1F2",
                          "background-color":"white"
                        });

                        $(".tEarlyLeave"+i).css({
                          "border" : "2px solid gold",
                          "background-color":"white"
                        });
                        $(".tAbsence"+i).css({
                          "border" : "2px solid white",
                          "background-color":"#FF48FF"
                        });
                      }
                      else{
                        $(".tAbsence"+i).css({
                          "border" : "2px solid #FF48FF",
                          "background-color":"white"
                        });

                        // $(".tAbsence"+i).empty();
                        // $("<p></p>").text('欠席').appendTo(".tAbsence"+i);
                      }


                          // var on = $("<input></input>").attr("type", "hidden").addClass("tAttendanceOn"+i);

                          // var on = $("<input></input>").attr("type", "hidden").addClass("on");
                          // $(".tAttendance"+i).append(on);

                      }
                });




                    // 완료 버튼클릭
                    $("#tAttendanceSaveBtn").unbind("click").bind("click", function(){
                      var childNumArray = new Array();  // [원아ID, 작성자, 출석값]
                      var attendanceData = new Array();
                      var index = 0;

                      for(var i = firstChildID; i < lastChildID; i++){
                        if($(".tAttendance"+i).children().hasClass("on") === true){
                          childNumArray[index] = i;
                          attendanceData[index] = 1;
                          // alert(i+"번째 아이는 " + '출석 ' + attendanceData[index]);
                          // index++;
                        }

                        if($(".tEarlyLeave"+i).children().hasClass("on") === true){
                          childNumArray[index] = i;
                          attendanceData[index] = 2;
                          // alert(i+"번째 아이는 " + '조퇴 ' + attendanceData[index]);
                          // index++;
                        }

                        if($(".tAbsence"+i).children().hasClass("on") === true){
                          childNumArray[index] = i;
                          attendanceData[index] = 3;
                          // alert(i+"번째 아이는 " + '결석 ' + attendanceData[index]);
                        }
                        index++;
                      }

                      $.ajax({
                        url:"http://japan-okyo.c9users.io/mobile/setAttendanceCheckT.php",
                        data:{
                          childNumArray: childNumArray,
                          uploader: 2,
                          attendanceData: attendanceData
                        },
                        dataType:"jsonp",
                        success:function(data){
                          alert('出席の情報を登録しました。');
                          allHide();

                          $('#tLoginTop').show();
                          $('#sideMenuListDiv').hide();
                          $('#teacherMain').show();
                        },
                        error:function(){
                          alert('サーバーからのエラーが発生しました。');
                        }
                      });
                    });

                    $("#tAttendanceCancelBtn").unbind("click").bind("click", function(){

                      allHide();

                      $('#tLoginTop').show();
                      $('#sideMenuListDiv').hide();
                      $('#teacherMain').show();
                    });
                }(childID));
              }
            },
            error:function(){
              alert('出席の情報が読めません。');
            }
          });



        }
      /////////////////////////////

      // // 모두출석 버튼클릭
      // $("#allCheckBtn").unbind("click").bind("click", function(){
      //   $(".tAttendance").css({
      //     "border" : "2px solid white",
      //     "background-color":"#00B1F2"
      //   });
      //   $(".tEarlyLeave").css({
      //     "border" : "2px solid gold",
      //     "background-color":"white"
      //   });
      //   $(".tAbsence").css({
      //     "border" : "2px solid #FF48FF",
      //     "background-color":"white"
      //   });
      // });

      // // 완료 버튼클릭
      // $("#tAttendanceSaveBtn").unbind("click").bind("click", function(){
      //   alert('완료 클릭');
      // });

    });

    // 발달체크 항목편집 클릭




      ///////////////////////////////////   ↑ 교사버전 //////////////////////////////////////////////////////
      ///////////////////////      ---------- 구분선 ----------      ////////////////////////////////////////
      //////////////////////////////////   ↓ 학부모버전//////////////////////////////////////////////////////

      // 학부모 로그아웃
      $("#plogoutBtn").unbind("click").bind("click", function(){
        // allHide();
        // $("#tLoginTop").hide();
        // $('#pLoginTop').hide();
        //
        // $('#notLoginTop').show();
        // $('#notLoginView').show();
        // $("#notLogin").show();

        var logout = confirm('ログアウトしますか');
            if(logout == true){
              allHide();
              loginViewOpen();
            }

      });

      // 상단 클릭 (메인으로 돌아가기)
      $('#pTop').find('#pImgLogo').unbind("click").bind("click", function(){
        // allHide();
        // $('#pLoginTop').show();
        // $('#pSideMenuListDiv').hide();
        // $('#parentMain').show();


        // var logout = confirm('로그아웃 하시겠습니까?');
        // if(logout == true){
        //   allHide();
        //   loginViewOpen();
        // }

        allHide();

        $('#pLoginTop').show();
        $('pSideMenuListDiv').hide();
        $('#parentMain').show();


      });
      $('#pTop').find('#pTextLogo').unbind("click").bind("click", function(){
        allHide();

        $('#pLoginTop').show();
        $('pSideMenuListDiv').hide();
        $('#parentMain').show();
      });

      // 원아 선택화면
      function pselectChildView(pBox){
        allHide();
        $('#pLoginTop').show();
        $('#childSelectBox2').show();
        $('#childSelect2').empty();

        $.ajax({
                url:"http://japan-okyo.c9users.io/mobile/getChildrens.php",
            data:{
              user_num: user_num,
              user_name: user_name
            },
            dataType:"jsonp",
            success:function(data){
                //성공
                if(data.result == "success"){
                    var cnt = data.data.length;

                    for(var i = 0; i < cnt ; i++){
                        childID        = data.data[i].childNum;
                        imageName = data.data[i].imageName;
                        childName = data.data[i].childName;
                        // var imageComment = data.data[i].imageComment;


                        var imgs = $("<img />").addClass("imageName"+childID).attr("src", "http://japan-okyo.c9users.io/img/child/"+imageName);
                        var names = $("<p></p>").addClass("childName"+childID).text(childName);
                        var namesDiv = $("<div></div>").addClass("childNameDiv"+childID).append(names);

                        $("<div></div>").addClass('selectImgAndName'+childID).appendTo("#childSelect2");
                        $("<div></div>").addClass("imageDiv").append(imgs).appendTo(".selectImgAndName"+childID);
                        $("<div></div>").addClass("NameDiv").append(namesDiv).appendTo(".selectImgAndName"+childID);


                        // 기존 최종발표 시 사용했던 원아선택 바로 실행
                        /*
                        if(pBox == "pbox1"){
                          var newDate = new Date();

                          var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

                          if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
                            var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
                          } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
                            var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
                          } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
                            var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
                          } else{
                            var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
                          }

                          // var explodeDateValue = dateValue.split("-");
                          // var dateString = explodeDateValue[0] + " - " + explodeDateValue[1] + " - " + explodeDateValue[2];
                          $('#pIChSelectChildPanel').hide();

                          pICheck(childID, imageName, childName, dateValue);
                        }
                        */
                        var newDate = new Date();

                        var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

                        if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
                          var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
                        } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
                          var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
                        } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
                          var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
                        } else{
                          var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
                        }

                        // var explodeDateValue = dateValue.split("-");
                        // var dateString = explodeDateValue[0] + " - " + explodeDateValue[1] + " - " + explodeDateValue[2];
                        $('#pIChSelectChildPanel').hide();
                        switch (pBox) {
                          case "pbox1":
                            pICheck(childID, imageName, childName, dateValue);
                            break;
                          case "pbox2":
                            pAttendanceCheck(childID, imageName, childName);
                            break;
                          case "pbox3":
                            pShowAlbum(childID, imageName, childName, 1);
                            break;
                          case "pbox4":
                            // alert('준비중');
                            break;
                          default:

                        }


                      //    else{
                      //
                      //     (function(childID){
                      //
                      //     $(".selectImgAndName"+childID).unbind("click").bind("click",function(){
                      //
                      //
                      //
                      //           switch (pBox) {
                      //             // 알림장 확인
                      //             case "pbox1":
                      //               var newDate = new Date();
                      //
                      //               var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
                      //
                      //               if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
                      //                 var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
                      //               } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
                      //                 var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
                      //               } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
                      //                 var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
                      //               } else{
                      //                 var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
                      //               }
                      //
                      //               // var explodeDateValue = dateValue.split("-");
                      //               // var dateString = explodeDateValue[0] + " - " + explodeDateValue[1] + " - " + explodeDateValue[2];
                      //               $('#pIChSelectChildPanel').hide();
                      //
                      //               pICheck(childID, imageName, childName, dateValue);
                      //               break;
                      //
                      //             // 출석 확인
                      //             case "pbox2":
                      //               pAttendanceCheck(childID, imageName, childName);
                      //               break;
                      //
                      //             // 앨범 확인
                      //             case "pbox3":
                      //             pShowAlbum(childID, imageName, childName, 1);
                      //               break;
                      //
                      //             // 자녀정보 확인
                      //             case "pbox4":
                      //             alert('pbox4');
                      //               break;
                      //
                      //             default:
                      //               alert("default");
                      //           }
                      //
                      //
                      //     });
                      //
                      //   }(childID));
                      //
                      //
                      // }


                    }

                    if(cnt == 0)
                        $("<p></p>").text("アップロードのイメージがありません。").appendTo("#selectImgAndName1");
                }
                //오류
                else {
                    window.alert("エラーが発生しました。");
                }
            }, error: function(){
                window.alert("サーバーからのエラーが発生しました。");
            }
        });
        $('#childSelect2').show();
      }

      // 알림장 확인 클릭
      $('#pbox1').unbind("click").bind("click", function(){
        var whatIsBox = "pbox1";
        pselectChildView(whatIsBox);
      });

      // 알림장 확인



      $("#pIChSelectChildPanel").hide();
      // I-Check
      var reDateValue;
      function pICheck(childID, imageName, childName, dateValue){
        reChildID = childID;
        allHide();
        $('#pICheck').show();
        $('#pICheckMain').show();
        $('#pModeBtns').show();

        // 달력
        var explodeDateValue = dateValue.split("-");
        var dateString = explodeDateValue[0] + " - " + explodeDateValue[1] + " - " + explodeDateValue[2];

        $(".pDateValueP").text(dateString);
        $(".datepicker").datepicker({
                // buttonImage: './img/calendar.png',
                buttonImage: './img/calendar.png',
                buttonImageOnly: true,
                 dateFormat: 'yy - mm - dd',
                // changeMonth: true,
                changeYear: true,

                // nextText: '다음 달', // next 아이콘의 툴팁.
                // prevText: '이전 달',
                showOn: 'both',
                showButtonPanel: true,  // 달력아래 버튼 패널
                // currentText : 'Today',
                closeText:'Close',       // 버튼패널 중 닫기 텍스트 정의
                duration: "slow" ,      // 속도

                // 달력 OPEN시 위치
                beforeShow: function (input, inst) {
                    setTimeout(function () {
                        inst.dpDiv.css({
                            top: 65,
                            left: 58
                            // top: 125,
                            // left: 2,
                            // width:340,
                        });
                    }, 0);
                },

                // 달력에서 선택한 값을 변수에 저장
                onSelect: function(value) {
                  var explodeValue = value.split(" - ");
                  dateValue = explodeValue[0]+"-"+explodeValue[1]+"-"+explodeValue[2];
                  reDateValue = dateValue;
                    // alert('데이트피커 : '+ dateValue);

                  // alert(value);


                  $(".pDateValueP").empty();
                  $(".pDateValueP").text(value);

                  var valueP = $(".pDateValueP").text();

                  if($("#pModeContents").children().hasClass("pNotification_div") === true){
                    // alert('알림내용');
                    pNotification(dateValue, reChildID);
                  }

                  if($("#pModeContents").children().hasClass("pDevelopGraph_div2") === true){
                    // alert('발달사항');
                    pDevelopGraph(dateValue, reChildID);
                  }

                  if($("#pModeContents").children().hasClass("pSignificant_div") === true){
                    // alert('특이사항');
                    pSignificant(dateValue, reChildID);
                  }
                }
        });


        // ㅁㄴㅇㄹ3
        //
        // $("#pIChSelectChild").unbind("click").bind("click", function(){
        //          $("#pIChSelectChildPanel").toggle("slide",{direction:"left"},350,null);
        //
        //          $('#pIChSelectChildList').empty();
        //
        //          // 슬라이드 원아목록에 원아리스트 불러오기
        //          $.ajax({
        //              url:"http://japan-okyo.c9users.io/mobile/getChildrens.php",
        //              // url:"http://japan-okyo.c9users.io/mobile/mTest.php",
        //              data:{
        //                user_num: user_num,
        //                user_name : user_name
        //              },
        //              dataType:"jsonp",
        //              success:function(data){
        //                  //성공
        //                  if(data.result == "success"){
        //                      var cnt = data.data.length;
        //
        //                      for(var i = 0; i < cnt ; i++){
        //                          var childID   = data.data[i].childNum;
        //                          var imageName = data.data[i].imageName;
        //                          var childName = data.data[i].childName;
        //                          var imageComment = data.data[i].imageComment;
        //
        //                          var imgs = $("<img />").addClass("imageNamePiCh imageNamePiCh"+childID).attr("src", "http://japan-okyo.c9users.io/img/child/"+imageName);
        //                          var names = $("<p></p>").addClass("childNamePiCh childNamePiCh"+childID).text(childName);
        //                          var namesDiv = $("<div></div>").addClass("childNameDivPiCh childNameDivPiCh"+childID).append(names);
        //
        //                          $("<div></div>").addClass('selectImgAndNamePiCh selectImgAndNamePiCh'+childID).appendTo("#pIChSelectChildList");
        //                          $("<div></div>").addClass("imageDivPiCh").append(imgs).appendTo(".selectImgAndNamePiCh"+childID);
        //                          $("<div></div>").addClass("NameDivPiCh").append(namesDiv).appendTo(".selectImgAndNamePiCh"+childID);
        //
        //                          (function(childID, imageName, childName){
        //
        //                          $(".selectImgAndNamePiCh"+childID).unbind("click").bind("click",function(){
        //
        //                               if(reDateValue == undefined){
        //                                 // alert('원아변경 시 ' + dateValue);
        //                                 pICheck(childID, imageName, childName, dateValue);
        //                               } else{
        //                                 dateValue = reDateValue;
        //                                 // alert('원아변경 시 ' + dateValue);
        //                                 pICheck(childID, imageName, childName, dateValue);
        //                               }
        //
        //                              $("#pIChSelectChildPanel").toggle("slide",{direction:"left"},350,null);
        //                          });
        //                        }(childID, imageName, childName));
        //                      }
        //
        //                      if(cnt == 0)
        //                          $("<p></p>").text("업로드 된 이미지가 없습니다.").appendTo("#selectImgAndName1");
        //                  }
        //                  //오류
        //                  else {
        //                      window.alert("오류가 발생하였습니다.");
        //                  }
        //
        //
        //
        //              }, error: function(){
        //                  window.alert("서버 접속 오류가 발생하였습니다.");
        //              }
        //          });
        //      });
        //
        //      $("#pIChSelectChildPanelCloseBtn").unbind("click").bind("click", function(){
        //          $("#pIChSelectChildPanel").toggle("slide",{direction:"left"},350,null);
        //      });
        //
        //

        pNotification(dateValue, reChildID);
        $("#pICheck_Notification_btn2").css({
          "background-color":"#FF5E00"
        });
        $("#pICheck_DevelopGraph_btn2").css({
          "background-color":"#FFCA6C"
        });
        $("#pICheck_Significant_btn2").css({
          "background-color":"#FFCA6C"
        });


        var cnt;
        // 선택한 원아 이름, 이미지 출력

        $('#pICheck_childBox_div').empty();

        var imgs = $("<img />").attr("src","http://japan-okyo.c9users.io/img/child/"+imageName);
        var names = $("<p></p>").text(childName);

        $("<div></div>").addClass("pICheck_childBox").appendTo("#pICheck_childBox_div");
        var imgsDiv = $("<div></div>").addClass("pICheck_imgsDiv").appendTo(".pICheck_childBox");
        var namesDiv = $("<div></div>").addClass("pICheck_namesDiv").appendTo(".pICheck_childBox");
        imgsDiv.append(imgs);
        namesDiv.append(names);

        // 모드 버튼들
          // 알림내용 버튼 클릭
        $("#pICheck_Notification_btn").unbind("click").bind("click", function(){
          pNotification(dateValue, reChildID);
          $("#pICheck_Notification_btn2").css({
            "background-color":"#FF5E00"
          });
          $("#pICheck_DevelopGraph_btn2").css({
            "background-color":"#FFCA6C"
          });
          $("#pICheck_Significant_btn2").css({
            "background-color":"#FFCA6C"
          });
        });

          // 발달사항 버튼 클릭
        $("#pICheck_DevelopGraph_btn").unbind("click").bind("click", function(){
          pDevelopGraph(dateValue, reChildID);
          $("#pICheck_Notification_btn2").css({
            "background-color":"#FFCA6C"
          });
          $("#pICheck_DevelopGraph_btn2").css({
            "background-color":"#FF5E00"
          });
          $("#pICheck_Significant_btn2").css({
            "background-color":"#FFCA6C"
          });
        });

          // 특이사항 버튼 클릭
        $("#pICheck_Significant_btn").unbind("click").bind("click", function(){
          pSignificant(dateValue);
          $("#pICheck_Notification_btn2").css({
            "background-color":"#FFCA6C"
          });
          $("#pICheck_DevelopGraph_btn2").css({
            "background-color":"#FFCA6C"
          });
          $("#pICheck_Significant_btn2").css({
            "background-color":"#FF5E00"
          });

        });

        //  알림내용 모드 컨텐츠 보여주기
        function pNotification(ReDateValue, reChildID){
          childID = reChildID;
          dateValue = ReDateValue;

          $("#pModeContents").empty();

          // 댓글보기 버튼
          var pShowCommentsBtn = $("<div></div>").addClass("pShowCommentsBtn").appendTo("#pModeContents");
          $("<p>コ</p>").appendTo(pShowCommentsBtn);
          $("<p>メ</p>").appendTo(pShowCommentsBtn);
          $("<p>ン</p>").appendTo(pShowCommentsBtn);
          $("<p>ト</p>").appendTo(pShowCommentsBtn);


          // 알림내용의 댓글 div
          $("<div></div>").addClass("pNotification_commentsDiv").appendTo("#pModeContents");
          $("<div></div>").attr("id", "pViewUploadedComment_div").addClass("pViewUploadedComment_div").appendTo(".pNotification_commentsDiv");
          $("<div></div>").addClass("pUploadComment_div").appendTo(".pNotification_commentsDiv");
          $("<p></p>").text("作成").appendTo(".pUploadComment_div");
          $(".pNotification_commentsDiv").hide();





          // 댓글보기 버튼 클릭 시
          $(".pShowCommentsBtn").unbind("click").bind("click", function(){
            // 댓글창 나타내기
            // $(".pNotification_commentsDiv").slideUp(500);
             $(".pNotification_commentsDiv").slideToggle(500, pShowComments(childID, dateValue));

            // 알림내용의 댓글작성 버튼 클릭
            $('.pUploadComment_div').unbind("click").bind("click", function(){
              var newDate = new Date();
              // var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
              //
              // if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 2){
              //   var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
              // } else if(( (newDate.getMonth() + 1)+"" ).length == 2 && ( newDate.getDate()+"").length == 1){
              //   var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
              // } else if(( (newDate.getMonth() + 1)+"" ).length == 1 && ( newDate.getDate()+"").length == 1){
              //   var dateValue = newDate.getFullYear() + "-0" + (newDate.getMonth() + 1) + "-0" + newDate.getDate();
              // } else{
              //   var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
              // }
              var timeValue = newDate.getHours() + ":" +
                              newDate.getMinutes() + ":" +
                              newDate.getSeconds();


              var comment = prompt('コメントを入力してください。');
              $.ajax({
                dataType:'jsonp',
                data: {
                  childID: childID,
                  user_num: user_num,
                  textMemo: comment,
                  dateValue: dateValue,
                  timeValue: timeValue,
                  memoCategory : 2, // 1 -> 알림장내용 / 2 -> 알림장의 댓글  / 3 -> 특이사항  / 4 -> 단순메모
                  memoType : 1  // 1 -> 글씨  /  2 -> 그림
                },
                  url:'http://japan-okyo.c9users.io/mobile/setMemo.php',
                 success:function(result){
                    $('.pViewUploadedComment_div').empty();
                   pShowComments(childID, dateValue);
                 }, error:function(){
                  //  alert('실패');
                 }

              });
            });



          });

          // 알림내용 div
          var ndTitle = $("<div></div>").addClass("pNotification_divTitle").appendTo("#pModeContents");
          ndTitle.append("<p>発育日誌お知らせ</p>");
          $("<div></div>").addClass("pNotification_div").appendTo("#pModeContents");


          $.ajax({
            dataType:"jsonp",
            data:{
              childID: childID,
              user_num: user_num,
              dateValue: dateValue,
              memoCategory : 1,      // 1 -> 알림장내용 / 2 -> 알림장의 댓글  / 3 -> 특이사항  / 4 -> 단순메모
              memoType : 1  // 1 -> 글씨  /  2 -> 그림
              },
              url:'http://japan-okyo.c9users.io/mobile/getMemo.php',
            success:function(data){
              $(".pNotification_div").show();
              $(".pNotification_textTitleDiv1").show();
              $(".pNotification_imageDiv1").show();
              $(".pNotification_textDiv1").show();


              var title = data.data0;
              if(title === null){
                title = "";

                // $(".pNotification_textTitleDiv1").css({"border":"1px solid blue"});
              }
              var cnt1 = data.data1.length;   // 알림장내용 있는지 판별
              var cnt2 = data.data2.length;


              ///////
                var commentIndex = data.data1.length;
                commentIndex = commentIndex - 1;
              //////
              // $("<div></div>").addClass("pNotification_imageDiv1").appendTo(".pNotification_div");
              // 알림장 내용, 알림장 사진  이 없음
              if(cnt1 < 1 && cnt2 < 1){
                      // 알림장보기 사진들어갈 공간

                      // 알림장보기 제목들어갈 공간
                      $("<div></div>").addClass("pNotification_textTitleDiv1").appendTo(".pNotification_div");
                      $("<pre></pre>").text(title).addClass("pNotification_pre").appendTo(".pNotification_textTitleDiv1");

                      $("<div></div>").addClass("pNotification_imageDiv1").appendTo(".pNotification_div");
                      $("<img />").attr("src", "./img/noImg.png").addClass("pNotification_imageDiv1Img").appendTo(".pNotification_imageDiv1");



                      // 알림장보기 글씨들어갈 공간
                      $("<div></div>").addClass("pNotification_textDiv1").appendTo(".pNotification_div");
                      // $("<pre></pre>").text('알림장 작성란').addClass("pNotification_pre").appendTo(".pNotification_textDiv1");
                      $("<pre></pre>").addClass("pNotification_pre").appendTo(".pNotification_textDiv1");

              // 알림장 내용은 없는데, 사진은 있음
              } else if(cnt1 < 1 && cnt2 > 0){

                      // 알림장보기 제목들어갈 공간
                      $("<div></div>").addClass("pNotification_textTitleDiv1").appendTo(".pNotification_div");
                      $("<pre></pre>").text(title).addClass("pNotification_pre").appendTo(".pNotification_textTitleDiv1");

                      $("<div></div>").addClass("pNotification_imageDiv1").appendTo(".pNotification_div");
                      for(var i = 0; i < cnt2; i++){
                        // 알림장보기 사진들어갈 공간
                        var img = $("<img />").attr("src", "http://japan-okyo.c9users.io/img/album/childID_"+childID+"/"+data.data2[i].photoName).addClass("pNotification_imageDiv1Img pNotification_imageDiv1Img_"+i);
                        $(".pNotification_imageDiv1").append(img);
                      }
                      // 알림장보기 글씨들어갈 공간
                      $("<div></div>").addClass("pNotification_textDiv1").appendTo(".pNotification_div");
                      $("<pre></pre>").addClass("pNotification_pre").appendTo(".pNotification_textDiv1");

              // 알림장 내용은 있는데, 사진은 없음
              } else if(cnt1 > 0 && cnt2 < 1){
                      // 알림장보기 사진들어갈 공간

                      // 알림장보기 제목들어갈 공간
                      $("<div></div>").addClass("pNotification_textTitleDiv1").appendTo(".pNotification_div");
                      $("<pre></pre>").text(title).addClass("pNotification_pre").appendTo(".pNotification_textTitleDiv1");

                      $("<div></div>").addClass("pNotification_imageDiv1").appendTo(".pNotification_div");
                      $("<img />").attr("src", "./img/noImg.png").addClass("pNotification_imageDiv1Img").appendTo(".pNotification_imageDiv1");

                      // 알림장보기 글씨들어갈 공간
                      $("<div></div>").addClass("pNotification_textDiv1").appendTo(".pNotification_div");
                      // $("<pre></pre>").text(data.data1[commentIndex].comment).addClass("pNotification_pre").appendTo(".pNotification_textDiv1");
                      $("<div>"+data.data1[commentIndex].comment+"</div>").addClass("pNotification_pre").appendTo(".pNotification_textDiv1");

              // 알림장 내용, 사진 둘다 있음
              } else if(cnt1 > 0 && cnt2 > 0){

                    // 알림장보기 제목들어갈 공간
                    $("<div></div>").addClass("pNotification_textTitleDiv1").appendTo(".pNotification_div");
                    $("<pre></pre>").text(title).addClass("pNotification_pre").appendTo(".pNotification_textTitleDiv1");

                    $("<div></div>").addClass("pNotification_imageDiv1").appendTo(".pNotification_div");
                    for(var i = 0; i < cnt2; i++){
                      // 알림장보기 사진들어갈 공간
                      var img = $("<img />").attr("src", "http://japan-okyo.c9users.io/img/album/childID_"+childID+"/"+data.data2[i].photoName).addClass("pNotification_imageDiv1Img pNotification_imageDiv1Img_"+i);
                      $(".pNotification_imageDiv1").append(img);
                    }


                    // 알림장보기 글씨들어갈 공간
                    $("<div></div>").addClass("pNotification_textDiv1").appendTo(".pNotification_div");
                    // $("<pre></pre>").text(data.data1[commentIndex].comment).addClass("pNotification_pre").appendTo(".pNotification_textDiv1");
                    $("<div>"+data.data1[commentIndex].comment+"</div>").addClass("pNotification_pre").appendTo(".pNotification_textDiv1");
                  }


                  // 작성버튼 클릭할 시.
                  // $(".pNotification_createBtn").unbind("click").bind("click", function(){
                  //
                  //   textTitle = $(".pNotification_textTitleDiv1").text();
                  //   textMemo = $(".pNotification_textDiv1").text();
                  //
                  //   // 댓글보기버튼 숨기기
                  //   $(".pShowCommentsBtn").hide();
                  //
                  //   // 좌측 버튼들 소환
                  //   $(".pNotification_showTextMemoBtn").show();
                  //   $(".pNotification_showImageMemoBtn").show();
                  //   $(".pNotification_showAddAlbumBtn").show();
                  //
                  //   $(".pNotification_textTitleDiv1").hide();
                  //   $(".pNotification_textDiv1").hide();
                  //   $(".pNotification_imageDiv1").hide();
                  //
                  //   $(".pNotification_textTitleDiv2").show();
                  //   $(".pNotification_textDiv2").show();
                  //   $(".pNotification_imageDiv2").show();
                  //
                  //   $(".pNotification_saveBtn").show();
                  //   $(".pNotification_createBtn").hide();
                  //
                  //   $(".pNotification_textDiv1").empty();
                  //
                  //   // $("<textarea></textarea>").text(textTitle).attr("wrap", "hard").addClass("pNotification_textTitlearea").appendTo(".pNotification_textDiv2");
                  //   $("<textarea></textarea>").text(textMemo).attr("wrap", "hard").addClass("pNotification_textarea").appendTo(".pNotification_textDiv2");
                  //
                  //   (function(photoId, childId, photoName, i){
                  //
                  //
                  //
                  //   /*
                  //
                  //     $(".pNotification_imageDiv2").unbind("click").bind("click", function(){
                  //
                  //       // 사진이 들어있을 때만 클릭 시 삭제확인 메시지 출력
                  //       if($(".pNotification_imageDiv2").children().hasClass("pNotification_imageDiv2Img")){
                  //         var YesOrNo = confirm("삭제?");
                  //       }
                  //
                  //
                  //         if(YesOrNo){
                  //           // $(".pNotification_imageDiv2").empty();
                  //
                  //             $(".AddAlbum"+photoId).unbind("click").bind("click",function(){
                  //
                  //
                  //
                  //             });
                  //
                  //
                  //
                  //         } else{
                  //         }
                  //     });
                  //     */
                  //
                  //   }(photoId, childID, photoName, i));
                  //
                  // }); // 작성버튼 end


            },
            error:function(){
              alert('サーバーからのエラーが発生しました。');
            }

          })


          // 처음엔 보기  를 보여주고
          $(".pNotification_textDiv1").show();
          $(".pNotification_textDiv1").show();
          $(".pNotification_imageDiv1").show();

          // 작성을 숨긴다
          $(".pNotification_textDiv2").hide();
          $(".pNotification_imageDiv2").hide();

        }
        function pNotificationReload(dateValue){
          pNotification(dateValue, reChildID);
        }

        //  발달그래프 모드 컨텐츠 보여주기
        function pDevelopGraph(dateValue, reChildID){
          childID = reChildID;
          $("#pModeContents").empty();
          $("<div></div>").addClass("pDevelopGraph_div1").appendTo("#pModeContents");
          $("<div></div>").addClass("pDevelopGraph_div2").appendTo("#pModeContents");
          $("<p></p>").text('授業 評価項目').appendTo(".pDevelopGraph_div1").addClass("pDevelopGraphTitleText");


          var explodeValue = dateValue.split("-");


          developValueYear = explodeValue[0];
          developValueMonth = explodeValue[1];
          developValueDay = explodeValue[2];

          switch (developValueMonth) {
            case "01":
            developValueMonthText = "jan";
              break;
            case "02":
            developValueMonthText = "feb";
              break;
            case "03":
            developValueMonthText = "mar";
              break;
            case "04":
            developValueMonthText = "apr";
              break;
            case "05":
            developValueMonthText = "may";
              break;
            case "06":
            developValueMonthText = "jun";
              break;
            case "07":
            developValueMonthText = "jul";
              break;
            case "08":
            developValueMonthText = "aug";
              break;
            case "09":
            developValueMonthText = "sep";
              break;
            case "10":
            developValueMonthText = "oct";
              break;
            case "11":
            developValueMonthText = "nov";
              break;
            case "12":
            developValueMonthText = "dec";
              break;
            default:

          }



          $.ajax({
            dataType:"jsonp",
            data:{
              childID: childID,
              user_num: user_num,
              dateValue: dateValue,
              developValueYear: developValueYear,
              developValueMonthText: developValueMonthText,
              developValueDay: developValueDay,
              position: "parents"
            },

            url:"http://japan-okyo.c9users.io/mobile/getAssessed.php",
            success:function(data){

              // 쿼리결과 행 갯수
              var cnt1 = data.data1.length;
              var cnt2 = data.data2.length;


              $(".pValueGraphDiv1").empty();
              $(".pValueGraphDiv2").empty();
              pValueGraphDiv1Open();

              // 평가그래프 보기 버튼
              var pValueGraphDiv1Btn = $("<div></div>").addClass("pValueGraphDiv1Btn").appendTo("#pModeContents");
              $("<p></p>").text('評').appendTo(pValueGraphDiv1Btn);
              $("<p></p>").text('価').appendTo(pValueGraphDiv1Btn);
              $("<p></p>").text('グ').appendTo(pValueGraphDiv1Btn);
              $("<p></p>").text('ラ').appendTo(pValueGraphDiv1Btn);
              $("<p></p>").text('フ').appendTo(pValueGraphDiv1Btn);


              // 평가그래프 보기 버튼 클릭 시
              $(".pValueGraphDiv1Btn").unbind("click").bind("click", function(){
                pValueGraphDiv1Open();
                $(".pValueGraphDiv1").show();
                $(".pValueGraphDiv2").hide();
                $(".pValueGraphDiv1Btn").css({"background-color":"#FFBB00"});
                $(".pValueGraphDiv2Btn").css({"background-color":"#FFE08C"});
                $(".pDevelopGraphTitleText").text('授業 評価項目');
              });

              // 상태그래프 보기 버튼
              var pValueGraphDiv2Btn = $("<div></div>").addClass("pValueGraphDiv2Btn").appendTo("#pModeContents");
              $("<p></p>").text('状').appendTo(pValueGraphDiv2Btn);
              $("<p></p>").text('態').appendTo(pValueGraphDiv2Btn);
              $("<p></p>").text('グ').appendTo(pValueGraphDiv2Btn);
              $("<p></p>").text('ラ').appendTo(pValueGraphDiv2Btn);
              $("<p></p>").text('フ').appendTo(pValueGraphDiv2Btn);

              // 상태그래프 보기 버튼 클릭 시
              $(".pValueGraphDiv2Btn").unbind("click").bind("click", function(){
                $(".pValueGraphDiv1").hide();
                pValueGraphDiv2Open();
                $(".pValueGraphDiv2").show();
                $(".pValueGraphDiv1Btn").css({"background-color":"#FFE08C"});
                $(".pValueGraphDiv2Btn").css({"background-color":"#FFBB00"});
                $(".pDevelopGraphTitleText").text('状態グラフ');
              });



              // 항목체크 그래프 담을 div
              function pValueGraphDiv1Open(){
                $(".pDevelopGraph_div2").empty();
                var pValueGraphDiv1 = $("<div></div>").addClass("pValueGraphDiv1").appendTo(".pDevelopGraph_div2");
                  if(cnt1 > 0){
                      for(var i = 0; i < cnt1; i++){
                        // 그래프막대
                        var developValueDiv = $("<div></div>").addClass("developValueDiv").progressbar({ value: data.data1[i].score * 20}).appendTo(".pValueGraphDiv1");
                        // // 그래프 라벨
                        var valueLavel = $("<div></div>").addClass("progress-label").appendTo(developValueDiv);
                        var valuePre = $("<pre></pre>").addClass("progress-pre").text(data.data1[i].assContent).appendTo(valueLavel);
                      }
                  } else{
                    var noCheckMessage = $("<div></div>").text('今日はチェックをしませんでした。');
                    $(".pValueGraphDiv1").append(noCheckMessage);
                  }
              }


              // 상태 그래프 담을 div
              function pValueGraphDiv2Open(){
                $(".pDevelopGraph_div2").empty();
                var pValueGraphDiv2 = $("<div></div>").addClass("pValueGraphDiv2").appendTo(".pDevelopGraph_div2");
                  if(cnt2 > 0){
                    $("<canvas></canvas>").attr("id", "myChart").appendTo(pValueGraphDiv2);
                      var ctx = document.getElementById("myChart");
                      var myChart = new Chart(ctx, {
                            type: 'radar',
                            data: {

                                labels: ["기분", "건강", "체온체크", "식사여부"],
                                datasets: [{
                                    label: '# of Votes',
                                    data: [data.data2[0].feels, data.data2[0].health, data.data2[0].temperature, data.data2[0].meals],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(255,99,132,1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 2,
                                    pointRadius: 6,
                                    pointBorderWidth: 3,
                                    pointBackgroundColor: "orange",
                                    pointBorderColor: "rgba(200,0,0,0.6)",
                                    pointHoverRadius: 10,

                                }],
                            },
                            options:{
                              scale: {
                                ticks: {
                                  beginAtZero: false,
                                  min: 0,
                                  max: 4,
                                  stepSize: 5,
                                },
                                pointLabels: {
                                  fontSize: 15
                                }
                              },
                              legend: {
                                position: 'none',
                              },
                            }
                        });
                  } else{
                    var noCheckMessage = $("<div></div>").text('今日はチェックをしませんでした。');
                    $(".pValueGraphDiv2").append(noCheckMessage);
                  }



              }




            }, error:function(){
              alert("サーバーからのエラーが発生しました。");
            }

          });



        }


        // 댓글보기 함수
        function pShowComments(childID, dateValue){


          $.ajax({
            url:'http://japan-okyo.c9users.io/mobile/getMemo.php',
            data:{
              childID:childID,
              user_num: user_num,
              dateValue:dateValue,
              memoCategory : 2,      // 1 -> 알림장내용 / 2 -> 알림장의 댓글  / 3 -> 특이사항  / 4 -> 단순메모
              memoType : 1  // 1 -> 글씨  /  2 -> 그림
            },
            dataType:"jsonp",
              success:function(data){

                var cnt = data.data.length;
                $(".pViewUploadedComment_div").empty();
                for(var i = 0; i < cnt; i++){
                  // 댓글 입력한 것이 교사라면.
                  if(data.data[i].position == 2){

                    var pTeacherCommentBox = $("<div></div>").addClass("pTeacherCommentBox");
                    $("<div></div>").addClass("teacherTrue1").text("教師").appendTo(pTeacherCommentBox);
                    $("<p></p>").text(data.data[i].comment).appendTo(pTeacherCommentBox);
                    pTeacherCommentBox.appendTo(".pViewUploadedComment_div");
                  }
                  // 댓글 입력한 것이 교사가 아니라면.
                  else {
                    var pParentCommentBox = $("<div></div>").addClass("pParentCommentBox");
                    $("<div></div>").addClass("teacherTrue0").text("保護者").appendTo(pParentCommentBox);
                    $("<p></p>").text(data.data[i].comment).appendTo(pParentCommentBox);
                    pParentCommentBox.appendTo(".pViewUploadedComment_div");
                  }

                  // $("<p></p>").text(data.data[i].comment).appendTo(".pViewUploadedComment_div");

                }

                // 댓글창 스크롤 가장 아래로 내리기
                document.getElementById('pViewUploadedComment_div').scrollTop = document.getElementById('pViewUploadedComment_div').scrollHeight;
            },error:function(){
              alert('サーバーからのエラーが発生しました。');
            }
          });
        }


        // 뒤로 돌아가기 버튼
        $('#backTurnBtn').unbind("click").bind("click", function(){
          var whatIsBox = "box3";
          selectChildView(whatIsBox);
        });

      }

      // I-Check 끝




      // 뒤로 돌아가기 버튼
      // $('#pBackTurnBtn').unbind("click").bind("click", function(){
      //   var whatIsBox = "pbox3";
      //   selectChildView(whatIsBox);
      // });

      //  클릭
      $('#pbox2').unbind("click").bind("click", function(){
        var whatIsBox = "pbox2";
        pselectChildView(whatIsBox);
      });

      // 출석 확인
      function pAttendanceCheck(childID, imageName, childName){

        allHide();
        $("#pAttendanceCheck").show();

        var attendanceValue = 1;

        // 달력


        // 원아 이미지 및 이름 출력
        $.ajax({
            url:"http://japan-okyo.c9users.io/mobile/getChildrens.php",
            data:{
              user_num: user_num,
              user_name: user_name,
            },
            dataType:"jsonp",
            success:function(data){

              $("#pAttendanceChildDiv").empty();

              var childID   = data.data[0].childNum;

              var imageName = data.data[0].imageName;
              var childName = data.data[0].childName;
              var imageComment = data.data[0].imageComment;

                    // var imageName = data.data.imageName;
                    // var childName = data.data.childName;
                    var attendanceInfo = new Array();

                    var imgs = $("<img />").addClass("pAtd_childImage").attr("src", "http://japan-okyo.c9users.io/img/child/"+imageName);
                    var names = $("<p></p>").addClass("pAtd_childName").text(childName);
                    var namesDiv = $("<div></div>").addClass("pAtd_childNameDiv").append(names);

                    // 원아 이미지 및 이름
                    $("<div></div>").addClass('pAtd_ImgAndName').appendTo("#pAttendanceChildDiv");
                    $("<div></div>").addClass("pAtd_imageDiv").append(imgs).appendTo(".pAtd_ImgAndName");
                    $("<div></div>").addClass("pAtd_NameDiv").append(namesDiv).appendTo(".pAtd_ImgAndName");



                    var newDate = new Date();
                    var dateString = newDate.getFullYear() + " - " + (newDate.getMonth() + 1) + " - " + newDate.getDate();
                    var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
                    // 달력 출력


                    // if($("#pAttendanceChildDiv").children().hasClass("pAttendance") === true){
                      // showDatePicker(dateString, dateValue);
                    // } else{
                      showDatePicker(dateString, dateValue);
                      attendanceBtns(dateValue);
                    // }



            }, error: function(){
                window.alert("サーバーからのエラーが発生しました。");
            }
        });


        function showDatePicker(dateString, dateValue){
          $(".pAttDateValueP").text(dateString);



            $(".pAttDatepicker").datepicker({
                  buttonImage: './img/calendar.png',
                  buttonImageOnly: true,
                   dateFormat: 'yy - mm - dd',
                  // changeMonth: true,
                  // changeYear: true,

                  // nextText: '다음 달', // next 아이콘의 툴팁.
                  // prevText: '이전 달',
                  showOn: 'both',
                  showButtonPanel: true,  // 달력아래 버튼 패널
                  // currentText : 'Today',
                  closeText:'Close',       // 버튼패널 중 닫기 텍스트 정의
                  duration: "slow" ,      // 속도

                  // 달력 OPEN시 위치
                  beforeShow: function (input, inst) {
                      setTimeout(function () {
                          inst.dpDiv.css({
                              top: 65,
                              left: 58
                              // top: 125,
                              // left: 2,
                              // width:340,
                          });
                      }, 0);
                  },

                  // 달력에서 선택한 값을 변수에 저장
                  onSelect: function(value) {
                    var explodeValue = value.split(" - ");
                    argDateValue = explodeValue[0]+"-"+explodeValue[1]+"-"+explodeValue[2];

                    $(".pAttDateValueP").empty();
                    $(".pAttDateValueP").text(argDateValue);
                    var valueP = $(".pAttDateValueP").text();


                    attendanceBtns(argDateValue);
                    // if($("#modeContents").children().hasClass("pNotification_div") === true){
                    //   // alert('알림내용');
                    //   notification(dateValue, reChildID);
                    }
          });



        }




        // 출석 메시지 관련
        // var pAttMemo = $("<input></input>").attr("type", "text");
        // $("#pAttTextDiv").append(pAttMemo);


        // 출석버튼 관련  /////////////
        function attendanceBtns(dateValue){
          $.ajax({
            url:"http://japan-okyo.c9users.io/mobile/getAttendanceCheckP.php",
            data:{
              childID: childID,
              dateValue: dateValue
            },
            dataType:"jsonp",
            success:function(data){
              // 출석버튼 및 글씨

              $("<div></div>").addClass("pAttendance").appendTo("#pAttendanceChildDiv");
              $(".pAttendance").empty();
              $("<p></p>").text('出席').appendTo(".pAttendance");
              if(data.data['attendanceValue'] == 1){
                $(".pAttendance").css({
                  "border" : "2px solid white",
                  "background-color":"#00B1F2"
                });
                // var on = $("<input></input>").attr("type", "hidden").addClass("pAttendanceOn"+childID);
                var on = $("<input></input>").attr("type", "hidden").addClass("on");
                $(".pAttendance").append(on);
              }

              // 조퇴버튼 및 글씨
              $("<div></div>").addClass("pEarlyLeave pEarlyLeave").appendTo("#pAttendanceChildDiv");
              $(".pEarlyLeave").empty();
              $("<p></p>").text('早退').appendTo(".pEarlyLeave");
              if(data.data['attendanceValue'] == 2){
                $(".pEarlyLeave").css({
                  "border" : "2px solid white",
                  "background-color":"gold"
                });
                // var on = $("<input></input>").attr("type", "hidden").addClass("pEarlyLeaveOn"+childID);
                var on = $("<input></input>").attr("type", "hidden").addClass("on");
                $(".pEarlyLeave").append(on);
              }


              // 결석버튼 및 글씨
              $("<div></div>").addClass("pAbsence pAbsence").appendTo("#pAttendanceChildDiv");
              $(".pAbsence").empty();
              $("<p></p>").text('欠席').appendTo(".pAbsence");
              if(data.data['attendanceValue'] == 3){
                $(".pAbsence").css({
                  "border" : "2px solid white",
                  "background-color":"#FF48FF"
                });
                // var on = $("<input></input>").attr("type", "hidden").addClass("pAbsenceOn"+childID);
                var on = $("<input></input>").attr("type", "hidden").addClass("on");
                $(".pAbsence").append(on);
              }



              // 출석버튼 클릭
              $(".pAttendance").unbind("click").bind("click", function(){
                // attendanceInfo[i] = "출석";
                // alert("선택한 원아는 " + childID + "이며, " + attendanceInfo[i]);
                $(".pAttendance").empty();
                $("<p></p>").text('出席').appendTo(".pAttendance");
                $(".pAttendance").css({
                  "border" : "2px solid white",
                  "background-color":"#00B1F2"
                });
                // var on = $("<input></input>").attr("type", "hidden").addClass("pAttendanceOn"+childID);
                var on = $("<input></input>").attr("type", "hidden").addClass("on");
                $(".pAttendance").append(on);



                $(".pEarlyLeave").empty();
                $("<p></p>").text('早退').appendTo(".pEarlyLeave");
                $(".pEarlyLeave").css({
                  "border" : "2px solid gold",
                  "background-color":"white"
                });


                $(".pAbsence").empty();
                $("<p></p>").text('欠席').appendTo(".pAbsence");
                $(".pAbsence").css({
                  "border" : "2px solid #FF48FF",
                  "background-color":"white"
                });
              });

              // 조퇴버튼 클릭
              $(".pEarlyLeave").unbind("click").bind("click", function(){
                // attendanceInfo[i] = "조퇴";
                // alert("선택한 원아는 " + childID + "이며, " + attendanceInfo[i]);
                $(".pAttendance").empty();
                $("<p></p>").text('出席').appendTo(".pAttendance");
                $(".pAttendance").css({
                  "border" : "2px solid #00B1F2",
                  "background-color":"white"
                });

                $(".pEarlyLeave").empty();
                $("<p></p>").text('早退').appendTo(".pEarlyLeave");
                $(".pEarlyLeave").css({
                  "border" : "2px solid white",
                  "background-color":"gold"
                });
                // var on = $("<input></input>").attr("type", "hidden").addClass("pEarlyLeaveOn"+childID);
                var on = $("<input></input>").attr("type", "hidden").addClass("on");
                $(".pEarlyLeave").append(on);


                $(".pAbsence").empty();
                $("<p></p>").text('欠席').appendTo(".pAbsence");
                $(".pAbsence").css({
                  "border" : "2px solid #FF48FF",
                  "background-color":"white"
                });

              });

                // 결석버튼 클릭
              $(".pAbsence").unbind("click").bind("click", function(){
                // attendanceInfo[i] = "결석";
                // alert("선택한 원아는 " + childID + "이며, " + attendanceInfo[i]);
                $(".pAttendance").empty();
                $("<p></p>").text('出席').appendTo(".pAttendance");
                $(".pAttendance").css({
                  "border" : "2px solid #00B1F2",
                  "background-color":"white"
                });


                $(".pEarlyLeave").empty();
                $("<p></p>").text('早退').appendTo(".pEarlyLeave");
                $(".pEarlyLeave").css({
                  "border" : "2px solid gold",
                  "background-color":"white"
                });


                $(".pAbsence").empty();
                $("<p></p>").text('欠席').appendTo(".pAbsence");
                $(".pAbsence").css({
                  "border" : "2px solid white",
                  "background-color":"#FF48FF"
                });
                // var on = $("<input></input>").attr("type", "hidden").addClass("pAbsenceOn"+childID);
                var on = $("<input></input>").attr("type", "hidden").addClass("on");
                $(".pAbsence").append(on);
              });
            // $(".pAttendance"+childID).unbind("click").bind("click",function(){
            //   alert("클릭한 원아는 : " + childID + " 이며, 출석버튼이다.");
            // });



            // 취소버튼 클릭
            $("#pAttCancelBtn").unbind("click").bind("click", function(){
              // allHide();
              // var whatIsBox = "pbox2";
              // pselectChildView(whatIsBox);
              allHide();
              $('#pLoginTop').show();
              $('pSideMenuListDiv').hide();
              $('#parentMain').show();
            });


                // 완료 버튼클릭
                $("#pAttSaveBtn").unbind("click").bind("click", function(){

                   // 출석 값 저장변수
                   var attendanceData;

                   var comment = $("#pAttText").val();


                    // 클릭한 버튼의 값을 저장
                    if($(".pAttendance").children().hasClass("on") === true){
                      attendanceData = 1;
                    }
                    if($(".pEarlyLeave").children().hasClass("on") === true){
                      attendanceData = 2;
                    }
                    if($(".pAbsence").children().hasClass("on") === true){
                      attendanceData = 3;
                    }

                    // 출석정보를 입력하지 않으면 등록할 수 없음
                    if(comment == ""){
                      alert('出席の情報を入力してください。')
                    } else{
                      $.ajax({
                        url:"http://japan-okyo.c9users.io/mobile/setAttendanceCheckP.php",
                        data:{
                          childID: childID,
                          uploader: 3,
                          comment : comment,
                          attendanceData: attendanceData,
                          dateValue: dateValue
                        },
                        dataType:"jsonp",
                        success:function(data){
                          alert('出席の情報を登録しました。');


                          allHide();
                          $('#pLoginTop').show();
                          // $('#pSideMenuListDiv').hide();
                          $('#parentMain').show();
                        },
                        error:function(){
                          alert('エラーが発生しました。');
                        }
                      }); // 출석정도 등록 ajax 끝부분
                    } // else 끝부분

                }); // 완료버튼클릭 끝부분

            },
            error:function(){
              alert('出席の情報が読めません。');
            }
          }); // 출석정보 관련 ajax 끝부분



        }



      }

      // 앨범 클릭
      $('#pbox3').unbind("click").bind("click", function(){
        var whatIsBox = "pbox3";
        pselectChildView(whatIsBox);
      });

      // 앨범 확인
      function pShowAlbum(childID, imageName, childName, optionValue){
        // $("#childSelectBox1").hide();
        $("#childSelectBox2").hide();
        $("#pShowAlbum").show();


          switch (optionValue) {
            case 1:
                pShowAlbumOption1(childID, childName, optionValue);
                $("#pShowAlbumOptionBtn1").css({
                  "background-color":"#5F00FF"
                });
                $("#pShowAlbumOptionBtn2").css({
                  "background-color":"#D1B2FF"
                });
                $("#pShowAlbumOptionBtn6").css({
                  "background-color":"#D1B2FF"
                });
              break;
            case 2:
                pShowAlbumOption2(childID, childName, optionValue);
                $("#pShowAlbumOptionBtn1").css({
                  "background-color":"#D1B2FF"
                });
                $("#pShowAlbumOptionBtn2").css({
                  "background-color":"#5F00FF"
                });
                $("#pShowAlbumOptionBtn6").css({
                  "background-color":"#D1B2FF"
                });
            default:

          }


          // 최근순 버튼 클릭
        $("#pShowAlbumOptionBtn1").unbind("click").bind("click", function(){
          pShowAlbumOption1(childID, 1);
          $("#pShowAlbumOptionBtn1").css({
            "background-color":"#5F00FF"
          });
          $("#pShowAlbumOptionBtn2").css({
            "background-color":"#D1B2FF"
          });
          $("#pShowAlbumOptionBtn6").css({
            "background-color":"#D1B2FF"
          });
        });

        // $("<div></div>").addClass("tICheck_Notification_btn2").text('알림내용').appendTo("#tICheck_Notification_btn");

          // 오래된순 버튼 클릭
        $("#pShowAlbumOptionBtn2").unbind("click").bind("click", function(){
          pShowAlbumOption2(childID, 2);
          $("#pShowAlbumOptionBtn1").css({
            "background-color":"#D1B2FF"
          });
          $("#pShowAlbumOptionBtn2").css({
            "background-color":"#5F00FF"
          });
          $("#pShowAlbumOptionBtn6").css({
            "background-color":"#D1B2FF"
          });


        });
        // $("<div></div>").addClass("tICheck_DevelopGraph_btn2").text('발달사항').appendTo("#tICheck_DevelopGraph_btn");


        //   // 날짜조회 버튼 클릭
        // $("#pShowAlbumOptionBtn6").unbind("click").bind("click", function(){
        //   pShowAlbumOption6(childID);
        //   $("#pShowAlbumOptionBtn1").css({
        //     "background-color":"#D1B2FF"
        //   });
        //   $("#pShowAlbumOptionBtn2").css({
        //     "background-color":"#D1B2FF"
        //   });
        //   $("#pShowAlbumOptionBtn6").css({
        //     "background-color":"#5F00FF"
        //   });
        //
        // });


        /*
        // 최근순 정렬
        function pShowAlbumOption1(childID){
          $.ajax({
            dataType: "jsonp",
            data:{
              childID: childID
            },
            // url:'https://chesyu.run.goorm.io/MyProject/ni/uaaa.php',
            url:'https://chesyu.run.goorm.io/MyProject/ni/getAlbum.php',
            success:function(data){
              var cnt = data.data.length;

              $("#pShowAlbumDiv").empty();

              var photoData = new Array();

              for(var i = 0; i < cnt; i++){
                photoData['photoId']   = data.data[i].id;
                photoData['folderPath'] = data.data[i].folderPath;
                photoData['photoName'] = data.data[i].photoName;
                photoData['registDay'] = data.data[i].registDay;
                photoData['fullPath'] = childID+"/"+photoData['folderPath']+"/"+photoData['photoName'];
                photoData['photoMemo'] = data.data[i].photoMemo;

                var imgs    = $("<img />").attr("src", "https://chesyu.run.goorm.io/MyProject/ni/album/folder"+photoData['fullPath']).addClass("photo"+photoData['photoId']);
                // var memos   = $("<p></p>").text(photoMemo);
                var imgsDiv = $("<div></div>").addClass("pPhotoImgsDiv").append(imgs);
                $("#pShowAlbumDiv").append(imgsDiv);

                (function(photoData){
                  $(".photo"+photoData['photoId']).unbind("click").bind("click",function(){
                    detailPhotoView(photoData);
                  });
                }(photoData));

              }
            },
            error:function(){
              alert('서버 오류');
            }
          });
        }

        // 오래된순 정렬
        function pShowAlbumOption2(childID){
          var asc = "asc";
          $.ajax({
            dataType: "jsonp",
            data:{
              childID: childID,
              asc : asc
            },
            // url:'https://chesyu.run.goorm.io/MyProject/ni/uaaa.php',
            url:'https://chesyu.run.goorm.io/MyProject/ni/getAlbum.php',
            success:function(data){
              var cnt = data.data.length;

              $("#pShowAlbumDiv").empty();

              var photoData = new Array();

              for(var i = 0; i < cnt; i++){
                photoData['id']   = data.data[i].id;
                photoData['folderPath'] = data.data[i].folderPath;
                photoData['photoName'] = data.data[i].photoName;
                photoData['registDay'] = data.data[i].registDay;
                photoData['fullPath'] = childID+"/"+photoData['folderPath']+"/"+photoData['photoName'];
                photoData['photoMemo'] = data.data[i].photoMemo;

                var imgs    = $("<img />").attr("src", "https://chesyu.run.goorm.io/MyProject/ni/album/folder"+photoData['fullPath']).addClass("photo"+photoData['photoId']);
                // var memos   = $("<p></p>").text(photoMemo);
                var imgsDiv = $("<div></div>").addClass("pPhotoImgsDiv").append(imgs);
                $("#pShowAlbumDiv").append(imgsDiv);

                (function(photoData){
                  $(".photo"+photoData['photoId']).unbind("click").bind("click",function(){
                    detailPhotoView(photoData);
                  });
                }(photoData));

              }

            },
            error:function(){
              alert('서버 오류');
            }
          });
        }
        */
        // 최근순 정렬
        function pShowAlbumOption1(childID, childName, optionValue){

          $.ajax({
            dataType: "jsonp",
            data:{
              childID: childID
            },
            // url:'https://chesyu.run.goorm.io/MyProject/ni/uaaa.php',
            url:'http://japan-okyo.c9users.io/mobile/viewPhoto.php',
            success:function(data){
              var cnt = data.data.length;

              $("#pShowAlbumDiv").empty();

              for(var i = 0; i < cnt; i++){
                var photoId   = data.data[i].id;
                var photoName = data.data[i].photoName;
                var registDay = data.data[i].registDay;
                var photoMemo = data.data[i].photoMemo;

                var imgs    = $("<img />").attr("src", "http://japan-okyo.c9users.io/img/album/childID_"+childID+"/"+photoName).addClass("photo"+photoId);
                // var memos   = $("<p></p>").text(photoMemo);
                var imgsDiv = $("<div></div>").addClass("pPhotoImgsDiv").append(imgs);
                $("#pShowAlbumDiv").append(imgsDiv);

                (function(photoId, photoName, registDay, photoMemo, optionValue){
                  $(".photo"+photoId).unbind("click").bind("click",function(){
                    detailPhotoView(photoId, photoName, registDay, photoMemo, optionValue);
                  });
                }(photoId, photoName, registDay, photoMemo, optionValue));

              }
            },
            error:function(){
              alert('サーバーからのエラーが発生しました。');
            }
          });
        }

        // 오래된순 정렬
        function pShowAlbumOption2(childID, childName, optionValue){
          optionValue = 2;
          var asc = "asc";
          $.ajax({
            dataType: "jsonp",
            data:{
              childID: childID,
              asc : asc
            },
            // url:'https://chesyu.run.goorm.io/MyProject/ni/uaaa.php',
            url:'http://japan-okyo.c9users.io/mobile/viewPhoto.php',
            success:function(data){
              var cnt = data.data.length;

              $("#pShowAlbumDiv").empty();


              for(var i = 0; i < cnt; i++){
                var photoId   = data.data[i].id;
                var photoName = data.data[i].photoName;
                var registDay = data.data[i].registDay;
                var photoMemo = data.data[i].photoMemo;

                var imgs    = $("<img />").attr("src", "http://japan-okyo.c9users.io/img/album/childID_"+childID+"/"+photoName).addClass("photo"+photoId);
                // var memos   = $("<p></p>").text(photoMemo);
                var imgsDiv = $("<div></div>").addClass("pPhotoImgsDiv").append(imgs);
                $("#pShowAlbumDiv").append(imgsDiv);

                (function(photoId, photoName, registDay, photoMemo, optionValue){
                  $(".photo"+photoId).unbind("click").bind("click",function(){
                    detailPhotoView(photoId, photoName, registDay, photoMemo, optionValue);
                  });
                }(photoId, photoName, registDay, photoMemo, optionValue));

              }

            },
            error:function(){
              alert('サーバーからのエラーが発生しました。');
            }
          });
        }
        // // 두 날짜 사이 정렬
        // function pShowAlbumOption2(childID){
        //   var asc = "asc";
        //   $.ajax({
        //     dataType: "jsonp",
        //     data:{
        //       childID: childID,
        //       asc : asc
        //     },
        //     // url:'https://chesyu.run.goorm.io/MyProject/ni/uaaa.php',
        //     url:'https://chesyu.run.goorm.io/MyProject/ni/getAlbum.php',
        //     success:function(data){
        //       var cnt = data.data.length;
        //
        //       $("#pShowAlbumDiv").empty();
        //
        //       for(var i = 0; i < cnt; i++){
        //         var photoId   = data.data[i].id;
        //         var folderPath = data.data[i].folderPath;
        //         var photoName = data.data[i].photoName;
        //
        //         var fullPath = childID+"/"+folderPath+"/"+photoName;
        //         var photoMemo = data.data[i].photoMemo;
        //
        //         var imgs    = $("<img />").attr("src", "https://chesyu.run.goorm.io/MyProject/ni/album/folder"+fullPath).addClass("photo"+photoId);
        //         // var memos   = $("<p></p>").text(photoMemo);
        //         var imgsDiv = $("<div></div>").addClass("pPhotoImgsDiv").append(imgs);
        //         $("#pShowAlbumDiv").append(imgsDiv);
        //
        //         (function(photoId, folderPath, photoName, fullPath, photoMemo){
        //           $(".photo"+photoId).unbind("click").bind("click",function(){
        //             detailPhotoView(photoId, folderPath, photoName, fullPath, photoMemo);
        //           });
        //         }(photoId, folderPath, photoName, fullPath, photoMemo));
        //
        //       }
        //     },
        //     error:function(){
        //       alert('서버 오류');
        //     }
        //   });
        // }


        // 원아선택으로 돌아가기
        $("#pShowAlbumBackBtn").unbind("click").bind("click",function(){
          allHide();
          $('#pLoginTop').show();
          $('pSideMenuListDiv').hide();
          $('#parentMain').show();
          // pselectChildView("pbox3");
        });




          // 사진 클릭 시 상세보기
          function detailPhotoView(photoId, photoName, registDay, photoMemo, optionValue){
            allHide();
            $("#pShowDetailAlbum").show();
            $("#pDetailAlbumImageDiv").empty();
            $("#pDetailAlbumRegistDiv").empty();
            $("#pDetailAlbumMemoDiv").empty();

            var img  = $("<img />").attr("src", "http://japan-okyo.c9users.io/img/album/childID_"+childID+"/"+photoName);
            var memo = $("<p></p>").text(photoMemo).addClass('photoMemo');
            var registDay = $("<p></p>").text("写真の登録日付 : " + registDay).addClass('photoRegistDay');

            $("#pDetailAlbumImageDiv").append(img);
            $("#pDetailAlbumRegistDiv").append(registDay);
            $("#pDetailAlbumMemoDiv").append(memo);

            // 상세보기에서 뒤로가기 버튼 클릭
            $("#pDetailAlbumBackBtn").unbind("click").bind("click",function(){

              allHide();
              pShowAlbum(childID, optionValue);

              $("#pShowDetailAlbum").hide();
            });
          }
      }

      // 자녀 정보 클릭

      // 자녀 정보 확인

      });

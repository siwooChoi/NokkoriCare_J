$(document).ready(function(){


  $("#pbox1").unbind("click").bind("click", function(){
    alert('tests');
  });


  // 숨기기
  function allHide(){
    // $('#notLoginTop').hide();
    // $('#notLoginView').hide();
    $('#parentMain').hide();
    $('#childSelectBox2').hide();
    $('#pICheck').hide();
    $('#pICheckMain').hide();
    $('#pmodeBtns').hide();
    $("#tLoginTop").hide();
    $("#pShowDetailAlbum").hide();
    $("#psideMenuListDiv").hide();
    $("#pShowAlbum").hide();
    $("#pAttendanceCheck").hide();
    $("#pAttText").val('');

    // $('#sideMenuListDiv').hide();
    // $('#albumChildSelectBox').hide();
    // $('#tObservation').hide();
    // $('#tObText').hide();
    // $('#tObDraw').hide();
    // $('#tDevelopCheck').hide();
    // $('#tICheckMain').hide();
    // $('#modeBtns').hide();
    // $('#ICheck').hide();
    // $("#albumChildSelectBox1").hide();
    // $("#pShowAlbum").hide();
    // $("#photoUpload").hide();
    // $("#showSavedImages").hide();
    // $("#pAttendanceCheck").hide();

    $('#textMemo').val('');
  }

  // 로그아웃
  $("#plogoutBtn").unbind("click").bind("click", function(){
    allHide();
    $("#tLoginTop").hide();
    $('#pLoginTop').hide();

    $('#notLoginTop').show();
    $('#notLoginView').show();
    $("#notLogin").show();

  });

  // 상단 클릭 (메인으로 돌아가기)
  $('#ptop').find('#pimgLogo').unbind("click").bind("click", function(){
    allHide();

    $('#pLoginTop').show();
    $('#psideMenuListDiv').hide();
    $('#parentMain').show();
  })
  $('#ptop').find('#ptextLogo').unbind("click").bind("click", function(){
    allHide();

    $('#pLoginTop').show();
    $('psideMenuListDiv').hide();
    $('#parentMain').show();
  })

  // 원아 선택화면
  function pselectChildView(box){
    allHide();
    $('#pLoginTop').show();
    $('#childSelectBox2').show();
    $('#childSelect2').empty();

    $.ajax({
        url:"https://chesyu.run.goorm.io/MyProject/ni/childImage.php",
        data:{},
        dataType:"jsonp",
        success:function(data){
            //성공
            if(data.result == "success"){
                var cnt = data.data.length;

                for(var i = 0; i < cnt ; i++){
                    var childID        = data.data[i].id;
                    var imageName = data.data[i].imageName;
                    var childName = data.data[i].childName;
                    var imageComment = data.data[i].imageComment;

                    var imgs = $("<img />").addClass("imageName"+childID).attr("src","https://chesyu.run.goorm.io/MyProject/ni/image/"+imageName);
                    var names = $("<p></p>").addClass("childName"+childID).text(childName);
                    var namesDiv = $("<div></div>").addClass("childNameDiv"+childID).append(names);

                    $("<div></div>").addClass('selectImgAndName'+childID).appendTo("#childSelect2");
                    $("<div></div>").addClass("imageDiv").append(imgs).appendTo(".selectImgAndName"+childID);
                    $("<div></div>").addClass("NameDiv").append(namesDiv).appendTo(".selectImgAndName"+childID);

                    (function(childID){

                    $(".selectImgAndName"+childID).unbind("click").bind("click",function(){

                          switch (box) {
                            // 알림장 확인
                            case "pbox1":
                              pICheck(childID);
                              break;

                            // 출석 확인
                            case "pbox2":
                              pAttendanceCheck(childID);
                              break;

                            // 앨범 확인
                            case "pbox3":
                            pShowAlbum(childID, 1);
                              // tICheck(childID);
                              break;

                            // 자녀정보 확인
                            case "pbox4":
                            alert('pbox4');
                              break;

                            default:
                              alert("default");
                          }


                    });

                  }(childID));
                }

                if(cnt == 0)
                    $("<p></p>").text("업로드 된 이미지가 없습니다.").appendTo("#selectImgAndName1");
            }
            //오류
            else {
                window.alert("오류가 발생하였습니다.");
            }
        }, error: function(){
            window.alert("서버 접속 오류가 발생하였습니다.");
        }
    });
  }


  // 알림장 확인 클릭
  $('#pbox1').unbind("click").bind("click", function(){
    var whatIsBox = "pbox1";
    pselectChildView(whatIsBox);
  });

  // 알림장 확인
  function pICheck(childID){
        allHide();
        $('#pICheck').show();
        $('#pICheckMain').show();
        $('#pmodeBtns').show();

        var newDate = new Date();
        var dateString = newDate.getFullYear() + " - " + (newDate.getMonth() + 1) + " - " + newDate.getDate();

        var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();;


        // 달력
        $(".dateValueP").text(dateString);
        $(".datepicker").datepicker({
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

                  $(".dateValueP").empty();
                  $(".dateValueP").text(value);

                  var valueP = $(".dateValueP").text();
                  // var explodeValue = valueP.split(" - ");
                  // dateValue = explodeValue[0]+"-"+explodeValue[1]+"-"+explodeValue[2];
                  // alert("p태그 날짜는 : " + valueP);
                  // alert("dateValue는 : " + dateValue);

                  if($("#pmodeContents").children().hasClass("pNotification_div") === true){
                    // alert('알림내용');
                    notification(dateValue);
                  }

                  if($("#pmodeContents").children().hasClass("developGraph_div1") === true){
                    // alert('발달사항');
                    developGraph(dateValue);
                  }

                  if($("#pmodeContents").children().hasClass("significant_div") === true){
                    // alert('특이사항');
                    significant(dateValue);
                  }
                }
        });


        notification();
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
      $.ajax({
          url:"https://chesyu.run.goorm.io/MyProject/ni/selectedChildImage.php",
          data:{
            childID: childID
          },
          dataType:"jsonp",
          success:function(data){

              //성공
              if(data.result == "success"){
                      $('#pICheck_childBox_div').empty();

                      var id        = data.data.id;
                      var imageName = data.data.imageName;
                      var childNum = data.data.childNum;
                      var childName = data.data.childName;

                      var imgs = $("<img />").attr("src","https://chesyu.run.goorm.io/MyProject/ni/image/"+imageName);
                      var names = $("<p></p>").text(childName);

                      $("<div></div>").addClass("pICheck_childBox").appendTo("#pICheck_childBox_div");
                      var imgsDiv = $("<div></div>").addClass("pICheck_imgsDiv").appendTo(".pICheck_childBox");
                      var namesDiv = $("<div></div>").addClass("pICheck_namesDiv").appendTo(".pICheck_childBox");
                      imgsDiv.append(imgs);
                      namesDiv.append(names);
              }
              //오류
              else {
                  window.alert("오류가 발생하였습니다.");
              }
          }, error: function(){
              window.alert("서버 접속 오류가 발생하였습니다.");
          }
      });


        // 모드 버튼들
        $("#pICheck_Notification_btn").unbind("click").bind("click", function(){
          notification(dateValue);
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

        $("#pICheck_DevelopGraph_btn").unbind("click").bind("click", function(){
          developGraph(dateValue);
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

        $("#pICheck_Significant_btn").unbind("click").bind("click", function(){
          significant(dateValue);
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
        function notification(){
          $("#pmodeContents").empty();
          $("#ppNotificationComments_div").empty();


          // 알림내용 div
          $("<div></div>").addClass("pNotification_div").appendTo("#pmodeContents");

          // 알림내용의 댓글 div
          $("<div></div>").addClass("pNotificationComments_div").appendTo("#pmodeContents");
          $("<div></div>").addClass("pViewUploadedComment_div").appendTo(".pNotificationComments_div");
          $("<div></div>").addClass("uploadComment_div").appendTo(".pNotificationComments_div");
          $("<p></p>").text("작성").appendTo(".uploadComment_div");

          // 댓글보기 함수
          showComments(childID, dateValue);

          // 알림내용의 댓글작성 버튼 클릭
          $('.uploadComment_div').unbind("click").bind("click", function(){
            var comment = prompt('댓글을 입력하세요.');
            $.ajax({
              dataType:'jsonp',
              data: {
                childID: childID,
                comment: comment,
                teacherTrue: 0,
                dateValue: dateValue
              },
                url:"https://chesyu.run.goorm.io/MyProject/ni/tCommentsUpload.php",
               success:function(result){
                 showComments(childID, dateValue);
               }, error:function(){
                //  alert('실패');
               }

            });
          });
        }


        //  발달그래프 모드 컨텐츠 보여주기
        function developGraph(dateValue){
          $("#pmodeContents").empty();
          $("<div></div>").addClass("developGraph_div1").appendTo("#pmodeContents");
          $("<div></div>").addClass("developGraph_div2").appendTo("#pmodeContents");
          $("<div></div>").addClass("developGraph_div2_Name").appendTo(".developGraph_div2");
          $("<p></p>").text('발달 행동 체크 그래프').appendTo(".developGraph_div2_Name");


          $.ajax({
            dataType:"jsonp",
            data:{
              childID: childID,
              dateValue: dateValue

            },
            url:"https://chesyu.run.goorm.io/MyProject/ni/getDevelopValues.php",
            success:function(data){

              // 쿼리결과 행 갯수
              var cnt = data.data.length;

              $(".valueGraphDiv").empty();

              // 그래프 담을 div
              var valueGraphDiv = $("<div></div>").addClass("valueGraphDiv").appendTo(".developGraph_div2");

              if(cnt > 0){
                for(var i = 0; i < cnt; i++){
                  // 그래프막대
                  var developValueDiv = $("<div></div>").addClass("developValueDiv").progressbar({ value: data.data[i].developCheckValue * 20}).appendTo(".valueGraphDiv");
                  // // 그래프 라벨
                  var valueLavel = $("<div></div>").addClass("progress-label").text(data.data[i].developCheckName).appendTo(developValueDiv);
                }
              } else{
                var noCheckMessage = $("<div></div>").text('오늘 체크 안했음');
                $(".valueGraphDiv").append(noCheckMessage);
              }


            }, error:function(){
              alert("error 발생");
            }

          });


        }

        // 특이사항 모드 컨텐츠 보여주기
        function significant(dateValue){
          $("#pmodeContents").empty();
          $("<div></div>").addClass("significant_div").appendTo("#pmodeContents");

        }

        // 댓글 보여주기
        function showComments(childID, dateValue){

          $.ajax({
            url:"https://chesyu.run.goorm.io/MyProject/ni/commentsView.php",
            data:{
              childID:childID,
              dateValue: dateValue

            },
            dataType:"jsonp",
              success:function(data){
                var cnt = data.data.length;



                for(var i = 0; i < cnt; i++){

                  // 댓글 입력한 것이 교사라면.
                  if(data.data[i].teacherTrue == 1){

                    var teacherCommentBox = $("<div></div>").addClass("teacherCommentBox");

                    $("<div></div>").addClass("teacherTrue1").text("교사").appendTo(teacherCommentBox);
                    $("<p></p>").text(data.data[i].comment).appendTo(teacherCommentBox);
                    teacherCommentBox.appendTo(".pViewUploadedComment_div");
                  }
                  // 댓글 입력한 것이 교사가 아니라면.
                  else {
                    var parentCommentBox = $("<div></div>").addClass("parentCommentBox");

                    $("<div></div>").addClass("teacherTrue0").text("학부모").appendTo(parentCommentBox);
                    $("<p></p>").text(data.data[i].comment).appendTo(parentCommentBox);
                    parentCommentBox.appendTo(".pViewUploadedComment_div");
                  }

                  // $("<p></p>").text(data.data[i].comment).appendTo(".pViewUploadedComment_div");
                }

                $(".pViewUploadedComment_div").scrollTop($(document).height());


            },error:function(){
              alert('error');
            }
          });
        }


        // 원아선택으로 돌아가기 버튼
        $('#pbackTurnBtn').unbind("click").bind("click", function(){
          var whatIsBox = "pbox1";
          pselectChildView(whatIsBox);
        });

  }



  // 출석 클릭
  $('#pbox2').unbind("click").bind("click", function(){
    var whatIsBox = "pbox2";
    pselectChildView(whatIsBox);
  });

  // 출석 확인
  function pAttendanceCheck(childID){

    allHide();
    $("#pAttendanceCheck").show();

    var attendanceValue = 1;

    // 달력


    // 원아 이미지 및 이름 출력
    $.ajax({
        url:"https://chesyu.run.goorm.io/MyProject/ni/childImage_p_attan.php",
        data:{
          childID: childID
        },
        dataType:"jsonp",
        success:function(data){

          $("#pAttendanceChildDiv").empty();

                var imageName = data.data.imageName;
                var childName = data.data.childName;
                var attendanceInfo = new Array();

                var imgs = $("<img />").addClass("pAtd_childImage").attr("src","https://chesyu.run.goorm.io/MyProject/ni/image/"+imageName);
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
            window.alert("서버 접속 오류가 발생하였습니다.");
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
                //   notification(dateValue);
                }
      });
    }




    // 출석 메시지 관련
    // var pAttMemo = $("<input></input>").attr("type", "text");
    // $("#pAttTextDiv").append(pAttMemo);


    // 출석버튼 관련  /////////////
    function attendanceBtns(dateValue){
      $.ajax({
        url:"https://chesyu.run.goorm.io/MyProject/ni/getAttendanceCheckP.php",
        data:{
          childID: childID,
          dateValue: dateValue
        },
        dataType:"jsonp",
        success:function(data){
          // 출석버튼 및 글씨
        
          $("<div></div>").addClass("pAttendance").appendTo("#pAttendanceChildDiv");
          $(".pAttendance").empty();
          $("<p></p>").text('출석').appendTo(".pAttendance");
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
          $("<p></p>").text('조퇴').appendTo(".pEarlyLeave");
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
          $("<p></p>").text('결석').appendTo(".pAbsence");
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
            $("<p></p>").text('출석').appendTo(".pAttendance");
            $(".pAttendance").css({
              "border" : "2px solid white",
              "background-color":"#00B1F2"
            });
            // var on = $("<input></input>").attr("type", "hidden").addClass("pAttendanceOn"+childID);
            var on = $("<input></input>").attr("type", "hidden").addClass("on");
            $(".pAttendance").append(on);



            $(".pEarlyLeave").empty();
            $("<p></p>").text('조퇴').appendTo(".pEarlyLeave");
            $(".pEarlyLeave").css({
              "border" : "2px solid gold",
              "background-color":"white"
            });


            $(".pAbsence").empty();
            $("<p></p>").text('결석').appendTo(".pAbsence");
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
            $("<p></p>").text('출석').appendTo(".pAttendance");
            $(".pAttendance").css({
              "border" : "2px solid #00B1F2",
              "background-color":"white"
            });

            $(".pEarlyLeave").empty();
            $("<p></p>").text('조퇴').appendTo(".pEarlyLeave");
            $(".pEarlyLeave").css({
              "border" : "2px solid white",
              "background-color":"gold"
            });
            // var on = $("<input></input>").attr("type", "hidden").addClass("pEarlyLeaveOn"+childID);
            var on = $("<input></input>").attr("type", "hidden").addClass("on");
            $(".pEarlyLeave").append(on);


            $(".pAbsence").empty();
            $("<p></p>").text('결석').appendTo(".pAbsence");
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
            $("<p></p>").text('출석').appendTo(".pAttendance");
            $(".pAttendance").css({
              "border" : "2px solid #00B1F2",
              "background-color":"white"
            });


            $(".pEarlyLeave").empty();
            $("<p></p>").text('조퇴').appendTo(".pEarlyLeave");
            $(".pEarlyLeave").css({
              "border" : "2px solid gold",
              "background-color":"white"
            });


            $(".pAbsence").empty();
            $("<p></p>").text('결석').appendTo(".pAbsence");
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
          var whatIsBox = "pbox2";
          pselectChildView(whatIsBox);
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
                  alert('출석 정보를 입력해주세요.')
                } else{
                  $.ajax({
                    url:"https://chesyu.run.goorm.io/MyProject/ni/setAttendanceCheckP.php",
                    data:{
                      childID: childID,
                      uploader: 0,
                      comment : comment,
                      attendanceData: attendanceData,
                      dateValue: dateValue
                    },
                    dataType:"jsonp",
                    success:function(data){
                      alert('출석정보를 등록했습니다.');


                      allHide();
                      $('#pLoginTop').show();
                      // $('#psideMenuListDiv').hide();
                      $('#parentMain').show();
                    },
                    error:function(){
                      alert('e');
                    }
                  }); // 출석정도 등록 ajax 끝부분
                } // else 끝부분

            }); // 완료버튼클릭 끝부분

        },
        error:function(){
          alert('출석 정보를 가져올 수 없습니다.');
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
  function pShowAlbum(childID, optionValue){
    $("#albumChildSelectBox1").hide();
    $("#pShowAlbum").show();

    switch (optionValue) {
      case 1:
          pShowAlbumOption1(childID, optionValue);
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
          pShowAlbumOption2(childID, optionValue);
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
            var imgsDiv = $("<div></div>").addClass("photoImgsDiv").append(imgs);
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
            var imgsDiv = $("<div></div>").addClass("photoImgsDiv").append(imgs);
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
    function pShowAlbumOption1(childID, optionValue){

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

          for(var i = 0; i < cnt; i++){
            var photoId   = data.data[i].id;
            var folderPath = data.data[i].folderPath;
            var photoName = data.data[i].photoName;
            var registDay = data.data[i].registDay;
            var fullPath = childID+"/"+folderPath+"/"+photoName;
            var photoMemo = data.data[i].photoMemo;

            var imgs    = $("<img />").attr("src", "https://chesyu.run.goorm.io/MyProject/ni/album/folder"+fullPath).addClass("photo"+photoId);
            // var memos   = $("<p></p>").text(photoMemo);
            var imgsDiv = $("<div></div>").addClass("photoImgsDiv").append(imgs);
            $("#pShowAlbumDiv").append(imgsDiv);

            (function(photoId, folderPath, photoName, registDay, fullPath, photoMemo, optionValue){
              $(".photo"+photoId).unbind("click").bind("click",function(){
                detailPhotoView(photoId, folderPath, photoName, registDay, fullPath, photoMemo, optionValue);
              });
            }(photoId, folderPath, photoName, registDay, fullPath, photoMemo, optionValue));

          }
        },
        error:function(){
          alert('서버 오류');
        }
      });
    }

    // 오래된순 정렬
    function pShowAlbumOption2(childID, optionValue){
      optionValue = 2;
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



          for(var i = 0; i < cnt; i++){
            var photoId   = data.data[i].id;
            var folderPath = data.data[i].folderPath;
            var photoName = data.data[i].photoName;
            var registDay = data.data[i].registDay;
            var fullPath = childID+"/"+folderPath+"/"+photoName;
            var photoMemo = data.data[i].photoMemo;

            var imgs    = $("<img />").attr("src", "https://chesyu.run.goorm.io/MyProject/ni/album/folder"+fullPath).addClass("photo"+photoId);
            // var memos   = $("<p></p>").text(photoMemo);
            var imgsDiv = $("<div></div>").addClass("photoImgsDiv").append(imgs);
            $("#pShowAlbumDiv").append(imgsDiv);

            (function(photoId, folderPath, photoName, registDay, fullPath, photoMemo, optionValue){
              $(".photo"+photoId).unbind("click").bind("click",function(){
                detailPhotoView(photoId, folderPath, photoName, registDay, fullPath, photoMemo, optionValue);
              });
            }(photoId, folderPath, photoName, registDay, fullPath, photoMemo, optionValue));

          }

        },
        error:function(){
          alert('서버 오류');
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
    //         var imgsDiv = $("<div></div>").addClass("photoImgsDiv").append(imgs);
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
    $("#pShowAlbumBackBtn").unbind("click").bind("click", function(){
      // alert('testasdaasds');
      allHide();
      pselectChildView("pbox3");



    });



    // 사진 클릭 시 상세보기
    function detailPhotoView(photoId, folderPath, photoName, registDay, fullPath, photoMemo, optionValue){
      allHide();
      $("#pShowDetailAlbum").show();
      $("#pDetailAlbumImageDiv").empty();
      $("#pDetailAlbumRegistDiv").empty();
      $("#pDetailAlbumMemoDiv").empty();

      var img  = $("<img />").attr("src", "https://chesyu.run.goorm.io/MyProject/ni/album/folder"+fullPath);
      var memo = $("<p></p>").text(photoMemo).addClass('photoMemo');
      var registDay = $("<p></p>").text("사진 등록 날짜 : " + registDay).addClass('photoRegistDay');

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

/*
    // 사진 클릭 시 상세보기
    function detailPhotoView(photoData){
      allHide();
      $("#showDetailAlbum").show();
      $("#pDetailAlbumImageDiv").empty();
      $("#pDetailAlbumRegistDiv").empty();
      $("#pDetailAlbumMemoDiv").empty();

      var img  = $("<img />").attr("src", "https://chesyu.run.goorm.io/MyProject/ni/album/folder"+photoData['fullPath']);
      var memo = $("<p></p>").text(photoData['photoMemo']).addClass('photoMemo');
      var registDay = $("<p></p>").text("사진 등록 날짜 : " + photoData['registDay']).addClass('photoRegistDay');

      $("#pDetailAlbumImageDiv").append(img);
      $("#pDetailAlbumRegistDiv").append(registDay);
      $("#pDetailAlbumMemoDiv").append(memo);

      // 상세보기에서 뒤로가기 버튼 클릭
      $("#pDetailAlbumBackBtn").unbind("click").bind("click",function(){
        allHide();
        pShowAlbum(childID);
        if(optionValue == 1){
          alert('test');
        } else{
          alert('2222');
        }

        $("#showDetailAlbum").hide();
      });
    }*/

  }

    // 자녀 정보 클릭

    // 자녀 정보 확인






















});

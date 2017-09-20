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
    var changeBtn1Text = $("<h3>원아 메모 <br>작성</h3>").appendTo(changeBtn1);
    $("#tAlbumChangeModePanel").append(changeBtn1);
    $(".changeBtn1").unbind("click").bind("click", function(){
        allHide();
        tObservation(argValues[0], argValues[1], argValues[2]);
        $("#tAlbumChangeModePanel").hide("slide",{direction:"right"},350,null);
    });

    var changeBtn23Box = $("<div></div>").addClass("changeBtn23Box");
    $("#tAlbumChangeModePanel").append(changeBtn23Box);

    var changeBtn2 = $("<div></div>").addClass("changeBtn2").appendTo(changeBtn23Box);
    var changeBtn2Text = $("<h3>평가항목</h3>").appendTo(changeBtn2);
    $(".changeBtn2").unbind("click").bind("click", function(){
        allHide();
        developCheck(argValues[0], argValues[1], argValues[2]);
        $("#tAlbumChangeModePanel").hide("slide",{direction:"right"},350,null);
    });

    var changeBtn3 = $("<div></div>").addClass("changeBtn3").appendTo(changeBtn23Box);
    var changeBtn3Text = $("<h3>I-Check</h3>").appendTo(changeBtn3);
    $(".changeBtn3").unbind("click").bind("click", function(){
        allHide();
        var newDate = new Date();
        var dateValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
        tICheck(argValues[0], argValues[1], argValues[2], dateValue);
        $("#tAlbumChangeModePanel").hide("slide",{direction:"right"},350,null);
    });

    var changeBtn45Box = $("<div></div>").addClass("changeBtn45Box");
    $("#tAlbumChangeModePanel").append(changeBtn45Box);

    var changeBtn4 = $("<div></div>").addClass("changeBtn4").appendTo(changeBtn45Box);
    var changeBtn4Text = $("<h3>사진 업로드</h3>").appendTo(changeBtn4);
    $(".changeBtn4").unbind("click").bind("click", function(){
        allHide();
        photoUpload(argValues[0], argValues[1], argValues[2]);
        $("#tAlbumChangeModePanel").hide("slide",{direction:"right"},350,null);
    });


    var changeBtn5 = $("<div></div>").addClass("changeBtn5").appendTo(changeBtn45Box);
    var changeBtn5Text = $("<h3>앨범 보기</h3>").appendTo(changeBtn5);
    $(".changeBtn5").unbind("click").bind("click", function(){
        allHide();
        showAlbum(argValues[0], argValues[1], argValues[2], 1);
        $("#tAlbumChangeModePanel").hide("slide",{direction:"right"},350,null);
    });

});
//

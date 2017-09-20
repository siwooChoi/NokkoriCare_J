$(document).ready(function(){



  // 로그인 판단


    $('#noIDLoginBtn').unbind("click").bind("click", function(){
          if( $("#inputId").val() == "ttt") {
            $('#notLoginTop').hide();
            $('#notLoginView').hide();

            $('#tLoginTop').show();
            $('#sideMenuListDiv').hide();
            $('#teacherMain').show();
          } else if($("#inputId").val() == "ppp"){
            $('#notLoginTop').hide();
            $('#notLoginView').hide();

            $('#pLoginTop').show();
            $('#psideMenuListDiv').hide();
            $('#parentMain').show();
          } else{
            alert('교사아이디 ttt,   학부모아이디 ppp');
          }
    });


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
        url:"http://project-okyo.c9users.io/mobile/login.php",
        success:function(data){

          var position = data.position;   // User직위(1->원장, 2->교사, 3->학부모)
          alert(position);
          var user_num  = data.userNum;   // User고유번호
          var user_name = data.userName;  // User이름

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
            $('#psideMenuListDiv').hide();
            $('#parentMain').show();
            default:
            alert('알');

          }

        },
        error:function(){
          alert('서버접속 실패');
        }


      });

    });


  });

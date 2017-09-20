
/*
localStorage.getItem('position');
localStorage.getItem('user_num');
localStorage.getItem('user_name');
*/

var iCareCnt;

function iCareDataFromServer(){        // js, css 다하면 주석 풀어야됨

    //////// 아이케어
    iCareGetChildrens();

    function iCareGetChildrens(){
      var iCareChildID = new Array();     // 원아 ID값
      var iCareImageName = new Array();   // 원아 사진파일명
      var iCareChildName = new Array();   // 원아 이름
      var iCareDevice_id = new Array();   // 디바이스 ID값
      var iCareDevice_mac = new Array();  // 디바이스 맥주소

      $.ajax({
          url:"http://japan-okyo.c9users.io/mobile/getDataforIcare.php",
          // url:"http://project-okyo.c9users.io/mobile/mTest.php",
          data:{
            user_num: localStorage.getItem('user_num'),
          },
          dataType:"jsonp",
          success:function(data){

                // ajax에서 들고오는 데이터베이스의 컬럼
                // f_cId          // 원아 ID값(숫자)
                // childPhoto     // 원아 사진파일명(경로는 없이 파일명만_스트링)
                // childName      // 원아 이름(스트링)
                // device_id      // 디바이스 ID값(숫자)
                // device_mac     // 디바이스 맥주소(스트링)

                  iCareCnt = data.data.length;

                  for(var i = 0; i < iCareCnt ; i++){
                      iCareChildID.push(data.data[i].f_cId);        // 원아 ID값
                      var tempImageName = "http://project-okyo.c9users.io/img/child/"+data.data[i].childPhoto;
                      iCareImageName.push(tempImageName);  // 원아 사진파일명
                      // iCareImageName.push(data.data[i].childPhoto);  // 원아 사진파일명
                      iCareChildName.push(data.data[i].childName);  // 원아 이름
                      iCareDevice_id.push(data.data[i].device_id);  // 디바이스 ID값
                      iCareDevice_mac.push(data.data[i].device_mac);  // 디바이스 맥주소
                  }
                  localStorage.setItem("iCareChildID", JSON.stringify(iCareChildID));
                  localStorage.setItem("iCareImageName", JSON.stringify(iCareImageName));
                  localStorage.setItem("iCareChildName", JSON.stringify(iCareChildName));
                  localStorage.setItem("iCareDevice_id", JSON.stringify(iCareDevice_id));
                  localStorage.setItem("iCareDevice_mac", JSON.stringify(iCareDevice_mac));
                  deviceInfoFromServer();
          },
          error:function(){
            alert('서버 실패');
          }
      });

      console.log('작동중');
      console.log(JSON.parse(window.localStorage.getItem("iCareChildID")).length);
      console.log(JSON.parse(window.localStorage.getItem("iCareImageName")).length);
      console.log(JSON.parse(window.localStorage.getItem("iCareChildName")).length);
      console.log(JSON.parse(window.localStorage.getItem("iCareDevice_id")).length);
      console.log(JSON.parse(window.localStorage.getItem("iCareDevice_mac")).length);
    }
  }
//////////////////////////


var ms = function (tag,msString) {
  document.getElementById(tag).innerHTML = msString;
}

var msp = function (tag,msString) {
  document.getElementById(tag).innerHTML += msString;
}

var childDeviceinfo = function (name, mac, photo_address, uuid, major, minor, flat, flon, rssi, txpw, dist){
  // 원아 기본 정보
  this.name = name;
  this.mac = mac;
  this.photo_address = photo_address;

  //BLE에서 가져오는 신호 정보
  this.uuid = uuid;
  this.major = major;
  this.minor = minor;
  this.flat = flat;
  this.flon = flon;
  this.rssi = rssi;
  this.txpw = txpw;
  this.dist = dist;
  // this.scan_time;
  // this.scan_name_time;

  // 내부 자체 정보
  this.signal_Area = [];
  this.valid_area_count;
  this.valid_area_index;

  this.setFlatFlon = function(inputFlat,inputFlon) {// 아두이노에서 초기값 받았을 때는 제외
    if(Math.floor(inputFlat) != 65 && Math.floor(inputFlon) != 65){
      this.flat = inputFlat;
      this.flon = inputFlon;
    }
  }

}

var eachChildDevice = [];

var set_child_photo = [];
var set_child_name = [];
var set_device_mac = [];
var theNumberOfChild = 2;

var deviceInfoFromServer = function () {

    var deviceinfoArr = [];

    var beOrNotbe = function (variable, inputVar) {
      if(inputVar !== undefined){
        variable = inputVar;
      }
    }

    set_child_photo = ["./img/child.jpg", "./img/child.jpg"];
    set_child_name = ['한소율', '추사랑'];
    //iCareDevice_id
    set_device_mac = ['50:8C:B1:69:C1:59', '50:8C:B1:3E:4F:C2'];
    theNumberOfChild = 2; // 원아 명수 DB에서 가져 옴


    var childID_from_server = JSON.parse(window.localStorage.getItem("iCareChildID"));
    var imageName_from_server = JSON.parse(window.localStorage.getItem("iCareImageName"));
    var childName_from_server = JSON.parse(window.localStorage.getItem("iCareChildName"));
    var device_id_from_server = JSON.parse(window.localStorage.getItem("iCareDevice_id"));
    var device_mac_from_server = JSON.parse(window.localStorage.getItem("iCareDevice_mac"));



    if(iCareCnt == childID_from_server.length && iCareCnt == imageName_from_server.length && iCareCnt == childName_from_server.length
    && iCareCnt == device_id_from_server.length && iCareCnt == device_mac_from_server.length){
      set_child_photo = imageName_from_server;
      set_child_name = childName_from_server;
      set_device_mac = device_mac_from_server;
      theNumberOfChild = iCareCnt;
    }

    for (var i=0;i<theNumberOfChild;i++){
      //DB에서 값을 입력 받는다.
      var name = set_child_name[i];
      var mac = set_device_mac[i];
      var photo_address = set_child_photo[i];
      eachChildDevice[i] = new childDeviceinfo(name,mac,photo_address,"","","","","",0,0,0,0);
    }



}

//deviceInfoFromServer();


////////////////////////////////////왜왜?///////////////////////////

var encodeAD = function (scanData) {
  var AdConverted = bluetoothle.encodedStringToBytes(scanData.advertisement);
  var convertedAll = '';

  for (var i = 0; i < AdConverted.length ;i++){
    convertedAll += AdConverted[i].toString(16).toUpperCase() + ",";
  }
  return convertedAll;
}

var getAD = function (scanData, type) {

  var ADvalue = '';
  var AdConverted = bluetoothle.encodedStringToBytes(scanData.advertisement);
  var startNum
  var finallNum

  switch(type) {
    case "uuid":
    startNum = 9;
    finallNum =25;
    break;

    case "major":
    startNum = 25;
    finallNum =27;
    break;

    case "minor":
    startNum = 27;
    finallNum =29;
    break;

    case "flat": //위도
    startNum = 9;
    finallNum =13;
    break;

    case "flon": //경도
    startNum = 13;
    finallNum =17;
    break;

    case "txpw":
    startNum = 29;
    finallNum =30;
    break;

  }

  for (var i=startNum;i<finallNum;i++){
    ADvalue += AdConverted[i].toString(16).toUpperCase();
  }
  return ADvalue.toString(16).toUpperCase();
}

var getAduinoFlat = function (value) {
  return (parseInt(getAD(value, "flat"), 16)/1000000).toFixed(6);
}

var getAduinoFlon = function (value) {
  return (parseInt(getAD(value, "flon"), 16)/1000000).toFixed(6);
}

var getTransmissionPower = function (value) {
  return (parseInt(getAD(value, "txpw"), 16))-256;
}


//////////////////////////////////////////////sinal power//////////////////////////////////////////////////////

var distanceBLE = function (txpw,rssi) {
   return Math.pow(10, ( (txpw - rssi) / (10 * 2)) );
}

var makeSignalArea = function (min, max) {
        // 이거는 클래스로 만들어 두고
        // 스캔이 끝나도 존재하고 싶게 만들고 싶다. -> 그럼 이것에 대한 객체는 스캔 루프 외부에 정의하도록
        // 원아 정보 객체에 이것의 객체를 만들어 저장을 해 두어야 할 것 같다.
        this.min = min;
        this.max = max;
        this.count = 0;
        this.__proto__.count_array = [loop_interval];
        this.__proto__.total_count = 0;
      }

var signal_range = 5; // 이거는 외부 설정 값
var loop_interval = 10; // 이것도 외부 설정 값

var makeArea = function (index) {
  // tx_power 값은 scan 하면서 받아 오는 것이기 때문에 반복문 내부에 있어야 한다.
  // 하지만 이걸로 만들어 놓으면 값을 계속 축적 해야 한다. 따라서
  // 따라서 최초 한번만 실행해야 되는 거 아님?
  // 만약에 리셋을 누르면 새로 설정한 값을 보내는 거고..
  // 근데 왠만하면 자동화가 낫긴 한데...
  // 언제쯤 리셋 해 줘야 하는 건데? 이거는 꾀 상당히 길게 잡아도 될 것 같은데....
  // 아니 엄청 길기 때문에... 디바이스를 껏다가 켜는 게 빠를지도 모름. 그냥 최초 1회 실행하게 하고..
  // 아직 정의가 되어 있지 않으면 실행하는 걸로. 그러니 signal_Area 배열 안에 값이 존재하느냐?를 파악해야 함.
  // 일단 만약에 이게 만들어지면 제일 첫번째 배열에는 값이 만들어 져야 하는 거잖아.!!
  // signal_Area의 첫번째 배열 값은 분명 존재 해야 하는 거.
  // 그러면 signal_Area[0]값이 정의 되어 있다면 이 함수를 실행하지 말고 정의 되어 있지 않다면 실행하는 걸로.

  if(eachChildDevice[index].signal_Area[0] === undefined){
     //document.getElementById('test3').innerHTML += "실행";
    var count_area = 0;
    for(var i = Math.abs(eachChildDevice[index].txpw); i < 100; i += signal_range){
      eachChildDevice[index].signal_Area[count_area] = new makeSignalArea(i, i+signal_range);
      count_area++;
    }
  }
}



var countArea = function (index) {
  // 이거는 loop가 돌아갈 때마다 동작하도록 만들어야 한다.!!!!
  makeArea(index);

  if( Math.abs(eachChildDevice[index].rssi) <= Math.abs(eachChildDevice[index].txpw) + eachChildDevice[index].signal_Area.length *signal_range){
     this.rssi_index = Math.floor(( Math.abs(eachChildDevice[index].rssi) - Math.abs(eachChildDevice[index].txpw))/signal_range);
    // msp("scanMessage", "함수 동작?"+this.rssi_index);

    if(this.rssi_index < 0){
      this.rssi_index = 0;
    }


    if(this.rssi_index >= 0){
      var count = (eachChildDevice[index].signal_Area[0].__proto__.total_count++);

             if(count >= loop_interval){
               var temp_index = eachChildDevice[index].signal_Area[0].__proto__.count_array[(count%loop_interval)];
               eachChildDevice[index].signal_Area[temp_index].count--;
             }


      eachChildDevice[index].signal_Area[this.rssi_index].count++;
      eachChildDevice[index].signal_Area[0].__proto__.count_array[count%loop_interval] = this.rssi_index;
    }
     //msp("scanMessage", "카운팅: "+eachChildDevice[index].signal_Area[this.rssi_index].__proto__.total_count +"<br>");

  }

  validArea(index);

 }

 var validArea = function (index) {

  if(eachChildDevice[index].signal_Area[0].__proto__.total_count > loop_interval){
    var select_max = 0;
    var index_max = -1;
    // msp("scanMessage", "함수 동작?");

    for(var i =0; i<eachChildDevice[index].signal_Area.length - 1 ;i++){
      if( select_max < (eachChildDevice[index].signal_Area[i].count + eachChildDevice[index].signal_Area[i+1].count)){
        select_max = (eachChildDevice[index].signal_Area[i].count + eachChildDevice[index].signal_Area[i+1].count) ;
          index_max = i;
      }
    }

    eachChildDevice[index].valid_area_count = select_max;
    eachChildDevice[index].valid_area_index = index_max;


    //무결성 태스트 // 정상적으로 동작함.
    // var sum = 0;
    // for(var i = 0; i<eachChildDevice[index].signal_Area.length ;i++){
    // sum += eachChildDevice[index].signal_Area[i].count;
    // }
    // test_array = sum;
    // msp("scanMessage", "카운트 무결성: "+ sum);

    //document.getElementById('test3').innerHTML += "<br>" + "분포 최대 영역"+ index_max + "영역값" + select_max + "<br>";
  }
}

////////////////////////////////// BLE Range Select //////////////////////////////////////

var powerToMeter = function () {
      // .

      var meter_range_index = 40/signal_range;
      // 배열에 값을 저장해야 하니깐..

      var meter_array = new Array(meter_range_index);

      // 배열의 수를 만들었다. 이제 각 배열에 반복문을 이용하여 값을 계산하도록 하자.
      var setIndexMeter_array = function () {
        meter_array = [meter_range_index];
      }

      var calculateRange = function (sign_difference){
         return  Math.pow(10, (sign_difference) / 20);
      }

      for(var i=0; i < meter_array.length; i++){
        meter_array[i] = calculateRange((i+1)*signal_range).toFixed(1);
      }

      return meter_array;

    }

    var setRangeMeter = function () {
        var array_BLE_Meter = powerToMeter();
        // document.getElementById('view_range').innerHTML = "";
        for(var i = array_BLE_Meter.length-1 ; i >= 1 ; i--){
          document.getElementById('alarm_range_BLE').innerHTML +=
          "<option value="+i+">" + array_BLE_Meter[i] + "m 超過</option>";
        }
      }

      window.onload = function () {
        setRangeMeter();
        audio.music = new Audio('alarm.mp3');
        //alert(typeof audio.music);
      }


/////////////////////////////////////////////signa GPS///////////////////////////////////////////////////////

var distanceGPS = function (flat, flon) {
  if(typeof Latitude === "undefined" || typeof Longitude === "undefined"){
    cdn.getLocation();
  }else{
    // var currentTime = new Date();
    // var difference_time = currentTime - get_coord_time;
    // if(difference_time > 15000){
    //     msp("textMessage","GPS 신호를 받아 오는 중입니다.");
    //     cdn.getLocation();
    //   }
  }

  var p1 = LatLon(flat, flon);
  var p2 = LatLon(Latitude, Longitude);
  var dist = p1.distanceTo(p2);
  var d = (dist).toFixed(2); // in km rounded to 4 significant figures
  //(dist).toPrecision(4)
  return d;
}


/////////////////////////////////////////////////////button/////////////////////////////////////////////////////


var buttonOn = function () {
  bluetoothle.initialize();
  bluetoothle.enable();
  ms("textMessage", "bluetoothスタート");
}

var buttonOff = function () {
  bluetoothle.initialize();
  bluetoothle.disable();
  ms("textMessage","bluetoothを消します。");
}

var BT_getAdapterInfo = function () {
  bluetoothle.initialize();
  bluetoothle.getAdapterInfo(function (value){
      //ms("textMessage", JSON.stringify(value));
  });
}

// var BT_startScan = function () {
//   bluetoothle.initialize();
//     bluetoothle.startScan(
//       function (value){
//         //msp("scanMessage", JSON.stringify(value));
//         msp("scanMessage",  "Mac : "+value.address +"<br>");
//         msp("scanMessage",  "Rssi :"+value.rssi +"<br>");
//         msp("scanMessage",  "ad all :"+ encodeAD(value) +"<br>");
//         //msp("scanMessage",  "ad :"+ bluetoothle.encodedStringToBytes(value.advertisement)[0].toString(16).toUpperCase() +"<br>");
//         msp("scanMessage",  "uuid :"+ getAD(value, "uuid") +"<br>");
//         msp("scanMessage",  "major :"+ getAD(value, "major") +"<br>");
//         msp("scanMessage",  "minor :"+ getAD(value, "minor") +"<br>");
//         msp("scanMessage",  "flat :"+ getAduinoFlat(value) +"<br>");
//         msp("scanMessage",  "flon :"+ getAduinoFlon(value) +"<br>");
//         msp("scanMessage",  "Tx Pw :"+ getTransmissionPower(value) +"<br>");
//         msp("scanMessage",  "length :"+ eachChildDevice[1].photo_address +"<br>");
//         //msp("scanMessage",  "Tx Pw :"+ distanceBLE(getTransmissionPower(value), value.rssi) +"<br>");
//         msp("scanMessage",  "------------------------<br>");
//       },
//       function (value){
//         ms("실패하였습니다.");
//       },
//       ''
//   );
//
// }

var signalSwitch = function (){
  signal_switch = !signal_switch;

  if(signal_switch){
    //ms("modeMessage","실외 모드 GPS");
  }else{
    //ms("modeMessage","실내 모드 Beacon");
  }
}

var modeSwitchGPS = function () {
  signal_switch = true;
}

var modeSwitchBLE = function () {
signal_switch = false;
}

var signal_switch = true; //true GPS 모드

var scanFlag = true;
var BT_startScan2 = function () {
    setRange();
    backGroundScanningPush();
  bluetoothle.initialize();
    bluetoothle.startScan(
      function (value){
        ms("textMessage","園児感知中");
         //ms("textMessage",JSON.stringify(value));
        for (var i=0;i<eachChildDevice.length;i++) {
          if(eachChildDevice[i].mac == value.address){
            eachChildDevice[i].rssi = value.rssi;
            eachChildDevice[i].scan_name_time = new Date();
            eachChildDevice[i].uuid = getAD(value, "uuid");
            eachChildDevice[i].major = getAD(value, "major");
            eachChildDevice[i].minor = getAD(value, "minor");
            eachChildDevice[i].setFlatFlon(getAduinoFlat(value),getAduinoFlon(value));
            eachChildDevice[i].dist = distanceGPS(eachChildDevice[i].flat, eachChildDevice[i].flon);
            eachChildDevice[i].txpw = getTransmissionPower(value);
            //ms("scanMessage",  "이름 : "+eachChildDevice[i].name +"<br>");
            // msp("scanMessage",  "Mac : "+eachChildDevice[i].mac +"<br>");
            // msp("scanMessage",  "Rssi :"+eachChildDevice[i].rssi +"<br>");
            // msp("scanMessage",  "Rssi2 :"+value.rssi +"<br>");
            // msp("scanMessage",  "Tx Pw :"+ getTransmissionPower(value) +"<br>");
            // msp("scanMessage",  "ad all :"+ encodeAD(value) +"<br>");
            // msp("scanMessage",  "uuid :"+ eachChildDevice[i].uuid +"<br>");
            // msp("scanMessage",  "major :"+ eachChildDevice[i].major +"<br>");
            // msp("scanMessage",  "minor :"+ eachChildDevice[i].minor +"<br>");
            // msp("scanMessage",  "BLEdistance :"+ distanceBLE(eachChildDevice[i].txpw, eachChildDevice[i].rssi) +"<br>");
            var arrayBLEMeter = powerToMeter();
            if(signal_switch){
              countArea(i);
              // if(scanFlag){
              //    ms("scanMessage",  "-감지된 원아 목록-<br>"+ eachChildDevice[i].name);
              //    scanFlag = false;
              // }else{
              //    msp("scanMessage",  ", "+ eachChildDevice[i].name);
              //    scanFlag = false;
              // }
              // msp("scanMessage",  "<br>");
              // msp("scanMessage",  "flat :"+ eachChildDevice[i].flat +"<br>");
              // msp("scanMessage",  "flon :"+ eachChildDevice[i].flon +"<br>");
              // msp("scanMessage",  "GPSdistance :"+ eachChildDevice[i].dist +"M 입니다.<br>");
              // if(eachChildDevice[i].valid_area_count > 4){
              //   msp("scanMessage",  "BLE 거리 :"+ arrayBLEMeter[eachChildDevice[i].valid_area_index] +"m 이상입니다."+"<br>");
              // }
              detectRange(i,arrayBLEMeter);
            }else{
              countArea(i);
              // if(scanFlag){
              //    ms("scanMessage",  "-감지된 원아 목록-<br>"+ eachChildDevice[i].name);
              //    scanFlag = false;
              // }else{
              //    msp("scanMessage",  ", "+ eachChildDevice[i].name);
              //    scanFlag = false;
              // }
              //msp("scanMessage",  "카운팅 횟수 :"+ eachChildDevice[i].valid_area_count +"<br>");
              // if(eachChildDevice[i].valid_area_index == 0 && eachChildDevice[i].valid_area_count > 4){
              //   msp("scanMessage",  "가깝습니다.<br>");
              // }else if(eachChildDevice[i].valid_area_index == 0){
              //   msp("scanMessage",  "측정 중 입니다.<br>");
              // }else if(eachChildDevice[i].valid_area_count > 6){
              //   msp("scanMessage",  "BLE 거리 :"+ arrayBLEMeter[eachChildDevice[i].valid_area_index] +"m ~ "+arrayBLEMeter[eachChildDevice[i].valid_area_index+2]+"m 사이일 가능성이 높습니다.<br>");
              //   msp("scanMessage",  "신뢰도가 높습니다.<br>");
              // }else if(eachChildDevice[i].valid_area_count > 4){
              //   msp("scanMessage",  "BLE 거리 :"+ arrayBLEMeter[eachChildDevice[i].valid_area_index] +"m ~ "+arrayBLEMeter[eachChildDevice[i].valid_area_index+2]+"m 사이일 가능성이 높습니다.<br>");
              //   msp("scanMessage",  "신뢰도가 보통입니다.<br>");
              // }else{
              //   msp("scanMessage",  "BLE 거리 :"+ arrayBLEMeter[eachChildDevice[i].valid_area_index] +"m ~ "+arrayBLEMeter[eachChildDevice[i].valid_area_index+2]+"m 사이일 가능성이 높습니다.<br>");
              //   msp("scanMessage",  "신뢰도가 낮습니다.<br>");
              // }
              detectRange(i,arrayBLEMeter);
            }
            //msp("scanMessage",  signal_switch+"<br>");
            //msp("scanMessage",  "<hr>");
            //backGroundPush();
          }
        }
        scanFlag = true;
      },
      function (value){
        ms("失敗です。");
      },
      ''
  );
  startViewName();
}

var audio_flag = true;
// alert("처음" + audio_flag);

var BT_stopScan = function () {
  bluetoothle.initialize();
  bluetoothle.stopScan();
  audio_flag = true;
  //alert("스탑"+audio_flag);
  clearInterval(startViewfunction);


  for(var i=0; i<theNumberOfChild; i++){
      eachChildDevice[i].valid_area_index = 0;
      // alert("되나"+eachChildDevice[i].valid_area_index);
      // eachChildDevice[i].signal_Area[0].__proto__.total_count = 0; // 이거 안 됨
      // alert("되나?");

  }


  backGroundAppPush();
    ms("textMessage","感知していません。");
}

var lastDetectStorage = function () {
  this.scan_interval;
  this.origin_order;
  this.distance_index;
  this.last_detect = false;
}

var view_interval = [];

var viewName = function () {
  var setTime_name = 5000;
  var current_time_view_name = new Date();
  for(var i = 0; i < theNumberOfChild; i++ ){
    view_interval[i] = new lastDetectStorage();
    view_interval[i].origin_order = i;
    if(current_time_view_name - eachChildDevice[i].scan_name_time < setTime_name){
      view_interval[i].scan_interval = current_time_view_name - eachChildDevice[i].scan_name_time;
      view_interval[i].distance_index = eachChildDevice[i].valid_area_index;
      view_interval[i].last_detect = true;
    }else{
      view_interval[i].last_detect = false;
    }
  }

  var view_filter = [];

  for(var i = 0; i <view_interval.length; i++){
    if(view_interval[i].last_detect){
      view_filter.push(view_interval[i]);
    }
  }

  try{
    view_filter.sort(function (one, two) {
      return two.distance_index - one.distance_index;
    });
  }catch(e){
  }

ms("scanMessage", "ー感知されてた園児ー<br>");
  for(var i = 0; i < view_filter.length; i++){
    if(!i){
      msp("scanMessage", eachChildDevice[view_filter[i].origin_order].name);
    }else{
      msp("scanMessage", ","+eachChildDevice[view_filter[i].origin_order].name);
    }
  }


  var breakawayFlag = true;
msp("scanMessage", "<br>ー離脱してた園児ー<br>");
  for(var i = 0; i < view_filter.length; i++){
    if(view_filter[i].distance_index >= fence_index){
      if(breakawayFlag){
        msp("scanMessage", eachChildDevice[view_filter[i].origin_order].name);
        breakawayFlag = false;
      }else{
        msp("scanMessage", ","+eachChildDevice[view_filter[i].origin_order].name);
      }
    }
    }

}


var startViewfunction;
var startViewName = function () {
  startViewfunction = setInterval(function(){
    viewName();
  },2000);
}



var BT_clear = function() {
    ms("textMessage","メッセージ");
    ms("scanMessage","感知メッセージ");
    ms("errorMessage","Errorメッセージ");
}




//#####################알람##################
    var id = 1, dialog;

    callback = function () {
        cordova.plugins.notification.local.getIds(function (ids) {
            showToast('IDs: ' + ids.join(' ,'));
        });
    };

    showToast = function (text) {
        setTimeout(function () {
            if (device.platform != 'windows') {
                window.plugins.toast.showShortBottom(text);
            } else {
                showDialog(text);
            }
        }, 100);
    };

    showDialog = function (text) {
        if (dialog) {
            dialog.content = text;
            return;
        }

        dialog = new Windows.UI.Popups.MessageDialog(text);

        dialog.showAsync().done(function () {
            dialog = null;
        });
    };


    ////////////////////////////////////////Alarm Range setting//////////////////////////

    var fence_range = undefined;
    var fence_index = undefined;

    var setRange = function (ble_distance_array_value) {
      var sel_BLE = document.getElementById("alarm_range_BLE");
        fence_index = Number(sel_BLE.options[sel_BLE.selectedIndex].value);
      var sel_GPS = document.getElementById("alarm_range_GPS");
        fence_range = Number(sel_GPS.options[sel_GPS.selectedIndex].value);

        var ble_distance_array = [];
        if(ble_distance_array_value !== undefined){
          ble_distance_array = ble_distance_array_value;

          if(fence_range !== NaN){
            for(var i = 0; fence_range >= ble_distance_array[i]; i++){
                fence_index = i
            }
          }


        }
      }

    /////////////////////////////////////////Alram function/////////////////////////////


    var detectRange = function (num, ble_distance_array_value){
      var fenceRange;
      var fenceIndex;
        var distance = eachChildDevice[num].dist;
        var index_BLE = eachChildDevice[num].valid_area_index;
        var count_BLE = eachChildDevice[num].valid_area_count;
        //  msp("scanMessage","되나?"+typeof fence_range +"<br>");
         if(typeof fence_range === "number"){
          //msp("scanMessage","범위저장됨"+ fence_range +"<br>");
           setRange(ble_distance_array_value);
            fenceRange = fence_range;
         }

         if(typeof fence_index === "number"){
           //msp("scanMessage","범위저장됨"+ fence_index+"<="+index_BLE +"<br>");
           setRange(ble_distance_array_value);
            fenceIndex = fence_index;
         }

    ///////////////////////////
    var discriminant_GPS = false;
    if(index_BLE < 5){
      //  BLE 거리 31.6m 미만일 경우 BLE 거리를 같이 파악
      discriminant_GPS = (distance>fenceRange && distance < 120) && ((index_BLE >= fenceIndex) && (index_BLE <= fenceIndex + 2) && count_BLE > 4) ;
      //  alert("index_BLE : " + index_BLE +"fenceIndex : " + fenceIndex + "distance : " + distance + "fenceRange : " + fenceRange);
    }else if(index_BLE == 6){
      // BLE 거리 31.6m 이상일 경우에는 GPS 거리만 파악
      discriminant_GPS = (distance>fenceRange && distance < 120) && ((index_BLE >= fenceIndex) && (index_BLE <= fenceIndex + 2));
    }else{
      discriminant_GPS = (distance>fenceRange && distance < 120);
    }

     var discriminant_BLE = (index_BLE >= fenceIndex) && count_BLE > 4;

      if(typeof eachChildDevice[num].scan_time === "undefined"){
        eachChildDevice[num].scan_time = new Date();

        if(signal_switch && discriminant_GPS){
          doAlarm(num);
        }

        if((!signal_switch) && discriminant_BLE){
          doAlarm(num);
        }

      }

        var currentTime = new Date();
        var time_difference = currentTime - (eachChildDevice[num].scan_time);
        //msp("scanMessage","GPS거리 : "+distance);

        if((signal_switch && discriminant_GPS)||((!signal_switch) && discriminant_BLE)){

          if((time_difference > 20000 || audio_flag)){
            eachChildDevice[num].scan_time = new Date();
            audio_flag = false;

            // 푸시 알람 발생
             doAlarm(num);

          }
        }
      }

      var audio = function () {
        var startTime;
        var music; // to save audio object
         //window.onload를 참고
      }

      //  var installAudio = function (){
      //    alert(typeof audio.music);
      //    if(typeof audio() == "Object"){
      //      alert(typeof audio.music);
      //       clearInterval(installAudio);
      //    }
      //      setInterval(function () {
      //      audio();
      //    }, 2000);
      //  }
       //
      //  installAudio();

      //alert(typeof audio.music);


      var doAlarm = function (num) {
          var audio_time_difference;
          if(typeof audio.startTime !== "Number"){
            //audio.music = new Audio('alarm.mp3');
            // 이 건 여기서 말고 시작할 때 바로 window.onload를 참고
            //alert(typeof audio.music);
            audio_time_difference = - 1;
            audio.startTime = new Date();
          }else{
            var currentTime = new Date();
            audio_time_difference = currentTime - audio.startTime;
          }




        // msp("scanMessage", audio_time_difference);

        if(audio_time_difference > 60000 || audio_time_difference < 0){
            audio.startTime = new Date();

            try{
              audio.music.pause();
            }catch(e){
            }finally{
              // 소리 알람 발생
                //음악
              audio.music.play();
            }
        }

          // 소리 알람 발생
            //비프음
            //navigator.notification.beep(8);

            // 진동 발생
            navigator.vibrate(3000);

            if(cordova.plugins.backgroundMode.isActive()){
              cordova.plugins.notification.local.schedule({
                  id: num,
                  text: eachChildDevice[num].name+' 원아가 멀어졌어요.',
                  icon: "",
                  data: { test: num }
              });

            }

            backGroundAlarm(num);


            function alertDismissed() {
              // 확인 메시지를 누르고 나서의 효과
              audio.music.pause();

            }

            navigator.notification.alert(
               eachChildDevice[num].name + '원아를 확인해 주세요.',  // message
               alertDismissed,         // callback
               '이탈 원아 감지',            // title
               '확인'                  // buttonName
           );
        };



///////////////////////////////////////BackgroundMode/////////////////////////////

// 스캐닝을 체크하는데 시간이 걸려서 함수 값을 제대로 받기 전에 다음 명령이 실행되어 버린다.
// 따라서 다음 방식을 사용할 수 없다.
// var checkScanning = function () {
//   var check_flag;
//   bluetoothle.initialize();
//   bluetoothle.getAdapterInfo(function (value){
//     check_flag = value.isScanning;
//     msp("scanMessage","스캐닝 동작1?" + check_flag)
//   });
//   return check_flag;
// }

var backGroundScanningPush = function () {
        cordova.plugins.backgroundMode.setDefaults({

          title: "にっこり　ケア",
          text: "스켄 동작 중",
          icon: 'icon',
          color: 'f4ad42', // hex format like 'F14F4D'
          resume: false,
          hidden: false,
          bigText: false
      });
    }

var backGroundAppPush = function () {
        cordova.plugins.backgroundMode.setDefaults({

          title: "にっこり　ケア",
          text: "앱 실행 중",
          icon: 'icon',
          color: 'f4ad42', // hex format like 'F14F4D'
          resume: false,
          hidden: false,
          bigText: false
      });
    }

var enterBackGroundMode = function () {
  cordova.plugins.backgroundMode.enable();

  backGroundAppPush();

    cordova.plugins.backgroundMode.on('activate', function() {
     cordova.plugins.backgroundMode.disableWebViewOptimizations();
    });

  ms("backMessage","ベクグラウンドゥで作動");
}


var endBackGroundMode = function () {
  cordova.plugins.backgroundMode.disable();
  ms("backMessage","ベクグラウンドゥ中止");
}

// var backGroundTest = function () {
//   msp("scanMessage",  "백그라운드 작동중? :"+ cordova.plugins.backgroundMode.isActive() +"<br>");
// }

var backGroundAlarm = function (num) {
  cordova.plugins.backgroundMode.setDefaults({

    title: "園児離脱感知",
    text: eachChildDevice[num].name +"子供を確認してください。",
    //icon: eachChildDevice[num].photo_address, // this will look for icon.png in platforms/android/res/drawable|mipmap //사진 경로 지정
    icon: 'icon',
    color: 'ffc1c1', // hex format like 'F14F4D'
    resume: true,
    hidden: false,
    bigText: false


    // title: String,
    // text: String,
    // icon: 'icon' // this will look for icon.png in platforms/android/res/drawable|mipmap
    // color: String // hex format like 'F14F4D'
    // resume: Boolean,
    // hidden: Boolean,
    // bigText: Boolean
});
}


////////////////////////////////////////GPS///////////////////////////////////////////
var Latitude = undefined;
var Longitude = undefined;
var coordError = undefined;

var cdn = {}; // 좌표값 coordinate
   // onSuccess Callback
   // This method accepts a Position object, which contains the
   // current GPS coordinates
   var get_coord_time;
   cdn.onSuccess = function(position) {
      //  ms("textMessage",
      //        'Latitude: '          + position.coords.latitude          + '<br/>' +
      //        'Longitude: '         + position.coords.longitude         + '<br/>' +
      //        'Altitude: '          + position.coords.altitude          + '<br/>' +
      //        'Accuracy: '          + position.coords.accuracy          + '<br/>' +
      //        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br/>' +
      //        'Heading: '           + position.coords.heading           + '<br/>' +
      //        'Speed: '             + position.coords.speed             + '<br/>' +
      //        'Timestamp: '         + position.timestamp                + '<br/>'
      //      );
           Latitude = position.coords.latitude;
           Longitude = position.coords.longitude;
           get_coord_time = new Date();
           ms("textMessage","座標情報をもらいました。");
   };


   // onError Callback receives a PositionError object
   cdn.onError = function (error) {
       ms("textMessage",
             'code: '    + error.code    + '\n' +
             'message: ' + error.message + '\n');
   }

   cdn.buttonGPS = function () {
     ms("textMessage","ちょっと待ってください。GPSローディング中<br/>");
      navigator.geolocation.getCurrentPosition(cdn.onSuccess, cdn.onError);
   }


   cdn.getLocation = function () {
      //navigator.geolocation.getCurrentPosition(cdn.locationSuccess, cdn.locationError, { timeout: 5000, enableHighAccuracy: true });
      navigator.geolocation.watchPosition(cdn.locationSuccess, cdn.locationError, { timeout: 5000, enableHighAccuracy: true });
   }

   cdn.locationSuccess = function(position){
     Latitude = position.coords.latitude;
     Longitude = position.coords.longitude;
     coordError = 1
   }

   cdn.locationError = function (error) {
     ms("textMessage","GPS受信失敗");
     coordError = 0
   }





//******************************* 구글 맵  *****************************************

// // Get geo coordinates
//
// function getMapLocation() {
//   // 어디서도 사용되고 있지 않음
//
//     navigator.geolocation.getCurrentPosition
//     (onMapSuccess, onMapError, { enableHighAccuracy: true });
// }
//
// // Success callback for get geo coordinates
// var onMapSuccess = function (position) {
//   //getMapLocation에서 사용 중
//
//     Latitude = position.coords.latitude;
//     Longitude = position.coords.longitude;
//
//     getMap(Latitude, Longitude);
//
// }
//
// // Get map by using coordinates
//
// function getMap(latitude, longitude) {
//   // onMapSuccess에서 사용 중
//
//     var mapOptions = {
//         center: new google.maps.LatLng(0, 0),
//         zoom: 0,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     };
//
//     map = new google.maps.Map
//     (document.getElementById("map"), mapOptions);
//
//
//     var latLong = new google.maps.LatLng(latitude, longitude);
//
//     var marker = new google.maps.Marker({
//         position: latLong
//     });
//
//     marker.setMap(map);
//     map.setZoom(17);
//     map.setCenter(marker.getPosition());
// }

// Success callback for watching your changing position

var onMapWatchSuccess = function (position) {


        Latitude = position.coords.latitude;
        Longitude = position.coords.longitude;

        initMap();
}

// Error callback

function onMapError(error) {
  // watchMapPosition에서 사용 중
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

// Watch your changing position

function watchMapPosition() {
  // 어디서도 사용되고 있지 않음
  // 이거 하니 한 번이 아닌 계속적인 깜빡임 문제 발생

    return navigator.geolocation.watchPosition
    (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
}

var map;
     function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         zoom: 16,
         center: new google.maps.LatLng(Latitude, Longitude),
         mapTypeId: 'roadmap'
       });

       var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
       var icons = {
         teacher: {
           //icon: iconBase + 'library_maps.png'
           icon: 'img/map_teacher.png'
         },
         child: {
           //icon: iconBase + 'info-i_maps.png
           icon: 'img/map_child.png'
         }
       };

       var featuresPro = function(position, type) {
         this.position = position;
         this.type = type;
       }

       var featuresIns = [];

       var basefeatures = [
         {
           position: new google.maps.LatLng(Latitude.toFixed(6), Longitude.toFixed(6)),
           type: 'teacher'
         }
       ];

       for(var i=0;i<eachChildDevice.length;i++){
         featuresIns[i] = new featuresPro();
         featuresIns[i].position = new google.maps.LatLng(eachChildDevice[i].flat, eachChildDevice[i].flon);
         featuresIns[i].type = 'child';
       }


       function addMarker(feature) {
         var marker = new google.maps.Marker({
           position: feature.position,
           icon: icons[feature.type].icon,
           map: map
         });
       }

       var LatitudeTest = function () {return (Latitude + Math.random()/1000 - 0.0005).toFixed(6);}
       var LongitudeTest = function () {return (Longitude + Math.random()/1000 - 0.0005).toFixed(6)};

      addMarker(basefeatures[0]);
      for (var i = 0; i < featuresIns.length;i++){
        addMarker(featuresIns[i]);
      }


     }

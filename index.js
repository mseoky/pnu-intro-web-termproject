// 부산 날씨 API

$(document).ready(function() {
  var apiKey = "8cd397ded07942a9b7a51231231006"; // API 키 (23.6.24 만료 예정, 갱신 요망)
  var city = "Busan"; // 도시명
  var apiUrl = "https://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=" + city;

  $.ajax({
      url: apiUrl,
      method: 'GET',
      success: function(data) {
          var weather = data.current;
          var temperature = weather.temp_c;
          var humidity = weather.humidity;
          var condition = weather.condition.text;

          $("#temperature").text(temperature + "°C");
          $("#humidity").text(humidity + "%");
          $("#condition").text(condition);
      },
      error: function() {
          alert("날씨 정보를 가져오는 데 실패했습니다.");
      }
  });
});

// 추천 명소 지도 표시

function showMap(address) {
  document.getElementById("mapArea").innerHTML = "<div id='map'></div>";
  var container = document.getElementById('map');
  var options = {
    center: new kakao.maps.LatLng(35.1799, 129.0750), // 부산 위도, 경도 설정
    level: 3 // 지도 확대 레벨 설정
  };

  var map = new kakao.maps.Map(container, options);

  // 주소-좌표 변환 객체를 생성
  var geocoder = new kakao.maps.services.Geocoder();

  // 주소로 좌표를 검색
  geocoder.addressSearch(address, function (result, status) {
    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      // 결과값으로 받은 위치를 마커로 표시
      var marker = new kakao.maps.Marker({
        map: map,
        position: coords
      });

      // 인포윈도우로 장소에 대한 설명을 표시
      var infowindow = new kakao.maps.InfoWindow({
        content: '<div style="width:150px;text-align:center;padding:6px 0;">' + address + '</div>'
      });
      infowindow.open(map, marker);

      // 지도의 중심을 결과값으로 받은 위치로 이동
      map.setCenter(coords);
    }
  });
}

// 명소 검색 결과 표시

var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/6260000/AttractionService/getAttractionKr'; // URL
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'gb%2Bb3uvoyVSbVGHu4U988uK6tgyI%2BM2to8hNw6knP25qztY3E7dnY6ISe5mrWbWXsU7DJ3DUtBU76I5zip4d3g%3D%3D'; // 서비스 키
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('128');
queryParams += '&' + encodeURIComponent('resultType') + '=' + encodeURIComponent('json');
let api = url + queryParams;

async function fetchData(api) {
    const response = await fetch(api);
    const data = await response.json(); // JSON 데이터를 JavaScript 객체로 변환
    return data;
}

async function useData(api, input) {
    const jsonData = await fetchData(api); // API에서 JSON 데이터 가져오기
    // 원하는 값에 접근하기 위해 객체와 속성을 사용
    var attraction = jsonData.getAttractionKr.item.find(item => item.MAIN_TITLE === input);

    // 검색어 띄어쓰기 제거
    const trimmedInput = input.replace(/\s/g, '');

    // 매칭되는 명소 찾기, `MAIN_TITLE` 속성의 띄어쓰기 제거
    var attraction = jsonData.getAttractionKr.item.find(item => item.MAIN_TITLE.replace(/\s/g, '') === trimmedInput);


    if (attraction) {
        // 명소의 세부 정보와 사진 표시
        var detailsContainer = document.getElementById('attraction-details');
        detailsContainer.innerHTML = `
            <h1>명소 검색 결과</h1><br><br>
            <h2>${attraction.MAIN_TITLE}</h2><br>
            <h4>${attraction.SUBTITLE}</h4><br>
            <p><strong>주소:</strong> ${attraction.ADDR1}</p><br>
            <p><strong>연락처:</strong> ${attraction.CNTCT_TEL}</p><br>
            <p><strong>홈페이지:</strong> <a href="${attraction.HOMEPAGE_URL}" target="_blank">${attraction.HOMEPAGE_URL}</a></p><br>
            <p><strong>교통정보:</strong> ${attraction.TRFC_INFO}</p><br>
            <p><strong>운영일:</strong> ${attraction.USAGE_DAY}</p><br>
            <p><strong>휴무일:</strong> ${attraction.HLDY_INFO}</p><br>
            <p><strong>운영시간:</strong> ${attraction.USAGE_DAY_WEEK_AND_TIME}</p><br>
            <p><strong>이용료:</strong> ${attraction.USAGE_AMOUNT}</p><br>
            <p><strong>편의시설:</strong> ${attraction.MIDDLE_SIZE_RM1}</p><br>
            <p>${attraction.ITEMCNTNTS}</p><br>
            <div><img src="${attraction.MAIN_IMG_NORMAL}" alt="Main Image"></div>
        `;
    } else {
        document.getElementById('attraction-details').innerHTML = "검색한 명소의 세부 정보가 없습니다";
    }
}

function searchAttraction(event) {
    event.preventDefault();
    var input = document.getElementById('attraction-input').value;
    useData(api, input);
}
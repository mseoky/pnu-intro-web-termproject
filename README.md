# Busan-Attractions-Web - Pusan National University Coursework

> **Note:** This is a student project from my freshman year, archived to track my early development journey.
> (본 레포지토리는 1학년 전공 과정 중 수행한 프로젝트를 기록용으로 보관한 것입니다.)

## 📺 시연 영상 (Demo Video)
[![Busan Attraction Demo](https://img.youtube.com/vi/8Acivp3nBUQ/0.jpg)](https://youtu.be/8Acivp3nBUQ)

## 📌 개요 (Overview)
- **과목명:** 인터넷과웹기초 (Introduction to Internet and Web)
- **개발 기간:** 2023.5 - 2023.6 (Freshman 1st Semester)
- **주요 기능:** 부산 실시간 날씨 조회, 공공 API 기반 명소 검색, 카카오 지도 연동

## 🛠 기술 스택 (Tech Stack)
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS, jQuery 3.7.0)
- **APIs:** - [Kakao Maps API](https://apis.map.kakao.com/) (지도 표시 및 주소 변환)
  - [WeatherAPI.com](https://www.weatherapi.com/) (실시간 기상 정보)
  - [Busan Attraction Service API](https://www.data.go.kr/data/15063481/openapi.do) (부산 명소 공공 데이터)

## 🏗 웹 페이지 구조 (UI Structure)
<img src="./structure.jpg" width="600px" alt="Overall Structure">

## 💻 주요 로직 (Core Logic)
1. **실시간 날씨 연동:** 페이지 로드 시 AJAX를 통해 실시간 부산 날씨 데이터를 호출하여 UI에 반영합니다.
2. **명소 검색 시스템:** `fetch`를 사용하여 공공데이터 서버에서 데이터를 수신하며, 사용자 검색어와 데이터의 **띄어쓰기를 제거 후 비교하는 전처리 로직**을 통해 검색 정확도를 높였습니다.
3. **카카오 지도 연동:** 사용자가 추천 명소의 '지도 보기' 버튼을 클릭하면 `geocoder`를 통해 주소를 좌표로 변환하여 실시간 마커를 생성합니다.

## ✍️ 소감 (Self-Reflection)
1학년 때 처음으로 이종 API들을 결합하여 하나의 완성된 서비스를 만들어본 프로젝트입니다. 
- **성과:** 비동기 통신(AJAX, Fetch)의 기초를 다졌으며, 공공데이터를 실제 유효한 정보로 가공하는 과정을 경험했습니다.
- **성장:** 당시 버전 관리에 서툴러 파일명 뒤에 숫자를 붙여 관리하던 습관에서 벗어나, 현재는 Git을 통한 전문적인 버전 관리의 중요성을 깊이 체감하고 있습니다.

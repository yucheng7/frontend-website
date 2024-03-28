<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"
import { getDatabase, ref as databaseRef, child, set, get } from "firebase/database"
import { onMounted } from 'vue'
import { Loader } from "@googlemaps/js-api-loader"


//firebase初始化
const firebaseConfig = {
    apiKey: "AIzaSyCTqAGZ31eOT4AsKMzGK5ww6qB9f7TAvN4",
    authDomain: "animelist-data.firebaseapp.com",
    databaseURL: "https://animelist-data-default-rtdb.firebaseio.com",
    projectId: "animelist-data",
    storageBucket: "animelist-data.appspot.com",
    messagingSenderId: "675562826331",
    appId: "1:675562826331:web:a1842329db9e00be64ad7e",
    measurementId: "G-CD2Q1681M7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//firebase初始化
const anotherRes = ref('')
const response = ref({})
const responseobject = ref('')
const inputName = ref('')

const getGeolocation = async () => {
    try {
        const res = await axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAH8pEikITJffwzctmADIPHOZkhHi_J09c")
        console.log(res.data)
        anotherRes.value = res.data.location
        // addGeoLocationData(res.data.location)
    } catch (error) {
        console.log('發生錯誤', error)
    }

}


//獲取裝置地址座標
const getUserLocation = async () => {
    if (navigator.geolocation) {
        alert('可以取得位置');
        navigator.geolocation.getCurrentPosition((position) => {

            let object = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            responseobject.value = JSON.stringify(object)
            response.value = object
            console.log("取得位置成功", response.value);
            addGeoLocationData(object)
            getMaps(response.value.latitude, response.value.longitude)
        })
    } else {
        alert('無法取得位置');

    }
}
//獲取裝置地址座標


//新增資料
const addGeoLocationData = async (object) => {
    const realtimeDatabase = await getDatabaseData() //獲取舊資料
    console.log(realtimeDatabase);
    const newArray = []
    console.log(...realtimeDatabase.data.geo);
    newArray.push(...realtimeDatabase.data.geo)  //push舊資料
    newArray.push(object)//push新資料
    console.log(newArray);
    const database = getDatabase()
    set(databaseRef(database, 'data/geo'), newArray)
    console.log('新增成功');

}
//新增資料
//獲取目前的資料
const getDatabaseData = async () => {
    const database = getDatabase();
    const snapshot = await get(databaseRef(database, '/'));
    saveData.value = JSON.stringify(snapshot.val()); // snapshot.val();
    // console.log(saveData.value);
    // console.log(snapshot.val());
    return snapshot.val();
}
//獲取目前的資料
const saveData = ref('')
//新增預設資料
const addNewGeoLocationData = () => {
    const database = getDatabase()
    set(databaseRef(database, 'data/geo'), [{ latitude: 25.0777864, longitude: 121.5719522 }])
    console.log('新增新資料成功');
}
//新增預設資料

const searchData = ref({
    "languageCode": "zh-TW",
    "regionCode": "TW",
    "includedTypes": [
        "american_restaurant", "bakery", "bar", "barbecue_restaurant", "brazilian_restaurant", "breakfast_restaurant", "brunch_restaurant", "cafe", "chinese_restaurant", "coffee_shop", "fast_food_restaurant", "french_restaurant", "greek_restaurant", "hamburger_restaurant", "ice_cream_shop", "indian_restaurant", "indonesian_restaurant", "italian_restaurant", "japanese_restaurant", "korean_restaurant", "lebanese_restaurant", "meal_delivery", "meal_takeaway", "mediterranean_restaurant", "mexican_restaurant", "middle_eastern_restaurant", "pizza_restaurant", "ramen_restaurant", "restaurant", "sandwich_shop", "seafood_restaurant", "spanish_restaurant", "steak_house", "sushi_restaurant", "thai_restaurant", "turkish_restaurant", "vegan_restaurant", "vegetarian_restaurant", "vietnamese_restaurant"],
    "excludedTypes": [],
    "includedPrimaryTypes": [],
    "excludedPrimaryTypes": [],
    "maxResultCount": 20,
    "locationRestriction": {
        "circle": {
            "center": {
                "latitude": 25.084782173840342,
                "longitude": 121.56284515286235
            },
            "radius": 5000.0
        }
    },
    "rankPreference": "DISTANCE"
})

const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': 'AIzaSyAH8pEikITJffwzctmADIPHOZkhHi_J09c',
    'X-Goog-FieldMask': '*'
}

const searchNearby = async () => {
    try {
        const res = await axios.post('https://places.googleapis.com/v1/places:searchNearby', searchData.value, { headers: headers })
        console.log('res', res.data);
        response.value = res.data
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

const loader = new Loader({
    apiKey: 'AIzaSyAH8pEikITJffwzctmADIPHOZkhHi_J09c',
    version: 'weekly'
})
//獲取地圖
const getMaps = (lat, lng) => {
    console.log("準備執行", lat, lng);
    loader.load().then(() => {
        initMap(lat, lng)
    })
}

onMounted(async () => {
    await getGeolocation()
    // getUserLocation()
    getMaps(anotherRes.value.lat, anotherRes.value.lng)
})

const markers = ref([])

//獲取地圖
const initMap = (latitude, longitude) => {

    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
        gestureHandling: 'greedy'
    });
    console.log(map);
    const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map
    })
    console.log(marker);
    const infoWindow = new google.maps.InfoWindow({
        content: 'Hello World!',
        position: { lat: latitude, lng: longitude },
    })
    infoWindow.open(map, marker)

}

const pageValue = ref(1) // 0 代表左頁 1 代表右頁
const moveToPage = () => {
    const pageHeight = window.innerHeight
    console.log(pageHeight);
    window.scrollTo({
        top: pageHeight * pageValue.value,
        behavior: 'smooth'
    }) // window.scrollTo

}

const moveToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    }) // window.scrollTo
}

const isActive = ref(false)

const moveToBottom = () => {
    const pageHeight = window.innerHeight
    window.scrollTo({
        top: pageHeight * 2,
        behavior: 'smooth'
    })
}

window.scrollTo({
        top: 80,
        behavior: 'smooth'
    })
</script>

<template>
    <!-- 金鑰 AIzaSyAH8pEikITJffwzctmADIPHOZkhHi_J09c -->
    <div class="map">
        <div class="map-content">
            <div class="map-title" @click="moveToBottom">我是標題</div>
            <div class="map-item" id="map"></div>
            <input :class="{ 'active': !isActive }" type="text" value="" v-model="inputName" v-show="!isActive">
            <div class="map-item-btn">
                <button @click="searchNearby">搜尋附近</button>
                <button @click="isActive = !isActive">條件篩選</button>
            </div>
            <div :class="{ 'selector': true, 'active': isActive, 'fadeout': !isActive }">
                我是篩選塊
            </div>
        </div>
        <div class="searchData">
            <div class="searchData-title">500公里內搜尋結果</div>
            <div class="searchData-content">
                <ul class="searchDate-list">
                    <li class="searchData-list-item">
                        <div>搜尋結果</div>
                        <div>搜尋結果</div>
                    </li>
                    <li class="searchData-list-item">123</li>
                </ul>
            </div>
        </div>
        <div class="map-function">
            <div class="map-function-item">
                <div class="map-function-item-response">
                    <input type="text" value="" v-model="response">
                    <textarea name="" id="" cols="30" rows="10" v-model="responseobject"></textarea>
                    <button @click="getDatabaseData">點擊獲取</button>
                    <button @click="getUserLocation">點擊修改</button>
                    <button @click="addNewGeoLocationData">點擊新增預設資料</button>
                    <textarea name="" id="" cols="30" rows="10" v-model="saveData"></textarea>
                    <button @click="moveToTop">點擊回頂</button>
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.map {
    width: 100%;
    margin: 0 auto;
    position: relative;

    .map-content {
        width: 100%;
        height: 100vh;
        background-color: antiquewhite;

        display: flex;
        align-items: center;
        flex-direction: column;
        box-sizing: border-box;
        position: relative;

        .map-title {
            padding: 10px;
            font-size: 30px;
            font-weight: bold;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .map-item {
            width: 100%;
            max-width: 1200px;
            height: 100%;
            background-color: gray;
            box-shadow: 0 5px 10px gray;
            box-sizing: border-box;
        }

        input {
            position: absolute;
            bottom: 10vh;
            margin: 20px;
            width: 80%;
            max-width: 600px;
            padding: 10px;
            font-size: 30px;
            font-weight: bold;
            box-sizing: border-box;
            outline: none;
            border: none;
            box-shadow: 0 0 5px gray;
            text-align: center;
            z-index: 100;
            border-radius: 10px;
        }

        .map-item-btn {
            width: 100%;
            display: flex;

            button {
                width: 100%;
                padding: 10px;
                font-size: 20px;
                border: none;
                font-weight: bold;
                z-index: 100;
            }
        }

        .selector {
            position: absolute;
            width: 100%;
            height: 70vh;
            background-color: white;
            bottom: 0;
            // z-index: 999;
            transition: all 0.2s ease-in
        }
    }

    .searchData {
        width: 100%;
        height: 100vh;
        background-color: antiquewhite;

        .searchData-title {
            padding: 10px;
            font-size: 30px;
            font-weight: bold;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .searchData-content {
            width: 100%;
            height: 100%;
            background-color: lightgoldenrodyellow;
            box-shadow: 0 5px 5px gray;
            box-sizing: border-box;
            list-style: none;
            .searchDate-list {
                width: 100%;
                font-size: 20px;
                background-color: white;
                padding: 10px;
                box-sizing: border-box;
                .searchData-list-item {
                    // width: 100%;
                    padding: 10px;
                    background-color: aquamarine;      
                }
            }
        }


    }

    .map-function {
        width: 100%;
        height: 100vh;
        background-color: bisque;
        display: flex;
        justify-content: center;
        align-items: center;

        .map-function-item {
            height: 80%;
            width: 80%;
            background-color: cornflowerblue;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;

            .map-function-item-response {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;

                input,
                textarea {
                    display: block;
                    width: 100%;
                    padding: 10px;
                    font-size: 20px;
                    font-weight: bold;
                    box-sizing: border-box;
                    outline: none;
                    border: 1px solid black;
                    overflow-wrap: break-word;
                }

                button {
                    width: 300px;
                    font-size: 20px;
                    padding: 10px;
                    margin-top: 20px;
                    cursor: pointer;
                    transition: all .2s ease-out;

                    &:active {
                        scale: 0.95;
                    }
                }
            }


        }
    }


}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.active {
    opacity: 1;
}

.fadeout {
    opacity: 0;
    z-index: -1;
}
</style>
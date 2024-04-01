<script setup>
import { ref } from 'vue'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"
import { getDatabase, ref as databaseRef, child, set, get } from "firebase/database"

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


//WIFI或網路獲取裝置位置
const getGeolocation = async () => {
    try {
        const res = await axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAH8pEikITJffwzctmADIPHOZkhHi_J09c")
        // console.log(res.data)
        anotherRes.value = res.data.location
        addGeoLocationData(res.data.location)
    } catch (error) {
        console.log('發生錯誤', error)
    }

}
//WIFI或網路獲取裝置位置

//獲取裝置地址座標
const getUserLocation = async () => {
    if (navigator.geolocation) {
        // alert('可以取得位置');
        navigator.geolocation.getCurrentPosition((position) => {

            let object = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            responseobject.value = JSON.stringify(object)
            response.value = object
            // console.log("取得位置成功", response.value);
            addGeoLocationData(object)
        })
    } else {
        alert('無法取得位置');

    }
}
//獲取裝置地址座標

//獲取目前的資料
const getDatabaseData = async () => {
    const database = getDatabase();
    const snapshot = await get(databaseRef(database, '/'));
    return snapshot.val();
}
//獲取目前的資料

//新增資料
const addGeoLocationData = async (object) => {
    const realtimeDatabase = await getDatabaseData() //獲取舊資料
    // console.log(realtimeDatabase);
    const newArray = []
    // console.log(...realtimeDatabase.data.geo);
    newArray.push(...realtimeDatabase.data.geo)  //push舊資料
    newArray.push(object)//push新資料
    // console.log(newArray);
    const database = getDatabase()
    await set(databaseRef(database, 'data/geo'), newArray)
    console.log('新增成功');

}
//新增資料
getUserLocation()

</script>

<template>
    <div class="weather">
        <div class="weather-box">
            <div class="weather-box-title">天氣</div>
            <div class="weather-box-description">描述</div>
            <div class="weather-box-temperature">溫度</div> 
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .weather {
        width: 100%;
        height: 100%;
        background-color: bisque;

        .weather-box {
            width: 100vw;
            height: 100vh;
            // border: 1px solid black;
            box-sizing: border-box;
        }
    }
</style>
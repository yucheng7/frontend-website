<script setup>
import { ref } from 'vue'
import axios from 'axios'
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

const response = ref('')
const responseobject = ref('')

const getGeolocation = async () => {
    try {
        const res = await axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAH8pEikITJffwzctmADIPHOZkhHi_J09c")
        console.log(res.data)
        response.value = res.data
        addGeoLocationData(res.data.location)
    } catch (error) {
        console.log('發生錯誤', error)
    }

}


//獲取裝置地址座標
const getUserLocation = () => {
    if (navigator.geolocation) {
        alert('可以取得位置');
        navigator.geolocation.getCurrentPosition((position) => {

            let object = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            responseobject.value = JSON.stringify(object)
            console.log("取得位置成功", responseobject.value);
            response.value = object.latitude, object.longitude
            addGeoLocationData(object)
        })
    } else {
        alert('無法取得位置');

    }
}
//獲取裝置地址座標


//新增資料
const addGeoLocationData = async(object) => {    
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
    set(databaseRef(database, 'data/geo'), [{latitude: 25.0777864, longitude: 121.5719522}])
    console.log('新增新資料成功');
}
//新增預設資料



</script>

<template>
    <!-- 金鑰 AIzaSyAH8pEikITJffwzctmADIPHOZkhHi_J09c -->
    <div class="map">
        <div class="map-content">
            <div class="map-item"></div>
        </div>
        <div class="map-function">
            <div class="map-function-item">
                <div class="map-function-item-response">
                    <input type="text" value="" v-model="response">
                    <textarea name="" id="" cols="30" rows="10" v-model="responseobject"></textarea>
                    <button @click="getDatabaseData">點擊獲取</button>
                    <button @click="getUserLocation">點擊修改</button>
                    <button @click="addNewGeoLocationData">點擊新增資料</button>
                    <textarea name="" id="" cols="30" rows="10" v-model="saveData"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.map {
    width: 100%;
    height: 100%;

    .map-content {
        width: 100%;
        height: 100vh;
        background-color: antiquewhite;
        display: flex;
        justify-content: center;
        align-items: center;

        .map-item {
            width: 80%;
            height: 80%;
            background-color: gray;
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
            width: 500px;
            min-height: 500px;
            background-color: cornflowerblue;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;

            .map-function-item-response {

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
</style>
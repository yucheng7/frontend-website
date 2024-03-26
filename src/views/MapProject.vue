<script setup>
import { ref } from 'vue'
import axios from 'axios'

const response = ref('')
const responseobject = ref('')

const getGeolocation = async () => {
    try {
        const res = await axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAH8pEikITJffwzctmADIPHOZkhHi_J09c")
        console.log(res.data)
        response.value = res.data
        responseobject.value = JSON.stringify(res.data)
        
    } catch (error) {
        console.log('發生錯誤', error)
    }

}

const getUserLocation = async() => {
    if(navigator.geolocation){
        alert('可以取得位置');
    }else{
        alert('無法取得位置');
    }
}

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
                    <button @click="getUserLocation">點擊獲取</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.map {
    width: 100%;
    height: 100%;
    display: flex;

    .map-content {
        width: 50%;
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
        width: 50%;
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
                input, textarea {
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
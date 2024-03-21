<script setup>
import axios from 'axios'
import { ref } from 'vue'
import firebase from "firebase/compat/app";

import "firebase/compat/auth"

//配置firebase
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import initializeApp from "firebase/compat/analytics";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCTqAGZ31eOT4AsKMzGK5ww6qB9f7TAvN4",
    authDomain: "animelist-data.firebaseapp.com",
    projectId: "animelist-data",
    storageBucket: "animelist-data.appspot.com",
    messagingSenderId: "675562826331",
    appId: "1:675562826331:web:a1842329db9e00be64ad7e",
    measurementId: "G-CD2Q1681M7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = firebase.auth();
//配置firebase


// 獲取動漫資料 //
const data = ref([])
const totalCount = ref(0)
const listCount = ref(0)
const filterYear = ref(2024)
const filterSeason = ref('spring')
const allSeason = [['spring', '春季'], ['summer', '夏季'], ['autumn', '秋季'], ['winter', '冬季']]
const perPage = ref(50)
const page = ref(1)
const seasonChinese = ref('春季')

const getAnimeList = async () => {
    try {
        const res = await axios.get(`https://api.annict.com/v1/works?access_token=C23CjuV8eGIYLnn0qRkUUhDTWdl6KFwuS-ZzzTy9IB0&sort_id=desc&filter_season=${filterYear.value}-${filterSeason.value}&per_page=${perPage.value}&page=${page.value}`)
        totalCount.value = res.data.total_count
        data.value.push(...res.data.works)

        // console.log(res.data.works.media_text)
        listCount.value += 50
        page.value++
        if (listCount.value < totalCount.value) {
            await getAnimeList()
        } else {
            getAnimeStaffList()
        }
        // console.log(data.value);
        // console.log(filterYear.value);

    } catch (error) {
        console.log('發生錯誤', error)
    }
}

const resetAnimeList = () => {
    data.value = []
    totalCount.value = 0
    listCount.value = 0
    page.value = 1
    idGroup.value = []
}

const seasonChineseChange = () => {
    if (filterSeason.value == 'spring') {
        seasonChinese.value = '春季'
    } else if (filterSeason.value == 'summer') {
        seasonChinese.value = '夏季'
    } else if (filterSeason.value == 'autumn') {
        seasonChinese.value = '秋季'
    } else if (filterSeason.value == 'winter') {
        seasonChinese.value = '冬季'
    }
}

const handleYearChange = () => {
    resetAnimeList()
    getAnimeList()
    seasonChineseChange()
}

getAnimeList()
// 獲取動漫資料 //

// 獲取動漫製作組資料 //

const idGroup = ref([])
const getAnimeStaffList = async () => {
    //獲取動漫ID

    data.value.forEach(async (item, index) => {
        // console.log(index)
        // console.log(item.id);
        idGroup.value.push(item.id)
        // console.log(idGroup.value.length);
        // console.log(idGroup.value[0].data);
    })
    // console.log(idGroup.value);
    //獲取動漫ID

    for (let i = 0; i < idGroup.value.length; i++) {
        const res = await axios.get(`https://api.annict.com/v1/staffs?access_token=C23CjuV8eGIYLnn0qRkUUhDTWdl6KFwuS-ZzzTy9IB0&filter_work_id=${idGroup.value[i]}`)
        // console.log(i+1+'完成');
        // console.log(res.data.staffs);
        data.value[i].staffs = res.data.staffs // 在data新增staffs屬性並將值設為res.data.staffs
    }
}
// 獲取動漫製作組資料 //


// 年份選擇 //
const yearsCount = ref(0)
const yearsGroup = ref([])

for (yearsCount.value = 2024; yearsCount.value >= 1990; yearsCount.value--) {
    yearsGroup.value.push(yearsCount.value)
}

// console.log(yearsGroup.value);
// 年份選擇 //

// 獲取輸入的動漫作品資料
const animeTitle = ref('ラブライブ')
let animeTitleSave = ''
const searchTypeAnimelist = ref([])
const getSearchAnimeList = async () => {
    try {
        const res = await axios.get(`https://api.annict.com/v1/works?access_token=C23CjuV8eGIYLnn0qRkUUhDTWdl6KFwuS-ZzzTy9IB0&sort_season=desc&filter_title=${animeTitle.value}`)
        searchTypeAnimelist.value = res.data.works
        animeTitleSave = animeTitle.value
        // console.log('這是輸入的動漫作品資料')
        // console.log(searchTypeAnimelist.value);
    } catch (error) {
        console.log('發生錯誤', error)
    }
}

const handleSearchChange = () => {
    // 先把變量重置
    searchTypeAnimelist.value = []
    // 先把變量重置
    //開始獲取搜尋相關動漫
    getSearchAnimeList()
    //開始獲取搜尋相關動漫
}

getSearchAnimeList()
// 獲取輸入的動漫作品資料

//切換動漫搜尋方式
//0 = 年份 1 = 作品名
const searchType = ref(0)
//0 = 年份 1 = 作品名 2=我的最愛列表
const handleClickYearSearchType = () => {
    searchType.value = 0
}
const handleClickNameSearchType = () => {
    searchType.value = 1
}
//切換動漫搜尋方式
//側邊工具列顯示
const sideToolShow = ref(true)
//側邊工具列顯示
// 註冊登入功能
const userEmail = ref('aa102133395@gmail.com')
const userPassword = ref('123456')
const userUid = ref('') // 目前登入使用者id
const loginUser = ref('') // 儲存目前登入使用者
const loginBox = ref(false) // 登入框顯示
const userState = ref(false) // 是否為登入狀態
const logoutBox = ref(false) // 登出框顯示
const createNewUser = async () => {
    try {
        await firebase.auth().createUserWithEmailAndPassword(userEmail.value, userPassword.value)
        console.log('註冊成功');
        userLogin()
    } catch (error) {
        console.log(error.message);
        console.log('註冊失敗');
    }
}
const userLogin = async () => {
    try {
        const res = await firebase.auth().signInWithEmailAndPassword(userEmail.value, userPassword.value)
        console.log('登入成功');
        console.log(res);
        userCheck()
    } catch (error) {
        console.log(error.message);
        console.log('登入失敗');
        createNewUser()
    }
}

const userCheck = async () => {
    const user = firebase.auth().currentUser
    if (user) {
        console.log('已登入')
        console.log(user.uid);
        userUid.value = user.uid
        loginUser.value = userEmail.value
        userEmail.value = ''
        userPassword.value = ''
        loginBox.value = false
        userState.value = true
        sideToolShow.value = true
    }
}


// 註冊登入功能

// 註冊登出功能
const userLogout = () => {
    loginUser.value = ''
    userState.value = false
    userUid.value = ''
    logoutBox.value = false
    sideToolShow.value = true
    console.log('登出成功');
}
// 註冊登出功能

//回到頂部功能
const backToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
//回到頂部功能

//加到最愛
const favoriteAnimeList = ref({
    data: {
        user: [
            {
                email: "aa39532058@gmail.com",
                uid: "bd9nhZ68dfJg52h8464684L7uG44",
                loveanimelist: [],
                // 假資料1
            },
            {
                email: "aa102133395@gmail.com",
                uid: "bd9nhZ68dIdfJg52hgeWv4L7uG33",
                loveanimelist: [],
            },
            {
                email: "aa3askpdofkpas58@gmail.com",
                uid: "dafsdsfdsa52h8464684L7uG44",
                loveanimelist: [],
                // 假資料2
            }
        ]
    }
})
console.log(favoriteAnimeList.value.data.user[0].loveanimelist);
// const favoriteAnimeList = ref([])
const addFavorite = (userid, animeid) => {
    const userIndex = favoriteAnimeList.value.data.user.findIndex((item) => {
        return item.uid == userUid.value
    }) //獲得當前登入使用者的資料位於數列中的索引值
    favoriteAnimeList.value.data.user[userIndex].loveanimelist.push(animeid)
    console.log(animeid + "已加入" + userid + "我的最愛中");
}
//加到最愛

//刪除最愛
const cancelFavoriteAnime = (animeid) => {
    const userIndex = favoriteAnimeList.value.data.user.findIndex((item) => {
        return item.uid == userUid.value
    }) //獲得當前登入使用者的資料位於數列中的索引值
    const res = favoriteAnimeList.value.filter((item) => item != animeid)
    favoriteAnimeList.value.data.user[userIndex].loveanimelist = res
    console.log(animeid + "已刪除");
}
//刪除最愛

//判斷是否在我的最愛
const checkAnimeInFavoriteList = (useruid, animeid) => {
    const nowUserData = favoriteAnimeList.value.data.user.find((item) => {
        return item.uid == useruid
    })
    // console.log(nowUserData);
    // console.log(nowUserData.loveanimelist.includes(animeid));
    return nowUserData.loveanimelist.includes(animeid)
}
//判斷是否在我的最愛

//使用者資訊視窗功能
const userInfoBox = ref(false)
// const openUserInfoBoxState = () => {
//     userInfoBox.value = true
// }
// const closeUserInfoBoxState = () => {
//     userInfoBox.value = false
// }
//使用者資訊視窗功能

//獲取目前登入使用者最愛列表
const loginUserIndex = ref('')
const loginUserFavoriteList = ref([])
const loginUserFavoriteListId = ref([])
const getFavoriteList = () => {
    loginUserIndex.value = favoriteAnimeList.value.data.user.findIndex((item) => {
        return item.uid == userUid.value
    })
    loginUserFavoriteListId.value = favoriteAnimeList.value.data.user[loginUserIndex.value].loveanimelist
    loginUserFavoriteListId.value.forEach(async(item) => {
        const res = await axios.get(`https://api.annict.com/v1/works?access_token=C23CjuV8eGIYLnn0qRkUUhDTWdl6KFwuS-ZzzTy9IB0&filter_ids=${item}`)
        loginUserFavoriteList.value.push(...res.data.works)
        console.log(loginUserFavoriteList.value);
    })
    
}//獲取目前登入使用者最愛列表索引


//獲取目前登入使用者最愛列表

</script>

<template>
    <div class="main">
        <!-- "金鑰" C23CjuV8eGIYLnn0qRkUUhDTWdl6KFwuS-ZzzTy9IB0 -->
        <div class="container">
            <!-- 頂部功能區塊 -->
            <div class="animelist-search">
                <div class="animelist-search-switch" v-show="searchType == 0 || searchType == 1">
                    <div class="animelist-search-switch-year" @click="handleClickYearSearchType">年份</div>
                    <div class="animelist-search-switch-name" @click="handleClickNameSearchType">作品名</div>
                </div>
                <div class="animelist-search-select-bar">
                    <input type="text" class="animelist-search-input" placeholder="輸入日文作品名搜尋" value=""
                        v-model="animeTitle" @input="handleSearchChange" v-show="searchType == 1">
                    <select class="animelist-search-select-year" name="" id="" v-model="filterYear"
                        @change="handleYearChange" placeholder="選擇年份" v-show="searchType == 0">
                        <option :value="i" v-for="i in yearsGroup" :key="i">{{ i }}</option>
                    </select>
                    <select class="animelist-search-select-season" name="" id="" v-model="filterSeason"
                        @change="handleYearChange" placeholder="選擇季節" v-show="searchType == 0">
                        <option :value="i[0]" v-for="i in allSeason" :key="i">{{ i[1] }}</option>
                    </select>
                </div>
                <button v-if="searchType == 2" @click="searchType = 0">返回</button>
            </div>
            <!-- 頂部功能區塊 -->
            
            <!-- 依年份季節搜尋動漫 -->
            <div class="animelist-content" v-if="searchType == 0">
                <div class="animelist-content-title">這是animelist搜尋結果，{{ filterYear }}年{{ seasonChinese }}總共{{
                        data.length
                    }}部
                </div>
                <div class="animelist-content-group" v-for="(item, i) in data" :key="i">
                    <div class="animelist-content-item">
                        <div class="animelist-content-item-img">
                            <img v-if="item.images.facebook.og_image_url" :src="item.images.facebook.og_image_url"
                                alt="" srcset="">
                            <div class="animelist-content-item-img-favorite"
                                v-if="userState && !checkAnimeInFavoriteList(userUid, item.id)"
                                @click="addFavorite(userUid, item.id)">未加入最愛</div>
                            <div class="animelist-content-item-img-favorite"
                                v-if="userState && checkAnimeInFavoriteList(userUid, item.id)"
                                @click="cancelFavoriteAnime(item.id)">已加入最愛</div>
                        </div>

                        <div class="animelist-content-item-description">
                            <div class="animelist-content-item-description-title">
                                <div class="animelist-content-item-description-title-name">{{ item.title }}
                                </div>
                            </div>
                            <div class="animelist-content-item-description-data">
                                <div class="animelist-content-item-description-data-mediatext">類型:{{ item.media_text }}
                                </div>
                                <div class="animelist-content-item-description-data-officialsiteurl">官網:{{
                        item.official_site_url }}</div>
                                <div class="animelist-content-item-description-data-seasonnametext">季度:{{
                        item.season_name_text }}</div>
                                <div class="animelist-content-item-description-data-staffslist">
                                    <div class="animelist-content-item-description-data-staffslist-title">製作組:</div>
                                    <div class="animelist-content-item-description-data-staffslist-des"
                                        v-for="(i, index) in item.staffs" :key="index">
                                        <div>{{ i.role_other ? i.role_other : i.role_text }}</div>
                                        <div> : </div>
                                        <div>{{ i.name }}</div>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                            <br />
                            <div>ID: {{ item.id }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 依年份季節搜尋動漫 -->
            <!-- 依動漫名搜尋動漫 -->
            <div class="animelist-content2" v-if="searchType == 1">
                <div class="animelist-content2-title">有關{{ animeTitleSave }}的搜尋結果，共{{ searchTypeAnimelist.length }}部
                </div>
                <div class="animelist-content2-group" v-for="(item, i) in searchTypeAnimelist" :key="i">
                    <div class="animelist-content2-item">
                        <div class="animelist-content2-item-img">
                            <img v-if="item.images.facebook.og_image_url" :src="item.images.facebook.og_image_url"
                                alt="無此圖片" srcset="">
                            <div class="animelist-content2-item-img-favorite"
                                v-if="userState && !checkAnimeInFavoriteList(userUid, item.id)"
                                @click="addFavorite(userUid, item.id)">未加入最愛</div>
                            <div class="animelist-content2-item-img-favorite"
                                v-if="userState && checkAnimeInFavoriteList(userUid, item.id)"
                                @click="cancelFavoriteAnime(item.id)">已加入最愛</div>
                        </div>
                        <div class="animelist-content2-item-description">
                            <div class="animelist-content2-item-description-title">
                                <div class="animelist-content2-item-description-title-name">{{ i + 1 }}.{{ item.title }}
                                </div>
                            </div>
                            <div class="animelist-content2-item-description-data">
                                <div class="animelist-content2-item-description-data-mediatext">類型:{{ item.media_text }}
                                </div>
                                <div class="animelist-content2-item-description-data-officialsiteurl">官網:
                                    {{ item.official_site_url }}</div>
                                <div class="animelist-content2-item-description-data-seasonnametext">季度:
                                    {{ item.season_name_text }}</div>
                                <div class="animelist-content2-item-description-data-staffslist">
                                    <div class="animelist-content2-item-description-data-staffslist-title">製作組:</div>
                                    <div class="animelist-content2-item-description-data-staffslist-des">
                                        <div>職位</div>
                                        <div> : </div>
                                        <div>名字</div>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 依動漫名搜尋動漫 -->
            <!-- 我的最愛列表 -->
            <div class="animelist-favoritelist" v-if="searchType == 2">
                <div class="animelist-favoritelist-content">
                    <ul class="favoritelist-group" v-for="(item, index) in loginUserFavoriteList" :key="index">
                        <li class="favoritelist-item">
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 我的最愛列表 -->
            <!-- 使用者登入 -->
            <div class="user-box" v-if="loginBox">
                <div class="user-box-login">
                    <div class="user-box-login-content">
                        <div class="user-box-login-content-out" @click="loginBox = false, sideToolShow = true">退出</div>
                        <input type="text" class="user-box-login-content-username" value="" v-model="userEmail"
                            placeholder="使用者帳號">
                        <input type="password" class="user-box-login-content-password" value="" v-model="userPassword"
                            placeholder="使用者密碼">
                        <button class="user-box-login-content-loginbtn" @click="userLogin">登入</button>
                    </div>
                </div>
            </div>
            <!-- 使用者登入 -->
            <!-- 使用者登出 -->
            <div class="user-logoutmsg" v-if="logoutBox">
                <div class="user-logoutmsg-content">
                    <div>是否確定要登出?</div>
                    <div class="user-logoutmsg-content-checkbutton">
                        <button @click="userLogout">確定</button>
                        <button @click="logoutBox = false, sideToolShow = true">取消</button>
                    </div>
                </div>
            </div>
            <!-- 使用者登出 -->
            <!-- 側邊懸浮工具列 -->
            <div class="animelist-sidetoolbar" v-if="sideToolShow">
                <div class="animelist-sidetoolbar-box">
                    <div class="animelist-sidetoolbar-item sidetoolbar-login-item"
                        @click="loginBox = true, sideToolShow = false" v-if="!userState">登入</div>
                    <div class="animelist-sidetoolbar-item sidetoolbar-nowuser-item" v-if="userState"
                        @click="userInfoBox = true">目前user</div>
                    <div class="animelist-sidetoolbar-item sidetoolbar-favorite-item" v-if="userState" @click="searchType = 2, getFavoriteList()">我的最愛</div>
                    <div class="animelist-sidetoolbar-item sidetoolbar-logout-item"
                        @click="logoutBox = true, sideToolShow = false" v-if="userState">登出</div>
                    <div class="animelist-sidetoolbar-item sidetoolbar-backtop-item" @click="backToTop">返回頂端</div>
                </div>
            </div>
            <!-- 側邊懸浮工具列 -->
            <!-- 使用者資訊視窗 -->
            <div class="user-about" v-if="userState && userInfoBox">
                <div class="user-about-box">
                    <div class="user-about-box-content">
                        <div class="user-about-box-content-userinfo">
                            <div class="user-about-box-content-userinfo-icon">使用者頭像</div>
                            <div class="user-about-box-content-userinfo-uid">USERID : {{ userUid }}</div>
                        </div>
                        <div class="user-about-box-content-check" @click="userInfoBox = false">
                            退出
                        </div>
                    </div>
                </div>
            </div>
            <!-- 使用者資訊視窗 -->

        </div>
    </div>


</template>

<style scoped lang="scss">
.main {
    background-color: aliceblue;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;

    .container {
        position: relative;
        width: 1200px;
        box-sizing: border-box;
        background-color: white;

        .animelist-search {
            border: 1px solid black;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            height: 100px;
            border-radius: 10px;
            width: 100%;
            box-sizing: border-box;

            .animelist-search-switch {
                width: 100%;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                box-shadow: 0 0 5px gray;
                border-radius: 30px;
                padding: 10px;
                margin: 0 20px;
                box-sizing: border-box;

                .animelist-search-switch-year {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    cursor: pointer;
                }

                // .animelist-search-switch-year::after {
                //     content: '';
                //     display: block;
                //     width: 0px;
                //     height: 2px;
                //     background-color: black;
                //     transition: all 0.2s linear;
                // }



                .animelist-search-switch-name {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    cursor: pointer;
                }
            }

            .animelist-search-select-bar {
                display: flex;
                justify-content: space-evenly;
                width: 100%;

                .animelist-search-input {
                    padding: 10px;
                    font-size: 20px;
                    text-align: center;
                    border-radius: 30px;
                    box-shadow: 0 0 5px gray;
                    color: lightgray;
                    border: none;
                    transition: all 0.2s linear;

                    &:focus {
                        color: black;
                        outline: none;
                        box-shadow: 0 0 3px black;
                    }

                    &:hover {
                        cursor: pointer;
                    }
                }
            }


        }

        .animelist-content {
            box-sizing: border-box;

            .animelist-content-title {
                font-size: 30px;
                text-align: center;
            }

            .animelist-content-item {
                display: flex;
                border-top: 1px solid black;
                box-sizing: border-box;

                .animelist-content-item-img {
                    min-width: 571px;
                    height: 300px;
                    background-color: aquamarine;
                    display: flex;
                    justify-content: center;
                    position: relative;

                    img {
                        height: 300px;
                        object-fit: contain;
                    }

                    .animelist-content-item-img-favorite {
                        position: absolute;
                        top: 0;
                        left: 0;
                        background-color: aliceblue;
                        width: 50px;
                        height: 50px;

                        &:hover {
                            cursor: pointer;
                            border: 1px solid black;
                            background-color: white;
                            box-sizing: border-box;
                        }
                    }
                }

                .animelist-content-item-description {
                    padding: 10px;
                    box-sizing: border-box;
                    border-left: 1px solid black;

                    .animelist-content-item-description-title {
                        .animelist-content-item-description-title-name {
                            font-size: 30px;
                            box-shadow: 0 0 3px gray;
                            border-radius: 5px;
                        }
                    }

                    .animelist-content-item-description-data {
                        .animelist-content-item-description-data-staffslist {
                            .animelist-content-item-description-data-staffslist-des {
                                display: flex;
                                font-size: 20px;

                                div {
                                    margin: 0 10px;
                                }
                            }
                        }
                    }
                }
            }
        }

        .animelist-content2 {
            box-shadow: 0 0 5px gray;

            .animelist-content2-title {
                font-size: 30px;
                text-align: center;
            }

            .animelist-content2-item {
                display: flex;
                outline: 1px solid black;

                .animelist-content2-item-img {
                    min-width: 571px;
                    height: 300px;
                    background-color: aquamarine;
                    display: flex;
                    justify-content: center;
                    position: relative;

                    img {
                        height: 300px;
                        object-fit: contain;
                    }

                    .animelist-content2-item-img-favorite {
                        position: absolute;
                        top: 0;
                        left: 0;
                        background-color: aliceblue;
                        width: 50px;
                        height: 50px;

                        &:hover {
                            cursor: pointer;
                            border: 1px solid black;
                            background-color: white;
                            box-sizing: border-box;
                        }
                    }
                }

                .animelist-content2-item-description {
                    padding: 10px;

                    .animelist-content2-item-description-title {
                        .animelist-content2-item-description-title-name {
                            font-size: 30px;
                            box-shadow: 0 0 3px gray;
                            border-radius: 5px;
                        }
                    }

                    .animelist-content2-item-description-data {
                        .animelist-content2-item-description-data-staffslist {
                            .animelist-content2-item-description-data-staffslist-des {
                                display: flex;
                                font-size: 20px;

                                div {
                                    margin: 0 10px;
                                }
                            }
                        }
                    }
                }
            }
        }

        .animelist-favoritelist {
            .animelist-favoritelist-content {
                .favoritelist-group {
                    list-style: none;
                }
            }
        }

        .user-box {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.5);

            .user-box-login {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 400px;
                height: 400px;
                background-color: white;
                border-radius: 50px;

                .user-box-login-content {
                    padding: 30px;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    height: 100%;

                    .user-box-login-content-out {
                        font-size: 20px;
                        padding: 10px;
                        background-color: red;
                        color: white;
                        border-radius: 10px;
                        text-align: center;
                        cursor: pointer;
                        border: 1px solid transparent;
                        transition: all 0.2s linear;

                        &:hover {
                            background-color: white;
                            color: red;
                            border: 1px solid red;
                            cursor: pointer;

                        }

                        &:active {
                            scale: 0.95;
                            font-weight: bold;
                        }
                    }

                    .user-box-login-content-username {
                        font-size: 20px;
                        padding: 10px;
                    }

                    .user-box-login-content-password {
                        font-size: 20px;
                        padding: 10px;
                    }

                    .user-box-login-content-loginbtn {
                        font-size: 20px;
                        padding: 10px;
                        width: 30%;
                        margin: 0 auto;
                        text-align: center;
                    }
                }


            }
        }

        .user-logoutmsg {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.5);

            .user-logoutmsg-content {
                width: 300px;
                height: 300px;
                background-color: aqua;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                font-size: 30px;

                .user-logoutmsg-content-checkbutton {
                    display: flex;
                    justify-content: space-evenly;

                    button {
                        font-size: 20px;
                        padding: 10px;
                        width: 30%;
                        margin: 0 auto;
                        text-align: center;
                    }
                }
            }
        }

        .animelist-sidetoolbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;

            .animelist-sidetoolbar-box {
                position: absolute;
                top: 150px;
                right: 15%;

                .animelist-sidetoolbar-item {
                    background-color: white;
                    // backdrop-filter: blur(5px);
                    position: fixed;
                    width: 50px;
                    height: 50px;
                    border: 1px solid black;
                    margin: 5px 0;
                    font-size: 18px;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: all 0.2s linear;

                    &:hover {
                        cursor: pointer;
                        background-color: lightgray;
                        color: white;
                    }

                    &:active {
                        scale: 0.95;
                        background-color: gray;
                        color: white;
                    }
                }

                .sidetoolbar-nowuser-item {}

                .sidetoolbar-favorite-item {
                    top: 210px;
                }

                .sidetoolbar-logout-item {
                    top: 270px;
                }

                .sidetoolbar-backtop-item {
                    top: 330px;
                }

            }




        }

        .user-about {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;

            .user-about-box {
                width: 600px;
                height: 400px;
                background-color: white;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                box-sizing: border-box;
                border: 1px solid black;
                border-radius: 10px;
                padding: 20px;

                .user-about-box-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-direction: column;
                    height: 100%;

                    .user-about-box-content-userinfo {
                        // background-color: aqua;
                        width: 100%;
                        height: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: space-evenly;
                        border: 1px black solid;
                        box-sizing: border-box;
                        border-radius: 5px;

                        .user-about-box-content-userinfo-icon {
                            width: 80px;
                            height: 80px;
                            background-color: blueviolet;
                            border-radius: 40px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }

                        .user-about-box-content-userinfo-uid {
                            font-size: 20px;
                            font-weight: bold;
                            text-align: center;
                        }
                    }

                    .user-about-box-content-check {
                        background-color: aquamarine;
                        width: 50%;
                        height: 50px;
                        text-align: center;
                        line-height: 50px;
                        border-radius: 5px;
                        transition: all .2s linear;

                        &:hover {
                            cursor: pointer;
                            background-color: white;
                            border: 1px solid aquamarine;
                            color: aquamarine;
                            box-sizing: border-box;
                        }

                        &:active {
                            scale: 0.95;
                            background-color: aquamarine;
                            border: 1px solid transparent;
                            color: black;
                            box-sizing: border-box;
                        }
                    }
                }
            }
        }
    }
}

.show {
    opacity: 0;
}

// 通用style
.fade {
    transition: opacity 0.2s linear;
}

.colortored {
    color: red;
}

// 通用style</style>
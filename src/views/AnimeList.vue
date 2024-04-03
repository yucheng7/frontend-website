<script setup>
import axios from 'axios'
import { ref } from 'vue'
import firebase from "firebase/compat/app";
import { getDatabase, ref as databaseRef, child, set, get, push } from "firebase/database"
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

        // console.log(res)
        listCount.value += 50
        page.value++
        if (listCount.value < totalCount.value) {
            await getAnimeList()
        } else {
            const haveImg = data.value.filter(item => {
                return item.images.facebook.og_image_url != ""
            })
            const dontHaveImg = data.value.filter(item => {
                return item.images.facebook.og_image_url == ""
            })
            const newData = [...haveImg, ...dontHaveImg]//展開兩個數組
            data.value = newData
            // console.log(data.value);
            // console.log(haveImg);
            // console.log(dontHaveImg);
            // console.log(haveImg.length+dontHaveImg.length);
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

const handleYearChange = async () => {
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
const pageType = ref(0)
//0 = 年份 1 = 作品名 2=我的最愛列表
const handleClickYearSearchType = () => {
    pageType.value = 0
}
const handleClickNameSearchType = () => {
    pageType.value = 1
    
}

const handleClickFavoritePageType = () => {
    getFavoriteList()
    pageType.value = 2
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
        alert('註冊成功')
        userLogin()
    } catch (error) {
        console.log(error.message);
        console.log('註冊失敗');
        alert('註冊失敗，帳號格式錯誤或密碼未達6位數規範，請重新註冊')
    }
}
const userLogin = async () => {
    try {
        const res = await firebase.auth().signInWithEmailAndPassword(userEmail.value, userPassword.value)
        console.log('登入成功');
        console.log(res);
        alert('登入成功')
        userCheck()
    } catch (error) {
        console.log(error.message);
        console.log('登入失敗');
        alert('登入失敗')
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
        const userData = {
            email: loginUser.value,
            uid: userUid.value
        }
        loginBox.value = false
        userState.value = true
        sideToolShow.value = true
        if (!favoriteAnimeList.value.data.user.some((item) => item.uid == userUid.value)) {
            favoriteAnimeList.value.data.user.push({
                email: userEmail.value,
                uid: userUid.value,
                loveanimelist: []
            })//暫時新增資料
        }
        await addDatabasedata(userData)
    }
}


// 註冊登入功能

// 註冊登出功能
const userLogout = () => {
    // userEmail.value = ''
    // userPassword.value = ''
    loginUser.value = ''
    userState.value = false
    userUid.value = ''
    logoutBox.value = false
    sideToolShow.value = true
    console.log('登出成功');
    alert('登出成功')
    pageType.value = 0
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
                email: "dfdf164646@gmail.com",
                uid: "Urmiesdfdsfdsfsdfs46RfNIt9i2",
                loveanimelist: [],
                // 假資料1
            },
            {
                email: "aa102133395@gmail.com",
                uid: "bd9nhZ68dIdfJg52hgeWv4L7uG33",
                loveanimelist: [],
            },
        ]
    }
})
// console.log(favoriteAnimeList.value.data.user[0].loveanimelist);
// const favoriteAnimeList = ref([])
const addFavorite = (userid, animeid) => {
    const userIndex = favoriteAnimeList.value.data.user.findIndex((item) => {
        return item.uid == userUid.value
    }) //獲得當前登入使用者的資料位於數列中的索引值
    favoriteAnimeList.value.data.user[userIndex].loveanimelist.push(animeid)
    console.log(animeid + "已加入" + userid + "我的最愛中");
    alert(animeid + "已加入我的最愛")
}
//加到最愛

//刪除最愛
const cancelFavoriteAnime = (animeid) => {
    const userIndex = favoriteAnimeList.value.data.user.findIndex((item) => {
        return item.uid == userUid.value
    }) //獲得當前登入使用者的資料位於數列中的索引值
    const res = favoriteAnimeList.value.data.user[userIndex].loveanimelist.filter((item) => item != animeid)
    favoriteAnimeList.value.data.user[userIndex].loveanimelist = res
    console.log(animeid + "已刪除");
    alert(animeid + "已刪除")
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
    loginUserFavoriteList.value = []
    loginUserIndex.value = favoriteAnimeList.value.data.user.findIndex((item) => {
        return item.uid == userUid.value
    })
    loginUserFavoriteListId.value = favoriteAnimeList.value.data.user[loginUserIndex.value].loveanimelist
    loginUserFavoriteListId.value.forEach(async (item) => {
        const res = await axios.get(`https://api.annict.com/v1/works?access_token=C23CjuV8eGIYLnn0qRkUUhDTWdl6KFwuS-ZzzTy9IB0&filter_ids=${item}`)
        loginUserFavoriteList.value.push(...res.data.works)
        // console.log(loginUserFavoriteList.value);
    })

}//獲取目前登入使用者最愛列表索引
//獲取目前登入使用者最愛列表

//判斷頁面是否滾動離開頂部功能
const windowScrollTop = ref(0)

window.addEventListener('scroll', () => {
    windowScrollTop.value = window.scrollY
    // console.log(windowScrollTop.value);
})
//判斷頁面是否滾動離開頂部功能

//我的最愛列表-刪除我的最愛項目
const deleteFavoritelistItem = (animeid) => {
    cancelFavoriteAnime(animeid)
    getFavoriteList()
}
//我的最愛列表-刪除我的最愛項目

//載入畫面
const isloading = ref(false)

const changeLoadingState = () => {
    isloading.value = !isloading.value
    console.log("執行");
}
//載入畫面

//獲取firebase資料庫存放的使用者資料
const getDatabaseData = async () => {
    const database = getDatabase()
    const snapshot = await get(databaseRef(database, 'data'))
    console.log(snapshot.val());
    set(databaseRef(database, 'data/user'), [
        {
            email: "aa102133395@gmail.com",
            uid: "bd9nhZ68dIdfJg52hgeWv4L7uG33",
            loveanimelist: [],
        }
    ])
}
//獲取firebase資料庫存放的使用者資料

//確認firebase資料庫是否有存放使用者資料
const checkDatabaseData = async (data) => {
    const database = getDatabase()
    const snapshot = await get(databaseRef(database, 'data'))
    console.log(snapshot.val().user);
    if (snapshot.val().user) {

        console.log("回傳true");
        return true
    } else {

        console.log("回傳false");
        return false

    }
}
//確認firebase資料庫是否有存放使用者資料

//新增使用者資料到firebase資料庫
const addDatabasedata = async (data) => {
    const database = getDatabase()
    const snapshot = await get(databaseRef(database, 'data'))
    console.log(snapshot.val());
    if (await checkDatabaseData(data.uid) == false) {
        console.log('未有使用者資料庫');
        await set(databaseRef(database, 'data'), {
            user: [
                {
                    email: data.email,
                    uid: data.uid,
                    loveanimelist: []
                }
            ]
        })
        console.log('新增使用者資料庫成功');
    } else {
        console.log('有使用者資料庫');
        console.log(typeof snapshot.val().user);
        const userDataList = snapshot.val().user
        console.log(userDataList);
        const res = userDataList.some(item => item.uid == data.uid)
        console.log('結果是:' + res);
        if (res) {
            console.log('已有此使用者存在');
        } else {
            userDataList.push(data)
            await set(databaseRef(database, 'data/user'), userDataList)
            console.log('新增使用者資料成功');
        }

    }

}
//新增使用者資料到firebase資料庫

//預設用資料
const addDefaultData = async () => {
    const database = getDatabase()
    const snapshot = await get(databaseRef(database, 'data'))
    console.log(snapshot.val());
    await set(databaseRef(database, '/'), {
        data: {
            user: [
                {
                    email: "aa104684684@gmail.com",
                    uid: "64646nhZ68d46464564646G33",
                    loveanimelist: [],
                },
                {
                    email: "aa104684sfd@gmail.com",
                    uid: "64646nsdff464564646G33",
                    loveanimelist: [],
                }
            ]
        }
    })
}
// addDefaultData()
//預設用資料

// ----------------------------------------------------------------------------
//WIFI或網路獲取裝置位置
// const anotherRes = ref('')
// const response = ref({})
// const responseobject = ref('')
// const getGeolocation = async () => {
//     try {
//         const res = await axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAH8pEikITJffwzctmADIPHOZkhHi_J09c")
//         // console.log(res.data)
//         anotherRes.value = res.data.location
//         await addGeoLocationData(res.data.location)
//     } catch (error) {
//         console.log('發生錯誤', error)
//     }

// }
// //WIFI或網路獲取裝置位置
// const options = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0
// }
// //獲取裝置地址座標
// const getUserLocation = async () => {
    
//     if (navigator.geolocation) {
//         // alert('可以取得位置');
//         navigator.geolocation.getCurrentPosition(async (position) => {

//             let object = {
//                 latitude: position.coords.latitude,
//                 longitude: position.coords.longitude
//             }
//             responseobject.value = JSON.stringify(object)
//             response.value = object
//             // console.log("取得位置成功", response.value);
//             await addGeoLocationData(object)
//         },(error) => {
//             console.log(error)
//         },options)
//     } else {
//         alert('無法取得位置');

//     }
// }
// //獲取裝置地址座標

// //獲取目前的資料
// // const getDatabaseData = async () => {
// //     const database = getDatabase();
// //     const snapshot = await get(databaseRef(database, '/'));
// //     return snapshot.val();
// // }
// //獲取目前的資料

// //新增資料
// const addGeoLocationData = async (object) => {
//     const database = getDatabase();
//     const snapshot = await get(databaseRef(database, '/'));
//     const realtimeDatabase = snapshot.val() //獲取舊資料
//     // console.log(realtimeDatabase);
//     const newArray = []
//     // console.log(...realtimeDatabase.data.geo);
//     newArray.push(...realtimeDatabase.data.geo)  //push舊資料
//     newArray.push(object)//push新資料
//     // console.log(newArray);
//     // const database = getDatabase()
//     await set(databaseRef(database, 'data/geo'), newArray)
//     console.log('新增成功');

// }
// //新增資料
// const doubleCatch = async () => {
//     // getUserLocation()
//     await getGeolocation()
// }

// getUserLocation()

// ----------------------------------------------------------------------------

</script>

<template>
    <div class="main">
        <!-- "金鑰" C23CjuV8eGIYLnn0qRkUUhDTWdl6KFwuS-ZzzTy9IB0 -->
        <div class="container">
            <!-- 頂部功能區塊 -->
            <div :class="{ 'animelist-search': true, 'cancelborderbottom': pageType == 2 }">
                <div class="animelist-search-switch" v-show="true">
                    <div :class="{ 'animelist-search-switch-year': true, 'highlight': pageType == 0 }"
                        @click="handleClickYearSearchType">季度搜尋</div>
                    <div :class="{ 'animelist-search-switch-name': true, 'highlight': pageType == 1 }"
                        @click="handleClickNameSearchType">作品名搜尋</div>
                    <div :class="{ 'animelist-search-switch-favorite': true, 'highlight': pageType == 2 }"
                        @click="handleClickFavoritePageType" v-if="userState">
                        我的最愛
                    </div>
                </div>
                <Transition name="fade">
                    <div class="animelist-search-select-bar" v-if="pageType != 2">
                        <input type="text" class="animelist-search-input" placeholder="輸入日文作品名搜尋" value=""
                            v-model="animeTitle" @input="handleSearchChange" v-show="pageType == 1">
                        <select class="animelist-search-select-year" name="" id="" v-model="filterYear"
                            @change="handleYearChange" placeholder="選擇年份" v-show="pageType == 0">
                            <option :value="i" v-for="i in yearsGroup" :key="i">{{ i }}</option>
                        </select>
                        <select class="animelist-search-select-season" name="" id="" v-model="filterSeason"
                            @change="handleYearChange" placeholder="選擇季節" v-show="pageType == 0">
                            <option :value="i[0]" v-for="i in allSeason" :key="i">{{ i[1] }}</option>
                        </select>
                    </div>
                </Transition>
            </div>
            <!-- 頂部功能區塊 -->
            <!-- 依年份季節搜尋動漫 -->
            <transition name="fade">
                <div class="animelist-content" v-if="pageType == 0 && data.length !== 0" id="animelist-content">
                    <div class="animelist-content-title">{{ filterYear }}年{{ seasonChinese }}總共{{
                data.length
            }}部
                    </div>
                    <div class="animelist-content-group">
                        <div :class="{ 'animelist-content-item': true }" v-for="(item, i) in data" :key="i">
                            <div class="animelist-content-item-title">
                                <div class="animelist-content-item-title-name">{{ item.title }}
                                </div>
                            </div>
                            <div class="animelist-content-item-description">
                                <div class="animelist-content-item-description-img">
                                    <a :href="item.official_site_url">
                                        <img v-if="item.images.facebook.og_image_url"
                                            :src="item.images.facebook.og_image_url" alt="" srcset="">
                                    </a>
                                    <div class="animelist-content-item-description-img-favorite"
                                        v-if="userState && !checkAnimeInFavoriteList(userUid, item.id)"
                                        @click="addFavorite(userUid, item.id)">未加入最愛</div>
                                    <div :class="{ 'animelist-content-item-description-img-favorite': true, 'addred': true }"
                                        v-if="userState && checkAnimeInFavoriteList(userUid, item.id)"
                                        @click="cancelFavoriteAnime(item.id)">已加入最愛</div>
                                </div>
                                <div class="animelist-content-item-description-data">
                                    <div class="animelist-content-item-description-data-mediatext">類型:{{ item.media_text
                                        }}
                                    </div>
                                    <div class="animelist-content-item-description-data-officialsiteurl">
                                        官網:{{ item.official_site_url }}</div>
                                    <div class="animelist-content-item-description-data-seasonnametext">
                                        季度:{{ item.season_name_text }}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </transition>
            <!-- 依年份季節搜尋動漫 -->
            <!-- 依動漫名搜尋動漫 -->
            <transition name="fade">
                <div class="animelist-content" v-if="pageType == 1 && animeTitle.length !== 0" id="animelist-content2">
                    <div class="animelist-content-title">有關{{ animeTitleSave }}的搜尋結果，共{{
                searchTypeAnimelist.length }}部
                    </div>
                    <div class="animelist-content-group">
                        <div :class="{ 'animelist-content-item': true }" v-for="(item, i) in searchTypeAnimelist"
                            :key="i">
                            <div class="animelist-content-item-title">
                                <div class="animelist-content-item-title-name">{{ item.title }}
                                </div>
                            </div>
                            <div class="animelist-content-item-description">
                                <div class="animelist-content-item-description-img">
                                    <a :href="item.official_site_url">
                                        <img v-if="item.images.facebook.og_image_url"
                                            :src="item.images.facebook.og_image_url" alt="" srcset="">
                                    </a>
                                    <div class="animelist-content-item-description-img-favorite"
                                        v-if="userState && !checkAnimeInFavoriteList(userUid, item.id)"
                                        @click="addFavorite(userUid, item.id)">未加入最愛</div>
                                    <div :class="{ 'animelist-content-item-description-img-favorite': true, 'addred': true }"
                                        v-if="userState && checkAnimeInFavoriteList(userUid, item.id)"
                                        @click="cancelFavoriteAnime(item.id)">已加入最愛</div>
                                </div>
                                <div class="animelist-content-item-description-data">
                                    <div class="animelist-content-item-description-data-mediatext">類型:{{
                item.media_text }}
                                    </div>
                                    <div class="animelist-content-item-description-data-officialsiteurl">
                                        官網:{{ item.official_site_url }}</div>
                                    <div class="animelist-content-item-description-data-seasonnametext">
                                        季度:{{ item.season_name_text }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="animelist-content-group" v-if="isloading">
                        <div :class="{ 'animelist-content-item': true }" v-for="(item, i) in 2" :key="i">
                            <div class="animelist-content-item-title">
                                <div class="animelist-content-item-title-name">{{ "標題名稱" }}
                                </div>
                            </div>
                            <div class="animelist-content-item-description">
                                <div class="animelist-content-item-description-img">
                                    <a href="">
                                        <img src="" alt="" srcset="">
                                    </a>
                                </div>
                                <div class="animelist-content-item-description-data">
                                    <div class="animelist-content-item-description-data-mediatext">類型:{{ "TV" }}
                                    </div>
                                    <div class="animelist-content-item-description-data-officialsiteurl">
                                        官網:{{ "官網網址" }}</div>
                                    <div class="animelist-content-item-description-data-seasonnametext">
                                        季度:{{ "季度" }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <!-- 依動漫名搜尋動漫 -->
            <!-- 我的最愛列表 -->
            <transition name="fade">
                <div class="animelist-favoritelist" v-if="pageType == 2 && loginUserFavoriteList.length !== 0">
                    <div class="animelist-favoritelist-content">
                        <ul class="favoritelist-group">
                            <li class="favoritelist-item" v-for="(item, index) in loginUserFavoriteList" :key="index">
                                <div class="favoritelist-item-top">
                                    <div class="favoritelist-item-top-title">
                                        {{ item.title }}
                                    </div>
                                    <button class="favoritelist-item-top-button"
                                        @click="deleteFavoritelistItem(item.id)">移除</button>
                                </div>

                                <div class="favoritelist-item-description">資訊</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
            <!-- 我的最愛列表 -->
            <!-- 使用者登入 -->
            <Transition name="quick">
                <div class="user-box" v-if="loginBox">
                    <div class="user-box-login">
                        <div class="user-box-login-content">
                            <div class="user-box-login-content-out" @click="loginBox = false, sideToolShow = true">退出
                            </div>
                            <input type="text" class="user-box-login-content-username" value="" v-model="userEmail"
                                placeholder="使用者帳號">
                            <input type="password" class="user-box-login-content-password" value=""
                                v-model="userPassword" placeholder="使用者密碼">
                            <button class="user-box-login-content-loginbtn" @click="userLogin">登入</button>
                        </div>
                    </div>
                </div>
            </Transition>
            <!-- 使用者登入 -->
            <!-- 使用者登出 -->
            <Transition name="quick">
                <div class="user-logoutmsg" v-if="logoutBox">
                    <div class="user-logoutmsg-content">
                        <div>是否確定要登出?</div>
                        <div class="user-logoutmsg-content-checkbutton">
                            <button @click="userLogout">確定</button>
                            <button @click="logoutBox = false, sideToolShow = true">取消</button>
                        </div>
                    </div>
                </div>
            </Transition>
            <!-- 使用者登出 -->
            <!-- 側邊懸浮工具列 -->
            <Transition name="quick">
                <div class="animelist-sidetoolbar" v-if="sideToolShow">
                    <div class="animelist-sidetoolbar-box">
                        <div class="animelist-sidetoolbar-item sidetoolbar-login-item"
                            @click="loginBox = true, sideToolShow = false" v-if="!userState">登入</div>
                        <div class="animelist-sidetoolbar-item sidetoolbar-nowuser-item" v-if="userState"
                            @click="userInfoBox = true">目前user</div>
                        <div class="animelist-sidetoolbar-item sidetoolbar-favorite-item"
                            v-if="userState && pageType == 0 || userState && pageType == 1"
                            @click="pageType = 2, getFavoriteList()">
                            我的最愛
                        </div>
                        <div class="animelist-sidetoolbar-item sidetoolbar-backhome-item"
                            v-if="userState && pageType == 2" @click="pageType = 0">返回首頁</div>
                        <div class="animelist-sidetoolbar-item sidetoolbar-logout-item"
                            @click="logoutBox = true, sideToolShow = false" v-if="userState">登出</div>
                        <div class="animelist-sidetoolbar-item sidetoolbar-backtop-item" @click="backToTop">返回頂端</div>
                    </div>
                </div>
            </Transition>
            <!-- 側邊懸浮工具列 -->
            <!-- 使用者資訊視窗 -->
            <Transition name="quick">
                <div class="user-about" v-if="userState && userInfoBox">
                    <div class="user-about-box">
                        <div class="user-about-box-content">
                            <div class="user-about-box-content-userinfo">
                                <div class="user-about-box-content-userinfo-icon">ICON</div>
                                <div class="user-about-box-content-userinfo-uid">USERID : {{ userUid }}
                                    <div class="user-about-box-content-userinfo-name">
                                    </div>
                                </div>
                            </div>
                            <div class="user-about-box-content-check" @click="userInfoBox = false">
                                退出
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
            <!-- 使用者資訊視窗 -->

        </div>
    </div>

</template>

<style scoped lang="scss">
@media (any-hover: hover) {
    .main {
        background-color: aliceblue;
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        // scroll-behavior: smooth;

        .container {
            max-width: 1200px;
            box-sizing: border-box;
            background-color: white;
            box-shadow: 0 0 5px gray;
            position: relative;

            .animelist-search {
                background-color: white;
                border-bottom: 1px solid black;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                box-sizing: border-box;

                .animelist-search-switch {
                    width: 100%;
                    height: 100px;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    border-bottom: 1px solid black;
                    box-sizing: border-box;
                    font-size: 25px;
                    font-weight: bolder;

                    .animelist-search-switch-year {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        cursor: pointer;
                        // background-color: aliceblue;
                        height: 100%;
                        // border-right: 1px solid black;
                        box-sizing: border-box;
                        padding: 20px;
                        transition: all 0.2s ease-in-out;

                        &:hover {
                            background-color: lightgray;
                            color: white;
                            font-size: 30px;
                            font-weight: bolder;
                        }
                    }

                    .animelist-search-switch-name {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        cursor: pointer;
                        // background-color: aliceblue;
                        height: 100%;
                        // border-right: 1px solid black;
                        padding: 20px;
                        box-sizing: border-box;
                        transition: all 0.2s ease-in-out;

                        &:hover {
                            background-color: lightgray;
                            color: white;
                            font-size: 30px;
                            font-weight: bolder;
                        }
                    }

                    .animelist-search-switch-favorite {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        cursor: pointer;
                        // background-color: aliceblue;
                        height: 100%;
                        // border-right: 1px solid black;
                        box-sizing: border-box;
                        padding: 20px;

                        &:hover {
                            background-color: lightgray;
                            color: white;
                            font-size: 25px;
                            font-weight: bolder;
                        }
                    }
                }

                .animelist-search-select-bar {
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    width: 100%;
                    height: 100px;
                    box-sizing: border-box;

                    .animelist-search-input {
                        padding: 10px;
                        width: 100%;
                        height: 100%;
                        box-sizing: border-box;
                        font-size: 30px;
                        text-align: center;
                        // border-radius: 30px;
                        // box-shadow: 0 0 5px gray;
                        color: lightgray;
                        border: none;
                        transition: all 0.25s ease-in-out;

                        &:focus {
                            color: black;
                            outline: none;
                            font-size: 40px;
                        }

                        &:hover {
                            cursor: pointer;
                        }
                    }

                    select {
                        font-size: 20px;
                        text-align: center;
                        border: none;
                        width: 100%;
                        height: 100px;
                        box-sizing: border-box;

                        &:focus {
                            outline: none;
                        }

                        &:hover {
                            cursor: pointer;
                        }

                        option {
                            text-align: center;
                        }
                    }
                }


            }

            .animelist-content {
                max-width: 100%;
                box-sizing: border-box;

                .animelist-content-title {
                    font-size: 30px;
                    text-align: center;
                    line-height: 50px;
                    width: 100%;
                }

                .animelist-content-group {
                    width: 100%;
                    height: 100%;


                    .animelist-content-item {
                        width: 100%;
                        padding: 0 20px 20px;
                        box-sizing: border-box;
                        // position: relative;
                        transition: all 0.25s ease-in-out;



                        .animelist-content-item-title {
                            width: 100%;
                            font-size: clamp(16px, 3vw, 25px);
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            box-sizing: border-box;
                            background-color: black;
                            color: white;
                            padding: 10px;
                            box-shadow: 0 0 5px black;
                            border-top-left-radius: 15px;
                            border-top-right-radius: 15px;
                            border: 1px solid black;
                        }

                        .animelist-content-item-description {
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            flex-wrap: wrap;
                            // border: 1px solid black;
                            box-sizing: border-box;
                            position: relative;
                            border-bottom-left-radius: 15px;
                            border-bottom-right-radius: 15px;
                            box-shadow: 0 0 5px black;

                            .animelist-content-item-description-data {
                                width: 100%;
                                padding: 10px;
                                font-size: clamp(16px, 3vw, 20px);
                                box-sizing: border-box;
                                display: flex;

                                // flex-wrap: wrap;
                                .animelist-content-item-description-data-mediatext,
                                .animelist-content-item-description-data-officialsiteurl,
                                .animelist-content-item-description-data-seasonnametext {
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    width: 100%;
                                    box-sizing: border-box;
                                }

                            }

                            .animelist-content-item-description-img {
                                min-height: 100px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                box-sizing: border-box;

                                img {
                                    width: 100%;
                                    box-sizing: border-box;
                                }

                                .animelist-content-item-description-img-favorite {
                                    position: absolute;
                                    top: 20px;
                                    right: 20px;
                                    background-color: white;
                                    width: 100px;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    height: 50px;
                                    box-sizing: border-box;
                                    transition: all 0.2s linear;
                                    color: red;
                                    font-weight: bold;
                                    border-radius: 25px;
                                    border: 1px solid red;

                                    &:hover {
                                        cursor: pointer;
                                        background-color: red;
                                        box-sizing: border-box;
                                        color: white;
                                        font-weight: bold;
                                    }

                                    &:active {
                                        scale: 0.95;
                                    }
                                }
                            }
                        }

                        &:last-child {
                            margin-bottom: 50px;
                        }
                    }

                }
            }

            .animelist-favoritelist {
                box-sizing: border-box;

                .animelist-favoritelist-content {
                    .favoritelist-group {
                        list-style: none;
                        box-sizing: border-box;

                        .favoritelist-item {
                            height: 100%;
                            border-bottom: 1px solid black;
                            padding: 10px;
                            box-sizing: border-box;

                            &:last-child {
                                margin-bottom: 50px;
                                border: none;
                            }

                            .favoritelist-item-top {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;

                                .favoritelist-item-top-title {
                                    width: 80%;
                                    font-size: 20px;
                                }

                                .favoritelist-item-top-button {
                                    padding: 10px;
                                    font-size: 16px;
                                    font-weight: bold;
                                    background-color: red;
                                    color: white;
                                    border-radius: 10px;
                                    text-align: center;
                                    cursor: pointer;
                                    border: 1px solid transparent;
                                    transition: all 0.2s ease-out;

                                    &:hover {
                                        border: 1px solid red;
                                        background-color: white;
                                        color: red;
                                    }

                                    &:active {
                                        scale: 0.95;
                                    }
                                }
                            }
                        }
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
                    border-radius: 10px;

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
                            font-weight: bold;
                            transition: all 0.2s ease-out;

                            &:hover {
                                background-color: white;
                                color: red;
                                border: 1px solid red;
                                cursor: pointer;

                            }

                            &:active {
                                scale: 0.95;
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
                            border-radius: 10px;
                            border: 1px solid transparent;
                            box-sizing: border-box;
                            font-weight: bold;
                            transition: all 0.2s ease-out;

                            &:hover {
                                cursor: pointer;
                                border: 1px solid black;
                                box-sizing: border-box;
                                background-color: black;
                                color: white;
                            }

                            &:active {
                                scale: 0.95;
                            }
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
                    background-color: white;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    font-size: 30px;
                    border-radius: 10px;
                    padding: 20px;
                    font-weight: bold;

                    .user-logoutmsg-content-checkbutton {
                        display: flex;
                        justify-content: space-evenly;

                        button {
                            font-size: 20px;
                            padding: 10px;
                            width: 30%;
                            margin: 0 auto;
                            text-align: center;
                            border-radius: 10px;
                            border: 1px solid transparent;
                            box-sizing: border-box;
                            font-weight: bold;
                            transition: all 0.2s ease-out;

                            &:hover {
                                cursor: pointer;
                                border: 1px solid black;
                                box-sizing: border-box;
                                background-color: black;
                                color: white;
                            }

                            &:active {
                                scale: 0.95;
                            }
                        }
                    }
                }
            }

            .animelist-sidetoolbar {

                // background-color: antiquewhite;
                .animelist-sidetoolbar-box {
                    // background-color: aqua;
                    position: fixed;
                    display: flex;

                    .animelist-sidetoolbar-item {
                        background-color: white;
                        // backdrop-filter: blur(5px);
                        width: 50px;
                        height: 50px;
                        // border: 1px solid black;
                        box-shadow: 0 0 5px gray;
                        margin: 5px;
                        font-size: 18px;
                        text-align: center;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        transition: all 0.2s linear;
                        padding: 5px;

                        // border-radius: 50px;
                        // box-sizing: border-box;
                        &:hover {
                            cursor: pointer;
                            background-color: lightgray;
                            color: white;
                            // border: 1px solid transparent;
                            box-shadow: 0 0 5px gray;
                        }

                        &:active {
                            scale: 0.95;
                            background-color: gray;
                            color: white;
                        }
                    }

                    .sidetoolbar-nowuser-item {}

                    .sidetoolbar-favorite-item {
                        // top: 210px;
                    }

                    .sidetoolbar-backhome-item {
                        // top: 210px;
                    }

                    .sidetoolbar-logout-item {
                        // top: 270px;
                    }

                    .sidetoolbar-backtop-item {
                        // top: 330px;
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
                            background-color: aliceblue;
                            width: 100%;
                            height: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: space-evenly;
                            border: 1px black solid;
                            box-sizing: border-box;
                            border-radius: 5px;
                            flex-wrap: wrap;

                            .user-about-box-content-userinfo-icon {
                                width: 80px;
                                height: 80px;
                                border-radius: 40px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                border: 1px black solid;
                                box-sizing: border-box;
                                background-color: white;

                            }

                            .user-about-box-content-userinfo-uid {
                                font-size: 16px;
                                font-weight: bold;
                                text-align: center;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-wrap: wrap;
                            }

                            // .user-about-box-content-userinfo-name {
                            //     font-size: 20px;
                            //     font-weight: bold;
                            //     text-align: center;
                            // }
                        }

                        .user-about-box-content-check {
                            background-color: red;
                            width: 50%;
                            text-align: center;
                            border-radius: 10px;
                            font-weight: bold;
                            box-sizing: border-box;
                            color: white;
                            border: 1px solid transparent;
                            font-size: 20px;
                            padding: 10px;
                            cursor: pointer;
                            transition: all 0.2s ease-out;

                            &:hover {
                                cursor: pointer;
                                background-color: white;
                                color: red;
                                border: 1px solid red;
                                box-sizing: border-box;
                            }

                            &:active {
                                scale: 0.95;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media (any-hover: none) {
    .main {
        background-color: aliceblue;
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        // scroll-behavior: smooth;

        .container {
            max-width: 1200px;
            box-sizing: border-box;
            background-color: white;
            box-shadow: 0 0 5px gray;
            position: relative;

            .animelist-search {
                background-color: white;
                border-bottom: 1px solid black;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                box-sizing: border-box;

                .animelist-search-switch {
                    width: 100%;
                    height: 100px;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    border-bottom: 1px solid black;
                    box-sizing: border-box;
                    font-size: 25px;
                    font-weight: bolder;

                    .animelist-search-switch-year {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        cursor: pointer;
                        // background-color: aliceblue;
                        height: 100%;
                        // border-right: 1px solid black;
                        box-sizing: border-box;
                        padding: 20px;
                    }

                    .animelist-search-switch-name {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        cursor: pointer;
                        // background-color: aliceblue;
                        height: 100%;
                        // border-right: 1px solid black;
                        padding: 20px;
                        box-sizing: border-box;


                    }

                    .animelist-search-switch-favorite {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        cursor: pointer;
                        // background-color: aliceblue;
                        height: 100%;
                        // border-right: 1px solid black;
                        box-sizing: border-box;
                        padding: 20px;


                    }
                }

                .animelist-search-select-bar {
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    width: 100%;
                    height: 100px;
                    box-sizing: border-box;

                    .animelist-search-input {
                        padding: 10px;
                        width: 100%;
                        height: 100%;
                        box-sizing: border-box;
                        font-size: 30px;
                        text-align: center;
                        // border-radius: 30px;
                        // box-shadow: 0 0 5px gray;
                        color: lightgray;
                        border: none;
                        transition: all 0.25s ease-in-out;

                        &:focus {
                            color: black;
                            outline: none;
                            font-size: 40px;
                        }


                    }

                    select {
                        font-size: 20px;
                        text-align: center;
                        border: none;
                        width: 100%;
                        height: 100px;
                        box-sizing: border-box;

                        &:focus {
                            outline: none;
                        }



                        option {
                            text-align: center;
                        }
                    }
                }


            }

            .animelist-content {
                width: 100%;
                box-sizing: border-box;

                .animelist-content-title {
                    font-size: 30px;
                    text-align: center;
                    line-height: 50px;
                    width: 100%;
                }

                .animelist-content-group {
                    width: 100%;
                    height: 100%;

                    .animelist-content-item {
                        width: 100%;
                        padding: 0 20px 20px;
                        box-sizing: border-box;

                        .animelist-content-item-title {
                            width: 100%;
                            font-size: clamp(16px, 3vw, 25px);
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            box-sizing: border-box;
                            background-color: black;
                            color: white;
                            padding: 10px;
                            box-shadow: 0 0 5px black;
                            border-top-left-radius: 15px;
                            border-top-right-radius: 15px;
                            border: 1px solid black;
                        }

                        .animelist-content-item-description {
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            flex-wrap: wrap;
                            // border: 1px solid black;
                            box-sizing: border-box;
                            position: relative;
                            border-bottom-left-radius: 15px;
                            border-bottom-right-radius: 15px;
                            box-shadow: 0 0 5px black;

                            .animelist-content-item-description-data {
                                width: 100%;
                                padding: 10px;
                                font-size: clamp(16px, 3vw, 20px);
                                box-sizing: border-box;
                                display: flex;
                                justify-content: space-evenly;
                                align-items: center;

                                // flex-wrap: wrap;
                                .animelist-content-item-description-data-mediatext,
                                .animelist-content-item-description-data-officialsiteurl,
                                .animelist-content-item-description-data-seasonnametext {
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    width: 100%;
                                    flex-wrap: wrap;
                                    flex-direction: column;
                                    // box-sizing: border-box;
                                    overflow: auto;
                                }

                            }

                            .animelist-content-item-description-img {
                                min-height: 100px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                box-sizing: border-box;

                                img {
                                    width: 100%;
                                    box-sizing: border-box;
                                }

                                .animelist-content-item-description-img-favorite {
                                    position: absolute;
                                    top: 20px;
                                    right: 20px;
                                    background-color: white;
                                    width: 100px;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    height: 50px;
                                    box-sizing: border-box;
                                    transition: all 0.2s linear;
                                    color: red;
                                    font-weight: bold;
                                    border-radius: 25px;
                                    border: 1px solid red;



                                    &:active {
                                        scale: 0.95;
                                    }
                                }
                            }
                        }

                        &:last-child {
                            margin-bottom: 50px;
                        }
                    }
                }

            }

            .animelist-favoritelist {
                box-sizing: border-box;

                .animelist-favoritelist-content {
                    .favoritelist-group {
                        list-style: none;
                        box-sizing: border-box;

                        .favoritelist-item {
                            height: 100%;
                            border-bottom: 1px solid black;
                            padding: 10px;
                            box-sizing: border-box;

                            &:last-child {
                                margin-bottom: 50px;
                                border: none;
                            }

                            .favoritelist-item-top {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;

                                .favoritelist-item-top-title {
                                    width: 80%;
                                    font-size: 20px;
                                }

                                .favoritelist-item-top-button {
                                    padding: 10px;
                                    font-size: 16px;
                                    font-weight: bold;
                                    background-color: red;
                                    color: white;
                                    border-radius: 10px;
                                    text-align: center;
                                    cursor: pointer;
                                    border: 1px solid transparent;
                                    transition: all 0.2s ease-out;



                                    &:active {
                                        scale: 0.95;
                                    }
                                }
                            }
                        }
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
                    border-radius: 10px;

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
                            font-weight: bold;
                            transition: all 0.2s ease-out;



                            &:active {
                                scale: 0.95;
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
                            border-radius: 10px;
                            border: 1px solid transparent;
                            box-sizing: border-box;
                            font-weight: bold;
                            transition: all 0.2s ease-out;



                            &:active {
                                scale: 0.95;
                            }
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
                    background-color: white;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    font-size: 30px;
                    border-radius: 10px;
                    padding: 20px;
                    font-weight: bold;

                    .user-logoutmsg-content-checkbutton {
                        display: flex;
                        justify-content: space-evenly;

                        button {
                            font-size: 20px;
                            padding: 10px;
                            width: 30%;
                            margin: 0 auto;
                            text-align: center;
                            border-radius: 10px;
                            border: 1px solid transparent;
                            box-sizing: border-box;
                            font-weight: bold;
                            transition: all 0.2s ease-out;



                            &:active {
                                scale: 0.95;
                            }
                        }
                    }
                }
            }

            .animelist-sidetoolbar {

                // background-color: antiquewhite;
                .animelist-sidetoolbar-box {
                    // background-color: aqua;
                    position: fixed;
                    display: flex;

                    .animelist-sidetoolbar-item {
                        background-color: white;
                        // backdrop-filter: blur(5px);
                        width: 50px;
                        height: 50px;
                        // border: 1px solid black;
                        box-shadow: 0 0 5px gray;
                        margin: 5px;
                        font-size: 18px;
                        text-align: center;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        transition: all 0.2s linear;
                        padding: 5px;

                        // border-radius: 50px;
                        // box-sizing: border-box;


                        &:active {
                            scale: 0.95;
                            background-color: gray;
                            color: white;
                        }
                    }

                    .sidetoolbar-nowuser-item {}

                    .sidetoolbar-favorite-item {
                        // top: 210px;
                    }

                    .sidetoolbar-backhome-item {
                        // top: 210px;
                    }

                    .sidetoolbar-logout-item {
                        // top: 270px;
                    }

                    .sidetoolbar-backtop-item {
                        // top: 330px;
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
                            background-color: aliceblue;
                            width: 100%;
                            height: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: space-evenly;
                            border: 1px black solid;
                            box-sizing: border-box;
                            border-radius: 5px;
                            flex-wrap: wrap;

                            .user-about-box-content-userinfo-icon {
                                width: 80px;
                                height: 80px;
                                border-radius: 40px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                border: 1px black solid;
                                box-sizing: border-box;
                                background-color: white;

                            }

                            .user-about-box-content-userinfo-uid {
                                font-size: 16px;
                                font-weight: bold;
                                text-align: center;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-wrap: wrap;
                            }

                            // .user-about-box-content-userinfo-name {
                            //     font-size: 20px;
                            //     font-weight: bold;
                            //     text-align: center;
                            // }
                        }

                        .user-about-box-content-check {
                            background-color: red;
                            width: 50%;
                            text-align: center;
                            border-radius: 10px;
                            font-weight: bold;
                            box-sizing: border-box;
                            color: white;
                            border: 1px solid transparent;
                            font-size: 20px;
                            padding: 10px;
                            cursor: pointer;
                            transition: all 0.2s ease-out;



                            &:active {
                                scale: 0.95;
                            }
                        }
                    }
                }
            }
        }
    }
}

#animelist-loading {
    z-index: 200;
}

.loading {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: white;
    display: flex;
    justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.quick-enter-active,
.quick-leave-active {
    transition: opacity 0.15s ease-in-out;
}

.quick-enter-from,
.quick-leave-to {
    opacity: 0;
}

.highlight {
    color: white;
    font-size: 30px;
    font-weight: bolder;
    transition: all 0.2s ease-in;
    background-color: black;
}

.addred {
    box-shadow: 0 0 10px red;
    color: red !important;
    border: 1px solid transparent !important;
}

.cancelborderbottom {
    border: none !important;
}

@media (min-width: 1200px) {

    .container {
        width: 100%;
    }


}

@media (max-width: 1200px) {
    .container {
        width: 100%;
    }
}

@media (min-width: 425px) {
    .container {
        .animelist-sidetoolbar {
            .animelist-sidetoolbar-box {
                flex-direction: column;
                bottom: 5%;
                right: 5%;
            }
        }
    }
}

@media (max-width: 425px) {
    .container {
        .user-box {
            .user-box-login {
                width: 90% !important;
            }
        }

        .user-logoutmsg {
            .user-logoutmsg-content {
                width: 80% !important;
            }
        }
    }
}

@media (max-width: 768px) {
    .container {
        .user-about {
            .user-about-box {
                width: 90% !important;
            }
        }
    }
}

@media (max-width: 1500px) {
    .container {
        .animelist-content-item-description-data {
            flex-direction: column;
        }

        .animelist-sidetoolbar {
            background-color: antiquewhite !important;

            .animelist-sidetoolbar-box {
                width: 100%;
                flex-direction: row;
                bottom: 0;
                left: 0;


                .animelist-sidetoolbar-item {
                    margin: 0 !important;
                    width: 100% !important;
                    box-sizing: border-box !important;

                    &:active {
                        scale: 1 !important;
                        background-color: gray;
                        color: white !important;
                    }
                }
            }
        }
    }
}
</style>
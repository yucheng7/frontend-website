<script setup>
import axios from 'axios'
import { ref } from 'vue'

// 獲取動漫資料 //
const data = ref([])
const totalCount = ref(0)
const listCount = ref(0)
const filterYear = ref(2024)
const filterSeason = ref('spring')
const perPage = ref(50)
const page = ref(1)


const getAnimeList = async () => {
    try {
        const res = await axios.get(`https://api.annict.com/v1/works?access_token=C23CjuV8eGIYLnn0qRkUUhDTWdl6KFwuS-ZzzTy9IB0&filter_season=${filterYear.value}-${filterSeason.value}&per_page=${perPage.value}&page=${page.value}`)
        totalCount.value = res.data.total_count
        data.value.push(...res.data.works)

        // console.log(res.data.works)
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

const handleYearChange = () => {
    resetAnimeList()
    getAnimeList()
}

getAnimeList()


// 獲取動漫資料 //

// 獲取動漫製作組資料 //
const staffsdata = ref([])
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
    console.log(idGroup.value);
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

console.log(yearsGroup.value);
// 年份選擇 //

</script>

<template>
    <!-- "金鑰" C23CjuV8eGIYLnn0qRkUUhDTWdl6KFwuS-ZzzTy9IB0 -->
    <div class="container">
        <div class="animelist-search">
            <div class="animelist-search-switch">
                <div class="animelist-search-switch-name">作品名</div>
                <div class="animelist-search-switch-year">年份</div>
            </div>
            <input type="text" placeholder="搜尋" value="" class="animelist-search-input">
            <select class="animelist-search-select" name="" id="" v-model="filterYear" @change="handleYearChange"
                placeholder="選擇年份">
                <option :value="i" v-for="i in yearsGroup" :key="i">{{ i }}</option>
            </select>
        </div>
        <div class="animelist-content">
            <div class="animelist-content-title">這是animelist搜尋結果，{{ filterYear }}年{{ filterSeason }}總共{{ data.length }}部
            </div>
            <div class="animelist-content-group" v-for="(item, i) in data" :key="i">
                <div class="animelist-content-item">
                    <div class="animelist-content-item-img">
                        <img v-if="item.images.facebook.og_image_url" :src="item.images.facebook.og_image_url" alt=""
                            srcset="">
                    </div>
                    <div class="animelist-content-item-description">
                        <div class="animelist-content-item-description-title">
                            <div class="animelist-content-item-description-title-name">{{ i + 1 }}. {{ item.title }}
                            </div>
                        </div>
                        <div class="animelist-content-item-description-data">
                            <div class="animelist-content-item-description-data-mediatext">類型:{{ item.media_text }}</div>
                            <div class="animelist-content-item-description-data-officialsiteurl">官網:{{ item.official_site_url }}</div>
                            <div class="animelist-content-item-description-data-seasonnametext">季度:{{ item.season_name_text }}</div>
                            <div class="animelist-content-item-description-data-staffslist">
                                <div class="animelist-content-item-description-data-staffslist-title">製作組:</div>
                                <div class="animelist-content-item-description-data-staffslist-des" v-for="(i, index) in item.staffs" :key="index" >
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
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 1200px;
    margin: 0 auto;

    .animelist-search {
        border: 1px solid black;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100px;

        .animelist-search-switch {
            width: 100px;
            display: flex;
            justify-content: center;
            align-items: center;

            .animelist-search-switch-name {
                background-color: antiquewhite;
            }

            .animelist-search-switch-year {
                background-color: aquamarine;
            }
        }

        .animelist-search-input {
            width: 100px;
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
                width: 300px;
            }

            &:hover {
                width: 300px;
            }
        }
    }

    .animelist-content {
        box-shadow: 0 0 5px gray;

        .animelist-content-title {
            font-size: 30px;
            text-align: center;
        }

        .animelist-content-item {
            display: flex;
            outline: 1px solid black;

            .animelist-content-item-img {
                min-width: 571px;
                height: 300px;
                background-color: aquamarine;
                display: flex;
                justify-content: center;

                img {
                    height: 300px;
                    object-fit: contain;
                }
            }

            .animelist-content-item-description {
                padding: 10px;

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
}
</style>
<script setup>
import axios from 'axios'
import { ref } from 'vue'

// 獲取動漫資料 //
const data = ref([])
const totalCount = ref(0)
const listCount = ref(0)
const filterYear = ref('')
const filterSeason = ref('winter')
const perPage = ref(50)
const page = ref(1)
const getanimelist = async () => {
    try {
        const res = await axios.get(`https://api.annict.com/v1/works?access_token=C23CjuV8eGIYLnn0qRkUUhDTWdl6KFwuS-ZzzTy9IB0&filter_season=${filterYear.value}-${filterSeason.value}&per_page=${perPage.value}&page=${page.value}`)
        totalCount.value = res.data.total_count
        // console.log(res.data.total_count);
        data.value.push(...res.data.works)
        // console.log(res.data.works)
        listCount.value += 50
        page.value++
        if (listCount.value < totalCount.value) {
            await getanimelist()
        }
        console.log(data.value);
        console.log(filterYear.value);
    } catch (error) {
        console.log('發生錯誤', error)
    }
}

const resetanimelist = () => {
    data.value = []
    totalCount.value = 0
    listCount.value = 0
    page.value = 1
}

const handleYearChange = () => {
    resetanimelist()
    getanimelist()
}

// 獲取動漫資料 //

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
            <select class="animelist-search-select" name="" id="" v-model="filterYear" @change="handleYearChange">
                <option :value="i" v-for="i in yearsGroup" :key="i">{{ i }}</option>
            </select>
        </div>
        <div class="animelist-content">
            <div class="animelist-content-title">這是anime list搜尋結果，{{ filterYear }}年{{ filterSeason }}總共{{ data.length }}部
            </div>
            <div class="animelist-content-group" v-for="(item, i) in data" :key="i">
                <div class="animelist-content-item">
                    <div class="animelist-content-item-img">這是圖片區</div>
                    <div class="animelist-content-item-description">{{ i + 1 }}. {{ item.title }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 1000px;
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
            .animelist-content-item-img {
                
            }
        }
    }
}
</style>

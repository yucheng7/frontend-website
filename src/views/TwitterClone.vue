<script setup></script>

<template>
    <div class="top-aria">
        <div class="logo">LOGO</div>
        <div class="search">搜尋欄位</div>
        <div class="user-login">登入註冊</div>
    </div>
    <div class="middle-aria">
        <div class="middle-content">
            <div class="post-content">
                <div class="post-item">
                    <div class="psot-item-user-icon">這是頭像</div>
                    <div class="post-item-content">這是文章</div>
                </div>
                <div class="post-item2">
                    <div class="psot-item-user-icon">這是頭像</div>
                    <div class="post-item-content">這是文章</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .top-aria {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid black;
        div {
            margin: 20px;
        }
        .logo {
            font-size: 30px;
        }
        .search {
            color: gray;
            background-color: lightgray;
            font-size: 15px;
            padding: 20px;
            border-radius: 50px;
        }
    }

    .middle-aria {
        display: flex;
        justify-content: center;
        .middle-content {
            width: 1200px;
            height: 1920px;
            background-color: aquamarine;
        }

        .post-content {
            width: 960px;
            border: 1px solid black;
            margin: 0 auto;
            .post-item {
                width: 960px;
                height: 300px;
                background-color: lightgoldenrodyellow;
            }

            .post-item2 {
                width: 960px;
                height: 300px;
                background-color: cadetblue;
            }
        }
    }
</style>

<script setup>
// import { ref } from 'vue';
// import axios from 'axios';
</script>

<template>
    <div class="top-aria">
        <div class="title-logo">
            <h1>個人網頁</h1>
        </div>
        <div class="navbar">
            <ul class="nav">
                <li class="">
                    <div>關於我</div>
                </li>
                <li class="">
                    <div>作品集</div>
                </li>
                <li class="">
                    <div>XXX</div>
                </li>
                <li class="">
                    <div>XXX</div>
                </li>
            </ul>
        </div>
    </div>
    <div class="middle-aria">
        <div class="content-aria-aboutme" style="display: none;">
            <div class="content-aria-aboutme-title">
                <h2>個人簡介</h2>
            </div>
            <div class="content-aria-aboutme-content">
                <p>個人簡介內容</p>
            </div>
        </div>
        <div class="content-aria-profile">
            <div class="content-aria-profile-title">
                <h2>作品集</h2>
            </div>
            <div class="content-aria-profile-content">
                <div class="profile-content-left">
                    <div class="webscreenshot_item">
                        <div class="screenshot">
                            <a href="/twitterclone">
                                <img src="..\assets\img1.png" alt="">
                            </a>
                        </div>
                        <div class="usetech-description">使用技術</div>
                    </div>
                    <div class="webscreenshot_item">
                        <div class="screenshot">
                            <router-link to="/animelist" class="transition-link">
                                <img src="..\assets\img2.png" alt="">
                            </router-link>
                        </div>
                        <div class="usetech-description">Animelist</div>
                    </div>
                </div>
                <div class="profile-content-right">
                    <div class="big-screenshot-item">
                        <div class="big-screenshot-top-aria">
                            <a href="">
                                <img src="..\assets\img1.png" alt="">
                            </a>
                        </div>
                        <div class="big-screenshot-bottom-aria">
                            <div class="big-screenshot-autoswitchpage">
                                <div class="autoswitchpage-group">
                                    <div class="autoswitchpage-item"></div>
                                    <div class="autoswitchpage-item"></div>
                                    <div class="autoswitchpage-item"></div>
                                    <div class="autoswitchpage-item"></div>
                                    <div class="autoswitchpage-item"></div>
                                    <div class="autoswitchpage-item"></div>
                                </div>
                            </div>
                            <div class="big-screenshot-weblink">
                                <a href="/aboutme">當前網頁跳轉連結</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="bottom-aria">
        <div class="bottom-aria-content">這是底部</div>
    </div>
</template>

<style scoped lang="scss">
.top-aria {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // border-bottom: 1px solid black;
    box-shadow: 0px 0px 5px black;
    box-sizing: border-box;
    padding: 10px 20px;

    .title-logo {
        h1 {
            color: red;
        }
    }

    .navbar {
        .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;

            li {
                width: 80px;
                height: 60px;
                text-align: center;
                list-style-type: none;
                padding: 0 20px;
                // margin: 0 10px;
                transition: all 0.2s linear;
                // border-top: 1px solid black;
                // border-bottom: 1px solid black;

                div {
                    line-height: 60px;
                    font-size: 20px;
                    cursor: pointer;
                }
            }

            li:hover {
                color: white;
                background-color: gray;
            }

            li:first-child {
                // border-left: 1px solid black;
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
            }

            li:last-child {
                // border-right: 1px solid black;
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
            }

            // li:first-child:hover {
            //     border-top: 1px solid transparent;
            //     border-left: 1px solid transparent;
            //     border-bottom: 1px solid transparent;
            // }

            // li:last-child:hover {
            //     border-top: 1px solid transparent;
            //     border-right: 1px solid transparent;
            //     border-bottom: 1px solid transparent;
            // }
        }
    }
}

.middle-aria {
    width: 100%;
    text-align: center;
    background-color: lightblue;

    h2 {
        font-size: 40px;
        padding: 20px 0px;
    }

    .content-aria-aboutme {
        background-color: aquamarine;
        height: 100vh;

        .content-aria-aboutme-content {
            background-color: gray;
        }
    }

    .content-aria-profile {
        // background-color: bisque;
        height: 100vh;

        .content-aria-profile-content {
            display: flex;
            justify-content: center;
            background-color: gray;

            .profile-content-left {
                background-color: lightgray;
                margin-right: 50px;

                .webscreenshot_item {
                    display: flex;

                    .screenshot {
                        border: 1px solid black;
                        width: 112px;
                        height: 63px;

                        a {
                            img {
                                width: 100%;
                                height: 100%;
                                scale: 0.9;
                                border-radius: 5px;
                            }
                        }
                    }

                    .usetech-description {
                        border: 1px solid black;
                        width: 300px;
                        height: 63px;
                    }
                }
            }

            .profile-content-right {
                background-color: rgb(193, 147, 147);

                .big-screenshot-item {
                    position: relative;

                    .big-screenshot-top-aria {
                        width: 1280px;
                        height: 720px;

                        a {
                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 5px;
                            }
                        }
                    }

                    .big-screenshot-bottom-aria {
                        position: absolute;
                        bottom: 0px;
                        border: 1px solid black;
                        width: 1280px;
                        height: auto;
                        display: flex;
                        justify-content: flex-end;
                        flex-direction: column;

                        .big-screenshot-autoswitchpage {
                            margin-bottom: 20px;

                            .autoswitchpage-group {
                                display: flex;
                                justify-content: center;

                                .autoswitchpage-item {
                                    border: 1px solid black;
                                    width: 10px;
                                    height: 10px;
                                    border-radius: 10px;
                                    margin: 10px 15px;
                                    background-color: bisque;
                                }
                            }
                        }

                        .big-screenshot-weblink {
                            a {
                                font-size: 20px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

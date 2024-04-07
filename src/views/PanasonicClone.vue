<script setup>
import { ref } from 'vue'
const navStyleChange = ref(false)
const navItemId = ref(0)
function navShow(e) {
    navStyleChange.value = true
    console.log(e.target.id)
    switch (e.target.id) {
        case 'nav-1':
            navItemId.value = 1
            break;
        case 'nav-2':
            navItemId.value = 2
            break;
        case 'nav-3':
            navItemId.value = 3
            break;
        case 'nav-4':
            navItemId.value = 4
            break;
        case 'nav-5':
            navItemId.value = 5
            break;
        default:
            break;
    }

}

const navData = ref([
    {
        id: 1,
        title: 'OUR TECH',
        name: '技術を知る',
        link: [
            {
                title: 'インダのいる世界',
                link: ''
            }
        ]
    },
    {
        id: 2,
        title: 'ABOUT US',
        name: '会社を知る',
        link: [
            {
                title: '経営戦略',
                link: ''
            },
            {
                title: '人財戦略',
                link: ''
            },
            {
                title: '働く環境',
                link: ''
            },
            {
                title: 'インダのデータ',
                link: ''
            },
            {
                title: 'プレスリリース',
                link: ''
            }
        ]
    },
    {
        id: 3,
        title: 'OUR STORY',
        name: '社員を知る',
        link: [
            {
                title: 'プロジェクトストーリー',
                link: ''
            },
            {
                title: 'タレントストーリー',
                link: ''
            },
            {
                title: '外部メディア掲載',
                link: ''
            }
        ]
    },
    {
        id: 4,
        title: 'OUR JOB',
        name: '仕事を知る',
        link: [
            {
                title: '部門紹介',
                link: ''
            },
            {
                title: '職種紹介',
                link: ''
            }
        ]
    },
    {
        id: 5,
        title: 'ENTRY',
        name: '採用情報',
        link: [
            {
                title: 'インターンシップ',
                link: ''
            },
            {
                title: '新卒採用',
                link: ''
            },
            {
                title: 'キャリア採用',
                link: ''
            },
            {
                title: '高専生採用',
                link: ''
            },
            {
                title: '高校生採用',
                link: ''
            },
            {
                title: '障碍者採用（グループ）',
                link: ''
            },
            {
                title: '海外採用（グループ）',
                link: ''
            }
        ]
    },
    {
        id: 6,
        title: 'XXXXX',
        name: 'お知らせ',
        link: [
            {
                title: '',
                link: ''
            }
        ]
    }
])
function navClose() {
    navStyleChange.value = 0
}

const videoData = [
    'https://recruit.industry.panasonic.com/wp-content/themes/panasonic-industry-recruit-2024/assets/movies/case-1.mp4',
    'https://recruit.industry.panasonic.com/wp-content/themes/panasonic-industry-recruit-2024/assets/movies/case-2.mp4',
    'https://recruit.industry.panasonic.com/wp-content/themes/panasonic-industry-recruit-2024/assets/movies/case-3.mp4',
    'https://recruit.industry.panasonic.com/wp-content/themes/panasonic-industry-recruit-2024/assets/movies/case-4.mp4',
    'https://recruit.industry.panasonic.com/wp-content/themes/panasonic-industry-recruit-2024/assets/movies/case-5.mp4'
]

function backToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
</script>

<template>
    <div class="container">
        <div class="nav">
            <div class="navbar">
                <div class="navleft">
                    <div class="logo" @click="navStyle()">
                        <div class="logo-text">Panasonic</div>
                        <div class="logo-text">INDUSTRY</div>
                    </div>
                    <div class="logo-righttext">
                        <div class="logo-righttext-innertext">採用サイト</div>
                    </div>
                </div>
                <div :class="['navright', { 'nav-bacc-purple-color': navStyleChange == true }]" @mouseleave="navClose">
                    <ul :class="['nav-group']">
                        <li class="nav-item">
                            <a href="#"
                                :class="[{ 'nav-a': navStyleChange == false, 'nav-font-white-color': navStyleChange == true }]"
                                @mouseover="navShow" id="nav-1">技術を知る</a>
                        </li>
                        <li class="nav-item">
                            <a href="#"
                                :class="[{ 'nav-a': navStyleChange == false, 'nav-font-white-color': navStyleChange == true }]"
                                @mouseover="navShow" id="nav-2">会社を知る</a>
                        </li>
                        <li class="nav-item">
                            <a href="#"
                                :class="[{ 'nav-a': navStyleChange == false, 'nav-font-white-color': navStyleChange == true }]"
                                @mouseover="navShow" id="nav-3">社員を知る</a>
                        </li>
                        <li class="nav-item">
                            <a href="#"
                                :class="[{ 'nav-a': navStyleChange == false, 'nav-font-white-color': navStyleChange == true }]"
                                @mouseover="navShow" id="nav-4">仕事を知る</a>
                        </li>
                        <li class="nav-item">
                            <a href="#"
                                :class="[{ 'nav-a': navStyleChange == false, 'nav-font-white-color': navStyleChange == true }]"
                                @mouseover="navShow" id="nav-5">採用情報</a>
                        </li>
                        <li class="nav-item">
                            <a href="#"
                                :class="[{ 'nav-a': navStyleChange == false, 'nav-font-white-color': navStyleChange == true }]"
                                @mouseover="navShow" id="nav-6">を知らせ</a>
                        </li>
                    </ul>
                    <div class="setting" @click="navShow">三</div>
                    <Transition name="fade">
                        <div class="nav-description" v-if="navStyleChange == true">
                            <div class="nav-description-box" @mouseleave="navClose">
                                <div class="item-tilte">
                                    <div class="item-title-top">{{ navData[navItemId - 1].title }}</div>
                                    <div class="item-title-bottom">{{ navData[navItemId - 1].name }}</div>

                                </div>
                                <div class="item-content">
                                    <div class="item-content-link">
                                        <div class="item-content-link-item" v-for="i in navData[navItemId - 1].link"
                                            :key="i">
                                            <a :href="`${i.link}`">
                                                {{ i.title }}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Transition>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="company-title-text">
                <div class="content-title-text-content">
                    <img src="../assets/PanasonicClone/fv-heading-1.svg" alt="">
                    <img src="../assets/PanasonicClone/fv-heading-2.svg" alt="">
                </div>
            </div>
            <div class="company-message">
                <div class="company-message-content">
                    <h3>見えないところから、
                        <br>
                        見違える世界に変えていく。
                    </h3>
                    <p>
                        誰もが驚いた「あの機器」の内側で。
                        <br>
                        社会に欠かせない「あの産業」の裏側で。
                        <br>
                    </p>
                    <p>
                        私たちパナソニック インダストリーの多様なデバイステクノロジーは、
                        <br>
                        100年以上もの長きにわたり
                        <br>
                        世界中の「見えないところ」で企業や人々を支え、
                        <br>
                        社会の進化に貢献してきました。
                        <br>
                    </p>
                    <p>
                        もっと便利に。
                        <br>
                        もっと快適に。
                        <br>
                        もっと楽しく。
                        <br>
                    </p>
                    <p>
                        これからも社員一人ひとりが“想い”を動かし、
                        <br>
                        今よりももっと「見違える世界」に変えていきます。
                        <br>
                    </p>
                    <p>
                        さあ、あなたも、
                        <br>
                    </p>
                    <img src="../assets/PanasonicClone/msg-heading.svg" alt="">
                </div>
            </div>
            <div class="content-our-tech">
                <div class="content-our-tech-content">
                    <div class="content-our-tech-content-h3title">
                        <h3>OUR TECH</h3>
                    </div>
                    <div class="content-our-tech-content-ptext">
                        <p>技術を知る</p>
                        <br>
                    </div>
                    <div class="content-our-tech-content-h4text">
                        <h4>インダのいる世界</h4>
                    </div>
                    <div class="content-our-tech-content-desp">
                        <div>広大な宇宙から、手のひらの上まで。</div>
                    </div>
                    <div class="content-our-tech-content-videogroup">
                        <div class="content-our-tech-content-video-item">
                            <video muted autoplay playsinline loop width="220" height="220">
                                <source
                                    src="https://recruit.industry.panasonic.com/wp-content/themes/panasonic-industry-recruit-2024/assets/movies/case-1.mp4"
                                    type="video/mp4">
                            </video>
                        </div>
                        <div class="content-our-tech-content-video-item"><video muted autoplay playsinline loop
                                width="220" height="220">
                                <source
                                    src="https://recruit.industry.panasonic.com/wp-content/themes/panasonic-industry-recruit-2024/assets/movies/case-2.mp4"
                                    type="video/mp4">
                            </video>
                        </div>
                        <div class="content-our-tech-content-video-item">
                            <video muted autoplay playsinline loop width="220" height="220">
                                <source
                                    src="https://recruit.industry.panasonic.com/wp-content/themes/panasonic-industry-recruit-2024/assets/movies/case-3.mp4"
                                    type="video/mp4">
                            </video>
                        </div>
                        <div class="content-our-tech-content-video-item">
                            <video muted autoplay playsinline loop width="220" height="220">
                                <source
                                    src="https://recruit.industry.panasonic.com/wp-content/themes/panasonic-industry-recruit-2024/assets/movies/case-4.mp4"
                                    type="video/mp4">
                            </video>
                        </div>
                        <div class="content-our-tech-content-video-item">
                            <video muted autoplay playsinline loop width="220" height="220">
                                <source
                                    src="https://recruit.industry.panasonic.com/wp-content/themes/panasonic-industry-recruit-2024/assets/movies/case-5.mp4"
                                    type="video/mp4">
                            </video>
                        </div>
                    </div>
                    <div class="content-our-tech-content-button">
                        <div class="content-our-tech-content-button-text">詳しくみる</div>
                        <div class="content-our-tech-content-button-arrow"> > </div>
                    </div>
                </div>
            </div>
            <div class="content-about-us">
                <div class="content-about-us-content">
                    <div class="content-about-us-content-box">
                        <div class="content-about-us-content-box-title">
                            <h3>ABOUT US</h3>
                            <p>会社を知る</p>
                        </div>
                        <div class="content-about-us-content-box-cardaria">
                            <div class="content-about-us-content-box-card">
                                <h3>01</h3>
                                <img src="https://recruit.industry.panasonic.com/wp-content/themes/panasonic-industry-recruit-2024/assets/images/home/about-fig-4.png"
                                    alt="">
                                <div class="content-about-us-content-box-card-text">
                                    <div class="content-about-us-content-box-card-text-button">
                                        <div class="content-about-us-content-box-card-text-button-arrow"> > </div>
                                        <div class="content-about-us-content-box-card-text-button-text">経営戦略</div>
                                    </div>
                                    <div class="content-about-us-content-box-card-text-desp">
                                        社会要請が強く継続的な進化が求められる領域を、3つの注力領域と4つのコア事業に定め、注力しています。</div>
                                </div>
                            </div>
                            <div class="content-about-us-content-box-card">
                                <h3>02</h3>
                                <img src="https://recruit.industry.panasonic.com/wp-content/themes/panasonic-industry-recruit-2024/assets/images/home/about-fig-3.png"
                                    alt="">
                                <div class="content-about-us-content-box-card-text">
                                    <div class="content-about-us-content-box-card-text-button">
                                        <div class="content-about-us-content-box-card-text-button-arrow"> > </div>
                                        <div class="content-about-us-content-box-card-text-button-text">人財戦略</div>
                                    </div>
                                    <div class="content-about-us-content-box-card-text-desp">
                                        「個人の想い」と「会社の目指す姿」をつなげること、それこそがパナソニック インダストリーの人財戦略です。</div>
                                </div>
                            </div>
                            <div class="content-about-us-content-box-card">
                                <h3>03</h3>
                                <img src="https://recruit.industry.panasonic.com/wp-content/themes/panasonic-industry-recruit-2024/assets/images/home/about-fig-2.png"
                                    alt="">
                                <div class="content-about-us-content-box-card-text">
                                    <div class="content-about-us-content-box-card-text-button">
                                        <div class="content-about-us-content-box-card-text-button-arrow"> > </div>
                                        <div class="content-about-us-content-box-card-text-button-text">働く環境</div>
                                    </div>
                                    <div class="content-about-us-content-box-card-text-desp">
                                        “想い”の実現をサポートする働く環境を整備し、一人ひとりがイキイキと活躍できる組織づくりを進めています。</div>
                                </div>
                            </div>
                            <div class="content-about-us-content-box-card">
                                <h3>04</h3>
                                <img src="https://recruit.industry.panasonic.com/wp-content/themes/panasonic-industry-recruit-2024/assets/images/home/about-fig-1.png"
                                    alt="">
                                <div class="content-about-us-content-box-card-text">
                                    <div class="content-about-us-content-box-card-text-button">
                                        <div class="content-about-us-content-box-card-text-button-arrow"> > </div>
                                        <div class="content-about-us-content-box-card-text-button-text">インダのデータ</div>
                                    </div>
                                    <div class="content-about-us-content-box-card-text-desp">
                                        会社規模や事業実績、社員構成や働き方に関するデータをインフォグラフィックでまとめています。</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="content-our-story">
                <div class="content-our-story-content">
                    <div class="content-our-story-content-title">
                        <h3>OUR STORY</h3>
                        <p>社員を知る</p>
                    </div>
                    <div class="content-our-story-content-middle">
                        <div class="content-our-story-content-middle-leftbox">
                            <h3>プロジェクトストーリー</h3>
                            <br>
                            <p>未来の兆しを先取り社会変革をリードする、</p>
                            <p>パナソニック インダストリーの</p>
                            <p>取り組みと社員の想いを紹介します。</p>
                            <div class="content-our-story-content-middle-widthbar"></div>
                            <div class="content-our-story-content-middle-button-aria">
                                <div class="content-our-story-content-middle-button-aria-left">
                                    <div>
                                        < </div>
                                            <div> > </div>
                                    </div>
                                    <div class="content-our-story-content-middle-button-aria-right">
                                        <div>記事一覧へ</div>
                                        <div> > </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content-our-story-content-middle-rightbox"></div>

                    </div>
                    <div class="content-our-story-content-bottom">
                        <div class="content-our-story-content-middle-leftbox">
                            <h3>プロジェクトストーリー</h3>
                            <br>
                            <p>未来の兆しを先取り社会変革をリードする、</p>
                            <p>パナソニック インダストリーの</p>
                            <p>取り組みと社員の想いを紹介します。</p>
                            <div class="content-our-story-content-middle-widthbar"></div>
                            <div class="content-our-story-content-middle-button-aria">
                                <div class="content-our-story-content-middle-button-aria-left">
                                    <div>
                                        < </div>
                                            <div> > </div>
                                    </div>
                                    <div class="content-our-story-content-middle-button-aria-right">
                                        <div>記事一覧へ</div>
                                        <div> > </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content-our-story-content-middle-rightbox"></div>
                    </div>
                </div>
                <div class="content-our-job">
                    <div class="content-our-job-content">
                        內容框
                    </div>
                </div>
                <div class="content-entry">
                    <div class="content-entry-content">
                        內容框
                    </div>
            </div> -->
            <div class="footer">
                <div class="footer-content">
                    <div class="footer-content-link">
                        <div class="footer-content-link-item">
                            <div class="footer-content-link-item-left">OUR TECH</div>
                            <div class="footer-content-link-item-right">
                                <p>インダのいる世界</p>
                            </div>
                        </div>
                        <div class="footer-content-link-item">
                            <div class="footer-content-link-item-left">ABOUT US</div>
                            <div class="footer-content-link-item-right">
                                <p>経営戦略</p>
                                <p>人財戦略</p>
                                <p>働く環境</p>
                                <p>インダのデータ</p>
                                <p>プレスリリース</p>
                            </div>
                        </div>
                        <div class="footer-content-link-item">
                            <div class="footer-content-link-item-left">OUR STORY</div>
                            <div class="footer-content-link-item-right">
                                <p>プロジェクトストーリー</p>
                                <p>タレントストーリー</p>
                                <p>外部メディア掲載</p>
                            </div>
                        </div>
                        <div class="footer-content-link-item">
                            <div class="footer-content-link-item-left">OUR JOB</div>
                            <div class="footer-content-link-item-right">
                                <p>部門紹介</p>
                                <p>職種紹介</p>
                            </div>
                        </div>
                        <div class="footer-content-link-item">
                            <div class="footer-content-link-item-left">ENTRY</div>
                            <div class="footer-content-link-item-right">
                                <p>インターンシップ</p>
                                <p>新卒採用</p>
                                <p>キャリア採用</p>
                                <p>高専生採用</p>
                                <p>高校生採用</p>
                                <p>障がい者採用（グループ）</p>
                                <p>障がい者採用（グループ）</p>
                            </div>
                        </div>
                        <div class="footer-content-link-item">
                            <div class="footer-content-link-item-left">NEWS</div>
                            <div class="footer-content-link-item-right">お知らせ</div>
                        </div>

                        <div class="footer-content-bigtext">
                            <div class="footer-content-bigtext-left">
                                <h3>Panasonic</h3>
                                <h4>INDUSTRY</h4>
                            </div>
                            <div class="footer-content-bigtext-right">
                                <img src="https://recruit.industry.panasonic.com/wp-content/themes/panasonic-industry-recruit-2024/assets/images/common/sns-x.png"
                                    alt="">
                                <img src="https://recruit.industry.panasonic.com/wp-content/themes/panasonic-industry-recruit-2024/assets/images/common/share-linkedin.png"
                                    alt="">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="backtotop" @click="backToTop">△</div>
    </div>
</template>

<style scoped lang="scss">
.container {
    margin: 0;
    width: 100%;
    height: 100vh;
    position: relative;

    .nav {
        width: 100%;
        // padding: 10px;
        position: fixed;
        top: 0;
        left: 0;
        background-color: white;
        box-shadow: 0 0 5px gray;
        z-index: 500;

        .navbar {
            width: 100%;
            // background-color: aquamarine;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .navleft {
                // background-color: aqua;
                display: flex;
                padding-left: 5%;


                .logo {
                    // margin: 10px;
                    padding: 10px;
                    cursor: pointer;
                    transition: all .1s ease-in-out;

                    &:hover {
                        background-color: rgb(248, 242, 242);
                    }

                    // background-color: green;
                    .logo-text {
                        font-size: 40px;
                        font-weight: bold;
                        text-align: center;
                    }

                    .logo-text:last-child {
                        font-size: 20px;
                    }

                }

                .logo-righttext {
                    padding: 10px;
                    // background-color: red;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .logo-righttext-innertext {
                        font-size: 20px;
                        background-color: #003B68;
                        color: white;
                        font-weight: bold;
                        padding: 0px 10px;
                        border-radius: 8px;
                        text-align: center;
                    }
                }
            }

            .navright {
                padding-right: 5%;
                display: flex;
                position: relative;

                .nav-group {
                    display: flex;
                    list-style: none;
                    padding: 10px;

                    .nav-item {

                        font-size: 20px;
                        font-weight: bold;
                        color: #003B68;
                        margin: 20px 30px;
                        cursor: pointer;
                        position: relative;



                        .nav-a {
                            text-decoration: none;
                            color: #003B68;
                            // transition: all .2s linear;

                            &::after {
                                content: "";
                                width: 0;
                                height: 3px;
                                background-color: #003B68;
                                position: absolute;
                                bottom: 0;
                                left: 0;
                            }

                            &:hover::after {
                                content: "";
                                width: 100%;
                                height: 3px;
                                background-color: #003B68;
                                position: absolute;
                                bottom: 0;
                                right: 0;
                            }
                        }

                    }
                }

                .setting {
                    width: 30px;
                    height: 30px;
                    font-size: 20px;
                    text-align: center;
                    padding: 10px;
                    margin: auto 10px;
                    box-shadow: 0 0 8px rgb(213, 213, 213);
                    font-weight: bold;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all .2s ease-in-out;
                    background-color: white;

                    &:hover {
                        background-color: #003B68;
                        color: white;
                        box-shadow: none;
                    }
                }

                .nav-description {
                    width: 100%;
                    position: absolute;
                    top: 100%;
                    left: 0;

                    .nav-description-box {
                        background-color: #003B68;
                        width: 100%;
                        opacity: 1;
                        padding: 5%;
                        display: flex;

                        .item-tilte {
                            .item-title-top {
                                font-size: 60px;
                                color: white;
                                font-weight: bold;
                            }

                            .item-title-bottom {
                                font-size: 16px;
                                color: white;
                                font-weight: bold;

                            }
                        }

                        .item-content {
                            width: 30%;
                            margin-left: 5%;
                            padding: 10px;

                            .item-content-link-item {
                                padding: 5px 0;
                                position: relative;
                                margin-bottom: 10px;
                                color: white;
                                font-weight: bold;
                                cursor: pointer;

                                &::before {
                                    content: '';
                                    bottom: 0;
                                    left: 0;
                                    position: absolute;
                                    width: 100%;
                                    height: 3px;
                                    background-color: white;
                                }

                                a {
                                    text-decoration: none;
                                    color: white;
                                }
                            }

                        }
                    }
                }

            }
        }

    }

    .content {
        width: 100%;
        // background-color: gray;

        .company-title-text {
            width: 100%;
            height: 100vh;
            background-color: lightgray;
            display: flex;
            justify-content: center;
            align-items: center;

            .company-title-text-content {
                width: 85vw;
                height: 85vh;
                // background-color: aquamarine;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
            }
        }

        .company-message {
            width: 100%;
            height: 100vh;
            // background-color: #b6c5d1;
            display: flex;
            justify-content: center;
            align-items: center;

            .company-message-content {
                width: 85vw;
                height: 80vh;
                // background-color: aquamarine;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: flex-start;

                h3 {
                    font-size: 45px;
                    color: #003B68;
                    font-weight: 700;
                    letter-spacing: 1px;
                }

                p {
                    font-size: 20px;
                    font-weight: 700;
                    letter-spacing: 1px;
                }
            }
        }

        .content-our-tech {
            width: 100%;
            height: 100vh;
            background-color: lightgray;
            display: flex;
            justify-content: center;
            align-items: center;

            .content-our-tech-content {
                width: 85vw;
                height: 90vh;
                background-color: rgb(230, 227, 227);
                border-radius: 30px;
                padding: 50px 100px;
                box-sizing: border-box;
                border: 1px solid white;
                backdrop-filter: blur(5px);

                .content-our-tech-content-h3title {
                    font-size: 50px;
                    font-weight: 700;
                    color: #003B68;
                    text-align: center;
                }

                .content-our-tech-content-ptext {
                    font-size: 20px;
                    font-weight: 700;
                    text-align: center;
                }

                .content-our-tech-content-h4text {
                    font-size: 30px;
                    font-weight: 700;
                    color: #003B68;
                    letter-spacing: 1px;
                    text-align: center;
                }

                .content-our-tech-content-desp {
                    margin: 0 auto;
                    width: 60%;
                    font-size: 16px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    text-align: center;
                    background-color: #003B68;
                    color: white;
                    padding: 5px;
                }

                .content-our-tech-content-videogroup {
                    padding: 10px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .content-our-tech-content-video-item {
                        border-radius: 100%;
                        overflow: hidden;
                        margin: 10px;
                    }
                }

                .content-our-tech-content-button {
                    background-color: #003B68;
                    width: 200px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 auto;
                    cursor: pointer;
                    padding: 10px;
                    border-radius: 50px;

                    &:hover {
                        scale: 1.05;
                    }

                    .content-our-tech-content-button-text {
                        padding: 10px;
                        font-size: 20px;
                        font-weight: 700;
                        color: white;
                    }

                    .content-our-tech-content-button-arrow {
                        background-color: white;
                        color: #003B68;
                        font-size: 30px;
                        font-weight: 700;
                        width: 50px;
                        height: 50px;
                        border-radius: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 5px;
                    }

                }
            }
        }

        .content-about-us {
            width: 100%;
            height: 100vh;
            background-color: lightgray;
            display: flex;
            justify-content: center;
            align-items: center;

            .content-about-us-content {
                background-color: #003B68;
                width: 100%;
                height: 100%;
                // border-radius: 50px;
                border-top-left-radius: 50px;
                border-top-right-radius: 50px;
                padding: 8%;
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;

                .content-about-us-content-box {
                    // background-color: white;
                    width: 100%;
                    height: 100%;

                    .content-about-us-content-box-title {
                        h3 {
                            color: white;
                            font-size: 70px;
                            font-weight: 700;
                            text-align: center;
                        }

                        p {
                            color: white;
                            font-size: 20px;
                            font-weight: 700;
                            text-align: center;
                        }
                    }

                    .content-about-us-content-box-cardaria {
                        // background-color: antiquewhite;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: space-evenly;
                        align-items: center;

                        .content-about-us-content-box-card {
                            width: 23%;
                            height: 80%;
                            background-color: lightgray;
                            border-radius: 15px;
                            transition: all .2s ease;
                            padding: 10px 20px;
                            box-sizing: border-box;
                            display: flex;
                            justify-content: space-between;
                            flex-direction: column;
                            position: relative;

                            h3 {
                                font-size: 130px;
                                font-weight: 700;
                                color: white;
                            }

                            &:hover {
                                scale: 0.95;
                                cursor: pointer;
                            }

                            img {
                                position: absolute;
                                top: 0;
                                left: 0;
                                scale: 0.7;
                            }

                            .content-about-us-content-box-card-text {
                                padding: 10px;

                                .content-about-us-content-box-card-text-button {
                                    display: flex;
                                    padding: 20px 0;

                                    .content-about-us-content-box-card-text-button-arrow {
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        border-radius: 100%;
                                        width: 2vw;
                                        height: 2vw;
                                        background-color: white;
                                        font-weight: 700;
                                    }

                                    .content-about-us-content-box-card-text-button-text {
                                        font-size: 25px;
                                        font-weight: 700;
                                        color: #003B68;
                                        padding: 0 10px;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                    }
                                }

                                .content-about-us-content-box-card-text-desp {
                                    font-size: 20px;
                                    font-weight: 700;
                                    color: black;
                                }
                            }
                        }
                    }

                }
            }
        }

        .content-our-story {
            width: 100%;
            height: 150vh;
            background-color: lightgray;
            display: flex;
            justify-content: center;
            align-items: center;

            .content-our-story-content {
                width: 100%;
                height: 100%;
                padding-top: 15%;
                padding-left: 10%;

                // background-color: antiquewhite;
                .content-our-story-content-title {
                    width: 100%;

                    h3 {
                        font-size: 70px;
                        font-weight: 700;
                        color: #003B68;
                    }

                    p {
                        font-size: 25px;
                        font-weight: 700;
                        color: #313334;
                    }
                }
            }
        }

        .content-our-job {
            width: 100%;
            height: 100vh;
            // background-color: blanchedalmond;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .content-entry {
            width: 100%;
            height: 100vh;
            // background-color: blanchedalmond;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .footer {
            width: 100%;
            height: 100vh;
            background-color: #003B68;
            display: flex;
            justify-content: center;
            align-items: center;

            .footer-content {
                width: 100%;
                height: 100%;
                padding: 5% 5% 5%;
                background-color: #003B68;
                box-sizing: border-box;

                .footer-content-link {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;

                    .footer-content-link-item {
                        width: 100%;
                        display: flex;
                        align-items: end;

                        .footer-content-link-item-left {
                            font-size: 40px;
                            font-weight: 700;
                            color: white;
                            padding: 10px 0;
                            width: 20%;
                            position: relative;

                            // background-color: aquamarine;
                            &::after {
                                content: "";
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                width: 100%;
                                height: 3px;

                                background-color: white;
                            }
                        }

                        .footer-content-link-item-right {
                            width: 100%;
                            font-size: 20px;
                            font-weight: 700;
                            color: white;
                            padding: 10px 0;
                            display: flex;
                            position: relative;

                            p {
                                padding: 0 10px;
                            }

                            &::after {
                                content: "";
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                width: 100%;
                                height: 3px;

                                background-color: lightblue;
                            }
                        }


                    }

                    .footer-content-bigtext {
                        margin-top: 20px;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .footer-content-bigtext-left {
                            display: flex;
                            align-items: baseline;

                            h3 {
                                font-size: 160px;
                                font-weight: 700;
                                color: white;
                            }

                            h4 {
                                font-size: 70px;
                                font-weight: 700;
                                color: white;
                                margin-left: 50px;
                            }
                        }
                    }
                }
            }
        }
    }

    .backtotop {
        position: fixed;
        bottom: 8%;
        right: 4%;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: larger;
        box-sizing: border-box;
        box-shadow: 0 0 5px gray;
        cursor: pointer;
        transition: all .2s linear;
        &:hover {
            background-color: #003B68;
            color: white;
            border: 1px solid white;
            box-sizing: border-box;
            scale: 1.5;
        }
    }
}

.nav-bacc-purple-color {
    background-color: #003B68;
    transition: all .3s linear;
}

.nav-font-white-color {

    text-decoration: none;
    color: white;

    &::after {
        content: "";
        width: 0;
        height: 3px;
        background-color: white;
        position: absolute;
        bottom: 0;
        left: 0;
        transition: all .3s linear;
    }

    &:hover::after {
        content: "";
        width: 100%;
        height: 3px;
        background-color: white;
        position: absolute;
        bottom: 0;
        right: 0;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateX(100vw);
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
</style>
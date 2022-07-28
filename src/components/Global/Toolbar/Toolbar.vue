<template>
    <div>
        <v-toolbar
            id="toolbar"
            style="padding: 0px"
            dark
            prominent
            height="230px"
            :class="{IsMainHome: headerIsTransparent,backImg: backImg }"
        >
            <div class="Head" id="head">
                <h1 id="title" style="font-family: monserat_medium; direction: ltr">
                    <b style="font-size: 38px; font-weight: 900">BEFARMAN</b> APP
                </h1>
                <ul>
                    <router-link to="/">
                        <li>
                            <v-icon> WMi-heart-1</v-icon>
                        </li>
                    </router-link>
                    <a href="https://cafebazaar.ir/app/com.befarman.carrental" target="_blank">
                        <li>دانلود اپلیکیشن اندروید</li>
                    </a>
                    <li v-if="!isLoggedIn">
                        <h1 class="login" @click="$_toggleModal('login')">
                            <v-icon>WMi-user</v-icon>
                            ورود
                        </h1>
                    </li>
                    <li v-if="isLoggedIn">{{ currentUser }}، خوش آمدی</li>
                    <router-link to="/AboutUs">
                        <li>
                            درباره ما
                        </li>
                    </router-link>
                    <router-link to="/admin">
                         <h1 class="login" v-if="isAdmin">
                            <v-icon>WMi-user</v-icon>
                            پنل ادمین
                        </h1>
                    </router-link>
                    <li v-if="isLoggedIn">
                        <router-link class="login" :to="{name: 'Profile'}" >
                            <v-icon>WMi-user</v-icon>
                            پروفایل
                        </router-link>
                    </li>
                    <li v-if="isLoggedIn">
                        <h1 class="login" @click="LogOut()">
                            <v-icon>WMi-logout</v-icon>
                            خروج
                        </h1>
                    </li>

                    <li id="instagram-icon">
                        <a href="https://www.instagram.com/befarmann/"><v-icon>WMi-instagram</v-icon></a>
                    </li>
                    <li id="twitter-icon">
                        <a href="https://twitter.com/befarmann/"><v-icon> WMi-twitter-1</v-icon></a>
                    </li>
                </ul>
            </div>
            <broad-camb v-if="displayBreadCrumb"/>
        </v-toolbar>
        <Login/>
    </div>
</template>
<script>
    import BroadCamb from "./BroadCamb";
    import Login from "../../Auth/Login";
    export default {
        name: "Toolbar",
        props: {
            currentRoute: {type: String}
        },
        components: {
            Login,
            BroadCamb,
        },
        data() {
            return {
                isLoggedIn: false,
                currentUser: null,
            };
        },
        methods: {
            setHeader() {
                let user = JSON.parse(localStorage.getItem("user"));
                if (user) {
                    this.currentUser = user.first_name ? user.first_name : "کاربر عزیز";
                    this.isLoggedIn = true;
                }
            },
            LogOut(){
                localStorage.clear();
                location.reload();
            }
        },
        computed: {
            displayBreadCrumb() {
                if (this.currentRoute === "main-home") {
                    return false;
                } else {
                    return true;
                }
            },
            isAdmin() {
                if (window.localStorage.user) {
                    const data = localStorage.getItem('user');
                    const UserData = JSON.parse(data)
                    if (UserData.is_admin == 1) {
                        return true;
                    } else if (UserData.is_admin == 0) {
                        return false;
                    }
                }
            },
            headerIsTransparent() {
                if (this.currentRoute === "main-home") {
                    return true;
                } else {
                    return false;
                }
            },
            background() {
                if (this.currentRoute === "main-home") {
                    let back = document.getElementById('toolbar');
                    back.classList.add(".theme--dark.v-toolbar.v-sheet");
                }
            },
            backImg() {
                if (this.currentRoute === "main-home") {
                    return false;
                } else {
                    return true;
                }
            }
        },
        created() {
            this.setHeader();
        },
    };
</script>
<style scoped lang="scss">
    a {
        text-decoration: none;
    }

    .login {
        padding-right: 10px;
        padding-left: 20px;
        border-radius: 10px;
        font-family: "yekan_medium";
        display: inline-block;
        margin: 10px;
        color: #fff;
        font-size: 16px;
        border: 1px solid #fff;
    }

    .Head {
        width: 100%;
        background-color: rgba(24, 23, 23, 0.603);
        height: 110px;
        padding: 20px 30px;
        font-family: "monserat_medium";
    }

    .title {
        padding-top: 1%;
        padding-left: 0.5%;
        font-family: "monserat_medium";
        font-weight: 100;
    }

    li {
        font-family: "yekan_medium";
        display: inline-block;
        margin: 10px;
        color: #fff;
    }

    ul {
        position: absolute;
        top: 11%;
        right: 1%;
        direction: rtl;
    }

    .IsMainHome {
        width: 100%;
        position: absolute;
        background-color: transparent;
        top: 0px;
        background-image: unset;
    }

    .theme--dark.v-toolbar.v-sheet {
        background-color: #27272700;
    }

    .backImg {
        background-image: url("@/assets/Images/Header.jpg");
        background-position: center;
        background-repeat: no-repeat;
    }
</style>


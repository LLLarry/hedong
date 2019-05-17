<template>
    <div>
        
        <mt-header :title="selected" v-if="$route.meta.isHeaderBlock">
        <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
        </mt-header>
        <transition  name="my" mode="out-in">
            <router-view />
        </transition >
        <mt-tabbar v-model="selected" v-if="$route.meta.isBlock">
            <mt-tab-item id="订单">
               <i class="iconfont icon-zhuye"></i>
                <span>订单</span>
            </mt-tab-item>
            <mt-tab-item id="发现">
               <i class="iconfont icon-guanli"></i>
                发现
            </mt-tab-item>
            <mt-tab-item id="我的">
              <i class="iconfont icon-geren" style="font-size: 18px;"></i>
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
export default {
    data(){
        return {
            selected: "订单",
            path: '/home'
        }
    },
    methods: {
        goTo(path){
             switch(path){
                case  '/home' :  this.selected= '订单' ;break;
                case  '/other' :  this.selected= '发现' ;break;
                case  '/person' :  this.selected= '我的' ; break;
            }
            this.$router.push({ //路由跳转
                path
            })
        },

    },
    watch: {
        selected(newVal,oldVal){
            switch(newVal){
                case '订单'  :  this.path= '/home' ; break;
                case '发现'  :  this.path= '/other'; break;
                case '我的'  :  this.path= '/person'; break;
            }
           this.goTo(this.path)
        },
        $route(to,from){
              this.goTo(to.path)
            }
    }
}
</script>

<style>
    * {
        padding: 0;
        margin: 0;
    }
    body,html {
        width: 100%;
        height: 100%;
        background: #f5f5f5;
        overflow: auto;
    }
    .mint-tabbar {
        position: fixed;
        bottom: 0;
        height: 45px;
    }
    .mint-tab-item {
        padding: 0;
        position: relative;
    }
    .mint-tab-item-label {
       weight: 100%;
       height: 100%;
       display: flex;
       justify-content: center;
       flex-direction: column;
       align-items: center;
    }
    .mint-tab-item-label i {
        margin-bottom: 3px;
    }
    .mint-tabbar > .mint-tab-item.is-selected  {
        background: none;
    }

    my-enter,.my-leave-to {
    opacity: 0;
    transform: translateX(-100vw);
    }
    .my-enter-active,.my-leave-active {
    transition: all .5s;
    }
</style>

<template>
    <div class="person">
        <div class="top">
            <img src="../../static/images/avatar.jpg" alt="">
            <p>海阔天空</p>
        </div>
        <div class="list">
            <li><a href="javascript:;"><span>我的钱包</span> </a></li>
            <li><a href="javascript:;"><span>我的钱包</span></a></li>
        </div>
    </div>
</template>

<script>

</script>

<style>
    .person .top {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            background-color: #44AF3D;
        }
        .person .top >img {
            margin-top: 70px;
           width: 20%;
           border-radius: 50%;
        }
        .person .top > p {
            margin: 20px 0 50px 0;
            font-size: 16px;
            color: #fff;
        }
        .person .list {
            border-top: 1px solid #ccc;
            margin-top: 20px;
        }
        .person .list> li{
            width: 100%;
            height: 40px;
            border-bottom: 1px solid #ccc;
            line-height: 40px;
            font-size: 14px;
            color: #000;
            padding: 0 20px;
            background-color: #fff;
        }
        .person .list> li:active {
            background-color: #cccccc54;
        }
</style>
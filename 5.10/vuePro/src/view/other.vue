<template>
    <div class="other">
         <ul>
            <li><a href="javascript:;">设备管理</a></li>
            <li><a href="javascript:;">设备管理</a></li>
            <li><a href="javascript:;">设备管理</a></li>
            <li><a href="javascript:;">设备管理</a></li>
            <li><a href="javascript:;">设备管理</a></li>
            <li><a href="javascript:;">设备管理</a></li>
            <li><a href="javascript:;">设备管理</a></li>
            <li><a href="javascript:;">设备管理</a></li>
        </ul>  
    </div>
</template>

<script>

</script>

<style>
    * {
            padding: 0;
            margin: 0;
        }
        li {
            list-style: none;
        }
        .other {

        }
        .other>ul {
            padding: 20px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        .other>ul>li {
            width: 43vw;
            height: 30vw;
            /* background-color: pink; */
            float: left;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .other>ul>li>a {
            display: flex;
            width: 80%;
            height: 80%;
            background-color: #44AF3D;
            border-radius: 10%;
            justify-content: center;
            align-items: center;
            color: #fff;
            text-decoration: none;
        }
</style>
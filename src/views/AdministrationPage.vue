<template>
    <div id="administration">
        <div><a href="https://webapp-0.firebaseio.com/" target="_blank">Admin</a></div>
    </div>
</template>

<style scoped>
#administration {
    display: table;
    width: 100%;
    height: 200px;
}

#administration > div {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}

a {
   text-decoration: none;
   color: #131313;
   border: 1px solid #a9afaf;
   padding: 16px;
   border-radius: 6px;
   box-shadow: 1px 1px 3px #a9afaf;
}

a::before {
    content: url(/img/firebase.png);
    vertical-align: middle;
}
</style>
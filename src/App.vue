<template>
  <div id="app">
    <div class="navbar">
      <div class="navbar-inner">
        <a class="navbar-title" href="https://www.sepeach.com/">桃按钮</a>
        <a class="navbar-subtitle" href="https://rec.sepeach.com/">24H录播站</a>
      </div>
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.navbar {
  height: 40px;
  padding: 8px 0;
  background-color: #4582ec;
}
.navbar-inner {
  display: flex;
  align-items: center;
  height: 100%;
  width: 1110px;
  margin: 0 auto;
  text-align: left;
}
.navbar-title {
  margin-right: 16px;
  color: #fff;
  font-size: 22px;
}
.navbar-subtitle {
  padding: 8px;
  color: rgb(255,255,255,0.6);
  font-size: 14px;
}
</style>

<template>
  <div id="loyout">
    <el-container>
      <layout-aside></layout-aside>
      <el-container>
        <layout-header></layout-header>
        <el-main id="elmain">
          <transition name="main" mode="out-in">
            <router-view :key="key"></router-view>
          </transition>
        </el-main>
        <el-footer>
          <bottom></bottom>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutAside from './aside/aside'
import layoutHeader from './header/header'
import bottom from './Footer/bottom'
import { mapGetters } from 'vuex'

export default {
  name: 'dc-home',
  components: {
    layoutHeader,
    bottom,
    layoutAside
  },
  computed: {
    key() {
      return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    },
    ...mapGetters([
      'tabnavBox'
    ])
  },
  watch: {
    tabnavBox: function(newVal, oldVal) {
      //console.log(newVal, oldVal)
      sessionStorage.tabnavBox = JSON.stringify(this.tabnavBox)
    }
  }
}
</script>

<style>
  .main-enter, .main-leave-to {
    opacity: 0;
    transform: translateY(30px);

  }
  .main-enter-active {
    transition: all 0.2s;
  }
  .main-leave-active {
    position: absolute;
    transition: all 0.3s;
  }
</style>
<style lang="scss">
  * {
    margin: 0px;
    padding: 0px;
  }

  body {
    background-color: #f2f2f2;
    font-size: 14px;
    color: #333333;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  $top: top;
  $bottom: bottom;
  $left: left;
  $right: right;
  $leftright: ($left, $right);
  %w100 {
    width: 100%;
  }

  %h100 {
    height: 100%;
  }

  %cursor {
    cursor: pointer;
  }

  html, body, #loyout, .el-container, #asideNav, ul.el-menu {
    @extend %h100;
  }

  @mixin set-value($side, $value) {
    @each $prop in $leftright {
      #{$side}-#{$prop}: $value;
    }
  }

  #elmain {
    background-color: #f0f2f5;
  }


</style>

<template>
  <div style="height: 100%;">
    <transition :name="transitionName" style="height: 100%;">
      <router-view id="router-view" class="Router" style="height: 100%; display: flex;"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: "slide-right"
    };
  },
  watch: {
    $route(to, from) {
      document.getElementById("router-view").style.position = "absolute";
      const toDepth = to.path.split("/").filter(a => a != "").length;
      const fromDepth = from.path.split("/").filter(a => a != "").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
      document.getElementById("router-view").style.position = "none";
    }
  }
};
</script>

<style scoped>
.Router {
  transition: all 0.8s ease;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}
</style>

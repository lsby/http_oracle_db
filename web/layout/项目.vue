<template>
  <span
    :style="`
      order:${排序基数};
      flex-grow:${放大比例};
      flex-shrink:${缩小比例};
      flex-basis:${项目占据的主轴空间};
      align-self:${c_对齐方式};
      width:${宽度};
      height: ${高度};
      text-align: ${c_文字对齐方式};
    `"
  >
    <slot>
      <button style="height:100%;width:100%;">这是项目内容</button>
    </slot>
  </span>
</template>

<script>
import 构造vue组件 from "@lib/构造vue组件";

export default 构造vue组件({
  name: "xiangmu",
  数据: {
    高度: "auto",
    宽度: "auto",
    // 越小越靠前
    排序基数: 0,
    // 如果是0 不放大, 否则等值等宽
    放大比例: 0,
    // 如果是0 不缩小, 否则等值等缩放
    缩小比例: 1,
    // auto是项目本来的大小, 这里可以自己指定大小
    项目占据的主轴空间: "auto",
    // auto是继承容器 其他值会覆盖上层容器设定
    对齐方式: "auto",
    文字对齐方式: "auto"
  },
  计算属性: {
    c_文字对齐方式() {
      if (this.文字对齐方式 == "左") return "left";
      if (this.文字对齐方式 == "中") return "center";
      if (this.文字对齐方式 == "右") return "right";
    },
    c_对齐方式() {
      if (this.对齐方式 == "auto") return "auto";
      if (this.对齐方式 == "起点") return "flex-start";
      if (this.对齐方式 == "中点") return "center";
      if (this.对齐方式 == "终点") return "flex-end";
      if (this.对齐方式 == "基线") return "baseline";
      if (this.对齐方式 == "占满") return "stretch";
    }
  }
});
</script>

<template>
  <div
    :style="`
      display: flex;
      flex-direction: ${c_主轴方向};
      flex-wrap: ${c_换行模式};
      justify-content: ${c_主轴对齐方式};
      align-items: ${c_交叉轴对齐方式};
      align-content: ${c_多轴对齐方式};
      text-align: ${c_文字对齐方式};
      height: ${高度};
      width: ${宽度};
    `"
  >
    <slot>
      <button style="height:100%;width:100%;">这是容器内容</button>
    </slot>
  </div>
</template>

<script>
import 构造vue组件 from "@lib/构造vue组件";

export default 构造vue组件({
  name: "rongqi",
  数据: {
    主轴方向: "左右",
    换行模式: "插入下方",
    主轴对齐方式: "起点",
    交叉轴对齐方式: "占满",
    多轴对齐方式: "占满",
    文字对齐方式: "左",
    高度: "auto",
    宽度: "auto"
  },
  函数: {},
  计算属性: {
    c_文字对齐方式() {
      if (this.文字对齐方式 == "左") return "left";
      if (this.文字对齐方式 == "中") return "center";
      if (this.文字对齐方式 == "右") return "right";
    },
    c_主轴方向() {
      if (this.主轴方向 == "左右") return "row";
      if (this.主轴方向 == "右左") return "row-reverse";
      if (this.主轴方向 == "上下") return "column";
      if (this.主轴方向 == "下上") return "column-reverse";
    },
    c_换行模式() {
      if (this.换行模式 == "不换行") return "nowrap";
      if (this.换行模式 == "插入下方") return "wrap";
      if (this.换行模式 == "插入上方") return "wrap-reverse";
    },
    c_主轴对齐方式() {
      if (this.主轴对齐方式 == "起点") return "flex-start";
      if (this.主轴对齐方式 == "中点") return "center";
      if (this.主轴对齐方式 == "终点") return "flex-end";
      if (this.主轴对齐方式 == "两端") return "space-between";
      if (this.主轴对齐方式 == "间隔") return "space-around";
    },
    c_交叉轴对齐方式() {
      if (this.交叉轴对齐方式 == "起点") return "flex-start";
      if (this.交叉轴对齐方式 == "中点") return "center";
      if (this.交叉轴对齐方式 == "终点") return "flex-end";
      if (this.交叉轴对齐方式 == "基线") return "baseline";
      if (this.交叉轴对齐方式 == "占满") return "stretch";
    },
    c_多轴对齐方式() {
      if (this.多轴对齐方式 == "起点") return "flex-start";
      if (this.多轴对齐方式 == "中点") return "center";
      if (this.多轴对齐方式 == "终点") return "flex-end";
      if (this.多轴对齐方式 == "两端") return "space-between";
      if (this.多轴对齐方式 == "间隔") return "space-around";
      if (this.多轴对齐方式 == "占满") return "stretch";
    }
  }
});
</script>

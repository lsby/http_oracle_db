<template>
  <rongqi
    into_主轴方向="左右"
    :into_换行模式="换行模式"
    :into_主轴对齐方式="主轴对齐方式"
    :into_交叉轴对齐方式="交叉轴对齐方式"
    :into_多轴对齐方式="多轴对齐方式"
    :into_文字对齐方式="文字对齐方式"
    :into_高度="容器高度"
  >
    <xiangmu :style="`width:${左宽度};height:${高度};`" :into_放大比例="左放大比例">
      <slot name="左">
        <button :style="`width:100%;height:${高度};`">左</button>
      </slot>
    </xiangmu>
    <xiangmu :style="`width:${右宽度};height:${高度};`" :into_放大比例="右放大比例">
      <slot name="右">
        <button :style="`width:100%;height:${高度};`">右</button>
      </slot>
    </xiangmu>
  </rongqi>
</template>

<script>
import 构造vue组件 from "@lib/构造vue组件";

export default 构造vue组件({
  name: "zuoyou",
  数据: {
    高度: "auto",
    左放大比例: 0,
    右放大比例: 0,
    左宽度: "10%",
    右宽度: "90%",
    交叉轴对齐方式: "起点",
    文字对齐方式: "auto",
    多轴对齐方式: "中",
    容器高度: "auto",
    主轴对齐方式: "两端",
    换行模式: "插入下方"
  },
  函数: {},
  计算属性: {}
});
</script>

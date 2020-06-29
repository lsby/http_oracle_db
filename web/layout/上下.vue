<template>
  <rongqi
    into_主轴方向="上下"
    into_换行模式="插入下方"
    :into_主轴对齐方式="主轴对齐方式"
    :into_交叉轴对齐方式="交叉轴对齐方式"
    :into_多轴对齐方式="多轴对齐方式"
    :into_文字对齐方式="文字对齐方式"
  >
    <xiangmu :style="`width:${上高度};height:auto;`" :into_放大比例="上放大比例">
      <slot name="上">
        <button :style="`width:100%;height:100%;`">上</button>
      </slot>
    </xiangmu>
    <xiangmu :style="`width:${下高度};height:auto;`" :into_放大比例="下放大比例">
      <slot name="下">
        <button :style="`width:100%;height:100%;`">下</button>
      </slot>
    </xiangmu>
  </rongqi>
</template>

<script>
import 构造vue组件 from "@lib/构造vue组件";

export default 构造vue组件({
  name: "shangxia",
  数据: {
    上放大比例: 1,
    下放大比例: 0,
    上高度: "100%",
    下高度: "100%",
    交叉轴对齐方式: "起点",
    主轴对齐方式: "起点",
    多轴对齐方式: "中",
    文字对齐方式: "auto"
  },
  函数: {},
  计算属性: {}
});
</script>

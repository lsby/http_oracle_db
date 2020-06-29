<template>
  <Card>
    <ul>
      <span>
        <p v-for="(项目,index) in 内容" :key="index">{{项目}}</p>
      </span>
    </ul>
  </Card>
</template>

<script>
import 构造vue组件 from "@lib/构造vue组件";

export default 构造vue组件({
  name: "rizhi",
  延时构造() {},
  构造函数() {},
  数据: {
    内容: ["你好, 世界!", "hello, world!"],
    标题: "日志"
  },
  函数: {},
  计算属性: {}
});
</script>

---
title: defineModel is dope
date: 2024-04-11
---

I find myself spending very little time _enjoying_ Vue. Which is not to say I hate it, but that I don't have a lot of fun with it — I've reached a sort of intellectual detente with the framework, and most of my "fun frontend time" is spent in pure functional TypeScript. But I was delighted to discover a change in Vue 3.4 that makes life 2% better (and I do not mean that to damn with faint praise — 2% is a lot!).

---

Historically, declaring a component with a value that can/should be updated requires a slew of boilerplate:

```jsx
<template>
  <input
    type="text"
    :value="modelValue"
    @input="
      emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: string;
}>();

defineEmits<{
  "update:modelValue": string;
}>();
</script>
```

Vue 3.4 shipped support for the glorious [defineModel](https://github.com/vuejs/rfcs/discussions/503) macro, which makes this all much simpler:

```jsx
<template>
  <input
    type="text"
    v-model="modelValue"
  />
</template>

<script lang='ts' setup>
defineModel<string>();
</script>
```

This is not paradigm-shifting, but it is both _quite nice_ and _conceptually clarifying_. I'm very grateful for the addition, and excited to slowly backport a whole bunch of boilerplate.

<script setup>
const props = defineProps({
	id: {
		type: String,
		default: '',
	},
});
</script>

<template>
	<label class="v-label" :for="props.id">
		<slot></slot>
	</label>
</template>

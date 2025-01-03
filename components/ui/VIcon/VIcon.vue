<script setup>
import './VIcon.scss';

const props = defineProps({
	name: {
		type: String,
		default: '',
	},
});
</script>

<template>
	<span class="material-symbols-rounded v-icon">{{ props.name }}</span>
</template>

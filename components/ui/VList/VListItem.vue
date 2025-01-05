<script setup>
import './VList.scss';

const props = defineProps({
	clickable: {
		type: Boolean,
		default: false,
	},
});
const emits = defineEmits(['on-click']);

const onClick = (event) => {
	if (!props.clickable) {
		return;
	}
	event.preventDefault();
	emits('on-click', event);
};
</script>

<template>
	<div
		class="v-list-item"
		:class="{
			'v-list-item--clickable': props.clickable,
		}"
		@click="onClick"
	>
		<div class="v-list-item__overlay"></div>
		<div class="v-list-item__prepend"></div>
		<div class="v-list-item__content">
			<div class="v-list-item__title">
				<slot></slot>
			</div>
		</div>
		<div class="v-list-item__append"></div>
	</div>
</template>

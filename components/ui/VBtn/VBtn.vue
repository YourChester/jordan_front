<script setup>
import './VBtn.scss';

const props = defineProps({
	prependIcon: {
		type: String,
		default: '',
	},
	appendIcon: {
		type: String,
		default: '',
	},
	color: {
		type: String,
		default: 'primary',
	},
	icon: {
		type: Boolean,
		default: false,
	},
	name: {
		type: String,
		default: '',
	},
});
const emits = defineEmits(['on-click']);

const classes = computed(() => {
	return {
		[`v-btn--${props.color}`]: true,
		'v-btn--icon': props.icon,
	};
});

const onClick = (event) => {
	event.preventDefault();
	emits('on-click', event);
};
</script>

<template>
	<button class="v-btn" :class="classes" @click="onClick">
		<div class="v-btn__overlay"></div>
		<div v-if="props.prependIcon && !props.icon" class="v-btn__prepend">
			<UiVIcon :name="props.prependIcon"></UiVIcon>
		</div>
		<div class="v-btn__content">
			<template v-if="props.icon">
				<UiVIcon :name="props.name"></UiVIcon>
			</template>
			<template v-else>
				<slot></slot>
			</template>
		</div>
		<div v-if="props.appendIcon && !props.icon" class="v-btn__append">
			<UiVIcon :name="props.appendIcon"></UiVIcon>
		</div>
	</button>
</template>

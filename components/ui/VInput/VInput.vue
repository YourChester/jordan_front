<script setup>
import './VInput.scss';
import VIcon from '@/components/ui/VIcon';
import { useInputProps } from '@/composables';

const props = defineProps({
	...useInputProps(),
});
</script>

<template>
	<div class="v-input">
		<div v-if="props.prepend" class="v-input__prepend">
			<VIcon :name="props.prepend"></VIcon>
		</div>
		<div class="v-input__control"><slot></slot></div>
		<div v-if="props.append" class="v-input__append">
			<VIcon :name="props.append"></VIcon>
		</div>
		<div v-if="props.showDetails" class="v-input__details">
			<slot name="details"></slot>
		</div>
	</div>
</template>

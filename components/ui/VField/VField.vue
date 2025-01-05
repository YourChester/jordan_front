<script setup>
import './VField.scss';
import { getUid } from '@/utils';
import { useFieldProps, useFieldEmits, useField } from '@/composables';

const props = defineProps({
	dirty: {
		type: Boolean,
		default: false,
	},
	...useFieldProps(),
});

const emits = defineEmits(useFieldEmits());

const uid = ref(0);

const {
	focus,
	onFocus,
	onBlur,
	onClear,
	onClickPrependInner,
	onClickAppendInner,
} = useField(emits);

onMounted(() => {
	uid.value = props.id || getUid();
});
</script>

<template>
	<div
		class="v-field"
		:class="{
			'v-field--focus': focus,
			'v-field--active': focus || dirty,
			'v-field--dirty': dirty,
		}"
	>
		<div class="v-field__overlay"></div>
		<div v-if="props.prependInner" class="v-field__prepend-inner">
			<UiVIcon
				:name="props.prependInner"
				@click="onClickPrependInner"
			></UiVIcon>
		</div>
		<div class="v-field__field">
			<UiVLabel :id="`input-${uid}`" class="v-field__label">
				{{ props.label }}
			</UiVLabel>
			<slot
				name="default"
				:class="['v-field__input']"
				:id="`input-${uid}`"
				:onFocus="onFocus"
				:onBlur="onBlur"
			></slot>
		</div>
		<div v-if="cleareble && dirty" class="v-field__clear">
			<UiVIcon name="close" @click="onClear"></UiVIcon>
		</div>
		<div v-if="props.appendInner" class="v-field__append-inner">
			<UiVIcon
				:name="props.appendInner"
				@click="onClickAppendInner"
			></UiVIcon>
		</div>
		<div class="v-field__outline">
			<div class="v-field__outline__start"></div>
			<div class="v-field__outline__notch">
				<UiVLabel
					:id="`input-${uid}`"
					class="v-field__label v-field__label--floating"
				>
					{{ props.label }}
				</UiVLabel>
			</div>
			<div class="v-field__outline__end"></div>
		</div>
	</div>
</template>

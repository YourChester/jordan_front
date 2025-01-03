<script setup>
import './VField.scss';
import VIcon from '@/components/ui/VIcon';
import VLabel from '@/components/ui/VLabel';
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
			<VIcon
				:name="props.prependInner"
				@click="onClickPrependInner"
			></VIcon>
		</div>
		<div class="v-field__field">
			<VLabel :id="`input-${uid}`" class="v-field__label">
				{{ props.label }}
			</VLabel>
			<slot
				name="default"
				:class="['v-field__input']"
				:id="`input-${uid}`"
				:onFocus="onFocus"
				:onBlur="onBlur"
			></slot>
		</div>
		<div v-if="cleareble && dirty" class="v-field__clear">
			<VIcon name="close" @click="onClear"></VIcon>
		</div>
		<div v-if="props.appendInner" class="v-field__append-inner">
			<VIcon
				:name="props.appendInner"
				@click="onClickAppendInner"
			></VIcon>
		</div>
		<div class="v-field__outline">
			<div class="v-field__outline__start"></div>
			<div class="v-field__outline__notch">
				<VLabel
					:id="`input-${uid}`"
					class="v-field__label v-field__label--floating"
				>
					{{ props.label }}
				</VLabel>
			</div>
			<div class="v-field__outline__end"></div>
		</div>
	</div>
</template>

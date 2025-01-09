<script setup>
import './VTextField.scss';
import { computed } from 'vue';
import { useInputProps, useFieldProps, useFieldEmits } from '@/composables';

const props = defineProps({
	type: {
		type: String,
		default: 'text',
	},
	inputmode: {
		type: String,
		default: '',
	},
	...useInputProps(),
	...useFieldProps(),
});
const model = defineModel();
const slots = useSlots();
const emits = defineEmits(['on-blur', 'on-click:control', ...useFieldEmits()]);
const inputRef = useTemplateRef('input');

const focus = ref(false);
const active = ref(false);

const isDirty = computed(() => {
	return !!model.value || props.dirty;
});

const isActive = computed(() => {
	return active.value || props.active;
});

const onInput = (event) => {
	const target = event.target;
	model.value = target?.value;
};

const onFocus = (event) => {
	event.preventDefault();

	if (inputRef.value != document.activeElement) {
		inputRef.value?.focus();
	}

	focus.value = true;
	active.value = true;
};

const onBlur = (event) => {
	event.preventDefault();

	focus.value = false;
	active.value = false;
	emits('on-blur', event);
};

const onClickField = (event) => {
	onFocus(event);
	emits('on-click:control', event);
};

const onClear = (event) => {
	model.value = undefined;
	emits('on-clear', event);
};

const onClickPrependInner = (event) => {
	emits('on-click:prepend-inner', event);
};

const onClickAppendInner = (event) => {
	emits('on-click:append-inner', event);
};
</script>

<template>
	<UiVInput
		:prepend="props.prepend"
		:append="props.append"
		:showDetails="props.showDetails"
	>
		<UiVField
			:cleareble="props.cleareble"
			:label="props.label"
			:prepend-inner="props.prependInner"
			:append-inner="props.appendInner"
			:dirty="isDirty"
			:active="isActive || isDirty"
			:focus="focus"
			@on-click="onClickField"
			@on-clear="onClear"
			@on-click:prepend-inner="onClickPrependInner"
			@on-click:append-inner="onClickAppendInner"
		>
			<template #default="slotProps">
				<template v-if="!slots.default">
					<slot name="default"></slot>
					<input
						v-if="!slots.default"
						ref="input"
						:value="model"
						:type="props.type"
						:inputmode="props.inputmode"
						v-bind="slotProps"
						@input="onInput"
						@focus="onFocus"
						@blur="onBlur"
					/>
				</template>
				<div v-else :class="slotProps.class">
					<slot name="default"></slot>
					<input
						ref="input"
						:value="model"
						:type="props.type"
						:inputmode="props.inputmode"
						:id="slotProps.id"
						@focus="onFocus"
						@blur="onBlur"
					/>
				</div>
			</template>
		</UiVField>
	</UiVInput>
</template>

<script setup>
import { useInputProps, useFieldProps, useFieldEmits } from '@/composables';

const props = defineProps({
	type: {
		type: String,
		default: 'text',
	},
	...useInputProps(),
	...useFieldProps(),
});
const model = defineModel();
const emits = defineEmits([...useFieldEmits()]);

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
			:dirty="!!model"
			@on-clear="onClear"
			@on-click:prepend-inner="onClickPrependInner"
			@on-click:append-inner="onClickAppendInner"
		>
			<template #default="slotProps">
				<input
					v-model="model"
					:type="props.type"
					:class="slotProps.class"
					:id="slotProps.id"
					@focus="slotProps.onFocus"
					@blur="slotProps.onBlur"
				/>
			</template>
		</UiVField>
	</UiVInput>
</template>

<script setup>
import './VSelect.scss';
import { computed } from 'vue';
import { useInputProps, useFieldProps, useFieldEmits } from '@/composables';

const props = defineProps({
	options: {
		type: Array,
		default: [],
	},
	optionsValue: {
		type: String,
		default: 'value',
	},
	optionsLabel: {
		type: String,
		default: 'label',
	},
	...useInputProps(),
	...useFieldProps(),
});
const model = defineModel();
const emits = defineEmits([...useFieldEmits()]);

const selected = ref(undefined);
const menu = ref(false);

const selectedOptions = computed(() => {
	return selected.value;
});

const isObjOptions = computed(() => {
	return typeof props.options[0] == 'object';
});

const onBlur = (_event) => {
	// menu.value = false;
};

const onKeydown = (event) => {
	if (event.key == 'Tab') {
		return;
	}
	event.preventDefault();
};

const onClear = (event) => {
	model.value = undefined;
	selected.value = undefined;
	emits('on-clear', event);
};

const onSelectOptions = (option) => {
	if (typeof option == 'object') {
		model.value = option[props.value];
		selected.value = option[props.value];
	} else {
		model.value = option;
		selected.value = option;
	}
};
</script>

<template>
	<UiVTextField
		class="v-select"
		inputmode="none"
		:label="props.label"
		:dirty="selectedOptions"
		:append-inner="menu ? 'arrow_drop_up' : 'arrow_drop_down'"
		:cleareble="props.cleareble"
		@on-clear="onClear"
		@on-blur="onBlur"
		@keydown="onKeydown"
	>
		<div class="v-select__selection">
			{{ selectedOptions }}
		</div>
		<UiVMenu activator="parent" v-model="menu">
			<UiVList>
				<UiVListItem
					v-for="option in options"
					:key="isObjOptions ? option[props.optionsValue] : option"
					clickable
					@on-click="onSelectOptions(option)"
				>
					{{ isObjOptions ? option[props.optionsLabel] : option }}
				</UiVListItem>
			</UiVList>
		</UiVMenu>
	</UiVTextField>
</template>

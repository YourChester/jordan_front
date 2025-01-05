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

const selectedOptions = computed(() => {
	return selected.value;
});

const isObjOptions = computed(() => {
	return typeof props.options[0] == 'object';
});

const onClear = (event) => {
	model.value = undefined;
	selected.value = undefined;
	emits('on-clear', event);
};

const onClickPrependInner = (event) => {
	emits('on-click:prepend-inner', event);
};

const onSelectOptions = (option) => {
	console.log(option);
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
	<UiVInput
		:prepend="props.prepend"
		:append="props.append"
		:showDetails="props.showDetails"
		class="v-select"
	>
		<UiVMenu>
			<template #activator="menuSlotProps">
				<UiVField
					v-bind="menuSlotProps"
					:cleareble="props.cleareble"
					:label="props.label"
					:prepend-inner="props.prependInner"
					:append-inner="
						menuSlotProps.menuIsOpen
							? 'arrow_drop_up'
							: 'arrow_drop_down'
					"
					:dirty="!!model"
					@on-clear="onClear"
					@on-click:prepend-inner="onClickPrependInner"
				>
					<template #default="slotProps">
						<div :class="slotProps.class">
							<div class="v-selct__selection">
								{{ selectedOptions }}
							</div>
							<input
								:id="slotProps.id"
								@focus="slotProps.onFocus"
								@blur="slotProps.onBlur"
								inputmode="none"
							/>
						</div>
					</template>
				</UiVField>
			</template>
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
	</UiVInput>
</template>

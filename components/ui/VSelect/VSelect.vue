<script setup>
import VInput from '@/components/ui/VInput';
import VField from '@/components/ui/VField';
import VMenu from '@/components/ui/VMenu';
import { useInputProps, useFieldProps, useFieldEmits } from '@/composables';
import { getUid } from '@/utils';

const props = defineProps({
	options: {
		type: Array,
		default: [],
	},
	...useInputProps(),
	...useFieldProps(),
});
const model = defineModel();
const emits = defineEmits([...useFieldEmits()]);

const isOpenOptions = ref(false);
const uid = ref(0);

const onClear = (event) => {
	model.value = undefined;
	emits('on-clear', event);
};

const onClickPrependInner = (event) => {
	emits('on-click:prepend-inner', event);
};

onMounted(() => {
	uid.value = getUid();
});
</script>

<template>
	<VInput
		:prepend="props.prepend"
		:append="props.append"
		:showDetails="props.showDetails"
	>
		<VField
			:cleareble="props.cleareble"
			:label="props.label"
			:prepend-inner="props.prependInner"
			:append-inner="isOpenOptions ? 'arrow_drop_up' : 'arrow_drop_down'"
			:dirty="!!model"
			@on-clear="onClear"
			@on-click:prepend-inner="onClickPrependInner"
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
		</VField>
		<VMenu>
			<div v-for="index in 10" :key="index">Options: {{ index }}</div>
		</VMenu>
	</VInput>
</template>

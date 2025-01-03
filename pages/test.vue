<script setup>
import VSelect from '@/components/ui/VSelect';
import VTextField from '@/components/ui/VTextField';
import VMenu from '~/components/ui/VMenu';

const sometext = ref('');
const selected = ref('');
const viewPass = ref(false);
</script>

<template>
	<div style="padding: 20px">
		<VTextField
			v-model="sometext"
			:type="viewPass ? 'text' : 'password'"
			label="Password"
			:append-inner="viewPass ? 'visibility' : 'visibility_off'"
			cleareble
			@on-click:append-inner="() => (viewPass = !viewPass)"
		></VTextField>
		{{ sometext }}
		<VSelect v-model="selected" label="Select" cleareble> </VSelect>

		<button id="activator">click</button>
		<VMenu activator="#activator"></VMenu>
	</div>
</template>

<script setup>
const sometext = ref('');
const selected = ref('');
const viewPass = ref(false);
const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
</script>

<template>
	<div style="padding: 20px">
		<UiVTextField
			v-model="sometext"
			:type="viewPass ? 'text' : 'password'"
			label="Password"
			:append-inner="viewPass ? 'visibility' : 'visibility_off'"
			cleareble
			@on-click:append-inner="() => (viewPass = !viewPass)"
		></UiVTextField>
		<UiVSelect
			v-model="selected"
			:options="options"
			label="Select"
			cleareble
		>
		</UiVSelect>
	</div>
</template>

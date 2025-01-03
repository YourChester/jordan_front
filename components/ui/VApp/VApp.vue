<script setup>
import './VApp.scss';
</script>

<template>
	<div class="v-app">
		<div class="v-app__wrap">
			<slot></slot>
		</div>
		<div class="v-overlay-container"></div>
	</div>
</template>

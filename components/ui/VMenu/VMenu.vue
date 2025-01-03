<script setup>
import './VMenu.scss';
import { ref } from 'vue';

const DEFAULT_MIN_WIDTH = '120px';

const props = defineProps({
	activator: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		default: 'bottom',
	},
});

const activator = ref(null);
const menuIsOpen = ref(false);
const menuStyle = ref({});

const onClickActivator = (event) => {
	event.preventDefault();
	if (!menuIsOpen.value) {
		calcPosition();
	} else {
		menuStyle.value = {};
	}
	menuIsOpen.value = !menuIsOpen.value;
};

const onCloseMenu = (event) => {
	event.preventDefault();
	menuIsOpen.value = false;
};

const calcPosition = () => {
	const clientRect = activator.value.getBoundingClientRect();
	menuStyle.minWidth =
		clientRect.width > DEFAULT_MIN_WIDTH ? clientRect.width : '';
	switch (props.location) {
		case 'bottom':
			menuStyle.value = {
				top: `${clientRect.top + clientRect.height}px`,
				left: `${clientRect.left}px`,
			};
			break;
		default:
			break;
	}
};

const setActivatorEvent = () => {
	activator.value = document.querySelector(props.activator);

	if (!activator.value) {
		console.error('Activator not find');
		return;
	}

	activator.value.addEventListener('click', onClickActivator);
};

const destroyActivatorEvent = () => {
	if (!props.activator) {
		console.error('Activator not initialize');
		return;
	}

	if (!activator.value) {
		console.error('Activator not find');
		return;
	}

	activator.value.removeEventListener('click', onClickActivator);
};

onMounted(() => {
	setActivatorEvent();
});

onBeforeUnmount(() => {
	destroyActivatorEvent();
});
</script>

<template>
	<div class="v-menu">
		<Teleport to=".v-overlay-container">
			<div
				v-if="menuIsOpen"
				class="v-menu__overlay"
				:style="menuStyle"
				@click="onCloseMenu"
			>
				<slot></slot>
			</div>
		</Teleport>
	</div>
</template>

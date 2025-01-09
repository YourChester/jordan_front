<script setup>
import './VMenu.scss';
import { ref } from 'vue';
import { getUid } from '@/utils';

const DEFAULT_MIN_WIDTH = 120;

const props = defineProps({
	activator: {
		type: String,
		default: undefined,
	},
	location: {
		type: String,
		default: 'bottom',
	},
});
const model = defineModel({ default: false });
const instance = getCurrentInstance();

const uid = ref(0);
const activator = ref(null);
const menuStyle = ref({});
const menuRef = useTemplateRef('menu');

const curentActivatorKey = computed(() => {
	return props.activator || `[data-menu-activator=menu-${uid.value}]`;
});

const onClickActivator = (event) => {
	event.preventDefault();
	if (!model.value) {
		calcPosition();
	} else {
		menuStyle.value = {};
	}
	model.value = !model.value;
};

const onCloseMenu = (event) => {
	event.preventDefault();
	model.value = false;
};

const calcPosition = () => {
	const clientRect = activator.value.getBoundingClientRect();

	menuStyle.value.minWidth =
		clientRect.width > DEFAULT_MIN_WIDTH ? `${clientRect.width}px` : '';

	switch (props.location) {
		case 'bottom':
			menuStyle.value = {
				...menuStyle.value,
				...{
					top: `${clientRect.top + clientRect.height}px`,
					left: `${clientRect.left}px`,
				},
			};
			break;
		default:
			break;
	}
};

const onClickOutSide = (event) => {
	if (!model.value || !menuRef.value) {
		return;
	}
	if (
		!menuRef.value.contains(event.target) &&
		!activator.value.contains(event.target)
	) {
		onCloseMenu(event);
	}
};

const setActivatorEvent = () => {
	if (curentActivatorKey.value == 'parent') {
		activator.value = instance.parent.vnode.el;
	} else {
		activator.value = document.querySelector(curentActivatorKey.value);
	}

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

const setClickOutside = () => {
	window.addEventListener('click', onClickOutSide);
};

const destroyClickOutside = () => {
	window.removeEventListener('click', onClickOutSide);
};

onMounted(() => {
	setActivatorEvent();
	setClickOutside();
	uid.value = getUid();
});

onBeforeUnmount(() => {
	destroyActivatorEvent();
	destroyClickOutside();
});
</script>

<template>
	<slot name="activator" :data--menu--activator="`menu-${uid}`"> </slot>
	<div class="v-menu">
		<ClientOnly>
			<Teleport to=".v-overlay-container">
				<div class="v-menu__overlay">
					<div
						v-if="model"
						ref="menu"
						class="v-menu__content"
						:style="menuStyle"
						@click="onCloseMenu"
					>
						<slot></slot>
					</div>
				</div>
			</Teleport>
		</ClientOnly>
	</div>
</template>

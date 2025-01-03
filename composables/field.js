import { ref } from 'vue';

const useFieldProps = () => {
	return {
		id: {
			type: [String, Number],
			default: undefined,
		},
		prependInner: {
			type: String,
			default: '',
		},
		appendInner: {
			type: String,
			default: '',
		},
		label: {
			type: String,
			default: '',
		},
		cleareble: {
			type: Boolean,
			default: false,
		},
	};
};

const useFieldEmits = () => {
	return [
		'on-clear',
		'on-focus',
		'on-blur',
		'on-click:prepend-inner',
		'on-click:append-inner',
	];
};

const useField = (emits) => {
	const focus = ref(false);

	const onBlur = (event) => {
		event.preventDefault();
		focus.value = false;
		emits('on-blur', event);
	};

	const onFocus = (event) => {
		event.preventDefault();
		focus.value = true;
		emits('on-focus', event);
	};

	const onClear = (event) => {
		event.preventDefault();
		emits('on-clear', event);
	};

	const onClickPrependInner = (event) => {
		event.preventDefault();
		event.stopPropagation();
		emits('on-click:prepend-inner', event);
	};

	const onClickAppendInner = (event) => {
		event.preventDefault();
		event.stopPropagation();
		emits('on-click:append-inner', event);
	};

	return {
		focus,
		onFocus,
		onBlur,
		onClear,
		onClickPrependInner,
		onClickAppendInner,
	};
};

export { useFieldProps, useFieldEmits, useField };

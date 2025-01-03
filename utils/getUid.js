import { getCurrentInstance } from 'vue';

const getUid = () => {
	const vm = getCurrentInstance();

	return vm.uid;
};

export { getUid };

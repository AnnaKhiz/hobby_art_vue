export default {
  mounted(el, binding) {
    let hoverState = false;

    const updateHoverState = (isHovered) => {
      hoverState = isHovered;
      if (binding.instance && binding.value && typeof binding.value === 'function') {
        binding.value({ hover: hoverState });
      }
    };

    el.__updateHoverState__ = updateHoverState;

    el.addEventListener('mouseenter', () => updateHoverState(true));
    el.addEventListener('mouseleave', () => updateHoverState(false));


    updateHoverState(hoverState);
  },
  unmounted(el) {

    el.removeEventListener('mouseenter', el.__updateHoverState__);
    el.removeEventListener('mouseleave', el.__updateHoverState__);

    delete el.__updateHoverState__;
  }
};


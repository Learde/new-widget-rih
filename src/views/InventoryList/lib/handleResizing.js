import { ref } from "vue";
import { debounce } from "lodash";

export const useListResizing = () => {
    const listContainer = ref(null);

    const handleResizing = () => {
        listContainer.value.classList.add("inv-list__container--xs");
        if (listContainer.value.clientWidth < 700) {
            listContainer.value.classList.remove(
                "inv-list__container--md",
                "inv-list__container--xs"
            );
            listContainer.value.classList.add("inv-list__container--sm");
        } else if (listContainer.value.clientWidth <= 1045) {
            listContainer.value.classList.remove(
                "inv-list__container--sm",
                "inv-list__container--xs"
            );
            listContainer.value.classList.add("inv-list__container--md");
        } else {
            listContainer.value.classList.remove(
                "inv-list__container--sm",
                "inv-list__container--md",
                "inv-list__container--xs"
            );
        }
    };

    const handleResizingDebounced = debounce(handleResizing, 300, {
        maxWait: 1000,
    });

    return { listContainer, handleResizing, handleResizingDebounced };
};

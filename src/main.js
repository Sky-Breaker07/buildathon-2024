import "./assets/index.css";
import "vue-toastification/dist/index.css";

import Toast, { POSITION } from "vue-toastification";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(Toast, {
  position: POSITION.TOP, // Position of the toasts
  timeout: 3000, // Default timeout for toasts (in milliseconds)
  closeOnClick: true, // Close toast on click
  pauseOnFocusLoss: true, // Pause toast when window loses focus
  pauseOnHover: true, // Pause toast on hover
  draggable: true, // Make toasts draggable
  draggablePercent: 0.6, // Draggable percentage (0 - 1)
  showCloseButtonOnHover: false, // Show close button on hover
  hideProgressBar: true, // Hide the progress bar
  closeButton: "button", // Close button type ('button' or 'icon')
  icon: true, // Show icon for toasts
  rtl: false, // Enable right-to-left layout
  transition: "Vue-Toastification__fade", // Transition type
  maxToasts: 5, // Maximum number of toasts to display at once
  newestOnTop: true, // Add new toasts on top
  toastClassName: "", // Custom CSS class for toasts
  bodyClassName: "", // Custom CSS class for toast body
  containerClassName: "", // Custom CSS class for toast container
});

// Asynchronously load and register icons
const loadIcons = async () => {
  const { OhVueIcon, addIcons } = await import("oh-vue-icons");
  const icons = await import("oh-vue-icons/icons");

  const iconList = [
    icons.RiClipboardLine,
    icons.RiMedicineBottleLine,
    icons.RiDoorOpenLine,
    icons.RiFileTextLine,
    icons.RiArrowRightLine,
    icons.RiUserUnfollowLine,
    icons.RiCheckLine,
    icons.RiCloseLine,
    icons.RiUserFollowLine,
    icons.RiEditLine,
    icons.RiHospitalLine,
    icons.RiCalendarLine,
    icons.RiUserAddLine,
    icons.RiDeleteBinLine,
    icons.RiAddLine,
    icons.RiPencilLine,
    icons.RiCheckboxCircleLine,
    icons.RiLoader4Line,
    icons.RiUserLine,
    icons.RiUserStarLine,
    icons.RiMenLine,
    icons.RiBriefcaseLine,
    icons.RiHeart2Line,
    icons.RiBarChartBoxLine,
    icons.RiSearchLine,
    icons.RiFileSearchLine,
    icons.RiStethoscopeLine,
    icons.RiHeartPulseLine,
    icons.BiRadioactive,
  ];

  addIcons(...iconList);
  app.component("v-icon", OhVueIcon);
};

// Start loading icons asynchronously
loadIcons();

// Mount the app immediately, don't wait for icons to load
app.mount("#app");

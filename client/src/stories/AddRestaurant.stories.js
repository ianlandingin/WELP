import AddRestaurant from "../components/AddRestaurant.jsx";

export default {
  title: "AddRestaurant",
  component: AddRestaurant,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
};

export const Large = {
  args: {
    size: "large",
  },
};

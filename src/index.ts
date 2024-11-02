import { createApp } from "./app";

const port = 3001;

createApp().listen(port, () => {
  console.log(`Server running on port ${port}`);
});

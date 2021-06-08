import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./redux/store";

it("renders app", async () => {
  const renderWithRouter = (component) => {
    return {
      ...render(<BrowserRouter>{component}</BrowserRouter>),
    };
  };

  renderWithRouter(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const user = await waitFor(() => screen.getByText(/leanne/i));
  expect(user).toBeInTheDocument();
});

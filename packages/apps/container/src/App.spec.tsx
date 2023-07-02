import { screen, render } from "@testing-library/react";

import App from "./App";

jest.mock("react", () => {
  const originalModule = jest.requireActual('react')

  return ({
    __esModule: true,
    ...originalModule,
    Suspense:  ({ children }: {children: React.ReactElement}) => <div>{children}</div>,
  });
});

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }: {children: React.ReactElement}) => <div>{children}</div>,
  Routes: ({ children }: {children: React.ReactElement}) => <div>{children}</div>,
  Route:  () => <div data-testid="route" />,
}));

jest.mock("./pages/formsManagement", () => <div>formsManagement</div> as React.ReactElement);
jest.mock("./components/Apps/CreationApp", () => <div>CreationApp</div> as React.ReactElement);
jest.mock("./components/Apps/SubmissionApp", () => <div>SubmissionApp</div> as React.ReactElement);
jest.mock("./components/Apps/ViewApp", () => <div>ViewApp</div> as React.ReactElement);

// TODO: fix test and mocks
// TODO: solve console errors
describe("App", () => {
  it("should render App component", () => {
    render(<App />)

    expect(screen.getAllByTestId("route")).toHaveLength(4);
  });
});

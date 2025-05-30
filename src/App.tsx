import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { AppThemeProvider } from "./Providers";
import Render from ".";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <Render />
      </AppThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./libs/theme";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Provider({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <ReduxProvider store={store}>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
}

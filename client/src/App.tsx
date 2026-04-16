import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import PackageDetail from "./pages/PackageDetail";
import Contact from "./pages/Contact";
import Schedule from "./pages/Schedule";
import Tides from "./pages/Tides";
import Blog from "./pages/Blog";
import About from "./pages/About";
import PixCheckout from "./pages/PixCheckout";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/destinos"} component={Destinations} />
      <Route path={"/pacote/:id"} component={PackageDetail} />
      <Route path={"/programacao"} component={Schedule} />
      <Route path={"/tabua-de-mares"} component={Tides} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/sobre"} component={About} />
      <Route path={"/contato"} component={Contact} />
      <Route path={"/checkout/pix/:id"} component={PixCheckout} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
